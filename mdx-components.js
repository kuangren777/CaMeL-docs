import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import {
  Card,
  CardGroup,
  Columns,
  Note,
  Tip,
  Tips,
  Warning,
  Info,
  Accordion,
  AccordionGroup,
  CodeGroup,
  Steps,
  Step,
  Frame,
  ResponseField,
  ParamField,
  Update,
  Tabs as MintTabs,
  Tab as MintTab,
} from './components/mintlify-compat'
import { CopyButton } from './components/copy-button'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Card,
    CardGroup,
    Columns,
    Note,
    Tip,
    Tips,
    Warning,
    Info,
    Accordion,
    AccordionGroup,
    CodeGroup,
    Steps,
    Step,
    Frame,
    ResponseField,
    ParamField,
    Update,
    Tabs: MintTabs,
    Tab: MintTab,
    CopyButton,
    ...components,
  }
}
