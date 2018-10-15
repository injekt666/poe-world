// Functions
const accentFold = (value) => {
  return value.replace(
    /([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
    (_, a, c, e, i, n, o, s, u, y, ae) => {
      if (a) return 'a';
      if (c) return 'c';
      if (e) return 'e';
      if (i) return 'i';
      if (n) return 'n';
      if (o) return 'o';
      if (s) return 's';
      if (u) return 'u';
      if (y) return 'y';
      if (ae) return 'ae';
    }
  );
}

export default (haystack, needle) => {
  const sanitizedHaystack = accentFold(haystack.trim().toLowerCase());
  const sanitizedNeedle = accentFold(needle.trim().toLowerCase());

  return sanitizedHaystack.indexOf(sanitizedNeedle) > -1;
};
