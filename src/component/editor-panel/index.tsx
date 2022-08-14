import { context } from '@//views/editor'
import { ComponentName } from '@//types/lowCodeCompo.type'
import { Layout } from '@arco-design/web-react';
// import { Form } from '@arco-design/web-react'
import { useContext } from 'react'
import { ImageConfigComponents } from '../plugins/ImageComponent/edit-config'
import './style.scss'
const Sider = Layout.Sider;
// 编辑栏
export function PropsEditorPanel() {
  const { editingCompo, setReRender } = useContext(context)

  if (!editingCompo || !setReRender) {
    return null
  }

  return (
    <Sider
      collapsed={false}
      collapsible
      trigger={null}
      width={320}
      className={'nav nav-right'}
    >
      {editingCompo.name === ComponentName.PictureComponent && (
        <ImageConfigComponents />
      )}
    </Sider>
  )
}
