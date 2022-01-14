import fetch from "node-fetch";

exports.handler = async function (event) {
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const token = process.env.ASTRA_DB_TOKEN;
  const { data } = JSON.parse(event.body);
  console.log(data);
  const query = `
mutation insertingredients{
  insertingredients(
value: {
  recipe_name:"${data.recipe_name}",
  description: "${data.description}",
  id: ${data.id},
  thumbnail: "${data.thumbnail}",
  title: "${data.title}",
  view_order:${data.view_order},
}
ifNotExists: true
){
    value{
      id,
      title,
      description,
    	thumbnail,
      recipe_name,
      view_order
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
    console.log(responseBody);
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
