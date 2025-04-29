import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import ComicGrid from "@/components/comic-grid";
import Pagination from "@/components/pagination";
import { ComicSectionSkeleton } from "@/components/loading-skeletons";
import { Comic, listTypes } from "@/lib/api";
import { GetServerSideProps } from "next";
import { comicApiInstance } from "@/utils/axios.config";

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const slug = params?.slug as string;
  const page = query.page ? Number.parseInt(query.page as string) : 1;

  if (!listTypes[slug]) {
    return {
      notFound: true,
    };
  }

  const listType = listTypes[slug];
  let comics: Comic[] = [];
  let pagination = { totalItems: 1 , currentPage : page };

  try {
    const response = await comicApiInstance.get(`/v1/api/danh-sach/${slug}?page=${page}`);
    if (response.status === 200) {
      const { items, params } = response.data.data;
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
      listType,
      comics,
      pagination,
    },
  };
};

interface ListPageProps {
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
}

export default function ListPage({ slug, page, listType, comics, pagination }: ListPageProps) {
  const totalPages = Math.ceil(pagination.totalItems / 24);
  return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="flex-1 container px-4 md:px-6 py-4">
          <Breadcrumb items={[{ label: "Danh Sách", href: "/danh-sach" }, { label: listType.breadcrumb }]} />

          <div className="py-4">
            <h1 className="text-3xl font-bold mb-2">{listType.title}</h1>
            <p className="text-muted-foreground">{listType.description}</p>
          </div>

          <Suspense fallback={<ComicSectionSkeleton />}>
            <ComicGrid comics={comics} />
          </Suspense>

          <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/danh-sach/${slug}`} />
        </main>

        <Footer />
      </div>
  );
}