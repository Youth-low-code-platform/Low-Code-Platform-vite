import { ComponentName } from '@//types/lowCodeCompo.type'
import { IPluginListIcon } from '@//types/pluginList.type'
import Button from '@arco-design/web-react/es/Button'
import { useDrag } from 'react-dnd'

export interface DragButtonProps {
  compoIcon: IPluginListIcon
  cb: (conKey: ComponentName) => void
  index: number
}

export function DragButton(props: DragButtonProps) {
  const { compoIcon, index } = props
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DragIcon',
    item: { compKey: compoIcon.compKey },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <Button
      ref={drag}
      onClick={() => props.cb(compoIcon.compKey)}
      className="plugin-item"
      style={{ border: isDragging ? '5px solid pink' : '0px' }}
      key={`plugin${index}`}
    >
      <span>
        {/* icon就是图标node */}
        {compoIcon.icon}
        {compoIcon.text}
      </span>
    </Button>
  )
}
