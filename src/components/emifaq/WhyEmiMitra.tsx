// app/components/WhyEmiMitra.jsx
import WhyEmiMitraClient from "./WhyEmiMitraClient";

export default function WhyEmiMitra() {
  const benefits = [
    {
      title: "Accurate Calculations",
      description:
        "Get precise EMI estimates using standard financial formulas.",
      icon: "📊",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Simple, intuitive tools for quick calculations without hassle.",
      icon: "🖥️",
    },
    {
      title: "Free & No Data Store",
      description:
        "No login required, completely free for all users , we not store data .",
      icon: "🆓",
    },
  ];

  return <WhyEmiMitraClient benefits={benefits} />;
}
