// app/components/WhatIsEmi.tsx (Server Component)

import WhatIsEmiClient from "./WhatIsEmiClient";

export default function WhatIsEmi() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Semantic SEO Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Understanding <span className="text-blue-600">EMI</span>
        </h2>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          An <strong>Equated Monthly Installment (EMI)</strong> is a fixed
          payment amount made by a borrower to a lender at a specified date each
          calendar month. EMIs are used to pay off both{" "}
          <strong>interest and principal</strong> every month so that over a
          specified number of years, the loan is paid off in full.
        </p>
      </div>

      {/* Pass data to the Client Component for animation */}
      <WhatIsEmiClient />
    </section>
  );
}
