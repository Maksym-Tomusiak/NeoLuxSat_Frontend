export interface PropositionDto {
  id: string;
  title: string;
  content: string;
  endDate: Date;
  imageUrl: string;
}

export interface PropositionCreateDto {
  title: string;
  content: string;
  endDate: Date;
  image: File;
}

export interface PropositionUpdateDto {
  id: string;
  title: string;
  content: string;
  endDate: Date;
  image: File | null;
}
