import { ComponentName, ComponentSchema } from '../../types/lowCodeCompo.type'
import { pictureSchema } from './ImageComponent'

const defaultStyle = {
  position: 'absolute',
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

// 点击icon图标后调用该方法获取相应组件的数据
export const getComponentSchema = (name: ComponentName): ComponentSchema => {
  const id = new Date().getTime().toString()
  switch (name) {
    case ComponentName.PictureComponent: {
      return pictureSchema(id, defaultStyle)
    }
    case ComponentName.ButtonComponent: {
      return pictureSchema(id, defaultStyle)
    }
  }
}
