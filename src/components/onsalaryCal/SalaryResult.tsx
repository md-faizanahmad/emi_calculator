"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import {
  LoanOutput,
  calculateComparison,
  generateAITips,
  estimateCreditScoreImpact,
} from "@/utils/salaryutils";

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

interface ResultProps {
  result: LoanOutput | null;
  monthlySalary: number;
  interestRate: number;
  loanTenure: number;
  currency: "INR" | "USD";
}

// Define Framer Motion variants
const resultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Result({
  result,
  monthlySalary,
  interestRate,
  loanTenure,
  currency,
}: ResultProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        const chartInstance = Chart.getChart(chartRef.current);
        if (chartInstance) chartInstance.destroy();
      }
    };
  }, []);

  if (!result) return null;

  const currencySymbol = currency === "INR" ? "₹" : "$";
  const comparisonData = calculateComparison({
    monthlySalary,
    interestRate,
    desiredEmi: result.monthlyEmi,
    loanTenure,
    downPaymentPercentage: 20,
  });
  const aiTips = generateAITips(
    {
      monthlySalary,
      interestRate,
      desiredEmi: result.monthlyEmi,
      loanTenure,
      downPaymentPercentage: 20,
    },
    result,
  );
  const creditScoreImpact = estimateCreditScoreImpact(
    {
      monthlySalary,
      interestRate,
      desiredEmi: result.monthlyEmi,
      loanTenure,
      downPaymentPercentage: 20,
    },
    result,
  );

  // Chart data for EMI breakdown
  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [result.eligibleLoanAmount, result.totalInterest],
        backgroundColor: ["#a855f7", "#3b82f6"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AnimatePresence>
      <motion.section
        variants={resultVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-white/20"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Your Loan Eligibility
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-medium text-gray-200">
              Eligible Loan Amount:
            </p>
            <p className="text-2xl font-bold text-purple-400">
              {currencySymbol}
              {result.eligibleLoanAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-200">Down Payment:</p>
            <p className="text-2xl font-bold text-purple-400">
              {currencySymbol}
              {result.downPayment.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-200">Monthly EMI:</p>
            <p className="text-2xl font-bold text-purple-400">
              {currencySymbol}
              {result.monthlyEmi.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-200">
              Total Interest Payable:
            </p>
            <p className="text-2xl font-bold text-purple-400">
              {currencySymbol}
              {result.totalInterest.toLocaleString()}
            </p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <p className="text-lg font-medium text-gray-200">
              Total Amount Payable:
            </p>
            <p className="text-2xl font-bold text-purple-400">
              {currencySymbol}
              {result.totalPayable.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-300">
          Based on your inputs, you can afford a loan of {currencySymbol}
          {result.eligibleLoanAmount.toLocaleString()} with an EMI of{" "}
          {currencySymbol}
          {result.monthlyEmi.toLocaleString()}/month at {interestRate}% over{" "}
          {loanTenure} years.
        </p>

        {/* Affordability Progress Bar */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-200">
            Affordability Score:
          </p>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  (result.monthlyEmi / monthlySalary) * 200,
                  100,
                )}%`,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            {result.monthlyEmi / monthlySalary <= 0.4
              ? "Great! Your EMI is within safe financial limits."
              : "Caution: Your EMI is high relative to your salary."}
          </p>
        </div>

        {/* AI-Powered Tips */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-2">
            AI-Powered Financial Tips
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm">
            {aiTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <p className="mt-4 text-gray-200 text-sm">
            <strong>Credit Score Impact:</strong> {creditScoreImpact}
          </p>
        </div>

        {/* EMI Breakdown Chart */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-2">EMI Breakdown</h3>
          <div className="max-w-xs mx-auto">
            <Doughnut
              ref={chartRef}
              data={chartData}
              options={{
                plugins: {
                  legend: { position: "bottom", labels: { color: "white" } },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.label}: ${currencySymbol}${(
                          context.raw as number
                        ).toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Loan Comparison Table */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-2">
            Compare Interest Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-2">Interest Rate (%)</th>
                  <th className="p-2">Loan Amount ({currencySymbol})</th>
                  <th className="p-2">Monthly EMI ({currencySymbol})</th>
                  <th className="p-2">Total Interest ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((comp) => (
                  <tr
                    key={comp.interestRate}
                    className="border-b border-white/20"
                  >
                    <td className="p-2">{comp.interestRate}%</td>
                    <td className="p-2">
                      {comp.eligibleLoanAmount.toLocaleString()}
                    </td>
                    <td className="p-2">{comp.monthlyEmi.toLocaleString()}</td>
                    <td className="p-2">
                      {comp.totalInterest.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
