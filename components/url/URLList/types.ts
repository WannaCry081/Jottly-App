export type URLListItemProps = {
  baseUrl: string;
  originalUrl: string;
  code: string;
  password?: string | null;
  clicks: number;
  qrCodeUrl: string | null;
  selectedQR: string | null;
  generateQRCode: (url: string) => void;
  resetQRCode: () => void;
};

export type PasswordOverlayProps = {
  visible: boolean;
  onToggle: () => void;
};
