import { EditComponentKey } from '@//types/editbase.type'
import { ComponentName, ComponentSchema, ComponentStyle, IPictureComponent } from '@//types/lowCodeCompo.type'

export const pictureSchema = (id: string, defaultStyle: ComponentStyle): ComponentSchema => {
  return {
    id,
    name: ComponentName.PictureComponent,
    props: {
      imgSrc: '/default-pic.jpg'
    },
    editConfig: {
      imgSrc: {
        name: EditComponentKey.EDIT_INPUT,
        propType: 'textarea',
        label: '图片url',
        value: '/default-pic.jpg',
        callback: null
      }
    },
    style: { ...defaultStyle }
  }
}
export function getPicComponent(schema: ComponentSchema | undefined) {
  const { props, id } = schema as IPictureComponent
  return <img key={id} style={{ height: '100%', width: '100%' }} src={props.imgSrc} />
}
