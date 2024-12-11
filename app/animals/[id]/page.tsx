'use client';

import { useEffect, useState } from 'react';

interface Animal {
  id: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  weight: string;
  ownerId: number;
}

export default function AnimalDetailPage({ params }: { params: { id: string } }) {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [displayedInfo, setDisplayedInfo] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) {
      setError('Aucun ID fourni pour récupérer les données.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/animals/${params.id}`);
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }
        const data: Animal = await response.json();
        setAnimal(data);
        typeWriterEffect(data);
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération des données.');
      }
    };

    fetchData();
  }, [params.id]);

  const typeWriterEffect = (animalData: Animal) => {
    const fields = [
      { key: 'name', value: animalData.name },
      { key: 'species', value: animalData.species },
      { key: 'breed', value: animalData.breed },
      { key: 'color', value: animalData.color },
      { key: 'weight', value: animalData.weight }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < fields.length) {
        setIsTyping(true);
        const field = fields[i];
        typeText(field.key, field.value);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1200); 
  };

  const typeText = (key: string, value: string) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedInfo((prevInfo) => ({
        ...prevInfo,
        [key]: value.slice(0, index + 1)
      }));

      index++;
      if (index === value.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100); 
  };

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
        {error}
      </div>
    );
  }

  if (!animal) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div style={{
      fontFamily: 'VT323, monospace', 
      color: '#00ffcc', 
      background: '#000', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center', 
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem', 
        textShadow: '2px 2px #000', 
        marginBottom: '20px', 
        textAlign: 'center' 
      }}>
        Détails de l'animal
      </h1>

      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Name:</strong> {displayedInfo.name || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Species:</strong> {displayedInfo.species || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Breed:</strong> {displayedInfo.breed || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Color:</strong> {displayedInfo.color || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Weight:</strong> {displayedInfo.weight || '...'}
      </div>
      
      {isTyping && <div style={{
        color: '#00ffcc', 
        fontSize: '1.5rem', 
        marginTop: '10px', 
        textAlign: 'center'
      }}>
      </div>}
    </div>
  );
}
