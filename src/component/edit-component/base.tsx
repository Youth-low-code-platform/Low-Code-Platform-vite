/**
 * plugin的基本编辑器组件
 * 通过editConfig.name来获取相应编辑器
 * 例如a-input编辑器
 *        propType：input类型
 *        label:所修改的属性
 *        value:input的值
 *        callback:修改值后的回调函数
 */

import { EditComponentKey, EditComponentProps, EditConfig } from '@//types/editbase.type'
import { Input } from '@arco-design/web-react'
import { Form } from '@arco-design/web-react'
import React from 'react'
const FormItem = Form.Item

const AInput: React.FC<EditConfig> = ({ editConfig }) => {
  return (
    <Input
      type={editConfig.propType}
      value={editConfig.value}
      onChange={(val) => {
        if (editConfig.callback) {
          editConfig.value = val
          editConfig.callback(val)
        }
      }}
    ></Input>
  )
}

export const getEditComponent = (editConfig: EditComponentProps, keyVal: string): JSX.Element => {
  switch (editConfig.name) {
    case EditComponentKey.EDIT_INPUT: {
      return (
        <FormItem key={keyVal} label={editConfig.label}>
          {<AInput editConfig={editConfig} />}
        </FormItem>
      )
    }
    default:
      return <FormItem key="null" label="空属性"></FormItem>
  }
}
