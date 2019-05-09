// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
    constructor(containerElement, frontText, backText) {
        this.containerElement = containerElement;
        this._flipCard = this._flipCard.bind(this);
        this.flashcardElement = this._createFlashcardDOM(frontText, backText);
        this.containerElement.append(this.flashcardElement);
        this.flashcardElement.addEventListener('pointerup', this._flipCard);
        this.cardStart = this.cardStart.bind(this);
        this.cardDrag = this.cardDrag.bind(this);
        this.cardEnd = this.cardEnd.bind(this);
        this.originX = null;
        this.originY = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.cardStarted = false;
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
        const translateX = deltaX;
        const translateY = deltaY;
        // console.log("delX: " + deltaX + " delY: " + deltaY + " tranX: " + translateX + " tranY: " + translateY);
        event.currentTarget.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) rotate(' + deltaX * 0.2 + 'deg)';
        event.currentTarget.style.rotate
        const tR = document.querySelector(".status .correct");
        const tW = document.querySelector(".status .incorrect");
        if (translateX >= 150 || translateX <= -150) {
            document.querySelector("body").style.backgroundColor = "#97b7b7";
            if (translateX >= 150) {
                tR.textContent = parseInt(this.tempRight) + 1;
            } else {
                tW.textContent = parseInt(this.tempWrong) + 1;
            }
        } else {
            document.querySelector("body").style.backgroundColor = "#d0e6df";
            tR.textContent = this.tempRight;
            tW.textContent = this.tempWrong;
        }
    }
    cardEnd(event) {
        this.cardStarted = false;
        this.offsetX += event.clientX - this.originX;
        this.offsetY += event.clientY - this.originY;
        event.currentTarget.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
        event.currentTarget.style.transitionDuration = '0.6s';
        this.flashcardElement.addEventListener('pointerup', this._flipCard);
        document.querySelector("body").style.backgroundColor = "#d0e6df"
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