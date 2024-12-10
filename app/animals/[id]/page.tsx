import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';

// Typage CSSProperties
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '10px',
    maxWidth: '1200px',
    width: '90%',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '0.9rem',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
  },
};

export default async function AnimalsPage() {
  try {
    const filePath = path.join(process.cwd(), 'app/data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return (
      <div style={styles.container}>
        <h1>Animals List</h1>
        <div style={styles.gridContainer}>
          {data.animals?.map((animal: any, index: number) => (
            <div key={index} style={styles.card}>
              <div><strong>Name:</strong> {animal.name}</div>
              <div><strong>Species:</strong> {animal.species}</div>
              <div><strong>Breed:</strong> {animal.breed}</div>
              <div><strong>Color:</strong> {animal.color}</div>
              <div><strong>Weight:</strong> {animal.weight} kg</div>
              <div><strong>Owner ID:</strong> {animal.ownerId}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur dans le chargement des données', error);
    return (
      <div style={styles.container}>
        <h1>Une erreur est survenue lors du chargement des animaux.</h1>
      </div>
    );
  }
}
