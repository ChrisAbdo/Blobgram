import { list } from "@vercel/blob";
export const runtime = "edge";

export async function GET(_req: Request) {
  const { blobs, cursor } = await list();
  return new Response(JSON.stringify({ blobs, cursor }), {
    headers: { "Content-Type": "application/json" },
  });
}
