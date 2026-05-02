import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: { default: 'CaMeL AI', template: '%s | CaMeL AI' },
  description: 'CaMeL AI — 一站式 AI 模型聚合 API 服务文档',
  icons: { icon: '/favicon.svg' },
}

const navbar = (
  <Navbar
    logo={<strong>CaMeL AI</strong>}
    projectLink="https://github.com/kuangren777/CaMeL-docs"
  />
)

const footer = (
  <Footer>
    © {new Date().getFullYear()} CaMeL AI · Powered by Nextra
  </Footer>
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/kuangren777/CaMeL-docs/tree/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
