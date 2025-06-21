export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "AÇIK" | "YANITLANDI" | "KAPATILDI";
  category: string;
  response?: string;
}
