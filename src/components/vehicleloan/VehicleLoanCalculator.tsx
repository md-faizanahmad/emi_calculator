"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [tenure, setTenure] = useState<number | "">("");
  const [processingFee, setProcessingFee] = useState<number | "">("");
  const [monthlyIncome, setMonthlyIncome] = useState<number | "">("");
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const presetAmounts = [200000, 500000, 800000, 1200000, 1600000];

  const handlePresetClick = (amount: number) => {
    setLoanAmount(amount);
  };

  const calculateEMI = () => {
    const principal = Number(loanAmount) - Number(downPayment);
    const rate = Number(interestRate) / 1200; // Monthly rate
    const months = Number(tenure);
    const procFee = Number(processingFee);

    if (principal > 0 && rate > 0 && months > 0) {
      const emiValue =
        (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);
      const totalPayment = emiValue * months;
      const totalInterestValue = totalPayment - principal;
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayable(totalPayment + (procFee || 0));

      // Eligibility check: EMI should be < 50% of monthly income
      setIsEligible(
        monthlyIncome ? emiValue <= Number(monthlyIncome) * 0.5 : null
      );
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayable(0);
      setIsEligible(null);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [
    loanAmount,
    downPayment,
    interestRate,
    tenure,
    processingFee,
    monthlyIncome,
  ]);

  const chartData = {
    labels: ["Principal", "Interest", "Processing Fee"],
    datasets: [
      {
        label: "Loan Breakdown",
        data: [
          Number(loanAmount) - Number(downPayment),
          totalInterest,
          Number(processingFee),
        ],
        backgroundColor: ["#14b8a6", "#a855f7", "#22c55e"],
        borderColor: ["#0d9488", "#9333ea", "#16a34a"],
        borderWidth: 1,
      },
    ],
  };

  const faqs = [
    {
      question: "How does down payment impact EMI?",
      answer:
        "A higher down payment lowers the loan amount, reducing your EMI and total interest payable.",
    },
    {
      question: "What is a good debt-to-income ratio for loans?",
      answer:
        "A ratio below 40% is ideal. Our calculator checks if your EMI is within 50% of your monthly income.",
    },
    {
      question: "Can I include insurance costs in the loan?",
      answer:
        "Some lenders allow including insurance in the loan amount, but it increases your EMI.",
    },
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Vehicle Cost (₹)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handlePresetClick(amount)}
                  className={`px-3 py-1 cursor-pointer rounded-md text-sm font-medium transition duration-200 ${
                    loanAmount === amount
                      ? "bg-black text-white"
                      : "bg-gray-500 text-white hover:bg-black "
                  }`}
                >
                  ₹{amount.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="10,00,000"
            />
          </div>
          <div>
            <label
              htmlFor="downPayment"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Down Payment (₹)
            </label>
            <input
              type="number"
              id="downPayment"
              value={downPayment}
              onChange={(e) =>
                setDownPayment(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="3,00,000"
            />
          </div>
          <div>
            <label
              htmlFor="interestRate"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="8.5"
              step="0.1"
            />
          </div>
          <div>
            <label
              htmlFor="tenure"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) =>
                setTenure(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="60"
            />
          </div>
          <div>
            <label
              htmlFor="processingFee"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Processing Fee (₹)
            </label>
            <input
              type="number"
              id="processingFee"
              value={processingFee}
              onChange={(e) =>
                setProcessingFee(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="5,000"
            />
          </div>
          <div>
            <label
              htmlFor="monthlyIncome"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              Monthly Income (₹)
            </label>
            <input
              type="number"
              id="monthlyIncome"
              value={monthlyIncome}
              onChange={(e) =>
                setMonthlyIncome(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              placeholder="50,000"
            />
          </div>
        </div>
        {/* Output Display */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-center border border-white/20">
          {emi > 0 ? (
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Monthly EMI
                </h3>
                <p className="text-3xl font-bold text-teal-500 animate-pulse">
                  ₹{emi.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Total Interest
                </h3>
                <p className="text-xl font-semibold text-indigo-500">
                  ₹{totalInterest.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Total Payable
                </h3>
                <p className="text-xl font-semibold text-green-500">
                  ₹{totalPayable.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Loan Eligibility
                </h3>
                <p
                  className={`text-xl font-semibold ${
                    isEligible ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isEligible === null
                    ? "Enter details"
                    : isEligible
                    ? "Eligible"
                    : "Not Eligible"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Enter valid details to calculate EMI
            </p>
          )}
        </div>
      </div>

      {/* Amortization Chart */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Loan Breakdown
        </h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: "Loan Amortization Breakdown",
                color: "#171717",
              },
            },
            scales: {
              y: { beginAtZero: true, ticks: { color: "#171717" } },
              x: { ticks: { color: "#171717" } },
            },
          }}
        />
      </div>

      {/* Client-Side FAQs */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick FAQs</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200/20 py-4">
            <button
              className="flex justify-between w-full text-left text-lg font-medium text-gray-900 focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.question}</span>
              <span className="text-teal-500">
                {faqOpen === index ? "−" : "+"}
              </span>
            </button>
            {faqOpen === index && (
              <p className="mt-2 text-gray-600 transition-all duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
