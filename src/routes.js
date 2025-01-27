import DepartmentAdd from './views/department/DepartmentAdd'
import DepartmentList from './views/department/DepartmentList'
import EmployeeList from './views/Employee/EmployeeList'

const routes = [
  { path: '/', exact: true, name: 'Home' },

  // Department Routes
  { path: '/department', name: 'Departments', element: DepartmentList },
  { path: '/department/add', name: 'Add', element: DepartmentAdd },
  { path: '/department/edit/:id', name: 'Edit', element: DepartmentAdd },

  // Employee Routes
  { path: '/employee', name: 'Employees', element: EmployeeList },
]

export default routes
