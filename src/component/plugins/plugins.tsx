import { ComponentName, ComponentSchema, IButtonComponent, IPictureComponent } from '../../types/lowCodeCompo.type'
import { getPicComponent, pictureSchema } from './ImageComponent'

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

// 根据schema获取渲染组件
export const getComponent = (schema: ComponentSchema | undefined): JSX.Element => {
  const name = schema?.name
  switch (name) {
    case ComponentName.PictureComponent: {
      const picSchema = schema as IPictureComponent
      return getPicComponent(picSchema)
    }
    case ComponentName.ButtonComponent: {
      const picSchema = schema as IButtonComponent
      return getPicComponent(picSchema)
    }
    default:
      return <></>
  }
}
