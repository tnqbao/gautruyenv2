import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import ComicGrid from "@/components/comic-grid";
import Pagination from "@/components/pagination";
import { ComicSectionSkeleton } from "@/components/loading-skeletons";
import { fetchComicsByCategory, listTypes } from "@/lib/api";

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const page = context.query.page ? Number.parseInt(context.query.page) : 1;

  if (!listTypes[slug]) {
    return {
      notFound: true,
    };
  }

  const listType = listTypes[slug];
  const { comics, pagination } = await fetchComicsByCategory(slug, page);

  return {
    props: {
      slug,
      page,
      listType,
      comics,
      pagination,
    },
  };
}

interface ListPageProps {
  slug: string;
  page: number;
  listType: {
    breadcrumb: string;
    title: string;
    description: string;
  };
  comics: any[];
  pagination: {
    totalPages: number;
  };
}

export default function ListPage({ slug, page, listType, comics, pagination }: ListPageProps) {
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

          <Pagination currentPage={page} totalPages={pagination.totalPages} baseUrl={`/danh-sach/${slug}`} />
        </main>

        <Footer />
      </div>
  );
}