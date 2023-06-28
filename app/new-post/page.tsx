import React from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import { prisma } from "@/prisma/db";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UploadForm from "@/components/uploader/upload-form";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  async function addPost(formData: FormData) {
    "use server";
    const caption = String(formData.get("caption"));
    const imageUrl = String(formData.get("imageUrl"));
    const authorId = session?.user.id;
    await prisma.post.create({
      data: {
        caption,
        imageUrl,
        authorId,
      },
    });
    console.log("Post created" + caption + imageUrl + authorId);
    redirect("/");
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <UploadForm />

          <form action={addPost}>
            <div className="space-y-12">
              <div className="border-b  pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <Label htmlFor="imageUrl" id="imageUrl">
                      imageUrl
                    </Label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm sm:max-w-md">
                        <Input
                          name="imageUrl"
                          placeholder="Use the form above to generate a URL using Vercel Blob"
                          id="imageUrl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <Label htmlFor="caption" id="caption">
                      caption
                    </Label>

                    <div className="mt-2">
                      <Textarea
                        required
                        id="caption"
                        rows={10}
                        name="caption"
                        placeholder="Content"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button variant="ghost" type="button">
                Clear
              </Button>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
