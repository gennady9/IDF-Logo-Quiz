import type { ImageSourcePropType } from "react-native";

export type CategoryIcon =
  | "unit-tag"
  | "rank"
  | "beret"
  | "beret-pin"
  | "pin"
  | "flag"
  | "decoration";

export interface QuizItem {
  id: string;
  nameHe: string;
  answers: string[];
  categoryId: string;
  image: ImageSourcePropType | null;
}

export interface Category {
  id: string;
  nameHe: string;
  accent: string;
  icon: CategoryIcon;
  children: Category[];
  items: QuizItem[];
}

export type UserProgress = Record<string, boolean>;
