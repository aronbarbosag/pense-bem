export const shuffle = (items) => {
  const shuffledItems = [...items];

  for (let currentIndex = shuffledItems.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledItems[currentIndex], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[currentIndex]];
  }

  return shuffledItems;
};
