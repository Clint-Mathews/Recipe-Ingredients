import fetch from "node-fetch";

exports.handler = async function (event) {
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
  const token = process.env.ASTRA_DB_TOKEN;
  const { data } = JSON.parse(event.body);
  console.log(data);
  const query = `
  mutation deleteingredients{
  deleteingredients(
value: {
  id: ${data.id}
  recipe_name: "${data.recipe_name}"
}
    ifExists:true
){
    value{
      id
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
