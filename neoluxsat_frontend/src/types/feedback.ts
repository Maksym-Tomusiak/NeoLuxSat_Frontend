export interface FeedbackDto {
  id: string;
  author: string;
  content: string;
}

export interface FeedbackCreateDto {
  author: string;
  content: string;
}

export interface FeedbackUpdateDto {
  id: string;
  author: string;
  content: string;
}
