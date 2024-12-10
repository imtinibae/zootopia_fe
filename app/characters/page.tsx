import React from 'react';
import Link from 'next/link';
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
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s ease-in-out',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};

export default async function CharactersPage() {
  try {
    const filePath = path.join(process.cwd(), 'app/data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    console.log('Persons Data:', data?.persons);

    return (
      <div style={styles.container}>
        <h1>Characters List</h1>
        {data?.persons?.length > 0 ? (
          <div style={styles.gridContainer}>
            {data.persons.map((person: any) => (
              <Link
                href={`/characters/${person.id}`}
                key={person.id}
                passHref
              >
                <div
                  style={styles.card}
                  className="card-hover"
                >
                  <div><strong>First Name:</strong> {person.firstName}</div>
                  <div><strong>Last Name:</strong> {person.lastName}</div>
                  <div><strong>Email:</strong> {person.email}</div>
                  <div><strong>Phone:</strong> {person.phoneNumber}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>Aucune donnée trouvée.</div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Erreur dans le chargement des données', error);
    return (
      <div style={styles.container}>
        <h1>Une erreur est survenue lors du chargement des personnages.</h1>
      </div>
    );
  }
}
