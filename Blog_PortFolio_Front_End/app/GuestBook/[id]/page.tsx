"use client";

import { useEffect, useState } from "react";
import { getGuestbooks } from "@/utils/api";
import { Guestbook } from "@/types/Guestbook";
import Link from "next/link";

export default function GuestBookPage() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestbooks = async () => {
      const data = await getGuestbooks();
      setGuestbooks(data);
      setLoading(false);
    };

    fetchGuestbooks();
  }, []);

  if (loading) return <div className="text-white">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">뒤로가기</Link>
          <Link href="/GuestBook/register">방명록 작성</Link>
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">GUESTBOOK</h1>

        {guestbooks.length === 0 ? (
          <p className="text-gray-400 text-center">
            아직 작성된 방명록이 없습니다.
          </p>
        ) : (
          <div className="grid gap-6">
            {guestbooks.map((guestbook) => (
              <Link
                key={guestbook.id}
                href={`/components/GuestBook/${guestbook.id}`}
                className="block p-6 bg-white/10 rounded-lg text-white"
              >
                <h3>{guestbook.author}</h3>
                <p>{guestbook.content}</p>
                <span className="text-sm text-gray-400">
                  {new Date(guestbook.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
