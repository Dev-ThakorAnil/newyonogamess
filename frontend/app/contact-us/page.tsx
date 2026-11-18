import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - NewYonoGamess",
  description: "Get in touch with NewYonoGamess for any inquiries or support.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <div className="container-main py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Contact Us
      </h1>
      <div className="bg-card border border-border rounded-xl p-8 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          We value your feedback and are here to help! Whether you have a question about downloading an app,
          need assistance with a broken link, or want to report an issue, please reach out to us.
        </p>
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Website:</strong>{" "}
            <a href="https://newyonogamess.tech" className="text-primary hover:underline">
              https://newyonogamess.tech
            </a>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Email Support:</strong>{" "}
            <a href="mailto:contact@newyonogamess.tech" className="text-primary hover:underline">
              contact@newyonogamess.tech
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
