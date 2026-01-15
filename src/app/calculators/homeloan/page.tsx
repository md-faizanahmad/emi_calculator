import HomeLoanEMICalculator from "@/components/homeCal/HomeLoanEMICalculator";

// Define types for the amortization schedule
interface ScheduleItem {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

// Props interface for HomeLoanEMICalculator

export default async function HomeLoadPage() {
  const initialData = {
    loanAmount: 0,
    interestRate: 0,
    tenure: 0,
    downPayment: 0,
    emi: 0,
    schedule: [] as ScheduleItem[],
  };

  return <HomeLoanEMICalculator initialData={initialData} />;
}
