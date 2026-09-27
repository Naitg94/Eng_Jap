import type { AppProgressBackup } from '../types/learning';
import { buildProgressBackup, restoreProgressBackup } from './storage';

export function exportBackupToFile(): void {
  const backup = buildProgressBackup();
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const dateStr = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `hiragana-mastery-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  success: boolean;
  message: string;
  itemCount?: number;
}

export function validateAndRestoreBackup(jsonString: string): ImportResult {
  try {
    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Invalid backup file: Content is not a valid JSON object.' };
    }

    if (!data.version || typeof data.version !== 'string') {
      return { success: false, message: 'Invalid backup format: Missing version indicator.' };
    }

    if (!data.srsData || typeof data.srsData !== 'object') {
      return { success: false, message: 'Invalid backup format: Missing spaced repetition (SRS) records.' };
    }

    if (!data.streak || typeof data.streak !== 'object') {
      return { success: false, message: 'Invalid backup format: Missing streak data.' };
    }

    // Validate sample item in srsData if present
    const keys = Object.keys(data.srsData);
    for (const key of keys) {
      const item = data.srsData[key];
      if (!item || typeof item !== 'object' || typeof item.itemId !== 'string') {
        return {
          success: false,
          message: `Corrupted record found in SRS data for item key "${key}".`
        };
      }
    }

    // Proceed to restore safely
    restoreProgressBackup(data as AppProgressBackup);

    return {
      success: true,
      message: `Progress successfully restored! Restored records for ${keys.length} items.`,
      itemCount: keys.length
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to parse backup file: ${err instanceof Error ? err.message : 'Unknown JSON error'}`
    };
  }
}
