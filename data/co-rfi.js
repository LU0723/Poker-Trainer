'use strict';

/**
 * CO RFI Dataset — Official JS wrapper
 * dataset_id : cash_6max_100bb_co_rfi_v1
 * source     : PokerCoaching - Jonathan Little
 * coverage   : 169 hand types, pure strategy, 358 raise combos (27.00%)
 *
 * action values: "raise" | "fold"
 * Trainer maps: "raise" → action id "open"  (see script.js generateScenario)
 */
const CO_RFI = {
  dataset_id:      'cash_6max_100bb_co_rfi_v1',
  game_type:       'cash',
  format:          '6max',
  stack_bb:        100,
  position:        'CO',
  spot:            'RFI',
  strategy:        'pure',
  allowed_actions: ['raise', 'fold'],
  source:          'PokerCoaching - Jonathan Little',
  range_map: {
    'AA':  'raise', 'KK':  'raise', 'QQ':  'raise', 'JJ':  'raise',
    'TT':  'raise', '99':  'raise', '88':  'raise', '77':  'raise',
    '66':  'raise', '55':  'raise', '44':  'raise', '33':  'raise', '22':  'raise',

    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise',
    'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise',
    'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',

    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise',
    'A8o': 'fold',  'A7o': 'fold',  'A6o': 'fold',  'A5o': 'fold',
    'A4o': 'fold',  'A3o': 'fold',  'A2o': 'fold',

    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise',
    'K8s': 'raise', 'K7s': 'raise', 'K6s': 'raise', 'K5s': 'raise',
    'K4s': 'fold',  'K3s': 'fold',  'K2s': 'fold',

    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 'K9o': 'raise',
    'K8o': 'fold',  'K7o': 'fold',  'K6o': 'fold',  'K5o': 'fold',
    'K4o': 'fold',  'K3o': 'fold',  'K2o': 'fold',

    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise',
    'Q7s': 'fold',  'Q6s': 'fold',  'Q5s': 'fold',  'Q4s': 'fold',
    'Q3s': 'fold',  'Q2s': 'fold',

    'QJo': 'raise',
    'QTo': 'fold',  'Q9o': 'fold',  'Q8o': 'fold',  'Q7o': 'fold',
    'Q6o': 'fold',  'Q5o': 'fold',  'Q4o': 'fold',  'Q3o': 'fold',  'Q2o': 'fold',

    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise',
    'J7s': 'fold',  'J6s': 'fold',  'J5s': 'fold',  'J4s': 'fold',
    'J3s': 'fold',  'J2s': 'fold',

    'JTo': 'fold',  'J9o': 'fold',  'J8o': 'fold',  'J7o': 'fold',
    'J6o': 'fold',  'J5o': 'fold',  'J4o': 'fold',  'J3o': 'fold',  'J2o': 'fold',

    'T9s': 'raise', 'T8s': 'raise',
    'T7s': 'fold',  'T6s': 'fold',  'T5s': 'fold',  'T4s': 'fold',
    'T3s': 'fold',  'T2s': 'fold',

    'T9o': 'fold',  'T8o': 'fold',  'T7o': 'fold',  'T6o': 'fold',
    'T5o': 'fold',  'T4o': 'fold',  'T3o': 'fold',  'T2o': 'fold',

    '98s': 'raise', '97s': 'raise',
    '96s': 'fold',  '95s': 'fold',  '94s': 'fold',  '93s': 'fold',  '92s': 'fold',

    '98o': 'fold',  '97o': 'fold',  '96o': 'fold',  '95o': 'fold',
    '94o': 'fold',  '93o': 'fold',  '92o': 'fold',

    '87s': 'raise', '86s': 'raise',
    '85s': 'fold',  '84s': 'fold',  '83s': 'fold',  '82s': 'fold',

    '87o': 'fold',  '86o': 'fold',  '85o': 'fold',  '84o': 'fold',
    '83o': 'fold',  '82o': 'fold',

    '76s': 'raise', '75s': 'raise',
    '74s': 'fold',  '73s': 'fold',  '72s': 'fold',

    '76o': 'fold',  '75o': 'fold',  '74o': 'fold',  '73o': 'fold',  '72o': 'fold',

    '65s': 'raise', '64s': 'raise',
    '63s': 'fold',  '62s': 'fold',

    '65o': 'fold',  '64o': 'fold',  '63o': 'fold',  '62o': 'fold',

    '54s': 'raise', '53s': 'raise',
    '52s': 'fold',

    '54o': 'fold',  '53o': 'fold',  '52o': 'fold',

    '43s': 'raise',
    '42s': 'fold',

    '43o': 'fold',  '42o': 'fold',

    '32s': 'fold',
    '32o': 'fold',
  },
};
