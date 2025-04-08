/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { cards } from "../lib/data";

const CardSlider = () => {
  const sliderRef = useRef(null);
 let scrollAnimation;

  const startScrolling = (direction) => {
    if (sliderRef.current) {
    //   const scrollAmount = direction === "forward" ? sliderRef.current.scrollWidth : -sliderRef.current.scrollWidth;

      // Clear any ongoing animations
      stopScrolling();

      // Apply a slow and continuous scroll effect
    //   scrollAnimation = setInterval(() => {
    //     sliderRef.current.scrollBy({
    //       left: scrollAmount / 100, // Adjust the division factor to control speed
    //     });
    //   }, 20); // Lower interval time ensures smooth movement
    }
  };

  const stopScrolling =()=>{
    if (scrollAnimation) {
      clearInterval(scrollAnimation);
    }
  };


  const scrollForward = () => {
    // if (sliderRef.current) {
    //   sliderRef.current.scrollBy({
    //     left: sliderRef.current.offsetWidth,
    //     behavior: "smooth",
    //   });
    // }
    stopScrolling() || sliderRef.current?.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" })
  };

  const scrollBackward = () => {
  stopScrolling() || sliderRef.current?.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" })
    // if (sliderRef.current) {
    //   sliderRef.current.scrollBy({
    //     left: -sliderRef.current.offsetWidth,
    //     behavior: "smooth",
    //   });
    // }
  };

//    const handleMouseEnter = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollTo({
//         left: sliderRef.current.scrollWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleMouseLeave = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollTo({
//         left: 0,
//         behavior: "smooth",
//       });
//     }
//   };

  const handleMouseEnter = () => {
    startScrolling("forward");
  };

//   const handleMouseLeave = () => {
//     startScrolling("backward");
//   };



  return (
    <div className="flex flex-col items-center w-full px-6 py-8 my-8 md:px-24 animate__animated animate__fadeInUp">
      <div
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
    //   onMouseLeave={handleMouseLeave}
        className="flex overflow-x-scroll scrollbar-hide space-x-8 w-full snap-x snap-mandatory py-6"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={` flex-shrink-0 w-[18rem] md:w-[30rem] border bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-md snap-center flex flex-col justify-between`}
          >
          <div className="flex justify-between">
            <h2 className="text-blue-500 text-2xl md:text-4xl font-bold p-4 md:p-8">{`0${card.id}`}</h2>
            <img src={card.bg} alt="" className="h-[6rem] w-[6rem] md:h-[10rem] md:w-[10rem]" />
          </div>
          <div className="p-4 md:p-8">
            <h3 className="tracking-wider uppercase text-blue-400 font-semibold mb-2">
              {card.title}
            </h3>
            <p className="text-xl md:text-3xl text-gray-800 font-bold">
              {card.description}
            </p>
          </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={scrollBackward}
          className="bg-gray-200 hover:bg-gray-300 text-gray-500 p-3 rounded-full"
        >
          <IoMdArrowBack size={22} />
        </button>
        <button
          onClick={scrollForward}
          className="bg-gray-200 hover:bg-gray-300 text-gray-500 p-3 rounded-full"
        >
          <IoMdArrowForward size={22} />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
