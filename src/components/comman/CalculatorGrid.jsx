// app/components/CalculatorGrid.jsx
import CalculatorGridClient from "./CalculatorGridClient";

export default function CalculatorGrid() {
  const calculators = [
    {
      title: "Home Loan EMI Calculator",
      description:
        "Calculate your home loan EMIs with precise monthly payment breakdowns.",
      icon: "🏠",
      url: "/calculators/homeloan",
    },
    {
      title: "Car Loan Calculator",
      description:
        "Estimate affordable monthly payments for your car , bike, and any vechile loan with ease.",
      icon: "🚗,🏍️",
      url: "/calculators/vehicleloan",
    },

    {
      title: "Product EMI Calculator",
      description:
        "Plan purchases with monthly installment calculations for any product.",
      icon: "🛒",
      url: "/calculators/gadgetloan",
    },
    {
      title: "Salary-Based Loan Calculator",
      description:
        "Estimate loan affordability based on your income for manageable payments.",
      icon: "💼",
      url: "/calculators/basedonsalary",
    },
    {
      title: "Salary Break-up",
      description:
        "Calculate your in-hand salary your CTC, deductions, and others  detailed breakup .",
      icon: "💸",
      url: "/calculators/salarybreakup",
    },
  ];

  return <CalculatorGridClient calculators={calculators} />;
}
