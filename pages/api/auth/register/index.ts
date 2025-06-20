import { createUser, getUser } from "@/api/services/User";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body as UserInput;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Ju lutem plotësoni të gjitha fushat" });
    }

    try {
      const existingUser = await getUser(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "Email-i është i regjistruar tashmë" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      const result = await createUser(newUser);
      res.status(201).json({
        message: "Përdoruesi u regjistrua me sukses",
        userId: result.insertedId,
      });
    } catch (error) {
      res.status(500).json({ error: "Gabim gjatë regjistrimit" });
    }
  } else {
    res.status(405).json({ error: "Metoda nuk lejohet" });
  }
}