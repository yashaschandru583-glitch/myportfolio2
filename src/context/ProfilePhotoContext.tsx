import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredProfilePhoto,
  saveProfilePhoto,
  removeStoredProfilePhoto,
  validateProfilePhoto,
  readFileAsDataUrl
} from '../utils/photoStorage';

// Default professional developer avatar SVG as fallback
export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="100" fill="%230f172a"/><circle cx="100" cy="78" r="38" fill="%2338bdf8"/><path d="M42 166C42 134 68 116 100 116C132 116 158 134 158 166" fill="%2338bdf8"/><circle cx="100" cy="78" r="32" fill="%230284c7"/><path d="M48 166C48 138 71 122 100 122C129 122 152 138 152 166" fill="%230284c7"/><text x="100" y="85" text-anchor="middle" fill="%23ffffff" font-size="28" font-family="system-ui,sans-serif" font-weight="bold">YC</text></svg>`;

interface ProfilePhotoContextType {
  photoUrl: string;
  isCustomPhoto: boolean;
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
  updatePhotoFromFile: (file: File) => Promise<{ success: boolean; error?: string }>;
  removePhoto: () => void;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export const ProfilePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(DEFAULT_AVATAR);
  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = getStoredProfilePhoto();
    if (stored) {
      setPhotoUrl(stored);
      setIsCustomPhoto(true);
    }
  }, []);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const updatePhotoFromFile = async (file: File): Promise<{ success: boolean; error?: string }> => {
    const validation = validateProfilePhoto(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      saveProfilePhoto(dataUrl);
      setPhotoUrl(dataUrl);
      setIsCustomPhoto(true);
      return { success: true };
    } catch (err) {
      console.error('Error processing profile photo:', err);
      return { success: false, error: 'Failed to read image file. Please try another image.' };
    }
  };

  const removePhoto = () => {
    removeStoredProfilePhoto();
    setPhotoUrl(DEFAULT_AVATAR);
    setIsCustomPhoto(false);
  };

  return (
    <ProfilePhotoContext.Provider
      value={{
        photoUrl,
        isCustomPhoto,
        isUploadModalOpen,
        openUploadModal,
        closeUploadModal,
        updatePhotoFromFile,
        removePhoto
      }}
    >
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => {
  const context = useContext(ProfilePhotoContext);
  if (!context) {
    throw new Error('useProfilePhoto must be used within a ProfilePhotoProvider');
  }
  return context;
};
