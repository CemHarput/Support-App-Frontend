import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import api from "../api/axios";
import { Ticket } from "../interfaces/Ticket";

const AdminPanel = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [responseMap, setResponseMap] = useState<Record<number, string>>({});

  const fetchTickets = async () => {
    const res = await api.get("/v1/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdate = async (ticketId: number, status: string) => {
    const response = responseMap[ticketId];
    await api.put(`/v1/tickets/${ticketId}`, {
      response,
      status,
    });
    fetchTickets();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" mt={4} mb={2}>
        Admin Panel
      </Typography>
      {tickets.map((ticket) => (
        <Card key={ticket.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{ticket.title}</Typography>
            <Typography color="text.secondary">{ticket.description}</Typography>
            <Typography color="text.secondary">
              Kategori: {ticket.category}
            </Typography>
            <Typography color="text.secondary">
              Durum: {ticket.status}
            </Typography>
            <TextField
              label="Yanıt"
              fullWidth
              multiline
              minRows={2}
              sx={{ mt: 2 }}
              value={responseMap[ticket.id] || ""}
              onChange={(e) =>
                setResponseMap({ ...responseMap, [ticket.id]: e.target.value })
              }
            />
            <TextField
              select
              label="Durum Güncelle"
              defaultValue=""
              sx={{ mt: 2, width: 200 }}
              onChange={(e) => handleUpdate(ticket.id, e.target.value)}
            >
              <MenuItem value="YANITLANDI">Yanıtlandı</MenuItem>
              <MenuItem value="KAPATILDI">Kapatıldı</MenuItem>
            </TextField>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AdminPanel;
