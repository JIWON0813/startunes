import Head from "next/head";
import { FaPaperPlane, FaSearch } from "react-icons/fa";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>  
      {children}  
      </body>
    </html>
  );
}
