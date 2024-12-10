'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CharactersPage() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // Récupérer la liste des personnes
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => setPersons(data))
      .catch((error) => console.error('Erreur :', error));
  }, []);

  const styles = {
    gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    card: { border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }
  };

  return (
    <div>
      <h1>Liste des personnages</h1>
      <div style={styles.gridContainer}>
        {persons.map((person: any) => (
          <Link href={`/characters/${person.id}`} key={person.id}>
            <div style={styles.card}>
              <div><strong>First Name:</strong> {person.firstName}</div>
              <div><strong>Last Name:</strong> {person.lastName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
