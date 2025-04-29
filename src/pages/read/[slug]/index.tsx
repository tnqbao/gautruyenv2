import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import ComicReader from "@/components/comic/comic-reader"
import { ReadPageSkeleton } from "@/components/loading-skeletons"
import { fetchChapter } from "@/lib/api"

interface ReadPageProps {
  params: {
    slug: string
  }
}

export default async function ReadPage({ params }: ReadPageProps) {
  const { slug } = params

  // Extract comic slug and chapter slug from the URL
  // Format is expected to be: comic-slug/chapter-slug
  const slugParts = slug.split("/")
  if (slugParts.length !== 2) {
    notFound()
  }

  const [comicSlug, chapterSlug] = slugParts

  // Fetch chapter data
  const chapterData = await fetchChapter(comicSlug, chapterSlug)

  // If chapter not found, return 404
  if (!chapterData) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <Header />

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Truyện", href: "/truyen" },
              { label: chapterData.comic_name, href: `/truyen-tranh/${chapterData.comic_slug}` },
              { label: `Chương ${chapterData.name}` },
            ]}
          />
        </div>

        <Suspense fallback={<ReadPageSkeleton />}>
          <div className="container px-4 md:px-6 py-4">
            <ComicReader
              title={`${chapterData.comic_name} - Chương ${chapterData.name}`}
              images={chapterData.images}
              prevChapter={chapterData.prev_chapter}
              nextChapter={chapterData.next_chapter}
              comicSlug={chapterData.comic_slug}
            />
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
