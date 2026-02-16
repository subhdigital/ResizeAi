'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
        document.body.style.overflow = 'unset';
    }, [pathname]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => {
            const newState = !prev;
            document.body.style.overflow = newState ? 'hidden' : 'unset';
            return newState;
        });
    };

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleLogout = () => {
        dispatch(logout());
        setProfileDropdownOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 font-sans ${scrolled
                ? 'py-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
                : 'py-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                }`}
        >
            <div className="w-full max-w-[1600px] mx-auto px-5 flex items-center justify-between relative">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group z-[1001]">
                    <span className="text-2xl font-black tracking-tight text-[#00d4ff]">
                        Resize AI
                    </span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-[#333] p-2 focus:outline-none z-[1001]"
                    onClick={toggleMobileMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Navigation Menu Container */}
                <div className={`
                    fixed left-0 w-full bg-white flex flex-col justify-start p-5 overflow-y-auto transform transition-all duration-300 ease-in-out lg:static lg:h-auto lg:flex-row lg:bg-transparent lg:p-0 lg:overflow-visible lg:transform-none lg:justify-end lg:items-center lg:flex-1 lg:ml-[40px]
                    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    ${scrolled ? 'top-[60px] h-[calc(100vh-60px)]' : 'top-[70px] h-[calc(100vh-70px)]'}
                `}>
                    <nav className="flex flex-col w-full lg:flex-row lg:items-center lg:justify-end lg:gap-[70px] lg:flex-1">
                        <ul className="flex flex-col w-full lg:flex-row lg:items-center lg:gap-[70px] lg:w-auto list-none m-0 p-0">
                            {/* Tools - Mega Menu */}
                            <li className={`group ${activeDropdown === 'tools' ? 'active' : ''} lg:hover:active`}>
                                <button
                                    onClick={() => toggleDropdown('tools')}
                                    className="w-full lg:w-auto flex items-center justify-between text-[18px] font-medium text-[#333] py-[10px] bg-transparent border-none cursor-pointer transition-colors hover:text-[#6c63ff] group-hover:text-[#6c63ff]"
                                >
                                    <span className="relative inline-block py-[10px] px-0 lg:px-[15px]">
                                        Tools
                                        {/* Animated Borders (Desktop Only) */}
                                        <span className="hidden lg:block absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute top-0 right-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-100 group-hover:h-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 right-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 delay-200 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 left-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-300 group-hover:h-full"></span>
                                    </span>
                                    <svg className={`hidden lg:block w-4 h-4 ml-1 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    {/* Mobile Arrow */}
                                    <svg className={`lg:hidden w-5 h-5 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {/* Mega Menu Dropdown */}
                                <div className={`
                                    lg:absolute lg:top-full lg:left-0 lg:w-full lg:bg-white lg:border-t lg:border-[#eee] lg:shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:opacity-0 lg:invisible lg:translate-y-[10px] lg:transition-all lg:duration-300 lg:z-[1100]
                                    ${(mobileMenuOpen && activeDropdown === 'tools') ? 'block pl-5 border-l-2 border-[#eee] mt-2 mb-4' : 'hidden'}
                                    lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:block
                                `}>
                                    <div className="w-full max-w-[1600px] mx-auto lg:p-[30px_20px]">
                                        <div className="flex flex-col lg:flex-row flex-wrap gap-[30px]">
                                            {/* Column 1 */}
                                            <div className="flex-1 min-w-[200px]">
                                                <Link href="/compress" className="flex justify-between items-center no-underline mb-[10px] group/title">
                                                    <h4 className="text-[18px] lg:text-[20px] font-semibold text-black m-0 group-hover/title:text-[#6c63ff] font-[Poppins]">Compression</h4>
                                                    <span className="hidden lg:block text-[#6c63ff] opacity-0 -translate-x-[5px] transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0">→</span>
                                                </Link>
                                                <div className="flex flex-col gap-[8px] mb-[20px]">
                                                    <Link href="/compress" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Compress Images</Link>
                                                    <Link href="/batch" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Batch Processing</Link>
                                                </div>
                                            </div>

                                            {/* Column 2 */}
                                            <div className="flex-1 min-w-[200px]">
                                                <Link href="/resize" className="flex justify-between items-center no-underline mb-[10px] group/title">
                                                    <h4 className="text-[18px] lg:text-[20px] font-semibold text-black m-0 group-hover/title:text-[#6c63ff] font-[Poppins]">Dimensions</h4>
                                                    <span className="hidden lg:block text-[#6c63ff] opacity-0 -translate-x-[5px] transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0">→</span>
                                                </Link>
                                                <div className="flex flex-col gap-[8px] mb-[20px]">
                                                    <Link href="/resize" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Resize Image</Link>
                                                    <Link href="/crop" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Crop Image</Link>
                                                    <Link href="/rotate" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Rotate Image</Link>
                                                </div>
                                            </div>

                                            {/* Column 3 */}
                                            <div className="flex-1 min-w-[200px]">
                                                <Link href="/convert" className="flex justify-between items-center no-underline mb-[10px] group/title">
                                                    <h4 className="text-[18px] lg:text-[20px] font-semibold text-black m-0 group-hover/title:text-[#6c63ff] font-[Poppins]">Conversion</h4>
                                                    <span className="hidden lg:block text-[#6c63ff] opacity-0 -translate-x-[5px] transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0">→</span>
                                                </Link>
                                                <div className="flex flex-col gap-[8px] mb-[20px]">
                                                    <Link href="/convert" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Convert to JPG/PNG</Link>
                                                    <Link href="/merge" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Merge Images</Link>
                                                </div>
                                            </div>

                                            {/* Column 4 */}
                                            <div className="flex-1 min-w-[200px]">
                                                <Link href="/remove-background" className="flex justify-between items-center no-underline mb-[10px] group/title">
                                                    <h4 className="text-[18px] lg:text-[20px] font-semibold text-black m-0 group-hover/title:text-[#6c63ff] font-[Poppins]">Editing</h4>
                                                    <span className="hidden lg:block text-[#6c63ff] opacity-0 -translate-x-[5px] transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0">→</span>
                                                </Link>
                                                <div className="flex flex-col gap-[8px] mb-[20px]">
                                                    <Link href="/remove-background" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Remove Background</Link>
                                                    <Link href="/watermark" className="text-[16px] lg:text-[18px] font-medium text-[#333] py-[5px] flex items-center transition-all hover:text-[#22bbf2] hover:pl-[5px]">Add Watermark</Link>
                                                </div>
                                            </div>

                                            {/* Promo Column - Desktop Only */}
                                            <div className="hidden lg:flex flex-col flex-1 min-w-[250px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-[30px] rounded-xl justify-center items-start">
                                                <h3 className="text-[20px] leading-[1.4] mb-[20px] text-[#333]">
                                                    Pro Features <span className="text-[#6c63ff] block">Unlock Everything</span>
                                                </h3>
                                                <Link href="/pricing" className="inline-flex items-center gap-[10px] px-[20px] py-[10px] bg-[#00d4ff] text-white rounded-[5px] font-semibold transition-colors hover:bg-[#6c63ff]">
                                                    Get Started
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Standard Link - Pricing */}
                            <li className="group">
                                <Link href="/pricing" className="text-[18px] font-medium text-[#333] py-[10px] w-full lg:w-auto flex items-center justify-between transition-colors hover:text-[#6c63ff] group-hover:text-[#6c63ff]">
                                    <span className="relative inline-block py-[10px] px-0 lg:px-[15px]">
                                        Pricing
                                        <span className="hidden lg:block absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute top-0 right-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-100 group-hover:h-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 right-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 delay-200 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 left-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-300 group-hover:h-full"></span>
                                    </span>
                                </Link>
                            </li>

                            {/* Standard Link - About */}
                            {/* <li className="group">
                                <Link href="/about" className="text-[18px] font-medium text-[#333] py-[10px] w-full lg:w-auto flex items-center justify-between transition-colors hover:text-[#6c63ff] group-hover:text-[#6c63ff]">
                                    <span className="relative inline-block py-[10px] px-0 lg:px-[15px]">
                                        About
                                        <span className="hidden lg:block absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute top-0 right-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-100 group-hover:h-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 right-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 delay-200 group-hover:w-full"></span>
                                        <span className="hidden lg:block absolute bottom-0 left-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-300 group-hover:h-full"></span>
                                    </span>
                                </Link>
                            </li> */}

                            {/* Conditional Rendering: Login / Profile */}
                            {isAuthenticated && user ? (
                                <li className="group relative">
                                    <button
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                        className="text-[18px] font-medium text-[#333] py-[10px] w-full lg:w-auto flex items-center justify-between transition-colors hover:text-[#6c63ff] focus:outline-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-white font-bold text-sm">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <span className="lg:hidden">Profile</span>
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {profileDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#eee] shadow-lg rounded-lg overflow-hidden py-1 z-[1200]">
                                            <div className="px-4 py-2 border-b border-[#eee]">
                                                <p className="text-sm font-semibold text-[#333] truncate">{user.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li className="group">
                                    <Link href="/login" className="text-[18px] font-medium text-[#333] py-[10px] w-full lg:w-auto flex items-center justify-between transition-colors hover:text-[#6c63ff] group-hover:text-[#6c63ff]">
                                        <span className="relative inline-block py-[10px] px-0 lg:px-[15px]">
                                            Login
                                            <span className="hidden lg:block absolute top-0 left-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 group-hover:w-full"></span>
                                            <span className="hidden lg:block absolute top-0 right-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-100 group-hover:h-full"></span>
                                            <span className="hidden lg:block absolute bottom-0 right-0 w-0 h-[2px] bg-[#00d4ff] transition-all duration-300 delay-200 group-hover:w-full"></span>
                                            <span className="hidden lg:block absolute bottom-0 left-0 w-[2px] h-0 bg-[#00d4ff] transition-all duration-300 delay-300 group-hover:h-full"></span>
                                        </span>
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* CTA Button - Only show if NOT authenticated */}
                        {!isAuthenticated && (
                            <div className="mt-[30px] lg:mt-0 lg:ml-[20px] w-full lg:w-auto">
                                <Link href="/register" className="group relative inline-flex items-center justify-center gap-[10px] bg-[#00d4ff] text-white py-[10px] px-[24px] rounded-[50px] font-semibold no-underline overflow-hidden transition-all duration-500 ease-in-out hover:pr-[35px] w-full lg:w-auto">
                                    <span className="relative z-10">Get Started</span>
                                    <div className="relative flex items-center w-[20px] h-[20px] overflow-hidden">
                                        <svg className="absolute w-5 h-5 fill-white transition-transform duration-500 ease-in-out transform translate-x-0 group-hover:translate-x-[30px]" viewBox="0 0 24 24"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" /></svg>
                                        <svg className="absolute w-5 h-5 fill-white transition-transform duration-500 ease-in-out transform -translate-x-[30px] group-hover:translate-x-0" viewBox="0 0 24 24"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" /></svg>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
