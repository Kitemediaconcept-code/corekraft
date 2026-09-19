import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
  LayoutDashboard, Package, Plus, Pencil, Trash2,
  X, Save, ImagePlus, AlertCircle, CheckCircle2, Loader2,
  IndianRupee, Tag, AlignLeft, Image, UploadCloud
} from 'lucide-react';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  original_price: '',
  category: 'office-essentials',
  image1: '',
  image2: '',
  image3: '',
  image4: '',
};

const CATEGORIES = [
  'office-essentials', 'drinkware', 'tech-gifts',
  'lifestyle', 'gift-sets', 'eco-friendly',
  'employee-gifts', 'client-gifts', 'executive-gifts', 'event-gifts'
];

export default function AdminDashboard({ onNavigateHome }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState({ 1: false, 2: false, 3: false, 4: false });

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [index]: true }));
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      if (data && data.publicUrl) {
        setForm(prev => ({ ...prev, [`image${index}`]: data.publicUrl }));
        showToast('Image uploaded successfully!');
      }
    } catch (err) {
      showToast('Error uploading image: ' + err.message, 'error');
    }
    setUploading(prev => ({ ...prev, [index]: false }));
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) { 
        showToast('Failed to fetch products: ' + error.message, 'error'); 
      } else { 
        setProducts(data || []); 
      }
    } catch (err) {
      showToast('Network error while fetching products.', 'error');
    }
    setLoading(false);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    const imgs = product.images || [];
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      original_price: product.original_price || '',
      category: product.category || 'office-essentials',
      image1: imgs[0] || '',
      image2: imgs[1] || '',
      image3: imgs[2] || '',
      image4: imgs[3] || '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.description) {
      showToast('Please fill in Name, Description, and Price.', 'error');
      return;
    }
    setSaving(true);
    const images = [form.image1, form.image2, form.image3, form.image4].filter(Boolean);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      original_price: parseFloat(form.original_price) || null,
      category: form.category,
      images,
    };

    try {
      let error;
      if (editingProduct) {
        ({ error } = await supabase.from('products').update(payload).eq('id', editingProduct.id));
      } else {
        ({ error } = await supabase.from('products').insert([payload]));
      }

      if (error) {
        showToast('Error saving product: ' + error.message, 'error');
      } else {
        showToast(editingProduct ? 'Product updated!' : 'Product added!');
        setShowForm(false);
        fetchProducts();
      }
    } catch (err) {
      showToast('Network error while saving product.', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) { 
        showToast('Delete failed: ' + error.message, 'error'); 
      } else { 
        showToast('Product deleted.'); 
        fetchProducts(); 
      }
    } catch (err) {
      showToast('Network error while deleting product.', 'error');
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium transition-all text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 gap-2 sticky top-0 h-screen">
          <div className="mb-8">
            <img src="/logo.png" alt="Corekraft" className="h-8 object-contain mb-1" />
            <p className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-2">Admin Dashboard</p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 text-black font-semibold text-sm">
            <Package size={18} /> Products
          </button>
          <button onClick={onNavigateHome} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors text-sm font-medium mt-auto">
            <LayoutDashboard size={18} /> Back to Store
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-slate-500 text-sm mt-1">{products.length} products in your store</p>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-black hover:bg-[#d42d59] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-black/10"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>

          {/* Product Table */}
          {loading ? (
            <div className="flex items-center justify-center h-64 text-slate-500">
              <Loader2 className="animate-spin mr-3" size={24} /> Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-4">
              <Package size={48} className="opacity-30" />
              <p className="text-lg font-medium">No products yet</p>
              <button onClick={openAddForm} className="text-black font-medium hover:underline text-sm">Add your first product →</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider bg-slate-50">
                    <th className="text-left px-6 py-4 font-semibold">Product</th>
                    <th className="text-left px-6 py-4 font-semibold">Category</th>
                    <th className="text-left px-6 py-4 font-semibold">Price</th>
                    <th className="text-left px-6 py-4 font-semibold">Images</th>
                    <th className="text-right px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                              <Image size={18} className="text-slate-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm">{product.name}</p>
                            <p className="text-slate-500 text-xs mt-0.5 line-clamp-1 max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full capitalize font-medium">{product.category?.replace(/-/g, ' ')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-sm text-slate-900">₹{product.price?.toLocaleString()}</p>
                          {product.original_price && (
                            <p className="text-slate-400 text-xs line-through">₹{product.original_price?.toLocaleString()}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {(product.images || []).slice(0, 4).map((img, i) => (
                            <img key={i} src={img} alt="" className="w-8 h-8 rounded object-cover bg-slate-100 border border-slate-200" />
                          ))}
                          {(product.images || []).length === 0 && <span className="text-slate-400 text-xs italic">No images</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openEditForm(product)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">
                            <Pencil size={14} /> Edit
                          </button>
                          <button onClick={() => setDeleteConfirm(product.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 font-medium text-sm transition-colors">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <Tag size={13} /> Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Executive Notebook Set"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <AlignLeft size={13} /> Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product..."
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                />
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <IndianRupee size={13} /> Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 1299"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <IndianRupee size={13} /> Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.original_price}
                    onChange={e => setForm({ ...form, original_price: e.target.value })}
                    placeholder="e.g. 1699"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  <ImagePlus size={13} /> Product Images (up to 4 URLs)
                </label>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      {uploading[i] ? (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <Loader2 size={18} className="animate-spin text-slate-400" />
                        </div>
                      ) : form[`image${i}`] ? (
                        <img src={form[`image${i}`]} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0" onError={e => e.target.style.display = 'none'} />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-slate-400 text-xs font-bold">{i}</span>
                        </div>
                      )}
                      
                      <div className="flex-1 flex gap-2">
                        <input
                          value={form[`image${i}`]}
                          onChange={e => setForm({ ...form, [`image${i}`]: e.target.value })}
                          placeholder={`Image ${i} URL${i === 1 ? ' (Main)' : ' (optional)'}`}
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                        <label className={`flex items-center justify-center px-4 rounded-xl font-medium text-sm transition-all cursor-pointer ${uploading[i] ? 'bg-slate-100 border border-slate-200 text-slate-400' : 'bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700'}`}>
                          <UploadCloud size={18} />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, i)}
                            disabled={uploading[i]}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-all">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-black hover:bg-[#d42d59] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">Delete Product?</h3>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
