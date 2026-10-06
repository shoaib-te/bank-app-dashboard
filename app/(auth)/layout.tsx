import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BankApp | Secure access",
  description: "Sign in or create your BankApp account.",
};

function DashboardPreview() {
  return (
    <div className="auth-preview-frame">
      <div className="auth-preview-sidebar">
        <div className="auth-preview-brand">
          <span className="brand-mark">◆</span> Horizon
        </div>
        <div className="auth-preview-search">⌕ &nbsp; Search</div>
        {["⌂  Home", "◉  My Banks", "▤  Transaction History", "↗  Payment Transfer", "⊞  Connect Bank"].map(
          (item, index) => (
            <div
              className={`auth-preview-nav ${index === 0 ? "is-active" : ""}`}
              key={item}
            >
              {item}
            </div>
          ),
        )}
      </div>
      <div className="auth-preview-content">
        <h2>Welcome, <span>Adrian</span></h2>
        <p>Access &amp; manage your account and transactions efficiently.</p>
        <div className="auth-preview-balance">
          <div className="auth-preview-chart" />
          <div>
            <b>2 Bank Accounts</b>
            <small>Total Current Balance</small>
            <strong>$2,698.12</strong>
          </div>
        </div>
        <h3>Recent transactions</h3>
        <div className="auth-preview-tabs">Chase Bank　　Bank of America　　First Platypus Bank</div>
        <div className="auth-preview-bank">
          <span className="auth-preview-bank-icon">CB</span>
          <div><b>Chase Bank</b><strong>$2,588.12</strong></div>
          <small>savings</small>
        </div>
        <div className="auth-preview-table">
          <div className="auth-preview-table-head"><span>Transaction</span><span>Amount</span><span>Status</span><span>Date</span></div>
          {[
            ["Spotify", "- $15.00", "Processing", "Wed 1:00pm"],
            ["Alexa Doe", "+ $88.00", "Success", "Wed 2:45am"],
            ["Figma", "- $18.99", "Processing", "Tue 6:10pm"],
            ["Fresh & FV", "- $88.00", "Success", "Tue 12:15pm"],
            ["Sam Sukel", "- $40.20", "Declined", "Tue 5:40am"],
          ].map(([name, amount, status, date]) => (
            <div className="auth-preview-row" key={name}>
              <span><i />{name}</span><span>{amount}</span><span>{status}</span><span>{date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-panel">{children}</section>
      <aside className="auth-showcase" aria-label="BankApp dashboard preview">
        <div className="auth-rays" />
        <DashboardPreview />
      </aside>
    </main>
  );
}
