const Images = [
  "https://img.freepik.com/free-photo/portrait-businesswoman-isolated-home_23-2148813223.jpg",
  "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
  "https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg",
  "https://img.freepik.com/free-photo/outdoor-shot-young-caucasian-man-with-beard-relaxing-open-air-surrounded-by-beautiful-mountain-setting-rainforest_273609-1855.jpg",
  "https://img.freepik.com/free-photo/porait-cute-boy-cafe_23-2148436119.jpg",
  "https://img.freepik.com/free-photo/portrait-businesswoman-isolated-home_23-2148813223.jpg",
];

export const getImages = () => {
  const randomIndex = Math.floor(Math.random() * Images.length);
  return Images[randomIndex];
};
