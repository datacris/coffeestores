import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Image from "next/image";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

//Static Site Generator
export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  // const [coffeeStores, setCoffeeStores] = useState([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  const handleOnBannerBtnClick = () => {
    console.log("hi banner");
    handleTrackLocation();
  };

  useEffect(() => {
    const setCoffeeStoresByLocation = async () => {
      if (latLong) {
        try {
          const url = `/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=30`;
          const response = await fetch(url);
          const coffeeStores = await response.json();
          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
        } catch (e) {
          console.error(e.message);
          setCoffeeStoresError(e.message);
        }
      }
    };
    setCoffeeStoresByLocation();
  }, [latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={200} height={200} />
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    classname={styles.card}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    classname={styles.card}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
