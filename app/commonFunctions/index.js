export const formatNumber = (currentNumber) => {
  return currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}