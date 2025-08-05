import { ReactNode } from 'react';
import { Metadata } from 'next';

interface LayoutProps {
  children: ReactNode;
  params: {
    category: string;
    topic: string;
  };
}

// Fetch meta data for the category and topic
const fetchMeta = async (category: string, topic: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meta/?page=${topic}&category=${category}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error(`Failed to fetch metadata: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Metadata API error:', err);
    return {
      title: 'Working Holiday Jobs New Zealand',
      description: 'Fallback metadata: working holiday, NZ, outdoor gear',
      keywords: 'New Zealand, jobs, visa, travel',
    };
  }
};

// ✅ generateMetadata expects the full context object, not just `params`
export async function generateMetadata(
  { params }: { params: { category: string; topic: string } }
): Promise<Metadata> {
  const { category, topic } = params;
  const slug = `${category}/${topic}`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const canonicalUrl = `${baseUrl}/categories/${slug}`;

  const meta = await fetchMeta(category, topic);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Working Holiday Jobs NZ',
      images: [
        {
          url: `${baseUrl}/og-images/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: 'OG Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/og-images/${slug}.jpg`],
    },
    metadataBase: new URL(baseUrl),
  };
}

export default async function CategoriesLayout({
  children,
  params,
}: LayoutProps) {
  const { category, topic } = params;
  const meta = await fetchMeta(category, topic);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category}/${topic}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: meta.title,
            author: {
              "@type": "Organization",
              name: 'Working Holiday Jobs NZ',
            },
            description: meta.description,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          }),
        }}
      />
      {children}
    </>
  );
}
