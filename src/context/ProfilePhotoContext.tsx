import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import {
  validateProfilePhoto,
  readFileAsDataUrl,
} from '../utils/photoStorage';

// =====================================================
// PERMANENT PROFILE PHOTO
// =====================================================
//
// This image is stored inside the GitHub repository:
//
// src/assets/images/profile-photo.png
//
// Because it is imported by Vite, it becomes part of
// the production website and is available to everyone.
// =====================================================

import PROFILE_PHOTO from '../assets/images/profile-photo.png';

// Default professional developer avatar SVG fallback
export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="100" fill="%230f172a"/><circle cx="100" cy="78" r="38" fill="%2338bdf8"/><path d="M42 166C42 134 68 116 100 116C132 116 158 134 158 166" fill="%2338bdf8"/><circle cx="100" cy="78" r="32" fill="%230284c7"/><path d="M48 166C48 138 71 122 100 122C129 122 152 138 152 166" fill="%230284c7"/><text x="100" y="85" text-anchor="middle" fill="%23ffffff" font-size="28" font-family="system-ui,sans-serif" font-weight="bold">YC</text></svg>`;

interface ProfilePhotoContextType {
  photoUrl: string;
  isCustomPhoto: boolean;
  isUploadModalOpen: boolean;

  openUploadModal: () => void;

  closeUploadModal: () => void;

  updatePhotoFromFile: (
    file: File
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  removePhoto: () => void;
}

const ProfilePhotoContext =
  createContext<
    ProfilePhotoContextType | undefined
  >(undefined);

export const ProfilePhotoProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  // =====================================================
  // IMPORTANT
  // =====================================================
  // The GitHub image is now the permanent photo.
  // =====================================================

  const [
    photoUrl,
    setPhotoUrl,
  ] = useState<string>(PROFILE_PHOTO);

  const [
    isCustomPhoto,
    setIsCustomPhoto,
  ] = useState<boolean>(false);

  const [
    isUploadModalOpen,
    setIsUploadModalOpen,
  ] = useState<boolean>(false);

  // =====================================================
  // INITIALIZE PERMANENT PHOTO
  // =====================================================

  useEffect(() => {
    // Always use the image stored in the repository.
    setPhotoUrl(PROFILE_PHOTO);

    // It is the permanent portfolio photo.
    setIsCustomPhoto(false);
  }, []);

  // =====================================================
  // OPEN MODAL
  // =====================================================

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  // =====================================================
  // TEMPORARY UPLOAD
  // =====================================================
  //
  // IMPORTANT:
  // A GitHub Pages website cannot directly commit a new
  // image into the GitHub repository from a visitor's
  // browser.
  //
  // This function previews/saves the selected photo in
  // the current browser.
  //
  // Your permanent portfolio photo remains PROFILE_PHOTO.
  // =====================================================

  const updatePhotoFromFile = async (
    file: File
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {

    // Validate image
    const validation =
      validateProfilePhoto(file);

    if (!validation.valid) {
      return {
        success: false,
        error:
          validation.error ||
          'Invalid profile photo.',
      };
    }

    try {
      // Read selected image
      const dataUrl =
        await readFileAsDataUrl(file);

      // Save selected photo to browser
      try {
        localStorage.setItem(
          'yashas_c_profile_photo',
          dataUrl
        );
      } catch (storageError) {
        console.warn(
          'Could not save photo to localStorage.',
          storageError
        );
      }

      // Show selected photo immediately
      setPhotoUrl(dataUrl);

      setIsCustomPhoto(true);

      return {
        success: true,
      };

    } catch (error) {
      console.error(
        'Error processing profile photo:',
        error
      );

      return {
        success: false,
        error:
          'Failed to read image file. Please try another image.',
      };
    }
  };

  // =====================================================
  // REMOVE PHOTO
  // =====================================================
  //
  // Removing a temporary browser photo will restore
  // your permanent GitHub profile photo.
  // =====================================================

  const removePhoto = () => {

    try {
      localStorage.removeItem(
        'yashas_c_profile_photo'
      );
    } catch (error) {
      console.warn(
        'Could not remove browser photo.',
        error
      );
    }

    // Restore permanent GitHub photo
    setPhotoUrl(PROFILE_PHOTO);

    setIsCustomPhoto(false);
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        isCustomPhoto,
        isUploadModalOpen,

        openUploadModal,
        closeUploadModal,

        updatePhotoFromFile,
        removePhoto,
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

// =====================================================
// HOOK
// =====================================================

export const useProfilePhoto = () => {

  const context =
    useContext(ProfilePhotoContext);

  if (!context) {
    throw new Error(
      'useProfilePhoto must be used within a ProfilePhotoProvider'
    );
  }

  return context;
};
