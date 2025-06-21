namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SECRET_KEY: string;
    DATABASE_URL: string;
  }
}
