export default date => {
  return date
    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    : 'No Date';
};
