import { GetServerSideProps } from "next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { ComicDetailSkeleton } from "@/components/loading-skeletons"
import type { ComicDetailType } from "@/lib/api"
import ComicDetail from "@/components/comic/comic-detail"
import {comicApiInstance} from "@/utils/axios.config";
interface ComicPageProps {
    comicData: ComicDetailType
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const slug = query.slug as string

    try {
        const res = await comicApiInstance.get(`/v1/api/truyen-tranh/${slug}`)
        const response = res.data

        if (!response?.status || !response?.data?.item) {
            return { notFound: true }
        }
        console.log(response.data.item)
        return {
            props: {
                comicData: response.data.item,
            },
        }
    } catch (error) {
        console.error("Error fetching comic:", error)
        return { notFound: true }
    }
}


export default function ComicPage({ comicData }: ComicPageProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1">
                <div className="container px-4 md:px-6 py-4">
                    <Breadcrumb items={[{ label: "Truyện", href: "/truyen" }, { label: comicData.name }]} />
                </div>

                <Suspense fallback={<ComicDetailSkeleton />}>
                    <ComicDetail {...comicData} />
                </Suspense>
            </main>

            <Footer />
        </div>
    )
}

