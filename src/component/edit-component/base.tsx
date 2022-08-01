import { EditComponentKey, EditComponentProps, EditConfig } from '@//types/editbase.type'
import {  Input } from '@arco-design/web-react'
import { Form } from '@arco-design/web-react'
import React from 'react'
const FormItem = Form.Item




const AInput:React.FC<EditConfig>=({editConfig})=>{ 
  return (<Input type={editConfig.propType} value={editConfig.value} onChange={(val)=>{
    if(editConfig.callback){
      editConfig.value=val
      editConfig.callback(val)
    }
  }}></Input>)
}

export const getEditComponent=(editConfig:EditComponentProps):JSX.Element | null=>{
    switch (editConfig.name){
      case (EditComponentKey.EDIT_INPUT):{
          return (<FormItem label={editConfig.label}>
          {
          <AInput editConfig={editConfig}/>
        }
      </FormItem>)
      }
      default:
        return null
    }
}
