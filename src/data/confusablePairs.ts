export interface ConfusablePairDefinition {
  pairKey: string; // e.g. "め-ぬ" (alphabetical/kana order)
  char1: string;
  char2: string;
  romaji1: string;
  romaji2: string;
  differenceExplanation: string;
  hint: string;
}

export const CONFUSABLE_PAIRS: ConfusablePairDefinition[] = [
  {
    pairKey: 'ぬ-め',
    char1: 'ぬ',
    char2: 'め',
    romaji1: 'nu',
    romaji2: 'me',
    differenceExplanation: 'ぬ has a tight loop at the end of the tail (like a tangled noodle); め has a smooth stroke with NO loop (looks like an eye without a knot).',
    hint: 'Noodle (nu) has a loop; eye (me) has no loop.'
  },
  {
    pairKey: 'る-ろ',
    char1: 'る',
    char2: 'ろ',
    romaji1: 'ru',
    romaji2: 'ro',
    differenceExplanation: 'る has a closed loop/circle at the bottom (holding a ruby ring); ろ stays open at the bottom with NO loop (a robber stole the ruby).',
    hint: 'Ruby ring (ru) has a loop; Robber (ro) has no loop.'
  },
  {
    pairKey: 'さ-き',
    char1: 'さ',
    char2: 'き',
    romaji1: 'sa',
    romaji2: 'ki',
    differenceExplanation: 'き has TWO horizontal bars crossing the stem (like a key with two teeth); さ has only ONE horizontal bar.',
    hint: 'Key (ki) has two bars; Sunglasses (sa) has one bar.'
  },
  {
    pairKey: 'は-ほ',
    char1: 'は',
    char2: 'ほ',
    romaji1: 'ha',
    romaji2: 'ho',
    differenceExplanation: 'ほ has a horizontal roof bar on top covering the vertical stroke; は has NO top roof bar so the left stem stays open.',
    hint: 'Santa wearing a Hat (ho) has a roof bar; Ha-ha (ha) has no roof.'
  },
  {
    pairKey: 'れ-わ',
    char1: 'わ',
    char2: 'れ',
    romaji1: 'wa',
    romaji2: 're',
    differenceExplanation: 'わ curves smoothly inward into a rounded back like a swan; れ kicks outward to the right like a resting leg.',
    hint: 'Water swan (wa) curves in; Resting leg (re) kicks out.'
  },
  {
    pairKey: 'ね-れ',
    char1: 'ね',
    char2: 'れ',
    romaji1: 'ne',
    romaji2: 're',
    differenceExplanation: 'ね curls into a tight loop at the bottom (like a cat tail); れ kicks outward to the right like a resting leg.',
    hint: 'Neko (ne) has a tail loop; Resting (re) kicks out.'
  },
  {
    pairKey: 'ね-わ',
    char1: 'わ',
    char2: 'ね',
    romaji1: 'wa',
    romaji2: 'ne',
    differenceExplanation: 'わ curves smoothly inward without a loop; ね ends with a circular tail loop.',
    hint: 'Swan (wa) is smooth; Cat (ne) has a curly tail loop.'
  },
  {
    pairKey: 'あ-お',
    char1: 'あ',
    char2: 'お',
    romaji1: 'a',
    romaji2: 'o',
    differenceExplanation: 'あ has a continuous center loop through the vertical line; お has a separate accent dot on the top right and an open oval.',
    hint: 'Antenna (a) loops through the middle; Oh no (o) has a dot of sweat at top right.'
  },
  {
    pairKey: 'い-り',
    char1: 'い',
    char2: 'り',
    romaji1: 'i',
    romaji2: 'ri',
    differenceExplanation: 'い has two nearly equal-length curves facing each other; り has a shorter left curve and a noticeably longer right stroke extending lower.',
    hint: 'Eels (i) are equal height; River reeds (ri) has a long right stalk.'
  },
  {
    pairKey: 'け-は',
    char1: 'は',
    char2: 'け',
    romaji1: 'ha',
    romaji2: 'ke',
    differenceExplanation: 'は has an enclosed loop at the bottom right; け has a smooth downward curving line that never loops.',
    hint: 'Laughing Ha-ha (ha) has a loop; Keg (ke) has an open curved tap.'
  },
  {
    pairKey: 'た-な',
    char1: 'た',
    char2: 'な',
    romaji1: 'ta',
    romaji2: 'na',
    differenceExplanation: 'た has two horizontal lines on the right (like こ); な has an accent tick and a looped fishhook on the right.',
    hint: 'Spells "ta" (t + a); Nun (na) has a prayer loop on the right.'
  },
  {
    pairKey: 'そ-て',
    char1: 'そ',
    char2: 'て',
    romaji1: 'so',
    romaji2: 'te',
    differenceExplanation: 'て is a single simple curve down and back; そ starts with an upper zigzag before sweeping down.',
    hint: 'Tennis racket (te) is smooth; Sewing zigzag (so) has multiple turns.'
  },
  {
    pairKey: 'じ-ぢ',
    char1: 'じ',
    char2: 'ぢ',
    romaji1: 'ji',
    romaji2: 'ji',
    differenceExplanation: 'じ comes from し (shi + tenten) and is used in 99% of words; ぢ comes from ち (chi + tenten) and is only used in compound words like はなぢ (nosebleed).',
    hint: 'じ is standard; ぢ is from ち (chi).'
  },
  {
    pairKey: 'ず-づ',
    char1: 'ず',
    char2: 'づ',
    romaji1: 'zu',
    romaji2: 'zu',
    differenceExplanation: 'ず comes from す (su + tenten) and is standard; づ comes from つ (tsu + tenten) and only appears when つ gets voiced in compound words like つづく (tsuzuku).',
    hint: 'ず is standard; づ is from つ (tsu).'
  }
];

export function getConfusablePair(char1: string, char2: string): ConfusablePairDefinition | undefined {
  return CONFUSABLE_PAIRS.find(
    (p) =>
      (p.char1 === char1 && p.char2 === char2) ||
      (p.char1 === char2 && p.char2 === char1)
  );
}
