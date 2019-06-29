export default (values: any[] | any) => {
  return (value) => {
    let match = true;
    if (values instanceof Array) {
      values.forEach((matchValue) => {
        if (value !== matchValue) {
          match = false;
        }
      });
      return match;
    }
    return value === values;
  };
};