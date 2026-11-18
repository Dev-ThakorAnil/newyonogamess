import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE}/downloads/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL(`/game/${slug}`, request.url));
    }

    const data = await res.json();

    // Priority: referralUrl first, then downloadUrl
    const redirectUrl = data.referralUrl || data.downloadUrl;

    if (redirectUrl && redirectUrl !== "#" && redirectUrl.trim() !== "") {
      return NextResponse.redirect(redirectUrl);
    }

    // Fallback: go to game page
    return NextResponse.redirect(new URL(`/game/${slug}`, request.url));
  } catch {
    return NextResponse.redirect(new URL(`/game/${slug}`, request.url));
  }
}
