import Link from 'next/link';
import Navbar from '@/components/user/Navbar';

interface Tool {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const tools: Tool[] = [
  {
    title: 'Compress IMAGE',
    description: 'Compress JPG, PNG, SVG, and GIF with the best quality and compression.',
    icon: '🗜️',
    href: '/compress',
    color: 'bg-blue-500',
  },
  {
    title: 'Resize IMAGE',
    description: 'Define your dimensions, by pixels or percentage, and resize your JPG, PNG, SVG and GIF images.',
    icon: '📏',
    href: '/resize',
    color: 'bg-indigo-500',
  },
  {
    title: 'Crop IMAGE',
    description: 'Crop JPG, PNG, or GIF with ease; choose pixels to specify your rectangle or use our visual editor.',
    icon: '✂️',
    href: '/crop',
    color: 'bg-purple-500',
  },
  {
    title: 'Convert format',
    description: 'Convert JPG, PNG, WebP, AVIF and GIF images in bulk with ease.',
    icon: '🔄',
    href: '/convert',
    color: 'bg-pink-500',
  },
  {
    title: 'Rotate IMAGE',
    description: 'Rotate your photos and images in bulk. Rotate only horizontal or vertical images at the same time!',
    icon: '🔃',
    href: '/rotate',
    color: 'bg-orange-500',
  },
  {
    title: 'Merge IMAGE',
    description: 'Combine multiple images into one horizontally or vertically.',
    icon: '🧩',
    href: '/merge',
    color: 'bg-green-500',
  },
  {
    title: 'Add Watermark',
    description: 'Stamp an image or text over your images in seconds. Choose typography, transparency and position.',
    icon: '🏷️',
    href: '/watermark',
    color: 'bg-red-500',
  },
  {
    title: 'Batch IMAGE',
    description: 'Compress and optimize multiple images at once and download them in a single ZIP file.',
    icon: '📦',
    href: '/batch',
    color: 'bg-slate-700',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">


      <section style={{ backgroundImage: "url(/images/background.svg)" }}>
        <div className="w-full px-5 max-w-[1600px] mx-auto py-20 text-center mt-6" >
          <div className="mb-20 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-medium  mb-8 tracking-tighter leading-[1.1] text-[#333]">
              Every tool you need to <span className="relative inline-block text-[#00d4ff]">
                edit images
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#00d4ff] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Resize AI is your 100% FREE online image editor.
              Compress, resize, crop, and convert images with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
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


    </div>
  );
}
