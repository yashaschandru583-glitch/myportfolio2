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

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [zoomLevel, setZoomLevel] =
    useState<number>(100);

  const [isProcessing, setIsProcessing] =
    useState(false);

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
   * Select image
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
        validation.error ||
          'Invalid image file.'
      );
      return;
    }

    try {
      const dataUrl =
        await readFileAsDataUrl(file);

      setSelectedFile(file);
      setPreviewUrl(dataUrl);
      setZoomLevel(100);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        'Could not load image preview. Please try another image.'
      );
    }
  };

  /*
   * File input
   */
  const onFileInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }

    event.target.value = '';
  };

  /*
   * Drag over
   */
  const onDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  /*
   * Drag leave
   */
  const onDragLeave = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  /*
   * Drop
   */
  const onDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  /*
   * Save photo
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
          'Profile photo saved successfully!'
        );

        setTimeout(() => {
          setSelectedFile(null);
          setPreviewUrl(null);
          setSuccessMessage(null);
          closeUploadModal();
        }, 1000);
      } else {
        setErrorMessage(
          result.error ||
            'Unable to save profile photo.'
        );
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        'Unable to save profile photo. Please try again.'
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

    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);

    setSuccessMessage(
      'Profile photo removed.'
    );

    setTimeout(() => {
      setSuccessMessage(null);
    }, 1500);
  };

  /*
   * Reset modal
   */
  const handleCloseModal = () => {
    if (isProcessing) {
      return;
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    setZoomLevel(100);
    setIsDragging(false);

    closeUploadModal();
  };

  /*
   * Main card mode
   */
  if (showCard) {
    return (
      <div
        id="profile-photo-card"
        className={`relative group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-500/40 ${className}`}
      >
        {/* Background glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">

          {/* Profile image */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl shadow-black/40 mb-4">

            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">

              <img
                src={photoUrl}
                alt="YASHAS C Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              <button
                type="button"
                id="btn-card-overlay-change-photo"
                onClick={handleOpenPicker}
                aria-label="Change profile photo"
                className="absolute inset-0 bg-[#020617]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white text-xs font-medium cursor-pointer"
              >
                <Camera className="w-6 h-6 text-blue-400" />

                <span>
                  Change Photo
                </span>
              </button>
            </div>

            {/* Status */}
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

          <div className="flex flex-wrap items-center justify-center gap-2 w-full">

            <button
              type="button"
              id="btn-card-upload-photo"
              onClick={handleOpenPicker}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 text-xs font-medium transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />

              {isCustomPhoto
                ? 'Change Photo'
                : 'Upload Profile Photo'}
            </button>

            {isCustomPhoto && (
              <button
                type="button"
                id="btn-card-remove-photo"
                onClick={handleRemovePhoto}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />

                Remove
              </button>
            )}
          </div>
        </div>

        {isUploadModalOpen &&
          renderModal()}
      </div>
    );
  }

  /*
   * Compact mode
   */
  return (
    <>
      <div
        className={`relative inline-block ${className}`}
      >
        <div
          onClick={handleOpenPicker}
          className="relative group/compact cursor-pointer rounded-full p-1 bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-black/40"
          title="Click to change profile photo"
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
   * Upload modal
   */
  function renderModal() {
    return (
      <div
        id="profile-photo-modal-backdrop"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(event) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            handleCloseModal();
          }
        }}
      >
        <div
          id="profile-photo-modal"
          className="w-full max-w-md max-h-[92vh] bg-[#020617]/98 border border-white/15 rounded-3xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 backdrop-blur-2xl"
        >

          {/* ================= HEADER ================= */}
          <div className="shrink-0 flex items-center justify-between p-5 sm:p-6 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Camera className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Profile Photo
                </h3>

                <p className="text-xs sm:text-sm text-slate-400">
                  Upload or replace your portfolio picture
                </p>
              </div>
            </div>

            <button
              type="button"
              id="btn-close-photo-modal"
              onClick={handleCloseModal}
              disabled={isProcessing}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition disabled:opacity-40"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* ================= SCROLLABLE BODY ================= */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">

            {/* Error */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">

                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />

                <p className="leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success */}
            {successMessage && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">

                <Check className="w-4 h-4 shrink-0 text-emerald-400" />

                <p>
                  {successMessage}
                </p>
              </div>
            )}

            {/* ================= PREVIEW ================= */}
            <div className="flex flex-col items-center justify-center gap-3">

              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl shadow-black/40">

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

              {/* Zoom controls */}
              <div className="flex items-center gap-3 text-xs text-slate-400">

                <button
                  type="button"
                  onClick={() =>
                    setZoomLevel(
                      (value) =>
                        Math.max(
                          80,
                          value - 10
                        )
                    )
                  }
                  disabled={
                    zoomLevel <= 80
                  }
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition disabled:opacity-30"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="font-mono min-w-[45px] text-center">
                  {zoomLevel}%
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setZoomLevel(
                      (value) =>
                        Math.min(
                          160,
                          value + 10
                        )
                    )
                  }
                  disabled={
                    zoomLevel >= 160
                  }
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition disabled:opacity-30"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ================= UPLOAD AREA ================= */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-blue-400 bg-blue-500/10'
                  : 'border-white/10 hover:border-blue-500/50 bg-white/5 hover:bg-white/10'
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

              <div className="flex flex-col items-center gap-2">

                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                  <ImageIcon className="w-6 h-6" />
                </div>

                <p className="text-sm font-semibold text-slate-200">
                  Click to browse or drag & drop image
                </p>

                <p className="text-xs text-slate-400">
                  Supports JPG, PNG, WEBP
                </p>

                <p className="text-xs text-slate-500">
                  Maximum size: 5MB
                </p>

                {selectedFile && (
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* ================= SAVE STATUS ================= */}
            {!selectedFile &&
              !successMessage && (
                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Select an image to enable
                    the Save Photo button.
                  </p>
                </div>
              )}

            {selectedFile && (
              <div className="text-center">
                <p className="text-xs text-emerald-400">
                  ✓ Photo selected and ready to save
                </p>
              </div>
            )}
          </div>

          {/* ================= FIXED FOOTER ================= */}
          <div className="shrink-0 p-4 sm:p-5 border-t border-white/10 bg-[#020617]">

            <div className="flex items-center justify-between gap-3">

              {/* Remove */}
              <div>
                {isCustomPhoto && (
                  <button
                    type="button"
                    id="btn-modal-remove-photo"
                    onClick={
                      handleRemovePhoto
                    }
                    disabled={
                      isProcessing
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium transition cursor-pointer disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />

                    <span className="hidden sm:inline">
                      Remove Photo
                    </span>

                    <span className="sm:hidden">
                      Remove
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
                    handleCloseModal
                  }
                  disabled={
                    isProcessing
                  }
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition cursor-pointer disabled:opacity-40"
                >
                  Cancel
                </button>

                {/* SAVE PHOTO */}
                <button
                  type="button"
                  id="btn-modal-save-photo"
                  onClick={
                    handleApplyPhoto
                  }
                  disabled={
                    !selectedFile ||
                    !previewUrl ||
                    isProcessing
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold text-xs shadow-xl shadow-blue-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}

                  <span>
                    {isProcessing
                      ? 'Saving...'
                      : 'Save Photo'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePhotoUploader;
