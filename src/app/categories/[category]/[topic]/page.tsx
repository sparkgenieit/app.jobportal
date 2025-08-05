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
  let ads: any[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cms/?category=${category}&page=${topic}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    content = data?.content || '';
  } catch (err) {
    console.error('❌ Failed to fetch CMS content:', err);
  }

  // 🔽 Fetch 3 separate ads (category-1, 2, 3)
  const adTypes = ['category-page-ad-1', 'category-page-ad-2', 'category-page-ad-3'];
  
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

  try {
    const adResponses = await Promise.all(
      adTypes.map((type) =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/show-ad?type=${type}`).then((res) =>
          res.json()
        )
      )
    );
    
     ads = shuffleArray(adResponses.filter((ad) => ad && ad.ad_image_url));

    console.log("🔍 Ads fetched:", ads);
  } catch (err) {
    console.error('❌ Failed to fetch ads:', err);
  }

  return (
    <CategoriesMainContent
      category={category}
      topic={topic}
      content={content}
      ads={ads}
    />
  );
}
