export interface ReviewData {
  id: number;
  book_detail: BookDetail;
  user_info: Nickname;
  title: string;
  book: number;
  user: number;
  quote: string;
  recommend_count: number;
  rating: number;
  content: string;
}

export interface BookDetail {
  id: number;
  title: string;
  author: string;
  image: string;
}

export interface Nickname {
  nickname: string;
}

export interface QuoteInfo {
  book_title: string;
  book_author: string;
  quote: string;
}

export interface InputReview {
  title: string;
  content: string;
  quote: string | null;
  rating: number | null;
}

export interface Profile {
  nickname: string;
  follower_count: number;
}
