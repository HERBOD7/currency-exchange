export const formatCurrency = (number) => {
  const formattedNumber = new Intl.NumberFormat('en-IN').format(number);
  return formattedNumber;
};
