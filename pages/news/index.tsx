import { News } from "@/api/models/News";
import { useNewsContext } from "@/lib/contexts/NewsContext";
import { CircularProgress, Link } from "@mui/material";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NewsPage() {
  const router = useRouter();
  const { news, setNews } = useNewsContext();
  const { data, loading, remove } = useFetch<News[]>("/api/news");

  useEffect(() => {
    if (data) setNews(data);
  }, [data]);

  const handleDeleteNews = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt që dëshironi ta fshini këtë lajm?");
    if (!confirmed) return;

    try {
      await remove(`/api/news/${id}`);
      alert("Lajmi u fshi me sukses.");
      router.reload();
    } catch (error) {
      alert("Gabim gjatë fshirjes së lajmit.");
      console.error(error);
    }
  };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="bg-gray-200 w-full">
            <div className="text-4xl font-bold pt-20 pb-6 text-black text-center">
              Shfaqja e News-ave nga databaza jonë
            </div>

            <div className="grid grid-cols-3 gap-6 px-4">
              {news?.length ? (
                news.map((post: News) => (
                  <motion.section
                    key={post._id?.toString()}
                    className="max-w-6xl py-10 px-6 text-center bg-white rounded-xl shadow-md"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-yellow-600 uppercase line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-6">{post.body}</p>

                    <div className="flex justify-center gap-4">
                      <Link href={`/update/news/${post._id}`}>
                        <button className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition">
                          Përditëso
                        </button>
                      </Link>

                      <button
                        onClick={() => post._id && handleDeleteNews(post._id.toString())}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                      >
                        Fshij
                      </button>
                    </div>
                  </motion.section>
                ))
              ) : (
                <div className="text-center text-gray-600 col-span-3">
                  Nuk ka lajme për t'u shfaqur.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

NewsPage.displayName = "News | My Application";