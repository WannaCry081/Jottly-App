import { UrlRedirectPage } from "@/components/url/UrlRedirect";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <main>
      <UrlRedirectPage code={code} />
    </main>
  );
}
