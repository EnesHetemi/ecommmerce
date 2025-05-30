import type { NextApiRequest, NextApiResponse } from "next";
import { deleteNews, updateNews, getSingleNews } from "api/services/news";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const news = await getSingleNews(id as string);
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së newsit" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const data = req.body;
      const news = await updateNews(id as string, data);
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë përditësimit të newsit" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const news = await deleteNews(id as string);
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë fshirjes së newsit" });
    }
  }
}