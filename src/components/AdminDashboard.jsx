import React, { useState, useEffect } from 'react';
import { Upload, LogOut, Film, CheckCircle2, AlertCircle, RefreshCw, Clock, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track uploading state: { slotKey, targetType: 'video' | 'thumbnail' }
  const [uploadingState, setUploadingState] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);

  // Fetch slots
  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (res.ok) {
        setSlots(data.slots || []);
      }
    } catch (err) {
      showToast('error', 'Failed to load video slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      // Ignore
    }
    onLogout();
  };

  // Upload handler with targetType ('video' | 'thumbnail')
  const handleUpload = (slotKey, file, targetType = 'video') => {
    if (!file) return;

    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

    if (targetType === 'thumbnail') {
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        showToast('error', `Invalid thumbnail image type (${ext}). Only .jpg, .jpeg, .png, and .webp images are accepted.`);
        return;
      }
      if (file.size > 15 * 1024 * 1024) { // 15MB
        showToast('error', `Thumbnail size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 15MB limit.`);
        return;
      }
    } else {
      if (!['.mp4', '.webm', '.mov'].includes(ext)) {
        showToast('error', `Invalid video file type (${ext}). Only .mp4, .webm, and .mov video files are accepted.`);
        return;
      }
      if (file.size > 150 * 1024 * 1024) { // 150MB
        showToast('error', `Video size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 150MB limit.`);
        return;
      }
    }

    setUploadingState({ slotKey, targetType });
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.setRequestHeader('x-slot-key', slotKey);
    xhr.setRequestHeader('x-target-type', targetType);
    xhr.setRequestHeader('x-filename', file.name);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploadingState(null);
      setUploadProgress(0);

      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && res.success) {
          showToast('success', `${targetType === 'thumbnail' ? 'Thumbnail cover image' : 'Video file'} updated successfully!`);
          fetchSlots(); // Refresh slot list and preview players immediately
        } else {
          showToast('error', res.error || 'Failed to replace file.');
        }
      } catch (err) {
        showToast('error', 'Server error parsing upload response.');
      }
    };

    xhr.onerror = () => {
      setUploadingState(null);
      setUploadProgress(0);
      showToast('error', 'Network error during file upload. Please check connection and retry.');
    };

    xhr.send(file);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F7] p-6 md:p-12 relative">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-[#D9B36C]/10 via-transparent to-transparent blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#2C2C2E] mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.25em] text-[#D9B36C] mb-2 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Studio Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F5F7]">
              Studio Video & Thumbnail Manager
            </h1>
            <p className="text-xs text-[#86868B] font-light mt-1">
              Replace showcase videos and cover thumbnails directly. Changes take effect on the live site immediately.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1C1E] border border-[#2C2C2E] text-xs font-cinzel tracking-widest text-[#F5F5F7] hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer shadow-lg shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </header>

        {/* Toast Alert */}
        {toast && (
          <div
            className={`fixed top-8 right-8 z-50 p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-center gap-3 text-xs max-w-md animate-fadeIn ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
                : 'bg-red-950/90 border-red-500/50 text-red-100'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="leading-relaxed">{toast.message}</span>
          </div>
        )}

        {/* Info Note */}
        <div className="mb-10 p-5 rounded-2xl apple-glass border border-[#D9B36C]/30 text-xs text-[#86868B] flex items-start gap-3">
          <Film className="w-5 h-5 text-[#D9B36C] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#F5F5F7] font-medium mb-0.5">Showcase Video & Thumbnail Manager</p>
            <p className="leading-relaxed">
              Videos: <span className="text-[#D9B36C] font-mono">.MP4, .WEBM, .MOV</span> (max 150MB). Cover Thumbnails: <span className="text-[#D9B36C] font-mono">.JPG, .PNG, .WEBP</span> (max 15MB). The hero camera assembly animation is code-managed and excluded.
            </p>
          </div>
        </div>

        {/* Video & Thumbnail Slots List */}
        {loading ? (
          <div className="py-20 text-center text-xs text-[#86868B] font-cinzel tracking-widest uppercase">
            <RefreshCw className="w-6 h-6 text-[#D9B36C] animate-spin mx-auto mb-3" />
            <span>Loading Media Slots...</span>
          </div>
        ) : (
          <div className="space-y-10">
            {slots.map((slot) => {
              const isUploadingVideo = uploadingState?.slotKey === slot.slotKey && uploadingState?.targetType === 'video';
              const isUploadingThumb = uploadingState?.slotKey === slot.slotKey && uploadingState?.targetType === 'thumbnail';

              return (
                <div
                  key={slot.slotKey}
                  className="rounded-2xl apple-glass-card border border-[#2C2C2E] p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden"
                >
                  {/* Slot Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#2C2C2E] mb-6">
                    <div>
                      <span className="text-[9px] font-cinzel tracking-widest uppercase text-[#D9B36C] font-bold">
                        {slot.category}
                      </span>
                      <h3 className="text-2xl font-serif text-[#F5F5F7] mt-0.5">
                        {slot.label}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#86868B] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#D9B36C]" />
                      <span>Last Updated: {slot.lastUpdated}</span>
                    </div>
                  </div>

                  {/* 2-Column Grid: Video Section (Left) vs Thumbnail Section (Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* VIDEO COLUMN */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-[#000000]/70 border border-[#2C2C2E]">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#F5F5F7] flex items-center gap-2">
                            <Film className="w-4 h-4 text-[#D9B36C]" /> Showcase Video
                          </span>
                          <span className="text-[10px] text-[#86868B] font-mono">Max 150MB</span>
                        </div>

                        {/* Video Preview */}
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#000000] border border-[#2C2C2E] mb-4">
                          {slot.videoUrl.includes('youtube.com') || slot.videoUrl.includes('vimeo.com') ? (
                            <iframe
                              src={slot.videoUrl}
                              title={slot.label}
                              className="w-full h-full border-0 pointer-events-none"
                            />
                          ) : (
                            <video
                              src={slot.videoUrl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Video Upload Dropzone */}
                      {isUploadingVideo ? (
                        <div className="p-4 rounded-xl bg-[#000000] border border-[#D9B36C]/50 text-center">
                          <div className="flex items-center justify-between text-xs text-[#D9B36C] font-cinzel uppercase tracking-wider mb-2 font-bold">
                            <span>Uploading Video...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#1C1C1E] rounded-full overflow-hidden border border-[#2C2C2E]">
                            <div
                              className="h-full bg-gold-gradient transition-all duration-200"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <label className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-dashed border-[#2C2C2E] hover:border-[#D9B36C] bg-[#000000] hover:bg-[#161412] transition-all cursor-pointer text-center">
                          <Upload className="w-5 h-5 text-[#86868B] group-hover:text-[#D9B36C] transition-colors shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-[#F5F5F7] group-hover:text-[#D9B36C] transition-colors block">
                              Replace Video File
                            </span>
                            <span className="text-[9px] text-[#86868B] font-mono block">
                              (.mp4, .webm, .mov)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".mp4,.webm,.mov"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleUpload(slot.slotKey, e.target.files[0], 'video');
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* THUMBNAIL COVER COLUMN */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-[#000000]/70 border border-[#2C2C2E]">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#F5F5F7] flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#D9B36C]" /> Card Cover Thumbnail
                          </span>
                          <span className="text-[10px] text-[#86868B] font-mono">Max 15MB</span>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#000000] border border-[#2C2C2E] mb-4">
                          {slot.thumbnailUrl ? (
                            <img
                              src={slot.thumbnailUrl}
                              alt={slot.label}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[#86868B] text-xs">
                              <ImageIcon className="w-8 h-8 text-[#2C2C2E] mb-1" />
                              <span>No custom thumbnail</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Thumbnail Upload Dropzone */}
                      {isUploadingThumb ? (
                        <div className="p-4 rounded-xl bg-[#000000] border border-[#D9B36C]/50 text-center">
                          <div className="flex items-center justify-between text-xs text-[#D9B36C] font-cinzel uppercase tracking-wider mb-2 font-bold">
                            <span>Uploading Cover Image...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#1C1C1E] rounded-full overflow-hidden border border-[#2C2C2E]">
                            <div
                              className="h-full bg-gold-gradient transition-all duration-200"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <label className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-dashed border-[#2C2C2E] hover:border-[#D9B36C] bg-[#000000] hover:bg-[#161412] transition-all cursor-pointer text-center">
                          <Upload className="w-5 h-5 text-[#86868B] group-hover:text-[#D9B36C] transition-colors shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-[#F5F5F7] group-hover:text-[#D9B36C] transition-colors block">
                              Replace Cover Thumbnail
                            </span>
                            <span className="text-[9px] text-[#86868B] font-mono block">
                              (.jpg, .jpeg, .png, .webp)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleUpload(slot.slotKey, e.target.files[0], 'thumbnail');
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
