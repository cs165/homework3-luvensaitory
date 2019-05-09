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

        const mainElement = document.querySelector('#main');
        this.flashcards = new FlashcardScreen(mainElement, this.menu);

        const resultElement = document.querySelector('#results');
        this.results = new ResultsScreen(resultElement);

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
    }
    start(status) {
        if (status === true) {
            this.menu.hide();
            this.flashcards.show(this.words);
        }
    }
}