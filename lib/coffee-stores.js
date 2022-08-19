import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
    color: "green",
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

// ----------------------------------------------------------------
const DEFAULT_LAT_LONG_VALUE = "43.653776273992825%2C-79.38872519751192";
const query = "coffee";
const DEFAULT_LIMIT = 6;

export const fetchCoffeeStores = async (
  latLong = DEFAULT_LAT_LONG_VALUE,
  limit = DEFAULT_LIMIT
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
    // return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}`;
  };
  const response = await fetch(
    getUrlForCoffeeStores(latLong, query, limit),
    options
  );

  const data = await response.json();
  return data.results.map((result, index) => {
    console.log({ result });
    const neighborhood = result.location.neighborhood
      ? result.location.neighborhood
      : [];
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
