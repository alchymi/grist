import { NextResponse } from 'next/server';
import { GristResponse } from '../../../types/grist'; 

export async function POST(
  request: Request,
  { params, searchParams: _searchParams }: { params: { table: string }; searchParams?: URLSearchParams }
): Promise<NextResponse> {
  try {
    const { table } = params;
    // Typage du corps de la requête en tant qu'unknown (à adapter si vous avez une interface spécifique)
    const body = await request.json() as unknown;
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GRIST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la création : ${response.statusText} - ${errorText}`);
    }
    
    const data = (await response.json()) as GristResponse;
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.error('Erreur lors de l’écriture sur Grist:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
