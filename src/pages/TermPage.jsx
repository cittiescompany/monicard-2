import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

      <div className="bg-card shadow-xl rounded-lg p-8 sm:p-12 w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-2">
            Terms of Use
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective Date: May 22, 2025
          </p>
        </header>

        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
          Welcome to Cities App. These Terms of Use ("Terms") govern your access to and use of our mobile app, website, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            1. Use of the Service
          </h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-foreground/80 leading-relaxed">
            <li>You must be at least 13 years old to use our Service.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to use the Service in compliance with all applicable laws and our Community Guidelines.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            2. User Content
          </h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-foreground/80 leading-relaxed">
            <li>You retain ownership of any content you post on the platform.</li>
            <li>By posting content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the Service.</li>
            <li>You must not post content that is offensive, illegal, or violates the rights of others.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            3. Prohibited Conduct
          </h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-foreground/80 leading-relaxed">
            <li>Harassment, abuse, or hate speech.</li>
            <li>Impersonation or misrepresentation.</li>
            <li>Uploading malicious software or code.</li>
            <li>Attempting to access other users’ data without permission.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            4. Termination
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            We may suspend or terminate your access to the Service at any time, without notice, for conduct that violates these Terms or is otherwise harmful to the community or our business.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            5. Disclaimers and Limitation of Liability
          </h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-foreground/80 leading-relaxed">
            <li>The Service is provided "as is" without warranties of any kind.</li>
            <li>We do not guarantee that the Service will always be secure or error-free.</li>
            <li>We are not liable for any indirect, incidental, or consequential damages.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            6. Changes to the Terms
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            We reserve the right to update these Terms at any time. We will notify you of any significant changes through the Service or by email.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            7. Governing Law
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            These Terms are governed by the laws of the Federal Republic of Nigeria.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary pt-4">
            8. Contact Information
          </h2>
          <div className="text-foreground/80 leading-relaxed space-y-1">
            <p>Cities Platforms and Innovation</p>
            <p>📍 Magodo, Ikeja</p>
            <p>📧 support@cittis.cc</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;