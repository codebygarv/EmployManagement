import Department from './views/department/Department'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/department', name: 'Department', element: Department },
]

export default routes
