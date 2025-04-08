import { Button } from "@nextui-org/react";
import { useRef } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import "tailwindcss/tailwind.css";
import { benefitCards } from "../lib/data";

const BenefitsSlider = () => {
  const sliderRef = useRef(null);

  const scrollForward = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: window.innerWidth < 768 ? sliderRef.current.offsetWidth : sliderRef.current.offsetWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  const scrollBackward = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: window.innerWidth < 768 ? -sliderRef.current.offsetWidth : -sliderRef.current.offsetWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  

  return (
    <div className="flex flex-col items-center w-full px-6 py-8 md:px-24 animate__animated animate__fadeInUp">
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll space-x-6 scrollbar-hide w-full snap-x snap-mandatory"
      >
        {benefitCards.map((card) => (
          <div
            key={card.id}
            className={`${card.color} flex-shrink-0 w-[100%] overflow-hidden md:min-h-[28rem] md:w-[70%] rounded-[2rem] snap-center grid grid-cols-1 md:grid-cols-2 gap-2`}
          >
          <div className="flex flex-col md:justify-between  p-6">
            <div >
            <h3 className="text-lg tracking-wider uppercase text-gray-500 font-semibold mb-2">
              BENEFIT
            </h3>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 mt-8">{card.title}</h2>
            <p className="text-gray-600 text-medium mb-4">{card.description}</p>
            </div>
            <div>
            <Button className=" rounded-md bg-white shadow">
              Learn More <span className="ml-1"><IoMdArrowForward size={18} /></span>
            </Button>
            </div>
          </div>
          <div className="relative md:h-[28rem] flex items-end justify-center">
          <img src={card.image} className="w-[]" alt="" />
          </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={scrollBackward}
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-3 rounded-full"
        >
          <IoMdArrowBack size={22} />
        </button>
        <button
          onClick={scrollForward}
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-3 rounded-full"
        >
          <IoMdArrowForward size={22} />
        </button>
      </div>
    </div>
  );
};

export default BenefitsSlider;
