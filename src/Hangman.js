import React, { useState, useEffect, Component } from "react";
import randomWord from "./Words";
import "./Hangman.css";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

//imports 6imagaes from images to show the different arms
import step0 from "./images/0.png";
import step1 from "./images/1.png";
import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";
import step6 from "./images/6.png";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    //i dont have images yet so i wont be passing those in.
    images: [step0, step1, step2, step3, step4, step5, step6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    };
  }

  guessedWord() {
    return this.state.answer.split("").map((letter) => {
      if (this.state.guessed.has(letter)) {
        return letter;
      } else {
        return " _ ";
      }
    });
    //   .map(letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <Button
        variant={"contained"}
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </Button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "you won!";
    }

    if (gameOver) {
      gameStat = "you lost!";
    }

    return (
      <div className="hangman-container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: 1,
            p: 1,
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            margin: "0%",
          }}
        >
          <Typography component={"span"}>
            <h1>Hangman</h1>
          </Typography>
        </Box>

        <div className="wrong-guesses">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
            <Typography component={"span"}></Typography>
          </Box>
        </div>
        <div className="images">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              m: 1,
              p: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              border: "2px",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
              margin: "2%",
            }}
          >
            <ImageList
              sx={{
                display: "flex",
                boxShadow: 10,
                borderRadius: "10px",
              }}
            >
              <ImageListItem>
                <img
                  src={this.props.images[this.state.mistake]}
                  alt="hangman"
                />
              </ImageListItem>
            </ImageList>

            <Typography
              component={"span"}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "30%",
                textAlign: "center",
              }}
            >
              <p>Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</p>
              <p>Guess the Programming Language</p>
              <p>{!gameOver ? this.guessedWord() : this.state.answer}</p>
              <button>{gameStat}</button>
              <br />
              <Button
                className="reset-button"
                variant="contained"
                onClick={this.resetButton}
              >
                Reset
              </Button>
            </Typography>
          </Box>
        </div>
        <div className="instructions">
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
            <Typography component={"span"}></Typography>
          </Box>
        </div>
      </div>
    );
  }
}

export default Hangman;
