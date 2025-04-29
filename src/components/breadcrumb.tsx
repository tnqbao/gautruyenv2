import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-sm">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-green-600 transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Trang chủ</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <>
                  <Link
                    href={item.href || "#"}
                    className="text-muted-foreground hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
