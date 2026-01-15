// import { saveAs } from "file-saver";

// // Define ResumeData interface (same as before, but simplified for brevity)
// export interface ResumeData {
//   personalInfo: {
//     full_name: string;
//     job_title: string;
//     email: string;
//     phone: string;
//     linkedin_url: string;
//     portfolio_url: string;
//     github_url: string;
//     show_github: boolean;
//     address: string;
//     show_address: boolean;
//   };
//   profileSummary: string;
//   experience: Array<{
//     job_title: string;
//     company_name: string;
//     location: string;
//     start_date: string;
//     end_date: string;
//     currently_working: boolean;
//     description: string;
//   }>;
//   projects: Array<{
//     project_name: string;
//     live_link: string;
//     github_url: string;
//     tech_stack: string[];
//   }>;
//   education: Array<{
//     degree: string;
//     institution_name: string;
//     start_date: string;
//     end_date: string;
//     location: string;
//   }>;
//   skills: string[];
//   certifications: Array<{
//     certification_name: string;
//     issuer: string;
//     issue_date: string;
//     expiry_date: string;
//     credential_url: string;
//   }>;
//   languages: Array<{
//     language: string;
//     proficiency: string;
//   }>;
//   awards: Array<{
//     award_title: string;
//     issuer: string;
//     year: string;
//     brief_note: string;
//   }>;
// }

// // Format date
// const formatDate = (
//   date: string,
//   currentlyWorking: boolean = false
// ): string => {
//   if (!date) return currentlyWorking ? "Present" : "N/A";
//   try {
//     const d = new Date(date);
//     if (isNaN(d.getTime())) return currentlyWorking ? "Present" : "N/A";
//     return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
//   } catch {
//     return currentlyWorking ? "Present" : "N/A";
//   }
// };

// // Generate Markdown content
// const generateMarkdown = (data: ResumeData, isCV: boolean = false): string => {
//   let markdown = `# ${data.personalInfo.full_name || "Anonymous"}\n`;

//   if (data.personalInfo.job_title)
//     markdown += `**${data.personalInfo.job_title}**\n\n`;
//   markdown += `**Contact Information**:\n`;
//   markdown += `- Email: ${data.personalInfo.email || "N/A"}\n`;
//   markdown += `- Phone: ${data.personalInfo.phone || "N/A"}\n`;
//   if (data.personalInfo.linkedin_url)
//     markdown += `- LinkedIn: ${data.personalInfo.linkedin_url}\n`;
//   if (data.personalInfo.portfolio_url)
//     markdown += `- Portfolio: ${data.personalInfo.portfolio_url}\n`;
//   if (data.personalInfo.show_github && data.personalInfo.github_url)
//     markdown += `- GitHub: ${data.personalInfo.github_url}\n`;
//   if (data.personalInfo.show_address && data.personalInfo.address)
//     markdown += `- Address: ${data.personalInfo.address}\n`;
//   markdown += `\n`;

//   if (data.profileSummary) {
//     markdown += `## Profile Summary\n${data.profileSummary}\n\n`;
//   }

//   if (data.experience?.length) {
//     markdown += `## Experience\n`;
//     data.experience.forEach((exp, index) => {
//       markdown += `### ${exp.job_title || "Untitled"}\n`;
//       markdown += `${exp.company_name || "N/A"}${
//         exp.location ? `, ${exp.location}` : ""
//       }\n`;
//       markdown += `${formatDate(exp.start_date)} - ${formatDate(
//         exp.end_date,
//         exp.currently_working
//       )}\n`;
//       if (exp.description) markdown += `- ${exp.description}\n`;
//       markdown += `\n`;
//     });
//   }

//   if (data.projects?.length) {
//     markdown += `## Projects\n`;
//     data.projects.forEach((project, index) => {
//       markdown += `### ${project.project_name || "Untitled"}\n`;
//       if (project.live_link) markdown += `- Live: ${project.live_link}\n`;
//       if (project.github_url) markdown += `- GitHub: ${project.github_url}\n`;
//       if (project.tech_stack?.length)
//         markdown += `- Tech Stack: ${project.tech_stack.join(", ")}\n`;
//       markdown += `\n`;
//     });
//   }

//   if (data.education?.length) {
//     markdown += `## Education\n`;
//     data.education.forEach((edu, index) => {
//       markdown += `### ${edu.degree || "N/A"}\n`;
//       markdown += `${edu.institution_name || "N/A"}${
//         edu.location ? `, ${edu.location}` : ""
//       }\n`;
//       markdown += `${formatDate(edu.start_date)} - ${formatDate(
//         edu.end_date
//       )}\n`;
//       markdown += `\n`;
//     });
//   }

//   if (data.skills?.length) {
//     markdown += `## Skills\n${data.skills.join(", ")}\n\n`;
//   }

//   if (data.certifications?.length) {
//     markdown += `## Certifications\n`;
//     data.certifications.forEach((cert, index) => {
//       markdown += `### ${cert.certification_name || "Untitled"}\n`;
//       if (cert.issuer) markdown += `- Issuer: ${cert.issuer}\n`;
//       markdown += `- Issued: ${formatDate(cert.issue_date)}`;
//       if (cert.expiry_date)
//         markdown += ` | Expires: ${formatDate(cert.expiry_date)}\n`;
//       if (cert.credential_url)
//         markdown += `- Credential: ${cert.credential_url}\n`;
//       markdown += `\n`;
//     });
//   }

//   if (data.languages?.length) {
//     markdown += `## Languages\n`;
//     data.languages.forEach((lang, index) => {
//       markdown += `- ${lang.language || "N/A"}: ${lang.proficiency || "N/A"}\n`;
//     });
//     markdown += `\n`;
//   }

//   if (data.awards?.length) {
//     markdown += `## Awards & Achievements\n`;
//     data.awards.forEach((award, index) => {
//       markdown += `### ${award.award_title || "Untitled"}\n`;
//       markdown += `- ${award.issuer || "N/A"}, ${award.year || "N/A"}\n`;
//       if (award.brief_note) markdown += `- ${award.brief_note}\n`;
//       markdown += `\n`;
//     });
//   }

//   return markdown;
// };

// // Load Google API client
// const loadGapiClient = (): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = "https://apis.google.com/js/api.js";
//     script.onload = () => {
//       window.gapi.load("client:auth2", async () => {
//         try {
//           await window.gapi.client.init({
//             clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Cloud Client ID
//             discoveryDocs: [
//               "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
//             ],
//             scope: "https://www.googleapis.com/auth/drive.file",
//           });
//           resolve();
//         } catch (error) {
//           reject(error);
//         }
//       });
//     };
//     script.onerror = () =>
//       reject(new Error("Failed to load Google API script"));
//     document.body.appendChild(script);
//   });
// };

// // Export to Google Drive and download as PDF
// export const exportToGoogleDrive = async (
//   data: ResumeData,
//   template: string = "modern",
//   isCV: boolean = false
// ): Promise<void> => {
//   try {
//     if (!data?.personalInfo) {
//       throw new Error("Invalid or missing data");
//     }

//     // Load and initialize Google API client
//     await loadGapiClient();

//     // Authenticate user
//     const authInstance = window.gapi.auth2.getAuthInstance();
//     if (!authInstance.isSignedIn.get()) {
//       await authInstance.signIn();
//     }

//     // Generate Markdown content
//     const markdownContent = generateMarkdown(data, isCV);
//     const blob = new Blob([markdownContent], { type: "text/markdown" });

//     // Upload to Google Drive
//     const metadata = {
//       name: `${data.personalInfo.full_name || "document"}-${
//         isCV ? "CV" : "Resume"
//       }.md`,
//       mimeType: "text/markdown",
//     };

//     const form = new FormData();
//     form.append(
//       "metadata",
//       new Blob([JSON.stringify(metadata)], { type: "application/json" })
//     );
//     form.append("file", blob);

//     const accessToken = authInstance.currentUser
//       .get()
//       .getAuthResponse().access_token;
//     const uploadResponse = await fetch(
//       "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: form,
//       }
//     );

//     if (!uploadResponse.ok) {
//       throw new Error(`Upload failed: ${uploadResponse.statusText}`);
//     }

//     const file = await uploadResponse.json();

//     // Set file permissions to allow download
//     await fetch(
//       `https://www.googleapis.com/drive/v3/files/${file.id}/permissions`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           role: "reader",
//           type: "anyone",
//         }),
//       }
//     );

//     // Trigger PDF download
//     const pdfUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=application/pdf`;
//     const pdfResponse = await fetch(pdfUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!pdfResponse.ok) {
//       throw new Error(`PDF export failed: ${pdfResponse.statusText}`);
//     }

//     const pdfBlob = await pdfResponse.blob();
//     saveAs(
//       pdfBlob,
//       `${data.personalInfo.full_name || "document"}-${
//         isCV ? "CV" : "Resume"
//       }.pdf`
//     );
//   } catch (error) {
//     console.error("Error exporting to Google Drive:", error);
//     throw new Error("Failed to export to Google Drive. Please try again.");
//   }
// };
