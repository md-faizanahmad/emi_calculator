export function calculateEMI(
  principal: number,
  rate: number,
  tenure: number,
  processingFee: number
) {
  const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
  const monthlyEMI =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalAmount = monthlyEMI * tenure;
  const totalInterest = totalAmount - principal;
  const totalWithProcessingFee = totalAmount + processingFee;

  return {
    monthlyEMI: Math.round(monthlyEMI),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalWithProcessingFee),
    totalProcessingFee: Math.round(processingFee),
  };
}
