import React, { useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, CheckCircle2, RotateCcw, Layers, Sliders } from 'lucide-react';

export default function BrandingPreviewer() {
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('bottle');
  const [technique, setTechnique] = useState('engraving');
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  const products = [
    { id: 'bottle', name: 'Insulated Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' },
    { id: 'notebook', name: 'Leather Notebook', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
    { id: 'powerbank', name: 'Metal Power Bank', image: 'https://images.unsplash.com/photo-1593121925328-369ec8459c08?auto=format&fit=crop&w=800&q=80' },
    { id: 'backpack', name: 'Laptop Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' }
  ];

  const techniques = [
    { id: 'engraving', name: 'Laser Engraving', desc: 'Sleek metallic metallic finish' },
    { id: 'uv', name: 'UV Color Print', desc: 'Vibrant full-color match' },
    { id: 'emboss', name: 'Deep Debossing', desc: 'Classic recessed leather look' },
    { id: 'foil', name: 'Gold/Silver Foil', desc: 'Luxury reflective shine' }
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedLogo(url);
    }
  };

  const activeProductObj = products.find(p => p.id === selectedProduct);

  return (
    <div className="bg-white rounded-3xl border border-[#ECE7E8] shadow-xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#FFF3F6] text-[#EE3364] flex items-center justify-center">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Live Logo Preview Studio</h3>
          <p className="text-xs text-gray-500">Upload your brand logo and preview it live on Corekraft products.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Upload Logo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              1. Upload Company Logo
            </label>
            <div className="border-2 border-dashed border-[#FAD9E2] hover:border-[#EE3364] bg-[#FFF3F6]/50 rounded-2xl p-4 text-center cursor-pointer transition relative">
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload size={24} className="text-[#EE3364]" />
                <p className="text-xs font-bold text-gray-800">
                  {uploadedLogo ? '✓ Logo Loaded (Click to Change)' : 'Click to Upload Logo (PNG, JPG, SVG)'}
                </p>
                <p className="text-[10px] text-gray-400">Transparent background recommended</p>
              </div>
            </div>
          </div>

          {/* Step 2: Select Product */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              2. Choose Sample Product
            </label>
            <div className="grid grid-cols-2 gap-2">
              {products.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition text-left ${
                    selectedProduct === p.id 
                      ? 'border-[#EE3364] bg-[#FFF3F6] text-[#EE3364]' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="line-clamp-1">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Technique */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              3. Branding Technique
            </label>
            <div className="grid grid-cols-2 gap-2">
              {techniques.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTechnique(t.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                    technique === t.id 
                      ? 'border-[#EE3364] bg-[#FFF3F6] text-[#EE3364]' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold">{t.name}</p>
                  <p className="text-[10px] font-normal text-gray-500 line-clamp-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Scale Slider */}
          {uploadedLogo && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Logo Scale</span>
                <span>{Math.round(logoScale * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1.8" 
                step="0.1" 
                value={logoScale}
                onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                className="w-full accent-[#EE3364]"
              />
            </div>
          )}
        </div>

        {/* Right Canvas Mockup */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-50 flex items-center justify-center">
            {/* Base Product Mockup Image */}
            <img 
              src={activeProductObj.image} 
              alt={activeProductObj.name} 
              className="w-full h-full object-cover"
            />

            {/* Overlaid Logo Layer */}
            {uploadedLogo ? (
              <div 
                className="absolute transition-transform duration-200 pointer-events-none"
                style={{
                  transform: `scale(${logoScale}) translate(${logoPosition.x}px, ${logoPosition.y}px)`,
                  filter: technique === 'engraving' ? 'grayscale(100%) brightness(1.2) contrast(1.4)' : 
                          technique === 'emboss' ? 'sepia(80%) contrast(1.6) opacity(0.85)' : 'none'
                }}
              >
                <img 
                  src={uploadedLogo} 
                  alt="Custom Brand Logo" 
                  className="max-w-[140px] max-h-[90px] object-contain drop-shadow-md"
                />
              </div>
            ) : (
              <div 
                className="absolute transition-transform duration-200 pointer-events-none opacity-80"
                style={{ transform: `scale(${logoScale})` }}
              >
                {/* Default Corekraft Logo Placeholder */}
                <img 
                  src="/logo.png" 
                  alt="Default Logo" 
                  className="max-w-[140px] max-h-[80px] object-contain filter drop-shadow-lg"
                />
              </div>
            )}

            {/* Watermark badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border text-[11px] font-bold text-gray-800 shadow-sm flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#EE3364]" /> Corekraft Preview
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-3 text-center">
            *Visual representation. Our dedicated design team provides high-res vector proofs prior to mass production.
          </p>
        </div>
      </div>
    </div>
  );
}
