/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0.5,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(-15%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-down-short": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(-5%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-down-shorter": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(-1%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(15%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-up-short": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(5%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-up-shorter": {
          "0%": {
            opacity: 0.5,
            transform: "translateY(1%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: 0.5,
            transform: "translateX(3%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "width-to-fit": {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "wide-pulse": {
          "0%": {
            transform: "scale(1, 1)",
            opacity: 0,
          },

          "50%": {
            opacity: 0.35,
          },

          "100%": {
            transform: "scale(2.25, 2.25)",
            opacity: 0,
          },
        },
        "fetching-down": {
          "0%": {
            zIndex: 2,
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(46px)",
          },
          "100%": {
            zIndex: 0,
            transform: "translateY(0%)",
          },
        },
        "fetching-up": {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            zIndex: 0,
            transform: "translateY(-46px)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        appear: {
          "0%": {
            visibility: "hidden",
          },
          "100%": {
            visibility: "visible",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease forwards",
        "fade-in-no-forwards": "fade-in 250ms ease",
        "fade-in-up": "fade-in-up 250ms ease forwards",
        "fade-in-up-no-forwards": "fade-in-up 250ms ease",
        "fade-in-up-short": "fade-in-up-short 250ms ease forwards",
        "fade-in-up-shorter": "fade-in-up-shorter 250ms ease forwards",
        "fade-in-up-shorter-no-forwards": "fade-in-up-shorter 250ms ease",
        "fade-in-down": "fade-in-down 250ms ease forwards",
        "fade-in-down-short": "fade-in-down-short 250ms ease forwards",
        "fade-in-down-short-no-forwards": "fade-in-down-short 250ms ease",
        "fade-in-down-shorter": "fade-in-down-shorter 250ms ease forwards",
        "fade-in-down-shorter-no-forwards": "fade-in-down-shorter 250ms ease",
        "fade-in-left": "fade-in-left 250ms ease forwards",
        "fade-in-left-no-forwards": "fade-in-left 250ms ease",
        "width-to-fit": "width-to-fit 5000ms ease-in forwards",
        "wide-pulse": "wide-pulse 2000ms ease-in infinite",
        "fetching-down": "fetching-down 2000ms infinite forwards",
        "fetching-up": "fetching-up 2000ms infinite forwards",
        "fade-in-with-delay": "fade-in 125ms 20ms ease forwards",
        "fade-in-with-bigger-delay": "fade-in 125ms 150ms ease forwards",
      },
    },
  },
  plugins: [],
};
