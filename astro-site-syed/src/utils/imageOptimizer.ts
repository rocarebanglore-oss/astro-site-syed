/**
 * Optimizes Cloudinary URLs for maximum performance
 * - Auto format (WebP/AVIF based on browser)
 * - Auto quality
 * - Auto DPR (device pixel ratio)
 * - Optional width scaling
 */
export function optimizeCloudinary(
  url?: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: 'fill' | 'scale' | 'fit' | 'limit';
  } = {}
): string {
  if (!url) return '';
  if (typeof url !== 'string') return '';
  if (!url.includes('res.cloudinary.com')) return url;

  // If already transformed with f_auto or q_auto, avoid double-transforming
  if (url.includes('/f_auto') || url.includes('/q_auto')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'scale',
  } = options;

  const transformations: string[] = [
    `f_${format}`,   // Auto format (WebP/AVIF)
    `q_${quality}`,  // Auto quality
    `dpr_auto`,      // Auto device pixel ratio (sharp on retina)
  ];

  if (width) {
    transformations.push(`w_${width}`);
  }
  if (height) {
    transformations.push(`h_${height}`);
  }
  if (width || height) {
    transformations.push(`c_${crop}`);
  }

  const transformString = transformations.join(',');

  // Standard Cloudinary URL structure: .../upload/v123456/... or .../upload/...
  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Generate a small thumbnail from Cloudinary URL
 */
export function getCloudinaryThumbnail(url: string, size: number = 200): string {
  return optimizeCloudinary(url, { width: size, height: size, crop: 'fill' });
}

/**
 * Generate a responsive srcset from Cloudinary URL
 */
export function generateCloudinarySrcSet(
  url: string,
  widths: number[] = [600, 900, 1200]
): string {
  if (!url || !url.includes('res.cloudinary.com')) return '';
  return widths
    .map((w) => `${optimizeCloudinary(url, { width: w, quality: 'auto:good' })} ${w}w`)
    .join(', ');
}

/**
 * Preload an image (browser cache me daalne ke liye)
 */
export function preloadImage(src: string): void {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = src;
}