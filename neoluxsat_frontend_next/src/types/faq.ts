import type { FaqCategoryDto } from './faqCategory';

export interface FaqDto {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  category: FaqCategoryDto | null;
}

export interface FaqCreateDto {
  question: string;
  answer: string;
  categoryId: string;
}

export interface FaqUpdateDto {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
}
