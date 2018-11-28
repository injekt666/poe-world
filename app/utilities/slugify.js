export default value => {
  let slug = value.toLowerCase();
  slug = slug.replace(/ /g, '-');
  slug = slug.replace(/[^a-z\-]/g, '');

  return slug;
};
