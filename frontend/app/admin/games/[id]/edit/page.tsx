"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../auth";
import { updateGame } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Game } from "@/lib/types";
import { toLocalDatetimeString, toUtcIsoString } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const CATEGORIES = [
  { value: "rummy", label: "Rummy" },
  { value: "casino", label: "Casino" },
  { value: "slots", label: "Slots" },
  { value: "card-games", label: "Card Games" },
  { value: "fantasy", label: "Fantasy" },
  { value: "earning", label: "Earning" },
];

const MIN_FAQS = 3;

// Content section definitions
const CONTENT_SECTIONS = [
  { key: "aboutGame", label: "About Game", icon: "\u2139\uFE0F", hint: "Overview paragraph about the game \u2014 helps SEO" },
  { key: "keyFeatures", label: "Key Features & Benefits", icon: "\uD83C\uDF81", hint: "Use <ul><li><strong>Feature:</strong> Description</li></ul> format" },
  { key: "systemRequirements", label: "System Requirements", icon: "\uD83D\uDCF1", hint: "Use <table><tr><td>Label</td><td>Value</td></tr></table> format" },
  { key: "whyChoose", label: "Why Choose This Game?", icon: "\u26A1", hint: "Use <ul><li>Reason</li></ul> format" },
  { key: "safetyAndSecurity", label: "Safety & Security", icon: "\uD83D\uDEE1\uFE0F", hint: "Paragraph about app safety and security" },
];

// Generate keyword-rich default content using the game name
function generateDefaultSections(title: string, bonus: string) {
  const t = title?.trim() || "This App";
  const b = bonus?.trim() || "\u20B9500";
  return {
    aboutGame: {
      visible: true,
      content: `<p>${t} is one of the most popular gaming applications in India, offering users an exciting opportunity to earn real money while playing their favorite games. With a user-friendly interface and secure payment system, ${t} has gained the trust of thousands of players across the country.</p><p>The app features a wide variety of games including Rummy, Teen Patti, Poker, and many other skill-based games that not only provide entertainment but also offer substantial earning opportunities for skilled players.</p>`,
    },
    keyFeatures: {
      visible: true,
      content: `<ul><li><strong>Welcome Bonus:</strong> Get ${b} as a sign-up bonus when you register on ${t}</li><li><strong>Low Withdrawal:</strong> Minimum withdrawal amount is just \u20B9100</li><li><strong>Secure Payments:</strong> Fast and secure payment processing via UPI, Bank Transfer</li><li><strong>24/7 Support:</strong> Round-the-clock customer support for ${t} users</li><li><strong>Fair Play:</strong> Certified random number generator for fair gameplay</li><li><strong>Multiple Games:</strong> Wide variety of skill-based games available on ${t}</li></ul>`,
    },
    systemRequirements: {
      visible: true,
      content: `<table><tr><td>Operating System</td><td>Android 5.0 or higher</td></tr><tr><td>Minimum RAM</td><td>2 GB</td></tr><tr><td>Storage Space</td><td>100 MB free</td></tr><tr><td>Internet</td><td>WiFi or 4G/5G</td></tr><tr><td>Screen Size</td><td>4.5" or larger</td></tr></table>`,
    },
    whyChoose: {
      visible: true,
      content: `<ul><li>${b} sign-up bonus + daily rewards on ${t}</li><li>Quick withdrawals starting at \u20B9100 via UPI/Bank</li><li>Wide variety of games with regular updates</li><li>Lightweight ${t} app with smooth performance</li><li>Secure transactions and verified payouts</li><li>Fast payouts, smooth gameplay, and daily rewards</li></ul>`,
    },
    safetyAndSecurity: {
      visible: true,
      content: `<p>Your safety and security are our top priorities. ${t} uses advanced encryption technology to protect your personal and financial information. All transactions are processed through secure payment gateways, ensuring your money is always safe.</p><p>The ${t} app is regularly updated with the latest security patches and features to provide you with the best gaming experience while maintaining the highest standards of security.</p>`,
    },
  };
}

// Generate dynamic FAQs using the game name and bonus
function generateDefaultFaqs(title: string, bonus: string) {
  const t = title?.trim() || "This App";
  const b = bonus?.trim() || "\u20B9500";
  return [
    {
      question: `How to download and install ${t} APK?`,
      answer: `To download ${t} APK, click on the DOWNLOAD NOW button at the top of the page. Once the APK file is downloaded, open phone Settings > Security and enable 'Install from Unknown Sources', then complete the installation.`,
    },
    {
      question: `What is the sign-up bonus in ${t}?`,
      answer: `New users who register on ${t} with their mobile number can receive an exclusive sign-up bonus of ${b} to start playing.`,
    },
    {
      question: `What is the minimum withdrawal amount in ${t}?`,
      answer: `The minimum withdrawal amount in ${t} is \u20B9100. You can withdraw your winnings directly to your bank account or UPI ID with fast processing.`,
    },
  ];
}

export default function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({});

  // Content sections state
  const [contentSections, setContentSections] = useState<Record<string, { visible: boolean; content: string }>>(
    generateDefaultSections("", "")
  );

  // FAQ state - min 3, no max limit
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    generateDefaultFaqs("", "")
  );

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/admin/games`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const game = data.games.find((g: Game) => g._id === id);
        if (game) {
          setForm({
            ...game,
            tags: game.tags?.join(", ") || "",
            screenshots: game.screenshots?.join(", ") || "",
            gameType: game.gameType || "diwa",
            rating: String(game.rating || 4.5),
            position: String(game.position !== undefined ? game.position : 1000),
            releaseDate: toLocalDatetimeString(game.releaseDate),
          });

          // Populate content sections with fallback to dynamic defaults
          const defaults = generateDefaultSections(game.title, game.bonus);
          if (game.contentSections) {
            const cs = game.contentSections;
            setContentSections({
              aboutGame: {
                visible: cs.aboutGame?.visible ?? true,
                content: cs.aboutGame?.content || defaults.aboutGame.content,
              },
              keyFeatures: {
                visible: cs.keyFeatures?.visible ?? true,
                content: cs.keyFeatures?.content || defaults.keyFeatures.content,
              },
              systemRequirements: {
                visible: cs.systemRequirements?.visible ?? true,
                content: cs.systemRequirements?.content || defaults.systemRequirements.content,
              },
              whyChoose: {
                visible: cs.whyChoose?.visible ?? true,
                content: cs.whyChoose?.content || defaults.whyChoose.content,
              },
              safetyAndSecurity: {
                visible: cs.safetyAndSecurity?.visible ?? true,
                content: cs.safetyAndSecurity?.content || defaults.safetyAndSecurity.content,
              },
            });
          } else {
            setContentSections(defaults);
          }

          // Populate FAQs with min 3 guarantee
          const defaultFaqsList = generateDefaultFaqs(game.title, game.bonus);
          if (game.faq && game.faq.length > 0) {
            const existingFaqs = game.faq.map((f: { question: string; answer: string }) => ({
              question: f.question || "",
              answer: f.answer || "",
            }));
            while (existingFaqs.length < MIN_FAQS) {
              const padIdx = existingFaqs.length;
              existingFaqs.push(defaultFaqsList[padIdx] || { question: "", answer: "" });
            }
            setFaqs(existingFaqs);
          } else {
            setFaqs(defaultFaqsList);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, id]);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev: Record<string, any>) => ({ ...prev, [field]: value }));
  };

  const updateSection = (key: string, field: "visible" | "content", value: boolean | string) => {
    setContentSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    setFaqs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    if (faqs.length > MIN_FAQS) {
      setFaqs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "screenshots") => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", field === "logo" ? "logo" : "screenshot");

    try {
      const res = await fetch(`${API_BASE}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      if (field === "logo") {
        updateField("logo", data.url);
      } else {
        const currentScreenshots = form.screenshots ? form.screenshots.split(",").map((s: string) => s.trim()) : [];
        currentScreenshots.push(data.url);
        updateField("screenshots", currentScreenshots.join(", "));
      }
    } catch (err: any) {
      const msg = err.message?.includes("Failed to fetch")
        ? "Cannot connect to server. Make sure the backend is running."
        : (err.message || "Failed to upload image");
      setError(msg);
    }
    setUploadingImage(false);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!form.title?.trim()) { setError("Title is required"); return; }
    if (!form.category?.trim()) { setError("Category is required"); return; }

    setSaving(true);
    setError("");

    try {
      const validFaqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
      const ratingNum = parseFloat(form.rating);
      const tagsStr = typeof form.tags === 'string' ? form.tags : '';
      const screenshotsStr = typeof form.screenshots === 'string' ? form.screenshots : '';

      await updateGame(token, id, {
        title: form.title?.trim(),
        slug: form.slug,
        shortDescription: form.shortDescription,
        description: form.description,
        category: form.category,
        tags: tagsStr ? tagsStr.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        logo: form.logo,
        screenshots: screenshotsStr ? screenshotsStr.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        downloadUrl: form.downloadUrl,
        referralUrl: form.referralUrl,
        bonus: form.bonus,
        version: form.version || "1.0",
        size: form.size,
        rating: isNaN(ratingNum) ? 4.5 : Math.min(5, Math.max(1, ratingNum)),
        featured: form.featured,
        trending: form.trending,
        isNewGame: form.isNewGame,
        isComingSoon: form.isComingSoon,
        releaseDate: form.isComingSoon ? toUtcIsoString(form.releaseDate) : null,
        isActive: form.isActive !== false,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        howToDownload: form.howToDownload,
        faq: validFaqs,
        contentSections: contentSections as any,
        gameType: form.gameType as any,
        position: isNaN(parseInt(form.position)) ? 1000 : parseInt(form.position),
      });

      router.push("/admin/games");
    } catch (err: any) {
      setError(err.message || "Failed to update game");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-green-cta border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
        ✏️ Edit: {form.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input value={form.title || ""} onChange={(e) => updateField("title", e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Slug</label>
              <Input value={form.slug || ""} onChange={(e) => updateField("slug", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Display Position (Lower = shown first)</label>
              <Input type="number" value={form.position || ""} onChange={(e) => updateField("position", e.target.value)} id="game-position" placeholder="1000" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Short Description</label>
              <Input value={form.shortDescription || ""} onChange={(e) => updateField("shortDescription", e.target.value)} placeholder="A brief, unique description" />
              <p className="text-xs text-muted-foreground mt-1">Write a unique description — avoid generic text.</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Full Description (HTML)</label>
              <Textarea value={form.description || ""} onChange={(e) => updateField("description", e.target.value)} rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={form.category || "rummy"} onValueChange={(v) => updateField("category", v || "rummy")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tags (comma separated)</label>
                <Input value={form.tags || ""} onChange={(e) => updateField("tags", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media & Links */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Media & Links</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Logo URL</label>
                <Input value={form.logo || ""} onChange={(e) => updateField("logo", e.target.value)} />
              </div>
              <div className="w-1/3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")} disabled={uploadingImage} />
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Screenshots (comma separated URLs)</label>
                <Textarea value={form.screenshots || ""} onChange={(e) => updateField("screenshots", e.target.value)} rows={2} />
              </div>
              <div className="w-1/3 mb-2">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "screenshots")} disabled={uploadingImage} />
              </div>
            </div>
            {uploadingImage && <p className="text-sm text-blue-500">Uploading image to Cloudinary...</p>}
            <div>
              <label className="text-sm font-medium mb-1 block">Download URL</label>
              <Input value={form.downloadUrl || ""} onChange={(e) => updateField("downloadUrl", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Referral URL</label>
              <Input value={form.referralUrl || ""} onChange={(e) => updateField("referralUrl", e.target.value)} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Bonus</label>
                <Input value={form.bonus || ""} onChange={(e) => updateField("bonus", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Version</label>
                <Input value={form.version || ""} onChange={(e) => updateField("version", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Size</label>
                <Input value={form.size || ""} onChange={(e) => updateField("size", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <Input type="number" min="1" max="5" step="0.1" value={form.rating || "4.5"} onChange={(e) => updateField("rating", e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={form.isActive !== false} onChange={(e) => updateField("isActive", e.target.checked)} />
                <span className={form.isActive !== false ? "text-green-cta" : "text-red-500"}>
                  {form.isActive !== false ? "● Active (Live)" : "✕ Inactive (Hidden)"}
                </span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured || false} onChange={(e) => updateField("featured", e.target.checked)} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.trending || false} onChange={(e) => updateField("trending", e.target.checked)} />
                Trending
              </label>
              <label className="flex items-center gap-2 text-sm text-red-500 font-semibold">
                <input type="checkbox" checked={form.isNewGame || false} onChange={(e) => updateField("isNewGame", e.target.checked)} />
                New Game Tag
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-blue-500 font-semibold cursor-pointer">
                  <input type="checkbox" checked={form.isComingSoon || false} onChange={(e) => updateField("isComingSoon", e.target.checked)} />
                  Coming Soon
                </label>
                {form.isComingSoon && (
                  <div className="space-y-1">
                    <Input type="datetime-local" value={form.releaseDate || ""} onChange={(e) => updateField("releaseDate", e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader><CardTitle className="text-lg">SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">SEO Title</label>
              <Input value={form.seoTitle || ""} onChange={(e) => updateField("seoTitle", e.target.value)} placeholder="Auto-generated if empty" />
              <p className="text-xs text-muted-foreground mt-1">Tip: Game name + "APK Download". Under 60 chars.</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">SEO Description</label>
              <Textarea value={form.seoDescription || ""} onChange={(e) => updateField("seoDescription", e.target.value)} rows={2} placeholder="Auto-generated if empty" />
              <p className="text-xs text-muted-foreground mt-1">Tip: Unique description. Under 160 chars.</p>
            </div>
          </CardContent>
        </Card>

        {/* How To Download */}
        <Card>
          <CardHeader><CardTitle className="text-lg">📲 How To Download (HTML)</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={form.howToDownload || ""} onChange={(e) => updateField("howToDownload", e.target.value)} rows={4} />
          </CardContent>
        </Card>

        {/* Content Sections (SEO) */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">📝 Content Sections (SEO)</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  These sections boost SEO on the game page. Edit content or toggle visibility per section.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setContentSections(generateDefaultSections(form.title, form.bonus))}
                className="text-xs"
              >
                ⚡ Auto-Fill SEO Defaults
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {CONTENT_SECTIONS.map((section) => (
              <div key={section.key} className="space-y-2 p-4 border border-border/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <span>{section.icon}</span> {section.label}
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contentSections[section.key]?.visible ?? true}
                      onChange={(e) => updateSection(section.key, "visible", e.target.checked)}
                    />
                    <span className={contentSections[section.key]?.visible ? "text-green-cta font-semibold" : "text-muted-foreground"}>
                      {contentSections[section.key]?.visible ? "Visible" : "Hidden"}
                    </span>
                  </label>
                </div>
                <Textarea
                  value={contentSections[section.key]?.content || ""}
                  onChange={(e) => updateSection(section.key, "content", e.target.value)}
                  rows={4}
                  placeholder={section.hint}
                  className="text-xs"
                />
                <p className="text-[10px] text-muted-foreground">{section.hint}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQ - min 3, no max */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">❓ FAQ ({faqs.length})</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Minimum {MIN_FAQS} FAQs required. Add more anytime.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFaqs(generateDefaultFaqs(form.title, form.bonus))}
                  className="text-xs"
                >
                  ⚡ Auto-Fill Default FAQs
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                  + Add FAQ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2 p-3 border border-border/50 rounded-lg relative">
                {faqs.length > MIN_FAQS && (
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-500 transition-colors"
                    aria-label={`Remove FAQ ${index + 1}`}
                  >
                    ✕
                  </button>
                )}
                <Input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder={`Question ${index + 1}`}
                />
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                  rows={2}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" className="bg-green-cta hover:bg-green-cta-hover flex-1" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

