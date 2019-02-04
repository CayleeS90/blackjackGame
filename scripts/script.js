//Blackjack
//by Caylee Stewart

//Card variables
let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

//Element variables
let newGameButton = document.getElementById("new-game-button");
    textArea = document.getElementById("text-area");
    hitButton = document.getElementById("hit-button");
    stayButton = document.getElementById("stay-button");

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()]; 

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function createDeck() {

    let deck = [];
    for (let suitIndx = 0; suitIndx < suits.length; suitIndx++) {
        for (let valueIndx = 0; valueIndx < values.length; valueIndx++){
            let card = {
                suit: suits[suitIndx],
                value: values[valueIndx]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    createDeck();
    for (let i = 0; i < deck.length; i++) {
        let swapIndx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndx];
        deck[swapIndx] = deck[i];
        deck[i] = tmp;
    }
}

function getCardString(card) {
    return card.value+" of "+card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumericValue(card) {
    switch(card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
    
    updateScores();

    if (gameOver) {
        //let dealer take cards
        while(dealerScore < playerScore
        && playerScore <= 21
        && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack";
        return;
    }
    let dealerCardString = ' ';
    for (let i = 0; i < dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    let playerCardString = ' ';
    for (let i = 0; i < playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: '+ dealerScore + ')\n\n' +

    'player has:\n' +
    playerCardString +
    '(score: '+ playerScore + ')\n\n';

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "You Win!";
        }
        else {
            textArea.innerText += "You Lose!";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }

}
