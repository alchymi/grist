"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {GristRecord, GristResponse , Chapter} from "./types/grist"; 

 
// Header fixe avec logo SVG et titre ezf
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
        <svg
          className="h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <h1 className="ml-3 text-2xl font-semibold text-gray-800">Mon Application</h1>
      </div>
    </header>
  );
};

// Composant Card pour afficher un chapitre avec contenu dépliable
const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-bold mb-2 text-gray-800">{chapter.title}</h3>
      <p className="italic text-gray-700">{chapter.short}</p>

      {/* Bouton stylé pour déplier/replier */}
      <button
        className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>{expanded ? "Réduire" : "Voir plus"}</span>
        <motion.svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600 whitespace-pre-wrap overflow-hidden"
          >
            {chapter.long}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Composant principal qui récupère et affiche les chapitres depuis l'API
export default function Home() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/grist-read/Chapters");
        if (!res.ok) {
          throw new Error(`Erreur lors de l'appel à l'API: ${res.statusText}`);
        }
        const json = await res.json() as GristResponse;
        const chaptersData: Chapter[] = json.records.map((record: GristRecord) => ({
          id: record.id,
          title: record.fields.title,
          short: record.fields.short,
          long: record.fields.long,
        }));
        setChapters(chaptersData);
      } catch (err: unknown) {
        // Si vous utilisez unknown, vous pouvez convertir en string via String(err)
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Chapitres</h2>
        {loading && <p>Chargement des données...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </main>
    </div>
  );
}
