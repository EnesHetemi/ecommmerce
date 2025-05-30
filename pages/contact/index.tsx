import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" }); // Pastro formën pas dorëzimit
  };

  return (
    <div className="pt-14 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Seksioni Hyrës */}
      <motion.section
        className="w-full py-20 bg-yellow-600 text-black text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Na Kontaktoni</h1>
        <p className="text-xl">
          Jemi të gatshëm t'ju ndihmojmë! Plotësoni formularin më poshtë për të na kontaktuar.
        </p>
      </motion.section>

      {/* Seksioni i Formularit të Kontaktit */}
      <motion.section
        className="w-full max-w-4xl px-6 py-20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
            Formulari i Kontaktit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fusha për emër */}
            <div>
              <label className="block text-gray-700">Emri juaj</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl"
                placeholder="Shkruani emrin tuaj"
                required
              />
            </div>

            {/* Fusha për email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl"
                placeholder="Shkruani email-in tuaj"
                required
              />
            </div>

            {/* Fusha për mesazh */}
            <div>
              <label className="block text-gray-700">Mesazhi</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl"
                placeholder="Shkruani mesazhin tuaj"
                required
              />
            </div>

            {/* Butoni për dërgim */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 px-6 py-3 bg-yellow-600 text-black rounded-xl"
              >
                Dërgo Mesazhin
              </motion.button>
            </div>
          </form>
        </div>
      </motion.section>
    </div>
  );
}

Contact.displayName = "Contact Us | My Application";