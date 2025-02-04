// app/api/grist-write/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyData = await request.json();

    const res = await fetch(`${process.env.GRIST_API_URL}/votre-endpoint-d-ecriture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GRIST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) {
      throw new Error(`Erreur Grist: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de l’écriture sur Grist:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
