export const metadata = {
  title: "Privacy Policy - NewYonoGamess",
  description: "Privacy Policy for NewYonoGamess",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-main py-8 md:py-14">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-xs border border-slate-200">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-slate-900">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
          <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">1. Information We Collect</h2>
          <p>
            NewYonoGamess (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. We collect minimal information to provide you with the best experience. The information we may collect includes your IP address, browser type, device information, and anonymous usage data.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">2. How We Use Your Information</h2>
          <p>
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
            <li>To provide and maintain our Service.</li>
            <li>To improve and personalize your experience on our website.</li>
            <li>To monitor the usage of our Service and analyze trends.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">4. Third-Party Links &amp; Applications</h2>
          <p>
            Our Service may contain links to third-party web sites or services, and provides downloads for third-party applications that are not owned or controlled by NewYonoGamess. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
          <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-lg mt-4 mb-4">
            <h3 className="text-sm font-bold text-red-700 mb-1 uppercase tracking-wide">⚠️ Explicit Warning</h3>
            <p className="text-red-900/90 text-xs sm:text-sm font-medium leading-relaxed">
              We do not verify the data collection practices of the third-party applications available for download on this platform. You expressly understand that any application you download is used strictly at your own risk. NewYonoGamess is not responsible for any data breaches, privacy violations, or financial losses caused by these third-party applications.
            </p>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">5. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-2">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at contact@newyonogamess.tech.
          </p>
        </div>
      </div>
    </div>
  );
}
