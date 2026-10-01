import type { LearningItem } from '../types/learning';
import { HIRAGANA_BY_CHAR } from './hiraganaMaster';

export type DakutenVariantType = 'dakuten' | 'handakuten' | 'base';

export interface DakutenVariant {
  type: DakutenVariantType;
  label: string;
  badgeText: string;
  markSymbol: string;
  markName: string;
  formula: string;
  item: LearningItem;
}

export interface CharacterDakutenInfo {
  category: 'base-with-dakuten' | 'dakuten-character' | 'handakuten-character';
  sectionTitle: string;
  description: string;
  markBadge: string;
  variants: DakutenVariant[];
}

interface RawRelation {
  base: string;
  dakuten?: string;
  handakuten?: string;
  note?: string;
}

// Canonical Hiragana Dakuten (゛) & Handakuten (゜) pairings
const DAKUTEN_RELATIONS: RawRelation[] = [
  // Ka Row -> Ga Row
  { base: 'か', dakuten: 'が', note: 'Voicing shifts "K" to "G"' },
  { base: 'き', dakuten: 'ぎ', note: 'Voicing shifts "K" to "G"' },
  { base: 'く', dakuten: 'ぐ', note: 'Voicing shifts "K" to "G"' },
  { base: 'け', dakuten: 'げ', note: 'Voicing shifts "K" to "G"' },
  { base: 'こ', dakuten: 'ご', note: 'Voicing shifts "K" to "G"' },

  // Sa Row -> Za Row
  { base: 'さ', dakuten: 'ざ', note: 'Voicing shifts "S" to "Z"' },
  { base: 'し', dakuten: 'じ', note: 'Voicing shifts "shi" to voiced "ji"' },
  { base: 'す', dakuten: 'ず', note: 'Voicing shifts "S" to "Z"' },
  { base: 'せ', dakuten: 'ぜ', note: 'Voicing shifts "S" to "Z"' },
  { base: 'そ', dakuten: 'ぞ', note: 'Voicing shifts "S" to "Z"' },

  // Ta Row -> Da Row
  { base: 'た', dakuten: 'だ', note: 'Voicing shifts "T" to "D"' },
  { base: 'ち', dakuten: 'ぢ', note: 'Voicing shifts "chi" to voiced "ji / di"' },
  { base: 'つ', dakuten: 'づ', note: 'Voicing shifts "tsu" to voiced "zu / du"' },
  { base: 'て', dakuten: 'で', note: 'Voicing shifts "T" to "D"' },
  { base: 'と', dakuten: 'ど', note: 'Voicing shifts "T" to "D"' },

  // Ha Row -> Ba Row (Dakuten) & Pa Row (Handakuten)
  { base: 'は', dakuten: 'ば', handakuten: 'ぱ', note: 'Ha-row takes ゛ (B) or ゜ (P)' },
  { base: 'ひ', dakuten: 'び', handakuten: 'ぴ', note: 'Ha-row takes ゛ (B) or ゜ (P)' },
  { base: 'ふ', dakuten: 'ぶ', handakuten: 'ぷ', note: 'Ha-row takes ゛ (B) or ゜ (P)' },
  { base: 'へ', dakuten: 'べ', handakuten: 'ぺ', note: 'Ha-row takes ゛ (B) or ゜ (P)' },
  { base: 'ほ', dakuten: 'ぼ', handakuten: 'ぽ', note: 'Ha-row takes ゛ (B) or ゜ (P)' },

  // Yoon (Contracted)
  { base: 'きゃ', dakuten: 'ぎゃ', note: 'Voiced contracted sound' },
  { base: 'きゅ', dakuten: 'ぎゅ', note: 'Voiced contracted sound' },
  { base: 'きょ', dakuten: 'ぎょ', note: 'Voiced contracted sound' },

  { base: 'しゃ', dakuten: 'じゃ', note: 'Voiced contracted sound' },
  { base: 'しゅ', dakuten: 'じゅ', note: 'Voiced contracted sound' },
  { base: 'しょ', dakuten: 'じょ', note: 'Voiced contracted sound' },

  { base: 'ひゃ', dakuten: 'びゃ', handakuten: 'ぴゃ', note: 'Contracted Ha-row takes ゛ or ゜' },
  { base: 'ひゅ', dakuten: 'びゅ', handakuten: 'ぴゅ', note: 'Contracted Ha-row takes ゛ or ゜' },
  { base: 'ひょ', dakuten: 'びょ', handakuten: 'ぴょ', note: 'Contracted Ha-row takes ゛ or ゜' }
];

/**
 * Returns dakuten / handakuten / base relations for a given learning item,
 * or null if no dakuten relationship exists (e.g. vowels あ, い, う, え, お, etc.).
 */
export function getCharacterDakutenInfo(item: LearningItem | null | undefined): CharacterDakutenInfo | null {
  if (!item) return null;

  const char = item.character;

  // 1. Check if char is a base character with dakuten
  const baseMatch = DAKUTEN_RELATIONS.find((r) => r.base === char);
  if (baseMatch) {
    const variants: DakutenVariant[] = [];

    if (baseMatch.dakuten) {
      const dItem = HIRAGANA_BY_CHAR.get(baseMatch.dakuten);
      if (dItem) {
        variants.push({
          type: 'dakuten',
          label: 'Voiced (Dakuten)',
          badgeText: 'Dakuten 濁音',
          markSymbol: '゛',
          markName: 'Tenten (濁点)',
          formula: `${char} (${item.romaji}) + ゛→ ${dItem.character} (${dItem.romaji})`,
          item: dItem
        });
      }
    }

    if (baseMatch.handakuten) {
      const pItem = HIRAGANA_BY_CHAR.get(baseMatch.handakuten);
      if (pItem) {
        variants.push({
          type: 'handakuten',
          label: 'Semi-Voiced (Handakuten)',
          badgeText: 'Handakuten 半濁音',
          markSymbol: '゜',
          markName: 'Maru (半濁点)',
          formula: `${char} (${item.romaji}) + ゜→ ${pItem.character} (${pItem.romaji})`,
          item: pItem
        });
      }
    }

    if (variants.length === 0) return null;

    const hasBoth = variants.length > 1;
    return {
      category: 'base-with-dakuten',
      sectionTitle: hasBoth ? 'Voiced & Semi-Voiced Variants (濁音・半濁音)' : 'Voiced Variant (Dakuten 濁音)',
      description: hasBoth
        ? `This character can take dakuten (゛) to make "${variants[0].item.romaji.slice(0, 1).toUpperCase()}" sounds or handakuten (゜) to make "P" sounds.`
        : `Add the two diagonal strokes ゛ (tenten) to voice this sound from "${item.romaji.slice(0, 1).toUpperCase()}" to "${variants[0].item.romaji.slice(0, 1).toUpperCase()}".`,
      markBadge: hasBoth ? '+ ゛/ ゜' : '+ ゛(tenten)',
      variants
    };
  }

  // 2. Check if char is a Dakuten character itself
  const dakutenMatch = DAKUTEN_RELATIONS.find((r) => r.dakuten === char);
  if (dakutenMatch) {
    const variants: DakutenVariant[] = [];
    const bItem = HIRAGANA_BY_CHAR.get(dakutenMatch.base);

    if (bItem) {
      variants.push({
        type: 'base',
        label: 'Base Hiragana',
        badgeText: 'Base Sound',
        markSymbol: 'Base',
        markName: 'Unvoiced Base',
        formula: `${bItem.character} (${bItem.romaji}) + ゛→ ${char} (${item.romaji})`,
        item: bItem
      });
    }

    // Also include handakuten sibling if exists (e.g. for ば -> ぱ)
    if (dakutenMatch.handakuten) {
      const pItem = HIRAGANA_BY_CHAR.get(dakutenMatch.handakuten);
      if (pItem) {
        variants.push({
          type: 'handakuten',
          label: 'Semi-Voiced (Handakuten)',
          badgeText: 'Handakuten 半濁音',
          markSymbol: '゜',
          markName: 'Maru (半濁点)',
          formula: `${dakutenMatch.base} + ゜→ ${pItem.character} (${pItem.romaji})`,
          item: pItem
        });
      }
    }

    return {
      category: 'dakuten-character',
      sectionTitle: 'Base Kana & Related Variants',
      description: bItem
        ? `This is a voiced (dakuten) sound derived from the base kana ${bItem.character} (${bItem.romaji}) with ゛ (tenten).`
        : 'Voiced kana variant.',
      markBadge: 'Voiced ゛',
      variants
    };
  }

  // 3. Check if char is a Handakuten character itself
  const handakutenMatch = DAKUTEN_RELATIONS.find((r) => r.handakuten === char);
  if (handakutenMatch) {
    const variants: DakutenVariant[] = [];
    const bItem = HIRAGANA_BY_CHAR.get(handakutenMatch.base);

    if (bItem) {
      variants.push({
        type: 'base',
        label: 'Base Hiragana',
        badgeText: 'Base Sound',
        markSymbol: 'Base',
        markName: 'Unvoiced Base',
        formula: `${bItem.character} (${bItem.romaji}) + ゜→ ${char} (${item.romaji})`,
        item: bItem
      });
    }

    // Also include dakuten sibling (e.g. for ぱ -> ば)
    if (handakutenMatch.dakuten) {
      const dItem = HIRAGANA_BY_CHAR.get(handakutenMatch.dakuten);
      if (dItem) {
        variants.push({
          type: 'dakuten',
          label: 'Voiced (Dakuten)',
          badgeText: 'Dakuten 濁音',
          markSymbol: '゛',
          markName: 'Tenten (濁点)',
          formula: `${handakutenMatch.base} + ゛→ ${dItem.character} (${dItem.romaji})`,
          item: dItem
        });
      }
    }

    return {
      category: 'handakuten-character',
      sectionTitle: 'Base Kana & Related Dakuten',
      description: bItem
        ? `This is a semi-voiced (handakuten) sound derived from base kana ${bItem.character} (${bItem.romaji}) with the ゜ (maru) circle mark.`
        : 'Semi-voiced kana variant.',
      markBadge: 'Semi-Voiced ゜',
      variants
    };
  }

  // No dakuten relationship exists (e.g. あ, い, う, え, お, etc.)
  return null;
}
