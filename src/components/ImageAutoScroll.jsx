/* eslint-disable no-unused-vars */
// import { useEffect, useRef } from "react";
// import tablet from '../assets/HeroImage.webp'
// import phone from '../assets/homepageHeroMobile.png'

// const ImageAutoScroll = () => {
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const scrollInterval = setInterval(() => {
//       if (carouselRef.current) {
//         const firstChild = carouselRef.current.children[0];
//         carouselRef.current.appendChild(firstChild);
//       }
//     }, 3000); // Change the interval as needed

//     return () => clearInterval(scrollInterval); // Cleanup on component unmount
//   }, []);

//   return (
//     <div className="relative overflow-hidden w-full h-64 bg-gray-100">
//       <div
//         ref={carouselRef}
//         className="flex w-max animate-scroll"
//         style={{ animation: "scroll 30s linear infinite" }}
//       >
//         {[
//          tablet
//         ].map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Slide ${index}`}
//             className="w-96 h-64 object-cover"
//           />
//         ))}
//       </div>

//       {/* Add a gradient overlay for aesthetics */}
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent"></div>
//     </div>
//   );
// };

// export default ImageAutoScroll;



import { useEffect, useRef } from "react";
import { scrollImages } from "../lib/data";

const ImageAutoScroll = () => {
  const scrollContainer = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollContainer.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;

        // Reset scroll position when reaching halfway (due to duplication)
        if (scrollLeft >= scrollWidth / 2) {
          scrollContainer.current.scrollLeft = 0;
        } else {
          scrollContainer.current.scrollLeft += 1; // Adjust scroll speed here
        }
      }
    };

    const interval = setInterval(scroll, 20); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

  // Duplicate the array to enable infinite scrolling
  const items = [...scrollImages, ...scrollImages];

  return (
    <div className="flex flex-col items-center w-full h-[20rem] bg-gray-800 rounded-md">
      {/* Scroll Container */}
      <div className="w-full h-full overflow-hidden">
        <div
          ref={scrollContainer}
          className="flex items-center h-full overflow-x-scroll gap-8 whitespace-nowrap no-scrollbar"
          style={{scrollBehavior:'smooth'}}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 h-full py-4 w-[28rem]">
              <img
                src={item}
                alt={`item-${index}`}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageAutoScroll;



