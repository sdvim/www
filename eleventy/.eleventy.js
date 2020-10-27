module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("where", function(arr, key, value) {
    return arr.filter(item => item[key] == value);
  });
  eleventyConfig.addFilter("stringDate", string => {
    return new Date(string).toLocaleDateString();
  });
  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts",
    }
  }
};
