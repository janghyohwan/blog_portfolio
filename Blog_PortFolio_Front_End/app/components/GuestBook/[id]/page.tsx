import { getGuestbook } from "@/utils/api";
import DeleteButton from "./DeleteButton.tsx/DeleteButton";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const guestbook = await getGuestbook(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {guestbook.data.author}님의 방명록
      </h1>
      <p className="text-gray-700">{guestbook.data.content}</p>
      <DeleteButton id={id} />
    </div>
  );
};

export default Page;
