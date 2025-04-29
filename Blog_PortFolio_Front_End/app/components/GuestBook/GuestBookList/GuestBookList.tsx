"use client";

import { useEffect, useState } from "react";
import { getGuestbooks } from "@/utils/api";
import { Guestbook } from "@/types/Guestbook";
import Link from "next/link";

export default function GuestBookList() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestbooks = async () => {
      try {
        const data = await getGuestbooks();
        setGuestbooks(data.slice(0, 3)); // 최근 3개만 표시
        setLoading(false);
      } catch (error) {
        console.error("Error fetching guestbooks:", error);
        setLoading(false);
      }
    };

    fetchGuestbooks();
  }, []);

  if (loading) {
    return <div className="text-center py-4 text-white">Loading 중!</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">방명록</h2>
        <Link
          href="/components/GuestBook"
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          더보기
        </Link>
      </div>
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
              className="block p-6 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-colors"
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
      )}
    </div>
  );
}
