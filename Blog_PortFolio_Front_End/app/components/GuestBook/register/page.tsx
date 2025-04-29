"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGuestbook } from "@/utils/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    author: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createGuestbook(formData);
      router.push("/components/GuestBook");
    } catch (error) {
      console.error("Error creating guestbook:", error);
      alert("방명록 작성 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">방명록 작성</h1>
        <Link
          href="/components/GuestBook"
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          목록으로
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-white mb-2"
          >
            작성자
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-white mb-2"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="방명록 내용을 입력해주세요"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/guestbook")}
            className="px-6 py-2 border border-gray-700 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
