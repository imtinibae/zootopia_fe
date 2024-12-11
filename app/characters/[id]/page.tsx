'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const [person, setPerson] = useState<Person | null>(null);
  const [displayedInfo, setDisplayedInfo] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/persons/${params.id}`);
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }
        const data = await response.json();
        setPerson(data);
        typeWriterEffect(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [params.id]);

  const typeWriterEffect = (personData: Person) => {
    const fields = [
      { key: 'firstName', value: personData.firstName },
      { key: 'lastName', value: personData.lastName },
      { key: 'email', value: personData.email },
      { key: 'phoneNumber', value: personData.phoneNumber }
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
    }, 1200); // Change de vitesse ici (en ms)
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
    }, 100); // Vitesse de l'effet de texte (en ms)
  };

  if (!person) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div style={{
      fontFamily: 'VT323, monospace', 
      color: '#00ffcc', 
      background: '#000', 
      height: '100vh', // Hauteur pour couvrir toute la page
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', // Centrer verticalement
      alignItems: 'center', // Centrer horizontalement
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem', 
        textShadow: '2px 2px #000', 
        marginBottom: '20px', 
        textAlign: 'center' // Centrer le titre
      }}>
        Détails de la personne
      </h1>

      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>First Name:</strong> {displayedInfo.firstName || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Last Name:</strong> {displayedInfo.lastName || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Email:</strong> {displayedInfo.email || '...'}
      </div>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
        <strong>Phone Number:</strong> {displayedInfo.phoneNumber || '...'}
      </div>

      {/* Afficher un indicateur de frappe */}
      {isTyping && <div style={{
        color: '#00ffcc', 
        fontSize: '1.5rem', 
        marginTop: '10px', 
        textAlign: 'center'
      }}></div>}
    </div>
  );
}
