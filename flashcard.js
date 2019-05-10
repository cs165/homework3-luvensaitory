// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
    constructor(containerElement, words, count, start, pointCallback) {
        this.containerElement = containerElement;
        this.cardStart = this.cardStart.bind(this);
        this.cardDrag = this.cardDrag.bind(this);
        this.cardEnd = this.cardEnd.bind(this);
        this.originX = null;
        this.originY = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.words = words;
        this.count = count;
        this.start = start;
        this.pointCallback = pointCallback;
        this.cardStarted = false;
        this._flipCard = this._flipCard.bind(this);
        this.flashcardElement = this._createFlashcardDOM(words[count][0], words[count][1]);
        this.containerElement.append(this.flashcardElement);
        this.flashcardElement.addEventListener('pointerup', this._flipCard);
        this.flashcardElement.addEventListener('pointerdown', this.cardStart);
        this.flashcardElement.addEventListener('pointerup', this.cardEnd);
        this.flashcardElement.addEventListener('pointermove', this.cardDrag);
    }
    cardStart(event) {
        this.originX = event.clientX;
        this.originY = event.clientY;
        this.cardStarted = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        this.tempRight = document.querySelector(".status .correct").textContent;
        this.tempWrong = document.querySelector(".status .incorrect").textContent;
        event.currentTarget.style.removeProperty('transition-duration');
    }
    cardDrag(event) {
        if (!this.cardStarted) {
            return;
        }
        this.flashcardElement.removeEventListener('pointerup', this._flipCard);
        event.preventDefault();
        const deltaX = event.clientX - this.originX;
        const deltaY = event.clientY - this.originY;
        this.translateX = deltaX;
        this.translateY = deltaY;
        // console.log("delX: " + deltaX + " delY: " + deltaY + " tranX: " + translateX + " tranY: " + translateY);
        event.currentTarget.style.transform = 'translate(' + this.translateX + 'px, ' + this.translateY + 'px) rotate(' + deltaX * 0.2 + 'deg)';
        event.currentTarget.style.rotate
        const tR = document.querySelector(".status .correct");
        const tW = document.querySelector(".status .incorrect");
        if (this.translateX >= 150 || this.translateX <= -150) {
            document.querySelector("body").style.backgroundColor = "#97b7b7";
            if (this.translateX >= 150) {
                tR.textContent = parseInt(this.tempRight) + 1;
            } else {
                tW.textContent = parseInt(this.tempWrong) + 1;
            }
        } else {
            document.querySelector("body").style.backgroundColor = "#d0e6df";
            tR.textContent = parseInt(this.tempRight);
            tW.textContent = parseInt(this.tempWrong);
        }
    }
    cardEnd(event) {
        this.cardStarted = false;
        this.offsetX += event.clientX - this.originX;
        this.offsetY += event.clientY - this.originY;
        event.currentTarget.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
        event.currentTarget.style.transitionDuration = '0.6s';
        if (this.translateX >= 150 || this.translateX <= -150) {
            this.count++;
            if (this.count < this.words.length) {
                const temp = this.containerElement.querySelector(".flashcard-box");
                this.containerElement.removeChild(temp);
                const flashcardContainer = document.querySelector('#flashcard-container');
                const card = new Flashcard(flashcardContainer, this.words, this.count, this.start, this.pointCallback);
            } else {
                const tR = document.querySelector(".status .correct");
                const tW = document.querySelector(".status .incorrect");
                this.pointCallback(parseInt(tR.textContent), parseInt(tW.textContent));
                this.start('wordsDone');
            }
        } else {
            this.flashcardElement.addEventListener('pointerup', this._flipCard);
        }
        document.querySelector("body").style.backgroundColor = "#d0e6df";
    }

    // Creates the DOM object representing a flashcard with the given
    // |frontText| and |backText| strings to display on the front and
    // back of the card. Returns a reference to root of this DOM
    // snippet. Does not attach this to the page.
    //
    // More specifically, this creates the following HTML snippet in JS
    // as a DOM object:
    // <div class="flashcard-box show-word">
    //   <div class="flashcard word">frontText</div>
    //   <div class="flashcard definition">backText</div>
    // </div>
    // and returns a reference to the root of that snippet, i.e. the
    // <div class="flashcard-box">
    _createFlashcardDOM(frontText, backText) {

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('flashcard-box');
        cardContainer.classList.add('show-word');

        const wordSide = document.createElement('div');
        wordSide.classList.add('flashcard');
        wordSide.classList.add('word');
        wordSide.textContent = frontText;

        const definitionSide = document.createElement('div');
        definitionSide.classList.add('flashcard');
        definitionSide.classList.add('definition');
        definitionSide.textContent = backText;

        cardContainer.appendChild(wordSide);
        cardContainer.appendChild(definitionSide);
        return cardContainer;
    }

    _flipCard(event) {
        this.flashcardElement.classList.toggle('show-word');
    }
}