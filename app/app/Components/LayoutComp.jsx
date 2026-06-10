import React from 'react'
import Header from './Header'
import Footer from './Footer'
import GlobalAudioBar from './GlobalAudioBar'

const LayoutComp = ({ children }) => {
  return (
    <div className='bg-cream w-full min-h-screen flex flex-col items-center selection:bg-accent selection:text-white pb-20 md:pb-0'>
      <Header />
      <div className="w-full flex-grow">
        {children}
      </div>
      <GlobalAudioBar />
      <Footer />
    </div>
  )
}

export default LayoutComp