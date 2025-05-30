import type { NextApiRequest, NextApiResponse } from "next";
import { getNews, createNews } from "@/api/services/news";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const newNews = req.body;
      const result = await createNews(newNews);
      return res.status(201).json(result);
    } else if (req.method === "GET") {
      const news = await getNews();
      return res.status(200).json(news);
    } else {
      return res
        .status(405)
        .json({ message: "Metoda e kërkesës nuk është e mbështetur" });
    }
  } catch (error) {
    console.error("Gabim në /api/news:", error);
    return res
      .status(500)
      .json({ message: "Gabim i brendshëm i serverit", error });
  }
}