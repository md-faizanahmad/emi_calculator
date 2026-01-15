// app/components/BlogPreview.jsx
import BlogPreviewClient from "./BlogPreviewClient";

export default function BlogPreview() {
  const blogPosts = [
    { title: "How to Choose the Right Loan Tenure", url: "/blogs" },
    { title: "Top 5 Tips for Managing EMIs", url: "/blogs" },
    {
      title: "Understanding Interest Rates in 2025",
      url: "/blogs",
    },
  ];

  return <BlogPreviewClient blogPosts={blogPosts} />;
}
