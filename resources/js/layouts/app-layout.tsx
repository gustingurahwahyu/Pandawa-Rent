import React from 'react';
import Navbar from '@/components/nav-main'
import Footer from '@/components/footer-main';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <main className="pt-4">{children}</main>
      <Footer />
    </div>
  )
}
