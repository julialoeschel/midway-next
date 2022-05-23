export default async function getPoi(req, res) {
  const { lat, long } = req.query;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3IMMwoaYfwSaXzGQqKlc9o9AtrQqjZeGEJTa6IjqBFaU=",
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&radius=30000&categories=13003&limit=10`,
    options
  );
  const places = await response.json();

  res.send(places);
}
