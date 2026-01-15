import { Metadata } from "next";
import Calculator from "./VehicleLoanCalculator";
import { LoanHeader } from "../comman/LoanHeader";
import Footer from "../comman/Footer";

// SEO Metadata
export const metadata: Metadata = {
  title: "Vehicle Loan EMI Calculator - Car & Bike EMI in India",
  description:
    "Calculate your car or bike loan EMI with our AI-powered calculator. Select preset loan amounts (2L, 5L, 8L, 12L, 16L), include down payment, processing fees, and check eligibility.",
  keywords: [
    "vehicle loan EMI calculator",
    "car loan EMI",
    "bike loan EMI",
    "loan calculator India",
    "EMI calculation",
    "down payment calculator",
    "loan eligibility India",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://yourwebsite.com/vehicle-loan-calculator",
  },
  openGraph: {
    title: "Vehicle Loan EMI Calculator - Car & Bike EMI in India",
    description:
      "Plan your vehicle purchase with preset loan amounts, down payment, and eligibility checks.",
    url: "https://yourwebsite.com/vehicle-loan-calculator",
    type: "website",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function VehicleLoanCalculatorPage() {
  const faqs = [
    {
      question: "What is an EMI and how is it calculated?",
      answer:
        "EMI (Equated Monthly Installment) is a fixed monthly payment for a loan, covering principal and interest. It’s calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the loan amount, R is the monthly interest rate, and N is the tenure in months.",
    },
    {
      question: "How does down payment affect my loan?",
      answer:
        "A higher down payment reduces the loan amount, lowering your EMI and total interest payable, and improves loan approval chances.",
    },
    {
      question: "What are typical processing fees in India?",
      answer:
        "Processing fees range from 0.5-2% of the loan amount or a fixed amount (e.g., ₹3,000-₹10,000), depending on the lender.",
    },
    {
      question: "How can I improve my loan eligibility?",
      answer:
        "Maintain a credit score above 750, keep your debt-to-income ratio below 40%, and provide proof of stable income.",
    },
  ];

  const bankOffers = [
    {
      bank: "SBI",
      rate: 8.4,
      processingFee: "0.5-1%",
      tenure: "Up to 7 years",
    },
    {
      bank: "HDFC Bank",
      rate: 8.7,
      processingFee: "₹3,000-₹10,000",
      tenure: "Up to 7 years",
    },
    {
      bank: "ICICI Bank",
      rate: 8.8,
      processingFee: "0.5-2%",
      tenure: "Up to 7 years",
    },
    {
      bank: "Axis Bank",
      rate: 9.0,
      processingFee: "₹4,500-₹12,000",
      tenure: "Up to 7 years",
    },
  ];

  return (
    <>
      <LoanHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Vehicle Loan EMI Calculator",
                description:
                  "Calculate your car or bike loan EMI with preset loan amounts and advanced features.",
                url: "https://yourwebsite.com/vehicle-loan-calculator",
              }),
            }}
          />

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 tracking-tight animate-fade-in">
              AI-Powered Vehicle Loan EMI Calculator
            </h1>
            <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto animate-slide-up">
              Effortlessly calculate your car or bike loan EMI with preset
              amounts (2L, 5L, 8L, 12L, 16L), down payment, and eligibility
              checks. Compare top Indian bank offers in one place.
            </p>
          </div>

          {/* Introduction Section */}
          <section className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 mb-12 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Understanding Vehicle Loan EMI
            </h2>
            <p className="text-gray-900 leading-relaxed">
              An EMI (Equated Monthly Installment) is your monthly repayment for
              a vehicle loan, combining principal and interest. Our AI-driven
              calculator offers preset loan amounts, down payment options, and
              eligibility checks to simplify your vehicle purchase planning in
              India.
            </p>
          </section>

          {/* EMI Calculator Section */}
          <section className="bg-white/10 backdrop-blur-lg p-8 mb-12 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              Calculate Your EMI
            </h2>
            <Calculator />
          </section>

          {/* Sample Scenario Section */}
          <section className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 mb-12 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Sample Scenario
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For a vehicle costing ₹8,00,000 with a ₹2,00,000 down payment,
              8.5% interest rate, ₹5,000 processing fee, and 60-month tenure,
              your EMI would be approximately ₹12,310. Total interest payable
              would be around ₹1,38,600, with a total amount payable of
              ₹7,43,600 (including processing fee).
            </p>
          </section>

          {/* Bank Offers Section */}
          <section className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 mb-12 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Top Bank Offers in India
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead>
                  <tr className="bg-gray-100/40">
                    <th className="p-4">Bank</th>
                    <th className="p-4">Interest Rate</th>
                    <th className="p-4">Processing Fee</th>
                    <th className="p-4">Max Tenure</th>
                  </tr>
                </thead>
                <tbody>
                  {bankOffers.map((offer, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200/20 hover:bg-gray-50/30 transition duration-200"
                    >
                      <td className="p-4">{offer.bank}</td>
                      <td className="p-4">{offer.rate}%</td>
                      <td className="p-4">{offer.processingFee}</td>
                      <td className="p-4">{offer.tenure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tips Section */}
          <section className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 mb-12 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Tips for Choosing Vehicle Loans in India
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                Compare interest rates across banks and NBFCs for the best deal.
              </li>
              <li>
                Account for processing fees, typically 0.5-2% of the loan
                amount.
              </li>
              <li>
                Balance EMI affordability with total interest by choosing an
                optimal tenure.
              </li>
              <li>
                Aim for a credit score above 750 to secure better loan terms.
              </li>
              <li>
                Increase your down payment to lower EMI and interest costs.
              </li>
              <li>
                Check prepayment penalties, usually 1-3% of the outstanding
                amount.
              </li>
              <li>Verify eligibility with your income and existing debts.</li>
            </ul>
          </section>

          {/* FAQ Section (Static) */}
          <section className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200/20 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
