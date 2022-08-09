import { context } from '@//App'
import { PLUGIN_LIST } from '@//constants/plugin-icon-list'
import { Tabs } from '@arco-design/web-react'
import TabPane from '@arco-design/web-react/es/Tabs/tab-pane'
import { useContext } from 'react'
import { DragButton } from './draggable-btn'

//左侧组件列表
export function PluginListPanel() {
  const { clone } = useContext(context)
  if (clone) {
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
  } else {
    return <div>bug</div>
  }
}
