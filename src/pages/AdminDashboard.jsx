import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
  LayoutDashboard, Package, Plus, Pencil, Trash2,
  X, Save, ImagePlus, AlertCircle, CheckCircle2, Loader2,
  IndianRupee, Tag, AlignLeft, Image
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) { showToast('Failed to fetch products: ' + error.message, 'error'); }
    else { setProducts(data || []); }
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
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { showToast('Delete failed: ' + error.message, 'error'); }
    else { showToast('Product deleted.'); fetchProducts(); }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-[#151515] border-r border-white/10 flex flex-col p-6 gap-2 sticky top-0 h-screen">
          <div className="mb-8">
            <img src="/logo.png" alt="Corekraft" className="h-8 object-contain mb-1" />
            <p className="text-xs text-white/40 font-medium tracking-widest uppercase mt-2">Admin Dashboard</p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#EE3364]/10 text-[#EE3364] font-semibold text-sm">
            <Package size={18} /> Products
          </button>
          <button onClick={onNavigateHome} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium mt-auto">
            <LayoutDashboard size={18} /> Back to Store
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-white/40 text-sm mt-1">{products.length} products in your store</p>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-[#EE3364] hover:bg-[#d42d59] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-[#EE3364]/20"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>

          {/* Product Table */}
          {loading ? (
            <div className="flex items-center justify-center h-64 text-white/40">
              <Loader2 className="animate-spin mr-3" size={24} /> Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-white/40 gap-4">
              <Package size={48} className="opacity-30" />
              <p className="text-lg font-medium">No products yet</p>
              <button onClick={openAddForm} className="text-[#EE3364] hover:underline text-sm">Add your first product →</button>
            </div>
          ) : (
            <div className="bg-[#151515] rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-4">Product</th>
                    <th className="text-left px-6 py-4">Category</th>
                    <th className="text-left px-6 py-4">Price</th>
                    <th className="text-left px-6 py-4">Images</th>
                    <th className="text-right px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-white/5" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                              <Image size={18} className="text-white/30" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm">{product.name}</p>
                            <p className="text-white/40 text-xs mt-0.5 line-clamp-1 max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-white/10 px-3 py-1 rounded-full capitalize">{product.category?.replace(/-/g, ' ')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-sm">₹{product.price?.toLocaleString()}</p>
                          {product.original_price && (
                            <p className="text-white/30 text-xs line-through">₹{product.original_price?.toLocaleString()}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {(product.images || []).slice(0, 4).map((img, i) => (
                            <img key={i} src={img} alt="" className="w-8 h-8 rounded object-cover bg-white/10" />
                          ))}
                          {(product.images || []).length === 0 && <span className="text-white/30 text-xs">No images</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openEditForm(product)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteConfirm(product.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors">
                            <Trash2 size={16} />
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  <Tag size={13} /> Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Executive Notebook Set"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#EE3364]/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  <AlignLeft size={13} /> Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#EE3364]/50 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    <IndianRupee size={13} /> Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 1299"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#EE3364]/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    <IndianRupee size={13} /> Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.original_price}
                    onChange={e => setForm({ ...form, original_price: e.target.value })}
                    placeholder="e.g. 1699"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#EE3364]/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EE3364]/50 transition-all"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat} className="bg-[#1A1A1A]">{cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  <ImagePlus size={13} /> Product Images (up to 4 URLs)
                </label>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      {form[`image${i}`] ? (
                        <img src={form[`image${i}`]} alt="" className="w-12 h-12 rounded-lg object-cover bg-white/10 flex-shrink-0" onError={e => e.target.style.display = 'none'} />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-white/20 text-xs font-bold">{i}</span>
                        </div>
                      )}
                      <input
                        value={form[`image${i}`]}
                        onChange={e => setForm({ ...form, [`image${i}`]: e.target.value })}
                        placeholder={`Image ${i} URL${i === 1 ? ' (Main)' : ' (optional)'}`}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#EE3364]/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-all">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#EE3364] hover:bg-[#d42d59] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Delete Product?</h3>
            <p className="text-white/40 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
