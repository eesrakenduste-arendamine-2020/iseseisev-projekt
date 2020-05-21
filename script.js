const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions
let currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })

}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }

}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Alusta uuesti'
    startButton.classList.remove('hide')
  }

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }

}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Kuidas luuakse funktsioon JavaScriptis?',
    answers: [
      { text: 'function myFunction()', correct: true },
	  { text: 'function:myFunction()', correct: false },
	  { text: 'function = myFunction()', correct: false}
    ]
  },

  {
    question: 'Milline event leiab aset, kui kasutaja klikib HTML elemendi peal?',
    answers: [
      { text: 'onclick', correct: true },
      { text: 'onmouseclick', correct: false },
      { text: 'onmouseover', correct: false },
      { text: 'onchange', correct: false }
    ]
  },

  {
    question: 'Kuidas algab FOR loop?',
    answers: [
      { text: 'for i = 1 to 5  ', correct: false },
      { text: 'for (i = 0; i <= 5; i++)  ', correct: true },
      { text: 'for (i = 0; i <= 5)', correct: false },
      { text: 'for (i <= 5; i++)', correct: false }
    ]
  },

  {
    question: 'Kuidas algab WHILE loop?',
    answers: [
      { text: 'while (i <= 10; i++)', correct: false },
	  { text: 'while (i <= 10)', correct: true },
	  { text: 'while i = 1 to 10', correct: false}
    ]
  },

  {
	question: 'Kuidas ümardatakse number 7.25 lähima täisarvuni?',
	answers: [
	  { text: 'round(7.25)', correct: false},
	  { text: 'Math.rnd(7.25)', correct: false},
	  { text: 'Math.round(7.25)', correct: true},
	  { text: 'rnd(7.25)', correct: false}
	]
  }
]