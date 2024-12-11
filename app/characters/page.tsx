'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CharactersPage() {
  const [persons, setPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Récupérer la liste des personnes
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => {
        setPersons(data);
        setTotalItems(data.length); // On met à jour le total des éléments
      })
      .catch((error) => console.error('Erreur :', error));
  }, []);

  // Calculer les indices des éléments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = persons.slice(indexOfFirstItem, indexOfLastItem);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fonction pour changer la page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour changer la page par flèches
  const handleArrowChange = (direction: string) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Style adapté à ton thème de jeu vidéo
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'VT323, monospace',
      background: 'radial-gradient(circle, #000000, #1a1a1a, #333333)',
      color: '#00ffcc',
      padding: '20px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginTop: '20px',
    },
    card: {
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      background: 'linear-gradient(135deg, #1a1a1a, #333333)',
      color: '#00ffcc',
      boxShadow: '0 4px 8px rgba(0, 255, 204, 0.4)',
      transition: 'transform 0.3s ease, background 0.3s ease',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      marginBottom: '20px',
      alignItems: 'center',
    },
    pageButton: {
      margin: '0 5px',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '5px',
      border: '1px solid #00ffcc',
      background: 'transparent',
      color: '#00ffcc',
      transition: 'background 0.3s ease, transform 0.3s ease',
    },
    activePageButton: {
      backgroundColor: '#00ffcc',
      color: '#000',
    },
    arrowButton: {
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#00ffcc',
      background: 'transparent',
      border: 'none',
      padding: '5px 15px',
      transition: 'transform 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ fontSize: '3rem', textShadow: '2px 2px #000', marginBottom: '20px' }}>
        CHOOSE YOUR CHARACTERS
      </h1>

      <div style={styles.gridContainer}>
        {currentItems.map((person: any) => (
          <Link href={`/characters/${person.id}`} key={person.id}>
            <div
              style={styles.card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div><strong>First Name:</strong> {person.firstName}</div>
              <div><strong>Last Name:</strong> {person.lastName}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.arrowButton}
          onClick={() => handleArrowChange('prev')}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>

        <div style={{ color: '#00ffcc', fontSize: '1.5rem', padding: '0 10px' }}>
          {currentPage} / {totalPages}
        </div>

        <button
          style={styles.arrowButton}
          onClick={() => handleArrowChange('next')}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
