import React, {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
} from 'react';

import {
  Camera,
  Upload,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

import { useProfilePhoto } from '../context/ProfilePhotoContext';

import {
  validateProfilePhoto,
  readFileAsDataUrl,
} from '../utils/photoStorage';

interface ProfilePhotoUploaderProps {
  compact?: boolean;
  showCard?: boolean;
  className?: string;
}

export const ProfilePhotoUploader: React.FC<
  ProfilePhotoUploaderProps
> = ({
  compact = false,
  showCard = false,
  className = '',
}) => {
  const {
    photoUrl,
    isCustomPhoto,
    isUploadModalOpen,
    openUploadModal,
    closeUploadModal,
    updatePhotoFromFile,
    removePhoto,
  } = useProfilePhoto();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [zoomLevel, setZoomLevel] =
    useState<number>(100);

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  /*
   * Open upload modal
   */
  const handleOpenPicker = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setZoomLevel(100);
    setIsDragging(false);

    openUploadModal();
  };

  /*
   * Handle selected file
   */
  const handleFileSelect = async (
    file: File
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const validation =
      validateProfilePhoto(file);

    if (!validation.valid) {
      setErrorMessage(
        validation.error || 'Invalid file.'
      );
      return;
    }

    try {
      const dataUrl =
        await readFileAsDataUrl(file);

      setSelectedFile(file);
      setPreviewUrl(dataUrl);
      setZoomLevel(100);
    } catch (err) {
      setErrorMessage(
        'Could not load image preview. Please try another file.'
      );
    }
  };

  /*
   * File input
   */
  const onFileInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target.files &&
      e.target.files[0]
    ) {
      handleFileSelect(
        e.target.files[0]
      );
    }

    /*
     * Reset input so the same image can
     * be selected again if necessary.
     */
    e.target.value = '';
  };

  /*
   * Drag over
   */
  const onDragOver = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /*
   * Drag leave
   */
  const onDragLeave = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /*
   * Drop image
   */
  const onDrop = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {
      handleFileSelect(
        e.dataTransfer.files[0]
      );
    }
  };

  /*
   * Save/apply photo
   */
  const handleApplyPhoto = async () => {
    if (!selectedFile) {
      setErrorMessage(
        'Please select a photo first.'
      );
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsProcessing(true);

    try {
      const result =
        await updatePhotoFromFile(
          selectedFile
        );

      if (result.success) {
        setSuccessMessage(
          'Profile photo updated successfully!'
        );

        /*
         * Close modal after successful save.
         */
        setTimeout(() => {
          setSuccessMessage(null);
          setPreviewUrl(null);
          setSelectedFile(null);
          closeUploadModal();
        }, 1000);
      } else {
        setErrorMessage(
          result.error ||
            'Failed to save profile photo.'
        );
      }
    } catch (error) {
      setErrorMessage(
        'Failed to save profile photo. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  /*
   * Remove photo
   */
  const handleRemovePhoto = () => {
    removePhoto();

    setPreviewUrl(null);
    setSelectedFile(null);
    setErrorMessage(null);

    setSuccessMessage(
      'Photo removed. Reset to default avatar.'
    );

    setTimeout(() => {
      setSuccessMessage(null);
    }, 1500);
  };

  /*
   * Dedicated Card Render Mode
   */
  if (showCard) {
    return (
      <div
        id="profile-photo-card"
        className={`relative group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-500/40 ${className}`}
      >
        {/* Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">

          {/* Profile Circle */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl shadow-black/40 mb-4 group/avatar">

            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">

              <img
                src={photoUrl}
                alt="YASHAS C Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/avatar:scale-105"
              />

              {/* Hover overlay */}
              <button
                type="button"
                id="btn-card-overlay-change-photo"
                onClick={
                  handleOpenPicker
                }
                aria-label="Change profile photo"
                className="absolute inset-0 bg-[#020617]/80 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white text-xs font-medium cursor-pointer backdrop-blur-xs"
              >
                <Camera className="w-6 h-6 text-blue-400" />

                <span>
                  Change Photo
                </span>
              </button>
            </div>

            {/* Status dot */}
            <span
              className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg"
              title="Open to opportunities"
            />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            YASHAS C
          </h3>

          <p className="text-xs text-blue-400 font-mono mt-0.5 mb-4">
            CS Student & Developer
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">

            <button
              type="button"
              id="btn-card-upload-photo"
              onClick={
                handleOpenPicker
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 text-xs font-medium transition cursor-pointer backdrop-blur-md"
            >
              <Upload className="w-3.5 h-3.5" />

              <span>
                {isCustomPhoto
                  ? 'Change Photo'
                  : 'Upload Profile Photo'}
              </span>
            </button>

            {isCustomPhoto && (
              <button
                type="button"
                id="btn-card-remove-photo"
                onClick={
                  handleRemovePhoto
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium transition cursor-pointer"
                title="Remove uploaded photo and reset to default"
              >
                <Trash2 className="w-3.5 h-3.5" />

                <span>
                  Remove
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Modal */}
        {isUploadModalOpen &&
          renderModal()}
      </div>
    );
  }

  /*
   * Compact Trigger
   */
  return (
    <>
      <div
        className={`relative inline-block ${className}`}
      >
        <div
          onClick={
            handleOpenPicker
          }
          className="relative group/compact cursor-pointer rounded-full p-1 bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-black/40"
          title="Click to view or change profile photo"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">

            <img
              src={photoUrl}
              alt="YASHAS C Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/compact:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {isUploadModalOpen &&
        renderModal()}
    </>
  );

  /*
   * Upload Modal
   */
  function renderModal() {
    return (
      <div
        id="profile-photo-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => {
          if (
            e.target ===
            e.currentTarget
          ) {
            closeUploadModal();
          }
        }}
      >
        <div
          id="profile-photo-modal"
          className="w-full max-w-md bg-[#020617]/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 relative animate-in zoom-in-95 duration-200 backdrop-blur-2xl"
        >

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">

            <div className="flex items-center gap-2.5">

              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Camera className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">
                  Profile Photo
                </h3>

                <p className="text-xs text-slate-400">
                  Upload or replace your portfolio picture
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-close-photo-modal"
              onClick={
                closeUploadModal
              }
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-4">

            {/* Error */}
            {errorMessage && (
              <div className="flex items-start gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">

                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />

                <p>
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success */}
            {successMessage && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">

                <Check className="w-4 h-4 shrink-0 text-emerald-400" />

                <p>
                  {successMessage}
                </p>
              </div>
            )}

            {/* Preview */}
            <div className="flex flex-col items-center justify-center gap-3">

              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl shadow-black/40">

                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">

                  <img
                    src={
                      previewUrl ||
                      photoUrl
                    }
                    alt="Profile preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-200"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                    }}
                  />
                </div>
              </div>

              {/* Zoom Controls */}
              {previewUrl && (
                <div className="flex items-center gap-3 text-xs text-slate-400">

                  <button
                    type="button"
                    onClick={() =>
                      setZoomLevel(
                        (prev) =>
                          Math.max(
                            80,
                            prev - 10
                          )
                      )
                    }
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <span className="font-mono">
                    {zoomLevel}%
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setZoomLevel(
                        (prev) =>
                          Math.min(
                            160,
                            prev + 10
                          )
                      )
                    }
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Drag and Drop */}
            <div
              onDragOver={
                onDragOver
              }
              onDragLeave={
                onDragLeave
              }
              onDrop={onDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-blue-400 bg-blue-500/10'
                  : 'border-white/10 hover:border-blue-500/40 bg-white/5 hover:bg-white/10'
              }`}
            >

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={
                  onFileInputChange
                }
              />

              <div className="flex flex-col items-center gap-1.5">

                <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-400">
                  <ImageIcon className="w-5 h-5" />
                </div>

                <p className="text-xs font-medium text-slate-200">
                  Click to browse or drag & drop image
                </p>

                <p className="text-[11px] text-slate-400">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">

            {/* Remove */}
            <div>
              {isCustomPhoto && (
                <button
                  type="button"
                  id="btn-modal-remove-photo"
                  onClick={
                    handleRemovePhoto
                  }
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />

                  <span>
                    Remove Photo
                  </span>
                </button>
              )}
            </div>

            {/* Cancel + Save */}
            <div className="flex items-center gap-2">

              {/* Cancel */}
              <button
                type="button"
                id="btn-modal-cancel"
                onClick={
                  closeUploadModal
                }
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>

              {/* SAVE PHOTO
                  Always visible.
                  Disabled until a file is selected.
              */}
              <button
                type="button"
                id="btn-modal-save-photo"
                onClick={
                  handleApplyPhoto
                }
                disabled={
                  !previewUrl ||
                  !selectedFile ||
                  isProcessing
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs shadow-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
              >

                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}

                <span>
                  {isProcessing
                    ? 'Saving...'
                    : 'Save Photo'}
                </span>
              </button>
            </div>
          </div>

          {/* Helpful status */}
          {!selectedFile &&
            !successMessage && (
              <p className="text-center text-[11px] text-slate-500 mt-3">
                Select an image to enable Save Photo.
              </p>
            )}
        </div>
      </div>
    );
  }
};

export default ProfilePhotoUploader;
