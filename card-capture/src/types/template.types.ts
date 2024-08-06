export type TemplateTag = {
  english: string;
  korean: string;
};

export type Phrase = {
  phrases: string[];
  firstEmphasis: string;
  secondEmphasis: string;
};

export type Prompt = {
  phraseDto: Phrase;
  purpose: string;
  color: string;
  model: string;
};

export type Template = {
  id: number;
  userId: number;
  title: string;
  description: string;
  likes: number;
  purchaseCount: number;
  editor: string;
  fileUrl: string;
  templateTags: TemplateTag[];
  prompt: Prompt;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
};

export type TemplateList = Template[];
