// src/components/FilterForm.js
import React, { useState } from "react";
import styles from "./FilterForm.module.css";

export default function FilterForm({ onSubmit }) {
  const [types, setTypes] = useState({
    eating: true,
    shopping: true,
    sightseeing: true,
  });
  const [maxDist, setMaxDist] = useState("");

  const handleCheckbox = e => {
    const { name, checked } = e.target;
    setTypes(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ types, maxDist: maxDist ? parseFloat(maxDist) : null });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Choose location:</label>
      <select disabled>
        <option>Hong Kong</option>
      </select>
      <div className={styles.checkboxGroup}>
        {["eating", "shopping", "sightseeing"].map(t => (
          <label key={t}>
            <input
              type="checkbox"
              name={t}
              checked={types[t]}
              onChange={handleCheckbox}
            />
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </label>
        ))}
      </div>
      <label>
        Max distance (km):
        <input
          type="number"
          value={maxDist}
          onChange={e => setMaxDist(e.target.value)}
          placeholder="e.g. 5"
        />
      </label>
      <button type="submit" className={styles.button}>
        Randomize 掣 (chaai3)
      </button>
    </form>
  );
}
