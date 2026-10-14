import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  if (!service) {
    return {
      title: "Service Not Found — AGLETRAS",
    };
  }
  return {
    title: `${service.title} (${service.code}) — AGLETRAS Specification`,
    description: service.overview,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  return (
    <ServiceDetailClient
      service={service}
      prevService={prevService}
      nextService={nextService}
    />
  );
}
