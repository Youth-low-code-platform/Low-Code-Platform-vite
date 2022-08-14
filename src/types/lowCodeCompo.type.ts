// import { DraggableItemKey } from '../constants/plugin-icon-list'
import { IButtonEditConfig, IImageEditConfig } from './editConfig.type'

export enum ComponentName {
  PictureComponent = 'PictureComponent',
  ButtonComponent = 'ButtonComponent'
}

export interface ComponentStyle {
  position: string
  top: string
  left: string
  width: string
  height: string
  zIndex: number
  textAlign: string
  color: string
  backgroundColor: string
  fontSize: string
}

export interface IPictureComponent {
  id: string
  name: ComponentName.PictureComponent
  props: {
    imgSrc: string
  }
  // 编辑器的属性
  editConfig: IImageEditConfig
  style: ComponentStyle
}
export interface IButtonComponent {
  id: string
  name: ComponentName.ButtonComponent
  props: {
    text: string
  }
  // 编辑器的属性
  editConfig: IButtonEditConfig
  style: ComponentStyle
}

// 将所有组件的数据联合起来
export type ComponentSchema = IPictureComponent | IButtonComponent
