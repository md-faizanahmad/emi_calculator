import { Metadata } from "next";
import SalaryCalculatorClient from "./SalaryBreakupClient";
import { LoanHeader } from "../comman/LoanHeader";
import Footer from "../comman/Footer";

// Metadata for SEO
export const metadata: Metadata = {
  title:
    "Salary Breakup & In-Hand Salary Calculator | Calculate Your Take-Home Pay",
  description:
    "Easily calculate your monthly in-hand salary, tax, and deductions based on your CTC. Supports Old and New Tax Regimes with a sleek, user-friendly interface.",
};

const SalaryBreakupCalculator: React.FC = () => {
  return (
    <>
      <LoanHeader />
      <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>
        <div className="relative flex items-center justify-center p-4 md:p-8">
          <SalaryCalculatorClient />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SalaryBreakupCalculator;
