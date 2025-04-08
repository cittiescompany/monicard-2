import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import {Outlet} from 'react-router-dom'

const RootLayout=()=>{
return(
<div className='relative'>
 <div className="xl:px-20 pt-4 absolute top-0 left-0 w-full">
      <MobileNavbar />
      <Navbar />
    </div>
      <Outlet />
      <Footer/>
</div>
)
}

export default RootLayout