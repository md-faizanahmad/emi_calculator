"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SalaryBreakup {
  grossMonthly: number;
  inHandMonthly: number;
  annualTax: number;
  pfContribution: number;
  employerPf: number;
}

interface SalaryBreakupResultProps {
  breakup: SalaryBreakup;
  ctc: number;
  isNewRegime: boolean;
}

// Helper function to format numbers
const formatNumber = (value: number): string => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakhs`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(2)} Thousand`;
  }
  return `₹${value.toLocaleString()}`;
};

const SalaryBreakupResult: React.FC<SalaryBreakupResultProps> = ({
  breakup,
  ctc,
  isNewRegime,
}) => {
  const getSuggestion = () => {
    const regimeSuggestion =
      ctc > 1500000
        ? "Consider Old Regime if you have significant deductions (e.g., HRA, 80C)."
        : "New Regime is likely better for simplicity and lower rates.";
    const emiTip = `Keep EMI below ${formatNumber(
      Math.round(breakup.inHandMonthly * 0.4)
    )}/month for financial stability.`;
    return `${regimeSuggestion} ${emiTip}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="mt-8 bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Salary Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 text-left font-medium">Component</th>
                <th className="py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Gross Monthly Salary", value: breakup.grossMonthly },
                {
                  label: "Employee PF Contribution",
                  value: breakup.pfContribution,
                },
                {
                  label: "Employer PF Contribution",
                  value: breakup.employerPf,
                },
                { label: "Professional Tax", value: 200 },
                {
                  label: "Estimated Monthly Tax",
                  value: Math.round(breakup.annualTax / 12),
                },
                {
                  label: "In-Hand Monthly Salary",
                  value: breakup.inHandMonthly,
                  bold: true,
                },
                { label: "Estimated Annual Tax", value: breakup.annualTax },
              ].map((item, index) => (
                <motion.tr
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={
                    item.bold ? "font-bold border-t border-gray-300" : ""
                  }
                >
                  <td className="py-2">{item.label}</td>
                  <td className="py-2 text-right">
                    {formatNumber(item.value)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-blue-100/50 backdrop-blur-md rounded-lg border border-blue-200/50"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            AI-Powered Suggestions
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            With {formatNumber(ctc)} CTC, you&apos;ll get approximately{" "}
            {formatNumber(breakup.inHandMonthly)}/month in-hand under{" "}
            {isNewRegime ? "New" : "Old"} Regime. {getSuggestion()}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SalaryBreakupResult;
