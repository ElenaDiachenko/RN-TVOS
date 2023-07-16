export const calculateCardWidth = (isPortrait: boolean, width: number) => {
  const columnCount = isPortrait ? (width < 600 ? 2 : 3) : width < 900 ? 3 : 4;
  return (width - columnCount * 20) / columnCount;
};
