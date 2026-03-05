const questions = [
  {
    q: "What does the QRS complex represent?",
    options: [
      "Atrial depolarization",
      "Ventricular depolarization",
      "Ventricular repolarization",
      "Atrial repolarization"
    ],
    answer: 1
  },
  {
    q: "Heart rate can be calculated from the ECG using:",
    options: [
      "P-R interval",
      "QRS duration",
      "R-R interval",
      "T wave amplitude"
    ],
    answer: 2
  },
  {
    q: "Which nervous system division DECREASES heart rate?",
    options: [
      "Sympathetic nervous system",
      "Somatic nervous system",
      "Parasympathetic (vagus nerve)",
      "Enteric nervous system"
    ],
    answer: 2
  },
  {
    q: "Calculate Cardiac Output: HR = 60 BPM, SV = 0.08 L",
    options: [
      "3.0 L/min",
      "4.8 L/min",
      "7.5 L/min",
      "5.0 L/min"
    ],
    answer: 1
  },
  {
    q: "After whole-body exercise, the peripheral pulse amplitude is typically:",
    options: [
      "Larger — more blood is pushed to the skin",
      "Unchanged — vasoconstriction and vasodilation cancel out",
      "Smaller — vasoconstriction redirects blood to muscles",
      "Larger — the heart works harder"
    ],
    answer: 2
  },
  {
    q: "What is Vital Capacity (VC)?",
    options: [
      "VT + IRV",
      "ERV + RV",
      "IRV + ERV + VT",
      "VC + RV"
    ],
    answer: 2
  },
  {
    q: "Which volume CANNOT be measured by ordinary spirometry?",
    options: [
      "Tidal Volume (VT)",
      "Expiratory Reserve Volume (ERV)",
      "Inspiratory Reserve Volume (IRV)",
      "Residual Volume (RV)"
    ],
    answer: 3
  },
  {
    q: "Total Lung Capacity (TLC) equals:",
    options: [
      "IRV + VT",
      "VC + RV",
      "ERV + RV",
      "VT + IRV + ERV"
    ],
    answer: 1
  },
  {
    q: "During respiratory sinus arrhythmia, heart rate:",
    options: [
      "Stays constant throughout the cycle",
      "Increases during expiration, decreases during inspiration",
      "Increases during inspiration, decreases during expiration",
      "Only changes with exercise"
    ],
    answer: 2
  },
  {
    q: "Breath can be held the LONGEST after:",
    options: [
      "A normal quiet exhale",
      "A maximal forced exhale",
      "A full deep inhalation",
      "Hyperventilating then exhaling"
    ],
    answer: 2
  },
  {
    q: "Why does hyperventilation allow longer breath-holding?",
    options: [
      "It increases blood oxygen above normal",
      "It lowers PCO₂, reducing the medulla's urge to trigger breathing",
      "It relaxes the diaphragm",
      "It increases RV"
    ],
    answer: 1
  },
  {
    q: "During an asthma attack, which measurement is significantly reduced?",
    options: [
      "Tidal Volume (VT)",
      "Residual Volume (RV)",
      "Forced Expired Volume in 1 second (FEV1)",
      "Inspiratory Reserve Volume (IRV)"
    ],
    answer: 2
  },
  {
    q: "In quiet breathing, expiration is mainly passive because:",
    options: [
      "The diaphragm actively pushes air out",
      "Elastic recoil of the lungs drives air out without muscle effort",
      "Abdominal muscles contract forcefully",
      "The intercostal muscles relax and contract simultaneously"
    ],
    answer: 1
  },
  {
    q: "Functional Residual Capacity (FRC) equals:",
    options: [
      "VT + IRV",
      "IRV + VT + ERV",
      "ERV + RV",
      "VC + RV"
    ],
    answer: 2
  }
];

let selected = new Array(questions.length).fill(null);
let submitted = false;

function buildQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `<p>Q${i + 1}. ${q.q}</p><div class="quiz-options" id="opts-${i}"></div>`;
    container.appendChild(div);
    q.options.forEach((opt, j) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${String.fromCharCode(65 + j)}. ${opt}`;
      btn.onclick = () => selectOption(i, j);
      div.querySelector('.quiz-options').appendChild(btn);
    });
  });
}

function selectOption(qIdx, optIdx) {
  if (submitted) return;
  selected[qIdx] = optIdx;
  const btns = document.querySelectorAll(`#opts-${qIdx} .option-btn`);
  btns.forEach((b, j) => b.classList.toggle('selected', j === optIdx));
}

function submitQuiz() {
  if (selected.some(s => s === null)) {
    alert('Please answer all questions before submitting!');
    return;
  }
  submitted = true;
  let score = 0;
  questions.forEach((q, i) => {
    const btns = document.querySelectorAll(`#opts-${i} .option-btn`);
    btns.forEach((btn, j) => {
      btn.disabled = true;
      if (j === q.answer) btn.classList.add('correct');
      else if (j === selected[i] && selected[i] !== q.answer) btn.classList.add('wrong');
    });
    if (selected[i] === q.answer) score++;
  });

  const result = document.getElementById('quiz-result');
  const pct = Math.round((score / questions.length) * 100);
  let cls = 'result-great', msg = 'THE FORCE IS STRONG WITH THIS ONE!';
  if (pct < 80) { cls = 'result-ok';    msg = 'IMPRESSIVE... BUT YOU ARE NOT A JEDI YET.'; }
  if (pct < 60) { cls = 'result-study'; msg = 'MUCH TO LEARN, YOU STILL HAVE, YOUNG PADAWAN.'; }
  result.innerHTML = `<span class="${cls}">${msg}<br><small style="font-size:0.8rem;letter-spacing:0;font-family:sans-serif;">${score} / ${questions.length} correct (${pct}%)</small></span>`;

  document.getElementById('submit-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'inline-block';
}

function resetQuiz() {
  selected = new Array(questions.length).fill(null);
  submitted = false;
  document.getElementById('quiz-result').innerHTML = '';
  document.getElementById('submit-btn').style.display = 'inline-block';
  document.getElementById('reset-btn').style.display = 'none';
  buildQuiz();
}

buildQuiz();
