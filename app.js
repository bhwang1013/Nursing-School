/* =============================================
   Nursing School Coding Guide — app.js
   ============================================= */

// ───────────────────────────────────────────────
// DATA
// ───────────────────────────────────────────────

const ICD10_DATA = [
  {
    code: "I10",
    label: "Essential (primary) hypertension",
    desc: "High blood pressure with no identifiable cause.",
    details: "The most common form of hypertension. Document stage (1 or 2) and whether controlled or uncontrolled.",
    examples: ["I10 – Controlled HTN", "I11.9 – HTN heart disease without HF"],
    category: "Circulatory"
  },
  {
    code: "E11.9",
    label: "Type 2 diabetes mellitus without complications",
    desc: "Non-insulin-dependent diabetes with no documented complications.",
    details: "Always document complication status. Use 4th/5th digits to specify complications (retinopathy, nephropathy, etc.).",
    examples: ["E11.65 – T2DM with hyperglycemia", "E11.40 – T2DM with diabetic neuropathy"],
    category: "Endocrine"
  },
  {
    code: "J18.9",
    label: "Pneumonia, unspecified organism",
    desc: "Lung infection when causative organism is not documented.",
    details: "Query provider for organism when identified. Specify lobar (J18.1) or broncho (J18.0) when documented.",
    examples: ["J15.211 – Pneumonia due to MRSA", "J18.1 – Lobar pneumonia"],
    category: "Respiratory"
  },
  {
    code: "N39.0",
    label: "Urinary tract infection, site not specified",
    desc: "Bacterial infection of the urinary system without specific site.",
    details: "Document the organism when available. If catheter-associated, use additional code Z96.0.",
    examples: ["N30.00 – Acute cystitis", "N10 – Acute pyelonephritis"],
    category: "Genitourinary"
  },
  {
    code: "F32.9",
    label: "Major depressive disorder, single episode, unspecified",
    desc: "Depression characterised by persistent low mood and anhedonia.",
    details: "Specify severity (mild/moderate/severe) and psychotic features when documented.",
    examples: ["F32.1 – MDD, single, moderate", "F33.1 – MDD, recurrent, moderate"],
    category: "Mental Health"
  },
  {
    code: "M79.3",
    label: "Panniculitis, unspecified",
    desc: "Inflammation of the subcutaneous fat layer.",
    details: "Often associated with systemic conditions. Document location and associated diagnoses.",
    examples: ["M79.30 – Panniculitis, unspecified site"],
    category: "Musculoskeletal"
  },
  {
    code: "K92.1",
    label: "Melena",
    desc: "Black, tarry stools indicating upper GI bleeding.",
    details: "Code the underlying cause first (peptic ulcer, esophageal varices, etc.) then K92.1 as secondary.",
    examples: ["K25.4 – Chronic/recurrent gastric ulcer with hemorrhage"],
    category: "Digestive"
  },
  {
    code: "A41.9",
    label: "Sepsis, unspecified organism",
    desc: "Life-threatening organ dysfunction from infection response.",
    details: "Requires documentation of organ dysfunction. Always code the source infection first, then R65.20/R65.21 for severity.",
    examples: ["A41.01 – MRSA sepsis", "R65.21 – Severe sepsis with septic shock"],
    category: "Infectious"
  },
  {
    code: "I50.9",
    label: "Heart failure, unspecified",
    desc: "Cardiac pump failure not further specified.",
    details: "Query for systolic vs diastolic, acute vs chronic, and side (left/right/bilateral).",
    examples: ["I50.22 – Chronic systolic HF", "I50.32 – Chronic diastolic HF"],
    category: "Circulatory"
  },
  {
    code: "Z87.891",
    label: "Personal history of nicotine dependence",
    desc: "History of tobacco use — no longer current user.",
    details: "Use F17.2xx codes for current tobacco dependence. Z87.891 documents prior use for risk assessment.",
    examples: ["F17.210 – Cigarette dependence, uncomplicated"],
    category: "Lifestyle / History"
  },
  {
    code: "S72.001A",
    label: "Fracture of femoral neck, initial encounter",
    desc: "Hip fracture — first encounter for active treatment.",
    details: "7th character specifies encounter type: A=initial, D=subsequent, S=sequela. Specify displaced/nondisplaced.",
    examples: ["S72.001D – Subsequent encounter", "S72.001G – Delayed healing"],
    category: "Injury"
  },
  {
    code: "G47.33",
    label: "Obstructive sleep apnea",
    desc: "Repeated upper airway collapse during sleep.",
    details: "Document severity (mild/moderate/severe) from sleep study. Use additional code for BMI if relevant.",
    examples: ["G47.31 – Primary central sleep apnea"],
    category: "Neurological"
  }
];

const CPT_DATA = [
  {
    code: "99213",
    label: "Office visit – established patient, low complexity",
    desc: "15–29 min visit; problem-focused exam with low medical decision-making.",
    details: "Requires 2 of 3 key components or total time with >50% counseling. Common for chronic disease follow-up.",
    examples: ["HTN follow-up", "Diabetes medication review"],
    category: "E&M"
  },
  {
    code: "36415",
    label: "Venipuncture – routine",
    desc: "Routine blood draw from a vein for laboratory testing.",
    details: "Typically bundled with lab tests. Bill separately only when not part of a global service.",
    examples: ["CBC draw", "BMP collection"],
    category: "Procedure"
  },
  {
    code: "71046",
    label: "Chest X-ray, 2 views",
    desc: "PA and lateral chest radiograph.",
    details: "Most common diagnostic chest imaging. Documents cardiac silhouette, lung fields, and bony structures.",
    examples: ["Pneumonia workup", "Pre-op clearance"],
    category: "Radiology"
  },
  {
    code: "93000",
    label: "Electrocardiogram (ECG) – routine with interpretation",
    desc: "12-lead ECG with physician review and written report.",
    details: "93005 = tracing only; 93010 = interpretation only. 93000 = both together.",
    examples: ["Chest pain workup", "Pre-operative ECG"],
    category: "Cardiology"
  },
  {
    code: "99291",
    label: "Critical care – first 30–74 minutes",
    desc: "Intensive management of critically ill or injured patient.",
    details: "Requires direct patient contact and constant availability. Document organ failure or life threat. Add-on 99292 for each additional 30 min.",
    examples: ["ICU sepsis management", "Trauma resuscitation"],
    category: "Critical Care"
  },
  {
    code: "90837",
    label: "Psychotherapy – 60 minutes",
    desc: "Individual outpatient psychotherapy session, approximately 60 minutes.",
    details: "Can be billed alone or with an E&M code (+90833). Document total face-to-face time.",
    examples: ["CBT session", "Crisis therapy"],
    category: "Mental Health"
  },
  {
    code: "43239",
    label: "Upper GI endoscopy with biopsy",
    desc: "Esophagogastroduodenoscopy (EGD) with tissue sampling.",
    details: "Includes diagnostic scope (43235). Code additional procedures separately (e.g., polyp removal).",
    examples: ["H. pylori biopsy", "Barrett's esophagus surveillance"],
    category: "GI Procedure"
  },
  {
    code: "29881",
    label: "Arthroscopy, knee – with meniscectomy",
    desc: "Minimally invasive knee surgery to remove or repair meniscal tissue.",
    details: "Specify medial (29881) vs lateral (29880). Unilateral procedure; use modifier -50 for bilateral.",
    examples: ["Medial meniscus tear repair"],
    category: "Orthopedic"
  }
];

const NANDA_DATA = [
  {
    code: "00030",
    label: "Impaired Gas Exchange",
    desc: "Excess or deficit in oxygenation and/or CO₂ elimination at the alveolar-capillary membrane.",
    details: "Related to: V/Q imbalance, alveolar-capillary changes. Evidenced by: abnormal ABGs, hypoxia, confusion, restlessness.",
    examples: ["COPD exacerbation", "Pneumonia", "Pulmonary edema"],
    category: "Respiratory"
  },
  {
    code: "00132",
    label: "Acute Pain",
    desc: "Unpleasant sensory/emotional experience of short duration (<6 months).",
    details: "Related to: tissue injury, surgical incision, inflammation. AEB: verbal report, guarding, altered vitals, diaphoresis.",
    examples: ["Post-op pain", "MI chest pain", "Acute fracture"],
    category: "Comfort"
  },
  {
    code: "00085",
    label: "Impaired Physical Mobility",
    desc: "Limitation in purposeful physical movement of the body or extremities.",
    details: "Related to: pain, neuromuscular impairment, cognitive deficit. AEB: limited ROM, reluctance to move, decreased muscle strength.",
    examples: ["Post-stroke hemiplegia", "Hip fracture", "Spinal cord injury"],
    category: "Activity"
  },
  {
    code: "00013",
    label: "Diarrhea",
    desc: "Passage of loose, unformed stools (≥3 per day).",
    details: "Related to: GI infection, medications, tube feeding, stress. AEB: urgency, cramping, hyperactive bowel sounds, ≥3 loose stools/day.",
    examples: ["C. diff infection", "Antibiotic-associated diarrhea"],
    category: "Elimination"
  },
  {
    code: "00146",
    label: "Anxiety",
    desc: "Vague, uneasy feeling of discomfort or dread with an autonomic response.",
    details: "Related to: health status changes, situational crises, stressors. AEB: agitation, trembling, tachycardia, self-focused, verbalized apprehension.",
    examples: ["Pre-operative anxiety", "New diagnosis", "ICU psychosis"],
    category: "Mental Health"
  },
  {
    code: "00047",
    label: "Risk for Skin Integrity Impairment",
    desc: "Susceptible to alteration in the epidermis and/or dermis.",
    details: "Risk factors: immobility, incontinence, nutritional deficit, bony prominences, altered circulation. No AEB needed (risk diagnosis).",
    examples: ["Bedbound patient", "Diabetic peripheral neuropathy"],
    category: "Integumentary"
  },
  {
    code: "00002",
    label: "Imbalanced Nutrition: Less Than Body Requirements",
    desc: "Inadequate intake of nutrients to meet metabolic needs.",
    details: "Related to: inability to ingest/absorb nutrients, nausea, dysphagia. AEB: weight loss, poor intake, low albumin/prealbumin.",
    examples: ["Post-op ileus", "Cancer cachexia", "Dysphagia"],
    category: "Nutrition"
  },
  {
    code: "00155",
    label: "Risk for Falls",
    desc: "Susceptible to increased susceptibility to falling that may cause physical harm.",
    details: "Risk factors: age >65, history of falls, impaired gait, altered cognition, medications (sedatives, diuretics, antihypertensives).",
    examples: ["Post-anesthesia patient", "Elderly with polypharmacy"],
    category: "Safety"
  }
];

const DOC_DATA = [
  {
    title: "SBAR Communication Framework",
    body: `
      <p><strong>S – Situation:</strong> Briefly state what is happening with the patient right now.</p>
      <p><strong>B – Background:</strong> Provide relevant clinical context (diagnosis, history, current treatment).</p>
      <p><strong>A – Assessment:</strong> Your professional assessment of the problem.</p>
      <p><strong>R – Recommendation:</strong> What action or response do you need?</p>
      <ul>
        <li>Use SBAR for handoffs, escalations, and provider calls.</li>
        <li>Document SBAR communications in the medical record.</li>
        <li>Include time, date, and recipient's name/credential.</li>
      </ul>
    `
  },
  {
    title: "Nursing Assessment Documentation (Head-to-Toe)",
    body: `
      <p>A complete head-to-toe assessment must be documented every shift. Include:</p>
      <ul>
        <li><strong>Neurological:</strong> LOC, orientation (x4), GCS, pupils, cranial nerves as appropriate</li>
        <li><strong>Cardiovascular:</strong> Heart rate/rhythm, BP, skin color/temp, cap refill, peripheral pulses, edema</li>
        <li><strong>Respiratory:</strong> Rate, depth, effort, breath sounds, O₂ sat, supplemental O₂</li>
        <li><strong>Gastrointestinal:</strong> Bowel sounds, abdomen shape, last BM, pain, nausea</li>
        <li><strong>Genitourinary:</strong> Urine output, color, odor, continence, catheter status</li>
        <li><strong>Musculoskeletal:</strong> Mobility level, strength, ROM, fall risk score</li>
        <li><strong>Integumentary:</strong> Skin integrity, wounds, pressure injury Braden score</li>
        <li><strong>Pain:</strong> Scale (0–10 or CPOT), location, quality, interventions, response</li>
      </ul>
    `
  },
  {
    title: "Medication Administration Documentation (5 Rights + 5 More)",
    body: `
      <p>The traditional 5 Rights of medication administration:</p>
      <ul>
        <li><strong>Right Patient</strong> – Two identifiers (name + DOB or MRN)</li>
        <li><strong>Right Drug</strong> – Verify generic and brand name</li>
        <li><strong>Right Dose</strong> – Calculate and double-check</li>
        <li><strong>Right Route</strong> – PO, IV, IM, SQ, etc.</li>
        <li><strong>Right Time</strong> – Within policy window (±30 min for scheduled meds)</li>
      </ul>
      <p>Additional rights (expanded framework):</p>
      <ul>
        <li>Right Documentation – Chart immediately after administration</li>
        <li>Right Reason – Know the indication</li>
        <li>Right Response – Assess therapeutic and adverse effects</li>
        <li>Right to Refuse – Patient autonomy must be respected</li>
        <li>Right Education – Explain medication to patient/family</li>
      </ul>
    `
  },
  {
    title: "Vital Signs Documentation Standards",
    body: `
      <p>Document all vitals with time and route/method:</p>
      <ul>
        <li><strong>Temperature:</strong> Route (oral/tympanic/rectal/temporal), normal 36.1–37.2°C / 97–99°F</li>
        <li><strong>Heart Rate:</strong> Rate and rhythm (regular/irregular), method (manual/monitor)</li>
        <li><strong>Blood Pressure:</strong> Arm used, position (sitting/lying/standing for orthostatics)</li>
        <li><strong>Respiratory Rate:</strong> Counted for full minute; note depth and effort</li>
        <li><strong>Oxygen Saturation:</strong> Site, supplemental O₂ type and flow rate</li>
        <li><strong>Pain Score:</strong> Scale used (NRS/Wong-Baker/CPOT), location, intervention and re-assessment</li>
      </ul>
      <p><strong>Critical Values:</strong> HR &lt;40 or &gt;150, SBP &lt;90 or &gt;180, SpO₂ &lt;90%, Temp &gt;38.5°C — notify provider immediately and document response.</p>
    `
  },
  {
    title: "Incident / Variance Report Documentation",
    body: `
      <p>Complete a variance report for any unexpected event affecting patient safety. Document in the medical record:</p>
      <ul>
        <li>Objective description of the event (factual, no opinion)</li>
        <li>Time and date discovered</li>
        <li>Patient condition at time of discovery</li>
        <li>Immediate interventions taken</li>
        <li>Provider notification — name, time, and orders received</li>
        <li>Patient/family notification if applicable</li>
        <li>Follow-up assessments and outcomes</li>
      </ul>
      <p><strong>Do NOT</strong> reference the incident report in the medical record or assign blame. Use neutral, factual language.</p>
    `
  }
];

const EMERGENCY_CODES = [
  { code: "Code Blue",   color: "#1a6e8e", label: "Cardiac/Respiratory Arrest",    desc: "Summon resuscitation team immediately." },
  { code: "Code Red",    color: "#c0392b", label: "Fire",                           desc: "RACE: Rescue, Alarm, Contain, Extinguish/Evacuate." },
  { code: "Code Pink",   color: "#e07fad", label: "Infant/Child Abduction",         desc: "Secure exits, alert security, document last seen location." },
  { code: "Code White",  color: "#607d8b", label: "Evacuation",                     desc: "Orderly evacuation of area per facility protocol." },
  { code: "Code Orange", color: "#e87c1e", label: "Hazardous Material Spill",       desc: "Contain spill, evacuate area, activate HazMat team." },
  { code: "Code Silver", color: "#78909c", label: "Weapon / Hostage Situation",     desc: "Do not confront. Alert security and law enforcement." },
  { code: "Code Yellow", color: "#e8a020", label: "Bomb Threat",                    desc: "Evacuate. Do not use phones or electrical devices." },
  { code: "Code Purple", color: "#7b5ea7", label: "Combative Person",               desc: "Ensure personal safety. Call security. Do not confront alone." },
  { code: "Code Green",  color: "#2d8c5f", label: "Emergency Activation",           desc: "External disaster; surge capacity protocols activated." },
  { code: "Code Grey",   color: "#455a64", label: "System Failure",                 desc: "Critical infrastructure failure (power, IT, water)." }
];

const QUIZ_QUESTIONS = [
  {
    q: "A patient is admitted with high blood pressure and no identifiable secondary cause. Which ICD-10 code is most appropriate?",
    options: ["I10", "I11.9", "I20.9", "I50.9"],
    answer: 0,
    explanation: "I10 is the correct code for essential (primary) hypertension — high BP without an identifiable cause."
  },
  {
    q: "What does the '7th character A' signify in injury codes (e.g., S72.001A)?",
    options: ["Subsequent encounter", "Sequela", "Initial encounter for active treatment", "Delayed healing"],
    answer: 2,
    explanation: "The 7th character 'A' denotes the initial encounter — the first time active treatment is provided."
  },
  {
    q: "Which NANDA nursing diagnosis would be MOST appropriate for an immobile patient with bony prominences and incontinence?",
    options: ["Acute Pain", "Risk for Falls", "Risk for Skin Integrity Impairment", "Imbalanced Nutrition"],
    answer: 2,
    explanation: "NANDA 00047 – Risk for Skin Integrity Impairment – applies when risk factors such as immobility, incontinence, and bony prominences are present."
  },
  {
    q: "Which CPT code describes a routine ECG with interpretation?",
    options: ["93005", "93000", "99213", "36415"],
    answer: 1,
    explanation: "93000 includes both the ECG tracing and the physician interpretation/report. 93005 = tracing only; 93010 = interpretation only."
  },
  {
    q: "When using the SBAR framework, the 'A' stands for:",
    options: ["Action", "Assessment", "Alert", "Admission"],
    answer: 1,
    explanation: "In SBAR, A = Assessment — your clinical judgment about the patient's condition."
  },
  {
    q: "A hospital announces 'Code Orange.' What should nursing staff do?",
    options: ["Evacuate all patients immediately", "Contain spill and activate HazMat team", "Secure exits and call security", "Begin CPR protocol"],
    answer: 1,
    explanation: "Code Orange indicates a hazardous material spill. Staff should contain the area, evacuate non-essential personnel, and activate the HazMat response team."
  },
  {
    q: "Which is the correct ICD-10 code for sepsis when no organism is specified?",
    options: ["A41.9", "R65.20", "J18.9", "A40.9"],
    answer: 0,
    explanation: "A41.9 = Sepsis, unspecified organism. R65.20 codes severe sepsis without shock and is used as an additional code."
  },
  {
    q: "The Braden Scale is used to assess risk for:",
    options: ["Fall risk", "Pain intensity", "Pressure injury development", "Nutritional status"],
    answer: 2,
    explanation: "The Braden Scale assesses six domains (sensory perception, moisture, activity, mobility, nutrition, and friction/shear) to predict pressure injury risk."
  },
  {
    q: "Which documentation practice is INCORRECT when completing an incident report?",
    options: [
      "Describe the event objectively",
      "Document provider notification time and name",
      "Write 'incident report filed' in the medical record",
      "Assess patient condition at time of discovery"
    ],
    answer: 2,
    explanation: "You should NEVER reference the incident/variance report in the medical record. The two are kept separate to protect the quality-review process."
  },
  {
    q: "Type 2 diabetes mellitus without complications is coded as:",
    options: ["E10.9", "E11.9", "E13.9", "E08.9"],
    answer: 1,
    explanation: "E11.9 = Type 2 diabetes mellitus without complications. E10 = Type 1 DM; E13 = Other specified DM; E08 = DM due to underlying condition."
  }
];

// ───────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────

function buildCard(item) {
  const card = document.createElement("div");
  card.className = "code-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-expanded", "false");

  const exampleItems = item.examples.map(e => `<li>${e}</li>`).join("");

  card.innerHTML = `
    <span class="code-tag">${item.code}</span>
    <h3>${item.label}</h3>
    <p>${item.desc}</p>
    <div class="expanded" aria-hidden="true">
      <p>${item.details}</p>
      <ul class="examples">${exampleItems}</ul>
    </div>
  `;

  const toggle = () => {
    const isOpen = card.classList.toggle("open");
    card.setAttribute("aria-expanded", String(isOpen));
    const exp = card.querySelector(".expanded");
    exp.setAttribute("aria-hidden", String(!isOpen));
  };

  card.addEventListener("click", toggle);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });

  return card;
}

function buildAccordion(items) {
  const container = document.getElementById("docAccordion");
  items.forEach(item => {
    const el = document.createElement("div");
    el.className = "accordion-item";
    el.innerHTML = `
      <div class="accordion-header" role="button" tabindex="0" aria-expanded="false">
        ${item.title} <span class="chevron">▼</span>
      </div>
      <div class="accordion-body" role="region">${item.body}</div>
    `;
    const header = el.querySelector(".accordion-header");
    const body = el.querySelector(".accordion-body");

    const toggle = () => {
      const isOpen = el.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });

    container.appendChild(el);
  });
}

function buildEmergencyGrid() {
  const grid = document.getElementById("emergencyGrid");
  EMERGENCY_CODES.forEach(ec => {
    const card = document.createElement("div");
    card.className = "emergency-card";
    card.style.background = ec.color;
    card.innerHTML = `
      <div class="e-code">${ec.code}</div>
      <div class="e-label">${ec.label}</div>
      <div class="e-desc">${ec.desc}</div>
    `;
    grid.appendChild(card);
  });
}

// ───────────────────────────────────────────────
// SEARCH
// ───────────────────────────────────────────────

const ALL_SEARCHABLE = [
  ...ICD10_DATA.map(d => ({ ...d, type: "ICD-10" })),
  ...CPT_DATA.map(d => ({ ...d, type: "CPT" })),
  ...NANDA_DATA.map(d => ({ ...d, type: "NANDA" }))
];

function initSearch() {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = "";

    if (!q) { results.classList.add("hidden"); return; }

    const matches = ALL_SEARCHABLE.filter(d =>
      d.code.toLowerCase().includes(q) ||
      d.label.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    ).slice(0, 12);

    if (!matches.length) {
      results.innerHTML = `<div class="search-result-item"><span class="label">No results found.</span></div>`;
    } else {
      matches.forEach(m => {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.innerHTML = `
          <span class="code">${m.code}</span>
          <div class="label">${m.label}</div>
          <div class="category">${m.type} &bull; ${m.category}</div>
        `;
        item.addEventListener("click", () => {
          const section = { "ICD-10": "#icd10", "CPT": "#cpt", "NANDA": "#nanda" }[m.type];
          if (section) document.querySelector(section).scrollIntoView({ behavior: "smooth" });
          results.classList.add("hidden");
          input.value = "";
        });
        results.appendChild(item);
      });
    }

    results.classList.remove("hidden");
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-section")) results.classList.add("hidden");
  });
}

// ───────────────────────────────────────────────
// QUIZ
// ───────────────────────────────────────────────

let quizIndex = 0;
let quizScore = 0;
let quizActive = false;
let shuffledQuestions = [];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuestion() {
  const q = shuffledQuestions[quizIndex];
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("nextQuestion");
  const scoreEl = document.getElementById("quizScore");

  feedbackEl.className = "quiz-feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  scoreEl.classList.add("hidden");

  const progress = document.getElementById("progressBar") || (() => {
    const p = document.createElement("div");
    p.id = "progressBar";
    questionEl.parentNode.insertBefore(p, questionEl);
    return p;
  })();
  progress.textContent = `Question ${quizIndex + 1} of ${shuffledQuestions.length}`;

  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i, q));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, q) {
  const options = document.querySelectorAll(".quiz-option");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("nextQuestion");

  options.forEach(btn => (btn.disabled = true));

  if (selectedIndex === q.answer) {
    options[selectedIndex].classList.add("correct");
    quizScore++;
    feedbackEl.textContent = `Correct! ${q.explanation}`;
    feedbackEl.className = "quiz-feedback correct-fb";
  } else {
    options[selectedIndex].classList.add("incorrect");
    options[q.answer].classList.add("correct");
    feedbackEl.textContent = `Incorrect. ${q.explanation}`;
    feedbackEl.className = "quiz-feedback incorrect-fb";
  }

  quizIndex++;

  if (quizIndex < shuffledQuestions.length) {
    nextBtn.classList.remove("hidden");
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  const scoreEl = document.getElementById("quizScore");
  const pct = Math.round((quizScore / shuffledQuestions.length) * 100);
  let grade = pct >= 90 ? "Excellent!" : pct >= 75 ? "Good job!" : pct >= 60 ? "Keep studying!" : "Review the material and try again.";
  scoreEl.textContent = `Quiz complete! Score: ${quizScore}/${shuffledQuestions.length} (${pct}%) — ${grade}`;
  scoreEl.classList.remove("hidden");

  const startBtn = document.getElementById("startQuiz");
  startBtn.textContent = "Restart Quiz";
  startBtn.classList.remove("hidden");
  quizActive = false;
}

function initQuiz() {
  const startBtn = document.getElementById("startQuiz");
  const nextBtn = document.getElementById("nextQuestion");

  startBtn.addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    quizActive = true;
    shuffledQuestions = shuffleArray(QUIZ_QUESTIONS);
    startBtn.classList.add("hidden");
    document.getElementById("quizScore").classList.add("hidden");
    renderQuestion();
  });

  nextBtn.addEventListener("click", () => {
    nextBtn.classList.add("hidden");
    renderQuestion();
  });
}

// ───────────────────────────────────────────────
// ACTIVE NAV HIGHLIGHT
// ───────────────────────────────────────────────

function initScrollSpy() {
  const sections = document.querySelectorAll(".card-section");
  const navLinks = document.querySelectorAll("nav a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach(s => observer.observe(s));
}

// ───────────────────────────────────────────────
// INIT
// ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Populate card grids
  const icd10Grid = document.getElementById("icd10Grid");
  ICD10_DATA.forEach(item => icd10Grid.appendChild(buildCard(item)));

  const cptGrid = document.getElementById("cptGrid");
  CPT_DATA.forEach(item => cptGrid.appendChild(buildCard(item)));

  const nandaGrid = document.getElementById("nandaGrid");
  NANDA_DATA.forEach(item => nandaGrid.appendChild(buildCard(item)));

  buildAccordion(DOC_DATA);
  buildEmergencyGrid();
  initSearch();
  initQuiz();
  initScrollSpy();
});
