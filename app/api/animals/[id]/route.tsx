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

    
    const filePath = path.join(process.cwd(), 'app/data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents); 

    
    const animal = data.animals.find((a: Animal) => a.id === parseInt(id, 10));

    if (!animal) {
      // Si l'animal n'est pas trouvé
      return NextResponse.json(
        { error: 'Animal non trouvé' },
        { status: 404 }
      );
    }

    
    return NextResponse.json(animal);
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
