'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-100 py-12 text-center text-slate-400 text-sm font-medium bg-slate-50/50">
            <p>&copy; {new Date().getFullYear()} Resize AI (Developed by Subh Digital Media & Entertainment PVT. LTD.). All rights reserved.</p>
        </footer>
    );
}