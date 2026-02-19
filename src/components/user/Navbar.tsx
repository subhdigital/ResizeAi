'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logoutUser } from '@/store/slices/authSlice';
import { fetchCredits, selectCredits } from '@/store/slices/creditsSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [leftMenuOpen, setLeftMenuOpen] = useState(false);
    const [rightMenuOpen, setRightMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const credits = useSelector(selectCredits);

    useEffect(() => {
        dispatch(fetchCredits());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menus on route change
    useEffect(() => {
        setLeftMenuOpen(false);
        setRightMenuOpen(false);
        setProfileDropdownOpen(false);
        document.body.style.overflow = 'unset';
    }, [pathname]);

    const toggleLeftMenu = () => {
        setLeftMenuOpen((prev) => {
            const newState = !prev;
            if (newState) setRightMenuOpen(false);
            document.body.style.overflow = newState ? 'hidden' : 'unset';
            return newState;
        });
    };

    const toggleRightMenu = () => {
        setRightMenuOpen((prev) => {
            const newState = !prev;
            if (newState) setLeftMenuOpen(false);
            document.body.style.overflow = newState ? 'hidden' : 'unset';
            return newState;
        });
    };

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            setProfileDropdownOpen(false);
            setRightMenuOpen(false);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
            window.location.href = '/';
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 font-sans ${scrolled
                ? 'py-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
                : 'py-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                }`}
        >
            <div className="w-full max-w-[1600px] mx-auto px-5 flex items-center justify-between relative h-full">
                {/* Mobile Left Toggle - TOOLS */}
                <button
                    className="lg:hidden text-[#333] p-2 focus:outline-none z-[1001]"
                    onClick={toggleLeftMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {leftMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group z-[1001]">
                    <span className="text-2xl font-black tracking-tight text-[#00d4ff]">
                        Resizely
                    </span>
                </Link>

                {/* Desktop Menu - Hidden on Mobile */}
                <div className="hidden lg:flex items-center gap-[40px] flex-1 ml-[40px]">
                    <nav className="flex items-center justify-end gap-[70px] flex-1">
                        <ul className="flex items-center gap-[70px] list-none m-0 p-0">
                            {/* Tools - Mega Menu */}
                            <li className="group relative">
                                <button
                                    onMouseEnter={() => setActiveDropdown('tools')}
                                    className="flex items-center text-[18px] font-medium text-[#333] py-[10px] bg-transparent border-none cursor-pointer transition-colors hover:text-[#6c63ff]"
                                >
                                    <span className="relative inline-block py-[10px] px-[15px]">
                                        Tools
                                        <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"></span>
                                        <span className="absolute top-0 right-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-100 group-hover:h-full"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 delay-200 group-hover:w-full"></span>
                                        <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-300 group-hover:h-full"></span>
                                    </span>
                                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Mega Menu Dropdown */}
                                <div className="absolute top-full left-0 w-[800px] bg-white border border-[#eee] shadow-[0_10px_30px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-[10px] transition-all duration-300 z-[1100] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 p-[30px]">
                                    <div className="flex flex-row flex-wrap gap-[30px]">
                                        {/* Column 1 */}
                                        <div className="flex-1 min-w-[150px]">
                                            <h4 className="text-[18px] font-semibold text-black mb-4 font-[Poppins]">Compression</h4>
                                            <div className="flex flex-col gap-[8px]">
                                                <Link href="/compress" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Compress Images</Link>
                                                <Link href="/batch" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Batch Processing</Link>
                                            </div>
                                        </div>
                                        {/* Column 2 */}
                                        <div className="flex-1 min-w-[150px]">
                                            <h4 className="text-[18px] font-semibold text-black mb-4 font-[Poppins]">Dimensions</h4>
                                            <div className="flex flex-col gap-[8px]">
                                                <Link href="/resize" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Resize Image</Link>
                                                <Link href="/crop" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Crop Image</Link>
                                                <Link href="/rotate" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Rotate Image</Link>
                                            </div>
                                        </div>
                                        {/* Column 3 */}
                                        <div className="flex-1 min-w-[150px]">
                                            <h4 className="text-[18px] font-semibold text-black mb-4 font-[Poppins]">Conversion</h4>
                                            <div className="flex flex-col gap-[8px]">
                                                <Link href="/convert" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Convert JPG/PNG</Link>
                                                <Link href="/merge" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Merge Images</Link>
                                            </div>
                                        </div>
                                        {/* Column 4 */}
                                        <div className="flex-1 min-w-[150px]">
                                            <h4 className="text-[18px] font-semibold text-black mb-4 font-[Poppins]">Editing</h4>
                                            <div className="flex flex-col gap-[8px]">
                                                <Link href="/remove-background" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Remove BG</Link>
                                                <Link href="/watermark" className="text-[16px] font-medium text-[#333] py-[5px] transition-all hover:text-[#00d4ff] hover:pl-[5px]">Watermark</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="group">
                                <Link href="/pricing" className="text-[18px] font-medium text-[#333] transition-colors hover:text-[#6c63ff]">
                                    <span className="relative inline-block py-[10px] px-[15px]">Pricing</span>
                                </Link>
                            </li>
                        </ul>

                        <div className="flex items-center gap-[20px]">
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setProfileDropdownOpen(true)}
                                        className="flex items-center gap-2 group"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-[#00d4ff] flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    {profileDropdownOpen && (
                                        <div
                                            onMouseLeave={() => setProfileDropdownOpen(false)}
                                            className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#eee] shadow-xl rounded-2xl overflow-hidden py-2 z-[1200]"
                                        >
                                            <div className="px-5 py-3 border-b border-[#f5f5f5]">
                                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                            {user.role === 'admin' && (
                                                <Link href="/admin" className="block px-5 py-3 text-sm text-blue-600 hover:bg-slate-50 font-bold transition-all">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-all">
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-[18px] font-medium text-[#333] hover:text-[#00d4ff] transition-colors">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-[#00d4ff] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Mobile Right Toggle - AUTH */}
                <button
                    className="lg:hidden text-[#333] p-2 focus:outline-none z-[1001]"
                    onClick={toggleRightMenu}
                >
                    {isAuthenticated && user ? (
                        <div className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-white font-bold text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {rightMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            )}
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Left Sidebar - TOOLS */}
            <div className={`
                fixed inset-y-0 left-0 w-[80%] max-w-[300px] bg-white z-[1000] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                ${leftMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full pt-20 px-6 overflow-y-auto">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Tools & Features</h3>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-black text-slate-900 mb-2 px-2">Compression</p>
                            <div className="flex flex-col">
                                <Link href="/compress" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Compress Images</Link>
                                <Link href="/batch" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Batch Processing</Link>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-black text-slate-900 mb-2 px-2">Dimensions</p>
                            <div className="flex flex-col">
                                <Link href="/resize" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Resize Image</Link>
                                <Link href="/crop" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Crop Image</Link>
                                <Link href="/rotate" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Rotate Image</Link>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-black text-slate-900 mb-2 px-2">Conversion</p>
                            <div className="flex flex-col">
                                <Link href="/convert" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Convert JPG/PNG</Link>
                                <Link href="/merge" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Merge Images</Link>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-black text-slate-900 mb-2 px-2">AI Editing</p>
                            <div className="flex flex-col">
                                <Link href="/remove-background" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Remove Background</Link>
                                <Link href="/watermark" className="p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">Add Watermark</Link>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <Link href="/pricing" className="p-3 block text-sm font-black text-slate-900 hover:bg-slate-50 rounded-xl transition-all">Pricing Plans</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Right Sidebar - AUTH */}
            <div className={`
                fixed inset-y-0 right-0 w-[80%] max-w-[300px] bg-white z-[1000] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                ${rightMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex flex-col h-full pt-20 px-8 items-center">
                    {isAuthenticated && user ? (
                        <>
                            <div className="w-20 h-20 rounded-full bg-[#00d4ff] flex items-center justify-center text-white font-black text-3xl mb-4 shadow-xl">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-xl font-black text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-500 mb-10">{user.email}</p>

                            <div className="w-full space-y-3">
                                <Link href="/dashboard" className="block w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-bold hover:bg-slate-100 text-center transition-all">
                                    Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="block w-full py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-100 text-center transition-all">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="block w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all text-center"
                                >
                                    Log Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col gap-4 mt-10">
                            <h3 className="text-xl font-black text-slate-900 mb-6 text-center font-[Poppins]">Account Access</h3>
                            <Link href="/login" className="w-full py-4 bg-slate-50 text-slate-800 rounded-full font-bold hover:bg-slate-100 text-center transition-all">
                                Login
                            </Link>
                            <Link href="/register" className="w-full py-4 bg-[#00d4ff] text-white rounded-full font-black shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-center transition-all">
                                Get Started Free
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for mobile menus */}
            {(leftMenuOpen || rightMenuOpen) && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden"
                    onClick={() => { setLeftMenuOpen(false); setRightMenuOpen(false); document.body.style.overflow = 'unset'; }}
                />
            )}
        </header>
    );
}
