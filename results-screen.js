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
        this.onClickReload = this.onClickReload.bind(this);
    }

    onClickReload() {
        this.start('reload');
        this.containerElement.removeEventListener('click', this.onClickReload);
    }

    show(numberCorrect, numberWrong) {
        this.containerElement.classList.remove('inactive');
        const percent = this.containerElement.querySelector('.percent');
        const aaa = Math.round(numberCorrect * 100 / (numberCorrect + numberWrong));
        console.log(numberCorrect, numberWrong, aaa);
        percent.textContent = aaa;
        const correct = this.containerElement.querySelector('.correct');
        correct.textContent = numberCorrect;
        const incorrect = this.containerElement.querySelector('.incorrect');
        incorrect.textContent = numberWrong;
        console.log(aaa);
        if (aaa === 100) {
            const button = this.containerElement.querySelector('.continue');
            button.textContent = 'Start over?';
            button.addEventListener('click', this.onClickReload);
        } else {

        }
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}