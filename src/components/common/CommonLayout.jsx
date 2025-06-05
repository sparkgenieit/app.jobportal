
"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function CommonLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex">
       {/** If user logged in <Sidebar /> */} 
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
