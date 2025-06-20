export type Guestbook = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
};
export type GuestbookCardProps = {
  guestbook: Guestbook;
};
export type GuestbookRegisterProps = {
  guestbook: Pick<Guestbook, "author" | "content">;
};
