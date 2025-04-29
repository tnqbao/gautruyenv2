import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import ComicDetail from "@/components/comic/comic-detail"
import { ComicDetailSkeleton } from "@/components/loading-skeletons"
import { fetchComicBySlug } from "@/lib/api"

interface ComicPageProps {
  params: {
    slug: string
  }
}

export default async function ComicPage({ params }: ComicPageProps) {
  const { slug } = params

  // Fetch comic data
  const comicData = await fetchComicBySlug(slug)

  // If comic not found, return 404
  if (!comicData) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-4">
          <Breadcrumb items={[{ label: "Truyện", href: "/truyen" }, { label: comicData.name }]} />
        </div>

        <Suspense fallback={<ComicDetailSkeleton />}>
          {/*<ComicDetail {...comicData} />*/}
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
