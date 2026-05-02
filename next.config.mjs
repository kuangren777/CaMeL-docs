import nextra from 'nextra'
import remarkSubstituteEndpoints from './lib/remark-substitute-endpoints.mjs'

const withNextra = nextra({
  search: { codeblocks: false },
  // contentDirBasePath defaults to '/'; MDX lives under content/
  mdxOptions: {
    remarkPlugins: [remarkSubstituteEndpoints],
  },
})

export default withNextra({
  reactStrictMode: true,
  output: 'standalone',
  images: { unoptimized: true },
})
