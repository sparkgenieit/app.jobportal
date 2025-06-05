import '../styles/globals.css'
import './style.css'
import CommonLayout from '../components/common/CommonLayout'
import { ReactNode } from 'react'




// ✅ Dynamic SEO metadata via API (SSR-friendly)
export async function generateMetadata() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meta/?page=home&category=regions`,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="/assets/vendors/mdi/css/materialdesignicons.min.css" rel="stylesheet" />
        <link href="/assets/vendors/css/vendor.bundle.base.css" rel="stylesheet" />
      </head>
      <body>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  )
}
