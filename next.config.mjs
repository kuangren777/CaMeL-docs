import nextra from 'nextra'

const withNextra = nextra({
  search: { codeblocks: false },
  // contentDirBasePath defaults to '/'; MDX lives under content/
})

export default withNextra({
  reactStrictMode: true,
  output: 'standalone',
  images: { unoptimized: true },
})
