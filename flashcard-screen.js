// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
    constructor(containerElement, menu) {
        this.containerElement = containerElement;
        this.right = 0;
        this.wrong = 0;
        const R = document.querySelector(".status .correct");
        R.textContent = 0;
        const W = document.querySelector(".status .incorrect");
        W.textContent = 0;
    }

    show(words) {
        this.containerElement.classList.remove('inactive');
        const flashcardContainer = document.querySelector('#flashcard-container');
        const card = new Flashcard(flashcardContainer, 'word', 'definition');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}