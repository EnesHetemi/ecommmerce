import { createBlog, getBlogs } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newBlog = req.body;
      const result = await createBlog(newBlog);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Gabim në POST /api/blogs:", error);
      return res.status(500).json({ message: "Gabim në server" });
    }
  } else if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      return res.status(200).json(blogs);
    } catch (error) {
      console.error("Gabim në GET /api/blogs:", error);
      return res.status(500).json({ message: "Gabim në server" });
    }
  } else {
    // vetem nëse nuk është as POST as GET
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      message: `Metoda ${req.method} nuk është e mbështetur për këtë endpoint`,
    });
  }
}