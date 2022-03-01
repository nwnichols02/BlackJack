import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Homepage() {
  const navigate = useNavigate();
  const blackjackRoute = () => {
    navigate("/blackjack");
  };
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "2%",
          }}
        >
          <Typography component={"span"} align="center">
            <h1>Welcome to AMili Games!</h1>
          </Typography>
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: 'center',
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "2%",
          }}
        >
          <Typography component={"span"} align="center">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" disabled>
                Play Hangman
              </Button>
              <Button variant="outlined" disabled>
                Play Tic Tac Toe
              </Button>
              <Button variant="outlined" disabled>
                Play Memory
              </Button>
              <Button variant="outlined" disabled>
                Play MineSweeper
              </Button>
              <Button
                id="play-blackjack"
                variant="contained"
                size="large"
                onClick={blackjackRoute}
              >
                Play BlackJack
              </Button>
            </Stack>
          </Typography>
        </Box>
      </div>
    </div>
  );
}

export default Homepage;
