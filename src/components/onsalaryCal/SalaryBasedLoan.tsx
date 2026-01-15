import Head from "next/head";
import SalaryBasedLoanCalculatorClient from "./SalaryBasedLoanClient";

export default function SalaryBasedLoanCalculator() {
  return (
    <>
      <Head>
        <title>
          Salary-Based EMI Loan Calculator - Estimate Your Loan Eligibility
        </title>
        <meta
          name="description"
          content="Calculate your loan eligibility based on monthly salary. Estimate EMI, loan amount, down payment, and compare interest rates with our AI-powered calculator."
        />
        <meta
          name="keywords"
          content="loan calculator, EMI calculator, salary-based loan, loan eligibility, personal finance"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen ">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Description Block */}
          <section className="mb-8 text-center bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-white/20">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Salary-Based EMI Loan Calculator
            </h1>
            <p className="text-lg text-gray-200 mb-4">
              Estimate your loan eligibility based on your monthly salary. This
              AI-powered tool helps you determine the maximum loan amount you
              can afford, calculate your monthly EMI, and suggests an ideal down
              payment based on standard financial ratios (40%-50% of salary for
              EMI).
            </p>
          </section>

          {/* Client-Side Calculator */}
          <SalaryBasedLoanCalculatorClient />

          {/* FAQs Section */}
          <section className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">
                  What is the maximum EMI I can afford?
                </h3>
                <p className="text-gray-200">
                  A safe EMI is typically 40%-50% of your monthly take-home
                  salary. For example, with a ₹30,000 salary, aim for an EMI of
                  ₹12,000-₹15,000.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  Is salary-based eligibility fixed across banks?
                </h3>
                <p className="text-gray-200">
                  No, eligibility varies by bank based on their policies, your
                  credit score, and other factors like existing debts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  Can I increase loan eligibility with a co-applicant?
                </h3>
                <p className="text-gray-200">
                  Yes, adding a co-applicant with stable income can increase
                  your eligibility, as banks consider combined income.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  How do banks verify income?
                </h3>
                <p className="text-gray-200">
                  Banks typically require salary slips, bank statements, and tax
                  returns to verify your income.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Salary-Based EMI Loan Calculator - Estimate Your Loan Eligibility",
  description:
    "Calculate your loan eligibility based on monthly salary. Estimate EMI, loan amount, down payment, and compare interest rates with our AI-powered calculator.",
  keywords: [
    "loan calculator",
    "EMI calculator",
    "salary-based loan",
    "loan eligibility",
    "personal finance",
  ],
};
