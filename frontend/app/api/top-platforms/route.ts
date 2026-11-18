import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "top-platforms.json");

const defaultSlots = [
  {
    slotNumber: 1,
    gameSlug: "yono-vip",
    gameId: "",
    badge: "🏆 #1 TOP CHOICE",
    subtitle: "Most Popular Experience",
    rating: "9.9",
    highlights: ["⚡ Instant UPI", "🛡️ 100% Secure RNG", "🎧 24/7 VIP Support", "🎁 ₹500 Bonus"]
  },
  {
    slotNumber: 2,
    gameSlug: "spin-crush",
    gameId: "",
    badge: "🥈 #2 RECOMMENDED",
    subtitle: "Trusted Starting Platform",
    rating: "9.7",
    highlights: ["⚡ Instant Withdrawal", "🛡️ 100% Secure RNG", "🎁 ₹500 Bonus", "🎮 Real Players"]
  },
  {
    slotNumber: 3,
    gameSlug: "cash-rummy",
    gameId: "",
    badge: "🥉 #3 TOP REWARD",
    subtitle: "High Bonus Alternative",
    rating: "9.6",
    highlights: ["⚡ Low ₹100 Min Cashout", "🛡️ Verified Payouts", "🎁 ₹500 Bonus", "⭐ Top Rated"]
  }
];

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf8");
      return NextResponse.json(JSON.parse(data));
    }
    return NextResponse.json({ slots: defaultSlots });
  } catch (err: any) {
    return NextResponse.json({ slots: defaultSlots, error: err.message });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.slots)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ success: true, slots: body.slots });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

