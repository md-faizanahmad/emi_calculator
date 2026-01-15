// import React from "react";

// function GadgetLoan() {
//   return (
//     <div>
//       <ProductEmiCal />
//     </div>
//   );
// }

// export default GadgetLoan;
import { Suspense } from "react";
import ProductEmiCal from "@/components/gadgetcal/ProductClientCal";

export const metadata = {
  title: "EMI Mitra - Product EMI Calculator | Easy Financing",
  description:
    "Calculate your EMI for furniture, electronics, and more with EMI Mitra's Product EMI Calculator. Plan your purchases with ease and transparency.",
  keywords:
    "EMI calculator, product financing, EMI Mitra, loan calculator, furniture EMI, electronics EMI",
  robots: "index, follow",
};

export default function GadgetLoan() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center text-white">
            Loading...
          </div>
        }
      >
        <ProductEmiCal />
      </Suspense>
    </>
  );
}
