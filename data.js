/**
 * =====================================================================
 * RFI_DATA — 6max Cash Game / 100bb / Raise First In
 * =====================================================================
 *
 * DATASET SOURCE NOTE
 * -------------------
 * Source:        Manually constructed simplified GTO approximation.
 *                NOT exported from any specific solver (GTO Wizard,
 *                PioSOLVER, MonkerSolver, etc.).
 *                NOT from Upswing, RFI Charts, Zenith, or any
 *                commercial poker training product.
 *
 * Basis:         Constructed from widely published simplified GTO
 *                range guidelines (e.g. Jonathan Little's Cash Game
 *                Framework, commonly cited academic simplified ranges,
 *                and ranges consistent with multiple public GTO
 *                approximation resources for 6max 100bb NL).
 *
 * Coverage:      5 positions (UTG, HJ, CO, BTN, SB).
 *                BB is excluded — BB does not RFI.
 *                Each position has ~50–80 hand types.
 *
 * Simplification:
 *   - Pure binary: every hand is either "open" or "fold".
 *   - Real GTO solutions use mixed strategies (e.g. "open 70%").
 *     Mixed hands are resolved to the dominant action here.
 *   - Hands near the range boundary may differ from a specific
 *     solver output by ±1 hand rank.
 *
 * Production-ready: NO.
 *   Suitable for learning and prototyping. For a production trainer,
 *   replace this file with solver-verified data (GTO Wizard export,
 *   PioSOLVER solution, etc.).
 *
 * How to replace:
 *   Keep the same { POSITION: { 'hand': 'open'|'fold' } } structure.
 *   All training logic in script.js reads only from this object.
 * =====================================================================
 */

const RFI_DATA = {

  // ─── UTG ────────────────────────────────────────────────────────
  // Tightest position. ~14% RFI range.
  // Opens: 77+, AKs-A9s + A5s, AKo-AJo, KQs-KTs, KQo, QJs-QTs, JTs, T9s
  UTG: {
    // Pairs — open 77+, fold 66-
    'AA': 'open',  'KK': 'open',  'QQ': 'open',  'JJ': 'open',
    'TT': 'open',  '99': 'open',  '88': 'open',  '77': 'open',
    '66': 'fold',  '55': 'fold',  '44': 'fold',  '33': 'fold',  '22': 'fold',
    // Ax suited — open A9s+, A5s (wheel/nut-flush blocker), fold rest
    'AKs': 'open', 'AQs': 'open', 'AJs': 'open', 'ATs': 'open', 'A9s': 'open',
    'A8s': 'fold', 'A7s': 'fold', 'A6s': 'fold',
    'A5s': 'open', // blocker + nut-flush draw
    'A4s': 'fold', 'A3s': 'fold', 'A2s': 'fold',
    // Ax offsuit — open AJo+, fold rest
    'AKo': 'open', 'AQo': 'open', 'AJo': 'open',
    'ATo': 'fold', 'A9o': 'fold', 'A8o': 'fold', 'A7o': 'fold',
    // Kx suited — open KTs+
    'KQs': 'open', 'KJs': 'open', 'KTs': 'open',
    'K9s': 'fold', 'K8s': 'fold', 'K7s': 'fold', 'K6s': 'fold',
    // Kx offsuit — open KQo only
    'KQo': 'open', 'KJo': 'fold', 'KTo': 'fold', 'K9o': 'fold',
    // Qx suited
    'QJs': 'open', 'QTs': 'open',
    'Q9s': 'fold', 'Q8s': 'fold',
    // Qx offsuit
    'QJo': 'fold', 'QTo': 'fold',
    // Jx suited
    'JTs': 'open',
    'J9s': 'fold', 'J8s': 'fold',
    // Jx offsuit
    'JTo': 'fold',
    // Tx suited — T9s is the cutoff
    'T9s': 'open',
    'T8s': 'fold', 'T7s': 'fold',
    // Lower suited connectors
    '98s': 'fold', '87s': 'fold', '76s': 'fold', '65s': 'fold', '54s': 'fold',
    // Junk
    '72o': 'fold', 'K2o': 'fold', 'Q7o': 'fold', 'J6o': 'fold', 'T5o': 'fold',
  },

  // ─── HJ ─────────────────────────────────────────────────────────
  // ~20% RFI range. Opens all UTG hands + some more.
  HJ: {
    // Pairs — open 66+, fold 55-
    'AA': 'open',  'KK': 'open',  'QQ': 'open',  'JJ': 'open',
    'TT': 'open',  '99': 'open',  '88': 'open',  '77': 'open',  '66': 'open',
    '55': 'fold',  '44': 'fold',  '33': 'fold',  '22': 'fold',
    // Ax suited — open A4s+, A5s (blocker)
    'AKs': 'open', 'AQs': 'open', 'AJs': 'open', 'ATs': 'open', 'A9s': 'open',
    'A8s': 'open', 'A7s': 'open',
    'A6s': 'fold',
    'A5s': 'open', 'A4s': 'open',
    'A3s': 'fold', 'A2s': 'fold',
    // Ax offsuit — open ATo+
    'AKo': 'open', 'AQo': 'open', 'AJo': 'open', 'ATo': 'open',
    'A9o': 'fold', 'A8o': 'fold', 'A7o': 'fold',
    // Kx suited — open K9s+
    'KQs': 'open', 'KJs': 'open', 'KTs': 'open', 'K9s': 'open',
    'K8s': 'fold', 'K7s': 'fold', 'K6s': 'fold',
    // Kx offsuit — open KJo+
    'KQo': 'open', 'KJo': 'open',
    'KTo': 'fold', 'K9o': 'fold',
    // Qx suited — open Q9s+
    'QJs': 'open', 'QTs': 'open', 'Q9s': 'open',
    'Q8s': 'fold', 'Q7s': 'fold',
    // Qx offsuit — open QJo
    'QJo': 'open',
    'QTo': 'fold',
    // Jx suited — open J9s+
    'JTs': 'open', 'J9s': 'open',
    'J8s': 'fold',
    // Jx offsuit
    'JTo': 'fold',
    // Suited connectors — T9s, 98s
    'T9s': 'open', 'T8s': 'fold',
    '98s': 'open',
    '87s': 'fold', '76s': 'fold', '65s': 'fold',
    // Junk
    '72o': 'fold', 'K3o': 'fold', 'J5o': 'fold', 'T6o': 'fold',
  },

  // ─── CO ─────────────────────────────────────────────────────────
  // ~27% RFI range.
  CO: {
    // Pairs — open 44+, fold 33-
    'AA': 'open',  'KK': 'open',  'QQ': 'open',  'JJ': 'open',
    'TT': 'open',  '99': 'open',  '88': 'open',  '77': 'open',
    '66': 'open',  '55': 'open',  '44': 'open',
    '33': 'fold',  '22': 'fold',
    // Ax suited — all open
    'AKs': 'open', 'AQs': 'open', 'AJs': 'open', 'ATs': 'open', 'A9s': 'open',
    'A8s': 'open', 'A7s': 'open', 'A6s': 'open', 'A5s': 'open',
    'A4s': 'open', 'A3s': 'open', 'A2s': 'open',
    // Ax offsuit — open A9o+
    'AKo': 'open', 'AQo': 'open', 'AJo': 'open', 'ATo': 'open', 'A9o': 'open',
    'A8o': 'fold', 'A7o': 'fold', 'A6o': 'fold',
    // Kx suited — open K8s+
    'KQs': 'open', 'KJs': 'open', 'KTs': 'open', 'K9s': 'open', 'K8s': 'open',
    'K7s': 'fold', 'K6s': 'fold',
    // Kx offsuit — open KTo+
    'KQo': 'open', 'KJo': 'open', 'KTo': 'open',
    'K9o': 'fold', 'K8o': 'fold',
    // Qx suited — open Q9s+
    'QJs': 'open', 'QTs': 'open', 'Q9s': 'open',
    'Q8s': 'fold',
    // Qx offsuit — open QJo
    'QJo': 'open',
    'QTo': 'fold',
    // Jx suited — open J9s+
    'JTs': 'open', 'J9s': 'open',
    'J8s': 'fold',
    // Jx offsuit — open JTo
    'JTo': 'open',
    'J9o': 'fold',
    // Suited connectors
    'T9s': 'open', 'T8s': 'open',
    'T7s': 'fold',
    '98s': 'open', '87s': 'open',
    '76s': 'fold', '65s': 'fold',
    // Junk
    '72o': 'fold', 'K4o': 'fold', 'Q7o': 'fold', 'J6o': 'fold',
  },

  // ─── BTN ────────────────────────────────────────────────────────
  // Widest position. ~45% RFI range.
  BTN: {
    // Pairs — all open
    'AA': 'open',  'KK': 'open',  'QQ': 'open',  'JJ': 'open',
    'TT': 'open',  '99': 'open',  '88': 'open',  '77': 'open',
    '66': 'open',  '55': 'open',  '44': 'open',  '33': 'open',  '22': 'open',
    // Ax suited — all open
    'AKs': 'open', 'AQs': 'open', 'AJs': 'open', 'ATs': 'open', 'A9s': 'open',
    'A8s': 'open', 'A7s': 'open', 'A6s': 'open', 'A5s': 'open',
    'A4s': 'open', 'A3s': 'open', 'A2s': 'open',
    // Ax offsuit — open A7o+
    'AKo': 'open', 'AQo': 'open', 'AJo': 'open', 'ATo': 'open',
    'A9o': 'open', 'A8o': 'open', 'A7o': 'open',
    'A6o': 'fold', 'A5o': 'fold', 'A4o': 'fold',
    // Kx suited — open K6s+
    'KQs': 'open', 'KJs': 'open', 'KTs': 'open', 'K9s': 'open', 'K8s': 'open',
    'K7s': 'open', 'K6s': 'open',
    'K5s': 'fold', 'K4s': 'fold',
    // Kx offsuit — open K9o+
    'KQo': 'open', 'KJo': 'open', 'KTo': 'open', 'K9o': 'open',
    'K8o': 'fold', 'K7o': 'fold',
    // Qx suited — open Q8s+
    'QJs': 'open', 'QTs': 'open', 'Q9s': 'open', 'Q8s': 'open',
    'Q7s': 'fold',
    // Qx offsuit — open QTo+
    'QJo': 'open', 'QTo': 'open',
    'Q9o': 'fold',
    // Jx suited — open J8s+
    'JTs': 'open', 'J9s': 'open', 'J8s': 'open',
    'J7s': 'fold',
    // Jx offsuit — open JTo
    'JTo': 'open',
    'J9o': 'fold',
    // Tx suited
    'T9s': 'open', 'T8s': 'open',
    'T7s': 'fold',
    // 9x–6x suited
    '98s': 'open', '97s': 'open',
    '96s': 'fold',
    '87s': 'open', '86s': 'fold',
    '76s': 'open', '75s': 'fold',
    '65s': 'open', '64s': 'fold',
    '54s': 'open', '53s': 'fold', '43s': 'fold',
    // Junk
    '72o': 'fold', 'K2o': 'fold', '83o': 'fold', 'Q5o': 'fold',
  },

  // ─── SB ─────────────────────────────────────────────────────────
  // Opens vs BB only. ~38% RFI range.
  // Slightly tighter than BTN (plays OOP postflop vs BB).
  SB: {
    // Pairs — open 44+, fold 33-
    'AA': 'open',  'KK': 'open',  'QQ': 'open',  'JJ': 'open',
    'TT': 'open',  '99': 'open',  '88': 'open',  '77': 'open',
    '66': 'open',  '55': 'open',  '44': 'open',
    '33': 'fold',  '22': 'fold',
    // Ax suited — open A3s+
    'AKs': 'open', 'AQs': 'open', 'AJs': 'open', 'ATs': 'open', 'A9s': 'open',
    'A8s': 'open', 'A7s': 'open', 'A6s': 'open', 'A5s': 'open',
    'A4s': 'open',
    'A3s': 'fold', 'A2s': 'fold',
    // Ax offsuit — open A9o+
    'AKo': 'open', 'AQo': 'open', 'AJo': 'open', 'ATo': 'open', 'A9o': 'open',
    'A8o': 'fold', 'A7o': 'fold',
    // Kx suited — open K8s+
    'KQs': 'open', 'KJs': 'open', 'KTs': 'open', 'K9s': 'open', 'K8s': 'open',
    'K7s': 'fold', 'K6s': 'fold',
    // Kx offsuit — open KTo+
    'KQo': 'open', 'KJo': 'open', 'KTo': 'open',
    'K9o': 'fold', 'K8o': 'fold',
    // Qx suited — open Q9s+
    'QJs': 'open', 'QTs': 'open', 'Q9s': 'open',
    'Q8s': 'fold',
    // Qx offsuit — open QJo
    'QJo': 'open',
    'QTo': 'fold',
    // Jx suited — open J9s+
    'JTs': 'open', 'J9s': 'open',
    'J8s': 'fold',
    // Jx offsuit — open JTo
    'JTo': 'open',
    'J9o': 'fold',
    // Suited connectors
    'T9s': 'open', 'T8s': 'fold',
    '98s': 'open', '87s': 'open', '76s': 'open',
    '65s': 'fold', '54s': 'fold',
    // Junk
    '72o': 'fold', 'J5o': 'fold', 'K3o': 'fold', 'Q6o': 'fold',
  },

};
