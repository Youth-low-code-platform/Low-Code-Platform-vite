import { IFCShapeProps, IShapeCommonStyle } from '@//types/shape.type'
import React from 'react'

// 定义方向
const directionKey = {
  t: 'n',
  b: 's',
  l: 'w',
  r: 'e'
}
const points = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b']

// 类似于遮罩,将组件包含在其中,并且实现拖拽和拉伸功能
export const Shape: React.FC<IFCShapeProps> = (props: IFCShapeProps) => {
  const { component, editingCompo, setReRender, children } = props
  let reRender = props.reRender
  const active = component === editingCompo
  const style = component?.style
  const position: IShapeCommonStyle = {
    top: parseInt(style.top),
    left: parseInt(style.left),
    width: parseInt(style.width),
    height: parseInt(style.height)
  }

  // 获取伸缩点的样式
  function getPointStyle(point: string, isWrapElement = true) {
    const pos = { ...position }
    const top = pos.top
    const left = pos.left
    const height = pos.height
    const width = pos.width
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 上下左右四个方向的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    }
    // 中间的点
    else {
      // 上下
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }
      // 左右
      else if (hasL || hasR) {
        newTop = height / 2
        newLeft = hasL ? 0 : width
      }
    }

    const pointStyle = {
      marginLeft: hasL || hasR ? '-3px' : 0,
      marginTop: hasT || hasB ? '-3px' : 0,
      left: `${newLeft + (isWrapElement ? 0 : left)}px`,
      top: `${newTop + (isWrapElement ? 0 : top)}px`,
      // 设置缩放点的方向
      cursor:
        point
          .split('')
          .reverse()
          .map((m: string) => {
            const idx = m as keyof typeof directionKey
            return directionKey[idx]
          })
          .join('') + '-resize'
    }
    return pointStyle
  }

  // 实现伸缩功能
  function mouseDownForPoint(point: string, e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    const pos = { ...position }
    const height = pos.height
    const width = pos.width
    const top = pos.top
    const left = pos.left
    const startX = e.clientX
    const startY = e.clientY

    const move = (e: MouseEvent) => {
      const curX = e.clientX
      const curY = e.clientY
      const disY = curY - startY
      const disX = curX - startX
      // 判断伸缩点方位
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)

      const newHight = height + (hasT ? -disY : hasB ? disY : 0)
      const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
      pos.width = newWidth > 0 ? newWidth : 0
      pos.height = newHight > 0 ? newHight : 0
      pos.left = left + (hasL ? disX : 0)
      pos.top = top + (hasT ? disY : 0)
      if (hasT) {
        if (pos.top < 0) return true
      } else if (hasB) {
        if (pos.top > 568 - pos.height) return true
      } else if (hasL) {
        if (pos.left < 0) return true
      } else if (hasR) {
        if (pos.left > 320 - pos.width) return true
      }
      setCompoPosition(pos)
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 实现拖拽功能
  function mouseDownForElement(e: React.MouseEvent) {
    const pos = { ...position }
    const startX = e.clientX
    const startY = e.clientY
    const startTop = pos.top
    const startLeft = pos.left

    const move = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const currX = e.clientX
      const currY = e.clientY
      const disY = currY - startY + startTop
      const disX = currX - startX + startLeft
      const criticalValueY = 568 - pos.height
      const criticalValueX = 320 - pos.width
      // 超过临界值就停止
      pos.top = disY < 0 ? 0 : disY > criticalValueY ? criticalValueY : disY
      pos.left = disX < 0 ? 0 : disX > criticalValueX ? criticalValueX : disX
      setCompoPosition(pos)
    }
    const up = () => {
      document.removeEventListener('mousemove', move, true)
      document.removeEventListener('mouseup', up, true)
    }
    document.addEventListener('mousemove', move, true)
    document.addEventListener('mouseup', up, true)
  }

  function setCompoPosition(pos: IShapeCommonStyle) {
    // 修改坐标
    if (component?.style) {
      component.style.top = pos.top + 'px'
      component.style.left = pos.left + 'px'
      component.style.height = pos.height + 'px'
      component.style.width = pos.width + 'px'
      // 重新渲染
      reRender = !reRender
      setReRender(reRender)
      console.log('页面更新成功')
    }
  }

  return (
    <div
      onMouseDown={(e) => mouseDownForElement(e)}
      style={{ outline: active ? '1px dashed #bcbcbc' : '', height: '100%', width: '100%' }}
    >
      {active &&
        points.map((point) => {
          const pointStyle = getPointStyle(point)
          return (
            <div
              key={point}
              data-point={point}
              style={pointStyle}
              className="shape-point"
              onMouseDown={(e) => mouseDownForPoint(point, e)}
            ></div>
          )
        })}
      {children}
    </div>
  )
}
