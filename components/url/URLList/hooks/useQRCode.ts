import { useState } from "react";
import QRCode from "qrcode";

type QRCodeReturnType = {
  qrCodeUrl: string | null;
  selectedQR: string | null;
  generate: (shortUrl: string) => Promise<void>;
  reset: () => void;
};

export const useQRCode = (): QRCodeReturnType => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const generate = async (shortUrl: string): Promise<void> => {
    try {
      const qr = await QRCode.toDataURL(shortUrl, {
        width: 256,
        margin: 2,
        color: { dark: "#000000", light: "#FFFFFF" },
      });
      setQrCodeUrl(qr);
      setSelectedQR(shortUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const reset = (): void => {
    setQrCodeUrl(null);
    setSelectedQR(null);
  };

  return { qrCodeUrl, selectedQR, generate, reset };
};
