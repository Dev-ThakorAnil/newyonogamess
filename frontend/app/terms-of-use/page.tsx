export const metadata = {
  title: "Terms of Use - NewYonoGamess",
  description: "Terms of Use for NewYonoGamess",
};

export default function TermsOfUsePage() {
  return (
    <div className="container-main py-8 md:py-14">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-xs border border-slate-200">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-slate-900">
          Terms of Use
        </h1>
        
        <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
          <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using NewYonoGamess (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;, https://newyonogamess.tech), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this service.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">2. Description of Service</h2>
          <p>
            NewYonoGamess provides users with access to an informational directory and direct APK download links for popular gaming applications. The Service is provided &ldquo;AS-IS&rdquo; without warranties of any kind.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">3. User Conduct</h2>
          <p>
            You agree to use our website only for lawful purposes. You are prohibited from violating or attempting to violate the security of the website, including unauthorized access to server or system resources.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">4. Intellectual Property</h2>
          <p>
            All directory content, reviews, rankings, and layouts are the property of NewYonoGamess. Third-party APK files, trademarks, and game assets belong exclusively to their respective developers and owners.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
          <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-lg mb-4">
            <h3 className="text-sm font-bold text-red-700 mb-1 uppercase tracking-wide">⚠️ Explicit Warning</h3>
            <p className="text-red-900/90 text-xs sm:text-sm font-medium leading-relaxed">
              Your use of the service is at your sole risk. NewYonoGamess, its owners, and operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, or any applications downloaded from this site.
            </p>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of NewYonoGamess constitutes acceptance of any revisions.
          </p>
        </div>
      </div>
    </div>
  );
}
