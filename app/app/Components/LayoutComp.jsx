import React from 'react'
import Header from './Header'
import Footer from './Footer'

const LayoutComp = ({children}) => {
  return (
    <div className='bg-bg w-full flex flex-col items-center'>
        <Header />
          {children}
          <Footer/>
    </div>
  )
}

export default LayoutComp