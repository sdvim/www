const fetch = require("node-fetch");
const endpoint =  true ? "http://localhost:1337/graphql" : "https://sdv.im";

// function to get works
async function getAllworks() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let works = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    try {
      // initiate fetch
      const data = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{
            works {
              id
              slug
              title
              content {
                __typename
              }
              published_at
            }
          }`,
        }),
      });

      // store the JSON response when promise resolves
      const response = await data.json();

      // handle CMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("We have a CMS problem");
      }

      // update work array with the data from the JSON response
      works = works.concat(response.data.works);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.works.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format works objects
  const worksFormatted = works.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      date: item.published_at
    };
  });

  // return formatted works
  return worksFormatted;
}

// export for 11ty
module.exports = getAllworks;
