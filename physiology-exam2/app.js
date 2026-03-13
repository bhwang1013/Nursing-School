// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('menu-btn');
  if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn) {
    sb.classList.remove('open');
  }
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.25 });
sections.forEach(s => observer.observe(s));

// ===== QUIZ QUESTIONS =====
const QUESTIONS = [

  // --- SENSORY ---
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'A receptor that fires rapidly at stimulus onset but then stops firing despite the stimulus continuing is called:',
    options: ['Tonic receptor', 'Phasic receptor', 'Polymodal receptor', 'Mechanoreceptor'],
    answer: 1,
    explanation: '<strong>Phasic receptors</strong> adapt quickly — they fire at onset (and sometimes offset) but not during sustained stimulation. Examples: Meissner\'s corpuscles (touch), olfactory receptors. <strong>Tonic receptors</strong> fire continuously, reporting ongoing stimulus magnitude (e.g., pain, proprioception).'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'When light hits photoreceptors in the retina, what IMMEDIATELY happens to the photoreceptor cell?',
    options: [
      'It depolarizes and releases more glutamate',
      'It hyperpolarizes and releases LESS glutamate',
      'It fires an action potential directly to the optic nerve',
      'It releases acetylcholine onto bipolar cells'
    ],
    answer: 1,
    explanation: 'This is counterintuitive! <strong>In the dark</strong>: photoreceptors are depolarized (cGMP keeps Na⁺ channels open) and continuously releasing glutamate. <strong>Light bleaches rhodopsin</strong> → PDE activated → cGMP broken down → Na⁺ channels close → <strong>hyperpolarization</strong> → LESS glutamate. ON-center bipolar cells interpret reduced glutamate as an excitatory signal.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'Lateral inhibition in sensory systems primarily serves to:',
    options: [
      'Increase overall sensitivity to all stimuli',
      'Sharpen contrast and improve spatial resolution',
      'Speed up action potential conduction velocity',
      'Reduce the metabolic cost of neural signaling'
    ],
    answer: 1,
    explanation: 'Lateral inhibition: the most-stimulated neuron inhibits its neighbors via interneurons. This creates a "winner-take-more" effect that sharpens the boundary between stimulated and unstimulated areas — critical for two-point discrimination, visual acuity (retinal ganglion cells), and auditory frequency discrimination.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'Sound is converted to neural signals in the cochlea. Which membrane movement is most directly responsible for hair cell depolarization?',
    options: [
      'Reissner\'s membrane oscillating',
      'The basilar membrane deflecting, bending stereocilia',
      'The tectorial membrane contracting independently',
      'The oval window vibrating at high frequency'
    ],
    answer: 1,
    explanation: 'Sound waves → ossicles → oval window → fluid waves → <strong>basilar membrane deflects</strong> → stereocilia of hair cells bend against the tectorial membrane → K⁺ channels open (remember: endolymph is K⁺-rich!) → depolarization → neurotransmitter release → CN VIII fires. High frequencies activate the base; low frequencies activate the apex (tonotopy).'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'Why does the cochlea use K⁺-rich endolymph rather than standard Na⁺-rich extracellular fluid to depolarize hair cells?',
    options: [
      'K⁺ is more abundant in the body so it is energetically cheaper',
      'The endocochlear potential (high K⁺ gradient) allows large, rapid depolarization with lower metabolic cost',
      'Na⁺ would damage the hair cell stereocilia',
      'K⁺ travels faster through ion channels than Na⁺'
    ],
    answer: 1,
    explanation: 'The stria vascularis actively pumps K⁺ into the scala media (endolymph), creating a large electrochemical gradient. When mechanically-gated channels open on hair cells, K⁺ rushes IN (driven by both concentration and electrical gradients — the endocochlear potential is +80mV). This achieves rapid depolarization. The stria vascularis requires robust blood flow to maintain this gradient.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'Which type of taste receptor cell forms conventional synapses to relay information to afferent neurons?',
    options: ['Type I (supporting cells)', 'Type II (GPCR cells)', 'Type III (presynaptic cells)', 'All types equally'],
    answer: 2,
    explanation: '<strong>Type III cells</strong> are the only taste cells with conventional synapses (they release serotonin). They detect sour and are responsible for direct synaptic communication. Type II cells (sweet/bitter/umami) release ATP through pannexin channels without classical synapses. Type I cells are glial-like support cells involved in salt sensing.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'The olfactory system is unique in that it bypasses the thalamus. Where does olfactory information go first after the olfactory bulb?',
    options: [
      'Primary somatosensory cortex (parietal lobe)',
      'Piriform cortex (primary olfactory cortex)',
      'Inferior temporal cortex',
      'Anterior cingulate cortex'
    ],
    answer: 1,
    explanation: 'Olfactory receptor neurons → olfactory bulb → <strong>piriform cortex</strong> (and amygdala/entorhinal cortex) — <strong>no thalamic relay</strong>. This is unique among sensory systems. It explains why smell has such a direct connection to emotion and memory (amygdala + hippocampus nearby). All other senses pass through the thalamus first.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'A C-fiber nociceptor that responds to heat, pressure, AND chemical irritants is a classic example of a:',
    options: ['Tonic receptor', 'Lateral inhibition neuron', 'Polymodal receptor', 'Phasic mechanoreceptor'],
    answer: 2,
    explanation: '<strong>Polymodal receptors</strong> respond to multiple types of stimuli (mechanical, thermal, chemical). C-fiber nociceptors are the classic example — they respond to damaging heat (>45°C), mechanical damage, and chemicals like capsaicin or bradykinin via TRPV1 channels. This makes them excellent danger detectors across multiple modalities.'
  },
  {
    topic: 'sensory',
    topicLabel: '👁 Sensory',
    q: 'Visual information from the retina travels to the primary visual cortex located in which brain lobe?',
    options: ['Frontal lobe', 'Temporal lobe', 'Parietal lobe', 'Occipital lobe'],
    answer: 3,
    explanation: 'Retina → optic nerve → optic chiasm → lateral geniculate nucleus of thalamus → <strong>primary visual cortex (V1) in the occipital lobe</strong>. Information from the left visual field ends up in the right occipital cortex and vice versa (due to the chiasm crossing).'
  },

  // --- MUSCLES ---
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'During muscle contraction using the sliding filament theory, which band/zone DOES NOT change size?',
    options: ['I band', 'H zone', 'A band', 'Sarcomere length'],
    answer: 2,
    explanation: 'The <strong>A band stays the SAME</strong> — it represents the length of the thick (myosin) filaments, which don\'t change. The <strong>I band shortens</strong> (thin filaments overlap more), the <strong>H zone shortens</strong> (region of pure thick filament disappears as thin filaments slide in), and the overall sarcomere shortens. Z lines move closer together.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'In excitation-contraction coupling, what is the function of T-tubules?',
    options: [
      'They store calcium ions for release during contraction',
      'They are the site where ATP is produced for myosin',
      'They conduct action potentials deep into the muscle fiber to reach the SR rapidly',
      'They directly bind to actin to initiate the power stroke'
    ],
    answer: 2,
    explanation: 'T-tubules (transverse tubules) are deep invaginations of the sarcolemma. They allow the action potential to travel <strong>rapidly and uniformly deep into the muscle fiber</strong>, reaching the sarcoplasmic reticulum (SR) throughout the cell simultaneously. This ensures all sarcomeres contract at once rather than waiting for diffusion of a signal. The SR (not T-tubules) stores Ca²⁺.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'In skeletal muscle, the DHP receptor activates the RyR receptor through:',
    options: [
      'A Ca²⁺-induced Ca²⁺ release mechanism (CICR)',
      'Direct mechanical coupling (conformational change)',
      'Release of IP3 as a second messenger',
      'Depolarization-induced ACh release'
    ],
    answer: 1,
    explanation: 'In <strong>skeletal muscle</strong>, the DHP receptor (in the T-tubule membrane) is a <strong>voltage sensor</strong> that physically/mechanically couples to the RyR (ryanodine receptor) on the SR. When depolarization changes DHP conformation, it mechanically pulls the RyR open — no Ca²⁺ needed to trigger it. This is different from <strong>cardiac muscle</strong>, which uses Ca²⁺-induced Ca²⁺ release (CICR): a small Ca²⁺ influx through L-type channels triggers SR Ca²⁺ release.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'Rigor mortis (post-death muscle stiffness) is caused by:',
    options: [
      'Excess calcium flooding into muscle cells',
      'Myosin cross-bridges unable to detach without ATP',
      'Actin filaments permanently fusing to myosin',
      'Lactic acid hardening myofibrils'
    ],
    answer: 1,
    explanation: 'After death, ATP production stops. Myosin heads can bind actin but <strong>cannot detach</strong> without ATP (ATP binding is required for cross-bridge release, not formation). The muscles lock in a contracted state. Rigor mortis peaks ~12 hours after death and resolves 24-48 hours later as muscle proteins degrade.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'Which of the following is a primary cause of muscle fatigue during intense exercise?',
    options: [
      'Lactic acid directly corroding myosin filaments',
      'Pi (inorganic phosphate) accumulation reducing myosin ATPase activity and Ca²⁺ sensitivity',
      'The Golgi Tendon Organ permanently inhibiting motor neurons',
      'Complete depletion of the phosphocreatine system only'
    ],
    answer: 1,
    explanation: 'Current research shows <strong>inorganic phosphate (Pi)</strong> accumulation is a major fatigue mechanism — it inhibits myosin ATPase and reduces myofibril sensitivity to Ca²⁺ (calcium can\'t bind troponin as effectively). K⁺ accumulation outside the cell (reducing excitability) and H⁺ (inhibiting glycolytic enzymes) also contribute. Lactic acid itself doesn\'t "corrode" anything — the acidosis from H⁺ is the problem, not lactate per se.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'DOMS (delayed onset muscle soreness) peaks 24-72 hours after exercise and is primarily caused by:',
    options: [
      'Lactic acid accumulation in muscle tissue',
      'Eccentric muscle contractions causing micro-tears and subsequent inflammation',
      'Rapid depletion of glycogen stores',
      'Excessive action potential firing burning out motor neurons'
    ],
    answer: 1,
    explanation: '<strong>DOMS</strong> is caused by micro-tears (especially from <strong>eccentric contractions</strong> — lengthening under load) → inflammatory response → prostaglandins sensitize nociceptors. The delayed peak (24-72h) matches the inflammatory timeline. Lactic acid is cleared within an hour of exercise — it is NOT responsible for DOMS (common misconception!).'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'The Golgi Tendon Organ (GTO) senses:',
    options: [
      'Muscle length changes',
      'Muscle stretch velocity',
      'Muscle tension / force',
      'Oxygen levels in muscle tissue'
    ],
    answer: 2,
    explanation: 'The <strong>Golgi Tendon Organ</strong> is located at the muscle-tendon junction and senses <strong>tension/force</strong>. When tension gets too high, GTOs inhibit the muscle (autogenic inhibition via Ib interneurons) to prevent tendon rupture. Muscle <strong>length</strong> and stretch velocity are sensed by muscle spindles (intrafusal fibers, Ia and II afferents).'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'You\'ve been sprinting all-out for 8 seconds. What is your PRIMARY fuel source at this moment?',
    options: [
      'Fat oxidation (β-oxidation)',
      'Aerobic glycolysis (glucose + oxygen)',
      'ATP + Phosphocreatine (PCr)',
      'Ketone bodies from the liver'
    ],
    answer: 2,
    explanation: 'The <strong>ATP-PCr system</strong> fuels maximal exercise for the first ~10 seconds. Phosphocreatine rapidly donates its phosphate to ADP → ATP (creatine kinase reaction). This is anaerobic, fast, and requires no oxygen. At ~10-30 seconds, anaerobic glycolysis takes over; at ~2+ minutes, aerobic oxidative metabolism dominates; at ~30+ minutes, fat becomes increasingly important.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'What structural feature allows cardiac muscle to function as an electrical syncytium?',
    options: [
      'Multiple nuclei per cell',
      'T-tubules at every sarcomere',
      'Gap junctions within intercalated discs',
      'Troponin I instead of troponin T'
    ],
    answer: 2,
    explanation: '<strong>Intercalated discs</strong> contain <strong>gap junctions</strong> (connexin proteins) that directly connect the cytoplasm of adjacent cardiomyocytes. This allows action potentials to spread cell-to-cell without needing individual nerve innervation — the entire heart contracts as one unit (syncytium). Intercalated discs also contain desmosomes for mechanical coupling to prevent cells from pulling apart.'
  },
  {
    topic: 'muscles',
    topicLabel: '💪 Muscles',
    q: 'Compared to slow-twitch (Type I) fibers, fast-twitch (Type II) fibers have:',
    options: [
      'More mitochondria and greater fatigue resistance',
      'Higher myoglobin content giving a red color',
      'Faster cross-bridge cycling and greater peak force but fatigue quickly',
      'Better suited to marathon running'
    ],
    answer: 2,
    explanation: '<strong>Fast-twitch (Type II)</strong>: faster myosin ATPase, rapid cross-bridge cycling, large diameter → <strong>more force but fatigue quickly</strong>. They are white (less myoglobin), glycolytic (less O₂ needed), have fewer mitochondria. <strong>Slow-twitch (Type I)</strong>: red (lots of myoglobin), oxidative/aerobic, fatigue resistant, smaller diameter, ideal for endurance.'
  },

  // --- BLOOD ---
  {
    topic: 'blood',
    topicLabel: '🩸 Blood',
    q: 'Erythropoiesis is stimulated primarily by:',
    options: [
      'High blood pressure detected by baroreceptors',
      'Low oxygen levels detected by the kidneys, triggering EPO release',
      'Iron deficiency detected by the liver',
      'High CO₂ levels detected by the medulla'
    ],
    answer: 1,
    explanation: 'Low O₂ (hypoxia) → kidney peritubular cells detect it → secrete <strong>erythropoietin (EPO)</strong> → travels to bone marrow → stimulates RBC production. This is why high-altitude athletes train at altitude (or why EPO is abused in cycling — it boosts RBC count and O₂ carrying capacity). Anemia, hemorrhage, and high altitude all trigger EPO.'
  },
  {
    topic: 'blood',
    topicLabel: '🩸 Blood',
    q: 'What are the two main functions of albumin?',
    options: [
      'Clotting and immune defense',
      'Maintaining oncotic pressure and serving as a carrier protein',
      'Buffering blood pH and transporting oxygen',
      'Activating complement and producing antibodies'
    ],
    answer: 1,
    explanation: '<strong>Albumin</strong> (made by liver): (1) <strong>Oncotic pressure</strong> — keeps fluid inside capillaries by drawing water in osmotically (low albumin = edema). (2) <strong>Carrier protein</strong> — binds and transports hormones (thyroid, cortisol), fatty acids, bilirubin, calcium, and many drugs. We\'d want to produce more albumin when: protein-losing nephropathy, liver disease, or burns reduce albumin levels.'
  },
  {
    topic: 'blood',
    topicLabel: '🩸 Blood',
    q: 'During the coagulation cascade, what converts fibrinogen to fibrin?',
    options: ['Factor Xa', 'Thrombin (Factor IIa)', 'Vitamin K', 'Plasminogen'],
    answer: 1,
    explanation: '<strong>Thrombin</strong> (activated from prothrombin by Factor Xa + Va complex = prothrombinase) cleaves fibrinogen into fibrin monomers, which polymerize into a fibrin mesh. Factor XIIIa then crosslinks fibrin strands for stability. Thrombin also activates Factor XIII and amplifies the cascade — but there are negative feedback mechanisms (thrombomodulin/protein C) to prevent runaway clotting.'
  },
  {
    topic: 'blood',
    topicLabel: '🩸 Blood',
    q: 'When you begin exercising, where is most of the blood redirected?',
    options: [
      'Liver and digestive organs to fuel energy production',
      'Skin exclusively for thermoregulation',
      'Active skeletal muscles via sympathetic vasoconstriction of non-essential beds + local vasodilation',
      'Brain, which demands more glucose during exercise'
    ],
    answer: 2,
    explanation: 'Sympathetic nervous system causes vasoconstriction in splanchnic (gut/liver), renal, and skin beds → redirects blood to working <strong>skeletal muscles</strong>. Simultaneously, local metabolites (CO₂, H⁺, adenosine, K⁺) in active muscles cause local vasodilation. Skin vasodilation occurs later for thermoregulation. Brain blood flow is autoregulated and stays relatively constant.'
  },
  {
    topic: 'blood',
    topicLabel: '🩸 Blood',
    q: 'Elephantiasis causes massive limb swelling through which mechanism?',
    options: [
      'Liver failure reducing albumin production',
      'Heart failure causing increased capillary hydrostatic pressure',
      'Lymphatic obstruction by parasitic worms (Wuchereria bancrofti)',
      'Kidney disease causing protein loss in urine'
    ],
    answer: 2,
    explanation: 'Elephantiasis is caused by <strong>filarial worms (Wuchereria bancrofti)</strong> blocking lymphatic vessels. Lymph cannot drain → fluid accumulates in interstitial space → massive edema (lymphedema). This is different from cardiac edema (↑ hydrostatic pressure), hepatic edema (↓ albumin/oncotic pressure), or renal edema (protein loss in nephrotic syndrome).'
  },

  // --- HEART ---
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'Pacemaker cells in the SA node differ from ventricular myocytes because they:',
    options: [
      'Have a stable resting potential of -90mV like all excitable cells',
      'Depolarize via fast Na⁺ channels in phase 0',
      'Have no stable resting membrane potential — "funny current" causes spontaneous slow depolarization',
      'Require a nerve impulse to initiate each beat'
    ],
    answer: 2,
    explanation: 'Pacemaker cells have <strong>no stable resting potential</strong>. Instead, after repolarization (~-60mV), HCN channels open → "funny current" (If) — slow Na⁺ influx → spontaneous depolarization (automaticity). When threshold is reached, Ca²⁺ channels (not fast Na⁺) drive the upstroke. This is why there is NO phase 4 flat line like ventricular cells. The SA node is the primary pacemaker because it has the steepest slope (fastest automatic rate).'
  },
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'The Frank-Starling Law states that:',
    options: [
      'Increased heart rate always leads to increased stroke volume',
      'Greater ventricular filling (preload) leads to stronger contraction and greater stroke volume',
      'Increased afterload increases stroke volume',
      'The heart rate is determined by venous return only'
    ],
    answer: 1,
    explanation: 'Frank-Starling Law: <strong>more stretch = stronger contraction</strong>. Greater venous return → more end-diastolic volume → sarcomeres stretched → optimal myosin-actin overlap → more force. This is an intrinsic property of cardiac muscle (not dependent on nerves). It allows the heart to automatically match output to input and ensures the left and right ventricles pump equal volumes.'
  },
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'At the arterial end of a capillary, net fluid movement is outward (filtration). This is primarily because:',
    options: [
      'Oncotic pressure exceeds hydrostatic pressure',
      'Capillary hydrostatic pressure (~35 mmHg) exceeds plasma oncotic pressure (~25 mmHg)',
      'Osmotic pressure drives water toward the tissues',
      'Lymphatic pumping creates negative pressure in tissues'
    ],
    answer: 1,
    explanation: 'Starling forces at capillaries: <strong>Hydrostatic pressure</strong> (blood pressure) pushes fluid OUT. <strong>Oncotic pressure</strong> (plasma proteins, mainly albumin) pulls fluid IN. Arterial end: hydrostatic (~35) > oncotic (~25) → net filtration OUT. Venous end: hydrostatic (~15) < oncotic (~25) → net reabsorption IN. The small net amount that stays in tissues is returned by the lymphatics.'
  },
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'Which sequence correctly describes electrical conduction through the heart?',
    options: [
      'AV node → SA node → Bundle of His → Purkinje fibers',
      'SA node → AV node → Bundle of His → Bundle branches → Purkinje fibers → ventricles',
      'SA node → Bundle of His → AV node → Purkinje fibers',
      'Purkinje fibers → AV node → SA node → ventricles'
    ],
    answer: 1,
    explanation: '<strong>SA node</strong> (pacemaker, right atrium) → depolarizes atria → <strong>AV node</strong> (delays signal 0.1s — allows atria to finish contracting) → <strong>Bundle of His</strong> → <strong>left and right bundle branches</strong> → <strong>Purkinje fibers</strong> → ventricular myocytes (apex first, so contraction squeezes blood upward toward outflow tracts).'
  },
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'The long plateau (Phase 2) of the ventricular action potential is caused by and serves what purpose?',
    options: [
      'K⁺ influx; allows time for diastolic filling',
      'Ca²⁺ influx through L-type channels; ensures prolonged contraction and prevents re-excitation (tetanus)',
      'Na⁺ influx; triggers calcium release from the SR',
      'Cl⁻ efflux; resets the membrane potential quickly'
    ],
    answer: 1,
    explanation: 'Phase 2 plateau: <strong>Ca²⁺ influx</strong> through L-type (dihydropyridine) channels is balanced by K⁺ efflux, keeping the membrane near 0mV for 200-300ms. This serves two purposes: (1) triggers Ca²⁺-induced Ca²⁺ release from SR for contraction, and (2) creates a <strong>long refractory period</strong> preventing summation/tetanus — critical because cardiac muscle must relax to refill before the next beat.'
  },
  {
    topic: 'heart',
    topicLabel: '❤️ Heart',
    q: 'Atherosclerosis begins with:',
    options: [
      'Smooth muscle cells spontaneously proliferating in the media',
      'Endothelial damage allowing oxidized LDL to infiltrate the intima and attract monocytes',
      'Platelets aggregating without prior vessel injury',
      'High HDL levels causing cholesterol deposition'
    ],
    answer: 1,
    explanation: 'Atherosclerosis progression: (1) <strong>Endothelial damage</strong> (oxidized LDL, shear stress, smoking, hypertension) → (2) Monocytes infiltrate intima → become macrophages → engulf ox-LDL → <strong>foam cells</strong> (fatty streak) → (3) Smooth muscle migrates, caps the plaque (fibrous cap) → (4) Plaque rupture exposes collagen → platelets aggregate + coagulation cascade → thrombus → infarction.'
  },

  // --- RESPIRATORY ---
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'The Bohr effect explains why exercising muscles receive more oxygen. Which set of conditions causes hemoglobin to RELEASE oxygen more readily?',
    options: [
      'High pH, low CO₂, low temperature',
      'Low pH (acidosis), high CO₂, high temperature',
      'High PO₂, low 2,3-DPG, low temperature',
      'Low pH, high PO₂, low temperature'
    ],
    answer: 1,
    explanation: '<strong>Bohr effect</strong>: conditions at exercising tissues (↑CO₂, ↓pH, ↑temp, ↑2,3-DPG) → right shift of Hb-O₂ curve → hemoglobin releases O₂ more easily. This is adaptive — exercising muscles produce CO₂ and H⁺, which triggers Hb to unload O₂ right where it\'s needed. At the lungs, the reverse occurs: CO₂ is expelled, pH rises, Hb reloads O₂.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Most CO₂ in the blood is transported as:',
    options: [
      'Dissolved CO₂ in plasma (~70%)',
      'Carbaminohemoglobin bound to Hb (~70%)',
      'Bicarbonate ions (HCO₃⁻) in plasma (~70%)',
      'Carbonic acid (H₂CO₃) in RBCs (~70%)'
    ],
    answer: 2,
    explanation: '~<strong>70% of CO₂</strong> is transported as <strong>bicarbonate (HCO₃⁻)</strong>: CO₂ enters RBCs → <strong>carbonic anhydrase</strong> rapidly catalyzes CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. HCO₃⁻ exits into plasma (chloride shift); H⁺ is buffered by Hb. ~23% as carbaminohemoglobin (CO₂ bound to globin proteins), ~7% dissolved in plasma.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Myoglobin has a higher affinity for oxygen than hemoglobin. What does this mean functionally?',
    options: [
      'Myoglobin releases oxygen easily to mitochondria even at low PO₂',
      'Myoglobin holds onto oxygen more tightly, making it a storage molecule in muscle',
      'Both A and B are true — it stores O₂ and releases it when mitochondrial PO₂ drops very low',
      'Myoglobin competes with Hb for oxygen in the blood'
    ],
    answer: 2,
    explanation: 'Myoglobin\'s <strong>high O₂ affinity</strong> (left-shifted, hyperbolic curve) means: (1) It loads O₂ easily from capillary blood even at relatively low PO₂, and (2) It stores that O₂ in muscle. It only releases O₂ at <strong>very low PO₂ levels</strong> — i.e., when mitochondria are actively consuming O₂ and PO₂ drops dramatically. Think of it as an emergency reserve for muscle during intense exercise.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Which lung volume CANNOT be measured by spirometry and why?',
    options: [
      'IRV — it requires maximal effort which patients can\'t always perform',
      'RV (residual volume) — it never leaves the lungs even after maximal exhalation',
      'ERV — it requires specialized equipment',
      'VT — it is too small to detect'
    ],
    answer: 1,
    explanation: '<strong>Residual Volume (RV)</strong> is the air remaining in the lungs after a <strong>maximal exhalation</strong>. Since it never moves through the mouthpiece of a spirometer, it cannot be measured by spirometry. Measuring RV requires indirect methods like helium dilution or body plethysmography. Note: anything including RV (FRC, TLC) also can\'t be measured by spirometry alone.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Acclimatization to high altitude involves several adaptations. Which of these occurs WITHIN THE FIRST FEW HOURS?',
    options: [
      'Increased red blood cell production (erythropoiesis)',
      'Increased 2,3-DPG in RBCs shifting the O₂ curve right',
      'Hyperventilation to lower PCO₂ and increase alveolar PO₂',
      'More capillaries growing in muscle tissue'
    ],
    answer: 2,
    explanation: 'Timeline of altitude acclimatization: <strong>Hours</strong>: hyperventilation (low PO₂ stimulates peripheral chemoreceptors) lowers PCO₂, causing respiratory alkalosis. <strong>Days</strong>: 2,3-DPG rises (right shifts O₂ curve), kidneys compensate alkalosis (↑HCO₃⁻ excretion). <strong>Weeks</strong>: ↑EPO → ↑RBC production; more capillaries; more mitochondria. Erythropoiesis takes days-weeks, not hours.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Which cells produce surfactant and why is surfactant important?',
    options: [
      'Type I pneumocytes; they lower surface tension to prevent alveoli from collapsing',
      'Type II pneumocytes; they lower alveolar surface tension preventing collapse on exhalation',
      'Alveolar macrophages; they coat the alveoli with a protective lipid layer',
      'Clara cells; they secrete surfactant into the bronchioles to reduce resistance'
    ],
    answer: 1,
    explanation: '<strong>Type II pneumocytes</strong> produce <strong>surfactant</strong> (dipalmitoylphosphatidylcholine + proteins). Surfactant reduces alveolar surface tension — without it, small alveoli would collapse (law of Laplace: P = 2T/r — smaller radius = higher pressure wanting to collapse). Premature infants lack surfactant → infant respiratory distress syndrome (RDS). Type II cells also regenerate the epithelium (stem cell-like function).'
  },

  // --- RESPIRATORY (NEW) ---
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Air enters the pleural space after a stab wound to the chest. Which complication is MOST likely?',
    options: [
      'Pulmonary embolism',
      'Pneumothorax (lung collapse)',
      'Hemothorax only',
      'Diaphragm paralysis'
    ],
    answer: 1,
    explanation: '<strong>Pneumothorax</strong>: The pleural cavity normally has negative pressure that keeps the lung expanded against the chest wall. When air enters (trauma, spontaneous rupture), this negative pressure is lost → the lung recoils and collapses. Pleural fluid normally just reduces friction between visceral and parietal pleura. Tension pneumothorax (mediastinal shift) is a life-threatening emergency.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Why does the left lung have only 2 lobes while the right lung has 3?',
    options: [
      'The right bronchus is longer, allowing more branching',
      'The left lung is smaller to accommodate the cardiac notch (space for the heart)',
      'The left diaphragm is higher, compressing the left lung',
      'Left lung receives less blood flow from the pulmonary artery'
    ],
    answer: 1,
    explanation: 'The heart sits slightly left of center, and the <strong>cardiac notch</strong> on the left lung creates an indentation to accommodate it. This makes the left lung smaller (and therefore bilobed), while the right lung has more room for 3 lobes. The left lung also lacks the middle lobe found on the right.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Bronchioles, unlike bronchi, have no cartilage. What clinical consequence does this have?',
    options: [
      'Bronchioles cannot conduct air — they only exchange gases',
      'Bronchioles rely on smooth muscle and are susceptible to constriction, as seen in asthma',
      'Bronchioles collapse during normal exhalation in healthy individuals',
      'Lack of cartilage makes bronchioles more resistant to infections'
    ],
    answer: 1,
    explanation: 'Cartilage keeps large airways (trachea, bronchi) rigid and patent. <strong>Bronchioles</strong> depend on surrounding lung tissue and <strong>smooth muscle</strong> tone instead. When smooth muscle contracts (bronchoconstriction) — due to allergens, inflammation, cold air — bronchioles narrow dramatically. This is the pathophysiology of <strong>asthma</strong>. Bronchodilators (like albuterol) relax this smooth muscle to open the airways.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'A swimmer hyperventilates before a breath-hold dive. During the dive, he loses consciousness underwater without feeling the urge to breathe. What is the physiological explanation?',
    options: [
      'Hyperventilation raised blood O₂ to dangerously high levels',
      'Hyperventilation lowered CO₂ so much that the urge to breathe was suppressed — O₂ silently fell to dangerous levels',
      'Cold water caused the mammalian dive reflex to halt breathing signals',
      'Lactic acid from swimming raised blood pH beyond the respiratory threshold'
    ],
    answer: 1,
    explanation: '<strong>Shallow water blackout:</strong> Breathing drive is primarily regulated by CO₂ (not O₂). Hyperventilation before diving drastically lowers PCO₂. The brain senses "no CO₂ = fine to hold breath." Meanwhile, O₂ is being consumed and falls to critically low levels — but since CO₂ never rises high enough to trigger the urge to breathe, the swimmer loses consciousness suddenly. This is a leading cause of drowning in competitive breath-holders.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'By Boyle\'s Law, when the diaphragm contracts and flattens during inspiration, what happens?',
    options: [
      'Thoracic volume decreases → intrapulmonary pressure rises → air flows in',
      'Thoracic volume increases → intrapulmonary pressure falls → air flows in',
      'Thoracic volume increases → intrapulmonary pressure rises → air flows out',
      'Diaphragm contraction directly pumps air through the trachea'
    ],
    answer: 1,
    explanation: '<strong>Boyle\'s Law</strong>: P × V = constant (at fixed temperature). Diaphragm contracts → dome flattens → thoracic cavity volume <strong>increases</strong> → intrapulmonary pressure <strong>decreases</strong> below atmospheric → pressure gradient drives air INTO the lungs. Expiration is mostly passive: diaphragm relaxes → elastic recoil → volume decreases → pressure rises → air flows OUT.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'Surfactant is critically important for lung function because:',
    options: [
      'It transports oxygen across the alveolar membrane',
      'It reduces alveolar surface tension, preventing small alveoli from collapsing',
      'It increases compliance by stiffening the alveolar walls',
      'It neutralizes pathogens that reach the alveoli'
    ],
    answer: 1,
    explanation: 'By the <strong>Law of Laplace</strong> (P = 2T/r), small alveoli have higher collapsing pressure. Without surfactant, surface tension from the fluid lining would collapse small alveoli, causing them to empty into larger ones (atelectasis). <strong>Surfactant</strong> (made by Type II pneumocytes, mainly dipalmitoylphosphatidylcholine) reduces surface tension, especially in small alveoli. Premature infants lack surfactant → neonatal Respiratory Distress Syndrome (RDS).'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'At sea level (760 mmHg total pressure), what is the approximate partial pressure of oxygen (PO₂)?',
    options: ['760 mmHg', '159 mmHg', '78 mmHg', '40 mmHg'],
    answer: 1,
    explanation: 'By <strong>Dalton\'s Law</strong>: PO₂ = fraction × total pressure. O₂ is ~21% of air: 0.21 × 760 = <strong>~159 mmHg</strong>. At high altitude, total pressure falls so PO₂ also falls — even though the percentage of O₂ in air stays the same at ~21%. This reduction in PO₂ (not percentage) is why altitude causes hypoxia. Alveolar PO₂ is lower (~100 mmHg) due to water vapor and CO₂.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: 'A deep-sea diver ascends too rapidly. She develops joint pain and neurological symptoms. What is the mechanism?',
    options: [
      'O₂ toxicity causing damage to neurons',
      'Nitrogen dissolves into blood at depth; rapid ascent → nitrogen forms bubbles in blood ("the bends")',
      'CO₂ buildup from being in a closed tank',
      'Pulmonary barotrauma from over-expanding lungs'
    ],
    answer: 1,
    explanation: '<strong>Decompression sickness ("the bends")</strong>: Henry\'s Law states gas dissolves into liquid proportional to pressure. At depth, high pressure forces N₂ to dissolve into blood and tissues. Rapid ascent → pressure drops suddenly → dissolved N₂ comes out of solution as bubbles → bubbles in joints (pain), spinal cord (paralysis), lungs (chokes). Treatment: hyperbaric chamber; prevention: slow ascent with decompression stops.'
  },
  {
    topic: 'respiratory',
    topicLabel: '🫁 Respiratory',
    q: '2,3-DPG levels in red blood cells increase during anemia and at high altitude. What is the effect?',
    options: [
      'Left shift of the O₂-Hb dissociation curve → Hb holds O₂ more tightly',
      'Right shift of the O₂-Hb dissociation curve → Hb releases O₂ more easily to tissues',
      'Increased red blood cell production via EPO stimulation',
      'Increased CO₂ binding to hemoglobin'
    ],
    answer: 1,
    explanation: '2,3-DPG (2,3-diphosphoglycerate) binds to hemoglobin and <strong>reduces its affinity for O₂</strong>, causing a <strong>right shift</strong> of the dissociation curve. This means Hb unloads O₂ more readily to tissues — an adaptive response when O₂ delivery is compromised (anemia, high altitude, exercise). Note: fetal hemoglobin (HbF) does NOT bind 2,3-DPG well → HbF stays left-shifted → higher O₂ affinity to pull O₂ from maternal blood.'
  },

  // --- IMMUNE (NEW) ---
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Which cells BRIDGE innate and adaptive immunity by processing antigens and presenting them to T cells?',
    options: [
      'Natural killer (NK) cells',
      'Neutrophils',
      'Dendritic cells',
      'Mast cells'
    ],
    answer: 2,
    explanation: '<strong>Dendritic cells</strong> are professional antigen-presenting cells (APCs) that patrol tissues, phagocytose pathogens (innate response), then migrate to lymph nodes where they present antigens on MHC molecules to naive T cells — activating the adaptive immune response. They are the critical bridge between innate and adaptive immunity.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'MHC Class I presents antigens to which T cells, and what does this signify?',
    options: [
      'CD4+ Helper T cells; signals the cell needs help from other immune cells',
      'CD8+ Cytotoxic T cells; signals the cell is infected or abnormal and should be killed',
      'B cells; triggers antibody production',
      'NK cells; triggers complement activation'
    ],
    answer: 1,
    explanation: '<strong>MHC I</strong> is on ALL nucleated cells and presents intracellular peptides (from viral proteins or abnormal proteins) to <strong>CD8+ cytotoxic T cells</strong> (CTLs). When a CTL recognizes MHC I + foreign peptide → kills the cell via perforin/granzymes. <strong>MHC II</strong> is only on APCs (dendritic cells, macrophages, B cells) and presents extracellular antigens to <strong>CD4+ helper T cells</strong>.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Why is the coagulation cascade a "cascade" — what is the advantage of this design?',
    options: [
      'It allows clotting to occur slowly, preventing too much blood loss',
      'Each step amplifies the signal — a small trigger produces a massive, rapid clotting response',
      'It ensures only one type of clot forms regardless of the injury',
      'It prevents the immune system from activating during clotting'
    ],
    answer: 1,
    explanation: 'A cascade design provides <strong>enormous signal amplification</strong>: a tiny amount of tissue factor (a few molecules) activates a small amount of Factor VII → which activates more Factor X → each step multiplies → ultimately producing a burst of thrombin and fibrin clot. This ensures rapid response to vascular injury. It also has multiple checkpoints and inhibitors to prevent runaway activation throughout the body.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Immune memory is generated through which mechanism?',
    options: [
      'Permanent changes to the genetic code of all body cells',
      'Long-lived memory B and T cells that persist after infection and respond rapidly upon re-exposure',
      'Antibodies stored in the bone marrow for decades',
      'Macrophages that remember pathogen shapes indefinitely'
    ],
    answer: 1,
    explanation: 'After initial immune activation → clonal expansion → most effector cells die in the contraction phase, but a subset differentiate into <strong>long-lived memory cells</strong> (both B and T). Memory cells: (1) are more numerous than naive cells, (2) have lower activation thresholds, (3) respond faster (1-3 days vs 1-2 weeks). Memory B cells rapidly differentiate into plasma cells; memory T cells quickly become effectors. This is the basis of vaccination.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Inflammation causes the four cardinal signs: redness, heat, swelling, and pain. Which mediator is primarily responsible for PAIN during inflammation?',
    options: [
      'Histamine causing direct nerve damage',
      'Prostaglandins and bradykinin sensitizing nociceptors',
      'Complement proteins activating pain receptors',
      'Antibodies binding to nerve fibers'
    ],
    answer: 1,
    explanation: '<strong>Prostaglandins</strong> (from arachidonic acid via COX enzymes — blocked by NSAIDs/ibuprofen) and <strong>bradykinin</strong> sensitize nociceptors (lower their firing threshold) → pain. Histamine and PGE₂ also cause vasodilation (redness, heat) and increased permeability (swelling/edema). Cytokines (IL-1, TNF-α) cause systemic effects: fever (act on hypothalamus), fatigue, acute phase protein production.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Pattern Recognition Receptors (PRRs) like Toll-like receptors detect which type of molecular signature?',
    options: [
      'MHC molecules on self-cells',
      'PAMPs — conserved molecular patterns found on microbes (e.g., LPS, flagellin)',
      'IgE antibodies on mast cell surfaces',
      'Self-antigens presented by dendritic cells'
    ],
    answer: 1,
    explanation: '<strong>PAMPs</strong> (Pathogen-Associated Molecular Patterns) are conserved structures on microbes not found on host cells — e.g., LPS (gram-negative bacteria cell wall), peptidoglycan, bacterial flagellin, viral double-stranded RNA. <strong>PRRs</strong> (TLRs, NLRs) on innate immune cells recognize PAMPs → trigger immediate inflammatory response without needing prior exposure. This is the "danger signal" basis of innate immunity.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'A patient has a strep throat infection. Two weeks later they develop heart valve damage from their immune system attacking self-tissue. This is an example of:',
    options: [
      'Immediate hypersensitivity (Type I)',
      'Molecular mimicry leading to autoimmunity (rheumatic fever)',
      'Immune complex disease from IgE deposition',
      'Clonal deletion failure in the bone marrow'
    ],
    answer: 1,
    explanation: '<strong>Rheumatic fever</strong> is a classic example of <strong>molecular mimicry</strong>: Streptococcal proteins structurally resemble proteins in heart valves. Antibodies made against strep cross-react with cardiac tissue → immune attack on heart valves. This is why untreated strep throat can lead to permanent valvular heart disease. It\'s a form of autoimmunity triggered by cross-reactivity between foreign and self-antigens.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'In immediate hypersensitivity (allergy), what happens during the SECOND exposure to an allergen?',
    options: [
      'B cells undergo primary activation and produce IgE for the first time',
      'IgE already bound to mast cells is crosslinked by allergen → mast cell degranulation → histamine release',
      'Cytotoxic T cells destroy cells coated with allergen',
      'Dendritic cells activate regulatory T cells to suppress the response'
    ],
    answer: 1,
    explanation: '<strong>Sensitization (1st exposure):</strong> Allergen → IgE produced → IgE binds Fc receptors on mast cells (no symptoms). <strong>Elicitation (2nd exposure):</strong> Allergen crosslinks IgE on mast cells → mast cell degranulation → <strong>histamine</strong> release (within minutes) → vasodilation, itching, mucus secretion, bronchoconstriction. This is why the first exposure to an allergen usually causes no reaction but subsequent exposures can be severe.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Natural Killer (NK) cells kill cancer cells using what strategy that differs from cytotoxic T cells?',
    options: [
      'NK cells require MHC I + specific antigen presentation before killing',
      'NK cells kill cells that have LOST or DOWNREGULATED MHC I expression ("missing self")',
      'NK cells only function in the adaptive immune response',
      'NK cells use antibody-dependent signaling exclusively'
    ],
    answer: 1,
    explanation: '<strong>NK cells</strong> use the "missing self" strategy: normal healthy cells express MHC I, which inhibits NK killing. Cancer cells and virus-infected cells often downregulate MHC I to hide from cytotoxic T cells — but this <strong>loss of MHC I</strong> removes the inhibitory signal, activating NK cells to kill. NK cells also use perforins and granzymes (same as CTLs) but don\'t need prior sensitization or antigen-specific receptors.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Which antibody class is the FIRST produced during a primary immune response?',
    options: ['IgG', 'IgA', 'IgM', 'IgE'],
    answer: 2,
    explanation: '<strong>IgM</strong> is the first antibody class secreted during a primary immune response (appears within days). It is a large pentameric molecule effective at complement activation and agglutination. <strong>IgG</strong> is produced later but becomes the dominant antibody in the secondary response (class switching occurs). IgG has a longer half-life, crosses the placenta, and is more potent — which is why immunity from the secondary response is more powerful than the primary.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Regulatory T cells (Tregs) prevent autoimmunity. How?',
    options: [
      'They destroy all T cells that enter the lymph nodes',
      'They secrete suppressive cytokines (IL-10, TGF-β) that dampen autoreactive immune cells',
      'They convert self-antigens into non-immunogenic forms',
      'They compete with B cells for antigen binding sites'
    ],
    answer: 1,
    explanation: '<strong>Regulatory T cells (Tregs, CD4+FOXP3+)</strong> are the immune system\'s brakes. They suppress excessive or self-directed immune responses by: (1) secreting <strong>IL-10</strong> and <strong>TGF-β</strong> (anti-inflammatory cytokines), (2) direct cell contact inhibition of effector cells. Loss of Treg function is associated with severe autoimmunity (IPEX syndrome when FOXP3 is mutated). Tregs are also why cancer can sometimes suppress immune attacks against tumors.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Neutrophils arrive first at an infection site. How do they get through blood vessel walls into tissues?',
    options: [
      'They break through tight junctions using enzymatic digestion of the vessel wall',
      'Diapedesis — they squeeze between endothelial cells guided by chemokine gradients',
      'They are released directly into tissues from bone marrow',
      'Phagocytosis of endothelial cells creates a channel'
    ],
    answer: 1,
    explanation: '<strong>Diapedesis (extravasation):</strong> During inflammation, endothelial cells upregulate adhesion molecules (selectins, integrins). Neutrophils: (1) roll along vessel wall (selectin-mediated), (2) slow and adhere firmly (integrin-ICAM), (3) <strong>squeeze through endothelial junctions</strong> into tissues (diapedesis), (4) follow chemokine gradients (IL-8/CXCL8) to the infection site. Chemokines act as chemical breadcrumbs guiding neutrophils toward pathogens.'
  },
  {
    topic: 'immune',
    topicLabel: '🛡 Immune',
    q: 'Which primary lymphoid organ is responsible for T cell maturation and self-tolerance (negative selection)?',
    options: ['Spleen', 'Lymph node', 'Thymus', 'Bone marrow'],
    answer: 2,
    explanation: 'T cells mature in the <strong>thymus</strong>. Two key selection events: (1) <strong>Positive selection</strong>: T cells that can recognize self-MHC survive; others die (ensuring T cells can function). (2) <strong>Negative selection</strong>: T cells with too-high affinity for self-antigens are eliminated (preventing autoimmunity — this is clonal deletion). Only ~2% of thymocytes survive both checkpoints. Bone marrow is where B cells mature; the thymus is purely for T cells.'
  }
];

// ===== QUIZ STATE =====
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let missedQuestions = [];
let answered = false;
let activeTopic = 'all';

function buildQuestionPool(topic) {
  if (topic === 'missed') {
    currentQuestions = missedQuestions.length > 0 ? [...missedQuestions] : [...QUESTIONS];
    missedQuestions = [];
  } else if (topic === 'all') {
    currentQuestions = shuffleArray([...QUESTIONS]);
  } else {
    currentQuestions = shuffleArray(QUESTIONS.filter(q => q.topic === topic));
  }
  if (currentQuestions.length === 0) currentQuestions = shuffleArray([...QUESTIONS]);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initQuiz() {
  currentIndex = 0;
  score = 0;
  streak = 0;
  missedQuestions = [];
  buildQuestionPool(activeTopic);
  updateStats();
  document.getElementById('quiz-complete').classList.add('hidden');
  document.getElementById('quiz-card').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  if (currentIndex >= currentQuestions.length) {
    showComplete();
    return;
  }
  answered = false;
  const q = currentQuestions[currentIndex];
  document.getElementById('q-topic-tag').textContent = q.topicLabel;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-num').textContent = currentIndex + 1;
  document.getElementById('q-total').textContent = currentQuestions.length;

  // progress bar
  let pb = document.querySelector('.quiz-progress-bar');
  if (!pb) {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-progress-wrap';
    pb = document.createElement('div');
    pb.className = 'quiz-progress-bar';
    wrap.appendChild(pb);
    document.getElementById('quiz-card').prepend(wrap);
  }
  pb.style.width = `${(currentIndex / currentQuestions.length) * 100}%`;

  // build options
  const optContainer = document.getElementById('q-options');
  optContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-option';
    btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
    btn.onclick = () => selectAnswer(i);
    optContainer.appendChild(btn);
  });

  document.getElementById('q-feedback').classList.add('hidden');
  document.getElementById('q-feedback').className = 'q-feedback hidden';
  document.getElementById('q-explanation').classList.add('hidden');
  document.getElementById('q-explanation').innerHTML = '';
  document.getElementById('next-btn').classList.add('hidden');
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = currentQuestions[currentIndex];
  const opts = document.querySelectorAll('.q-option');
  opts.forEach(o => o.disabled = true);

  const feedback = document.getElementById('q-feedback');
  const explanation = document.getElementById('q-explanation');

  if (index === q.answer) {
    opts[index].classList.add('correct');
    feedback.textContent = '✓ Correct!';
    feedback.className = 'q-feedback correct-fb';
    score++;
    streak++;
    document.getElementById('quiz-card').classList.add('pop');
    setTimeout(() => document.getElementById('quiz-card').classList.remove('pop'), 300);
  } else {
    opts[index].classList.add('incorrect');
    opts[q.answer].classList.add('reveal-correct');
    feedback.textContent = `✗ Incorrect — the correct answer was ${String.fromCharCode(65 + q.answer)}.`;
    feedback.className = 'q-feedback incorrect-fb';
    streak = 0;
    missedQuestions.push(q);
  }

  feedback.classList.remove('hidden');
  explanation.innerHTML = q.explanation;
  explanation.classList.remove('hidden');
  document.getElementById('next-btn').classList.remove('hidden');
  updateStats();
}

function nextQuestion() {
  currentIndex++;
  renderQuestion();
  updateStats();
}

function updateStats() {
  const total = Math.max(currentIndex, 1);
  document.getElementById('score-val').textContent = `${score} / ${currentIndex}`;
  document.getElementById('streak-val').textContent = streak;
}

function showComplete() {
  document.getElementById('quiz-card').classList.add('hidden');
  const comp = document.getElementById('quiz-complete');
  comp.classList.remove('hidden');
  const pct = Math.round((score / currentQuestions.length) * 100);
  let emoji = '😅';
  let title = 'Keep Studying!';
  if (pct >= 90) { emoji = '🏆'; title = 'Excellent Work!'; }
  else if (pct >= 75) { emoji = '🎉'; title = 'Great Job!'; }
  else if (pct >= 60) { emoji = '👍'; title = 'Good Effort!'; }
  document.getElementById('complete-emoji').textContent = emoji;
  document.getElementById('complete-title').textContent = title;
  document.getElementById('complete-msg').textContent =
    `You scored ${score} out of ${currentQuestions.length} (${pct}%).${missedQuestions.length > 0 ? ` You missed ${missedQuestions.length} question${missedQuestions.length > 1 ? 's' : ''} — try "Review Missed" to practice them!` : ' Perfect score!'}`;
}

function restartQuiz() {
  initQuiz();
}

function filterQuestions(topic) {
  activeTopic = topic;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.topic === topic);
  });
  initQuiz();
}

// filter button listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterQuestions(btn.dataset.topic));
  });
  initQuiz();
});
