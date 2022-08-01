import { ComponentSchema } from '../types/lowCodeCompo.type'

export function findIndex(component: ComponentSchema, components: ComponentSchema[]) {
  return components.findIndex((item) => item === component)
}
