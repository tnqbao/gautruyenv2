import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Gấu Truyện </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Trang web đọc truyện tranh online hàng đầu với hàng ngàn truyện hay và cập nhật liên tục.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Danh Mục</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/danh-sach/truyen-moi" className="text-muted-foreground hover:text-foreground">
                  Truyện Mới
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/hoan-thanh" className="text-muted-foreground hover:text-foreground">
                  Truyện Hoàn Thành
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/dang-phat-hanh" className="text-muted-foreground hover:text-foreground">
                  Truyện Đang Phát Hành
                </Link>
              </li>
              <li>
                <Link href="/the-loai" className="text-muted-foreground hover:text-foreground">
                  Thể Loại
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Liên Kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Điều Khoản Sử Dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Theo Dõi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OTruyen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
