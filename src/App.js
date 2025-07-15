// src/App.js
import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { loadPlacesCSV } from "./utils/csvLoader";
import { haversine } from "./utils/distance";
import FilterForm from "./components/FilterForm";
import RandomPlace from "./components/RandomPlace";

function App() {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [userLoc, setUserLoc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedDist, setSelectedDist] = useState(0);

  // load CSV on mount
  useEffect(() => {
    (async () => {
      const data = await loadPlacesCSV();
      setPlaces(data);
      setFiltered(data);
    })();
    // get user location
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLoc([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        console.warn("Geolocation denied");
        setUserLoc(null);
      }
    );
  }, []);

  const applyFilters = ({ types, maxDist, location }) => {
    let arr = places.filter(p => types[p.type]);
    if (location) {
      arr = arr.filter(p =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (userLoc && maxDist != null) {
      arr = arr.filter(p => {
        const dist = haversine(userLoc, [
          parseFloat(p.lat || p.latitude || 0),
          parseFloat(p.lon || p.longitude || 0),
        ]);
        return dist <= maxDist;
      });
    }
    setFiltered(arr);
    pickRandom(arr);
  };

  const pickRandom = arr => {
    if (!arr.length) return;
    const choice = arr[Math.floor(Math.random() * arr.length)];
    let dist = 0;
    if (userLoc) {
      dist = haversine(userLoc, [
        parseFloat(choice.lat || choice.latitude || 0),
        parseFloat(choice.lon || choice.longitude || 0),
      ]);
    }
    setSelected(choice);
    setSelectedDist(dist);
  };

  const handleModify = () => {
    setSelected(null);
  };

  if (!places.length) {
    return (
      <div className={styles.container}>
        <h1>Travel Randomizer (簡單 gaan2daan1)</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Travel Randomizer (簡單 gaan2daan1)</h1>
      {!selected ? (
        <FilterForm onSubmit={applyFilters} />
      ) : (
        <RandomPlace
          place={selected}
          distance={selectedDist}
          onAgain={() => pickRandom(filtered)}
          onModify={handleModify}
        />
      )}
    </div>
  );
}

export default App;
