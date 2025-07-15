// src/utils/csvLoader.js
import Papa from "papaparse";

export async function loadPlacesCSV(url = "/data/places.csv") {
  const response = await fetch(url);
  const text = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: results => resolve(results.data),
      error: err => reject(err),
    });
  });
}
