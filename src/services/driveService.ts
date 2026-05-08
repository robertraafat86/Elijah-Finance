export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export async function fetchDriveImages(): Promise<DriveFile[]> {
  try {
    const response = await fetch('/api/drive-images');
    if (!response.ok) throw new Error('Failed to fetch drive images');
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error in fetchDriveImages:', error);
    return [];
  }
}

export function getDirectDriveUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
