import React from 'react'
import Navbar from '@/app/components/Navbar'

export default function Layout({ children }) {
    return (
      <>
        <Navbar/>
        <main>
             
            {children}</main>
        
      </>
    )
  }