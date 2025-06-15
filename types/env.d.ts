namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ENV: "development" | "production";
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_DATABASE_URL: string;
    NEXT_PUBLIC_SECRET_KEY: string;
  }
}
