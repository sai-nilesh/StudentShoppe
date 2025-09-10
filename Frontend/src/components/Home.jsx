import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductCards from './ProductCards'
import Menu from './Menu'

const Home = () => {
  return (
    <div className='bg-base-100'>
      
       
        <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow ">
      <Navbar/>
      
      <ProductCards/>
      </main>

      {/* Footer */}
      <footer className=" text-white text-center ">
      <Footer/>
      </footer>
    </div>

    </div>
  )
}

export default Home