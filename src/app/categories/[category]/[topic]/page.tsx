// app/categories/[category]/[topic]/page.tsx
import CategoriesMainContent from '../../CategoriesMainContent';

interface PageProps {
  params: {
    category: string;
    topic: string;
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, topic } = params;

  let content = '';
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cms/?category=${category}&page=${topic}`,
      { next: { revalidate: 60 } } // Optional: ISR
    );

    const data = await res.json(); console.log(data);
    content = data?.content || '';
  } catch (err) {
    console.error('❌ Failed to fetch CMS content:', err);
  }

  return <CategoriesMainContent category={category} topic={topic} content={content} />;
}
