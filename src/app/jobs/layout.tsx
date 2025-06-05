import { ReactNode } from 'react';
import { promises as fs } from 'fs'
import path from 'path'
// ✅ Dynamic SEO metadata via JSON (SSR-compatible)


export async function generateMetadata() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meta/?page=jobs`, //category optional
      { next: { revalidate: 60 } } // Optional: ISR
    )

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
    const { title, description, keywords } = await res.json()

    return {
      title: title || 'Working Holiday Jobs New Zealand',
      description: description || 'Discover seasonal jobs and explore NZ.',
      keywords: keywords || 'New Zealand, jobs, working holiday, travel',
    }
  } catch (err) {
    console.error('Metadata API error:', err)
    return {
      title: 'Working Holiday Jobs New Zealand',
      description: 'Fallback: seasonal jobs, travel, NZ visa info.',
      keywords: 'New Zealand, jobs, visa, travel',
    }
  }
}

export default function JobsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
