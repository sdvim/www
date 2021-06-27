const { DateTime } = require("luxon");
const pluginNavigation = require("@11ty/eleventy-navigation");
const util = require("util");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("stringDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL dd, yyyy");
  });
  eleventyConfig.addFilter("dump", obj => {
    return util.inspect(obj);
  });
  eleventyConfig.addPassthroughCopy("./src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("./src/*.png");
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
