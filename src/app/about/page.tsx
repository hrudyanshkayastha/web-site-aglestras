import { Metadata } from "next";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Agletras — Purpose, Philosophy & Architecture",
  description:
    "Learn what Agletras is, our purpose, research philosophy, how research, intelligence, and automation work together, and our commitment to lawful public-source inquiry.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
