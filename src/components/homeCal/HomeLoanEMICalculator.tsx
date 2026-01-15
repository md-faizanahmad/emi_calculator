import { Metadata } from "next";
import Link from "next/link";
import EMICalculatorClient from "./EMICalculatorClient";
import Footer from "@/components/comman/Footer";
import { LoanHeader } from "@/components/comman/LoanHeader";

// Define types for the amortization schedule
interface ScheduleItem {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

// Props interface for the page
interface HomeLoanEMICalculatorProps {
  initialData: {
    loanAmount: number;
    interestRate: number;
    tenure: number;
    downPayment: number;
    emi: number;
    schedule: ScheduleItem[];
  };
}

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Home Loan EMI Calculator | EMI Mitra",
  description:
    "Calculate your home loan EMI with EMI Mitra’s futuristic calculator. Select preset amounts (1L to 15L), add a down payment, view interactive charts, and download results as PDF.",
  keywords:
    "home loan EMI calculator, EMI calculation, home loan calculator, EMI Mitra",
  viewport: "width=device-width, initial-scale=1",
};

export default function HomeLoanEMICalculator({
  initialData,
}: HomeLoanEMICalculatorProps) {
  return (
    <>
      <LoanHeader />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-800 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
            Home Loan EMI Calculator
          </h1>

          {/* Introduction */}
          <section className="mb-12 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              What is a Home Loan EMI?
            </h2>
            <p className="text-gray-200 leading-relaxed">
              A Home Loan Equated Monthly Installment (EMI) is your monthly
              payment to repay a home loan, blending principal and interest.
              Calculated using loan amount, interest rate, tenure, and an
              optional down payment, EMI Mitra’s calculator offers preset
              options (1L to 15L), interactive charts, and a downloadable PDF
              report for seamless financial planning.
            </p>
          </section>

          {/* EMI Formula */}
          <section className="mb-12 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              EMI Formula Breakdown
            </h2>
            <p className="text-gray-200 mb-4">
              The EMI is calculated using the formula:
            </p>
            <p className="text-gray-200 font-mono bg-black/20 p-4 rounded">
              EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
            </p>
            <ul className="list-disc list-inside text-gray-200 mt-4">
              <li>
                <strong>P</strong>: Principal Loan Amount after Down Payment
                (e.g., ₹10,00,000 - ₹2,00,000 = ₹8,00,000)
              </li>
              <li>
                <strong>R</strong>: Monthly Interest Rate (Annual Rate / 12 /
                100, e.g., 8% / 12 / 100 = 0.00667)
              </li>
              <li>
                <strong>N</strong>: Loan Tenure in Months (Years × 12, e.g., 20
                years × 12 = 240 months)
              </li>
            </ul>
            <p className="text-gray-200 mt-4">
              This formula ensures a consistent EMI, balancing principal and
              interest over the loan term.
            </p>
          </section>

          {/* Instructions */}
          <section className="mb-12 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              How to Use the Calculator
            </h2>
            <ol className="list-decimal list-inside text-gray-200">
              <li>
                Select a preset <strong>Loan Amount</strong> (e.g., ₹1L, ₹4L,
                ₹15L) or enter a custom amount.
              </li>
              <li>
                Optionally, enter a <strong>Down Payment</strong> to reduce the
                loan amount.
              </li>
              <li>
                Input the <strong>Interest Rate</strong> per annum (e.g., 8%).
              </li>
              <li>
                Specify the <strong>Tenure</strong> in years (e.g., 20 years).
              </li>
              <li>
                Click <strong>Calculate</strong> to view your EMI, amortization
                schedule, and chart.
              </li>
              <li>
                Download results as a <strong>PDF</strong> or toggle the{" "}
                <strong>chart</strong> for principal vs. interest insights.
              </li>
            </ol>
          </section>

          {/* Client-side Calculator Component */}
          <EMICalculatorClient initialData={initialData} />

          {/* Example Scenario */}
          <section className="mb-12 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              Example Scenario
            </h2>
            <p className="text-gray-200">
              Suppose you take a home loan of ₹15,00,000 with a down payment of
              ₹3,00,000 at an interest rate of 7.5% for 15 years:
            </p>
            <ul className="list-disc list-inside text-gray-200 mt-4">
              <li>Loan Amount (P): ₹15,00,000 - ₹3,00,000 = ₹12,00,000</li>
              <li>Interest Rate (R): 7.5% / 12 / 100 = 0.00625 (monthly)</li>
              <li>Tenure (N): 15 × 12 = 180 months</li>
            </ul>
            <p className="text-gray-200 mt-4">
              EMI = [12,00,000 × 0.00625 × (1+0.00625)^180] / [(1+0.00625)^180 -
              1] ≈ ₹11,134
            </p>
            <p className="text-gray-200 mt-2">
              Your monthly EMI would be approximately ₹11,134, with total
              repayment of ₹20,04,120 over 15 years.
            </p>
          </section>

          {/* Internal Links */}
          <section className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              Explore More Calculators
            </h2>
            <ul className="list-disc list-inside text-teal-300">
              <li>
                <Link href="/car-loan-calculator" className="hover:underline">
                  Car Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/personal-loan-calculator"
                  className="hover:underline"
                >
                  Personal Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/savings-calculator" className="hover:underline">
                  Savings Goal Calculator
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
