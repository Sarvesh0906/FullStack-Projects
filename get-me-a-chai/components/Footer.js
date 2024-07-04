import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className='bg-blue-950 text-white flex justify-center text-center p-4 text-lg'>
        <p className='font-semibold'>Copyright &copy;{year} Get me a Chai - All Rights Reserved</p>
    </footer>
  )
}

export default Footer
