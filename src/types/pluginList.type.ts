import { ComponentName } from './lowCodeCompo.type'

// 组件栏图标
export interface IPluginListIcon {
  icon: React.ReactNode
  text: string
  compKey: ComponentName
}

export interface IDragIcon {
  compKey: ComponentName
}
