import fetch from "node-fetch";

exports.handler = async function (event) {
  console.log(event.body);
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const token = process.env.ASTRA_DB_TOKEN;
  const data = JSON.parse(event.body);
  const query = `
    query getRecipesBasedOnCategory{
    recipes(
    value:{ category:"${data.data}"}
    orderBy:[title_ASC]){
    values{
      title,
      description,
    	thumbnail,
      category,
      recipe_name
    }
  }
}

    `;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": token,
    },
    body: JSON.stringify({ query }),
  };
  const response = await fetch(url, options);
  try {
    const responseBody = await response.json();
    // console.log(responseBody);
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
