"use client";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

// Define interface for Resume/CV data
interface ResumeData {
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
  if (!date) return currentlyWorking ? "Present" : "";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return currentlyWorking ? "Present" : "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return currentlyWorking ? "Present" : "";
  }
};

// Define styles for templates
const styles = {
  modern: {
    font: "Calibri",
    headerAlignment: AlignmentType.CENTER,
    sectionTitleSize: 24,
    textSize: 20,
    spacing: { before: 200, after: 100 },
  },
  classic: {
    font: "Times New Roman",
    headerAlignment: AlignmentType.LEFT,
    sectionTitleSize: 22,
    textSize: 20,
    spacing: { before: 150, after: 80 },
  },
  professional: {
    font: "Arial",
    headerAlignment: AlignmentType.CENTER,
    sectionTitleSize: 26,
    textSize: 20,
    spacing: { before: 250, after: 120 },
  },
};

// Create DOCX document
const createDocument = (data: ResumeData, template: string, isCV: boolean) => {
  const selectedStyles =
    styles[template as keyof typeof styles] || styles.modern;

  const children: Paragraph[] = [
    // Header
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.full_name || "Anonymous",
          bold: true,
          size: 32,
          font: selectedStyles.font,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: selectedStyles.headerAlignment,
      spacing: { after: 200 },
    }),
    ...(data.personalInfo.job_title
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.job_title,
                size: selectedStyles.textSize,
                font: selectedStyles.font,
              }),
            ],
            alignment: selectedStyles.headerAlignment,
            spacing: { after: 100 },
          }),
        ]
      : []),
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone}`,
          size: selectedStyles.textSize - 2,
          font: selectedStyles.font,
        }),
      ],
      alignment: selectedStyles.headerAlignment,
      spacing: { after: 100 },
    }),
    ...(data.personalInfo.linkedin_url
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.linkedin_url,
                size: selectedStyles.textSize - 2,
                font: selectedStyles.font,
              }),
            ],
            alignment: selectedStyles.headerAlignment,
            spacing: { after: 100 },
          }),
        ]
      : []),
    ...(data.personalInfo.portfolio_url
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.portfolio_url,
                size: selectedStyles.textSize - 2,
                font: selectedStyles.font,
              }),
            ],
            alignment: selectedStyles.headerAlignment,
            spacing: { after: 100 },
          }),
        ]
      : []),
    ...(data.personalInfo.show_github && data.personalInfo.github_url
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.github_url,
                size: selectedStyles.textSize - 2,
                font: selectedStyles.font,
              }),
            ],
            alignment: selectedStyles.headerAlignment,
            spacing: { after: 100 },
          }),
        ]
      : []),
    ...(data.personalInfo.show_address && data.personalInfo.address
      ? [
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.address,
                size: selectedStyles.textSize - 2,
                font: selectedStyles.font,
              }),
            ],
            alignment: selectedStyles.headerAlignment,
            spacing: { after: 100 },
          }),
        ]
      : []),
  ];

  // Profile Summary
  if (data.profileSummary) {
    children.push(
      new Paragraph({
        text: "Profile Summary",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.profileSummary,
            size: selectedStyles.textSize,
            font: selectedStyles.font,
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  // Experience
  if (data.experience?.length > 0) {
    children.push(
      new Paragraph({
        text: "Experience",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.experience.flatMap((exp) => [
        new Paragraph({
          children: [
            new TextRun({
              text: exp.job_title,
              bold: true,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.company_name}${
                exp.location ? `, ${exp.location}` : ""
              }`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${formatDate(exp.start_date)} - ${formatDate(
                exp.end_date,
                exp.currently_working
              )}`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        ...(exp.description
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `- ${exp.description}`,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                bullet: { level: 0 },
                spacing: { after: 100 },
              }),
            ]
          : []),
      ])
    );
  }

  // Projects
  if (data.projects?.length > 0) {
    children.push(
      new Paragraph({
        text: "Projects",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.projects.flatMap((project) => [
        new Paragraph({
          children: [
            new TextRun({
              text: project.project_name,
              bold: true,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        ...(project.live_link
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Live: ${project.live_link}`,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                spacing: { after: 50 },
              }),
            ]
          : []),
        ...(project.github_url
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `GitHub: ${project.github_url}`,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                spacing: { after: 50 },
              }),
            ]
          : []),
        ...(project.tech_stack?.length > 0
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tech Stack: ${project.tech_stack.join(", ")}`,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ]
          : []),
      ])
    );
  }

  // Education
  if (data.education?.length > 0) {
    children.push(
      new Paragraph({
        text: "Education",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.education.flatMap((edu) => [
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.institution_name}${
                edu.location ? `, ${edu.location}` : ""
              }`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${formatDate(edu.start_date)} - ${formatDate(
                edu.end_date
              )}`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 100 },
        }),
      ])
    );
  }

  // Skills
  if (data.skills?.length > 0) {
    children.push(
      new Paragraph({
        text: "Skills",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.skills.join(", "),
            size: selectedStyles.textSize,
            font: selectedStyles.font,
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  // Certifications
  if (data.certifications?.length > 0) {
    children.push(
      new Paragraph({
        text: "Certifications",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.certifications.flatMap((cert) => [
        new Paragraph({
          children: [
            new TextRun({
              text: cert.certification_name,
              bold: true,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        ...(cert.issuer
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: cert.issuer,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                spacing: { after: 50 },
              }),
            ]
          : []),
        new Paragraph({
          children: [
            new TextRun({
              text: `Issued: ${formatDate(cert.issue_date)}${
                cert.expiry_date
                  ? ` | Expiry: ${formatDate(cert.expiry_date)}`
                  : ""
              }`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        ...(cert.credential_url
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: cert.credential_url,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ]
          : []),
      ])
    );
  }

  // Languages
  if (data.languages?.length > 0) {
    children.push(
      new Paragraph({
        text: "Languages",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.languages.map(
        (lang) =>
          new Paragraph({
            children: [
              new TextRun({
                text: `${lang.language}: ${lang.proficiency}`,
                size: selectedStyles.textSize,
                font: selectedStyles.font,
              }),
            ],
            spacing: { after: 100 },
          })
      )
    );
  }

  // Awards
  if (data.awards?.length > 0) {
    children.push(
      new Paragraph({
        text: "Awards & Achievements",
        heading: HeadingLevel.HEADING_2,
        spacing: selectedStyles.spacing,
      }),
      ...data.awards.flatMap((award) => [
        new Paragraph({
          children: [
            new TextRun({
              text: award.award_title,
              bold: true,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${award.issuer}, ${award.year}`,
              size: selectedStyles.textSize,
              font: selectedStyles.font,
            }),
          ],
          spacing: { after: 50 },
        }),
        ...(award.brief_note
          ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `- ${award.brief_note}`,
                    size: selectedStyles.textSize,
                    font: selectedStyles.font,
                  }),
                ],
                bullet: { level: 0 },
                spacing: { after: 100 },
              }),
            ]
          : []),
      ])
    );
  }

  // CV Additional Sections
  if (isCV && data.additionalSections) {
    if (data.additionalSections.publications?.length > 0) {
      children.push(
        new Paragraph({
          text: "Publications",
          heading: HeadingLevel.HEADING_2,
          spacing: selectedStyles.spacing,
        }),
        ...data.additionalSections.publications.flatMap((pub) => [
          new Paragraph({
            children: [
              new TextRun({
                text: pub.title,
                bold: true,
                size: selectedStyles.textSize,
                font: selectedStyles.font,
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${pub.journal}, ${formatDate(pub.date)}`,
                size: selectedStyles.textSize,
                font: selectedStyles.font,
              }),
            ],
            spacing: { after: 50 },
          }),
          ...(pub.url
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: pub.url,
                      size: selectedStyles.textSize,
                      font: selectedStyles.font,
                    }),
                  ],
                  spacing: { after: 100 },
                }),
              ]
            : []),
        ])
      );
    }
    if (data.additionalSections.conferences?.length > 0) {
      children.push(
        new Paragraph({
          text: "Conferences",
          heading: HeadingLevel.HEADING_2,
          spacing: selectedStyles.spacing,
        }),
        ...data.additionalSections.conferences.map(
          (conf) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${conf.title}, ${conf.role}, ${
                    conf.location
                  }, ${formatDate(conf.date)}`,
                  size: selectedStyles.textSize,
                  font: selectedStyles.font,
                }),
              ],
              spacing: { after: 100 },
            })
        )
      );
    }
    if (data.additionalSections.teaching?.length > 0) {
      children.push(
        new Paragraph({
          text: "Teaching Experience",
          heading: HeadingLevel.HEADING_2,
          spacing: selectedStyles.spacing,
        }),
        ...data.additionalSections.teaching.map(
          (teach) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${teach.course}, ${teach.institution}, ${teach.semester}`,
                  size: selectedStyles.textSize,
                  font: selectedStyles.font,
                }),
              ],
              spacing: { after: 100 },
            })
        )
      );
    }
    if (data.additionalSections.fellowships?.length > 0) {
      children.push(
        new Paragraph({
          text: "Fellowships",
          heading: HeadingLevel.HEADING_2,
          spacing: selectedStyles.spacing,
        }),
        ...data.additionalSections.fellowships.map(
          (fellow) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${fellow.title}, ${fellow.issuer}, ${fellow.year}${
                    fellow.amount ? ` (${fellow.amount})` : ""
                  }`,
                  size: selectedStyles.textSize,
                  font: selectedStyles.font,
                }),
              ],
              spacing: { after: 100 },
            })
        )
      );
    }
  }

  return new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
};

// Export function
export async function generateDocx(
  data: ResumeData,
  template: string,
  isCV: boolean
) {
  try {
    if (!data) throw new Error("No data provided");
    const doc = createDocument(data, template, isCV);
    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `${data.personalInfo.full_name || "download"}-${
        isCV ? "CV" : "Resume"
      }.docx`
    );
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw new Error(
      "Failed to generate DOCX. Please check your data and try again."
    );
  }
}
