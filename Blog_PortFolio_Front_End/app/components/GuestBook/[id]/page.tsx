import { getGuestbook } from "@/utils/api";
import DeleteButton from "./DeleteButton/DeleteButton";
import Link from "next/link";

type Params = { id: string };

export default async function Page({
  params,
}: {
  params: Promise<Params> | Params;
}) {
  const { id } = await params;
  const guestbook = await getGuestbook(id);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/components/GuestBook"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            목록으로
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {guestbook.data.author}님의 방명록
                </h1>
                <p className="text-gray-400">
                  {new Date(guestbook.data.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {guestbook.data.content}
              </p>
            </div>

            <div className="flex justify-end">
              <DeleteButton id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
