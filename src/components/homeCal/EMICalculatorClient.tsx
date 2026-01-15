"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Download, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define types for the amortization schedule
interface ScheduleItem {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

// Props interface for the client component
interface EMICalculatorClientProps {
  initialData: {
    loanAmount: number;
    interestRate: number;
    tenure: number;
    downPayment: number;
    emi: number;
    schedule: ScheduleItem[];
  };
}

// PDF Document Component
const EMIDocument = ({
  emi,
  schedule,
  loanAmount,
  downPayment,
  interestRate,
  tenure,
}: {
  emi: number;
  schedule: ScheduleItem[];
  loanAmount: number;
  downPayment: number;
  interestRate: number;
  tenure: number;
}) => {
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
    title: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
      color: "#1E3A8A",
    },
    section: { marginBottom: 15 },
    row: {
      flexDirection: "row",
      borderBottom: "1pt solid #E5E7EB",
      padding: 8,
    },
    cell: { flex: 1, textAlign: "center", fontSize: 10 },
    label: { fontSize: 14, marginBottom: 8, color: "#1E3A8A" },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Home Loan EMI Report - EMI Mitra</Text>
        <View style={styles.section}>
          <Text style={styles.label}>
            Loan Amount: ₹{loanAmount.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.label}>
            Down Payment: ₹{downPayment.toLocaleString("en-IN")}
          </Text>
          <Text style={styles.label}>
            Effective Loan Amount: ₹
            {(loanAmount - downPayment).toLocaleString("en-IN")}
          </Text>
          <Text style={styles.label}>Interest Rate: {interestRate}%</Text>
          <Text style={styles.label}>Tenure: {tenure} years</Text>
          <Text style={styles.label}>Monthly EMI: ₹{emi.toFixed(2)}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>
            Amortization Schedule (First 12 Months)
          </Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Month</Text>
            <Text style={styles.cell}>EMI (₹)</Text>
            <Text style={styles.cell}>Principal (₹)</Text>
            <Text style={styles.cell}>Interest (₹)</Text>
            <Text style={styles.cell}>Balance (₹)</Text>
          </View>
          {schedule.slice(0, 12).map((row) => (
            <View key={row.month} style={styles.row}>
              <Text style={styles.cell}>{row.month}</Text>
              <Text style={styles.cell}>{row.emi.toFixed(2)}</Text>
              <Text style={styles.cell}>{row.principal.toFixed(2)}</Text>
              <Text style={styles.cell}>{row.interest.toFixed(2)}</Text>
              <Text style={styles.cell}>{row.balance.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default function EMICalculatorClient({
  initialData,
}: EMICalculatorClientProps) {
  const [loanAmount, setLoanAmount] = useState<string>(
    initialData.loanAmount ? String(initialData.loanAmount) : ""
  );
  const [interestRate, setInterestRate] = useState<string>(
    initialData.interestRate ? String(initialData.interestRate) : ""
  );
  const [tenure, setTenure] = useState<string>(
    initialData.tenure ? String(initialData.tenure) : ""
  );
  const [downPayment, setDownPayment] = useState<string>(
    initialData.downPayment ? String(initialData.downPayment) : ""
  );
  const [emi, setEmi] = useState<number>(initialData.emi);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    initialData.schedule
  );
  const [showChart, setShowChart] = useState<boolean>(false);

  const presetAmounts = [
    { value: 100000, label: "1 Lakh" },
    { value: 200000, label: "2 Lakhs" },
    { value: 300000, label: "3 Lakhs" },
    { value: 400000, label: "4 Lakhs" },
    { value: 500000, label: "5 Lakhs" },
    { value: 1000000, label: "10 Lakhs" },
    { value: 1500000, label: "15 Lakhs" },
  ];

  const calculateEMI = () => {
    const loan = Number(loanAmount) || 0;
    const down = Number(downPayment) || 0;
    const rate = Number(interestRate) || 0;
    const years = Number(tenure) || 0;

    const effectiveLoanAmount = loan - down;
    if (effectiveLoanAmount <= 0 || rate <= 0 || years <= 0) {
      setEmi(0);
      setSchedule([]);
      return;
    }

    const monthlyRate = rate / 1200;
    const months = years * 12;
    const emiValue =
      (effectiveLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Number(emiValue.toFixed(2)));

    let balance = effectiveLoanAmount;
    const scheduleData: ScheduleItem[] = [];
    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principal = emiValue - interest;
      balance -= principal;
      scheduleData.push({
        month: i,
        emi: Number(emiValue.toFixed(2)),
        principal: Number(principal.toFixed(2)),
        interest: Number(interest.toFixed(2)),
        balance: Number(balance.toFixed(2)),
      });
    }
    setSchedule(scheduleData);
  };

  // Chart Data
  const chartData = {
    labels: schedule.slice(0, 12).map((row) => `Month ${row.month}`),
    datasets: [
      {
        label: "Principal Paid (₹)",
        data: schedule.slice(0, 12).map((row) => row.principal),
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        fill: true,
      },
      {
        label: "Interest Paid (₹)",
        data: schedule.slice(0, 12).map((row) => row.interest),
        borderColor: "#F43F5E",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#000000" } },
      title: {
        display: true,
        text: "Principal vs Interest (First 12 Months)",
        color: "#000000",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Amount (₹)", color: "#000000" },
        ticks: { color: "#000000" },
      },
      x: {
        title: { display: true, text: "Month", color: "#000000" },
        ticks: { color: "#000000" },
      },
    },
  };

  return (
    <>
      {/* Calculator Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-black mb-4">
          Calculate Your EMI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-black font-medium mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., 1000000"
              title="Enter custom loan amount"
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-2">
              Down Payment (₹)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., 100000"
              title="Enter optional down payment"
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., 8"
              title="Enter annual interest rate"
            />
          </div>
          <div>
            <label className="block text-black font-medium mb-2">
              Tenure (Years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., 20"
              title="Enter loan tenure in years"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="block text-black font-medium mb-2">
              Quick Select Loan Amount
            </label>
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((item) => (
                <motion.button
                  key={item.value}
                  onClick={() => setLoanAmount(String(item.value))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2 cursor-pointer py-1 rounded-lg border text-sm ${
                    Number(loanAmount) === item.value
                      ? "bg-black text-white"
                      : "bg-white/80 text-black"
                  } hover:bg-black hover:text-white transition`}
                  title={`Select ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <motion.button
          onClick={calculateEMI}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-black cursor-pointer text-white py-3 rounded-lg hover:bg-black transition"
          title="Calculate your EMI"
        >
          Calculate EMI
        </motion.button>
        {emi > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-white/80 rounded-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-black">
              Monthly EMI: ₹{emi.toFixed(2)}
            </h3>
            {Number(downPayment) > 0 && (
              <p className="text-black mt-2">
                Effective Loan Amount: ₹
                {(Number(loanAmount) - Number(downPayment)).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}
            <PDFDownloadLink
              document={
                <EMIDocument
                  emi={emi}
                  schedule={schedule}
                  loanAmount={Number(loanAmount)}
                  downPayment={Number(downPayment)}
                  interestRate={Number(interestRate)}
                  tenure={Number(tenure)}
                />
              }
              fileName="Home_Loan_EMI_Report.pdf"
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {({ loading }) => (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  {loading ? (
                    <span className="text-black">Generating PDF...</span>
                  ) : (
                    "Download PDF"
                  )}
                </>
              )}
            </PDFDownloadLink>
          </motion.div>
        )}
      </motion.section>

      {/* Amortization Schedule */}
      {schedule.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-black mb-4">
            Amortization Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Month</th>
                  <th className="p-3 text-left">EMI (₹)</th>
                  <th className="p-3 text-left">Principal (₹)</th>
                  <th className="p-3 text-left">Interest (₹)</th>
                  <th className="p-3 text-left">Balance (₹)</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 12).map((row) => (
                  <tr key={row.month} className="border-b border-gray-200">
                    <td className="p-3">{row.month}</td>
                    <td className="p-3">{row.emi.toFixed(2)}</td>
                    <td className="p-3">{row.principal.toFixed(2)}</td>
                    <td className="p-3">{row.interest.toFixed(2)}</td>
                    <td className="p-3">{row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}

      {/* Chart Visualization */}
      {schedule.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-black">
              Principal vs Interest Chart
            </h2>
            <motion.button
              onClick={() => setShowChart(!showChart)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              title={showChart ? "Hide Chart" : "Show Chart"}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              {showChart ? "Hide Chart" : "Show Chart"}
            </motion.button>
          </div>
          <AnimatePresence>
            {showChart && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Line data={chartData} options={chartOptions} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </>
  );
}
