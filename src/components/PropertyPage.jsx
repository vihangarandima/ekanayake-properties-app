import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import propertiesData from "../data/properties.json";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BedIcon from "@mui/icons-material/Bed";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function PropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData.properties.find((p) => p.id === id);

  // Fallback if property isn't found
  if (!property) {
    return (
      <Box
        sx={{
          bgcolor: "#020617",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="white">Property not found</Typography>
      </Box>
    );
  }

  const [selectedImage, setSelectedImage] = useState(property.images[0]);

  return (
    <Box
      sx={{ bgcolor: "#020617", minHeight: "100vh", color: "white", pb: 10 }}
    >
      {/* --- TOP NAVIGATION BAR --- */}
      <Box
        sx={{ py: 3, borderBottom: "1px solid rgba(255,255,255,0.05)", mb: 4 }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ color: "#22d3ee", fontWeight: "bold" }}
          >
            Back to Collection
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* --- LEFT SIDE: GALLERY --- */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 8,
                overflow: "hidden",
                bgcolor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <img
                src={`/${selectedImage}`}
                alt={property.type}
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
            </Paper>

            {/* THUMBNAILS */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3, overflowX: "auto", pb: 1 }}
            >
              {property.images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: "120px",
                    height: "80px",
                    flexShrink: 0,
                    borderRadius: 3,
                    cursor: "pointer",
                    overflow: "hidden",
                    border:
                      selectedImage === img
                        ? "3px solid #22d3ee"
                        : "2px solid transparent",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <img
                    src={`/${img}`}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* --- RIGHT SIDE: DETAILS --- */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "sticky", top: 40 }}>
              <Chip
                label={property.type}
                sx={{
                  bgcolor: "rgba(34, 211, 238, 0.1)",
                  color: "#22d3ee",
                  mb: 2,
                  fontWeight: "bold",
                }}
              />

              <Typography variant="h3" fontWeight="900" sx={{ mb: 1 }}>
                £{property.price.toLocaleString()}
              </Typography>

              <Stack
                direction="row"
                spacing={3}
                sx={{ color: "#94a3b8", mb: 4 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <BedIcon fontSize="small" />
                  <Typography variant="body1">
                    {property.bedrooms} Bedrooms
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body1">{property.postcode}</Typography>
                </Stack>
              </Stack>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

              <Typography variant="h6" fontWeight="700" gutterBottom>
                Property Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#e2e8f0", lineHeight: 1.8, fontWeight: 300 }}
              >
                {property.longDescription}
              </Typography>

              {/* BOOKING ACTION BOX */}
              <Paper
                sx={{
                  mt: 6,
                  p: 3,
                  borderRadius: 6,
                  bgcolor: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#94a3b8", mb: 2 }}
                >
                  Interested in this acquisition?
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#22d3ee",
                    color: "black",
                    fontWeight: "900",
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": { bgcolor: "#06b6d4" },
                  }}
                >
                  Enquire via Ekanayake
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PropertyPage;
