import { IPluginListIcon } from '../types/lowCodeCompo.type';

// 返回所有数据的常量
export enum DraggableItemKey{
  IMAGE = 'image',
  BUTTON = 'button'
}

const ImageComponentIcon:IPluginListIcon={
  icon:<i style={{display:'block'}} className={'fa fa-hand-pointer-o'}/>,
  text:'图片',
  compKey:DraggableItemKey.IMAGE
}

// 左侧组件列表
export const PLUGIN_LIST:IPluginListIcon[] = [ImageComponentIcon]