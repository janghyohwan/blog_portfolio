// app/components/GuestBook/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getGuestbooks } from "@/utils/api";
import Link from "next/link";
import { Guestbook } from "@/types/Guestbook";

export default function GuestBookPage() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestbooks = async () => {
      try {
        const data = await getGuestbooks();
        setGuestbooks(data);
      } catch (error) {
        console.error("방명록 로딩 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestbooks();
  }, []);

  if (loading) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            뒤로가기
          </Link>
          <Link
            href="/components/GuestBook/register"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            방명록 작성
          </Link>
        </div>

        <div className="grid gap-6">
          {guestbooks.map((guestbook) => (
            <Link
              key={guestbook.id}
              href={`/components/GuestBook/${guestbook.id}`}
              className="block p-6 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">{guestbook.author}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(guestbook.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-300 line-clamp-2">
                {guestbook.content}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
