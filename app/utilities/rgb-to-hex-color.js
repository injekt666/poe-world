export default (red, green, blue) => {
  // Constants
  const HEX_BASE = 16;

  const hex = value => {
    const hexValue = value.toString(HEX_BASE);
    return hexValue.length === 1 ? `0${hexValue}` : hexValue;
  };

  return `#${hex(red)}${hex(green)}${hex(blue)}`;
};
