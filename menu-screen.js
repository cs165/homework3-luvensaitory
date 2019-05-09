// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
    constructor(containerElement, flashCards, onClickCallback, start) {
        this.containerElement = containerElement;
        this.onClick = this.onClick.bind(this);
        this.onClickCallback = onClickCallback;
        this.start = start;
        const choiceDiv = this.containerElement.querySelector("#choices");
        for (const card of flashCards) {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = card.title;
            itemDiv.addEventListener('click', this.onClick);
            choiceDiv.appendChild(itemDiv);
        }
    }

    onClick(event) {
        const title = event.currentTarget.textContent;
        for (const card of FLASHCARD_DECKS) {
            if (card.title == title) {
                this.deck = card;
                break;
            }
        }
        this.onClickCallback(this.deck);
        this.start(true);
        this.hide();
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}