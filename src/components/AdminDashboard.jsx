import React, { useState, useEffect } from 'react';
import { Upload, LogOut, Film, CheckCircle2, AlertCircle, RefreshCw, Play, Clock, Sparkles } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingSlot, setUploadingSlot] = useState(null);
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

  // Upload handler with XMLHttpRequest for progress tracking
  const handleUpload = (slotKey, file) => {
    if (!file) return;

    // Client-side pre-validation
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.mp4', '.webm', '.mov'].includes(ext)) {
      showToast('error', `Invalid file type (${ext}). Only .mp4, .webm, and .mov files are permitted.`);
      return;
    }

    const maxSize = 150 * 1024 * 1024; // 150MB
    if (file.size > maxSize) {
      showToast('error', `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 150MB limit.`);
      return;
    }

    setUploadingSlot(slotKey);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.setRequestHeader('x-slot-key', slotKey);
    xhr.setRequestHeader('x-filename', file.name);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploadingSlot(null);
      setUploadProgress(0);

      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && res.success) {
          showToast('success', `Video updated successfully for ${slotKey}!`);
          fetchSlots(); // Refresh slot list and preview players immediately
        } else {
          showToast('error', res.error || 'Failed to replace video.');
        }
      } catch (err) {
        showToast('error', 'Server error parsing upload response.');
      }
    };

    xhr.onerror = () => {
      setUploadingSlot(null);
      setUploadProgress(0);
      showToast('error', 'Network error during video upload. Please check connection and retry.');
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
              <span>Self-Service Control</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F5F7]">
              Studio Video Manager
            </h1>
            <p className="text-xs text-[#86868B] font-light mt-1">
              Replace showcase videos directly. Changes take effect on the live site immediately.
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
            <p className="text-[#F5F5F7] font-medium mb-0.5">Showcase Video Slots</p>
            <p className="leading-relaxed">
              Upload formats accepted: <span className="text-[#D9B36C] font-mono">.MP4</span>, <span className="text-[#D9B36C] font-mono">.WEBM</span>, <span className="text-[#D9B36C] font-mono">.MOV</span> up to <span className="text-[#D9B36C] font-mono">150MB</span> per video. Note: The hero camera assembly animation is developer-managed and excluded from this panel.
            </p>
          </div>
        </div>

        {/* Video Slots List */}
        {loading ? (
          <div className="py-20 text-center text-xs text-[#86868B] font-cinzel tracking-widest uppercase">
            <RefreshCw className="w-6 h-6 text-[#D9B36C] animate-spin mx-auto mb-3" />
            <span>Loading Video Slots...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {slots.map((slot) => {
              const isCurrentlyUploading = uploadingSlot === slot.slotKey;

              return (
                <div
                  key={slot.slotKey}
                  className="rounded-2xl apple-glass-card border border-[#2C2C2E] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-cinzel tracking-widest uppercase text-[#D9B36C] font-bold">
                        {slot.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-[#86868B] font-mono">
                        <Clock className="w-3 h-3 text-[#D9B36C]" />
                        <span>Updated: {slot.lastUpdated}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-[#F5F5F7] mb-4">
                      {slot.label}
                    </h3>

                    {/* Preview Video Player */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#000000] border border-[#2C2C2E] mb-6">
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

                  {/* Upload Dropzone */}
                  <div>
                    {isCurrentlyUploading ? (
                      <div className="p-5 rounded-xl bg-[#000000] border border-[#D9B36C]/50 text-center">
                        <div className="flex items-center justify-between text-xs text-[#D9B36C] font-cinzel uppercase tracking-wider mb-2 font-bold">
                          <span>Uploading New Video...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#1C1C1E] rounded-full overflow-hidden border border-[#2C2C2E]">
                          <div
                            className="h-full bg-gold-gradient transition-all duration-200"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-[#86868B] mt-2 font-mono">
                          Overwriting existing file at slot key. Please do not close page.
                        </p>
                      </div>
                    ) : (
                      <label className="group flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-[#2C2C2E] hover:border-[#D9B36C] bg-[#000000]/60 hover:bg-[#000000] transition-all cursor-pointer">
                        <Upload className="w-6 h-6 text-[#86868B] group-hover:text-[#D9B36C] transition-colors mb-2" />
                        <span className="text-xs font-semibold text-[#F5F5F7] group-hover:text-[#D9B36C] transition-colors">
                          Replace Video File
                        </span>
                        <span className="text-[10px] text-[#86868B] font-mono mt-1">
                          Drag & drop or click to browse (.mp4, .webm, .mov max 150MB)
                        </span>
                        <input
                          type="file"
                          accept=".mp4,.webm,.mov"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUpload(slot.slotKey, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    )}
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
