import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, "../..")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["remark-gfm"],
  turbopack: {
    root: workspaceRoot,
  },
}

export default nextConfig