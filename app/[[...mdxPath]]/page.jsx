import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import endpoints from '../../config/endpoints.js'

function substituteEndpoints(input) {
  if (typeof input !== 'string') return input
  return input.replace(/@@([A-Z][A-Z0-9_]*)@@/g, (m, k) =>
    endpoints[k] !== undefined ? endpoints[k] : m
  )
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const components = getMDXComponents()
const Wrapper = components.wrapper

export default async function Page(props) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={substituteEndpoints(sourceCode)}>
      <MDXContent {...props} params={params} components={components} />
    </Wrapper>
  )
}
