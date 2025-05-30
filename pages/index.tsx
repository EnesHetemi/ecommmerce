import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/images.png";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { BarChart, Rocket, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "hooks/useFetch";
import { CircularProgress } from "@mui/material";

export interface Post{
  id: string;
  title: string;
  body: string;
}

export default function Home() {

  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const router = useRouter();

  const handleClick = () => {
    alert("A deshironi te shkoni te faqja e Kontaktit.");
    router.push("/contact");
  };
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Hero Section */}
        <motion.section
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Mirë se Vini në Aplikacionin Tonë!
          </h1>
          <p className="text-xl">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>
          <Button 
          text="Meso Me Shume"
          variant="secondary"
          onClick={() => alert("Redirecting...")} />
        </motion.section>

        {/* About Section */}
<motion.section
  className="max-w-6xl py-20 px-6 text-center"
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold mb-6 text-yellow-600">
    Rreth Nesh
  </h2>
  <p className="text-gray-700 mb-6">
    Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit.
    Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-friendly.
  </p>
  <Image
    src={CustomImage}
    alt="Imazh Rreth Nesh"
    width={500}
    height={300}
    className="rounded-xl"
  />
</motion.section>

    {/* Features Section */}
<motion.section
  className="w-full py-20 bg-gray-200 text-center"
  initial={{ x: 100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1 }}
>
  <div className="container m-auto">
    <h2 className="text-4xl font-bold mb-6 text-yellow-600">
      Karakteristikat Kryesore
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <Card
    title="Shpejtësi & Performance"
    description="Aplikacionet më të shpejta me optimizim të avancuar."
    icon={Rocket}
  />

  <Card
    title="SEO e Avancuar"
    description="Rankim më i mirë në motorët e kërkimit."
    icon={BarChart}
  />

  <Card
    title="Siguri Maksimale"
    description="Mbrojtje e të dhënave dhe siguri e lartë për përdoruesit."
    icon={ShieldCheck}
  />
  </div>
  </div>
</motion.section>

<motion.section
  className="max-w-6xl py-20 px-6 text-center"
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold mb-6 text-yellow-600">
    Shërbimet Tona
  </h2>
  <p className="text-gray-700 mb-6">
    Ofrojmë një gamë të gjerë shërbimesh duke përfshirë zhvillimin e aplikacioneve web, 
    optimizimin për SEO dhe integrimin me API të jashtme.
  </p>
  <Button 
    text="Shikoni Sherbimet"
    onClick={() => alert("Sherbimet Tona...")}
  />
</motion.section>

{/* blog section*/}
<div className="grid grid-cols-3 py-20 bg-gray-200">
  {loading ? (
    <CircularProgress />
  ) : (
    posts &&
    posts.map((post) => (
      <motion.section
        key={post.id}
        className="max-w-6xl py-20 px-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-6">{post.body}</p>
        <button
          onClick={() => handleDelete(post.id)}
          className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Fshij Postin
        </button>
      </motion.section>
    ))
  )}
</div>

{/* Contact Section */}
<motion.section
  className="w-full py-20 bg-yellow-600 text-black text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold mb-6">Kontaktoni Me Ne</h2>
  <p>Email: contact@mycompany.com</p>
  <p>Tel.: +383 123 456 789</p>
  <p>Adresa: Prishtinë, Kosovë</p>
  <Button 
          text="Na Kontaktoni"
          variant="secondary"
          onClick={handleClick} />
</motion.section>
      </div>
    </div>
  );
}

Home.displayName = "My Application";
