// import reactLogo from './assets/react.svg'
import { CSSProperties, useState } from 'react';
import { Tabs ,Button,Form} from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css';
import { ComponentName, ComponentSchema } from './types/lowCodeCompo.type';
import {  getComponentSchema  } from './constants/lowCodeComp';
import { getImageConfigComponents, ImageComponent } from './component/ImageComponent';
import { DraggableItemKey, PLUGIN_LIST } from './constants/plugin-icon-list';


const TabPane =Tabs.TabPane



function Editor(){
  const [components,setComponents]=useState<ComponentSchema[]>([])
  const [editingCompo,setEditingCompo]=useState<ComponentSchema|null>(null)
  
  
  // 添加组件数据至数组中
  const clone = (conKey:DraggableItemKey)=>{
    const schema = getComponentSchema(conKey)
    const newComponents = components.slice()
    newComponents.push(schema)
    setComponents(newComponents)
  }


   function renderCanvas(){
    return (
      <div style={{ height: '100%' }}>
      {components.map((componentSchema,index)=>{
        const schema = componentSchema
        // 根据schema的名称进行相应的渲染
        if(schema?.name===ComponentName.PictureComponent){
          return <div onClick={()=>setEditingCompo(schema)} style={{...schema.style as CSSProperties,display:'inline-block'}} key={`compo-${index}`}>
            <ImageComponent schema={schema}></ImageComponent>
          </div>
        }
      })}
      </div>
    )
  }


  function renderPluginListPanel(){
      return(
    <Tabs className={'plugin-panel'}  tabPosition={'left'}>
        <TabPane key='pluginList' title='组件列表'>
            {
              // 遍历所有的图标
              PLUGIN_LIST.map((compoIcon,index)=>{
                return(<Button onClick={()=>clone(compoIcon.compKey)} className='plugin-item' key={`plugin${index}`}>
                 <span>{compoIcon.icon}
                  {compoIcon.text}</span>
                </Button>)
              })
            }
        </TabPane>
    </Tabs>)
  }

  function renderPropsEditorPanel(){
      if(!editingCompo)return (<span>请先选择一个元素</span>)
      // 根据组件编辑栏名称进行
      switch(editingCompo.name){
        case (ComponentName.PictureComponent):{
          return(<Form>
          {getImageConfigComponents(editingCompo,components,setComponents)}
          </Form>)
        }
      }
  }


  return(<div id='designer-page'>
    <div className='arco-col arco-col-5'>
       {renderPluginListPanel()}
    </div>
    <div className='arco-col arco-col-13'>
      <div className='canvas-wrapper'>
      {renderCanvas()}
      </div>
    </div>
    <div className='arco-col arco-col-6' style={{border:' 1px solid #f1efef'}}>
       {renderPropsEditorPanel()}
    </div>
  </div>)
}


function App() {
  return (
    <div className="App">
      <Editor/>
    </div>
  )
}

export default App
