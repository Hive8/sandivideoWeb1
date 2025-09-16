/**
 * Utility functions for handling image URLs
 */

/**
 * Converts Google Drive sharing URLs to direct download URLs
 * @param url - The original Google Drive URL
 * @returns The converted direct download URL
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return url;
  }

  // Check if it's a Google Drive sharing URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Check if it's already a direct Google Drive URL
  if (url.includes('drive.google.com/uc') || url.includes('lh3.googleusercontent.com')) {
    return url;
  }

  // Return the original URL if it's not a Google Drive URL
  return url;
}

/**
 * Processes an image URL to ensure it's compatible with Next.js Image component
 * @param url - The image URL to process
 * @returns The processed URL
 */
export function processImageUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '/placeholder.jpg';
  }

  // Convert Google Drive URLs
  const processedUrl = convertGoogleDriveUrl(url);

  // For other external URLs, return as-is (domains are configured in next.config.ts)
  return processedUrl;
}