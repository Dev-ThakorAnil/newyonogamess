export const metadata = {
  title: "Disclaimer - NewYonoGamess",
  description: "Disclaimer for NewYonoGamess",
};

export default function DisclaimerPage() {
  return (
    <div className="container-main py-8 md:py-14">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-xs border border-slate-200">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-slate-900">
          Disclaimer
        </h1>
        
        <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
          <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-lg my-6">
            <h2 className="text-base font-bold text-red-700 mb-1.5 uppercase tracking-wide">⚠️ Explicit Warning &amp; Limitation of Liability</h2>
            <p className="text-red-900/90 text-xs sm:text-sm font-medium leading-relaxed">
              All applications featured on this platform are downloaded and used strictly at your own risk. NewYonoGamess, its owners, and operators are not responsible or liable for any financial losses, data breaches, device damages, legal repercussions, or any other negative consequences that may arise from downloading, installing, or using third-party applications. By proceeding to use this site or download any application, you fully acknowledge and accept these terms.
            </p>
          </div>
          
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">General Information</h2>
          <p>
            The information provided by NewYonoGamess (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) on our website (https://newyonogamess.tech) is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Financial &amp; Gaming Risks</h2>
          <p>
            Our website may contain links to or feature applications related to games of skill, fantasy sports, or real money gaming. You acknowledge and agree that participation in such activities involves financial risk. We do not promote, encourage, or endorse gambling. Users are advised to play responsibly and at their own risk. We shall not be held liable for any financial losses incurred through the use of third-party applications downloaded from our site.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Age Restrictions and Legal Compliance</h2>
          <p>
            Users must be of legal age (18 years or older) in their respective jurisdictions to download and use real money gaming applications. It is the user&apos;s sole responsibility to ensure that their participation is compliant with local laws and regulations. Certain games may be restricted in specific regions (e.g., Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, Sikkim in India).
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Third-Party Applications</h2>
          <p>
            NewYonoGamess acts solely as a directory and download portal. We are not the developers or owners of the APKs and applications provided on this website. Any issues, bugs, or financial disputes related to these applications should be directed to their respective developers. We do not guarantee the security or safety of third-party APK files, although we strive to provide safe links.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">Contact</h2>
          <p>
            If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at contact@newyonogamess.tech.
          </p>
        </div>
      </div>
    </div>
  );
}
