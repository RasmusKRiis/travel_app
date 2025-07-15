// src/components/RandomPlace.js
import React from "react";
import styles from "./RandomPlace.module.css";

export default function RandomPlace({
  place,
  distance,
  onAgain,
  onModify,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{place.name}</div>
      <div className={styles.detail}>
        <strong>Type:</strong> {place.type}
      </div>
      <div className={styles.detail}>
        <strong>Description:</strong> {place.description}
      </div>
      <div className={styles.detail}>
        <strong>Comment:</strong> {place.comment}
      </div>
      <div className={styles.detail}>
        <strong>Distance:</strong> {distance.toFixed(2)} km
      </div>
      <div className={styles.actions}>
        <button onClick={onAgain} className={styles.button}>
          Randomize Again 掣 (chaai3)
        </button>
        <div
          onClick={onModify}
          className={styles.link}
          title="Modify filters"
        >
          修改 (sai1goi2) filters
        </div>
      </div>
    </div>
  );
}
