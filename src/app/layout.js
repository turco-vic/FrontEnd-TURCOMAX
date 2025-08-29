import "./globals.css";

export const metadata = {
  title: "TURCOMAX",
  description: "",
  icons: {
      icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
      <html>
          <body>{children}</body>
      </html>
  );
}
