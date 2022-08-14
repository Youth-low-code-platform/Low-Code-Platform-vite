import { context } from '@//views/editor'
import { IDragIcon } from '@//types/pluginList.type'
import { ComponentName } from '@//types/lowCodeCompo.type'
import { CSSProperties, useContext } from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
// import { ImageComponent } from '../plugins/ImageComponent'
import { Shape } from '../shape'
import './style.scss'
import { getComponent } from '../plugins/plugins'

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
      <div className={classNames('canvas-wrapper', { over: isOver })} ref={drop}>
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
                {getComponent(schema)}
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
