import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Video, Layout, Type, Palette, Star } from 'lucide-react';
import { useSlider, Slide } from '../../context/SliderContext';

const AdminSlider: React.FC = () => {
  const { slides, addSlide, updateSlide, deleteSlide } = useSlider();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Slide, 'id'>>({
    title: '',
    highlight: '',
    offer: '',
    bg: 'bg-red-600',
    url: '',
    type: 'image'
  });

  const handleSave = () => {
    if (editingId !== null) {
      updateSlide(editingId, formData);
      setEditingId(null);
    } else {
      addSlide(formData);
      setIsAdding(false);
    }
    setFormData({
      title: '',
      highlight: '',
      offer: '',
      bg: 'bg-red-600',
      url: '',
      type: 'image'
    });
  };

  const startEdit = (slide: Slide) => {
    setEditingId(slide.id);
    setFormData({
      title: slide.title,
      highlight: slide.highlight,
      offer: slide.offer,
      bg: slide.bg,
      url: slide.url,
      type: slide.type
    });
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      highlight: '',
      offer: '',
      bg: 'bg-red-600',
      url: '',
      type: 'image'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Home Slider Management</h1>
          <p className="text-gray-500 mt-1">Manage the hero section slides (Images or Videos)</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-xl shadow-red-600/20"
          >
            <Plus className="w-5 h-5" /> Add New Slide
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Slide' : 'Add New Slide'}</h2>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-red-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Celebrate Diwali"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 outline-none transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Highlight Text</label>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    placeholder="e.g. SALE"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 outline-none transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Offer Description</label>
                <div className="relative">
                  <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.offer}
                    onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                    placeholder="e.g. UP TO 70% OFF"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 outline-none transition-all font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Background Class (Tailwind)</label>
                <div className="relative">
                  <Palette className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.bg}
                    onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
                    placeholder="e.g. bg-red-600"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 outline-none transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Media Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, type: 'image' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                      formData.type === 'image' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5" /> Image
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, type: 'video' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                      formData.type === 'video' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Video className="w-5 h-5" /> Video
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Media URL</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button
              onClick={cancelEdit}
              className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
            >
              {editingId ? 'Update Slide' : 'Save Slide'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48 bg-gray-100">
              {slide.type === 'image' ? (
                <img src={slide.url || null} alt={slide.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                  <Video className="w-12 h-12 opacity-50" />
                  <span className="ml-2 font-bold">Video Slide</span>
                </div>
              )}
              <div className={`absolute inset-0 ${slide.bg} opacity-20`} />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => startEdit(slide)}
                  className="p-2 bg-white rounded-lg text-gray-600 hover:text-red-600 shadow-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="p-2 bg-white rounded-lg text-gray-600 hover:text-red-600 shadow-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{slide.title}</h3>
              <p className="text-red-600 font-black text-2xl mb-2">{slide.highlight}</p>
              <p className="text-gray-500 text-sm font-medium">{slide.offer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSlider;
