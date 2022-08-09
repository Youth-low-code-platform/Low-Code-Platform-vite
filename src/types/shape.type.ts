import React from 'react'
import { ComponentSchema } from './lowCodeCompo.type'

export interface IFCShapeProps {
  component: ComponentSchema
  editingCompo: ComponentSchema | null | undefined
  reRender: boolean | undefined
  children: JSX.Element
  setReRender: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IShapeCommonStyle {
  top: number
  left: number
  width: number
  height: number
}
