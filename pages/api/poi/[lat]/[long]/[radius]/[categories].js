export default async function getPoi(req, res) {
  const { lat, long, radius, categories } = req.query;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FORESQUARE_AUTH,
    },
  };
  // ein und bei den categories ist %2C
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&radius=${radius}&categories=${categories}&limit=10`,
    options
  );
  const places = await response.json();

  res.send(places);
}
