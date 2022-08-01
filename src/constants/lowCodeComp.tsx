import { EditComponentKey } from '../types/editbase.type'
import { ComponentName, ComponentSchema } from '../types/lowCodeCompo.type'

// 点击icon图标后调用该方法获取相应组件的数据
export const getComponentSchema = (name: ComponentName): ComponentSchema | null => {
  const id = new Date().getTime().toString()
  switch (name) {
    case ComponentName.PictureComponent: {
      return {
        id,
        name: ComponentName.PictureComponent,
        props: {
          imgSrc: 'src/assets/default-pic.jpg'
        },
        editConfig: {
          imgSrc: {
            name: EditComponentKey.EDIT_INPUT,
            propType: 'textarea',
            label: '图片url',
            value: 'src/assets/default-pic.jpg',
            callback: null
          }
        },
        style: {
          top: '100px',
          left: '100px',
          width: '100px',
          height: '40px',
          zIndex: 1,
          textAlign: 'center',
          color: '#000000',
          backgroundColor: '#ffffff',
          fontSize: '14px'
        }
      }
    }
    case ComponentName.ButtonComponent: {
      return {
        id,
        name: ComponentName.ButtonComponent,
        props: {
          text: '按钮'
        },
        editConfig: {
          text: {
            name: EditComponentKey.EDIT_INPUT,
            label: '文本',
            propType: 'text',
            value: '按钮',
            callback: null
          }
        },
        style: {
          top: '100px',
          left: '100px',
          width: '100px',
          height: '40px',
          zIndex: 1,
          textAlign: 'center',
          color: '#000000',
          backgroundColor: '#ffffff',
          fontSize: '14px'
        }
      }
    }
    default:
      return null
  }
}
