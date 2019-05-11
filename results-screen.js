// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
    constructor(containerElement, start) {
        this.containerElement = containerElement;
        this.start = start;
        this.show = this.show.bind(this);
        this.back2Menu = this.back2Menu.bind(this);
        this.startOver = this.startOver.bind(this);
        this.continue = this.continue.bind(this);
    }

    continue () {
        this.start('continue');
    }

    startOver() {
        this.start('startOver');
    }

    back2Menu() {
        this.start('reload');
    }

    show(numberTotal, numberWrong) {
        let numberCorrect = numberTotal - numberWrong;
        this.containerElement.classList.remove('inactive');
        const percent = this.containerElement.querySelector('.percent');
        const aaa = Math.round(numberCorrect * 100 / (numberCorrect + numberWrong));
        percent.textContent = aaa;
        const correct = this.containerElement.querySelector('.correct');
        correct.textContent = numberCorrect;
        const incorrect = this.containerElement.querySelector('.incorrect');
        incorrect.textContent = numberWrong;
        const back = this.containerElement.querySelector('.to-menu');
        back.addEventListener('click', this.back2Menu);
        if (aaa === 100) {
            const button = this.containerElement.querySelector('.continue');
            button.textContent = 'Start over?';
            button.addEventListener('click', this.startOver);
        } else {
            const button = this.containerElement.querySelector('.continue');
            button.textContent = 'Continue';
            button.addEventListener('click', this.continue)
        }
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}