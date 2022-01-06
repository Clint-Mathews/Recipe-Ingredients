const getAPIURL = (functionName : string) => {
  return `/.netlify/functions/${functionName}`;
};
export default getAPIURL;
