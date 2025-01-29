import DepartmentAdd from './views/department/DepartmentAdd'
import DepartmentList from './views/department/DepartmentList'
import EmployeeAdd from './views/Employee/EmployeeAdd'
import EmployeeList from './views/Employee/EmployeeList'
import EmployeeView from './views/Employee/EmployeeView'

const routes = [
  { path: '/', exact: true, name: 'Home' },

  // Department Routes
  { path: '/department', name: 'Departments', element: DepartmentList },
  { path: '/department/add', name: 'Add', element: DepartmentAdd },
  { path: '/department/edit/:id', name: 'Edit', element: DepartmentAdd },

  // Employee Routes
  { path: '/employee', name: 'Employees', element: EmployeeList },
  { path: '/employee/view/:id', name: 'Edit', element: EmployeeView },
  { path: '/employee/add', name: 'Add', element: EmployeeAdd },
  { path: '/employee/edit/:id', name: 'Edit', element: EmployeeAdd },
]

export default routes
