// 右侧编辑栏的base组件属性
export enum EditComponentKey {
  EDIT_INPUT = 'a-input',
  EDIT_BUTTON = 'a-button'
}

export interface EditInputProp {
  name: EditComponentKey.EDIT_INPUT
  propType: string
  label: string
  value: string
  callback: null | ((val: string) => void)
}
export type EditComponentProps = EditInputProp

export type EditConfig = {
  editConfig: EditComponentProps
}
