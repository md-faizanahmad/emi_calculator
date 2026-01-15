import { ResumeData } from "@/lib/pdf-generator";

export const generatePDF = async (
  data: ResumeData,
  template: string = "modern",
  isCV: boolean = false
): Promise<void> => {
  if (
    !data?.personalInfo?.full_name ||
    !data?.personalInfo?.email ||
    !data?.personalInfo?.phone
  ) {
    throw new Error("Missing required fields: full_name, email, or phone");
  }

  const response = await fetch("/api/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, template, isCV }),
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.statusText}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.personalInfo.full_name || "document"}-${
    isCV ? "CV" : "Resume"
  }.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
};
