import Link from "next/link";
import AboutMotion from "./Motion";
import { Header } from "@/components/header/Header";
import Footer from "@/components/comman/Footer";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About EMI Mitra | Student Toolkit & Calculator</title>
        <meta
          name="description"
          content="Discover EMI Mitra, your all-in-one toolkit for students and daily life. Calculate EMIs, create resumes, convert images to PDFs, and more, with no data storage for your privacy."
        />
        <meta
          name="keywords"
          content="EMI calculator, student calculator, resume maker, image to PDF converter, loan calculator, Emi Mitra, finance tool, student toolkit, privacy-focused"
        />
        <meta
          property="og:title"
          content="About EMI Mitra | Student Toolkit & Calculator"
        />
        <meta
          property="og:description"
          content="EMI Mitra offers tools for students and professionals, including EMI calculators, resume builders, and image to PDF converters, all while prioritizing your privacy."
        />
        <meta property="og:url" content="https://emimitra.online/about" />
        <meta property="og:image" content="https://emimitra.online/logo.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://emimitra.online/about" />
      </Head>
      <div>
        <Header />
        <AboutMotion>
          <section
            className="w-full max-w-5xl mx-auto px-4 py-12"
            itemScope
            itemType="http://schema.org/AboutPage"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-black text-center mb-8">
              About EMI Mitra: Your Ultimate Student and Daily Life Toolkit
            </h2>
            <div className="text-black rounded-lg p-6  ">
              <div className="flex flex-col items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                  Empowering Students and Professionals
                </h3>
              </div>
              <p
                className="text-gray-600 dark:text-black-300 mb-4 text-center"
                itemProp="description"
              >
                EMI Mitra is more than just an EMI calculator—it’s a
                comprehensive toolkit designed to simplify financial planning
                and daily tasks for students, professionals, and anyone
                navigating life’s challenges. Whether you’re calculating loan
                EMIs for a home, car, or personal needs, creating a professional
                resume, or converting images to PDFs, EMI Mitra offers free,
                user-friendly tools to make your life easier. Our mission is to
                empower you with accurate, accessible, and privacy-focused
                solutions, ensuring you can focus on what matters most.
              </p>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-black mb-2">
                Why EMI Mitra Stands Out
              </h4>
              <p className="text-gray-600 dark:text-black-300 mb-4">
                At EMI Mitra, we understand the diverse needs of students and
                professionals. Our platform goes beyond traditional EMI
                calculations to offer a suite of tools tailored for academic and
                daily life success. From financial planning to productivity,
                we’ve got you covered with features like:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-black-300 mb-6 space-y-2">
                <li>
                  <strong>EMI Calculator</strong>: Instantly calculate EMIs for
                  home loans, car loans, bike loans, or personal loans based on
                  your budget or salary, with detailed payment schedules.
                </li>
                <li>
                  <strong>Resume Maker</strong>: Create professional resumes
                  with customizable templates, perfect for students applying for
                  internships or jobs.
                </li>
                <li>
                  <strong>Image to PDF Converter</strong>: Convert images to
                  PDFs quickly and securely, ideal for submitting assignments or
                  documents without storing your files.
                </li>
                <li>
                  <strong>Student Calculator</strong>: Perform quick
                  calculations for budgeting, percentages, or academic needs,
                  all in one place.
                </li>
                <li>
                  <strong>Privacy-First Approach</strong>: We do not save your
                  data or PDFs, ensuring your personal information remains
                  secure and private.
                </li>
                <li>
                  <strong>Progressive Web App (PWA)</strong>: Access our tools
                  anytime, anywhere, even offline, on any device.
                </li>
              </ul>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-black mb-2">
                Privacy You Can Trust
              </h4>
              <p className="text-gray-600 dark:text-black-300 mb-6">
                Your privacy is our priority. Unlike other platforms, EMI Mitra
                does not store your data, calculations, or uploaded files, such
                as PDFs or images. All processing happens client-side, meaning
                your information stays with you. Whether you’re using our resume
                maker, image to PDF converter, or EMI calculator, you can trust
                that your data is safe and never saved on our servers.
              </p>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-black mb-2">
                Built for Students and Beyond
              </h4>
              <p className="text-gray-600 dark:text-black-300 mb-6">
                EMI Mitra is designed with students in mind, offering tools to
                manage both academic and financial responsibilities. Need to
                budget for a student loan? Our EMI calculator helps you plan
                repayments. Preparing for a job interview? Use our resume maker
                to stand out. Submitting assignments? Convert images to PDFs
                effortlessly. Our tools are free, intuitive, and optimized for
                SEO searches like “student calculator,” “resume maker,” and
                “image to PDF converter,” making EMI Mitra your go-to resource
                for daily life.
              </p>
              <div className="text-center">
                <Link title="Calculate Button" href="/">
                  <button className="px-6 cursor-pointer py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Start
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <Footer />
        </AboutMotion>
      </div>
    </>
  );
};

export default About;
