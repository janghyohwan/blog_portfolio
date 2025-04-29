"use client";

import { useRouter } from "next/navigation";
import { deleteGuestbook } from "@/utils/api";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("정말로 이 방명록을 삭제하시겠습니까?")) {
      try {
        await deleteGuestbook(id.toString());
        router.push("/guestbook");
      } catch (error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    >
      삭제
    </button>
  );
}
