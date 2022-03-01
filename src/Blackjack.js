import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const api_url = "https://deckofcardsapi.com/api";

export default function BlackJack(props) {
  const [deckId, setDeckId] = useState();
  const [playerDeck, setPlayerDeck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState();

  useEffect(() => {
    let deck_id = localStorage.getItem("deck_id");
    let player_deck = JSON.parse(localStorage.getItem("player_deck"));
    let dealer_deck = JSON.parse(localStorage.getItem("dealer_deck"));
    if (deck_id) {
      setDeckId(deck_id);
    }
    if (player_deck) {
      setPlayerDeck(player_deck);
    }
    if (dealer_deck) {
      setDealerDeck(dealer_deck);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("deck_id", deckId);
    localStorage.setItem("player_deck", JSON.stringify(playerDeck));
    localStorage.setItem("dealer_deck", JSON.stringify(dealerDeck));
  }, [deckId, playerDeck, dealerDeck]);

  //deleted async and await
  useEffect(() => {
    const gameResult = () => {
      const playerDeckVal = playerDeckValue();
      const dealerDeckVal = dealerDeckValue();
      if (playerDeckVal > 21 || dealerDeckValue === 21) {
        // console.log("Dealer Wins");
        setGameOver(true);
        setWinner("Dealer");
      }
      if(dealerDeckValue === 21) {
        setGameOver(true);
        setWinner("Dealer");
      }
      if (
        playerDeckVal === 21 ||
        (dealerDeckValue > 21 && playerDeckVal < 21)
      ) {
        console.log("Player Wins");
        setGameOver(true);
        setWinner("Player");
      }
      if (playerDeckVal === 21 && dealerDeckVal === 21) {
        // console.log("Push");
        setGameOver(true);
        setWinner(null);
      }
      if (dealerDeckVal > 21 && playerDeckVal < 21) {
        setGameOver(true);
        setWinner("Player");
      }
      if (playerDeckVal < dealerDeckVal && dealerDeckVal < 21) {
        // setGameOver(true);
        // setWinner("Dealer");
      }

      //player stood and the dealer needs to keep drawing until its over stand value or less than 21.
    };
    gameResult();
  });

  const dealGame = async () => {
    let response = await axios.get(`${api_url}/deck/new/shuffle/?deck_count=6`);
    // console.log(response.data);
    let deck_id = await response.data.deck_id;
    setDeckId(deck_id);
    let player_deck = [];
    let dealer_deck = [];
    let drawn_cards = await axios.get(
      `${api_url}/deck/${deck_id}/draw/?count=3`
    );
    player_deck.push(drawn_cards.data.cards[0]);
    player_deck.push(drawn_cards.data.cards[1]);
    dealer_deck.push(drawn_cards.data.cards[2]);
    setDealerDeck(dealer_deck);
    setPlayerDeck(player_deck);
  };

  //revert back
  const resetGame = () => {
    localStorage.clear();
    setGameOver(false);
    setWinner("");
    setDealerDeck([]);
    setPlayerDeck([]);
    setDeckId();
  };

  //player hits
  const playerHit = async () => {
    if (playerDeck.length < 7) {
      const response = await axios.get(
        `${api_url}/deck/${deckId}/draw/?count=1`
      );
      const card_data = await response.data.cards[0];
      //   console.log(card_data);
      setPlayerDeck((playerDeck) => [...playerDeck, card_data]);
    } else {
      // is this right does this work
      setWinner("Dealer");
      setGameOver(true);
      //   console.log(`Max deck length`);
    }
  };

  //player stands working kinda
    const playerStands = async (playerDeckVal, dealerDeckValue) => {
      //needs to be cumulitive to equal 21 not the same amount of cards as player
      let cardsForDealer = playerDeck.length;
      // console.log(cardsForDealer);
      const response = await axios.get(
        `${api_url}/deck/${deckId}/draw/?count=${cardsForDealer}`
      );
      for (let i = 0; i < cardsForDealer - 1; i++) {
        let dealer_card = await response.data.cards[i];
        setDealerDeck((dealerDeck) => [...dealerDeck, dealer_card]);
      }
      if (playerDeckVal > 21 || dealerDeckValue === 21) {
        // console.log("Dealer Wins");
        setGameOver(true);
        setWinner("Dealer");
      }
    };
//   const playerStands = async (playerDeckValue, dealerDeckValue) => {
//       //re run the api to get more than 1 card. 
//     const response = await axios.get(`${api_url}/deck/${deckId}/draw/?count=3`);
//     .then(() =>
//     if (dealerDeckValue < playerDeckValue) {
//         for (let i = 0; i < playerDeck.length; i++) {
//           setTimeout(() => {
//             let dealer_card = response.data.cards[1];
//             setDealerDeck((dealerDeck) => [...dealerDeck, dealer_card]);
//           }, 1000);
//         }
//       }
//     )
 
//       .catch(err => console.error(err))
//     // let dealer_card = await response.data.cards[2];
//     // setDealerDeck((dealerDeck) => [...dealerDeck, dealer_card]);
//   };

    // if (dealerDeckVal < playerDeckVal) {
    //   for (let i = 0; i < playerDeck.length; i++) {
    //     setTimeout(() => {
    //       let dealer_card = response.data.cards[1];
    //       setDealerDeck((dealerDeck) => [...dealerDeck, dealer_card]);
    //     }, 1000);
    //   }
    // }

  //   if player total is less

  //if player stands then dealer draws until

  //check the value of player deck after each hit.
  const playerDeckValue = () => {
    let cardSum = 0;
    playerDeck.forEach((card) => {
      let val = getCardVal(card);
      cardSum = cardSum + val;
    });
    // console.log("Player Deck Value: ", cardSum);
    return cardSum;
  };

  const dealerDeckValue = () => {
    let cardSum = 0;
    dealerDeck.forEach((card) => {
      let val = getCardVal(card);
      cardSum = cardSum + val;
    });
    return cardSum;
  };

  //convert the card value from string to an integer
  const getCardVal = (card) => {
    let card_val = card.value;
    // console.log(card_val);
    if (card_val === "KING" || card_val === "QUEEN" || card_val === "JACK") {
      card_val = 10;
    } else if (card_val === "ACE") {
      card_val = 11;
      // or 1 depending on what you want it is either 1 or 11 as a wild
    } else {
      card_val = parseInt(card_val);
    }
    return card_val;
  };

  //display the winner of the game
  const GameOver = ({ isGameOver }) => {
    if (isGameOver === true) {
      return (
        <div className="declare-winner-container">
          <h1 className="declare-winner">{winner} wins</h1>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="form-container">
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
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          margin: "2%",
        }}
      >
        <Typography component={"span"}>
          <h1 className="title">BlackJack</h1>
        </Typography>
      </Box>

      <div className="dealer-container">
        <div className="dealer-cards">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "row",
              m: 1,
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              fontSize: "0.875rem",
              fontWeight: "700",
              margin: "2%",
            }}
          >
            {dealerDeck.map((card) => {
              return (
                <div key={card.code}>
                  <ImageList
                    sx={{
                      boxShadow: 10,
                      display: "flex",
                      margin: "15%",
                      borderRadius: "10px",
                    }}
                  >
                    <ImageListItem>
                      <img src={card.image} alt={card.value} />
                    </ImageListItem>
                  </ImageList>
                </div>
              );
            })}
          </Box>
        </div>
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "row",
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "2%",
          }}
        >
          <h2 className="dealer-title">Dealer: </h2>
          <h2> {dealerDeckValue(dealerDeck)}</h2>
        </Box>
      </div>
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
            fontSize: "0.875rem",
            fontWeight: "700",
            color: "red",
          }}
        >
          <GameOver isGameOver={gameOver} className="game-over" />
        </Box>
      </div>
      <div className="buttons">
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
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "2%",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={dealGame}>
              Deal
            </Button>
            <Button variant="contained" onClick={playerHit}>
              Hit Me
            </Button>
            <Button variant="contained" onClick={playerStands}>
              Stand
            </Button>
            <Button variant="contained" onClick={resetGame}>
              Reset Game
            </Button>
          </Stack>
        </Box>
      </div>

      <div className="player-container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "row",
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "2%",
          }}
        >
          <h2 className="player-title">Player: </h2>
          <h2> {playerDeckValue(playerDeck)}</h2>
        </Box>
        <div className="player-cards">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "row",
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
            {playerDeck.map((card) => {
              return (
                <div key={card.code}>
                  <ImageList
                    sx={{
                      boxShadow: 10,
                      display: "flex",
                      margin: "15%",
                      borderRadius: "10px",
                    }}
                  >
                    <ImageListItem>
                      <img src={card.image} alt={card.value} />
                    </ImageListItem>
                  </ImageList>
                </div>
              );
            })}
          </Box>
        </div>
      </div>
    </div>
  );
}
