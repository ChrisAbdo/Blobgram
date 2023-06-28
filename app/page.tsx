import React from "react";
import { prisma } from "@/prisma/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CameraIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  DrawingPinIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none space-y-6">
          <Card>
            <CardHeader className="sticky top-0 bg-background/80 backdrop-blur-2xl rounded-xl">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/66892203?v=4" />
                    <AvatarFallback>
                      <CameraIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1>Chris Abdo</h1>
                    <Badge>
                      <DrawingPinIcon className="w-4 h-4 mr-1" />
                      Pinned
                    </Badge>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <DotsHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Image</DropdownMenuItem>
                    <DropdownMenuItem disabled>Placeholder</DropdownMenuItem>
                    <DropdownMenuItem disabled>Share</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              {/* <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-[500px] h-[500px] object-cover"
                  /> */}
              <h1>img</h1>
            </CardContent>
            <CardFooter>
              <div>
                Welcome! This is an open source social media template built with
                Next.js, Vercel Blob, NextAuth, Prisma, and TailwindCSS. You can
                find the source code{" "}
                <Link href="/" className="underline">
                  on the GitHub repo.
                </Link>
              </div>
            </CardFooter>
          </Card>
          {posts.map((post) => (
            // <div key={post.id}>
            // <time dateTime={post.createdAt.toISOString()}>
            //   {new Intl.DateTimeFormat("en-US", {
            //     dateStyle: "full",
            //   }).format(post.createdAt)}
            // </time>
            //   <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            //     {post.caption}
            //   </h1>
            //   <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
            //     <h1>{post.imageUrl}</h1>

            //     <img src={post.author?.image!} alt={post.author?.name!} />
            //     <span>{post.author?.name}</span>
            //   </div>
            // </div>
            <div key={post.id}>
              <Card>
                <CardHeader className="sticky top-0 bg-background/80 backdrop-blur-2xl rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={post.author?.image!} />
                        <AvatarFallback>
                          <CameraIcon />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h1>{post.author?.name}</h1>
                        <time
                          dateTime={post.createdAt.toISOString()}
                          className="text-muted-foreground"
                        >
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "full",
                          }).format(post.createdAt)}
                        </time>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <DotsHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Image</DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          Placeholder
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>Share</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex justify-center">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-[500px] h-[500px] object-cover mt-6"
                  />
                </CardContent>
                <Separator />
                <CardFooter>
                  <div className="flex flex-col space-y-6">
                    <div className="mt-4">
                      <span className="font-semibold">{post.author?.name}</span>
                      &nbsp;{post.caption}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="ghost">
                        <HeartFilledIcon className="mr-2" /> 0 Likes
                      </Button>
                      <Button variant="ghost">
                        <ChatBubbleIcon className="mr-2" /> 0 Comments
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
