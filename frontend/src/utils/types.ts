export interface Card {
  id: string;
  title: string;
  status: string;
  contact: Contact;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export type ColumnStatus =
  | "New"
  | "To Do"
  | "In Progress"
  | "Done"
  | "Archived";

export type TupleOf<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

type UUID = string;
type DateTimeString = string;
type Color = `#${string}`;

interface Stage {
  id: UUID;
  name: string;
  header_color: Color;
  description: string;
  pipeline: UUID;
  order: number;
  created_at: DateTimeString;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  results: T[];
}

export type StagesResponse = PaginatedResponse<Stage>;
