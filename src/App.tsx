// import reactLogo from './assets/react.svg'
import { CSSProperties, useState } from 'react'
import { Tabs, Form } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
import { ComponentName, ComponentSchema } from './types/lowCodeCompo.type'
import { getComponentSchema } from './constants/lowCodeComp'
import { getImageConfigComponents, ImageComponent } from './component/ImageComponent'
import { PLUGIN_LIST } from './constants/plugin-icon-list'
import { DragButton } from './component/pluginListPanel/draggable-btn'
import { useDrop } from 'react-dnd'
import { IDragIcon } from './types/dragIcon.type'
import { Shape } from './component/shape'

const TabPane = Tabs.TabPane

function Editor() {
  const [components, setComponents] = useState<ComponentSchema[]>([])
  const [editingCompo, setEditingCompo] = useState<ComponentSchema | null>(null)
  const [reRender, setReRender] = useState(false)
  // 添加组件数据至数组中

  const clone = (conKey: ComponentName) => {
    const schema = getComponentSchema(conKey)
    setComponents((components) => [...components, schema])
  }

  // 实现拖拽的配置
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DragIcon', //写自定义的image拖拽type
    drop: (item: IDragIcon) => clone(item.compKey),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  //左侧组件列表
  function PluginListPanel() {
    return (
      <Tabs className={'plugin-panel'} tabPosition={'left'}>
        <TabPane key="pluginList" title="组件列表">
          {
            // 遍历所有的图标
            PLUGIN_LIST.map((compoIcon, index) => {
              const cb = () => clone(compoIcon.compKey)
              return DragButton({ compoIcon, cb, index })
            })
          }
        </TabPane>
      </Tabs>
    )
  }

  // 画布
  function Canvas() {
    return (
      <div ref={drop} style={{ height: '100%', border: isOver ? '5px solid lightblue' : '0px' }}>
        {components.map((componentSchema, index) => {
          const schema = componentSchema
          // 根据schema的名称进行相应的渲染
          if (schema?.name === ComponentName.PictureComponent) {
            return (
              <div
                onClick={() => setEditingCompo(schema)}
                style={{ ...(schema.style as CSSProperties), display: 'inline-block' }}
                key={`compo-${index}`}
              >
                <Shape component={schema} editingCompo={editingCompo} reRender={reRender} setReRender={setReRender}>
                  <ImageComponent schema={schema}></ImageComponent>
                </Shape>
              </div>
            )
          }
        })}
      </div>
    )
  }

  // 编辑栏
  function renderPropsEditorPanel() {
    if (!editingCompo) return <span>请先选择一个元素</span>
    // 根据组件编辑栏名称进行
    switch (editingCompo.name) {
      case ComponentName.PictureComponent: {
        return <Form>{getImageConfigComponents(editingCompo, reRender, setReRender)}</Form>
      }
    }
  }

  return (
    <div id="designer-page">
      <div className="arco-col arco-col-5"><PluginListPanel></PluginListPanel></div>
      <div className="arco-col arco-col-13">
        <div className="canvas-wrapper"><Canvas></Canvas></div>
      </div>
      <div className="arco-col arco-col-6" style={{ border: ' 1px solid #f1efef' }}>
        {renderPropsEditorPanel()}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Editor />
    </div>
  )
}

export default App
