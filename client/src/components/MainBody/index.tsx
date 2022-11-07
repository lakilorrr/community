import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import style from './style.less'

type Props = {}

const MainBody = (props: Props) => {
  return (
    <div className={style.main_body}>
      <Outlet />
    </div>
  )
}
export default memo(MainBody)