module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("where", function(arr, key, value) {
    return arr.filter(item => item[key] == value);
  });
};
