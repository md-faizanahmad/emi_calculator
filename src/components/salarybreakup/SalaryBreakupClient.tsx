"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SalaryBreakupResult from "./SalaryBreakupResult";
import FAQSection from "./FAQSection";

interface SalaryBreakup {
  grossMonthly: number;
  inHandMonthly: number;
  annualTax: number;
  pfContribution: number;
  employerPf: number;
}

const calculateSalary = (
  ctc: number,
  isNewRegime: boolean,
  includePf: boolean
): SalaryBreakup => {
  const monthlyCtc = ctc / 12;
  let pfContribution = includePf ? monthlyCtc * 0.12 : 0;
  pfContribution = Math.min(pfContribution, 1800); // PF capped at ₹1800
  const employerPf = includePf ? pfContribution : 0;
  const professionalTax = 200; // Standard PT for most states
  const grossMonthly = monthlyCtc - employerPf;

  // Simplified tax calculation (indicative rates)
  const annualTaxable = ctc - (includePf ? 50000 : 0); // Standard deduction
  let annualTax = 0;
  if (isNewRegime) {
    if (annualTaxable <= 700000) annualTax = 0;
    else if (annualTaxable <= 900000)
      annualTax = (annualTaxable - 700000) * 0.05;
    else if (annualTaxable <= 1200000)
      annualTax = 10000 + (annualTaxable - 900000) * 0.1;
    else annualTax = 25000 + (annualTaxable - 1200000) * 0.15;
  } else {
    if (annualTaxable <= 500000) annualTax = 0;
    else if (annualTaxable <= 1000000)
      annualTax = (annualTaxable - 500000) * 0.2;
    else annualTax = 100000 + (annualTaxable - 1000000) * 0.3;
  }

  const monthlyTax = annualTax / 12;
  const inHandMonthly =
    grossMonthly - pfContribution - professionalTax - monthlyTax;

  return {
    grossMonthly: Math.round(grossMonthly),
    inHandMonthly: Math.round(inHandMonthly),
    annualTax: Math.round(annualTax),
    pfContribution: Math.round(pfContribution),
    employerPf: Math.round(employerPf),
  };
};

const SalaryCalculatorClient: React.FC = () => {
  const [ctc, setCtc] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [isNewRegime, setIsNewRegime] = useState<boolean>(true);
  const [includePf, setIncludePf] = useState<boolean>(true);
  const [breakup, setBreakup] = useState<SalaryBreakup | null>(null);

  useEffect(() => {
    if (ctc > 0) {
      setBreakup(calculateSalary(ctc, isNewRegime, includePf));
    } else {
      setBreakup(null);
    }
  }, [ctc, isNewRegime, includePf]);

  const handleCtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) * 100000;
    setInputValue(e.target.value);
    if (!isNaN(value) && value >= 0) setCtc(value);
  };

  const handlePresetClick = (value: number) => {
    setCtc(value * 100000);
    setInputValue(value.toString());
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/30"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Salary Breakup Calculator
        </h1>

        <form
          className="space-y-6"
          role="form"
          aria-label="Salary Calculator Form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="ctc"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Annual CTC (in Lakhs)
              </label>
              <input
                id="ctc"
                type="number"
                step="0.1"
                min="0"
                value={inputValue}
                onChange={handleCtcChange}
                placeholder="Enter CTC (e.g., 9)"
                className="w-full p-3 rounded-lg text-black bg-white/300 border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                aria-describedby="ctc-help"
              />
              <p id="ctc-help" className="text-sm text-gray-500 mt-2">
                Enter CTC in lakhs (e.g., 9 for ₹9,00,000)
              </p>
              <div className="flex gap-3 cursor-pointer mt-3">
                {[6, 9, 15].map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => handlePresetClick(value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                    aria-label={`Set CTC to ${value} Lakhs`}
                  >
                    ₹{value}L
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Regime
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="regime"
                      checked={isNewRegime}
                      onChange={() => setIsNewRegime(true)}
                      className="mr-2 accent-blue-600"
                      aria-checked={isNewRegime}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      New Regime
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="regime"
                      checked={!isNewRegime}
                      onChange={() => setIsNewRegime(false)}
                      className="mr-2 accent-blue-600"
                      aria-checked={!isNewRegime}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Old Regime
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includePf}
                    onChange={() => setIncludePf(!includePf)}
                    className="mr-2 accent-blue-600"
                    aria-checked={includePf}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Include PF Deduction (12%)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </form>

        {breakup && (
          <SalaryBreakupResult
            breakup={breakup}
            ctc={ctc}
            isNewRegime={isNewRegime}
          />
        )}
      </motion.div>

      <FAQSection />
    </div>
  );
};

export default SalaryCalculatorClient;
