'use strict';
export function calculateEMI(principal, annualRate, tenureMonths) {
  if (principal <= 0 || tenureMonths <= 0) {
    throw new Error('Principal and tenure must be positive.');
  }
  if (annualRate < 0) throw new Error('Interest rate cannot be negative.');
  if (annualRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi: round2(emi),
      totalPayment: round2(principal),
      totalInterest: 0,
      effectiveRate: 0,
      monthlyRate: 0,
    };
  }
  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = principal * monthlyRate * factor / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  return {
    emi:           round2(emi),
    totalPayment:  round2(totalPayment),
    totalInterest: round2(totalInterest),
    effectiveRate: round2((totalInterest / principal) * 100),
    monthlyRate:   monthlyRate,
  };
}
export function calculateEMIByFrequency(principal, annualRate, tenureYears, frequency = 'monthly') {
  const freqMap = { monthly: 12, quarterly: 4, halfyearly: 2, annual: 1 };
  const paymentsPerYear = freqMap[frequency] || 12;
  const totalPayments = tenureYears * paymentsPerYear;
  const periodicRate = annualRate / 100 / paymentsPerYear;
  if (annualRate === 0) {
    const emi = principal / totalPayments;
    return { emi: round2(emi), totalPayment: round2(principal), totalInterest: 0, totalPayments };
  }
  const factor = Math.pow(1 + periodicRate, totalPayments);
  const emi = principal * periodicRate * factor / (factor - 1);
  const totalPayment = emi * totalPayments;
  const totalInterest = totalPayment - principal;
  return {
    emi:           round2(emi),
    totalPayment:  round2(totalPayment),
    totalInterest: round2(totalInterest),
    totalPayments,
    frequency,
  };
}
export function generateAmortization(principal, annualRate, tenureMonths, extraMonthly = 0) {
  const { emi, monthlyRate } = calculateEMI(principal, annualRate, tenureMonths);
  const schedule = [];
  let balance = principal;
  let totalPaid = 0;
  let month = 0;
  while (balance > 0.01 && month < tenureMonths + 1) {
    month++;
    const interestCharge = round2(balance * monthlyRate);
    const principalCharge = Math.min(round2(emi - interestCharge), balance);
    const extra = Math.min(extraMonthly, balance - principalCharge);
    const totalPrincipal = round2(principalCharge + extra);
    balance = round2(balance - totalPrincipal);
    totalPaid = round2(totalPaid + principalCharge + interestCharge + extra);
    schedule.push({
      month,
      emi:        round2(emi + extra),
      principal:  totalPrincipal,
      interest:   interestCharge,
      balance:    Math.max(0, balance),
      totalPaid,
    });
    if (balance <= 0) break;
  }
  return schedule;
}
export function compareLoans(loans) {
  return loans.map(loan => {
    const result = calculateEMI(loan.principal, loan.annualRate, loan.tenureMonths);
    return { ...loan, ...result };
  });
}
export function affordableLoan(desiredEMI, annualRate, tenureMonths) {
  if (annualRate === 0) return round2(desiredEMI * tenureMonths);
  const r = annualRate / 100 / 12;
  const factor = Math.pow(1 + r, tenureMonths);
  return round2(desiredEMI * (factor - 1) / (r * factor));
}
function round2(n) { return Math.round(n * 100) / 100; }
export function formatCurrency(amount, currency = 'INR') {
  const locales = { INR: 'en-IN', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB' };
  return new Intl.NumberFormat(locales[currency] || 'en-IN', {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);
}
export function formatNumber(n) {
  return new Intl.NumberFormat('en-IN').format(Math.round(n));
}
export function emiToWords(amount, currency = 'INR') {
  const rounded = Math.round(amount);
  return { amount: rounded, currency };
}
export const LOAN_PRESETS = {
  home:     { label: '🏠 Home Loan',      rate: 8.5,  tenure: 240, icon: '🏠' },
  car:      { label: '🚗 Car Loan',       rate: 9.5,  tenure: 84,  icon: '🚗' },
  personal: { label: '💳 Personal Loan',  rate: 14.0, tenure: 60,  icon: '💳' },
  education:{ label: '🎓 Education Loan', rate: 10.5, tenure: 120, icon: '🎓' },
  gold:     { label: '🥇 Gold Loan',      rate: 11.0, tenure: 36,  icon: '🥇' },
  custom:   { label: '⚙️ Custom',         rate: 10.0, tenure: 60,  icon: '⚙️' },
};