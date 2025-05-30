import clientPromise from "@/lib/mongodb";
import { Blog } from "api/models/Blog";
import { ObjectId } from "mongodb";

const DB_NAME = "myapp";

export async function createBlog(data: Blog) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const { _id, ...rest } = data;

  const result = await db.collection("blogs").insertOne({
    ...rest,
    createdAt: new Date(),
  });

  return result;
}

export async function getBlogs() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const blogs = await db
    .collection("blogs")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return blogs;
}

export async function getBlog(id: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const blog = await db
    .collection("blogs")
    .findOne({ _id: new ObjectId(id) });

  return blog;
}

export async function updateBlog(id: string, data: Blog) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });

  return result;
}

export async function deleteBlog(id: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db
    .collection("blogs")
    .deleteOne({ _id: new ObjectId(id) });

  return result;
}