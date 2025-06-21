import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import api from "../api/axios";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tickets", {
        title,
        description,
        category,
      });
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
          label="Kategori"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Gönder
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
