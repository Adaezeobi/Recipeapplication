export const recipe = async (text) => {
  const APIURL = `https://forkify-api.herokuapp.com/api/v2/recipes`;

  let response = await fetch(
    `${APIURL}${text}?key=17376ac6-1da7-4421-8b4c-5e180bb4dc21`
  );
  response = await response.json();

  return response;
};
