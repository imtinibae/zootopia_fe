// app/api/animal/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Animal {
  id: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  weight: string;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Chemin vers le fichier JSON des animaux
    const filePath = path.join(process.cwd(), 'app/data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents); // On suppose que le fichier contient un objet { animals: [...] }

    // Trouver l'animal avec l'ID correspondant
    const animal = data.animals.find((a: Animal) => a.id === parseInt(id, 10));

    if (!animal) {
      // Si l'animal n'est pas trouvé
      return NextResponse.json(
        { error: 'Animal non trouvé' },
        { status: 404 }
      );
    }

    // Retourner les détails de l'animal trouvé
    return NextResponse.json(animal);
  } catch (error) {
    console.error('Erreur API :', error);
    // Retourner une erreur 500 en cas de problème interne
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
