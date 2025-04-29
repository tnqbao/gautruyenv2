import type { SVGProps } from "react"

export default function PandaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="#000000" />
      <circle cx="9" cy="9" r="2" fill="#ffffff" />
      <circle cx="15" cy="9" r="2" fill="#ffffff" />
      <path d="M10 15a2 2 0 0 0 4 0" stroke="#ffffff" />
      <path d="M7 4.5C5.5 5 4.5 6 4 7.5" stroke="#ffffff" strokeWidth="0.75" />
      <path d="M17 4.5C18.5 5 19.5 6 20 7.5" stroke="#ffffff" strokeWidth="0.75" />
    </svg>
  )
}
