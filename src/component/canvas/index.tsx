import { context } from '@//App'
import { IDragIcon } from '@//types/pluginList.type'
import { ComponentName } from '@//types/lowCodeCompo.type'
import { CSSProperties, useContext } from 'react'
import { useDrop } from 'react-dnd'
// import { ImageComponent } from '../plugins/ImageComponent'
import { Shape } from '../shape'

// 画布
export function Canvas() {
  const { components, editingCompo, setEditingCompo, clone, reRender, setReRender } = useContext(context)
  // 实现拖拽的配置
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DragIcon', //写自定义的image拖拽type
    drop: (item: IDragIcon) => (clone as (conKey: ComponentName) => void)(item.compKey),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  if (components && setEditingCompo && setReRender) {
    return (
      <div ref={drop} style={{ height: '100%', border: isOver ? '5px solid lightblue' : '0px' }}>
        {components.map((componentSchema, index) => {
          const schema = componentSchema
          // 根据schema的名称进行相应的渲染
          return (
            <div
              onClick={() => setEditingCompo(schema)}
              style={{ ...(schema?.style as CSSProperties), display: 'inline-block' }}
              key={`compo-${index}`}
            >
              <Shape component={schema} editingCompo={editingCompo} reRender={reRender} setReRender={setReRender}>
                {schema.getComponent(schema)}
              </Shape>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div>bug</div>
  }
}
