import React, { ReactNode } from "react";
import Head from "next/head";
import { MapPin } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Bizabuja" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find businesses in Abuja, Nigeria" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header with Logo */}
        <header>
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <MapPin size={28} className="mr-2 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">Bizabuja</h1>
            </div>
          </div>
        </header>

        {/* Hero Section*/}
        <div>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Search for a nearby Clinic
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find nearby businesses by name, landmark, or category. Whether you
              are looking for a salon, restaurant, or hospital, our smart search
              will show you who is closest.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <div>{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <MapPin size={20} className="mr-2 text-blue-300" />
                <span className="font-semibold">Bizabuja</span>
              </div>
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Abuja Businesses List.
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
