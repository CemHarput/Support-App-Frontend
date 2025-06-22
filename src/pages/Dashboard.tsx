import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import api from "../api/axios";
import { Category } from "../interfaces/Category";
import { Ticket } from "../interfaces/Ticket";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>("/v1/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Kategori çekilemedi", err);
    }
  };
  const fetchTickets = async () => {
    try {
      const res = await api.get<Ticket[]>("/v1/tickets/user");
      setTickets(res.data);
    } catch (err) {
      console.error("Ticketlar çekilemedi", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/v1/tickets", {
        heading: title,
        description,
        categoryId: category,
      });
      await fetchTickets();
      alert("Talep oluşturuldu!");
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (error) {
      alert("Hata oluştu");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" mt={4} mb={2}>
        Destek Talebi Oluştur
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Başlık"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Açıklama"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          select
          label="Kategori"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Gönder
        </Button>
      </Box>

      <Typography variant="h6" mb={2}>
        Taleplerim
      </Typography>
      {tickets.length === 0 ? (
        <Typography color="text.secondary">Henüz bir talebiniz yok.</Typography>
      ) : (
        tickets.map((ticket) => (
          <Box
            key={ticket.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {ticket.title}
            </Typography>
            <Typography color="text.secondary">{ticket.description}</Typography>
            <Typography mt={1}>
              <strong>Kategori:</strong> {ticket.categoryName}
            </Typography>
            <Typography>
              <strong>Durum:</strong> {ticket.status}
            </Typography>
            {ticket.answer && (
              <Typography
                mt={1}
                sx={{ background: "#f1f1f1", p: 1, borderRadius: 1 }}
              >
                <strong>Yanıt:</strong> {ticket.answer}
              </Typography>
            )}
          </Box>
        ))
      )}
    </Container>
  );
};

export default Dashboard;
