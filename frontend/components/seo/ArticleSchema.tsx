const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished = "2026-01-01",
  dateModified,
  image,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "NewYonoGamess",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NewYonoGamess",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo1.png`,
      },
    },
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
