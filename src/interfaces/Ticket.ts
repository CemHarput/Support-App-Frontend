export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "ANSWERED" | "CLOSED";
  categoryName: string;
  response?: string;
}
