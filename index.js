function checkQuestion(number) {
  let checkboxes = document.getElementsByClassName(`answers-${number}`);

  let gotAnswer = [];
  for (i = 0; i < checkboxes.length; ++i) {
    if (checkboxes[i].checked) {
      gotAnswer.push(checkboxes[i].value);
    }
  }

  if (gotAnswer.length === 0) {
    return "nothing";
  } else {
    let selectedAnswers = gotAnswer.join(",");
    console.log(selectedAnswers);
    if (selectedAnswers === test[number].correctAnswers) {
      return "ok"
    } else {
      return "wrong"
    }

  }
}

function outputQuestion(number) {
  // outputing question
  let label = document.createElement("label");
  label.textContent = `${number + 1}. ` + test[number].question;
  document.body.append(label);
  let br = document.createElement("br");
  document.body.append(br);

  // outputing answers
  for (let i = 0; i < 4; ++i) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = `answers-${number}`;
    checkbox.value = `${i + 1}`;
    document.body.append(checkbox);

    let answerLabel = document.createElement("label");
    answerLabel.textContent = test[number].answers[i];
    document.body.append(answerLabel);

    let answerBr = document.createElement("br");
    document.body.append(answerBr);
  }

  let brAfter = document.createElement("br");
  document.body.append(brAfter);
}

function startTest() {
  let addQuesBut = document.getElementById("addQuesBut");
  let startTestBut = document.getElementById("startTestBut");
  addQuesBut.disabled = true;
  startTestBut.disabled = true;

  for (let i = 0; i < test.length; ++i) {
    outputQuestion(i);
  }
  let newButton = document.createElement("button");
  newButton.textContent = "Отправить";
  newButton.onclick = function () {
    let result = 0;
    let wrongQuestionIndices = [];
    for (let i = 0; i < test.length; ++i) {
      let checkResult = checkQuestion(i);
      if (checkResult === "ok") {
        result += 1;
      } else if (checkResult == "wrong") {
        wrongQuestionIndices.push(i);
      } else if (checkResult == "nothing") {
        alert("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения");
        return;

      }
    }

    if (result === test.length) {
      alert(`Ваш результат ${result} из ${test.length}. Вы молодец!`);
    } else {
      let alertString = "Вы неправильно ответили на вопросы:\n\n";

      for (let i = 0; i < wrongQuestionIndices.length; ++i) {
        let wrongIndex = wrongQuestionIndices[i];
        alertString += `${wrongIndex + 1}. ` + test[wrongIndex].question + "\n";
      }
      alertString += `\nВаш результат ${result} из ${test.length}`;
      alert(alertString);
    }
  }
  document.body.append(newButton);

}

let test = [{
  question: "Что из перечисленного не является языком программирования?",
  answers: ["HTML", "Java", "Python", "DevOps"],
  correctAnswers: "1,4"
},
{
  question: "Какие из перечисленных видов тестирования могут быть автоматизированы?",
  answers: ["UI тестирование", "Юзабилити тестирование", "Тестирование совместимости", "Unit тестирование"],
  correctAnswers: "1,3,4"
},
{
  question: "Выберите типы алгоритмов, которых не сущетсвует?",
  answers: ["Алгоритм с ветвлением", "Циклический безусловный", "Циклический с параметром", "Алгоритм с углублением"],
  correctAnswers: "2,4"
},
{
  question: "Какая (какие) из следующих констрекций используется (используются) для ветвления?",
  answers: ["switch case", "if else", "do while", "for"],
  correctAnswers: "3"
},
{
  question: "Какого (каких) метода (методов) тестирования не существует?",
  answers: ["Метод белого ящика", "Метод 'игры в ящик'", "Метод 'кротовой норы'", "Метод серого ящика"],
  correctAnswers: "2,3"
},
];

function isAnswersStringValid(correctAnswers) {
  let valid = true;

  let elements = correctAnswers.split(',');
  console.log(elements);
  for (let i = 0; i < elements.length; ++i) {
    if (isNaN(+elements[i])) {
      valid = false;
      break;
    } else {
      // checking if element is valid number     
      if (elements[i] < 1 && elements[i] > 4) {
        valid = false;
        break;
      } else {
        // finding duplicate numbers
        for (let j = i + 1; j < elements.length; ++j) {
          if (elements[i] === elements[j]) {
            valid = false;
            break;
          }
        }
        if (!valid) {
          break;
        }
      }
    }
  }
  return valid;
}

function addQuestion() {
  // entering a question
  let question = prompt('Введите текст вопроса:');
  if (question === "" || question === null) {
    alert('Вы не ввели текст вопроса. Попробуйте добавить вопрос заново');
    return;
  }

  // entering answers
  let answers = [];
  for (let i = 1; i <= 4; ++i) {
    let answer = prompt(`Введите текст ${i} варианта ответа`);
    if (answer === "" || answer === null) {
      alert(`Вы не ввели текст ${i} варианта ответа. Попробуйте добавить вопрос заново`);
      return;
    }
    answers.push(answer);
  }

  // entering correct answers and validating  
  let correctAnswers = prompt('Введите номера правильных ответов через запятую. Нумерация начинается с 1');

  if (correctAnswers === "" || correctAnswers === null) {
    alert('Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново')
    return;
  } else if (!isAnswersStringValid(correctAnswers)) {
    alert('Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопроc заново');
    return;
  }

  let r = {
    question: question,
    answers: answers,
    correctAnswers: correctAnswers,
  };

  test.push(r);
}
