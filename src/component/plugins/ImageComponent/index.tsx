import { ComponentSchema, IPictureComponent } from '@//types/lowCodeCompo.type'
import { getEditComponent } from '../../edit-component/base'

// 获取并配置image组件的编辑栏
export const getImageConfigComponents = (
  editingCompo: ComponentSchema,
  reRender: boolean,
  setReRender: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const editorConfig = (editingCompo as IPictureComponent).editConfig
  const imageConfig = editorConfig.imgSrc
  // 配置回调函数
  const callback = (val: string) => {
    ;(editingCompo as IPictureComponent).editConfig.imgSrc.value = val
    ;(editingCompo as IPictureComponent).props.imgSrc = val
    // 修改render使得页面数据刷新
    setReRender(() => {
      console.log('页面更新成功')
      return !reRender
    })
  }
  imageConfig.callback = callback
  // 用于标识唯一值
  const keyValue = 'imgConfig'
  const imageConfigCompo = getEditComponent(imageConfig, keyValue)
  return [imageConfigCompo]
}
