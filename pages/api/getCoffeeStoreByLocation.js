import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  //configure latLong and limit
  try {
    const { latLong, limit } = req.query;
    const latLongReplaced = latLong.replace(",", "%2C");
    console.log({ latLongReplaced });
    const response = await fetchCoffeeStores(latLongReplaced, limit);
    res.status(200);
    res.json(response);
  } catch (e) {
    console.error("this is an error:", e);
    res.status(500);
    res.json({ message: "Oh no!, something went wrong", e });
  }
};
export default getCoffeeStoresByLocation;
