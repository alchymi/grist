import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // On typpe le corps en unknown (vous pouvez le raffiner si vous disposez d'une interface)
    const bodyData = await request.json() as unknown;

    const res = await fetch(`${process.env.GRIST_API_URL}/votre-endpoint-d-ecriture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GRIST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erreur Grist: ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Erreur lors de l’écriture sur Grist:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}