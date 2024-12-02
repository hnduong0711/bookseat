/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    gridTemplateRows: {
      '16': 'repeat(16, minmax(0, 1fr))',
      '72': 'repeat(72, minmax(0, 1fr))',
    },
    gridTemplateCols: {
      '16': 'repeat(16, minmax(0, 1fr))',
      '72': 'repeat(72, minmax(0, 1fr))',
    },
  },
};
export const plugins = [];