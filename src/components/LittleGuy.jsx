import { FaSquarePlus } from "react-icons/fa6"


const LittleGuy = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:grid grid-cols-2 px-6 py-8 md:px-24">
    <div className="animate__animated animate__fadeInLeft">
 <div className="md:w-[6rem] bg-blue-200 rounded-full p-1.5 flex justify-end items-center"> <span className="bg-blue-500 p-3 rounded-full text-white "><FaSquarePlus /></span></div>
    <h1 className="text-2xl md:text-5xl font-bold leading-8">Little Guy <span className="text-blue-500">Today,</span></h1>
    <h1 className="text-2xl md:text-5xl font-bold leading-8">
Big Boy <span className="text-blue-500">Tomorrow.</span></h1>
    </div>

    <div className="animate__animated animate__fadeInRight">
    <p className="text-lg text-[#a8a9aa]">Credo empowers MSMEs to be more successful at every stage of the business lifecycle with our highly customizable features, dedicated support and access to much-needed resources. From inception to expansion, we are with you every step of the way.</p>
    </div>
    
    </div>
  )
}

export default LittleGuy