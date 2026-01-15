"use client";

import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { useRef } from "react";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface EMIData {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  totalProcessingFee: number;
}

interface EMIResultProps {
  emiData: EMIData;
  downPaymentPercentage: number | null;
  productPrice: number;
}

type ChartRef = ChartJS<"doughnut", number[], string> | undefined;

export default function EMIResult({
  emiData,
  downPaymentPercentage,
  productPrice,
}: EMIResultProps) {
  const principal =
    productPrice - (productPrice * (downPaymentPercentage || 0)) / 100;
  const chartRef = useRef<ChartRef>(null);

  // Chart data with gradients
  const chartData = {
    labels: ["Principal", "Total Interest", "Processing Fee"],
    datasets: [
      {
        data: [principal, emiData.totalInterest, emiData.totalProcessingFee],
        backgroundColor: (() => {
          if (typeof window === "undefined") {
            return ["#8b5cf6", "#ec4899", "#10b981"]; // Fallback for SSR
          }
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return ["#8b5cf6", "#ec4899", "#10b981"]; // Fallback if context fails
          }
          const gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
          gradient1.addColorStop(0, "#8b5cf6");
          gradient1.addColorStop(1, "#a78bfa");

          const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
          gradient2.addColorStop(0, "#ec4899");
          gradient2.addColorStop(1, "#f472b6");

          const gradient3 = ctx.createLinearGradient(0, 0, 0, 200);
          gradient3.addColorStop(0, "#10b981");
          gradient3.addColorStop(1, "#34d399");

          return [gradient1, gradient2, gradient3] as (
            | string
            | CanvasGradient
          )[];
        })(),
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
        cutout: "70%", // Modern Doughnut look
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust height on small screens
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#fff",
          font: {
            size: 12, // Smaller for mobile
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        bodyFont: {
          size: 12, // Smaller for mobile
        },
        callbacks: {
          label: (context: TooltipItem<"doughnut">) =>
            `₹${(context.raw as number).toLocaleString()}`,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 800, // Slightly faster for mobile performance
    },
  };

  // Down Payment Feedback
  const getDownPaymentFeedback = () => {
    if (!downPaymentPercentage)
      return "Enter a down payment to see recommendations.";
    if (downPaymentPercentage < 20) {
      return (
        "Our AI-powered analysis suggests your down payment of " +
        downPaymentPercentage.toFixed(1) +
        "% is low. Increase to 20–30% to optimize EMI affordability and reduce interest."
      );
    } else if (downPaymentPercentage >= 20 && downPaymentPercentage <= 30) {
      return (
        "Great choice! Your down payment of " +
        downPaymentPercentage.toFixed(1) +
        "% is optimal, balancing affordability and interest savings, per our AI insights."
      );
    } else {
      return (
        "Excellent! Your down payment of " +
        downPaymentPercentage.toFixed(1) +
        "% significantly lowers EMI and interest, maximizing savings, according to our AI analysis."
      );
    }
  };

  // Smart EMI Insights
  const getSmartEMIInsights = () => {
    const assumedMonthlyIncome = productPrice * 2; // Heuristic: Assume income is 2x product price
    const emiToIncomeRatio = emiData.monthlyEMI / assumedMonthlyIncome;
    const interestToPrincipalRatio = emiData.totalInterest / principal;
    const processingFeeToPrincipalRatio =
      emiData.totalProcessingFee / principal;

    const insights = [];

    // Affordability insight
    if (emiToIncomeRatio > 0.3) {
      insights.push(
        "⚠️ AI-Powered Analysis: Your monthly EMI (₹" +
          emiData.monthlyEMI.toLocaleString() +
          ") may be high relative to estimated income. Consider increasing tenure or down payment."
      );
    } else {
      insights.push(
        "✅ AI-Powered Analysis: Your monthly EMI (₹" +
          emiData.monthlyEMI.toLocaleString() +
          ") is within a comfortable range (<30% of estimated income)."
      );
    }

    // Tenure optimization
    if (interestToPrincipalRatio > 0.3) {
      insights.push(
        "📈 AI-Powered Analysis: High interest (₹" +
          emiData.totalInterest.toLocaleString() +
          ") relative to principal. Shorten tenure to save on interest, if possible."
      );
    } else {
      insights.push(
        "👍 AI-Powered Analysis: Reasonable interest (₹" +
          emiData.totalInterest.toLocaleString() +
          ") for your tenure."
      );
    }

    // Processing Fee impact
    if (processingFeeToPrincipalRatio > 0.05) {
      insights.push(
        "⚠️ AI-Powered Analysis: Processing fee (₹" +
          emiData.totalProcessingFee.toLocaleString() +
          ") is significant (>5% of principal). Compare lenders for lower fees."
      );
    } else {
      insights.push(
        "✅ AI-Powered Analysis: Processing fee (₹" +
          emiData.totalProcessingFee.toLocaleString() +
          ") is reasonable."
      );
    }

    return insights;
  };

  return (
    <motion.div
      className="mt-4 p-4 sm:p-6 bg-white/10 rounded-lg border border-white/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
        EMI Results
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Numerical Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base">Monthly EMI</p>
            <p className="text-lg sm:text-2xl font-bold text-white">
              ₹{emiData.monthlyEMI.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base">Total Interest</p>
            <p className="text-lg sm:text-2xl font-bold text-white">
              ₹{emiData.totalInterest.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base">Processing Fee</p>
            <p className="text-lg sm:text-2xl font-bold text-white">
              ₹{emiData.totalProcessingFee.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base">Total Amount</p>
            <p className="text-lg sm:text-2xl font-bold text-white">
              ₹{emiData.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
        {/* Doughnut Chart */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-[200px] sm:max-w-xs w-full h-48 sm:h-64"
          >
            <Doughnut data={chartData} options={chartOptions} ref={chartRef} />
          </motion.div>
        </div>
      </div>
      {/* Down Payment Feedback */}
      {downPaymentPercentage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-gray-300 text-sm sm:text-base"
        >
          <p>{getDownPaymentFeedback()}</p>
        </motion.div>
      )}
      {/* Smart EMI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          Smart EMI Insights 🤖
        </h3>
        <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base space-y-1">
          {getSmartEMIInsights().map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
