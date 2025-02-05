import { NextResponse } from "next/server";
import { GristResponse } from "../../../types/grist"; 

export async function GET(
  request: Request,
  { params, searchParams: _searchParams }: { params: { table: string }; searchParams?: URLSearchParams }
): Promise<NextResponse> {
  try {
    // Attendre explicitement les params
    const awaitedParams = await Promise.resolve(params);
    const { table } = awaitedParams;
    
    const url = `${process.env.GRIST_API_URL}/api/docs/${process.env.GRIST_DOC_ID}/tables/${table}/records`;
    console.log("URL de l'API Grist :", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.GRIST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Réponse de Grist :", errorText);
      throw new Error(`Erreur Grist : ${response.statusText} - ${errorText}`);
    }
    
    const data = (await response.json()) as GristResponse;
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Erreur lors de la lecture des données depuis Grist :", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
