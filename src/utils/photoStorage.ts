const PROFILE_PHOTO_KEY = 'yashas_c_profile_photo';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGE_WIDTH = 1000;
const MAX_IMAGE_HEIGHT = 1000;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export interface PhotoValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate the uploaded profile photo.
 */
export function validateProfilePhoto(file: File): PhotoValidationResult {
  if (!file) {
    return {
      valid: false,
      error: 'Please select an image.',
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or WEBP image.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB.',
    };
  }

  return {
    valid: true,
  };
}

/**
 * Read a file as a Data URL.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read image.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Unable to read image.'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Resize and compress the image before saving it.
 *
 * This is important because browser localStorage has limited storage.
 */
export function resizeAndCompressImage(
  dataUrl: string,
  maxWidth = MAX_IMAGE_WIDTH,
  maxHeight = MAX_IMAGE_HEIGHT
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      try {
        let width = image.width;
        let height = image.height;

        const scale = Math.min(
          maxWidth / width,
          maxHeight / height,
          1
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        if (!context) {
          reject(new Error('Could not process image.'));
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        // Convert to JPEG to reduce localStorage size.
        const compressedImage = canvas.toDataURL(
          'image/jpeg',
          0.85
        );

        resolve(compressedImage);
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => {
      reject(new Error('Could not process image.'));
    };

    image.src = dataUrl;
  });
}

/**
 * Save the profile photo to browser localStorage.
 */
export async function saveProfilePhoto(file: File): Promise<string> {
  const validation = validateProfilePhoto(file);

  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid profile photo.');
  }

  const dataUrl = await readFileAsDataUrl(file);

  const compressedImage = await resizeAndCompressImage(dataUrl);

  try {
    localStorage.setItem(
      PROFILE_PHOTO_KEY,
      compressedImage
    );
  } catch (error) {
    throw new Error(
      'Unable to save the photo. Please try a smaller image or clear some browser storage.'
    );
  }

  return compressedImage;
}

/**
 * Get the saved profile photo.
 */
export function getSavedProfilePhoto(): string | null {
  try {
    return localStorage.getItem(PROFILE_PHOTO_KEY);
  } catch (error) {
    console.error('Unable to read saved profile photo:', error);
    return null;
  }
}

/**
 * Remove the saved profile photo.
 */
export function removeSavedProfilePhoto(): void {
  try {
    localStorage.removeItem(PROFILE_PHOTO_KEY);
  } catch (error) {
    console.error('Unable to remove profile photo:', error);
  }
}

/**
 * Check whether a custom profile photo exists.
 */
export function hasSavedProfilePhoto(): boolean {
  try {
    return Boolean(localStorage.getItem(PROFILE_PHOTO_KEY));
  } catch (error) {
    return false;
  }
}
