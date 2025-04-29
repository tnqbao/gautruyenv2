import Header from "@/components/header"
import BambooDecoration from "@/components/bamboo-decoration"
import PandaScrollProgress from "@/components/panda-scroll-progress"
import ThemeEffects from "@/components/theme-effects"
import { FirstVisitNotice } from "@/components/FirstVisitNotice"
import HeroSlider from "@/components/hero-slider"
import Categories from "@/components/categories"
import ComicSection from "@/components/comic-section"
import PandaPicks from "@/components/panda-picks"
import Footer from "@/components/footer"
import FloatingLeaves from "@/components/floating-leaves"
import BambooForest from "@/components/bamboo-forest"

// Sample data
export const categories = [
    { name: "Hành Động", image: "/placeholder.svg?height=100&width=200" },
    { name: "Hài Hước", image: "/placeholder.svg?height=100&width=200" },
    { name: "Tình Cảm", image: "/placeholder.svg?height=100&width=200" },
    { name: "Kinh Dị", image: "/placeholder.svg?height=100&width=200" },
    { name: "Viễn Tưởng", image: "/placeholder.svg?height=100&width=200" },
    { name: "Gia Đình", image: "/placeholder.svg?height=100&width=200" },
]

export const featuredComics = [
    {
        id: "1",
        title: "Chiến Binh Tre",
        description:
            "Câu chuyện về một chiến binh trẻ tuổi với khả năng điều khiển sức mạnh của cây tre, bảo vệ làng của mình khỏi những thế lực đen tối.",
        image: "/placeholder.svg?height=600&width=1200",
        badge: "Mới Cập Nhật",
        slug: "chien-binh-tre",
    },
    {
        id: "2",
        title: "Vương Quốc Gấu Trúc",
        description:
            "Khám phá vương quốc bí ẩn của những chú gấu trúc, nơi có những bí mật cổ xưa và phép thuật kỳ diệu đang chờ đợi được khám phá.",
        image: "/placeholder.svg?height=600&width=1200",
        badge: "Đang Hot",
        slug: "vuong-quoc-gau-truc",
    },
    {
        id: "3",
        title: "Huyền Thoại Núi Rừng",
        description:
            "Theo chân nhóm bạn trẻ khám phá những huyền thoại cổ xưa trong khu rừng già, nơi những sinh vật huyền bí đang ẩn mình.",
        image: "/placeholder.svg?height=600&width=1200",
        badge: "Độc Quyền",
        slug: "huyen-thoai-nui-rung",
    },
    {
        id: "4",
        title: "Đen & Trắng",
        description:
            "Câu chuyện cảm động về tình bạn giữa hai chú gấu trúc, một đen một trắng, vượt qua mọi khác biệt để bảo vệ khu rừng của họ.",
        image: "/placeholder.svg?height=600&width=1200",
        badge: "Giải Thưởng",
        slug: "den-va-trang",
    },
    {
        id: "5",
        title: "Biên Niên Sử Tre",
        description:
            "Bộ sử thi về lịch sử huyền thoại của một vương quốc cổ đại, được khắc trên những thân tre thiêng và được truyền lại qua nhiều thế hệ.",
        image: "/placeholder.svg?height=600&width=1200",
        badge: "Phổ Biến",
        slug: "bien-nien-su-tre",
    },
]

export const trendingComics = [
    { title: "Chiến Binh Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.5" },
    { title: "Panda Nhanh Trí", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.9" },
    { title: "Bí Mật Núi Rừng", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.2" },
    { title: "Khu Rừng Cuối Cùng", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.6" },
    { title: "Đen & Trắng", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "9.0" },
    { title: "Chuyện Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.3" },
    { title: "Vương Quốc Gấu Trúc", year: "2022", poster: "/placeholder.svg?height=300&width=200", rating: "8.7" },
]

export const newReleases = [
    { title: "Vương Quốc Rừng Xanh", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.1" },
    { title: "Chuyện Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.8" },
    { title: "Hành Trình Hoang Dã", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.4" },
    { title: "Gia Đình Gấu Trúc", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "9.2" },
    { title: "Tiếng Gọi Thiên Nhiên", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "7.5" },
    { title: "Phiêu Lưu Núi Rừng", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.6" },
    { title: "Rừng Tre", year: "2023", poster: "/placeholder.svg?height=300&width=200", rating: "8.9" },
]

export const pandaPicks = [
    {
        title: "Biên Niên Sử Tre",
        year: "2022",
        poster: "/placeholder.svg?height=100&width=70",
        description: "Câu chuyện cảm động về hành trình của một gia đình gấu trúc qua các mùa thay đổi.",
        rating: "8.7",
    },
    {
        title: "Huyền Thoại Núi Rừng",
        year: "2021",
        poster: "/placeholder.svg?height=100&width=70",
        description: "Khám phá những huyền thoại cổ xưa của những ngọn núi sương mù và những người bảo vệ huyền bí.",
        rating: "8.3",
    },
    {
        title: "Cuộc Phiêu Lưu Của Gấu Trúc",
        year: "2023",
        poster: "/placeholder.svg?height=100&width=70",
        description: "Tham gia cùng nhân vật chính trong một cuộc phiêu lưu hoành tráng để cứu rừng tre khỏi sự tàn phá.",
        rating: "9.1",
    },
]

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            <FirstVisitNotice />
            <ThemeEffects />
            <BambooDecoration />
            <BambooForest />
            <FloatingLeaves />
            <PandaScrollProgress />
            <Header />

            <HeroSlider comics={featuredComics} />
            <Categories categories={categories} />
            <ComicSection title="Truyện Đang Hot" comics={trendingComics} bgColor="bg-white dark:bg-gray-800" />
            <ComicSection title="Truyện Mới Cập Nhật" comics={newReleases} bgColor="bg-[#f8f9fa] dark:bg-gray-900" />
            <PandaPicks picks={pandaPicks} />
            <Footer />
        </div>
    )
}
