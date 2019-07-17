export default function (names: string[] | string, watch, message) {
  return function(value) {
    let match = true;
    var matchValues = watch(names);
    if (matchValues instanceof Array) {
      matchValues.forEach((matchValue) => {
        if (value !== matchValue) {
          match = false;
        }
      });
      return (match ? true : message);
    }
    return (value === matchValues ? true : message);
  };
};