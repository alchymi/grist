import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: { table: string; id: string } }
): Promise<NextResponse> {
  try {
    const { table, id } = params;
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la lecture : ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { table: string; id: string } }
): Promise<NextResponse> {
  try {
    const { table, id } = params;
    const body = await request.json() as unknown;
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records/${id}`;
    
    const response = await fetch(url, {
      method: "PUT", // Utilisez PUT pour un remplacement complet ou PATCH pour une modification partielle
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la mise à jour : ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { table: string; id: string } }
): Promise<NextResponse> {
  try {
    const { table, id } = params;
    const body = await request.json() as unknown;
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records/${id}`;
    
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la modification partielle : ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { table: string; id: string } }
): Promise<NextResponse> {
  try {
    const { table, id } = params;
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records/${id}`;
    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la suppression : ${response.statusText} - ${errorText}`);
    }
    return NextResponse.json({ message: "Supprimé avec succès" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
