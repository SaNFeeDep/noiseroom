import { ITab } from '../../../components/TabPanel'
import Equipment from './Equipment'
import PersonalInfo from './PersonalInfo'

type ExtendsITab = ITab & {
  element: React.ReactNode
}

export const profileTabs: ExtendsITab[] = [
  {
    tabId: 'equipment',
    title: 'брони',
    element: <Equipment />,
  },
  {
    tabId: 'personalInfo',
    title: 'персональные данные',
    element: <PersonalInfo />,
  },
]
