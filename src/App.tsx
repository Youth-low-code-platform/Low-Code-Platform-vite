import '@arco-design/web-react/dist/css/arco.css'
import { useState } from 'react'
import { ComponentName, ComponentSchema } from './types/lowCodeCompo.type'
import { getComponentSchema } from './component/plugins/plugins'

import React from 'react'
import { Canvas } from './component/canvas'

import { PluginListPanel } from './component/pluginListPanel'
import { PropsEditorPanel } from './component/editor-panel'

// const TabPane = Tabs.TabPane

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const context = React.createContext<
  Partial<{
    components: ComponentSchema[]
    setComponents: Dispatch<ComponentSchema[]>
    editingCompo: ComponentSchema | null
    setEditingCompo: Dispatch<ComponentSchema | null>
    reRender: boolean
    setReRender: Dispatch<boolean>
    clone: (conKey: ComponentName) => void
  }>
>({})

function Editor() {
  const [components, setComponents] = useState<ComponentSchema[]>([])
  const [editingCompo, setEditingCompo] = useState<ComponentSchema | null>(null)
  const [reRender, setReRender] = useState(false)
  // 添加组件数据至数组中

  const clone = (conKey: ComponentName) => {
    const schema = getComponentSchema(conKey)
    setComponents((components) => [...components, schema])
  }

  return (
    <context.Provider
      value={{ components, setComponents, editingCompo, setEditingCompo, reRender, setReRender, clone }}
    >
      <div id="designer-page">
        <div className="arco-col arco-col-5">
          <PluginListPanel></PluginListPanel>
        </div>
        <div className="arco-col arco-col-13">
          <div className="canvas-wrapper">
            <Canvas></Canvas>
          </div>
        </div>
        <div className="arco-col arco-col-6" style={{ border: ' 1px solid #f1efef' }}>
          <PropsEditorPanel />
        </div>
      </div>
    </context.Provider>
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
