import Head from "next/head";
import { FaPaperPlane, FaSearch } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import SongsPage from "../songs/page";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
       <Sidebar />
       <main className="flex-1 p-8">
      <SongsPage  />
       </main>
    </div>
  );
}
