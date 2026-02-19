'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/user/Navbar';

interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  category: 'optimize' | 'create' | 'edit' | 'convert' | 'security';
}

const tools: Tool[] = [
  {
    title: 'Compress IMAGE',
    description: 'Compress JPG, PNG, SVG, and GIF with the best quality and compression.',
    icon: '🗜️',
    href: '/compress',
    color: 'bg-blue-500',
    category: 'optimize',
  },
  {
    title: 'Resize IMAGE',
    description: 'Define your dimensions, by pixels or percentage, and resize your JPG, PNG, SVG and GIF images.',
    icon: '📏',
    href: '/resize',
    color: 'bg-indigo-500',
    category: 'edit',
  },
  {
    title: 'Crop IMAGE',
    description: 'Crop JPG, PNG, or GIF with ease; choose pixels to specify your rectangle or use our visual editor.',
    icon: '✂️',
    href: '/crop',
    color: 'bg-purple-500',
    category: 'edit',
  },
  {
    title: 'Convert format',
    description: 'Convert JPG, PNG, WebP, AVIF and GIF images in bulk with ease.',
    icon: '🔄',
    href: '/convert',
    color: 'bg-pink-500',
    category: 'convert',
  },
  {
    title: 'Rotate IMAGE',
    description: 'Rotate your photos and images in bulk. Rotate only horizontal or vertical images at the same time!',
    icon: '🔃',
    href: '/rotate',
    color: 'bg-orange-500',
    category: 'edit',
  },
  {
    title: 'Merge IMAGE',
    description: 'Combine multiple images into one horizontally or vertically.',
    icon: '🧩',
    href: '/merge',
    color: 'bg-green-500',
    category: 'create',
  },
  {
    title: 'Add Watermark',
    description: 'Stamp an image or text over your images in seconds. Choose typography, transparency and position.',
    icon: '🏷️',
    href: '/watermark',
    color: 'bg-red-500',
    category: 'security',
  },
  {
    title: 'Batch IMAGE',
    description: 'Compress and optimize multiple images at once and download them in a single ZIP file.',
    icon: '📦',
    href: '/batch',
    color: 'bg-slate-700',
    category: 'optimize',
  },
];

export default function Home() {
  const [filter, setFilter] = useState('all');

  const filteredTools = filter === 'all'
    ? tools
    : tools.filter(tool => tool.category === filter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'optimize', label: 'Optimize' },
    { id: 'create', label: 'Create' },
    { id: 'edit', label: 'Edit' },
    { id: 'convert', label: 'Convert' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">


      <section style={{ backgroundImage: "url(/images/background.svg)" }}>
        <div className="w-full px-5 max-w-[1600px] mx-auto py-20 text-center mt-6" >
          <div className="mb-12 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-medium  mb-8 tracking-tighter leading-[1.1] text-[#333]">
              Every tool you need to <span className="relative inline-block text-[#00d4ff]">
                EDIT IMAGES
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#00d4ff] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Resizely is your 100% FREE online image editor.
              Compress, resize, crop, and convert images with ease.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${filter === f.id
                    ? 'bg-[#333] text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-white p-8 rounded-3xl border border-slate-300 hover:border-[#00d4ff] hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left h-full"
              >
                <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform duration-300 text-white`}>
                  {tool.icon}
                </div>
                <h3 className="text-[24px] font-semibold text-[#33333b] mb-3 group-hover:text-[#00d4ff] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[#33333b] font-medium text-[13px] leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>




      </section>

      <section className="mt-32 mb-16 px-5 bg-gray-50 py-20">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium text-[#333] mb-16 text-center tracking-tight">Explore Our More Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Document Mode */}
            <Link href="https://pdfyai.com" target='_blank' className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="h-56 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-110 transition-transform duration-500 opacity-80">📄</div>
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#333] mb-3 group-hover:text-[#00d4ff] transition-colors">
                  Switch to document mode
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 flex-grow">
                  Use <strong>PDFYAI</strong> to simplify document editing when your work goes beyond images.
                </p>
                <div className="mt-auto pt-4 flex items-center text-[#00d4ff] font-bold group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Card 2: Mobile App */}
            <Link href="#" className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="h-56 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-110 transition-transform duration-500 opacity-80">📱</div>
                <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#333] mb-3 group-hover:text-[#00d4ff] transition-colors">
                  Scan and edit on the go
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 flex-grow">
                  Scan paper documents and access quick image tools anytime with the <strong>PDFY AI Mobile App</strong>.
                </p>
                <div className="mt-auto pt-4 flex items-center text-[#00d4ff] font-bold group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>

            {/* Card 3: API */}
            <Link href="#" className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="h-56 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-110 transition-transform duration-500 opacity-80">🧩</div>
                <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#333] mb-3 group-hover:text-[#00d4ff] transition-colors">
                  Scale with PDFY AI API
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 flex-grow">
                  Automate image tasks at scale by integrating powerful editing tools into your product or workflow.
                </p>
                <div className="mt-auto pt-4 flex items-center text-[#00d4ff] font-bold group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Get More with Premium Section */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#6366f1] via-[#3b82f6] to-[#a855f7] relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              Get More Premium with <span className="text-[#60a5fa] drop-shadow-sm">Resizely Pro</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column: Window Mockup */}
            <div className="relative">
              {/* Floating Crown */}
              <div className="absolute -top-6 -right-6 z-20 text-6xl drop-shadow-lg transform rotate-12 animate-bounce-slow">
                👑
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/40 transform transition-transform hover:scale-[1.02] duration-500">
                {/* Window Header */}
                <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-indigo-500 flex items-center justify-center text-[8px] text-white">R</span> Resizely Pro
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-6">
                  {/* Image Placeholder */}
                  <div className="bg-slate-800 rounded-lg aspect-video mb-6 relative overflow-hidden group shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
                      alt="Editor preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    {/* Crop Overlay Lines */}
                    <div className="absolute inset-4 border-2 border-white/50 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white -mt-1 -ml-1"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white -mt-1 -mr-1"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white -mb-1 -ml-1"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white -mb-1 -mr-1"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30"></div>
                    </div>
                  </div>

                  {/* UI Controls */}
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-500 w-16">Resize</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-[70%] bg-indigo-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 w-16">Compress</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Features List */}
            <div className="text-white space-y-2">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  ),
                  path: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", // Just a fallback, using custom SVG below
                  title: "Unlimited Resizing & Compression",
                  bgColor: "bg-indigo-600",
                  customIcon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  )
                },
                {
                  icon: "🪄",
                  title: "AI Background Removal",
                  bgColor: "bg-blue-600",
                  customIcon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  icon: "📏",
                  title: "Custom Dimensions & Formats",
                  bgColor: "bg-green-600",
                  customIcon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  icon: "🎧",
                  title: "Priority Support",
                  bgColor: "bg-orange-600",
                  customIcon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-4 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-xl transition-colors">
                  <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center text-white shadow-lg shrink-0`}>
                    {/* Using generic icons for visualization based on description availability or fallback */}
                    {idx === 0 && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                    {idx === 3 && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xl font-medium tracking-wide">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/pricing" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white text-2xl font-bold py-5 px-16 rounded-2xl shadow-[0_10px_40px_rgba(59,130,246,0.5)] transform hover:translate-y-[-2px] hover:shadow-[0_20px_50px_rgba(59,130,246,0.6)] transition-all duration-300 w-full md:w-auto min-w-[300px] text-center inline-block">
              Upgrade to Pro
            </Link>
            <div className="mt-8 flex items-center gap-4 text-blue-200/80 font-medium tracking-widest text-sm uppercase">
              <div className="h-px w-12 bg-blue-300/30"></div>
              Unlock All Premium Features!
              <div className="h-px w-12 bg-blue-300/30"></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
