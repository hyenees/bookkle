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
