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
        if (status === 'selectTitle') {
            this.menu.hide();
            this.flashcards.show();
        } else if (status === 'wordsDone') {
            this.flashcards.hide();
            console.log(this.flashcards.right, this.flashcards.wrong);
            this.results = new ResultsScreen(this.resultElement, this.start);
            this.results.show(this.flashcards.right, this.flashcards.wrong);
        } else if (status === 'reload') {
            this.results.hide();
            this.menu.show();
        }
    }
}