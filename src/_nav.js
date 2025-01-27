import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBuilding,
  cilUser
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Department',
    to: '/department',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Employee',
    to: '/employee',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  }
]

export default _nav
