import {Suspense} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import ComicGrid from "@/components/comic-grid";
import Pagination from "@/components/pagination";
import {ComicSectionSkeleton} from "@/components/loading-skeletons";
import {Comic} from "@/lib/api";
import {GetServerSideProps} from "next";
import {comicApiInstance} from "@/utils/axios.config";
import {categories} from "@/components/category-dropdown";

export const getServerSideProps: GetServerSideProps = async ({params, query}) => {
    const slug = params?.slug as string;
    const page = query.page ? Number.parseInt(query.page as string) : 1;

    const category = categories.find((cat) => cat.slug === slug);

    if (!category) {
        return {
            notFound: true,
        };
    }
    let comics: Comic[] = [];
    let pagination = {totalItems: 1, currentPage: page};
    try {
        const response = await comicApiInstance.get(`/v1/api/the-loai/${slug}?page=${page}`);
        if (response.status === 200) {
            const {items, params} = response.data.data;
            comics = items;
            pagination = params.pagination;
        } else {
            console.error("Error fetching comics:", response.data.msg);
        }
    } catch (e) {
        console.error("Error fetching comics:", e);
    }

    return {
        props: {
            slug,
            page,
            category,
            comics,
            pagination,
        },
    };
};

interface CategoryPageProps {
    slug: string;
    page: number;
    listType: {
        breadcrumb: string;
        title: string;
        description: string;
    };
    comics: Comic[];
    pagination: {
        totalItems: number;
        currentPage: number;
    };
    category: {
        name: string;
        slug: string;
    };
}

export default function CategoryPage({slug, page, category, comics}: CategoryPageProps) {
    const totalPages = Math.ceil(comics.length / 24);
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header/>

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{label: "Thể Loại", href: "/the-loai"}, {label: category.name}]}/>

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Truyện {category.name}</h1>
                    <p className="text-muted-foreground">Danh sách truyện thể loại {category.name} hay nhất, cập nhật
                        mới nhất</p>
                </div>

                <Suspense fallback={<ComicSectionSkeleton/>}>
                    <ComicGrid comics={comics}/>
                </Suspense>

                <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/the-loai/${slug}`}/>
            </main>

            <Footer/>
        </div>
    );
}