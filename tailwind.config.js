/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'max-83': '83px',
        'max-600': '600px',
        'max-200' : '200px',
        'max-500' : '500px',
      },
      width: {
        'w-500': '500px',
      },
      backgroundImage: {
        'bg-linear' : 'linear-gradient(to right, #8ECAE6, #219EBC, #FFFF)',
        'bg-sidebar' : 'linear-gradient(to right, #8ECAE6, #219EBC, #4C7A91)'
        
      },
      colors: {
        'bg-none': 'linear-gradient(to right, #8ECAE6, #219EBC, #FFFF)',
        'bg-border' : '#DBDFE9',
        "bg-btn" : '#F9F9F9',
        'text-color' : '#023047',
        'primary-color' : '#8ECAE6 ',
        'bg-secondary' : ' #219EBC',
        'bg-disable' : 'rgb(192, 192, 192)',
        'bg-color' : '#4C7A91'
      },
      height: {
        '130': '130px',
      },
      screens: {
        'sm': '640px',  
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}


