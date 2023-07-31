import React, { useState } from "react";
import { useSnackbar } from "notistack";
import {
  Box,
  Stack,
  Button,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const VerifyCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardMM, setCardMM] = useState("");
  const [cardYY, setCardYY] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const verifyCard = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("cardNumber", cardNumber);
    myForm.set("cardCVV", cardCVV);
    myForm.set("cardMM", cardMM);
    myForm.set("cardYY", cardYY);

    try {
      setLoading(true);
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/verify-card",
        myForm,
        config
      );
      if (data.status === "success") {
        enqueueSnackbar(data.message, { variant: "success" });
      }
      if (data.status === "failed") {
        enqueueSnackbar(data.message, { variant: "error" });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography component="h1" sx={{ fontSize: "1.2rem" }}>
        Verify Card
      </Typography>
      <Paper
        component="form"
        sx={{
          padding: "1rem",
          width: { xs: "75%", sm: "50%", md: "25%" },
          maring: "0 auto",
        }}
      >
        <Stack sx={{ display: "flex", gap: "1rem" }}>
          <TextField
            placeholder="XXXX - XXXX - XXXX - XXXX"
            type="number"
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            inputProps={{ maxLength: 16 }}
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength) {
                e.target.value = e.target.value.slice(0, e.target.maxLength);
              }
            }}
          ></TextField>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <TextField
              placeholder="CVV"
              size="small"
              label="Card CVV"
              type="number"
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
              inputProps={{ maxLength: 3 }}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength) {
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
                }
              }}
            ></TextField>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              <TextField
                placeholder="MM"
                label="Card Month"
                size="small"
                type="number"
                value={cardMM}
                onChange={(e) => setCardMM(e.target.value)}
                inputProps={{ maxLength: 2 }}
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength) {
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                  }
                }}
              ></TextField>
              <TextField
                placeholder="YYYY"
                label="Card Year"
                type="number"
                size="small"
                value={cardYY}
                onChange={(e) => setCardYY(e.target.value)}
                inputProps={{ maxLength: 4 }}
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength) {
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                  }
                }}
              ></TextField>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            disabled={loading ? true : false}
            onClick={verifyCard}
          >
            Verify card
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default VerifyCard;
