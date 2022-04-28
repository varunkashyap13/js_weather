const key = "g7GraHuHil69rRO6akOcTgLWrfkBGzxl";

// Get Weather Information
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  //id isnt part of query, but added here anyways
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// Get City Information
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  //use '?' to add query parameters
  //use '&' for following query parameters
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
