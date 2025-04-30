import axios from "axios"

// Create an axios instance with default configuration
const comicApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://otruyen-api.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication if needed
comicApiInstance.interceptors.request.use(
    (config) => {
      // You can add auth token here if needed
      // const token = getToken();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
)

// Add response interceptor for error handling
comicApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle API errors here
      console.error("API Error:", error.response?.data || error.message)
      return Promise.reject(error)
    },
)

// Comic type definition
export interface Comic {
  id: string
  name: string
  origin_name: string
  slug: string
  year: number
  poster_url: string
  thumb_url: string
  status?: string
  category?: { name: string; slug: string }[]
  author?: { name: string; slug: string }[]
}

// Comic detail type definition
export interface ComicDetailType {
  _id: string
  name: string
  slug: string
  origin_name: string[] // dạng mảng theo JSON gốc
  content: string // HTML string
  status: "ongoing" | "completed" | string
  thumb_url: string
  sub_docquyen: boolean
  author: string[] // mảng chuỗi
  category: {
    id: string
    name: string
    slug: string
  }[]
  chapters: {
    server_name: string
    server_data: {
      filename: string
      chapter_name: string
      chapter_title: string
      chapter_api_data: string
    }[]
  }[]
  updatedAt: string
}


// Chapter type definition
export interface Chapter {
  id: string
  name: string
  slug: string
  comic_name: string
  comic_slug: string
  updated_at: string
  images: {
    id: string
    src: string
    alt: string
  }[]
  prev_chapter?: {
    id: string
    name: string
    slug: string
  }
  next_chapter?: {
    id: string
    name: string
    slug: string
  }
}

// List type definition
export interface ListType {
  title: string
  description: string
  breadcrumb: string
  endpoint: string
}

// List types configuration
export const listTypes: Record<string, ListType> = {
  "truyen-moi": {
    title: "Truyện Mới",
    description: "Danh sách truyện mới cập nhật",
    breadcrumb: "Truyện Mới",
    endpoint: "/danh-sach/truyen-moi",
  },
  "sap-ra-mat": {
    title: "Truyện Sắp Ra Mắt",
    description: "Danh sách truyện sắp được phát hành",
    breadcrumb: "Sắp Ra Mắt",
    endpoint: "/danh-sach/sap-ra-mat",
  },
  "dang-phat-hanh": {
    title: "Truyện Đang Phát Hành",
    description: "Danh sách truyện đang được cập nhật",
    breadcrumb: "Đang Phát Hành",
    endpoint: "/danh-sach/dang-phat-hanh",
  },
  "hoan-thanh": {
    title: "Truyện Hoàn Thành",
    description: "Danh sách truyện đã hoàn thành",
    breadcrumb: "Hoàn Thành",
    endpoint: "/danh-sach/hoan-thanh",
  },
}

// API response interfaces
interface ApiResponse<T> {
  status: boolean
  msg: string
  data: T
}

interface ListResponse {
  items: Comic[]
  params: {
    pagination: {
      totalItems: number
      totalItemsPerPage: number
      currentPage: number
      totalPages: number
    }
  }
}

// Function to fetch comics by category/list


// Function to fetch chapter by slug
export async function fetchChapter(comicSlug: string, chapterSlug: string): Promise<Chapter | null> {
  try {
    const response = await comicApiInstance.get<ApiResponse<Chapter>>(`/truyen-tranh/${comicSlug}/${chapterSlug}`)

    if (!response.data.status) {
      throw new Error(response.data.msg)
    }

    return response.data.data
  } catch (error) {
    console.error("Error fetching chapter:", error)
    return null
  }
}

// Function to fetch categories
export async function fetchCategories() {
  try {
    const response = await comicApiInstance.get<ApiResponse<{ items: { name: string; slug: string }[] }>>("/the-loai")

    if (!response.data.status) {
      throw new Error(response.data.msg)
    }

    return response.data.data.items
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Function to fetch comics by category
export async function fetchComicsByGenre(slug: string, page = 1) {
  try {
    const response = await comicApiInstance.get<ApiResponse<ListResponse>>(`/the-loai/${slug}?page=${page}`)

    if (!response.data.status) {
      throw new Error(response.data.msg)
    }

    return {
      comics: response.data.data.items,
      pagination: response.data.data.params.pagination,
    }
  } catch (error) {
    console.error("Error fetching comics by genre:", error)
    return { comics: [], pagination: { currentPage: 1, totalPages: 1 } }
  }
}

// Function to search comics
export async function searchComics(keyword: string, page = 1) {
  try {
    const response = await comicApiInstance.get<ApiResponse<ListResponse>>(
        `/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
    )

    if (!response.data.status) {
      throw new Error(response.data.msg)
    }

    return {
      comics: response.data.data.items,
      pagination: response.data.data.params.pagination,
    }
  } catch (error) {
    console.error("Error searching comics:", error)
    return {
      comics: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        totalItemsPerPage: 0,
      },
    }
  }
}

// Function to fetch home data
export async function fetchHomeData() {
  try {
    const response = await comicApiInstance.get<ApiResponse<any>>("/home")

    if (!response.data.status) {
      throw new Error(response.data.msg)
    }

    return response.data.data
  } catch (error) {
    console.error("Error fetching home data:", error)
    return null
  }
}
