import type { ReactNode } from 'react';

// A single item in a modal's bullet list
export type ContentListItem = {
  lead?: string;
  text: string;
};

// A single content block (e.g., a paragraph with an optional list)
export type ContentBlock = {
  type: 'paragraph'; // You could expand this to 'image' | 'video' later
  lead?: string;
  text: string;
  list?: ContentListItem[];
};

// The data for the entire modal
export type ModalData = {
  title: string;
  subtitle: string;
  content: ContentBlock[];
};

// A single clickable point in a card
export type MaterialPoint = {
  id: string;
  title: ReactNode;
  modalContent: ModalData;
};

// A top-level material category card
export type MaterialCategory = {
  id: string;
  icon: ReactNode;
  title: string;
  marginTop: string;
  points: MaterialPoint[];
};
