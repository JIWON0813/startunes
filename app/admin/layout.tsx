import Head from "next/head";
import { FaPaperPlane, FaSearch } from "react-icons/fa";
import Header from "../components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <main>
      {children}  
      </main>
      </body>
    </html>
  );
}
