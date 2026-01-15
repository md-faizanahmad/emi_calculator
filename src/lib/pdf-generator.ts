// src/lib/pdf-generator.ts
import { saveAs } from "file-saver";

// Define full ResumeData interface
export interface ResumeData {
  personalInfo: {
    full_name: string;
    job_title: string;
    email: string;
    phone: string;
    linkedin_url: string;
    portfolio_url: string;
    github_url: string;
    show_github: boolean;
    address: string;
    show_address: boolean;
  };
  profileSummary: string;
  experience: Array<{
    job_title: string;
    company_name: string;
    location: string;
    start_date: string;
    end_date: string;
    currently_working: boolean;
    description: string;
  }>;
  projects: Array<{
    project_name: string;
    live_link: string;
    github_url: string;
    tech_stack: string[];
  }>;
  education: Array<{
    degree: string;
    institution_name: string;
    start_date: string;
    end_date: string;
    location: string;
  }>;
  skills: string[];
  certifications: Array<{
    certification_name: string;
    issuer: string;
    issue_date: string;
    expiry_date: string;
    credential_url: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  awards: Array<{
    award_title: string;
    issuer: string;
    year: string;
    brief_note: string;
  }>;
  additionalSections?: {
    publications: Array<{
      title: string;
      journal: string;
      date: string;
      url: string;
    }>;
    conferences: Array<{
      title: string;
      role: string;
      location: string;
      date: string;
    }>;
    teaching: Array<{ course: string; institution: string; semester: string }>;
    fellowships: Array<{
      title: string;
      amount: string;
      issuer: string;
      year: string;
    }>;
  };
}

// Format date
const formatDate = (
  date: string,
  currentlyWorking: boolean = false
): string => {
  if (!date) return currentlyWorking ? "Present" : "N/A";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return currentlyWorking ? "Present" : "N/A";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return currentlyWorking ? "Present" : "N/A";
  }
};

// Generate HTML string
export const generateHtml = (
  data: ResumeData,
  isCV: boolean = false
): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 10pt;
            line-height: 1.4;
            color: #000000;
            margin: 30pt;
            width: 535pt; /* A4 width (595pt) - margins */
          }
          .header {
            text-align: center;
            margin-bottom: 15pt;
          }
          .name {
            font-size: 20pt;
            font-weight: bold;
            margin-bottom: 5pt;
          }
          .contact {
            font-size: 9pt;
            margin-bottom: 2pt;
          }
          .section {
            margin-bottom: 10pt;
          }
          .section-title {
            font-size: 12pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5pt;
          }
          .text {
            margin-bottom: 3pt;
          }
          .list-item {
            margin-left: 10pt;
            margin-bottom: 2pt;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${data.personalInfo.full_name || "Anonymous"}</div>
          ${
            data.personalInfo.job_title
              ? `<div class="contact">${data.personalInfo.job_title}</div>`
              : ""
          }
          <div class="contact">${data.personalInfo.email || "N/A"} | ${
    data.personalInfo.phone || "N/A"
  }</div>
          ${
            data.personalInfo.linkedin_url
              ? `<div class="contact">${data.personalInfo.linkedin_url}</div>`
              : ""
          }
          ${
            data.personalInfo.portfolio_url
              ? `<div class="contact">${data.personalInfo.portfolio_url}</div>`
              : ""
          }
          ${
            data.personalInfo.show_github && data.personalInfo.github_url
              ? `<div class="contact">${data.personalInfo.github_url}</div>`
              : ""
          }
          ${
            data.personalInfo.show_address && data.personalInfo.address
              ? `<div class="contact">${data.personalInfo.address}</div>`
              : ""
          }
        </div>
        ${
          data.profileSummary
            ? `
          <div class="section">
            <div class="section-title">Profile Summary</div>
            <div class="text">${data.profileSummary}</div>
          </div>
        `
            : ""
        }
        ${
          data.experience?.length
            ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${data.experience
              .map(
                (exp, index) => `
              <div class="text" key="exp-${index}">
                <div style="font-weight: bold">${
                  exp.job_title || "Untitled"
                }</div>
                <div>${exp.company_name || "N/A"}${
                  exp.location ? `, ${exp.location}` : ""
                }</div>
                <div>${formatDate(exp.start_date)} - ${formatDate(
                  exp.end_date,
                  exp.currently_working
                )}</div>
                ${
                  exp.description
                    ? `<div class="list-item">- ${exp.description}</div>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          data.projects?.length
            ? `
          <div class="section">
            <div class="section-title">Projects</div>
            ${data.projects
              .map(
                (project, index) => `
              <div class="text" key="project-${index}">
                <div style="font-weight: bold">${
                  project.project_name || "Untitled"
                }</div>
                ${
                  project.live_link
                    ? `<div>Live: ${project.live_link}</div>`
                    : ""
                }
                ${
                  project.github_url
                    ? `<div>GitHub: ${project.github_url}</div>`
                    : ""
                }
                ${
                  project.tech_stack?.length
                    ? `<div>Tech Stack: ${project.tech_stack.join(", ")}</div>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          data.education?.length
            ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${data.education
              .map(
                (edu, index) => `
              <div class="text" key="edu-${index}">
                <div style="font-weight: bold">${edu.degree || "Untitled"}</div>
                <div>${edu.institution_name || "N/A"}${
                  edu.location ? `, ${edu.location}` : ""
                }</div>
                <div>${formatDate(edu.start_date)} - ${formatDate(
                  edu.end_date
                )}</div>
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          data.skills?.length
            ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="text">${data.skills.join(", ")}</div>
          </div>
        `
            : ""
        }
        ${
          data.certifications?.length
            ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            ${data.certifications
              .map(
                (cert, index) => `
              <div class="text" key="cert-${index}">
                <div style="font-weight: bold">${
                  cert.certification_name || "Untitled"
                }</div>
                ${cert.issuer ? `<div>${cert.issuer}</div>` : ""}
                <div>Issued: ${formatDate(cert.issue_date)}${
                  cert.expiry_date
                    ? ` | Expires: ${formatDate(cert.expiry_date)}`
                    : ""
                }</div>
                ${
                  cert.credential_url ? `<div>${cert.credential_url}</div>` : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          data.languages?.length
            ? `
          <div class="section">
            <div class="section-title">Languages</div>
            ${data.languages
              .map(
                (lang, index) => `
              <div class="text" key="lang-${index}">
                <div>${lang.language || "N/A"}: ${
                  lang.proficiency || "N/A"
                }</div>
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          data.awards?.length
            ? `
          <div class="section">
            <div class="section-title">Awards & Achievements</div>
            ${data.awards
              .map(
                (award, index) => `
              <div class="text" key="award-${index}">
                <div style="font-weight: bold">${
                  award.award_title || "Untitled"
                }</div>
                <div>${award.issuer || "N/A"}, ${award.year || "N/A"}</div>
                ${
                  award.brief_note
                    ? `<div class="list-item">- ${award.brief_note}</div>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
        ${
          isCV && data.additionalSections
            ? `
          ${
            data.additionalSections.publications?.length
              ? `
            <div class="section">
              <div class="section-title">Publications</div>
              ${data.additionalSections.publications
                .map(
                  (pub, index) => `
                <div class="text" key="pub-${index}">
                  <div style="font-weight: bold">${
                    pub.title || "Untitled"
                  }</div>
                  <div>${pub.journal || "N/A"}, ${formatDate(pub.date)}</div>
                  ${pub.url ? `<div>${pub.url}</div>` : ""}
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          ${
            data.additionalSections.conferences?.length
              ? `
            <div class="section">
              <div class="section-title">Conferences</div>
              ${data.additionalSections.conferences
                .map(
                  (conf, index) => `
                <div class="text" key="conf-${index}">
                  <div style="font-weight: bold">${
                    conf.title || "Untitled"
                  }</div>
                  <div>${conf.role || "N/A"}, ${
                    conf.location || "N/A"
                  }, ${formatDate(conf.date)}</div>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          ${
            data.additionalSections.teaching?.length
              ? `
            <div class="section">
              <div class="section-title">Teaching Experience</div>
              ${data.additionalSections.teaching
                .map(
                  (teach, index) => `
                <div class="text" key="teach-${index}">
                  <div style="font-weight: bold">${
                    teach.course || "Untitled"
                  }</div>
                  <div>${teach.institution || "N/A"}, ${
                    teach.semester || "N/A"
                  }</div>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          ${
            data.additionalSections.fellowships?.length
              ? `
            <div class="section">
              <div class="section-title">Fellowships</div>
              ${data.additionalSections.fellowships
                .map(
                  (fellow, index) => `
                <div class="text" key="fellow-${index}">
                  <div style="font-weight: bold">${
                    fellow.title || "Untitled"
                  }</div>
                  <div>${fellow.issuer || "N/A"}, ${fellow.year || "N/A"}${
                    fellow.amount ? ` (${fellow.amount})` : ""
                  }</div>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        `
            : ""
        }
      </body>
    </html>
  `;
};

// Client-side function to call API route
export const generatePDF = async (
  data: ResumeData,
  template: string = "modern",
  isCV: boolean = false
): Promise<void> => {
  try {
    if (!data?.personalInfo) {
      throw new Error("Invalid or missing data");
    }
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, template, isCV }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const blob = await response.blob();
    saveAs(
      blob,
      `${data.personalInfo.full_name || "document"}-${
        isCV ? "CV" : "Resume"
      }.pdf`
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(
      "Failed to generate PDF. Please check your data and try again."
    );
  }
};
