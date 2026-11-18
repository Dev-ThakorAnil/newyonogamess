import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (token !== process.env.REVALIDATION_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { type, payload } = await request.json();

    if (type === "game" && payload?.slug) {
      revalidatePath(`/game/${payload.slug}`);
      revalidatePath(`/`);
      revalidatePath(`/diwa-games`);
      revalidatePath(`/diwa-rummy`);
      revalidatePath(`/search`);
      revalidatePath(`/sitemap.xml`);
      if (payload.category) {
        revalidatePath(`/category/${payload.category}`);
      }
      return NextResponse.json({ revalidated: true, path: `/game/${payload.slug}`, now: Date.now() });
    }
    
    if (type === "all") {
      revalidatePath('/', 'layout');
      return NextResponse.json({ revalidated: true, path: "all", now: Date.now() });
    }

    return NextResponse.json({ message: "Invalid type or payload" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
