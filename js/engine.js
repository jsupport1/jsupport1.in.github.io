'use strict';
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
  'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
  'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
  'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const HINDI_DIGITS = ['', 'एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ'];
const HINDI_WORDS_0_99 = [
  'शून्य','एक','दो','तीन','चार','पांच','छह','सात','आठ','नौ',
  'दस','ग्यारह','बारह','तेरह','चौदह','पंद्रह','सोलह','सत्रह','अठारह','उन्नीस',
  'बीस','इक्कीस','बाईस','तेईस','चौबीस','पच्चीस','छब्बीस','सत्ताईस','अट्ठाईस','उनतीस',
  'तीस','इकतीस','बत्तीस','तैंतीस','चौंतीस','पैंतीस','छत्तीस','सैंतीस','अड़तीस','उनतालीस',
  'चालीस','इकतालीस','बयालीस','तैंतालीस','चवालीस','पैंतालीस','छियालीस','सैंतालीस','अड़तालीस','उनचास',
  'पचास','इक्यावन','बावन','तिरपन','चौवन','पचपन','छप्पन','सत्तावन','अट्ठावन','उनसठ',
  'साठ','इकसठ','बासठ','तिरसठ','चौसठ','पैंसठ','छियासठ','सड़सठ','उस्सठ','उनहत्तर',
  'सत्तर','इकहत्तर','बहत्तर','तिहत्तर','चौहत्तर','पचहत्तर','छिहत्तर','सत्तहत्तर','अठहत्तर','उन्यासी',
  'अस्सी','इक्यासी','बयासी','तिरासी','चौरासी','पचासी','छियासी','सत्तासी','अट्ठासी','नवासी',
  'नब्बे','इक्यानबे','बानवे','तिरानवे','चौरानवे','पंचानवे','छियानवे','सत्तानवे','अठानवे','निन्यानवे'
];
const HINDI_INTERNATIONAL_SCALE = [
  { value: 1_000_000_000_000_000_000n, name: 'क्विंटिलियन' },
  { value: 1_000_000_000_000_000n,    name: 'क्वाड्रिलियन' },
  { value: 1_000_000_000_000n,        name: 'ट्रिलियन' },
  { value: 1_000_000_000n,            name: 'बिलियन' },
  { value: 1_000_000n,                name: 'मिलियन' },
  { value: 1_000n,                    name: 'हज़ार' },
];
const HINDI_INDIAN_SCALE = [
  { value: 10_000_000_000_000n, name: 'लाख करोड़' },
  { value: 100_000_000_000n,    name: 'हज़ार करोड़' },
  { value: 10_000_000_000n,     name: 'सौ करोड़' },
  { value: 1_000_000_000n,      name: 'सौ करोड़' },
  { value: 10_000_000n,         name: 'करोड़' },
  { value: 100_000n,            name: 'लाख' },
  { value: 1_000n,              name: 'हज़ार' },
  { value: 100n,                name: 'सौ' },
];
const HINDI_POINT = 'दशमलव';
const HINDI_NEGATIVE = 'ऋणात्मक';
const HINDI_ZERO = 'शून्य';
const HINDI_HUNDRED = 'सौ';
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
function threeDigitWords(n, lang = 'en') {
  if (n === 0) return '';
  if (lang === 'hi') {
    if (n >= 100) {
      let result = HINDI_WORDS_0_99[Math.floor(n / 100)] + ' ' + HINDI_HUNDRED;
      const remainder = n % 100;
      if (remainder > 0) result += ' ' + HINDI_WORDS_0_99[remainder];
      return result;
    }
    return HINDI_WORDS_0_99[n];
  }
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
function intToWordsInternational(bigN, lang = 'en') {
  if (bigN === 0n) return lang === 'hi' ? HINDI_ZERO : 'Zero';
  const parts = [];
  const scale = lang === 'hi' ? HINDI_INTERNATIONAL_SCALE : INTERNATIONAL_SCALE;
  for (const { value, name } of scale) {
    if (bigN >= value) {
      const chunk = bigN / value;
      parts.push(intToWordsInternational(chunk, lang) + ' ' + name);
      bigN %= value;
    }
  }
  if (bigN > 0n) {
    parts.push(threeDigitWords(Number(bigN), lang));
  }
  return parts.join(', ');
}
function intToWordsIndian(bigN, lang = 'en') {
  if (bigN === 0n) return lang === 'hi' ? HINDI_ZERO : 'Zero';
  if (bigN < 100n) return threeDigitWords(Number(bigN), lang);
  const parts = [];
  const scale = lang === 'hi' ? HINDI_INDIAN_SCALE : INDIAN_SCALE;
  const crore    = bigN / 10_000_000n;
  bigN          %= 10_000_000n;
  const lakh     = bigN / 100_000n;
  bigN          %= 100_000n;
  const thousand = bigN / 1_000n;
  bigN          %= 1_000n;
  const hundred  = bigN / 100n;
  const rest     = bigN % 100n;
  if (crore > 0n)    parts.push(intToWordsIndian(crore, lang) + ' ' + (lang === 'hi' ? 'करोड़' : 'Crore'));
  if (lakh > 0n)     parts.push(threeDigitWords(Number(lakh), lang) + ' ' + (lang === 'hi' ? 'लाख' : 'Lakh'));
  if (thousand > 0n) parts.push(threeDigitWords(Number(thousand), lang) + ' ' + (lang === 'hi' ? 'हज़ार' : 'Thousand'));
  if (hundred > 0n)  parts.push((lang === 'hi' ? HINDI_WORDS_0_99[Number(hundred)] : ONES[Number(hundred)]) + ' ' + (lang === 'hi' ? 'सौ' : 'Hundred'));
  if (rest > 0n)     parts.push(threeDigitWords(Number(rest), lang));
  return parts.join(' ');
}
export function convertNumber(input, options = {}) {
  const {
    system = 'international', // 'international' | 'indian'
    format = 'cardinal',      // 'cardinal' | 'ordinal' | 'currency' | 'cheque' | 'roman'
    caseType = 'title',       // 'title' | 'upper' | 'lower'
    currency = 'USD',
    language = 'en',
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
  const lang = language === 'hi' ? 'hi' : 'en';
  const fn = system === 'indian' ? intToWordsIndian : intToWordsInternational;
  let words = fn(bigInt, lang);
  let decWords = '';
  if (decPart !== undefined) {
    const digitWords = [...decPart].map(d => {
      const idx = parseInt(d, 10);
      return lang === 'hi' ? HINDI_DIGITS[idx] || HINDI_ZERO : ONES[idx] || 'Zero';
    }).join(' ');
    decWords = (lang === 'hi' ? HINDI_POINT : 'Point') + ' ' + digitWords;
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
  if (isNegative) result = (lang === 'hi' ? HINDI_NEGATIVE : 'Negative') + ' ' + result;
  result = applyCase(result, caseType);
  if (jsonMode) {
    return JSON.stringify({
      input: (isNegative ? '-' : '') + intPart + (decPart !== undefined ? '.' + decPart : ''),
      words: result,
      system,
      format,
      language: lang,
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