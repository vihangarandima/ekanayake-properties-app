import React, { useState, useEffect } from "react";
import propertiesData from "../data/properties.json";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
  Paper,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();

  // --- STATE ---
  const [type, setType] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState(10);
  const [dateFilter, setDateFilter] = useState("");
  const [postcode, setPostcode] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fav_list")) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (property) => {
    const isFav = favorites.find((fav) => fav.id === property.id);
    if (isFav) removeFromFavorites(property.id);
    else addToFavorites(property);
  };

  const addToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      const updated = [...favorites, property];
      setFavorites(updated);
      localStorage.setItem("fav_list", JSON.stringify(updated));
    }
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("fav_list", JSON.stringify(updated));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("fav_list");
  };

  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  const handleOnDrop = (e) => {
    const id = e.dataTransfer.getData("propertyId");
    const property = propertiesData.properties.find((p) => p.id === id);
    if (property) addToFavorites(property);
  };

  const filteredProperties = propertiesData.properties.filter((house) => {
    const matchesType = type === "any" || house.type === type;
    const matchesPrice =
      house.price >= priceRange[0] && house.price <= priceRange[1];
    const matchesBedrooms =
      house.bedrooms >= minBedrooms && house.bedrooms <= maxBedrooms;
    const matchesPostcode = house.postcode
      .toLowerCase()
      .startsWith(postcode.toLowerCase());
    let matchesDate = true;
    if (dateFilter) {
      const propDate = new Date(
        house.added.year,
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].indexOf(house.added.month),
        house.added.day
      );
      matchesDate = propDate >= new Date(dateFilter);
    }
    return (
      matchesType &&
      matchesPrice &&
      matchesBedrooms &&
      matchesPostcode &&
      matchesDate
    );
  });

  return (
    <Box
      sx={{ bgcolor: "#020617", minHeight: "100vh", color: "white", pb: 10 }}
    >
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <Box
        sx={{
          position: "relative",
          py: 12,
          textAlign: "center",
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.5)), url('/images/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Parallax effect for professional look
        }}
      >
        <Typography
          variant="h2"
          fontWeight="900"
          sx={{
            mb: 1,
            letterSpacing: "-2px",
            textShadow: "0px 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          EKANAYAKE <span style={{ color: "#22d3ee" }}>ESTATES</span>
        </Typography>

        <Box sx={{ maxWidth: "750px", mx: "auto", mb: 6, px: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#22d3ee",
              fontWeight: 400,
              fontStyle: "italic",
              mb: 1,
            }}
          >
            "Excellence in Every Acre"
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#e2e8f0", lineHeight: 1.7, fontWeight: 300 }}
          >
            Ekanayake Estates is a premier property consultancy specializing in
            luxury residential acquisitions. Discover extraordinary living
            spaces tailored to your vision.
          </Typography>
        </Box>

        {/* --- SEARCH WIDGET (GLASSMORPHISM) --- */}
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 8,
              bgcolor: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="standard"
                  onChange={(e) => setPostcode(e.target.value)}
                  InputProps={{ sx: { color: "white" } }}
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth variant="standard">
                  <InputLabel sx={{ color: "#94a3b8" }}>Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    sx={{ color: "white" }}
                  >
                    <MenuItem value="any">Any Style</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Flat">Flat</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={1}>
                <TextField
                  fullWidth
                  type="number"
                  label="Min Bed"
                  variant="standard"
                  value={minBedrooms}
                  onChange={(e) => setMinBedrooms(Number(e.target.value))}
                  InputProps={{ sx: { color: "white" } }}
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                />
              </Grid>
              <Grid item xs={6} md={1}>
                <TextField
                  fullWidth
                  type="number"
                  label="Max Bed"
                  variant="standard"
                  value={maxBedrooms}
                  onChange={(e) => setMaxBedrooms(Number(e.target.value))}
                  InputProps={{ sx: { color: "white" } }}
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  label="Added Since"
                  InputLabelProps={{ shrink: true, sx: { color: "#94a3b8" } }}
                  onChange={(e) => setDateFilter(e.target.value)}
                  variant="standard"
                  InputProps={{ sx: { color: "white" } }}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <Typography
                  variant="caption"
                  sx={{ color: "#22d3ee", display: "block", mb: 1 }}
                >
                  Max Price: £{priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={priceRange[1]}
                  onChange={(e, v) => setPriceRange([0, v])}
                  min={0}
                  max={2000000}
                  step={50000}
                  sx={{ color: "#22d3ee" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* --- CONTENT AREA --- */}
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8.5}>
            <Typography variant="h5" fontWeight="700" sx={{ mb: 4 }}>
              Curated Listings ({filteredProperties.length})
            </Typography>
            <Grid container spacing={4}>
              {filteredProperties.map((house) => (
                <Grid item xs={12} md={6} key={house.id}>
                  <Card
                    draggable
                    onDragStart={(e) => handleDragStart(e, house.id)}
                    sx={{
                      bgcolor: "#19233bff",
                      borderRadius: 6,
                      transition: "0.3s",
                      cursor: "grab",
                      border: "1px solid rgba(255,255,255,0.05)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 20px 40px -20px #22d3ee`,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="260"
                      image={`/${house.images[0]}`}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: "white" }}
                      >
                        £{house.price.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8", mb: 3 }}
                      >
                        {house.bedrooms} Bed {house.type} • {house.postcode}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => navigate(`/property/${house.id}`)}
                          sx={{
                            bgcolor: "#22d3ee",
                            color: "black",
                            fontWeight: "bold",
                            borderRadius: 2,
                          }}
                        >
                          View Details
                        </Button>
                        <IconButton
                          onClick={() => toggleFavorite(house)}
                          sx={{ color: "#22d3ee" }}
                        >
                          {favorites.find((f) => f.id === house.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* SIDEBAR */}
          <Grid item xs={12} lg={3.5}>
            <Box sx={{ position: "sticky", top: 30 }}>
              <Paper
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleOnDrop}
                sx={{
                  p: 3,
                  borderRadius: 6,
                  bgcolor: "rgba(255, 255, 255, 0.02)",
                  border: "1px dashed rgba(255, 255, 255, 0.1)",
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#22d3ee" }}
                  >
                    SHORTLIST
                  </Typography>
                  <Chip
                    label={favorites.length}
                    size="small"
                    sx={{ bgcolor: "#22d3ee", fontWeight: "bold" }}
                  />
                </Box>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  {favorites.map((fav) => (
                    <Paper
                      key={fav.id}
                      sx={{
                        p: 1.5,
                        bgcolor: "#0f172a",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        borderRadius: 4,
                      }}
                    >
                      <img
                        src={`/${fav.images[0]}`}
                        width="55"
                        height="55"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          £{fav.price.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          {fav.postcode}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeFromFavorites(fav.id)}
                        sx={{ color: "#f87171" }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  ))}
                </Stack>
                {favorites.length > 0 && (
                  <Button
                    fullWidth
                    onClick={clearAllFavorites}
                    sx={{ mt: 2, color: "#f87171", fontWeight: "bold" }}
                  >
                    Clear Shortlist
                  </Button>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SearchPage;
