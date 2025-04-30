// import { Suspense } from "react"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import Breadcrumb from "@/components/breadcrumb"
// import ComicReader from "@/components/comic/comic-reader"
// import { ReadPageSkeleton } from "@/components/loading-skeletons"
// import { fetchChapter } from "@/lib/api"
// import { GetServerSideProps } from "next"
//
// interface ComicImage {
//     id: string
//     src: string
//     alt: string
// }
//
// interface ReadPageProps {
//     comicSlug: string
//     chapterSlug: string
//     chapterData: {
//         comic_name: string
//         comic_slug: string
//         name: string
//         images: ComicImage[]
//         prev_chapter: string | null
//         next_chapter: string | null
//     }
// }
//
//
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const slug = params?.slug as string
//     const slugParts = slug.split("/")
//     if (slugParts.length !== 2) {
//         return { notFound: true }
//     }
//
//     const [comicSlug, chapterSlug] = slugParts
//
//     const response = await fetchChapter(comicSlug, chapterSlug)
//
//     if (!response || response.status !== "success") {
//         return { notFound: true }
//     }
//
//     const { domain_cdn, item } = response.data
//     const chapterData = {
//         comic_name: item.comic_name,
//         comic_slug: comicSlug,
//         name: item.chapter_name,
//         images: item.chapter_image.map((img: string, idx: number) => ({
//             id: String(idx),
//             src: `${domain_cdn}/${item.chapter_path}/${img.image_file}`,
//             alt: `Trang ${img.image_page + 1}`,
//         })),
//         prev_chapter: null, // Nếu cần, có thể fetch thêm
//         next_chapter: null,
//     }
//
//     return {
//         props: {
//             comicSlug,
//             chapterSlug,
//             chapterData,
//         },
//     }
// }
//
//
// export default function ReadPage({chapterData }: ReadPageProps) {
//     return (
//         <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
//             <Header />
//
//             <main className="flex-1">
//                 <div className="container px-4 md:px-6 py-4">
//                     <Breadcrumb
//                         items={[
//                             { label: "Truyện", href: "/truyen" },
//                             { label: chapterData.comic_name, href: `/truyen-tranh/${chapterData.comic_slug}` },
//                             { label: `Chương ${chapterData.name}` },
//                         ]}
//                     />
//                 </div>
//
//                 <Suspense fallback={<ReadPageSkeleton />}>
//                     <div className="container px-4 md:px-6 py-4">
//                         <ComicReader
//                             title={`${chapterData.comic_name} - Chương ${chapterData.name}`}
//                             images={chapterData.images}
//                             // prevChapter={chapterData.prev_chapter}
//                             // nextChapter={chapterData.next_chapter}
//                             comicSlug={chapterData.comic_slug}
//                         />
//                     </div>
//                 </Suspense>
//             </main>
//
//             <Footer />
//         </div>
//     )
// }