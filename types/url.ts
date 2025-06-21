export type URLRequest = {
  ownerId: string;
  url: string;
  password?: string;
};

export type URL = {
  id: string;
  ownerId: string;
  originalUrl: string;
  code: string;
  password: string | null;
  createdAt: Date;
  clicks: number;
};
