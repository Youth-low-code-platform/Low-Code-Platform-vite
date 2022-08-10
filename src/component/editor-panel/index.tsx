import { context } from '@//App'
import { ComponentName } from '@//types/lowCodeCompo.type'
// import { Form } from '@arco-design/web-react'
import { useContext } from 'react'
import { ImageConfigComponents } from '../plugins/ImageComponent/edit-config'

// 编辑栏
export function PropsEditorPanel() {
  const { editingCompo, setReRender } = useContext(context)

  if (editingCompo && setReRender) {
    // 根据组件编辑栏名称进行
    switch (editingCompo.name) {
      case ComponentName.PictureComponent: {
        return <ImageConfigComponents />
      }
      default:
        return <div>No Context</div>
    }
  } else {
    return <div>请先选择一个元素</div>
  }
}
