import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2025 by Garv & Aaditya.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
