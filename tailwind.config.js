/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      '7xl': ['144px', 176 / 144],
      '6xl': ['104px', 128 / 104],
      '5xl': ['80px', 96 / 80],
      '4xl': ['56px', 72 / 56],
      '3xl': ['40px', 56 / 40],
      '2xl': ['36px', 48 / 36],
      'xl': ['24px', 40 / 24],
      'xl-tight': ['24px', 32 / 24],
      'lg': ['20px', 32 / 20],
      'md': ['18px', 32 / 18],
      'md-tight': ['18px', 24 / 18],
      'base': ['16px', 32 / 16],
      'base-tight': ['16px', 24 / 16],
      'sm': ['14px', 24 / 14],
      'xs': ['12px', 16 / 12],
    }
  },
  plugins: [
    require("./fluidFontSizePlugin"),
  ],
}

