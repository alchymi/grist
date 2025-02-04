import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { table: string } }
): Promise<NextResponse> {
  try {
    const { table } = params;
    const body = await request.json();
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la création : ${response.statusText} - ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
