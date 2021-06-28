module.exports = {
  layout: 'layouts/base.njk',
  tags: ['blog'],
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.title,
      parent: 'Blog',
    }
  }
};
