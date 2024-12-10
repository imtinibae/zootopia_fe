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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/persons/${params.id}`);
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!person) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div>
      <h1>Détails de la personne</h1>
      <div><strong>First Name:</strong> {person.firstName}</div>
      <div><strong>Last Name:</strong> {person.lastName}</div>
      <div><strong>Email:</strong> {person.email}</div>
      <div><strong>Phone Number:</strong> {person.phoneNumber}</div>
    </div>
  );
}
