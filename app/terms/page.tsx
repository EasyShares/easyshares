import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read and agree to our terms and conditions.",
};

const TermsPage: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            EasyShares Terms and Conditions
          </h1>
          <p className="mb-6">Terms and Conditions</p>
          <p className="mb-6">
            These Terms and Conditions (&quot;Terms&quot;, &quot;Terms and
            Conditions&quot;) govern your use of our website (the
            &quot;Service&quot;) operated by EasyShares (&quot;us&quot;,
            &quot;we&quot;, or &quot;our&quot;).
          </p>
          <p className="mb-6">
            Please read these Terms and Conditions carefully before using our
            Service.
          </p>
          <p className="mb-6">
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service.
          </p>
          <p className="mb-6">
            By accessing or using the Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, then you may not
            access the Service.
          </p>
          <h2 className="text-xl font-semibold mb-4">Automated Transactions</h2>
          <p className="mb-6">
            Every transaction on our platform, whether buying or selling, is
            fully automated. Processing of orders begins immediately upon
            submission, and matching starts immediately using a &quot;First
            come, first served&quot; policy, putting orders in a list. The
            waiting time depends on when your turn comes, and you&apos;re
            matched to a buyer for your shares, ensuring fair and efficient
            transactions.
          </p>
          <h2 className="text-xl font-semibold mb-4">Mpesa Integration</h2>
          <p className="mb-6">
            All deposits and withdrawals on our platform are facilitated through
            the Mpesa money provider. Users can seamlessly deposit funds into
            their accounts and withdraw their earnings using Mpesa&apos;s secure
            and reliable payment system.
          </p>
          <h3 className="text-lg font-semibold mb-2">Deposit</h3>
          <p className="mb-6">
            Maximum Deposit: The highest amount of funds that a user can deposit
            into their EasyShares account in a single transaction is capped at
            100,000 KES. This limit ensures that transactions remain manageable
            and secure.
          </p>
          <p className="mb-6">
            Minimum Deposit: EasyShares requires a minimum deposit of  KES 375
            per transaction. This ensures that users can start investing with a
            reasonable amount and also helps streamline processing for smaller
            transactions.
          </p>
          <h3 className="text-lg font-semibold mb-2">Withdrawal</h3>
          <p className="mb-6">
            Maximum Withdrawal: Users can withdraw up to 100,000 KES from their
            EasyShares account in a single transaction. This maximum limit helps
            prevent large withdrawals that could potentially disrupt the
            platform&apos;s liquidity.
          </p>
          <p className="mb-6">
            Minimum Withdrawal: The minimum withdrawal amount per transaction is
            set at 100 KES. This ensures that users can withdraw smaller amounts
            as needed, without imposing excessive restrictions.
          </p>
          <h2 className="text-xl font-semibold mb-4">Share Transactions</h2>
          <p className="mb-6">
            i) Maximum Shares Bought: The maximum number of shares that a user
            can purchase in a single transaction is limited to 7,500 KES. This
            helps prevent excessive purchases that could affect market
            stability.
          </p>
          <p className="mb-6">
            Maximum Shares Sold: Similarly, users are restricted to selling a
            maximum of 5,000 KES worth of shares in a single transaction. This
            limit helps prevent large sell-offs that could impact market prices.
          </p>
          <p className="mb-6">
            ii) Minimum Shares Sold: To maintain market activity and prevent
            negligible transactions, EasyShares imposes a minimum sell limit of
            500 KES per transaction. This ensures that each sell order
            contributes meaningfully to market liquidity.
          </p>
          <p className="mb-6">
            Minimum Shares Bought: Users must purchase a minimum of 375 KES
            worth of shares per transaction. This minimum ensures that buying
            activity remains substantial enough to support market dynamics.
          </p>
          <p className="mb-6">
            iii) Unlimited Trading: While there are transaction limits in place,
            users have the freedom to engage in buying and selling shares as
            frequently as they wish. The limits apply on a per-transaction
            basis, allowing users flexibility in their exchange activities.
          </p>
          <h2 className="text-xl font-semibold mb-4">Deductions on Profit</h2>
          <p className="mb-6">
            Please note that a 5% deduction on profit is applied to every sell
            transaction. This deduction is automatically calculated and deducted
            from the total profit earned by the user upon completion of the
            transaction. Addtionally if one joined the plartform using a
            refferal link, his/her upline will also earn 5% from all their sell
            profits per transaction. This means that a user with an upline will
            be deducted 10% profit on all sell transactions.
          </p>
          <h2 className="text-xl font-semibold mb-4">Withdrawal Fees</h2>
          <p className="mb-6">
            Withdrawal fees are in accordance with the fees provided by Mpesa
            for money transfers to other Mpesa users. These fees are determined
            by Mpesa and are applied to withdrawals made from our platform to
            users&apos; Mpesa accounts.
          </p>
          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-6">
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of EasyShares and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both Kenya and foreign countries. Our trademarks and
            trade dress may not be used in connection with any product or
            service without the prior written consent of EasyShares.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Links To Other Web Sites
          </h2>
          <p className="mb-6">
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by EasyShares.
          </p>
          <p className="mb-6">
            EasyShares has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third-party web
            sites or services. You further acknowledge and agree that EasyShares
            shall not be responsible or liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection
            with use of or reliance on any such content, goods, or services
            available on or through any such web sites or services.
          </p>
          <p className="mb-6">
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>
          <h2 className="text-xl font-semibold mb-4">Termination</h2>
          <p className="mb-6">
            We may terminate or suspend access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
          <p className="mb-6">
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity,
            and limitations of liability.
          </p>
          <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
          <p className="mb-6">
            These Terms shall be governed and construed in accordance with the
            laws of Kenya, without regard to its conflict of law provisions.
          </p>
          <p className="mb-6">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </p>
          <h2 className="text-xl font-semibold mb-4">Changes</h2>
          <p className="mb-6">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days&apos; notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>
          <p className="mb-6">
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </div>
      </div>{" "}
      <Footer></Footer>
    </>
  );
};

export default TermsPage;
