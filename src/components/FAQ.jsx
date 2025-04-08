import { useState } from "react";
import { faqs } from "../lib/data";
import backIcon from '../assets/FaqBackIcon.svg'


const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 text-center animate__animated animate__fadeInUp overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently asked Questions
        </h2>
        <p className="text-[#B9BEC7] mb-8 text-lg">
          What makes Credo different? Here are some quick answers to your frequently asked questions to help you understand what sets Credo apart:
        </p>
        <div className="space-y-4 relative">
    <img src={backIcon} alt="" className="w-20 absolute top-5 -left-6" /> 
    <img src={backIcon} alt="" className="w-20 absolute rotate-45 bottom-5 -right-6" /> 
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-md p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <button
                  className={`transform transition-transform ${
                    activeIndex === index ? "rotate-45" : "rotate-0"
                  } text-xl`}
                >
                  +
                </button>
              </div>
              {activeIndex === index && (
                <p className={`text-gray-600 mt-2 transition-transform duration-300 ease-in-out ${
          activeIndex === index ? "transform scale-y-100" : "transform scale-y-0"
        } `}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
