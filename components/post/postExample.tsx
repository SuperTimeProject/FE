"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Board {
  boardCid: number;
  boardName: string;
}

interface IPostInfo {
  author: string;
  createdAt: string;
  postCid: number;
  postTitle: string;
  postView: number;
}

export default function PostExample({
  board,
  boardData,
  length,
}: {
  board: Board;
  boardData: IPostInfo[];
  length: number;
}) {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <div
        className={`${
          length === 3 ? "h-[290px]" : "h-[150px]"
        } w-96 m-2 p-3 border-1 border-[#d1d5db] bg-white overflow-y-auto  scrollbar-none`}
      >
        <main className="pb-1 flex justify-between text-lg tracking-widest items-center border-b-2 border-gray-700 pl-1 pr-1">
          {board.boardName}
        </main>
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          {boardData &&
            boardData.map((post) => (
              <Link
                href={`/board/post/read/${post.postCid}`}
                key={post.postCid}
              >
                <div className="border-b-1 border-gray-400 pb-2 pt-2 cursor-pointer pl-1 flex justify-between">
                  <div>
                    <span className="flex text-medium">
                      {post?.postTitle && post.postTitle.length > 12
                        ? post.postTitle.slice(0, 12) + "..."
                        : post?.postTitle}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>{post.author} |</span>
                    <span>{post.createdAt} |</span>
                    <span>{post.postView}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
