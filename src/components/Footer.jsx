import { Button, Link } from '@nextui-org/react';
import { footerData } from '../lib/data';
import { socialMedia } from '../lib/data';
// import logo from '../assets/New-Credo-Logo-Blue-ETZ.svg'
import logo from '../assets/monicard.png'
import CBNLogo from '../assets/CBNLogo.svg'

const Footer = () => {
  const date = new Date()
  let year = date.getFullYear()

  return (
    <>
      <footer
        className='md:block px-6 bg-[#070611] sm:p-16 font-dm Sans pt-8 text-white'>
         <div className='flex flex-col items-center gap-4 my-10 animate__animated animate__fadeInUp'>
        <h1 className='text-2xl md:text-5xl text-center font-bold  md:w-[30rem]'>Smarter payments for everyone</h1>
        <Button color='primary' className='text-lg font-semibold rounded-lg mt-4'>Get started for free</Button>
        </div>
           <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 animate__animated animate__fadeInUp">
           <div className='hidden md:block'>
          <img src={logo} alt="Logo" className="w-24 mb-4 bg-white rounded" />
            <ul>
                <li className=" text-gray-200 mb-2">
                 Smarter Payments for Everyone
                </li>
                <li className=" text-gray-400 font-light mb-2">
                 4th & 5th Floor, Fortune Towers
                </li>
                <li className=" text-gray-400 font-light mb-2">
                 27/29 Adeyemo Alakija Street, Victoria Island, Lagos, Nigeria.
                </li>
                <li className=" text-slate-300 mb-2 flex items-center gap-2">
                 Licensed by the CBN <img src={CBNLogo} alt="" className="w-18" />
                </li>
            </ul>
           </div>
        {Object.entries(footerData).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-lg font-semibold text-gray-400 uppercase mb-4">
              {title}
            </h3>
            <ul>
              {items.map((item, index) => (
                <li key={index} className=" text-gray-200 mb-2">
                  {item.includes("Coming Soon") ? (
                    <div className="flex items-center">
                      <span>{item.replace("(Coming Soon)", "").trim()}</span>
                      <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
         <div className='flex flex-col justify-center items-center md:hidden'>
           <img src={logo} alt="Logo" className="w-24 mb-4 bg-white rounded" />
            <ul className='text-center'>
                <li className=" text-gray-200 mb-2">
                 Smarter Payments for Everyone
                </li>
                <li className=" text-gray-400 font-light mb-2">
                 4th & 5th Floor, Fortune Towers
                </li>
                <li className=" text-gray-400 font-light mb-2">
                 27/29 Adeyemo Alakija Street, Victoria Island, Lagos, Nigeria.
                </li>
                <li className=" text-slate-300 mb-2 flex justify-center items-center gap-2">
                 Licensed by the CBN <img src={CBNLogo} alt="" className="w-18" />
                </li>
            </ul>
           </div>
      </div>
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between py-8 md:mt-20">
          <span className="text-wrap text-sm text-center md:text-start text-gray-500 font-semibold">
            © {year} Credo. All right reserved. | Privacy Policy | Terms
          </span>
          <div className="flex space-x-6 sm:justify-end">
           {socialMedia.map((media,ind)=>(
            <Link key={ind} href="#"
                  className="text-gray-500 hover:text-gray-600"
            >
              <media.icon size={20}/>
              <span className="sr-only">Facebook page</span>
            </Link>
           ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
