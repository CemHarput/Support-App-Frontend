import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../api/axios";
import { Ticket } from "../interfaces/Ticket";

const AdminPanel = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [responseMap, setResponseMap] = useState<Record<number, string>>({});
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const fetchTickets = async () => {
    const res = await api.get("/v1/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdate = async (ticketId: number) => {
    const answer = responseMap[ticketId];
    await api.patch(`/v1/tickets/answer`, {
      ticketId: ticketId,
      answer: answer,
    });
    fetchTickets();
  };

  const handleClose = async (ticketId: number) => {
    await api.patch(`/v1/tickets/status`, {
      ticketId: ticketId,
      status: "CLOSED",
    });
    fetchTickets();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" mt={4} mb={2}>
        Admin Panel
      </Typography>

      <Select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        sx={{ mb: 3, width: 200 }}
      >
        <MenuItem value="ALL">Hepsi</MenuItem>
        <MenuItem value="OPEN">Açık</MenuItem>
        <MenuItem value="ANSWERED">Yanıtlandı</MenuItem>
        <MenuItem value="CLOSED">Kapalı</MenuItem>
      </Select>

      {tickets
        .filter(
          (ticket) =>
            selectedStatus === "ALL" || ticket.status === selectedStatus
        )
        .map((ticket) => (
          <Card key={ticket.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{ticket.title}</Typography>
              <Typography color="text.secondary">
                {ticket.description}
              </Typography>
              <Typography color="text.secondary">
                Kategori: {ticket.categoryName}
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
                  setResponseMap({
                    ...responseMap,
                    [ticket.id]: e.target.value,
                  })
                }
                disabled={
                  ticket.status === "ANSWERED" || ticket.status === "CLOSED"
                }
              />

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(ticket.id)}
                  disabled={ticket.status !== "OPEN"}
                >
                  Yanıtla
                </Button>

                {ticket.status === "ANSWERED" && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClose(ticket.id)}
                  >
                    Kapat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
};

export default AdminPanel;
