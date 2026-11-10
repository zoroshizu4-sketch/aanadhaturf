import QRCode from 'qrcode';

/**
 * Generates a neon-green on obsidian dark QR code Data URL
 */
export async function generateNeonQRCode(
  text: string,
  options?: {
    width?: number;
    margin?: number;
    neonColor?: string;
    bgColor?: string;
  }
): Promise<string> {
  const width = options?.width || 320;
  const margin = options?.margin !== undefined ? options.margin : 2;
  const darkColor = options?.neonColor || '#10ef67';
  const lightColor = options?.bgColor || '#070908';

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width,
      margin,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel: 'H',
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

/**
 * Download a data URL as an image file
 */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
