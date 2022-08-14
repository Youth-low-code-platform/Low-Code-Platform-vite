import { Message } from '@arco-design/web-react'
import { NavigateFunction } from 'react-router'
import Strapi from 'strapi-sdk-js'
import { ComponentSchema } from '../types/lowCodeCompo.type'

const strapi = new Strapi()

// 返回的数据格式
interface IResponseData {
  attributes: {
    components: ComponentSchema[]
    createdAt: string
    publishedAt: string
    updatedAt: string
  }
  id: number
}

// 保存页面
export async function createPage(navigate: NavigateFunction) {
  const res = await strapi.create('pages', { components: [] })
  const data = res.data as IResponseData
  console.log('createPage', data)
  navigate(`/editor/${data.id}`)
}

// 更新页面
export async function updatePage(id: number, components: ComponentSchema[] = []) {
  console.log('components', components)
  await strapi.update('pages', id, { components }).then(
    () => {
      Message.success('保存成功')
    },
    () => {
      Message.error('保存失败')
    }
  )
}

// 删除页面
export async function deletePage(id: number) {
  const res = await strapi.delete('pages', id)
  console.log(res.data)
}

// 查询单页面
export async function findPage(id: number) {
  console.log('查询单页面', id)
  const res = await strapi.findOne('pages', id)
  const data = res.data as IResponseData
  return data.attributes.components
}

// 查询所有页面
export async function findAllPage() {
  console.log('查询所有页面')
  const res = await strapi.find('pages')
  console.log(res.data)
}
