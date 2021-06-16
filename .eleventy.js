const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("stringDate", string => {
    return new Date(string).toLocaleDateString();
  });
  eleventyConfig.addPassthroughCopy({ "./src/_assets": "assets" });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addWatchTarget("./src/_assets/");
  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
