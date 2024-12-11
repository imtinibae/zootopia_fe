'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetch('/api/animals')
      .then((response) => response.json())
      .then((data) => {
        setAnimals(data);
        setTotalItems(data.length); 
      })
      .catch((error) => console.error('Erreur :', error));
  }, []);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = animals.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleArrowChange = (direction: string) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


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
        CHOOSE YOUR ANIMALS
      </h1>

      <div style={styles.gridContainer}>
        {currentItems.map((animal: any) => (
          <Link href={`/animals/${animal.id}`} key={animal.id}>
            <div
              style={styles.card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div><strong>Nom :</strong> {animal.name}</div>
              <div><strong>Espèce :</strong> {animal.species}</div>
              <div><strong>Race :</strong> {animal.breed}</div>
            </div>
          </Link>
        ))}
      </div>

   
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
