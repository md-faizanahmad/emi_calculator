export interface LoanInputs {
  monthlySalary: number;
  interestRate: number;
  desiredEmi: number;
  loanTenure: number;
  downPaymentPercentage: number;
}

export interface LoanOutput {
  eligibleLoanAmount: number;
  downPayment: number;
  totalInterest: number;
  totalPayable: number;
  monthlyEmi: number;
  emiSchedule: {
    month: number;
    emi: number;
    interest: number;
    principal: number;
    balance: number;
  }[];
}

export interface ValidationErrors {
  monthlySalary?: string;
  interestRate?: string;
  desiredEmi?: string;
  loanTenure?: string;
  downPaymentPercentage?: string;
}

export interface ComparisonOutput {
  interestRate: number;
  eligibleLoanAmount: number;
  monthlyEmi: number;
  totalInterest: number;
}

export const calculateLoanDetails = ({
  monthlySalary,
  interestRate,
  desiredEmi,
  loanTenure,
  downPaymentPercentage,
}: LoanInputs): LoanOutput => {
  const monthlyRate = interestRate / 1200;
  const tenureMonths = loanTenure * 12;

  const maxSafeEmi = monthlySalary * 0.4;
  const effectiveEmi = Math.min(desiredEmi, maxSafeEmi);

  const loanAmount =
    effectiveEmi *
    ((Math.pow(1 + monthlyRate, tenureMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)));

  const totalPayable = effectiveEmi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;

  const downPayment = loanAmount * (downPaymentPercentage / 100);

  const emiSchedule = [];
  let balance = loanAmount;
  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = effectiveEmi - interest;
    balance -= principal;
    emiSchedule.push({
      month,
      emi: effectiveEmi,
      interest: Math.round(interest),
      principal: Math.round(principal),
      balance: Math.round(balance),
    });
  }

  return {
    eligibleLoanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPayment),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    monthlyEmi: Math.round(effectiveEmi),
    emiSchedule,
  };
};

export const validateInputs = (inputs: LoanInputs): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (inputs.monthlySalary < 1000)
    errors.monthlySalary = "Salary must be at least ₹1,000.";
  if (inputs.interestRate < 1 || inputs.interestRate > 20)
    errors.interestRate = "Interest rate must be between 1% and 20%.";
  if (inputs.desiredEmi < 500) errors.desiredEmi = "EMI must be at least ₹500.";
  if (inputs.loanTenure < 1 || inputs.loanTenure > 10)
    errors.loanTenure = "Tenure must be between 1 and 10 years.";
  if (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 50)
    errors.downPaymentPercentage = "Down payment must be between 0% and 50%.";
  return errors;
};

export const calculateComparison = (inputs: LoanInputs): ComparisonOutput[] => {
  const rates = [8, 10, 12];
  return rates.map((rate) => {
    const tempInputs = { ...inputs, interestRate: rate };
    const { eligibleLoanAmount, monthlyEmi, totalInterest } =
      calculateLoanDetails(tempInputs);
    return {
      interestRate: rate,
      eligibleLoanAmount,
      monthlyEmi,
      totalInterest,
    };
  });
};

export const generateAITips = (
  inputs: LoanInputs,
  result: LoanOutput
): string[] => {
  const tips = [];
  const emiToSalaryRatio = result.monthlyEmi / inputs.monthlySalary;

  // Personalized affordability tip
  if (emiToSalaryRatio > 0.4) {
    tips.push(
      "Your EMI is high relative to your salary. Consider reducing the loan amount or extending the tenure to lower monthly payments."
    );
  } else {
    tips.push(
      "Your EMI is within safe financial limits, ensuring comfortable repayment."
    );
  }

  // Down payment optimization
  if (inputs.downPaymentPercentage < 20) {
    tips.push(
      "A higher down payment (20-30%) can reduce your loan amount and total interest paid."
    );
  } else {
    tips.push(
      "Your down payment is optimal, minimizing interest costs effectively."
    );
  }

  // Interest rate advice
  if (inputs.interestRate > 12) {
    tips.push(
      "Your interest rate is relatively high. Check your credit score or compare offers from multiple lenders to secure a better rate."
    );
  } else {
    tips.push(
      "Your interest rate is competitive, which helps keep your total interest low."
    );
  }

  // AI-like tenure suggestion
  const optimalTenure = Math.ceil(
    (inputs.monthlySalary * 0.3) / (result.monthlyEmi / inputs.loanTenure)
  );
  if (optimalTenure !== inputs.loanTenure && optimalTenure <= 10) {
    tips.push(
      `Based on your inputs, a tenure of ${optimalTenure} years could optimize your EMI for better affordability.`
    );
  }

  return tips;
};

export const estimateCreditScoreImpact = (
  inputs: LoanInputs,
  result: LoanOutput
): string => {
  const emiToSalaryRatio = result.monthlyEmi / inputs.monthlySalary;
  if (emiToSalaryRatio > 0.5) {
    return "High EMI-to-salary ratio may negatively impact your credit score due to increased debt burden.";
  } else if (emiToSalaryRatio > 0.3) {
    return "Moderate EMI-to-salary ratio; maintain timely payments to protect your credit score.";
  } else {
    return "Low EMI-to-salary ratio, likely to have a positive or neutral impact on your credit score.";
  }
};
