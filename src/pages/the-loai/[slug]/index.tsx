import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import ComicGrid from "@/components/comic-grid";
import Pagination from "@/components/pagination";
import { categories } from "@/components/category-dropdown";
import { ComicSectionSkeleton } from "@/components/loading-skeletons";
import { fetchComicsByGenre } from "@/lib/api";

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const page = context.query.page ? Number.parseInt(context.query.page) : 1;

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const { comics, pagination } = await fetchComicsByGenre(slug, page);

  return {
    props: {
      slug,
      page,
      category,
      comics,
      pagination,
    },
  };
}

interface CategoryPageProps {
  slug: string;
  page: number;
  category: {
    name: string;
  };
  comics: any[];
  pagination: {
    totalPages: number;
  };
}

export default function CategoryPage({ slug, page, category, comics, pagination }: CategoryPageProps) {
  return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="flex-1 container px-4 md:px-6 py-4">
          <Breadcrumb items={[{ label: "Thể Loại", href: "/the-loai" }, { label: category.name }]} />

          <div className="py-4">
            <h1 className="text-3xl font-bold mb-2">Truyện {category.name}</h1>
            <p className="text-muted-foreground">Danh sách truyện thể loại {category.name} hay nhất, cập nhật mới nhất</p>
          </div>

          <Suspense fallback={<ComicSectionSkeleton />}>
            <ComicGrid comics={comics} />
          </Suspense>

          <Pagination currentPage={page} totalPages={pagination.totalPages} baseUrl={`/the-loai/${slug}`} />
        </main>

        <Footer />
      </div>
  );
}