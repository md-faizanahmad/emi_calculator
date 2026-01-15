// import { MetadataRoute } from "next";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: "*",
//       allow: "/",
//     },
//     sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
//   };
// }
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/calculators/carloan",
          "/calculators/homeloan",
          "/calculators/basedonsalary",
          "/about",
          "/blogs",
          "/emifaq",
          "/privacy-policy",
          "/term_of_use",
          "/contact_us",
        ],

        disallow: ["/private/", "/admin/"],
      },
    ],
    sitemap: "https://emimitra.online/sitemap.xml",
  };
}
