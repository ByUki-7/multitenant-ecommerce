import React from "react";

// Wordmark shown on the admin login screen, matching the storefront brand.
export const Logo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    }}
  >
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3rem",
        height: "3rem",
        borderRadius: "0.9rem",
        background: "var(--zantora-blue, #2f92ff)",
        color: "#fff",
        fontSize: "1.9rem",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      z
    </span>
    <span
      style={{
        fontSize: "2.6rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "var(--theme-elevation-1000)",
      }}
    >
      zantora
    </span>
  </div>
);

export default Logo;
