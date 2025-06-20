import axios from "axios";
import { Guestbook } from "@/types/Guestbook";

// 환경변수를 사용하고, 기본값으로 localhost 제공
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 전체 방명록 조회
export const getGuestbooks = async (): Promise<Guestbook[]> => {
  try {
    const response = await axios.get(`${API_URL}/guestbooks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guestbooks:", error);
    throw error;
  }
};

// 단일 방명록 조회
export const getGuestbook = async (
  id: string
): Promise<{
  data: Guestbook;
  success: boolean;
  message: string;
  statusCode: number;
}> => {
  try {
    const response = await axios.get(`${API_URL}/guestbooks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    throw error;
  }
};

// 방명록 작성
export const createGuestbook = async (
  guestbook: Omit<Guestbook, "id" | "createdAt" | "likes">
): Promise<Guestbook> => {
  try {
    const response = await axios.post(`${API_URL}/guestbooks`, guestbook);
    return response.data;
  } catch (error) {
    console.error("Error creating guestbook:", error);
    throw error;
  }
};

// 방명록 삭제
export const deleteGuestbook = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/guestbooks/${id}`);
  } catch (error) {
    console.error("Error deleting guestbook:", error);
    throw error;
  }
};
