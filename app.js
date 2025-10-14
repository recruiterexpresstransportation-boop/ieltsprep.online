/* ========================================
   IELTSPrep.online — app.js
   ======================================== */

// ==================== Registration ====================

const userInfoEl = document.getElementById("userInfo");
let user = JSON.parse(localStorage.getItem("ieltsUser"));

if (!user) {
  const name = prompt("👋 Welcome to IELTS Prep! Please enter your full name:");
  const email = prompt("Enter your email:");
  user = { name, email };
  localStorage.setItem("ieltsUser", JSON.stringify(user));
  alert(`Thanks ${name}! You're now registered.`);
}

userInfoEl.innerHTML = `Welcome, <b>${user.name}</b><br>${user.email}`;

// ==================== Tab Navigation ====================

const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    sections.forEach((s) => s.classList.add("hidden"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.remove("hidden");
  });
});

// ==================== Listening & Reading ====================

function createQuiz(sectionId, type) {
  const section = document.getElementById(sectionId);
  const grid = section.querySelector(".questions-grid");
  const checkBtn = section.querySelector(".check-btn");
  const resultEl = section.querySelector(".result");

  // Generate 40 questions
  const correctAnswers = [];
  for (let i = 1; i <= 40; i++) {
    const questionEl = document.createElement("div");
    questionEl.classList.add("question");
    questionEl.innerHTML = `<b>${type} Question ${i}</b>`;

    const options = ["A", "B", "C", "D"];
    const correct = options[Math.floor(Math.random() * 4)];
    correctAnswers.push(correct);

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.classList.add("option");
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        questionEl.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      questionEl.appendChild(btn);
    });

    grid.appendChild(questionEl);
  }

  // Check Answers
  checkBtn.addEventListener("click", () => {
    const selected = grid.querySelectorAll(".option.selected");
    if (selected.length < 40) {
      alert(`Please answer all questions before checking your score.`);
      return;
    }

    let score = 0;
    const questions = grid.querySelectorAll(".question");
    questions.forEach((q, i) => {
      const chosen = q.querySelector(".option.selected").textContent;
      if (chosen === correctAnswers[i]) {
        score++;
      }
    });

    const band = calculateIELTSBand(score);
    resultEl.textContent = `Score: ${score}/40  →  Approx Band: ${band}`;
  });
}

// Band score logic (approximate IELTS conversion)
function calculateIELTSBand(score) {
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 30) return 7.0;
  if (score >= 23) return 6.0;
  if (score >= 16) return 5.0;
  if (score >= 10) return 4.0;
  if (score >= 5) return 3.0;
  return 2.5;
}

createQuiz("listeningSection", "Listening");
createQuiz("readingSection", "Reading");

// ==================== Writing ====================

const task1Topics = [
  "Describe a chart showing population growth in your country.",
  "Write a letter to a friend describing your recent holiday.",
  "Summarize the main trends shown in a bar chart of internet usage.",
  "Write to your landlord requesting repairs in your apartment.",
  "Describe a process diagram of water purification.",
  "Write to your manager about a training you’d like to attend.",
  "Describe a map showing changes in a city center.",
  "Write to your bank about a lost debit card.",
  "Summarize a pie chart showing energy consumption by source.",
  "Write to your neighbor about noise problems.",
  "Describe a table showing education levels by gender.",
  "Write to a hotel manager complaining about poor service.",
  "Summarize a line graph showing car ownership over 10 years.",
  "Write to your boss requesting vacation time.",
  "Describe a process of recycling plastic bottles.",
  "Write to a company requesting information about a product.",
  "Summarize data showing water usage in different countries.",
  "Write to your local government suggesting park improvements.",
  "Describe a diagram showing electricity generation.",
  "Write to a friend describing your new home."
];

const task2Topics = [
  "Some people think the government should provide free education. Discuss both views.",
  "Is technology making people less sociable?",
  "The use of cars has increased; what are the effects on the environment?",
  "Should students take a gap year before university?",
  "Do advertisements influence consumer behavior?",
  "Some think crime can be reduced by longer prison sentences. Discuss.",
  "Is global warming the biggest challenge facing humanity?",
  "Should parents limit children’s screen time?",
  "Does money bring happiness?",
  "Should rich countries help poor countries more?",
  "Is online learning as effective as classroom learning?",
  "Should plastic be banned?",
  "Do celebrities have a positive impact on youth?",
  "Is it better to live in the countryside or the city?",
  "Should everyone learn a foreign language?",
  "Does social media improve communication?",
  "Should homework be abolished?",
  "Is it better to work for a company or be self-employed?",
  "Are exams a good way to measure ability?",
  "Should governments spend more on space exploration?"
];

function loadWritingTasks() {
  const task1List = document.getElementById("task1List");
  const task2List = document.getElementById("task2List");

  task1Topics.forEach((topic, i) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card");
    wrapper.innerHTML = `
      <b>Task 1 – Topic ${i + 1}:</b> ${topic}
      <textarea placeholder="Write your Task 1 response here..."></textarea>
    `;
    task1List.appendChild(wrapper);
  });

  task2Topics.forEach((topic, i) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card");
    wrapper.innerHTML = `
      <b>Task 2 – Topic ${i + 1}:</b> ${topic}
      <textarea placeholder="Write your Task 2 essay here..."></textarea>
    `;
    task2List.appendChild(wrapper);
  });
}

loadWritingTasks();

// ==================== Speaking ====================

const speakingTopics = [
  { topic: "Describe your favorite holiday destination.", answer: "My favorite holiday destination is Kyoto..." },
  { topic: "Describe a time you helped someone.", answer: "I once helped an elderly neighbor carry groceries..." },
  { topic: "Describe your favorite movie.", answer: "One of my favorite movies is 'Inception'..." },
  { topic: "Talk about a skill you would like to learn.", answer: "I would like to learn photography..." },
  { topic: "Describe a memorable event in your life.", answer: "One memorable event was when I graduated..." },
  { topic: "Describe your favorite book.", answer: "My favorite book is 'To Kill a Mockingbird'..." },
  { topic: "Describe your favorite teacher.", answer: "My favorite teacher was my English teacher..." },
  { topic: "Talk about your hometown.", answer: "My hometown is a small city located in the north..." },
  { topic: "Describe a time you were late.", answer: "I was once late to an important interview..." },
  { topic: "Describe a person who inspires you.", answer: "My mother inspires me because..." },
  { topic: "Describe a place you’d like to visit.", answer: "I would love to visit Iceland..." },
  { topic: "Describe a time you made a decision.", answer: "I once had to choose between two job offers..." },
  { topic: "Talk about your daily routine.", answer: "I usually wake up early and start with exercise..." },
  { topic: "Describe a hobby you enjoy.", answer: "I really enjoy playing guitar..." },
  { topic: "Describe a time you learned something new.", answer: "I recently learned how to bake bread..." },
  { topic: "Describe your favorite food.", answer: "I love sushi because it's fresh and flavorful..." },
  { topic: "Describe a piece of technology you use often.", answer: "I use my smartphone daily for communication..." },
  { topic: "Describe an interesting job you’d like to have.", answer: "I’d love to work as a travel writer..." },
  { topic: "Describe a festival in your country.", answer: "We celebrate a festival called Diwali..." },
  { topic: "Talk about an important tradition in your culture.", answer: "In my culture, family gatherings are essential..." }
];

function loadSpeakingTopics() {
  const grid = document.getElementById("speakingGrid");
  speakingTopics.forEach((t, i) => {
    const item = document.createElement("details");
    item.classList.add("speaking-item");
    item.innerHTML = `
      <summary>Topic ${i + 1}: ${t.topic}</summary>
      <p><b>Sample Answer:</b> ${t.answer}</p>
    `;
    grid.appendChild(item);
  });
}

loadSpeakingTopics();
