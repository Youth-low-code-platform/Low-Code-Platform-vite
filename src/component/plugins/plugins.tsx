import { Button } from '@arco-design/web-react'
import { EditComponentKey } from '../../types/editbase.type'
import { ComponentName, ComponentSchema, IPictureComponent } from '../../types/lowCodeCompo.type'

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
      return {
        id,
        name: ComponentName.PictureComponent,
        getComponent: (schema: ComponentSchema | undefined) => {
          const { props, id } = schema as IPictureComponent
          return <img key={id} style={{ height: '100%', width: '100%' }} src={props.imgSrc} />
        },
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
        style: { ...defaultStyle }
      }
    }
    case ComponentName.ButtonComponent: {
      return {
        id,
        name: ComponentName.ButtonComponent,
        getComponent: (schema: ComponentSchema | undefined) => {
          console.log(schema)
          return <Button />
        },
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
        style: { ...defaultStyle }
      }
    }
  }
}
