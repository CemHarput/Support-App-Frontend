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

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<Category[]>("/v1/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori çekilemedi", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/v1/tickets", {
        heading: title,
        description,
        categoryId: category,
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
    </Container>
  );
};

export default Dashboard;
