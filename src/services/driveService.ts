export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  tag?: string;
}

// Static database of images for fully static deployment
const STATIC_IMAGES: DriveFile[] = [
  { 
    id: '1GNQ2fSrGYEDrLYUheMpPcJ14jjpjSqF1', 
    name: 'Hospital Accounting Concept Map', 
    mimeType: 'image/jpeg',
    tag: 'hospital-accounting'
  },
  { 
    id: '1M1WxYIFZjGFhu0ompvAKNe2os4L5NlCj', 
    name: 'Financial Analysis Concept Map', 
    mimeType: 'image/jpeg',
    tag: 'financial-analysis'
  }
];

export async function fetchDriveImages(tag?: string): Promise<DriveFile[]> {
  // Simulate network delay for UI consistency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (tag) {
    return STATIC_IMAGES.filter(img => img.tag === tag);
  }
  return STATIC_IMAGES;
}

export function getDirectDriveUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
