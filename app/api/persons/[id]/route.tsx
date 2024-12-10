import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const filePath = path.join(process.cwd(), 'app/data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data: { persons: Person[] } = JSON.parse(fileContents);

    const person = data.persons.find((p) => p.id === parseInt(id, 10));

    if (!person) {
      return NextResponse.json(
        { error: 'Personne non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
