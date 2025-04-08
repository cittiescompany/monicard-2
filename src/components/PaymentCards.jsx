import { useEffect, useRef, useState } from "react";
import { paymentCards } from "../lib/data";



const PaymentCards = () => {
  const scrollContainer = useRef(null);
  const [direction, setDirection] = useState("right"); // "right" or "left"

  useEffect(() => {
    const scroll = () => {
      if (scrollContainer.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;

        // Scroll logic
        if (direction === "right") {
          scrollContainer.current.scrollLeft += 1;
          if (scrollLeft + clientWidth >= scrollWidth) {
            setDirection("left");
          }
        } else {
          scrollContainer.current.scrollLeft -= 1;
          if (scrollLeft <= 0) {
            setDirection("right");
          }
        }
      }
    };

    const interval = setInterval(scroll, 10); // Adjust speed by changing the interval
    return () => clearInterval(interval);
  }, [direction]);

  return (
   <div className="flex flex-col items-center w-full px-6 py-4 md:px-24 animate__animated animate__fadeInUp">
   <p className="bg-slate-100 rounded-full px-4 py-2 shadow-lg text-sm">Trusted by the big boys, newbies, and everyone in between 💙</p>
    <div className="w-full overflow-hidden my-16">
      <div
        ref={scrollContainer}
        className="flex space-x-8 items-center justify-between whitespace-nowrap scrollbar-hide"
        style={{ overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {paymentCards.map((item, index) => (
          <div key={index} className="flex-shrink-0 h-16 w-24 cursor-pointer">
            <img
              src={item.logo}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default PaymentCards;
