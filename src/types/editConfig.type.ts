import { EditInputProp } from './editbase.type'

export interface IImageEditConfig {
  imgSrc: EditInputProp
}
export interface IButtonEditConfig {
  text: EditInputProp
}

export type ComponentEditConfig = IImageEditConfig | IButtonEditConfig
