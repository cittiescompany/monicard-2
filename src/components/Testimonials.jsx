import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'animate.css';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { testimonials } from '../lib/data';



const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % testimonials.length);
    };

    return (
        <div className="bg-slate-50 flex items-center justify-center px-6 py-10 md:py-20 md:px-24 animate__animated animate__fadeInUp">
            <div className="">
                {/* Testimonial Content */}
                <div className="relative md:h-48">
                    <div className="text-center animate__animated animate__fadeIn">
                        <div className="flex justify-center mb-4">
                            <span className="text-orange-500 text-xl md:text-3xl">&#9733;</span>
                            <span className="text-orange-500 text-xl md:text-3xl">&#9733;</span>
                            <span className="text-orange-500 text-xl md:text-3xl">&#9733;</span>
                            <span className="text-orange-500 text-xl md:text-3xl">&#9733;</span>
                            <span className="text-orange-500 text-xl md:text-3xl">&#9733;</span>
                        </div>
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                            {testimonials[currentIndex].text}
                        </p>
                        <p className="mt-4 font-bold text-gray-800">
                            {testimonials[currentIndex].author}
                        </p>
                        <p className="text-gray-500">
                            {testimonials[currentIndex].role}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 mt-10 md:mt-24">
                    <button
                        onClick={handlePrev}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-500 p-3 rounded-full"
                    >
                        <IoMdArrowBack size={22} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-500 p-3 rounded-full"
                    >
                       <IoMdArrowForward size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
