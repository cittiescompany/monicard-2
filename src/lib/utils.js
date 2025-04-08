/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
export function particles (){
  window.particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 400,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#059dff",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "zenith.png",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 6,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 80,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}
export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const notifier = ({ message, type }) => {
    const types = ['success', 'error'];

    if (!types.includes(type)) {
        console.warn(`Unsupported toast type: ${type}`);
        return;
    }

    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message); // Fallback for a generic message
            break;
    }
};

export const copy = async (value, message = "copied") => {
    try {
        await navigator.clipboard.writeText(value);
        notifier({ message: message, type: "success" });
    } catch ($e) {
        notifier({ message: "unable to copy", type: "error" });
    }
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(+value);
};


export const debounce=(func, delay)=> {
 let timeout;

  const debounced = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  // Add a cancel method to clear the timeout
  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}


export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};