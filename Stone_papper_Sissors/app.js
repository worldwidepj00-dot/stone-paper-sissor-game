let userScore = 0;
let compScore = 0;
let roundCount = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundPara = document.querySelector("#round-count");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was Draw. Play again!";
    msg.style.backgroundColor = "#081b31";
    msg.parentElement.classList.remove("winner-animation");
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        msg.parentElement.classList.add("winner-animation");
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        msg.parentElement.classList.add("winner-animation");
    }
    
    setTimeout(() => {
        msg.parentElement.classList.remove("winner-animation");
    }, 500);
};

const updateRoundCounter = () => {
    roundCount++;
    roundPara.innerText = `Round: ${roundCount}`;
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
    updateRoundCounter();
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    roundCount = 0;
    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    roundPara.innerText = "Round: 0";
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
    msg.parentElement.classList.remove("winner-animation");
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", resetGame);