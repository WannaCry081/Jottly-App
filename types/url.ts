export type UrlRequest = {
  ownerId: string;
  url: string;
  password?: string;
};

export type Url = {
  id: string;
  ownerId: string;
  originalUrl: string;
  code: string;
  password: string | null;
  createdAt: Date;
  clicks: number;
};
