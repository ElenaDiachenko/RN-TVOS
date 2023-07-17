export const calculateCardWidth = (isPortrait: boolean, width: number) => {
  const columnCount = 5;
  return (width - columnCount * 20) / columnCount;
};
