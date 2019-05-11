// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
    constructor() {
        this.onClickCallback = this.onClickCallback.bind(this);
        this.start = this.start.bind(this);
        const menuElement = document.querySelector('#menu');
        this.menu = new MenuScreen(menuElement, FLASHCARD_DECKS, this.onClickCallback, this.start);

        this.mainElement = document.querySelector('#main');

        this.resultElement = document.querySelector('#results');


        // Uncomment this pair of lines to see the "flashcard" screen:
        // this.menu.hide();
        // this.flashcards.show();

        // Uncomment this pair of lines to see the "results" screen:
        // this.menu.hide();
        // this.results.show();
    }
    onClickCallback(card) {
        this.title = card.title;
        this.words = card.words;
        this.flashcards = new FlashcardScreen(this.mainElement, this.words, this.start);
    }
    start(status) {
        let temp;
        if (status === 'selectTitle') {
            this.flashcards.show();
        } else if (status === 'wordsDone') {
            this.flashcards.hide();
            this.results = new ResultsScreen(this.resultElement, this.start);
            this.results.show(this.flashcards.total, this.flashcards.wrong);
        } else if (status === 'reload') {
            this.results.hide();
            temp = document.querySelector('#flashcard-container');
            temp.innerHTML = '';
            this.menu.show();
        } else if (status === 'startOver') {
            temp = document.querySelector(".status .correct");
            temp.textContent = 0;
            temp = document.querySelector(".status .incorrect");
            temp.textContent = 0;
            temp = document.querySelector('#flashcard-container');
            temp.innerHTML = '';
            this.results.hide();
            this.flashcards = new FlashcardScreen(this.mainElement, this.words, this.start);
            this.flashcards.show();
        } else {
            temp = document.querySelector(".status .correct");
            temp.textContent = 0;
            temp = document.querySelector(".status .incorrect");
            temp.textContent = 0;
            temp = document.querySelector('#flashcard-container');
            temp.innerHTML = '';
            this.results.hide();
            this.flashcards.wrong = 0;
            let right = this.flashcards.right;
            const wrongAnswer = this.flashcards.wrongAnswer;
            temp = 0;
            for (let i = 0; i < this.flashcards.wrongAnswer.length; i++) {
                if (this.flashcards.wrongAnswer[i] == 0) {
                    temp = i;
                    break;
                }
            }
            let total = this.flashcards.total;
            this.flashcards = new FlashcardScreen(this.mainElement, this.words, this.start);
            this.flashcards.wrongAnswer = wrongAnswer;
            this.flashcards.startNum = temp;
            this.flashcards.total = total;
            this.flashcards.show();
        }
    }
}