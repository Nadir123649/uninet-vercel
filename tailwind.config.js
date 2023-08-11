/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "max-83": "100px",
        "max-100": "120px",
        "mx-550": "550px",
        "max-150": "160px",
        "max-600": "600px",
        "max-200": "200px",
        "max-500": "500px",
      },
      width: {
        "w-500": "500px",
        "w-1/6": "45%",
        "w-1/7": "60%",
      },
      backgroundImage: {
        "bg-linear": "linear-gradient(to right, #8ECAE6, #219EBC, #FFFF)",
        "bg-sidebar": "linear-gradient(to right, #8ECAE6, #219EBC, #4C7A91)",
        // "bg-sec": "linear-gradient(135deg, #8ecaeb, #219ebc, #023047, #ffb703, #fb8500)", 
      },
      colors: {
        "bg-none": "linear-gradient(to right, #8ECAE6, #219EBC, #FFFF)",
        "bg-sec": "linear-gradient(135deg, #007bff, #00bcd4)",
        "bg-border": "#DBDFE9",
        "bg-input": "#023047",
        "bg-btn": "#F9F9F9",
        "text-color": "#023047",
        "primary-color": "#8ECAE6 ",
        "bg-secondary": " #219EBC",
        "bg-disable": "rgb(192, 192, 192)",
        "bg-color": "#4C7A91",
        // "bg-second": "  #6da2b8",
        "bg-second": "rgba(186 , 224, 238 , 1)",
      },
      height: {
        130: "130px",
      },
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
