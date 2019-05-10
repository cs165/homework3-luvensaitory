// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
    constructor(containerElement, words, start) {
        this.containerElement = containerElement;
        this.pointCallback = this.pointCallback.bind(this);
        this.show = this.show.bind(this);
        this.count = 0;
        this.right = 0;
        this.wrong = 0;
        this.start = start;
        this.words = [];
        for (let w in words) {
            let temp = [];
            temp.push(w);
            temp.push(words[w]);
            temp.push(0);
            temp.push(0);
            this.words.push(temp);
        }
        const R = document.querySelector(".status .correct");
        R.textContent = 0;
        const W = document.querySelector(".status .incorrect");
        W.textContent = 0;
    }

    pointCallback(right, wrong) {
        this.right = right;
        this.wrong = wrong;
    }

    show() {
        this.containerElement.classList.remove('inactive');
        const flashcardContainer = document.querySelector('#flashcard-container');
        const card = new Flashcard(flashcardContainer, this.words, 0, this.start, this.pointCallback);
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}