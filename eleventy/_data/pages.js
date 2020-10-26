const fetch = require("node-fetch");
const environments = {
  dev: {
    publicationState: "PREVIEW",
    endpoint: "http://localhost:1337/graphql"
  },
  prod: {
    publicationState: "LIVE",
    endpoint: "https://sdv.im/graphql"
  }
}
const env = process.env.ELEVENT_ENV && process.env.ELEVENT_ENV == "PROD" ? "prod" : "dev";
const setting = environments[env];

async function getAllPages() {
  const recordsPerQuery = 100;

  let recordsToSkip = 0;
  let makeNewQuery = true;
  let pages = [];

  while (makeNewQuery) {
    try {
      const data = await fetch(setting.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{
            pages(publicationState:${setting.publicationState}) {
              title
              slug
              published_at
              parent {
                title
                slug
              }
              children {
                title
                slug
                children {
                  title
                  slug
                }
              }
            }
          }`,
        }),
      });

      const response = await data.json();
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.error(error.message);
        });
        throw new Error("CMS error");
      }

      pages = pages.concat(response.data.pages);
      recordsToSkip += recordsPerQuery;
      if (response.data.pages.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const pagesFormatted = pages.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      date: item.published_at,
      parent: item.parent,
      children: item.children,
    };
  });

  // return formatted pages
  return pagesFormatted;
}

// export for 11ty
module.exports = getAllPages;
