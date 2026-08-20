// Utility helper for profile photo validation, storage, and cloud-readiness

export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const STORAGE_KEY = 'yashas_portfolio_profile_photo_v1';

export interface PhotoValidationResult {
  valid: boolean;
  error?: string;
}

export function validateProfilePhoto(file: File): PhotoValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!ALLOWED_PHOTO_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.'
    };
  }

  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeInMB}MB). Maximum allowed size is 5MB.`
    };
  }

  return { valid: true };
}

/**
 * Loads the saved profile photo from browser local storage.
 */
export function getStoredProfilePhoto(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Unable to access localStorage for profile photo:', err);
    return null;
  }
}

/**
 * Saves profile photo data URL to browser local storage.
 * In a future cloud-connected version, this function can upload the File to
 * Cloudinary or Firebase Storage and store the returned public HTTPS URL.
 */
export function saveProfilePhoto(dataUrl: string): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    return true;
  } catch (err) {
    console.error('Failed to save profile photo to localStorage:', err);
    return false;
  }
}

/**
 * Removes the custom profile photo from browser local storage.
 */
export function removeStoredProfilePhoto(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Unable to remove profile photo from localStorage:', err);
  }
}

/**
 * Reads a File and converts it to a base64 Data URL for preview and local storage.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as base64 string'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader error'));
    reader.readAsDataURL(file);
  });
}
