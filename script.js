const gameBoard = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');
const resetBtn = document.getElementById('reset-btn');

let cards = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="front">?</div>
            <div class="back">${symbol}</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    moveDisplay.textContent = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
        setTimeout(() => alert(`Chúc mừng! Bạn thắng sau ${moves} lượt!`), 500);
    }
    resetTurn();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
    }, 1000);
}

function resetTurn() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

resetBtn.addEventListener('click', () => {
    moves = 0;
    matchedPairs = 0;
    moveDisplay.textContent = moves;
    createBoard();
});

// Khởi tạo game lần đầu
createBoard();