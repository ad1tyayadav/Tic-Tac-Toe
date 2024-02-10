let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector(".new-btn");
let resetBtn = document.querySelector(".resetgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = "O"; // Start with player O

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turn = "O"; // Reset to player O
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure box is empty
            box.innerText = turn;
            turn = (turn === "O") ? "X" : "O"; // Switch turns

            checkWinner();
            checkDraw(); // Call the draw function
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // Prevent draw check if there's a winner
            }
        }
    }
};

const checkDraw = () => {
    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        showWinner("Draw"); // Declare it a draw if all boxes are filled
    }
};

const showWinner = (winner) => {
    if (winner === "Draw") {
        msg.innerText = "Game Is Draw";
    } else {
        msg.innerText = `Congratulation, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);