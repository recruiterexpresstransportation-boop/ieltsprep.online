// Load questions (you could also inline them)
async function loadQuestions(section) {
  const resp = await fetch(`data/${section}_questions.json`);
  const data = await resp.json();
  return data;
}

// Render questions into the page
function renderQuestions(questions) {
  const quizArea = document.getElementById("quiz-area");
  quizArea.innerHTML = "";

  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
      <h3>Q${idx + 1}: ${q.question}</h3>
      <div class="options">
        ${Object.entries(q.options)
          .map(([key, val]) => {
            return `
            <label>
              <input type="radio" name="q${q.id}" value="${key}">
              ${key}. ${val}
            </label>`;
          })
          .join("")}
      </div>
    `;
    quizArea.appendChild(div);
  });
}

// Compute band (very rough mapping)
function computeBand(score, total) {
  const percentage = (score / total) * 100;
  // This is a dummy mapping; you’ll want to refine based on real IELTS band criteria
  if (percentage >= 85) return 9;
  if (percentage >= 75) return 8;
  if (percentage >= 65) return 7;
  if (percentage >= 55) return 6;
  if (percentage >= 45) return 5;
  if (percentage >= 35) return 4;
  return 3;
}

function checkAnswers(questions) {
  let correct = 0;
  questions.forEach((q) => {
    const radios = document.getElementsByName(`q${q.id}`);
    for (const r of radios) {
      if (r.checked) {
        if (r.value === q.answer) {
          correct++;
        }
        break;
      }
    }
  });
  return correct;
}

async function startQuiz() {
  // For this demo, load both listening & reading and merge them
  const listening = await loadQuestions("listening");
  const reading = await loadQuestions("reading");
  const all = listening.concat(reading);
  renderQuestions(all);

  document.getElementById("submit-btn").onclick = () => {
    const correct = checkAnswers(all);
    const total = all.length;
    const band = computeBand(correct, total);
    document.getElementById("result-area").innerText =
      `You answered ${correct} / ${total} correctly. \nEstimated band score: ${band}`;
  };
}

// Kick things off
startQuiz();
