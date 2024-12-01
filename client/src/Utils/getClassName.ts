export const getClassName = (
  className: string,
  classes: { [key: string]: any } = {}
) => {
  const classNames: string[] = [className];

  Object.entries(classes).forEach(([key, value]) => {
    if (value) {
      classNames.push(key);
    }
  });

  return classNames.join(" ");
};
