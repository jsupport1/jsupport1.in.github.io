'use strict';
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
  'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
  'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
  'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const INTERNATIONAL_SCALE = [
  { value: 1_000_000_000_000_000_000n, name: 'Quintillion' },
  { value: 1_000_000_000_000_000n,    name: 'Quadrillion' },
  { value: 1_000_000_000_000n,        name: 'Trillion' },
  { value: 1_000_000_000n,            name: 'Billion' },
  { value: 1_000_000n,                name: 'Million' },
  { value: 1_000n,                    name: 'Thousand' },
];
const INDIAN_SCALE = [
  { value: 10_000_000_000_000n, name: 'Lakh Crore' },
  { value: 100_000_000_000n,    name: 'Thousand Crore' },
  { value: 10_000_000_000n,     name: 'Hundred Crore' },
  { value: 1_000_000_000n,      name: 'Hundred Crore' },   // handled below
  { value: 10_000_000n,         name: 'Crore' },
  { value: 100_000n,            name: 'Lakh' },
  { value: 1_000n,              name: 'Thousand' },
  { value: 100n,                name: 'Hundred' },
];
const ORDINAL_SUFFIX = {
  1: 'st', 2: 'nd', 3: 'rd'
};
const ROMAN_MAP = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'],  [90, 'XC'],  [50, 'L'],  [40, 'XL'],
  [10, 'X'],   [9, 'IX'],   [5, 'V'],   [4, 'IV'],
  [1, 'I']
];
const ROMAN_PARSE = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
function threeDigitWords(n) {
  if (n === 0) return '';
  let result = '';
  if (n >= 100) {
    result += ONES[Math.floor(n / 100)] + ' Hundred';
    n %= 100;
    if (n > 0) result += ' ';
  }
  if (n >= 20) {
    result += TENS[Math.floor(n / 10)];
    if (n % 10 !== 0) result += '-' + ONES[n % 10];
  } else if (n > 0) {
    result += ONES[n];
  }
  return result;
}
function applyCase(str, caseType) {
  switch (caseType) {
    case 'upper': return str.toUpperCase();
    case 'lower': return str.toLowerCase();
    case 'title': return str; // already title case from engine
    default: return str;
  }
}
function intToWordsInternational(bigN) {
  if (bigN === 0n) return 'Zero';
  const parts = [];
  for (const { value, name } of INTERNATIONAL_SCALE) {
    if (bigN >= value) {
      const chunk = bigN / value;
      parts.push(intToWordsInternational(chunk) + ' ' + name);
      bigN %= value;
    }
  }
  if (bigN > 0n) {
    parts.push(threeDigitWords(Number(bigN)));
  }
  return parts.join(', ');
}
function intToWordsIndian(bigN) {
  if (bigN === 0n) return 'Zero';
  if (bigN < 100n) return threeDigitWords(Number(bigN));
  const parts = [];
  const scales = [
    { v: 10_000_000_000_000n, n: 'Lakh Crore' },
    { v: 1_000_000_000_000n,  n: 'Thousand Crore' },
    { v: 100_000_000_000n,    n: 'Hundred Crore' },
    { v: 10_000_000_000n,     n: 'Ten Crore' },
    { v: 1_000_000_000n,      n: 'Hundred Crore' },
    { v: 100_000_000n,        n: 'Ten Crore' },
    { v: 10_000_000n,         n: 'Crore' },
    { v: 100_000n,            n: 'Lakh' },
    { v: 1_000n,              n: 'Thousand' },
    { v: 100n,                n: 'Hundred' },
  ];
  const crore    = bigN / 10_000_000n;
  bigN          %= 10_000_000n;
  const lakh     = bigN / 100_000n;
  bigN          %= 100_000n;
  const thousand = bigN / 1_000n;
  bigN          %= 1_000n;
  const hundred  = bigN / 100n;
  const rest     = bigN % 100n;
  if (crore > 0n)    parts.push(intToWordsIndian(crore) + ' Crore');
  if (lakh > 0n)     parts.push(threeDigitWords(Number(lakh)) + ' Lakh');
  if (thousand > 0n) parts.push(threeDigitWords(Number(thousand)) + ' Thousand');
  if (hundred > 0n)  parts.push(ONES[Number(hundred)] + ' Hundred');
  if (rest > 0n)     parts.push(threeDigitWords(Number(rest)));
  return parts.join(' ');
}
export function convertNumber(input, options = {}) {
  const {
    system = 'international', // 'international' | 'indian'
    format = 'cardinal',      // 'cardinal' | 'ordinal' | 'currency' | 'cheque' | 'roman'
    caseType = 'title',       // 'title' | 'upper' | 'lower'
    currency = 'USD',
    jsonMode = false,
  } = options;
  input = String(input).trim();
  if (format === 'roman') {
    return convertToRoman(input);
  }
  if (format === 'fromRoman') {
    return convertFromRoman(input);
  }
  const isNegative = input.startsWith('-');
  if (isNegative) input = input.slice(1);
  const [intPart, decPart] = input.split('.');
  if (!/^\d+$/.test(intPart)) {
    throw new Error('Invalid number format');
  }
  const bigInt = BigInt(intPart);
  const fn = system === 'indian' ? intToWordsIndian : intToWordsInternational;
  let words = fn(bigInt);
  let decWords = '';
  if (decPart !== undefined) {
    decWords = 'Point ' + [...decPart].map(d => ONES[parseInt(d)] || 'Zero').join(' ');
  }
  let result = '';
  switch (format) {
    case 'cardinal':
      result = words + (decWords ? ' ' + decWords : '');
      break;
    case 'ordinal':
      result = toOrdinal(words, bigInt);
      break;
    case 'currency':
      result = formatCurrency(words, decPart, currency);
      break;
    case 'cheque':
      result = formatCheque(words, decPart, currency);
      break;
  }
  if (isNegative) result = 'Negative ' + result;
  result = applyCase(result, caseType);
  if (jsonMode) {
    return JSON.stringify({
      input: (isNegative ? '-' : '') + intPart + (decPart !== undefined ? '.' + decPart : ''),
      words: result,
      system,
      format,
      caseType,
      timestamp: new Date().toISOString(),
    }, null, 2);
  }
  return result;
}
function toOrdinal(words, bigN) {
  const n = Number(bigN % 100n);
  const last = Number(bigN % 10n);
  const suffix = (n >= 11 && n <= 13) ? 'th' : (ORDINAL_SUFFIX[last] || 'th');
  const ordinalMap = {
    'One': 'First', 'Two': 'Second', 'Three': 'Third', 'Four': 'Fourth',
    'Five': 'Fifth', 'Six': 'Sixth', 'Seven': 'Seventh', 'Eight': 'Eighth',
    'Nine': 'Ninth', 'Ten': 'Tenth', 'Eleven': 'Eleventh', 'Twelve': 'Twelfth',
    'Thirteen': 'Thirteenth', 'Twenty': 'Twentieth', 'Thirty': 'Thirtieth',
    'Forty': 'Fortieth', 'Fifty': 'Fiftieth', 'Sixty': 'Sixtieth',
    'Seventy': 'Seventieth', 'Eighty': 'Eightieth', 'Ninety': 'Ninetieth',
    'Hundred': 'Hundredth', 'Thousand': 'Thousandth', 'Million': 'Millionth',
    'Billion': 'Billionth', 'Trillion': 'Trillionth',
    'Lakh': 'Lakh', 'Crore': 'Crore',
  };
  const tokens = words.split(' ');
  const last_token = tokens[tokens.length - 1].replace('-', ' ').split(' ');
  const lastWord = last_token[last_token.length - 1];
  if (ordinalMap[lastWord]) {
    tokens[tokens.length - 1] = tokens[tokens.length - 1].replace(
      new RegExp(lastWord + '$'), ordinalMap[lastWord]
    );
  }
  return tokens.join(' ');
}
const CURRENCY_UNITS = {
  USD: { major: 'Dollar', minor: 'Cent', majorPlural: 'Dollars', minorPlural: 'Cents' },
  EUR: { major: 'Euro', minor: 'Cent', majorPlural: 'Euros', minorPlural: 'Cents' },
  GBP: { major: 'Pound', minor: 'Penny', majorPlural: 'Pounds', minorPlural: 'Pence' },
  INR: { major: 'Rupee', minor: 'Paisa', majorPlural: 'Rupees', minorPlural: 'Paise' },
};
function formatCurrency(words, decPart, currency) {
  const units = CURRENCY_UNITS[currency] || CURRENCY_UNITS.USD;
  const majorWord = words === 'One' ? units.major : units.majorPlural;
  let result = words + ' ' + majorWord;
  if (decPart) {
    const cents = parseInt(decPart.padEnd(2, '0').slice(0, 2));
    if (cents > 0) {
      const centWords = threeDigitWords(cents);
      const minorWord = cents === 1 ? units.minor : units.minorPlural;
      result += ' and ' + centWords + ' ' + minorWord;
    }
  }
  return result;
}
function formatCheque(words, decPart, currency) {
  return formatCurrency(words, decPart, currency) + ' Only';
}
export function convertToRoman(input) {
  let n = parseInt(input);
  if (isNaN(n) || n < 1 || n > 3999) {
    throw new Error('Roman numerals support 1–3999');
  }
  let result = '';
  for (const [val, sym] of ROMAN_MAP) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
}
export function convertFromRoman(input) {
  input = input.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(input)) throw new Error('Invalid Roman numeral');
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const cur = ROMAN_PARSE[input[i]];
    const next = ROMAN_PARSE[input[i + 1]] || 0;
    result += cur < next ? -cur : cur;
  }
  return String(result);
}
export function bulkConvert(text, options = {}) {
  return text.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      try {
        return { input: line, output: convertNumber(line, options), error: null };
      } catch (e) {
        return { input: line, output: null, error: e.message };
      }
    });
}