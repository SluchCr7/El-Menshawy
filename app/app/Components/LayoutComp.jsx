import React from 'react'
import Header from './Header'
import Footer from './Footer'

const LayoutComp = ({ children }) => {
  return (
    <div className='bg-cream w-full min-h-screen flex flex-col items-center selection:bg-accent selection:text-white'>
      <Header />
      <div className="w-full flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default LayoutComp