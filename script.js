/**
 * GramVani – Smart Rural Community Platform
 * Main Application Logic
 * 
 * Modules:
 * 1. Navigation & State Management (Single Page App)
 * 2. Voice & Text Grievance Redressal (Web Speech API + Keyword Heuristics)
 * 3. Complaint Tracking System (LocalStorage lookup + Visual Stepper)
 * 4. Village Education Directory (Mentorship + Privacy Controls)
 * 5. Village Skills Directory (Trade Services + Service Requests)
 * 6. Admin Dashboard (Live Metrics, Status Updates & Chart.js Visualizations)
 * 7. Sample Data Manager (Village Rampur Default Dataset)
 */

// ==========================================================================
// 1. Initial Sample Data for Village Rampur
// ==========================================================================

const DEFAULT_COMPLAINTS = [
  {
    id: "GV-2026-001",
    citizen: "Ramu Yadav",
    village: "Rampur",
    mobile: "9876543210",
    category: "Water Supply",
    priority: "High",
    method: "Voice (Telugu)",
    description: "Main drinking water pipeline near Ram temple has severe leakage for 3 days. Water is overflowing into the street and houses are receiving low pressure.",
    status: "In Progress",
    statusMessage: "Panchayat lineman and water board contractor inspected the valve. Replacement pipe segment procured; repairs underway.",
    date: "06 Nov 2026",
    timestamp: Date.now() - 172800000,
    lastUpdated: "07 Nov 2026, 04:30 PM"
  },
  {
    id: "GV-2026-002",
    citizen: "Venkatamma G.",
    village: "Rampur",
    mobile: "9848123456",
    category: "Electricity",
    priority: "High",
    method: "Text Entry",
    description: "Street light pole #14 near Zilla Parishad school is flickering and sparking in evening rain. Poses safety hazard for school children.",
    status: "Pending",
    statusMessage: "Complaint logged into electricity sub-station register. Field inspection scheduled for tomorrow morning.",
    date: "07 Nov 2026",
    timestamp: Date.now() - 86400000,
    lastUpdated: "07 Nov 2026, 06:15 PM"
  },
  {
    id: "GV-2026-003",
    citizen: "K. Nageswara Rao",
    village: "Rampur",
    mobile: "9988776655",
    category: "Roads",
    priority: "Medium",
    method: "Voice (English)",
    description: "Large potholes on Rampur-Kalyanpur connecting road after heavy rains. Two tractor carts almost overturned.",
    status: "In Progress",
    statusMessage: "Gravel and road repair truck dispatched by panchayat engineering wing. Patchwork is in progress.",
    date: "05 Nov 2026",
    timestamp: Date.now() - 259200000,
    lastUpdated: "07 Nov 2026, 11:00 AM"
  },
  {
    id: "GV-2026-004",
    citizen: "Babu Lal Patel",
    village: "Rampur",
    mobile: "9440112233",
    category: "Sanitation",
    priority: "Medium",
    method: "Text Entry",
    description: "Garbage collection bin near weekly market has been overflowing for past week, creating foul smell and stray animal menace.",
    status: "Resolved",
    statusMessage: "Sanitation squad cleared the market bin and established daily waste pickup schedule. Disinfectant powder sprayed.",
    date: "02 Nov 2026",
    timestamp: Date.now() - 518400000,
    lastUpdated: "04 Nov 2026, 02:00 PM"
  },
  {
    id: "GV-2026-005",
    citizen: "Sarada Devi",
    village: "Rampur",
    mobile: "9700123987",
    category: "Drainage",
    priority: "Medium",
    method: "Voice (Telugu)",
    description: "Clogged open drainage canal near North colony causing wastewater stagnation and mosquito breeding.",
    status: "Pending",
    statusMessage: "Awaiting sanitation supervisor inspection on Monday.",
    date: "07 Nov 2026",
    timestamp: Date.now() - 43200000,
    lastUpdated: "07 Nov 2026, 08:30 PM"
  }
];

const DEFAULT_EDUCATION = [
  {
    id: "EDU-001",
    name: "Ramesh Kumar Varma",
    village: "Rampur",
    qualification: "B.Tech / Engineering",
    field: "Computer Science",
    occupation: "Software Engineer (Remote)",
    languages: "Telugu, English, Hindi",
    skills: "Python, Basic Web Development, School Maths, Career Guidance in IT",
    willingToGuide: true,
    contact: "9848011223",
    privacyPublic: false,
    registeredDate: "10 Oct 2026"
  },
  {
    id: "EDU-002",
    name: "Ananya Reddy",
    village: "Rampur",
    qualification: "Postgraduate",
    field: "Agriculture",
    occupation: "Agriculture Extension Officer",
    languages: "Telugu, English",
    skills: "Soil Health, Crop Disease Identification, Organic Fertilizers, Agri-Business",
    willingToGuide: true,
    contact: "9440223344",
    privacyPublic: true,
    registeredDate: "15 Oct 2026"
  },
  {
    id: "EDU-003",
    name: "Suresh Babu",
    village: "Rampur",
    qualification: "Degree",
    field: "Science",
    occupation: "High School Maths & Science Teacher",
    languages: "Telugu, English",
    skills: "10th Class Board Maths, Physics experiments, Competitive Exam Coaching",
    willingToGuide: true,
    contact: "9876500112",
    privacyPublic: false,
    registeredDate: "20 Oct 2026"
  },
  {
    id: "EDU-004",
    name: "Priya Devi",
    village: "Rampur",
    qualification: "Intermediate",
    field: "Arts",
    occupation: "College Student / Women Self-Help Member",
    languages: "Telugu, English",
    skills: "Spoken English Basics, Government Welfare Scheme Guidance, Digital Literacy",
    willingToGuide: true,
    contact: "9123456789",
    privacyPublic: true,
    registeredDate: "25 Oct 2026"
  },
  {
    id: "EDU-005",
    name: "Dr. K. Venkat",
    village: "Rampur",
    qualification: "Postgraduate",
    field: "Healthcare",
    occupation: "Primary Health Center Doctor",
    languages: "Telugu, English, Hindi",
    skills: "Health Hygiene, First Aid Training, Preventive Medicine, Child Nutrition",
    willingToGuide: true,
    contact: "9849009988",
    privacyPublic: false,
    registeredDate: "01 Nov 2026"
  }
];

const DEFAULT_SKILLS = [
  {
    id: "SKILL-001",
    name: "M. Satyanarayana",
    village: "Rampur",
    category: "Electrician",
    specificSkills: "Submersible pump motor repair, house wiring, solar inverter installation, starter box fixing",
    experience: "12 years in agricultural & domestic electrical work",
    availability: "Daily 7:00 AM – 7:00 PM (Emergency calls accepted)",
    languages: "Telugu",
    contact: "9848556677",
    privacyPublic: true,
    registeredDate: "05 Oct 2026"
  },
  {
    id: "SKILL-002",
    name: "G. Krishna Murthy",
    village: "Rampur",
    category: "Plumber",
    specificSkills: "PVC pipeline fittings, overhead tank connection, borewell pipes, drip irrigation maintenance",
    experience: "8 years in rural and town plumbing",
    availability: "Mornings 8:00 AM – 1:00 PM & On-Call",
    languages: "Telugu, Hindi",
    contact: "9441887766",
    privacyPublic: false,
    registeredDate: "12 Oct 2026"
  },
  {
    id: "SKILL-003",
    name: "Lakshmi Bai",
    village: "Rampur",
    category: "Tailor",
    specificSkills: "Blouse stitching, school uniforms, saree falls, dress alterations, embroidery work",
    experience: "10 years running home tailoring unit",
    availability: "Monday to Saturday 9:00 AM – 6:00 PM",
    languages: "Telugu",
    contact: "9876123450",
    privacyPublic: true,
    registeredDate: "18 Oct 2026"
  },
  {
    id: "SKILL-004",
    name: "Ravi Teja",
    village: "Rampur",
    category: "Mechanic",
    specificSkills: "Two-wheeler motorcycle servicing, tractor basic maintenance, tire puncture, brake repairs",
    experience: "6 years at Main Bazaar Workshop",
    availability: "Daily 8:30 AM – 8:00 PM",
    languages: "Telugu",
    contact: "9988112233",
    privacyPublic: false,
    registeredDate: "22 Oct 2026"
  },
  {
    id: "SKILL-005",
    name: "B. Venkatesh",
    village: "Rampur",
    category: "Computer Operator",
    specificSkills: "MeeSeva online forms, Aadhaar corrections, bus/train ticket booking, photocopy, resume printing",
    experience: "4 years operating Gram Center kiosk",
    availability: "9:00 AM – 6:00 PM at Rampur Gram Center",
    languages: "Telugu, English",
    contact: "9123887711",
    privacyPublic: true,
    registeredDate: "28 Oct 2026"
  }
];

// LocalStorage Keys
const STORAGE_COMPLAINTS_KEY = "gramvani_complaints";
const STORAGE_EDUCATION_KEY = "gramvani_education";
const STORAGE_SKILLS_KEY = "gramvani_skills";

// ==========================================================================
// 2. Storage Helper Functions
// ==========================================================================

function getStoredComplaints() {
  const data = localStorage.getItem(STORAGE_COMPLAINTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
    return DEFAULT_COMPLAINTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_COMPLAINTS;
  }
}

function saveComplaints(complaints) {
  localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(complaints));
}

function getStoredEducation() {
  const data = localStorage.getItem(STORAGE_EDUCATION_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_EDUCATION_KEY, JSON.stringify(DEFAULT_EDUCATION));
    return DEFAULT_EDUCATION;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_EDUCATION;
  }
}

function saveEducation(eduList) {
  localStorage.setItem(STORAGE_EDUCATION_KEY, JSON.stringify(eduList));
}

function getStoredSkills() {
  const data = localStorage.getItem(STORAGE_SKILLS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(DEFAULT_SKILLS));
    return DEFAULT_SKILLS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_SKILLS;
  }
}

function saveSkills(skillsList) {
  localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(skillsList));
}

function resetAllDataToDefault() {
  localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
  localStorage.setItem(STORAGE_EDUCATION_KEY, JSON.stringify(DEFAULT_EDUCATION));
  localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(DEFAULT_SKILLS));
  showToast("Sample Data Restored", "Rampur default complaints, education and skills profiles restored.", "info");
  refreshAllViews();
}

// ==========================================================================
// 3. Navigation & Single Page App Controller
// ==========================================================================

const VIEW_IDS = ["home", "complaint", "track", "education", "skills", "admin", "about"];

function switchView(viewName) {
  if (!VIEW_IDS.includes(viewName)) {
    viewName = "home";
  }

  // Update hash
  if (window.location.hash !== `#${viewName}`) {
    window.location.hash = viewName;
  }

  // Hide all view panels and show target
  VIEW_IDS.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.add("active-view");
      } else {
        el.classList.remove("active-view");
      }
    }
  });

  // Update header nav link active classes
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile navigation drawer if open
  const nav = document.getElementById("primary-nav");
  const navToggle = document.getElementById("nav-toggle");
  if (nav && nav.classList.contains("open")) {
    nav.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Custom view hook triggers
  if (viewName === "admin") {
    renderAdminDashboard();
  } else if (viewName === "home") {
    updateHeroStats();
  } else if (viewName === "education") {
    renderEducationProfiles();
  } else if (viewName === "skills") {
    renderSkillsProfiles();
  }
}

// Listen to browser back/forward buttons
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && VIEW_IDS.includes(hash)) {
    switchView(hash);
  }
});

// ==========================================================================
// 4. Toast Notification System
// ==========================================================================

function showToast(title, message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "fa-circle-check";
  if (type === "error") iconClass = "fa-circle-exclamation";
  if (type === "info") iconClass = "fa-circle-info";

  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
    <div class="toast-content">
      <span class="toast-title">${title}</span>
      <p class="toast-desc">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 4.2 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4200);
}

// ==========================================================================
// 5. Module 1: Voice Recognition & Grievance Redressal
// ==========================================================================

// Keyword dictionaries for Category & Urgency detection with weighted scoring
const CATEGORY_KEYWORDS = {
  "Electricity": [
    "street light", "streetlight", "transformer", "electricity", "power", "current",
    "wire", "pole", "voltage", "blackout", "spark", "sparking", "shock", "bulb", "vidyut",
    "విద్యుత్", "దీపం", "కరెంట్", "ట్రాన్స్ఫార్మర్", "స్తంభం"
  ],
  "Water Supply": [
    "drinking water", "water supply", "pipeline", "borewell", "water", "bore", "tap",
    "pump", "submersible", "leak", "leakage", "neellu", "neeru", "jal", "tank", "valve",
    "తాగునీరు", "నీరు", "పైపు", "నీటి", "బోరు", "నల్లా"
  ],
  "Drainage": [
    "waste water", "open drainage", "drainage", "drain", "gutter", "sewage", "clog",
    "clogged", "overflow", "overflowing", "kaaluva", "stagnant water", "mosquito",
    "మురుగు", "కాలువ", "మురుగునీరు"
  ],
  "Sanitation": [
    "garbage bin", "garbage", "waste", "cleaning", "dustbin", "trash", "smell",
    "sweeping", "chetha", "stench", "rot", "plastic", "cleanliness",
    "చెత్త", "పరిశుభ్రత", "దుర్వాసన"
  ],
  "Roads": [
    "pothole", "potholes", "tar road", "gravel", "highway", "broken road",
    "mud road", "bridge", "road", "street", "dhaari",
    "రహదారి", "గుంత", "రోడ్డు", "దారి"
  ]
};

const HIGH_PRIORITY_KEYWORDS = [
  "urgent", "danger", "dangerous", "hazard", "spark", "sparking", "shock", 
  "overflowing", "disease", "accident", "broken pole", "flooding", "emergency", 
  "critical", "no drinking water", "immediate", "life", "children", 
  "ఆపద", "ప్రమాదం", "అత్యవసరం", "షాక్"
];

const MEDIUM_PRIORITY_KEYWORDS = [
  "leakage", "pothole", "repair", "broken", "garbage", "street light", 
  "flickering", "waste", "smell", "stench", "damage", "need fix", 
  "సమస్య", "బాగుచేయండి"
];

// ==========================================================================
// 5. Module 1: Voice-First Grievance Redressal & Speech Synthesis
// ==========================================================================

let speechRecognition = null;
let isRecordingVoiceFirst = false;
let isRecordingAssisted = false;
let selectedVoiceLang = "te-IN"; // Default to Telugu (తెలుగు)
let lastRegisteredComplaintId = "GV-2026-001";

// 5.1 Speech Synthesis (Text-to-Speech) Audio Guide
function speakAloud(text, lang = selectedVoiceLang) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92; // Slightly measured pace for rural comprehension
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (lang.startsWith("te")) {
        const teVoice = voices.find(v => v.lang.startsWith("te") || v.name.toLowerCase().includes("telugu"));
        if (teVoice) {
          utterance.voice = teVoice;
        } else {
          // Graceful fallback to Indian English/Hindi voice if Telugu engine not installed on device
          const inVoice = voices.find(v => v.lang.includes("en-IN") || v.lang.includes("hi-IN"));
          if (inVoice) utterance.voice = inVoice;
        }
      } else {
        const enVoice = voices.find(v => v.lang.includes("en-IN") || v.lang.startsWith("en"));
        if (enVoice) utterance.voice = enVoice;
      }
    }
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("SpeechSynthesis error:", err);
  }
}

function speakHomeGuide() {
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud("నమస్కారం! గ్రామవాణి వేదికకు స్వాగతం. మీ గ్రామంలో సమస్యలను సులభంగా తెలియజేయవచ్చు. పెద్ద మైక్రోఫోన్ బటన్ నొక్కి మీ సమస్యను చెప్పండి. ఎలాంటి చదవడం లేదా రాయడం అవసరం లేదు.", "te-IN");
  } else {
    speakAloud("Welcome to GramVani. You can report village problems using your voice. Tap the large microphone button and speak naturally in Telugu or English. No reading or writing is required.", "en-IN");
  }
}

function speakComplaintGuide() {
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud("వాయిస్ ఫిర్యాదు సూచనలు: ఒకటి - పెద్ద మైక్రోఫోన్ బటన్ నొక్కండి. రెండు - మీ సమస్యను తెలుగులో లేదా ఇంగ్లీషులో సహజంగా మాట్లాడండి. మూడు - ఆకుపచ్చ నమోదు బటన్ నొక్కండి. మీ పేరు మరియు ఫోన్ నంబర్ ఇవ్వడం ఐచ్ఛికం.", "te-IN");
  } else {
    speakAloud("Voice instructions: Step one - Tap the big microphone button. Step two - Speak your problem naturally in Telugu or English. Step three - Tap the green Register button. Name and phone number are optional.", "en-IN");
  }
}

function replayConfirmationAudio() {
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud(`మీ ఫిర్యాదు విజయవంతంగా నమోదైంది. మీ ఫిర్యాదు సంఖ్య: ${lastRegisteredComplaintId}. పంచాయతీ సిబ్బంది దీనిని త్వరలోనే పరిశీలిస్తారు. ధన్యవాదాలు.`, "te-IN");
  } else {
    speakAloud(`Your grievance has been submitted successfully. Your complaint ID is: ${lastRegisteredComplaintId}. Our local panchayat team will inspect this shortly. Thank you.`, "en-IN");
  }
}

function speakRecognizedText() {
  const text = document.getElementById("voice-first-desc")?.value.trim();
  if (text) {
    speakAloud(text, selectedVoiceLang);
  } else {
    if (selectedVoiceLang.startsWith("te")) {
      speakAloud("ఇంకా ఎలాంటి సమస్య రికార్డ్ కాలేదు. దయచేసి మైక్రోఫోన్ నొక్కి మాట్లాడండి.", "te-IN");
    } else {
      speakAloud("No speech captured yet. Please tap the microphone button and speak your problem.", "en-IN");
    }
  }
}

function speakCurrentTrackingStatus() {
  const compId = document.getElementById("track-disp-id")?.textContent || "";
  const status = document.getElementById("track-disp-status")?.textContent?.trim() || "";
  const updateMsg = document.getElementById("track-disp-status-message")?.textContent?.trim() || "";
  
  if (!compId) return;

  if (selectedVoiceLang.startsWith("te")) {
    speakAloud(`ఫిర్యాదు సంఖ్య: ${compId}. ప్రస్తుత స్థితి: ${status}. తాజా పంచాయతీ సమాచారం: ${updateMsg}`, "te-IN");
  } else {
    speakAloud(`Complaint ID: ${compId}. Current status is: ${status}. Official panchayat update: ${updateMsg}`, "en-IN");
  }
}

// 5.2 Gentle Audio Tone (Web Audio API)
function playChime(type = "start") {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "start") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    } else {
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
    }

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
}

// 5.3 Mode Switcher (Villager Voice Mode, Assisted Mode, Text Fallback)
function switchSubmissionMode(mode) {
  // Modes: 'voice', 'assisted', 'text'
  ['voice', 'assisted', 'text'].forEach(m => {
    const tabBtn = document.getElementById(`tab-btn-${m}`);
    const panel = document.getElementById(`mode-panel-${m}`);
    if (m === mode) {
      if (tabBtn) {
        tabBtn.classList.add('active');
        tabBtn.setAttribute('aria-selected', 'true');
      }
      if (panel) panel.classList.add('active-panel');
    } else {
      if (tabBtn) {
        tabBtn.classList.remove('active');
        tabBtn.setAttribute('aria-selected', 'false');
      }
      if (panel) panel.classList.remove('active-panel');
    }
  });

  // If switching away from voice mode, stop mic
  if (mode !== 'voice' && isRecordingVoiceFirst && speechRecognition) {
    speechRecognition.stop();
  }
}

// 5.4 Language Switching & Village Chips
function setVoiceLanguage(lang) {
  selectedVoiceLang = lang;
  const btnTe = document.getElementById("btn-lang-te");
  const btnEn = document.getElementById("btn-lang-en");
  
  if (btnTe) btnTe.classList.toggle("active", lang.startsWith("te"));
  if (btnEn) btnEn.classList.toggle("active", lang.startsWith("en"));

  if (speechRecognition) {
    speechRecognition.lang = lang;
    if (isRecordingVoiceFirst) {
      speechRecognition.stop();
      setTimeout(() => speechRecognition.start(), 200);
    }
  }

  // Update status labels
  const statusLabel = document.getElementById("voice-first-status-label");
  if (statusLabel && !isRecordingVoiceFirst) {
    statusLabel.textContent = lang.startsWith("te") 
      ? "మైక్రోఫోన్ సిద్ధంగా ఉంది (Microphone Ready)"
      : "Microphone Ready (Tap to Speak)";
  }
}

function selectVillageChip(villageName) {
  const chips = document.querySelectorAll(".village-chip");
  chips.forEach(c => {
    if (c.getAttribute("data-village") === villageName) {
      c.classList.add("active");
      c.innerHTML = `<i class="fa-solid fa-check"></i> ${villageName}`;
    } else {
      c.classList.remove("active");
      c.innerHTML = c.getAttribute("data-village");
    }
  });
  const input = document.getElementById("voice-first-village");
  if (input) input.value = villageName;
}

// 5.5 Speech Recognition Engine Initialization
function initializeSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const alertEl = document.getElementById("voice-first-mic-alert");

  if (!SpeechRecognition) {
    if (alertEl) {
      alertEl.style.display = "flex";
      document.getElementById("voice-first-mic-alert-msg").textContent = 
        "Note: Browser Web Speech API is not supported in this browser. Please use the Text Entry mode.";
    }
    return null;
  }

  speechRecognition = new SpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = selectedVoiceLang;

  speechRecognition.onstart = () => {
    playChime("start");
    if (isRecordingVoiceFirst) {
      updateVoiceFirstUI(true);
    } else if (isRecordingAssisted) {
      updateAssistedMicUI(true);
    }
  };

  speechRecognition.onresult = (event) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + " ";
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (isRecordingVoiceFirst) {
      const descEl = document.getElementById("voice-first-desc");
      if (descEl) {
        if (finalTranscript) {
          if (!descEl.value.endsWith(" ") && descEl.value.length > 0) {
            descEl.value += " ";
          }
          descEl.value += finalTranscript;
        }
        classifyVoiceFirstText(descEl.value + interimTranscript);
      }
    } else if (isRecordingAssisted) {
      const assistedDesc = document.getElementById("assisted-desc");
      if (assistedDesc) {
        if (finalTranscript) {
          if (!assistedDesc.value.endsWith(" ") && assistedDesc.value.length > 0) {
            assistedDesc.value += " ";
          }
          assistedDesc.value += finalTranscript;
        }
        // Auto classify for assisted form as well
        classifyAssistedText(assistedDesc.value + interimTranscript);
      }
    }
  };

  speechRecognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    isRecordingVoiceFirst = false;
    isRecordingAssisted = false;
    updateVoiceFirstUI(false);
    updateAssistedMicUI(false);

    let errorMsg = "Microphone error: " + event.error;
    if (event.error === "not-allowed") {
      errorMsg = "Microphone access was denied. Please allow microphone permission in your browser or switch to Text Mode.";
    } else if (event.error === "no-speech") {
      errorMsg = "No speech detected. Please tap the microphone and speak clearly.";
    }

    if (alertEl) {
      alertEl.style.display = "flex";
      document.getElementById("voice-first-mic-alert-msg").textContent = errorMsg;
    }
  };

  speechRecognition.onend = () => {
    playChime("stop");
    isRecordingVoiceFirst = false;
    isRecordingAssisted = false;
    updateVoiceFirstUI(false);
    updateAssistedMicUI(false);
  };

  return speechRecognition;
}

// 5.6 Voice-First Recording Controls
function toggleVoiceFirstRecording() {
  if (!speechRecognition) {
    initializeSpeechRecognition();
    if (!speechRecognition) {
      showToast("Speech Unsupported", "Please switch to Text Entry mode.", "info");
      return;
    }
  }

  if (isRecordingVoiceFirst) {
    speechRecognition.stop();
  } else {
    const alertEl = document.getElementById("voice-first-mic-alert");
    if (alertEl) alertEl.style.display = "none";
    isRecordingVoiceFirst = true;
    isRecordingAssisted = false;
    speechRecognition.lang = selectedVoiceLang;
    try {
      speechRecognition.start();
    } catch (e) {
      console.warn("Failed to start speech recognition:", e);
    }
  }
}

function startVoiceFromHome() {
  switchView('complaint');
  switchSubmissionMode('voice');
  setTimeout(() => {
    toggleVoiceFirstRecording();
  }, 400);
}

function clearVoiceFirstTranscript() {
  const descEl = document.getElementById("voice-first-desc");
  if (descEl) descEl.value = "";
  classifyVoiceFirstText("");
}

function updateVoiceFirstUI(listening) {
  const micBtn = document.getElementById("voice-first-mic-btn");
  const micIcon = document.getElementById("voice-first-mic-icon");
  const statusDot = document.getElementById("voice-first-pulse-dot");
  const statusLabel = document.getElementById("voice-first-status-label");
  const heading = document.getElementById("voice-first-action-heading");
  const sub = document.getElementById("voice-first-action-sub");
  const visualizer = document.getElementById("voice-first-visualizer");

  // Also update home mic if present
  const heroMicBtn = document.getElementById("hero-mic-btn");
  const heroMicTitle = document.getElementById("hero-mic-caption-title");

  if (listening) {
    if (micBtn) micBtn.classList.add("recording");
    if (micIcon) { micIcon.classList.remove("fa-microphone"); micIcon.classList.add("fa-stop"); }
    if (statusDot) statusDot.classList.add("listening");
    if (statusLabel) statusLabel.textContent = selectedVoiceLang.startsWith("te") ? "వినబడుతోంది... మాట్లాడండి" : "Listening... Speak Now";
    if (heading) heading.textContent = selectedVoiceLang.startsWith("te") ? "మీ సమస్యను చెప్పండి..." : "Listening to your problem...";
    if (sub) sub.textContent = selectedVoiceLang.startsWith("te") ? "మీరు మాట్లాడటం పూర్తయిన తర్వాత మళ్లీ నొక్కండి." : "Click again when done speaking.";
    if (visualizer) visualizer.style.display = "flex";

    if (heroMicBtn) heroMicBtn.classList.add("recording");
    if (heroMicTitle) heroMicTitle.textContent = "వినబడుతోంది...";
  } else {
    if (micBtn) micBtn.classList.remove("recording");
    if (micIcon) { micIcon.classList.remove("fa-stop"); micIcon.classList.add("fa-microphone"); }
    if (statusDot) statusDot.classList.remove("listening");
    if (statusLabel) statusLabel.textContent = selectedVoiceLang.startsWith("te") ? "మైక్రోఫోన్ సిద్ధంగా ఉంది (Ready)" : "Microphone Ready";
    if (heading) heading.textContent = selectedVoiceLang.startsWith("te") ? "మాట్లాడటానికి ఇక్కడ నొక్కండి" : "Tap here to Speak";
    if (sub) sub.textContent = selectedVoiceLang.startsWith("te") ? "క్లిక్ చేసి మీ సమస్యను సహజంగా మాట్లాడండి." : "Click once to speak. Speak your problem clearly.";
    if (visualizer) visualizer.style.display = "none";

    if (heroMicBtn) heroMicBtn.classList.remove("recording");
    if (heroMicTitle) heroMicTitle.textContent = "నొక్కండి - మాట్లాడండి";
  }
}

// 5.7 Assisted Mode Voice Controls
function toggleAssistedVoiceRecording() {
  if (!speechRecognition) {
    initializeSpeechRecognition();
    if (!speechRecognition) return;
  }

  if (isRecordingAssisted) {
    speechRecognition.stop();
  } else {
    isRecordingAssisted = true;
    isRecordingVoiceFirst = false;
    speechRecognition.lang = selectedVoiceLang;
    try {
      speechRecognition.start();
    } catch (e) {
      console.warn("Failed to start assisted speech:", e);
    }
  }
}

function updateAssistedMicUI(listening) {
  const micBtn = document.getElementById("btn-assisted-mic");
  const micIcon = document.getElementById("assisted-mic-icon");
  const micLabel = document.getElementById("assisted-mic-label");

  if (listening) {
    if (micBtn) micBtn.classList.add("btn-danger");
    if (micIcon) micIcon.className = "fa-solid fa-stop";
    if (micLabel) micLabel.textContent = "Stop Recording Citizen's Voice";
  } else {
    if (micBtn) micBtn.classList.remove("btn-danger");
    if (micIcon) micIcon.className = "fa-solid fa-microphone";
    if (micLabel) micLabel.textContent = "Record Citizen's Voice";
  }
}

// 5.8 Classification & Priority Heuristics
function classifyVoiceFirstText(rawText) {
  if (!rawText || rawText.trim() === "") {
    const kwLabelEl = document.getElementById("voice-first-kw-pill");
    if (kwLabelEl) kwLabelEl.textContent = "Awaiting voice input...";
    return;
  }

  const text = rawText.toLowerCase();
  const scores = {};
  const matchedKeywords = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) {
        const weight = kw.includes(" ") ? 3 : 1;
        scores[category] += weight;
        if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      }
    }
  }

  let bestCategory = null;
  let maxScore = 0;
  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  }

  let detectedPriority = "Medium";
  for (const kw of HIGH_PRIORITY_KEYWORDS) {
    if (text.includes(kw)) {
      detectedPriority = "High";
      if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      break;
    }
  }

  if (detectedPriority !== "High") {
    for (const kw of MEDIUM_PRIORITY_KEYWORDS) {
      if (text.includes(kw)) {
        detectedPriority = "Medium";
        break;
      }
    }
  }

  // Update Voice-First UI
  const categoryDisp = document.getElementById("voice-first-category-disp");
  const categoryInput = document.getElementById("voice-first-category");
  const priorityDisp = document.getElementById("voice-first-priority-disp");
  const priorityInput = document.getElementById("voice-first-priority");
  const kwPill = document.getElementById("voice-first-kw-pill");

  const chosenCat = bestCategory || "Other";
  if (categoryDisp) {
    categoryDisp.textContent = getBilingualCategoryName(chosenCat);
  }
  if (categoryInput) categoryInput.value = chosenCat;

  if (priorityDisp) {
    priorityDisp.textContent = `${detectedPriority} Priority (${detectedPriority === 'High' ? 'అత్యవసరం' : 'సాధారణం'})`;
    priorityDisp.className = `priority-badge priority-${detectedPriority.toLowerCase()}`;
  }
  if (priorityInput) priorityInput.value = detectedPriority;

  if (kwPill) {
    if (matchedKeywords.length > 0) {
      kwPill.textContent = `Keywords: ${matchedKeywords.slice(0, 3).join(", ")}`;
    } else {
      kwPill.textContent = "Analyzing speech...";
    }
  }
}

function classifyAssistedText(rawText) {
  if (!rawText || rawText.trim() === "") return;
  const text = rawText.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (text.includes(kw)) {
        const catSelect = document.getElementById("assisted-category");
        if (catSelect) catSelect.value = category;
        break;
      }
    }
  }

  for (const kw of HIGH_PRIORITY_KEYWORDS) {
    if (text.includes(kw)) {
      const prioSelect = document.getElementById("assisted-priority");
      if (prioSelect) prioSelect.value = "High";
      break;
    }
  }
}

function getBilingualCategoryName(cat) {
  switch (cat) {
    case "Water Supply": return "Water Supply (తాగునీటి సరఫరా)";
    case "Roads": return "Roads (రహదారులు / గుంతలు)";
    case "Electricity": return "Electricity (విద్యుత్ & దీపాలు)";
    case "Sanitation": return "Sanitation (పారిశుధ్యం & చెత్త)";
    case "Drainage": return "Drainage (మురుగు కాలువలు)";
    default: return "Other Village Issue (ఇతర సమస్య)";
  }
}

// 5.9 Generate Sequential Complaint ID (e.g. GV-2026-006)
function generateNextComplaintId() {
  const currentComplaints = getStoredComplaints();
  const year = new Date().getFullYear();
  let maxNum = 0;

  currentComplaints.forEach(c => {
    const parts = c.id.split("-");
    if (parts.length === 3 && parts[0] === "GV") {
      const num = parseInt(parts[2], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });

  const nextNum = String(maxNum + 1).padStart(3, "0");
  return `GV-${year}-${nextNum}`;
}

// 5.10 Submit Complaint (Voice-First One-Tap Workflow)
function submitVoiceFirstComplaint() {
  const desc = document.getElementById("voice-first-desc")?.value.trim();

  if (!desc) {
    showToast("Voice Input Needed", "Please tap the microphone and speak your problem first.", "error");
    if (selectedVoiceLang.startsWith("te")) {
      speakAloud("దయచేసి పెద్ద మైక్రోఫోన్ బటన్ నొక్కి మీ సమస్యను చెప్పండి.", "te-IN");
    } else {
      speakAloud("Please tap the microphone button and speak your problem first.", "en-IN");
    }
    return;
  }

  // Name defaults to Anonymous if empty
  const rawName = document.getElementById("voice-first-name")?.value.trim();
  const citizenName = rawName || "Anonymous Villager (గ్రామస్థుడు)";
  
  const village = document.getElementById("voice-first-village")?.value || "Rampur";
  const mobile = document.getElementById("voice-first-mobile")?.value.trim() || "Not provided";
  const category = document.getElementById("voice-first-category")?.value || "Water Supply";
  const priority = document.getElementById("voice-first-priority")?.value || "Medium";

  const newId = generateNextComplaintId();
  lastRegisteredComplaintId = newId;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const newComplaint = {
    id: newId,
    citizen: citizenName,
    village: village,
    mobile: mobile,
    category: category,
    priority: priority,
    method: "Voice-First Mode",
    description: desc,
    status: "Pending",
    statusMessage: "Complaint registered via Voice-First mode. Awaiting initial panchayat review.",
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`
  };

  const complaints = getStoredComplaints();
  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  if (isRecordingVoiceFirst && speechRecognition) {
    speechRecognition.stop();
  }

  // Populate Modal
  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = citizenName;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = "Voice-First Mode (Bilingual)";

  // Show Modal
  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  // Read confirmation aloud
  replayConfirmationAudio();

  // Reset Voice Form
  document.getElementById("voice-first-desc").value = "";
  if (document.getElementById("voice-first-name")) document.getElementById("voice-first-name").value = "";
  if (document.getElementById("voice-first-mobile")) document.getElementById("voice-first-mobile").value = "";
  classifyVoiceFirstText("");

  showToast("Grievance Registered", `Your Complaint ID is ${newId}`, "success");
  updateHeroStats();
}

// 5.11 Assisted Mode Submission Handler
function handleAssistedComplaintSubmit(e) {
  e.preventDefault();

  const volunteerName = document.getElementById("assisted-volunteer-name")?.value.trim() || "Panchayat Volunteer";
  const volunteerRole = document.getElementById("assisted-volunteer-role")?.value || "Volunteer";
  const rawCitizen = document.getElementById("assisted-citizen-name")?.value.trim();
  const citizenName = rawCitizen || "Anonymous Villager (గ్రామస్థుడు)";
  const village = document.getElementById("assisted-village")?.value.trim() || "Rampur";
  const mobile = document.getElementById("assisted-mobile")?.value.trim() || "Not provided";
  const desc = document.getElementById("assisted-desc")?.value.trim();
  const category = document.getElementById("assisted-category")?.value || "Water Supply";
  const priority = document.getElementById("assisted-priority")?.value || "Medium";

  if (!desc) {
    showToast("Description Required", "Please record or type the complaint details.", "error");
    return;
  }

  const newId = generateNextComplaintId();
  lastRegisteredComplaintId = newId;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const newComplaint = {
    id: newId,
    citizen: `${citizenName} (Assisted by ${volunteerName} - ${volunteerRole})`,
    village: village,
    mobile: mobile,
    category: category,
    priority: priority,
    method: `Assisted Mode (${volunteerRole})`,
    description: desc,
    status: "Pending",
    statusMessage: `Complaint registered by ${volunteerName} on behalf of citizen. Awaiting panchayat review.`,
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`
  };

  const complaints = getStoredComplaints();
  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  if (isRecordingAssisted && speechRecognition) {
    speechRecognition.stop();
  }

  // Populate Modal
  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = newComplaint.citizen;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = `Assisted by ${volunteerName}`;

  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  replayConfirmationAudio();
  document.getElementById("assisted-complaint-form").reset();
  showToast("Assisted Grievance Logged", `Complaint ID: ${newId}`, "success");
  updateHeroStats();
}

// 5.12 Fallback Mode Submission Handler
function handleFallbackComplaintSubmit(e) {
  e.preventDefault();

  const rawName = document.getElementById("fallback-name")?.value.trim();
  const citizenName = rawName || "Anonymous Villager (గ్రామస్థుడు)";
  const village = document.getElementById("fallback-village")?.value.trim() || "Rampur";
  const mobile = document.getElementById("fallback-mobile")?.value.trim() || "Not provided";
  const category = document.getElementById("fallback-category")?.value || "Water Supply";
  const priority = document.getElementById("fallback-priority")?.value || "Medium";
  const desc = document.getElementById("fallback-desc")?.value.trim();

  if (!desc) {
    showToast("Description Required", "Please enter the problem details.", "error");
    return;
  }

  const newId = generateNextComplaintId();
  lastRegisteredComplaintId = newId;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const newComplaint = {
    id: newId,
    citizen: citizenName,
    village: village,
    mobile: mobile,
    category: category,
    priority: priority,
    method: "Text Entry Fallback",
    description: desc,
    status: "Pending",
    statusMessage: "Complaint registered via text fallback. Awaiting panchayat review.",
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`
  };

  const complaints = getStoredComplaints();
  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = citizenName;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = "Text Fallback";

  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  replayConfirmationAudio();
  document.getElementById("text-fallback-form").reset();
  showToast("Grievance Submitted", `Complaint ID: ${newId}`, "success");
  updateHeroStats();
}

// ==========================================================================
// 6. Module 2: Complaint Tracking System
// ==========================================================================

function trackComplaintById(searchId) {
  if (!searchId) return;
  const cleanId = searchId.trim().toUpperCase();

  const complaints = getStoredComplaints();
  const complaint = complaints.find(c => c.id.toUpperCase() === cleanId);

  const emptyState = document.getElementById("tracking-empty-state");
  const notFoundAlert = document.getElementById("tracking-not-found");
  const trackCard = document.getElementById("tracking-card");
  const missingIdText = document.getElementById("missing-id-text");

  if (!complaint) {
    if (emptyState) emptyState.style.display = "none";
    if (trackCard) trackCard.style.display = "none";
    if (notFoundAlert) notFoundAlert.style.display = "flex";
    if (missingIdText) missingIdText.textContent = cleanId;
    return;
  }

  // Found complaint -> render details
  if (emptyState) emptyState.style.display = "none";
  if (notFoundAlert) notFoundAlert.style.display = "none";
  if (trackCard) trackCard.style.display = "block";

  document.getElementById("track-disp-id").textContent = complaint.id;
  document.getElementById("track-disp-category").textContent = complaint.category;
  
  const prioEl = document.getElementById("track-disp-priority");
  prioEl.textContent = `${complaint.priority} Priority`;
  prioEl.className = `priority-badge priority-${complaint.priority.toLowerCase()}`;

  // Status Badge & Stepper
  const statusBadge = document.getElementById("track-disp-status");
  const statusText = document.getElementById("track-status-text");
  const statusIcon = document.getElementById("track-status-icon");
  const progressBar = document.getElementById("stepper-progress-bar");

  const step1 = document.getElementById("step-point-1");
  const step2 = document.getElementById("step-point-2");
  const step3 = document.getElementById("step-point-3");
  const step4 = document.getElementById("step-point-4");

  // Reset steps
  [step1, step2, step3, step4].forEach(s => {
    if (s) {
      s.classList.remove("active", "completed");
    }
  });

  if (complaint.status === "Pending") {
    statusBadge.className = "status-indicator-badge status-pending";
    statusText.textContent = "Pending Review";
    statusIcon.className = "fa-solid fa-clock";
    progressBar.style.width = "25%";
    step1.classList.add("completed");
    step2.classList.add("active");
  } else if (complaint.status === "In Progress") {
    statusBadge.className = "status-indicator-badge status-in-progress";
    statusText.textContent = "In Progress";
    statusIcon.className = "fa-solid fa-person-digging fa-spin";
    progressBar.style.width = "65%";
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("active");
  } else if (complaint.status === "Resolved") {
    statusBadge.className = "status-indicator-badge status-resolved";
    statusText.textContent = "Resolved";
    statusIcon.className = "fa-solid fa-circle-check";
    progressBar.style.width = "100%";
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("completed");
    step4.classList.add("completed");
  }

  document.getElementById("step-date-registered").textContent = complaint.date;
  document.getElementById("track-disp-citizen").textContent = complaint.citizen;
  document.getElementById("track-disp-village").textContent = complaint.village;
  document.getElementById("track-disp-date").textContent = complaint.date;
  document.getElementById("track-disp-method").textContent = complaint.method;
  document.getElementById("track-disp-description").textContent = complaint.description;
  document.getElementById("track-disp-last-update").textContent = `Updated on: ${complaint.lastUpdated || complaint.date}`;
  document.getElementById("track-disp-status-message").textContent = complaint.statusMessage || "Official panchayat team is processing this grievance.";
}

// Quick Sample Pills in tracking page
function setupTrackingQuickSamples() {
  const container = document.getElementById("sample-complaint-pills");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".sample-pill-btn");
    if (btn) {
      const id = btn.getAttribute("data-id");
      const input = document.getElementById("track-id-input");
      if (input) input.value = id;
      trackComplaintById(id);
    }
  });
}

// ==========================================================================
// 7. Module 3: Village Education Directory
// ==========================================================================

function renderEducationProfiles() {
  const grid = document.getElementById("edu-profiles-grid");
  if (!grid) return;

  const eduList = getStoredEducation();
  const searchVal = (document.getElementById("edu-search")?.value || "").toLowerCase();
  const qualFilter = document.getElementById("edu-filter-qual")?.value || "ALL";
  const fieldFilter = document.getElementById("edu-filter-field")?.value || "ALL";
  const mentorFilter = document.getElementById("edu-filter-mentor")?.value || "ALL";

  const filtered = eduList.filter(item => {
    // Search
    const matchSearch = item.name.toLowerCase().includes(searchVal) || 
                        item.skills.toLowerCase().includes(searchVal) ||
                        item.occupation.toLowerCase().includes(searchVal);
    // Filters
    const matchQual = qualFilter === "ALL" || item.qualification === qualFilter;
    const matchField = fieldFilter === "ALL" || item.field === fieldFilter;
    const matchMentor = mentorFilter === "ALL" || (mentorFilter === "YES" && item.willingToGuide);

    return matchSearch && matchQual && matchField && matchMentor;
  });

  const countEl = document.getElementById("edu-results-count");
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${eduList.length} educated mentors`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <div class="empty-icon"><i class="fa-solid fa-graduation-cap"></i></div>
        <h3>No Matching Profiles Found</h3>
        <p>Try clearing your search terms or reset the filters to view all village education profiles.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    // Avatar initials
    const initials = item.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    
    // Skills tags
    const skillTags = item.skills.split(",").map(s => s.trim()).filter(Boolean);
    const tagsHtml = skillTags.map(tag => `<span class="skill-tag">${tag}</span>`).join("");

    // Contact Privacy Status
    let contactHtml = "";
    if (item.privacyPublic && item.contact) {
      contactHtml = `
        <span class="privacy-status-note public-contact" title="Contact is public">
          <i class="fa-solid fa-phone"></i> ${item.contact}
        </span>
      `;
    } else {
      contactHtml = `
        <span class="privacy-status-note" title="Contact kept private by default">
          <i class="fa-solid fa-shield-halved"></i> Contact Private
        </span>
      `;
    }

    return `
      <div class="profile-card" data-id="${item.id}">
        <div class="profile-card-header">
          <div class="profile-avatar bg-teal-light text-teal">
            ${initials}
          </div>
          <div class="profile-title-wrap">
            <h4 class="profile-name">${item.name}</h4>
            <div class="profile-location">
              <i class="fa-solid fa-location-dot"></i> ${item.village} &bull; ${item.occupation}
            </div>
          </div>
        </div>

        <div class="profile-badges-row">
          <span class="badge-pill-edu"><i class="fa-solid fa-certificate"></i> ${item.qualification}</span>
          <span class="badge badge-neutral">${item.field}</span>
          ${item.willingToGuide ? `<span class="badge-mentor-tag"><i class="fa-solid fa-star"></i> Student Mentor</span>` : ""}
        </div>

        <div class="profile-meta-row">
          <div class="meta-inline">
            <strong>Languages:</strong> <span>${item.languages}</span>
          </div>
          <div class="meta-inline flex-column align-items-start">
            <strong>Areas of Knowledge & Skills:</strong>
            <div class="skills-tags-wrap">${tagsHtml}</div>
          </div>
        </div>

        <div class="profile-card-footer">
          ${contactHtml}
          <div class="card-btn-group">
            <button class="btn btn-sm btn-outline-primary" onclick="requestMentorship('${item.name}')">
              <i class="fa-solid fa-envelope"></i> Request Guidance
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="editEducationProfile('${item.id}')" title="Edit Profile">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteEducationProfile('${item.id}')" title="Delete Profile">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function requestMentorship(mentorName) {
  showToast("Guidance Request Sent", `Your mentorship request to ${mentorName} has been recorded. The village coordinator will connect you!`, "success");
}

function handleEducationSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById("edu-edit-id").value;
  const name = document.getElementById("edu-name").value.trim();
  const village = document.getElementById("edu-village").value.trim() || "Rampur";
  const qualification = document.getElementById("edu-qualification").value;
  const field = document.getElementById("edu-field").value;
  const occupation = document.getElementById("edu-occupation").value.trim();
  const languages = document.getElementById("edu-languages").value.trim();
  const skills = document.getElementById("edu-skills").value.trim();
  const willingToGuide = document.getElementById("edu-mentor-willing").checked;
  const contact = document.getElementById("edu-contact").value.trim();
  const privacyPublic = document.getElementById("edu-privacy-public").checked;

  if (!name || !occupation || !skills) {
    showToast("Missing Fields", "Please complete all required fields.", "error");
    return;
  }

  const eduList = getStoredEducation();

  if (editId) {
    // Editing existing
    const idx = eduList.findIndex(item => item.id === editId);
    if (idx !== -1) {
      eduList[idx] = {
        ...eduList[idx],
        name, village, qualification, field, occupation,
        languages, skills, willingToGuide, contact, privacyPublic
      };
      showToast("Profile Updated", `${name}'s profile was updated successfully.`, "success");
    }
  } else {
    // New profile
    const newProfile = {
      id: `EDU-${Date.now().toString().slice(-4)}`,
      name, village, qualification, field, occupation,
      languages, skills, willingToGuide, contact, privacyPublic,
      registeredDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };
    eduList.unshift(newProfile);
    showToast("Profile Registered", `${name} added to the Education Directory.`, "success");
  }

  saveEducation(eduList);
  document.getElementById("edu-register-form").reset();
  document.getElementById("edu-edit-id").value = "";
  document.getElementById("edu-registration-card").style.display = "none";
  renderEducationProfiles();
  updateHeroStats();
}

function editEducationProfile(id) {
  const eduList = getStoredEducation();
  const item = eduList.find(i => i.id === id);
  if (!item) return;

  document.getElementById("edu-edit-id").value = item.id;
  document.getElementById("edu-name").value = item.name;
  document.getElementById("edu-village").value = item.village;
  document.getElementById("edu-qualification").value = item.qualification;
  document.getElementById("edu-field").value = item.field;
  document.getElementById("edu-occupation").value = item.occupation;
  document.getElementById("edu-languages").value = item.languages;
  document.getElementById("edu-skills").value = item.skills;
  document.getElementById("edu-mentor-willing").checked = item.willingToGuide;
  document.getElementById("edu-contact").value = item.contact || "";
  document.getElementById("edu-privacy-public").checked = !!item.privacyPublic;

  const card = document.getElementById("edu-registration-card");
  card.style.display = "block";
  card.scrollIntoView({ behavior: "smooth" });
}

function deleteEducationProfile(id) {
  if (!confirm("Are you sure you want to remove this education profile?")) return;
  let eduList = getStoredEducation();
  eduList = eduList.filter(i => i.id !== id);
  saveEducation(eduList);
  showToast("Profile Removed", "The education profile was removed.", "info");
  renderEducationProfiles();
  updateHeroStats();
}

// ==========================================================================
// 8. Module 4: Village Skills Directory
// ==========================================================================

function renderSkillsProfiles() {
  const grid = document.getElementById("skill-profiles-grid");
  if (!grid) return;

  const skillsList = getStoredSkills();
  const searchVal = (document.getElementById("skill-search")?.value || "").toLowerCase();
  const catFilter = document.getElementById("skill-filter-cat")?.value || "ALL";
  const villageFilter = document.getElementById("skill-filter-village")?.value || "ALL";

  const filtered = skillsList.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchVal) ||
                        item.specificSkills.toLowerCase().includes(searchVal) ||
                        item.category.toLowerCase().includes(searchVal);
    const matchCat = catFilter === "ALL" || item.category === catFilter;
    const matchVillage = villageFilter === "ALL" || item.village === villageFilter;

    return matchSearch && matchCat && matchVillage;
  });

  const countEl = document.getElementById("skill-results-count");
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${skillsList.length} skilled craftsmen`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <div class="empty-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>
        <h3>No Skilled Workers Found</h3>
        <p>Try adjusting your trade category or search term to discover local craftsmen.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const initials = item.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const tradeIcon = getTradeIcon(item.category);

    // Contact Privacy Status
    let contactHtml = "";
    if (item.privacyPublic && item.contact) {
      contactHtml = `
        <span class="privacy-status-note public-contact" title="Phone is publicly visible">
          <i class="fa-solid fa-phone"></i> ${item.contact}
        </span>
      `;
    } else {
      contactHtml = `
        <span class="privacy-status-note" title="Contact private - send request through GramVani">
          <i class="fa-solid fa-shield-halved"></i> Contact Private
        </span>
      `;
    }

    return `
      <div class="profile-card" data-id="${item.id}">
        <div class="profile-card-header">
          <div class="profile-avatar bg-purple-light text-purple">
            <i class="fa-solid ${tradeIcon}"></i>
          </div>
          <div class="profile-title-wrap">
            <h4 class="profile-name">${item.name}</h4>
            <div class="profile-location">
              <i class="fa-solid fa-location-dot"></i> ${item.village} &bull; ${item.experience}
            </div>
          </div>
        </div>

        <div class="profile-badges-row">
          <span class="badge-pill-skill"><i class="fa-solid ${tradeIcon}"></i> ${item.category}</span>
          <span class="badge badge-neutral"><i class="fa-solid fa-clock"></i> ${item.availability}</span>
        </div>

        <div class="profile-meta-row">
          <div class="meta-inline">
            <strong>Services & Work:</strong> <span>${item.specificSkills}</span>
          </div>
          <div class="meta-inline">
            <strong>Languages:</strong> <span>${item.languages}</span>
          </div>
        </div>

        <div class="profile-card-footer">
          ${contactHtml}
          <div class="card-btn-group">
            <button class="btn btn-sm btn-primary" onclick="openServiceRequestModal('${item.id}', '${item.name}')">
              <i class="fa-solid fa-paper-plane"></i> Request Work
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="editSkillProfile('${item.id}')" title="Edit Profile">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteSkillProfile('${item.id}')" title="Delete Profile">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function getTradeIcon(category) {
  switch (category) {
    case "Electrician": return "fa-bolt";
    case "Plumber": return "fa-faucet-drip";
    case "Carpenter": return "fa-chair";
    case "Tailor": return "fa-scissors";
    case "Mechanic": return "fa-wrench";
    case "Farmer": return "fa-wheat-awn";
    case "Computer Operator": return "fa-laptop";
    case "Teacher / Tutor": return "fa-chalkboard-user";
    case "Healthcare Worker": return "fa-user-nurse";
    default: return "fa-screwdriver-wrench";
  }
}

function openServiceRequestModal(workerId, workerName) {
  document.getElementById("request-worker-id").value = workerId;
  document.getElementById("request-target-name").textContent = workerName;
  const modal = document.getElementById("service-request-modal");
  if (modal) modal.style.display = "flex";
}

function handleServiceRequestSubmit(e) {
  e.preventDefault();
  const citizenName = document.getElementById("request-citizen-name").value.trim();
  const phone = document.getElementById("request-citizen-phone").value.trim();
  const workDesc = document.getElementById("request-work-desc").value.trim();
  const targetName = document.getElementById("request-target-name").textContent;

  if (!citizenName || !phone || !workDesc) {
    showToast("Missing Details", "Please fill in all inquiry fields.", "error");
    return;
  }

  showToast("Request Broadcasted", `Your service request was dispatched to ${targetName}. They will call you at ${phone}!`, "success");
  
  // Close modal & reset
  document.getElementById("service-request-form").reset();
  document.getElementById("service-request-modal").style.display = "none";
}

function handleSkillSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById("skill-edit-id").value;
  const name = document.getElementById("skill-name").value.trim();
  const village = document.getElementById("skill-village").value.trim() || "Rampur";
  const category = document.getElementById("skill-category").value;
  const specificSkills = document.getElementById("skill-specific").value.trim();
  const experience = document.getElementById("skill-experience").value.trim();
  const availability = document.getElementById("skill-availability").value.trim();
  const languages = document.getElementById("skill-languages").value.trim();
  const contact = document.getElementById("skill-contact").value.trim();
  const privacyPublic = document.getElementById("skill-privacy-public").checked;

  if (!name || !specificSkills || !experience) {
    showToast("Missing Fields", "Please complete all required fields.", "error");
    return;
  }

  const skillsList = getStoredSkills();

  if (editId) {
    const idx = skillsList.findIndex(item => item.id === editId);
    if (idx !== -1) {
      skillsList[idx] = {
        ...skillsList[idx],
        name, village, category, specificSkills, experience,
        availability, languages, contact, privacyPublic
      };
      showToast("Profile Updated", `${name}'s skill profile was updated.`, "success");
    }
  } else {
    const newProfile = {
      id: `SKILL-${Date.now().toString().slice(-4)}`,
      name, village, category, specificSkills, experience,
      availability, languages, contact, privacyPublic,
      registeredDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };
    skillsList.unshift(newProfile);
    showToast("Skill Registered", `${name} added to the Village Skills Directory.`, "success");
  }

  saveSkills(skillsList);
  document.getElementById("skill-register-form").reset();
  document.getElementById("skill-edit-id").value = "";
  document.getElementById("skill-registration-card").style.display = "none";
  renderSkillsProfiles();
  updateHeroStats();
}

function editSkillProfile(id) {
  const skillsList = getStoredSkills();
  const item = skillsList.find(i => i.id === id);
  if (!item) return;

  document.getElementById("skill-edit-id").value = item.id;
  document.getElementById("skill-name").value = item.name;
  document.getElementById("skill-village").value = item.village;
  document.getElementById("skill-category").value = item.category;
  document.getElementById("skill-specific").value = item.specificSkills;
  document.getElementById("skill-experience").value = item.experience;
  document.getElementById("skill-availability").value = item.availability;
  document.getElementById("skill-languages").value = item.languages;
  document.getElementById("skill-contact").value = item.contact || "";
  document.getElementById("skill-privacy-public").checked = !!item.privacyPublic;

  const card = document.getElementById("skill-registration-card");
  card.style.display = "block";
  card.scrollIntoView({ behavior: "smooth" });
}

function deleteSkillProfile(id) {
  if (!confirm("Are you sure you want to remove this skill registration?")) return;
  let skillsList = getStoredSkills();
  skillsList = skillsList.filter(i => i.id !== id);
  saveSkills(skillsList);
  showToast("Profile Removed", "The skills profile was removed.", "info");
  renderSkillsProfiles();
  updateHeroStats();
}

// ==========================================================================
// 9. Module 5: Admin Dashboard & Charts
// ==========================================================================

let chartCatInstance = null;
let chartStatusInstance = null;
let chartEduInstance = null;
let chartSkillsInstance = null;

function renderAdminDashboard() {
  const complaints = getStoredComplaints();
  const eduList = getStoredEducation();
  const skillsList = getStoredSkills();

  // Metrics
  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter(c => c.status === "Pending").length;
  const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;
  const totalEdu = eduList.length;
  const totalSkills = skillsList.length;

  // Update DOM Numbers
  document.getElementById("dash-total-complaints").textContent = totalComplaints;
  document.getElementById("dash-pending-complaints").textContent = pendingCount;
  document.getElementById("dash-inprogress-complaints").textContent = inProgressCount;
  document.getElementById("dash-resolved-complaints").textContent = resolvedCount;
  document.getElementById("dash-total-edu").textContent = totalEdu;
  document.getElementById("dash-total-skills").textContent = totalSkills;

  document.getElementById("admin-badge-complaints-count").textContent = totalComplaints;
  document.getElementById("admin-badge-edu-count").textContent = totalEdu;
  document.getElementById("admin-badge-skills-count").textContent = totalSkills;

  // Render Charts
  renderAdminCharts(complaints, eduList, skillsList);

  // Render Tables
  renderAdminComplaintsTable();
  renderAdminEducationTable();
  renderAdminSkillsTable();
}

function renderAdminCharts(complaints, eduList, skillsList) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded");
    return;
  }

  // 1. Complaints by Category
  const catCounts = {
    "Water Supply": 0,
    "Roads": 0,
    "Electricity": 0,
    "Sanitation": 0,
    "Drainage": 0,
    "Other": 0
  };
  complaints.forEach(c => {
    if (catCounts[c.category] !== undefined) {
      catCounts[c.category]++;
    } else {
      catCounts["Other"]++;
    }
  });

  const catCanvas = document.getElementById("chartComplaintsCategory");
  if (catCanvas) {
    if (chartCatInstance) chartCatInstance.destroy();
    chartCatInstance = new Chart(catCanvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(catCounts),
        datasets: [{
          data: Object.values(catCounts),
          backgroundColor: ["#0288d1", "#7cb342", "#fbc02d", "#8e24aa", "#00897b", "#78909c"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }
        }
      }
    });
  }

  // 2. Complaints by Status
  const statusCounts = {
    "Pending": complaints.filter(c => c.status === "Pending").length,
    "In Progress": complaints.filter(c => c.status === "In Progress").length,
    "Resolved": complaints.filter(c => c.status === "Resolved").length
  };

  const statusCanvas = document.getElementById("chartComplaintsStatus");
  if (statusCanvas) {
    if (chartStatusInstance) chartStatusInstance.destroy();
    chartStatusInstance = new Chart(statusCanvas, {
      type: "pie",
      data: {
        labels: ["Pending", "In Progress", "Resolved"],
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ["#f57c00", "#1976d2", "#2e7d32"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }
        }
      }
    });
  }

  // 3. Education by Qualification
  const qualCounts = {};
  eduList.forEach(e => {
    qualCounts[e.qualification] = (qualCounts[e.qualification] || 0) + 1;
  });

  const eduCanvas = document.getElementById("chartEducationQual");
  if (eduCanvas) {
    if (chartEduInstance) chartEduInstance.destroy();
    chartEduInstance = new Chart(eduCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(qualCounts),
        datasets: [{
          label: "Graduates",
          data: Object.values(qualCounts),
          backgroundColor: "#00796b"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4. Skills by Category
  const skillCounts = {};
  skillsList.forEach(s => {
    skillCounts[s.category] = (skillCounts[s.category] || 0) + 1;
  });

  const skillsCanvas = document.getElementById("chartSkillsCategory");
  if (skillsCanvas) {
    if (chartSkillsInstance) chartSkillsInstance.destroy();
    chartSkillsInstance = new Chart(skillsCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(skillCounts),
        datasets: [{
          label: "Tradesmen",
          data: Object.values(skillCounts),
          backgroundColor: "#7b1fa2"
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
        plugins: { legend: { display: false } }
      }
    });
  }
}

// Render Admin Complaints Table
function renderAdminComplaintsTable() {
  const tbody = document.getElementById("admin-complaints-tbody");
  if (!tbody) return;

  const complaints = getStoredComplaints();
  const searchVal = (document.getElementById("admin-complaint-search")?.value || "").toLowerCase();
  const catFilter = document.getElementById("admin-complaint-filter-cat")?.value || "ALL";
  const statusFilter = document.getElementById("admin-complaint-filter-status")?.value || "ALL";

  const filtered = complaints.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(searchVal) ||
                        c.citizen.toLowerCase().includes(searchVal) ||
                        c.description.toLowerCase().includes(searchVal);
    const matchCat = catFilter === "ALL" || c.category === catFilter;
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">No complaints found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    let statusClass = "status-pending";
    if (c.status === "In Progress") statusClass = "status-in-progress";
    if (c.status === "Resolved") statusClass = "status-resolved";

    return `
      <tr id="admin-row-${c.id}">
        <td><strong>${c.id}</strong></td>
        <td>
          <div><strong>${c.citizen}</strong></div>
          <small class="text-muted">${c.village} &bull; ${c.date}</small>
        </td>
        <td><span class="badge badge-category">${c.category}</span></td>
        <td><span class="priority-badge priority-${c.priority.toLowerCase()}">${c.priority}</span></td>
        <td><small>${c.method}</small></td>
        <td><span class="status-indicator-badge ${statusClass}" style="padding: 3px 10px; font-size: 0.78rem;">${c.status}</span></td>
        <td style="max-width: 240px;">
          <small class="d-block text-truncate" title="${c.statusMessage || ''}">${c.statusMessage || 'Pending review'}</small>
        </td>
        <td>
          <div class="card-btn-group">
            <button class="btn btn-sm btn-outline-primary" onclick="openAdminStatusModal('${c.id}')" title="Update Status">
              <i class="fa-solid fa-pen-to-square"></i> Update
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteComplaint('${c.id}')" title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function openAdminStatusModal(complaintId) {
  const complaints = getStoredComplaints();
  const c = complaints.find(item => item.id === complaintId);
  if (!c) return;

  document.getElementById("admin-edit-complaint-id").value = c.id;
  document.getElementById("modal-edit-id").textContent = c.id;
  document.getElementById("admin-select-status").value = c.status;
  document.getElementById("admin-input-status-note").value = c.statusMessage || "";

  const modal = document.getElementById("admin-status-modal");
  if (modal) modal.style.display = "flex";
}

function handleAdminStatusUpdate(e) {
  e.preventDefault();

  const id = document.getElementById("admin-edit-complaint-id").value;
  const newStatus = document.getElementById("admin-select-status").value;
  const newNote = document.getElementById("admin-input-status-note").value.trim();

  if (!newNote) {
    showToast("Status Note Required", "Please provide a brief official progress note.", "error");
    return;
  }

  const complaints = getStoredComplaints();
  const idx = complaints.findIndex(c => c.id === id);
  if (idx !== -1) {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    complaints[idx].status = newStatus;
    complaints[idx].statusMessage = newNote;
    complaints[idx].lastUpdated = `${dateFormatted}, ${timeFormatted}`;
    saveComplaints(complaints);

    showToast("Grievance Updated", `${id} marked as ${newStatus}. Live tracking updated!`, "success");

    // Close modal
    document.getElementById("admin-status-modal").style.display = "none";

    // Refresh Admin & Live Track view
    renderAdminDashboard();
    trackComplaintById(id);
    updateHeroStats();
  }
}

function deleteComplaint(id) {
  if (!confirm(`Are you sure you want to delete grievance ${id}?`)) return;
  let complaints = getStoredComplaints();
  complaints = complaints.filter(c => c.id !== id);
  saveComplaints(complaints);
  showToast("Complaint Deleted", `${id} removed from registry.`, "info");
  renderAdminDashboard();
  updateHeroStats();
}

function highlightComplaintInAdmin(complaintId) {
  setTimeout(() => {
    const row = document.getElementById(`admin-row-${complaintId}`);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      row.style.backgroundColor = "#fff9c4";
      setTimeout(() => {
        row.style.transition = "background-color 1s ease";
        row.style.backgroundColor = "";
      }, 2000);
    }
  }, 300);
}

// Render Admin Education Table
function renderAdminEducationTable() {
  const tbody = document.getElementById("admin-edu-tbody");
  if (!tbody) return;

  const eduList = getStoredEducation();
  tbody.innerHTML = eduList.map(item => `
    <tr>
      <td><strong>${item.name}</strong><br><small class="text-muted">${item.village}</small></td>
      <td><span class="badge badge-category">${item.qualification}</span></td>
      <td>${item.field}</td>
      <td>${item.occupation}</td>
      <td>${item.willingToGuide ? '<span class="badge-mentor-tag">Active Mentor</span>' : '<span class="text-muted">No</span>'}</td>
      <td>${item.privacyPublic ? '<span class="text-green"><i class="fa-solid fa-eye"></i> Public</span>' : '<span class="text-muted"><i class="fa-solid fa-lock"></i> Private</span>'}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteEducationProfile('${item.id}'); renderAdminEducationTable();">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// Render Admin Skills Table
function renderAdminSkillsTable() {
  const tbody = document.getElementById("admin-skills-tbody");
  if (!tbody) return;

  const skillsList = getStoredSkills();
  tbody.innerHTML = skillsList.map(item => `
    <tr>
      <td><strong>${item.name}</strong><br><small class="text-muted">${item.village}</small></td>
      <td><span class="badge-pill-skill">${item.category}</span></td>
      <td style="max-width: 220px;"><small class="d-block text-truncate" title="${item.specificSkills}">${item.specificSkills}</small></td>
      <td>${item.experience}</td>
      <td><small>${item.availability}</small></td>
      <td>${item.privacyPublic ? '<span class="text-green"><i class="fa-solid fa-eye"></i> Public</span>' : '<span class="text-muted"><i class="fa-solid fa-lock"></i> Private</span>'}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteSkillProfile('${item.id}'); renderAdminSkillsTable();">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

// ==========================================================================
// 10. Hero & Global Stats Synchronization
// ==========================================================================

function updateHeroStats() {
  const complaints = getStoredComplaints();
  const eduList = getStoredEducation();
  const skillsList = getStoredSkills();

  const totalComplaints = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const totalEdu = eduList.length;
  const totalSkills = skillsList.length;

  const elComplaints = document.getElementById("hero-stat-complaints");
  const elResolved = document.getElementById("hero-stat-resolved");
  const elMentors = document.getElementById("hero-stat-mentors");
  const elSkills = document.getElementById("hero-stat-skills");

  if (elComplaints) elComplaints.textContent = totalComplaints;
  if (elResolved) elResolved.textContent = resolved;
  if (elMentors) elMentors.textContent = totalEdu;
  if (elSkills) elSkills.textContent = totalSkills;
}

function refreshAllViews() {
  updateHeroStats();
  renderEducationProfiles();
  renderSkillsProfiles();
  renderAdminDashboard();
  trackComplaintById("GV-2026-001");
}

// ==========================================================================
// 11. Event Listeners & Application Bootstrapping
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Default Data in Storage if empty
  getStoredComplaints();
  getStoredEducation();
  getStoredSkills();

  // 2. Initialize Voice Support
  initializeSpeechRecognition();

  // 3. Navigation Bar Event Listeners
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Nav link clicks
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const view = link.getAttribute("data-view");
      if (view) {
        e.preventDefault();
        switchView(view);
      }
    });
  });

  // Top banner close button
  const bannerClose = document.getElementById("banner-close");
  if (bannerClose) {
    bannerClose.addEventListener("click", () => {
      const banner = document.querySelector(".top-banner");
      if (banner) banner.style.display = "none";
    });
  }

  // 4. Voice-First, Assisted & Fallback Complaint Form Events
  const voiceFirstDesc = document.getElementById("voice-first-desc");
  if (voiceFirstDesc) {
    voiceFirstDesc.addEventListener("input", () => {
      classifyVoiceFirstText(voiceFirstDesc.value);
    });
  }

  const assistedForm = document.getElementById("assisted-complaint-form");
  if (assistedForm) {
    assistedForm.addEventListener("submit", handleAssistedComplaintSubmit);
  }

  const assistedDesc = document.getElementById("assisted-desc");
  if (assistedDesc) {
    assistedDesc.addEventListener("input", () => {
      classifyAssistedText(assistedDesc.value);
    });
  }

  const textFallbackForm = document.getElementById("text-fallback-form");
  if (textFallbackForm) {
    textFallbackForm.addEventListener("submit", handleFallbackComplaintSubmit);
  }

  // Pre-fetch browser speech synthesis voices
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  // Modal Actions
  const btnCopyId = document.getElementById("btn-copy-id");
  if (btnCopyId) {
    btnCopyId.addEventListener("click", () => {
      const idText = document.getElementById("modal-complaint-id").textContent;
      navigator.clipboard.writeText(idText).then(() => {
        showToast("Copied!", `ID ${idText} copied to clipboard.`, "info");
      });
    });
  }

  const btnModalTrack = document.getElementById("btn-modal-track");
  if (btnModalTrack) {
    btnModalTrack.addEventListener("click", () => {
      const idText = document.getElementById("modal-complaint-id").textContent;
      document.getElementById("complaint-success-modal").style.display = "none";
      switchView("track");
      const trackInput = document.getElementById("track-id-input");
      if (trackInput) trackInput.value = idText;
      trackComplaintById(idText);
    });
  }

  const btnModalClose = document.getElementById("btn-modal-close");
  if (btnModalClose) {
    btnModalClose.addEventListener("click", () => {
      document.getElementById("complaint-success-modal").style.display = "none";
    });
  }

  // 5. Tracking Page Events
  const trackingForm = document.getElementById("tracking-search-form");
  if (trackingForm) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("track-id-input");
      if (input) trackComplaintById(input.value);
    });
  }
  setupTrackingQuickSamples();

  // 6. Education Directory Events
  const btnToggleEdu = document.getElementById("btn-toggle-edu-form");
  const btnCloseEdu = document.getElementById("btn-close-edu-form");
  const btnCancelEdu = document.getElementById("btn-cancel-edu");
  const eduCard = document.getElementById("edu-registration-card");

  if (btnToggleEdu && eduCard) {
    btnToggleEdu.addEventListener("click", () => {
      document.getElementById("edu-register-form").reset();
      document.getElementById("edu-edit-id").value = "";
      eduCard.style.display = eduCard.style.display === "none" ? "block" : "none";
    });
  }
  if (btnCloseEdu && eduCard) btnCloseEdu.addEventListener("click", () => eduCard.style.display = "none");
  if (btnCancelEdu && eduCard) btnCancelEdu.addEventListener("click", () => eduCard.style.display = "none");

  const eduForm = document.getElementById("edu-register-form");
  if (eduForm) eduForm.addEventListener("submit", handleEducationSubmit);

  // Education Filters
  const eduSearch = document.getElementById("edu-search");
  const eduQual = document.getElementById("edu-filter-qual");
  const eduField = document.getElementById("edu-filter-field");
  const eduMentor = document.getElementById("edu-filter-mentor");
  const btnResetEdu = document.getElementById("btn-reset-edu-filters");

  [eduSearch, eduQual, eduField, eduMentor].forEach(el => {
    if (el) el.addEventListener("input", renderEducationProfiles);
  });
  if (btnResetEdu) {
    btnResetEdu.addEventListener("click", () => {
      if (eduSearch) eduSearch.value = "";
      if (eduQual) eduQual.value = "ALL";
      if (eduField) eduField.value = "ALL";
      if (eduMentor) eduMentor.value = "ALL";
      renderEducationProfiles();
    });
  }

  // 7. Skills Directory Events
  const btnToggleSkill = document.getElementById("btn-toggle-skill-form");
  const btnCloseSkill = document.getElementById("btn-close-skill-form");
  const btnCancelSkill = document.getElementById("btn-cancel-skill");
  const skillCard = document.getElementById("skill-registration-card");

  if (btnToggleSkill && skillCard) {
    btnToggleSkill.addEventListener("click", () => {
      document.getElementById("skill-register-form").reset();
      document.getElementById("skill-edit-id").value = "";
      skillCard.style.display = skillCard.style.display === "none" ? "block" : "none";
    });
  }
  if (btnCloseSkill && skillCard) btnCloseSkill.addEventListener("click", () => skillCard.style.display = "none");
  if (btnCancelSkill && skillCard) btnCancelSkill.addEventListener("click", () => skillCard.style.display = "none");

  const skillForm = document.getElementById("skill-register-form");
  if (skillForm) skillForm.addEventListener("submit", handleSkillSubmit);

  // Skills Filters
  const skillSearch = document.getElementById("skill-search");
  const skillCat = document.getElementById("skill-filter-cat");
  const skillVillage = document.getElementById("skill-filter-village");
  const btnResetSkill = document.getElementById("btn-reset-skill-filters");

  [skillSearch, skillCat, skillVillage].forEach(el => {
    if (el) el.addEventListener("input", renderSkillsProfiles);
  });
  if (btnResetSkill) {
    btnResetSkill.addEventListener("click", () => {
      if (skillSearch) skillSearch.value = "";
      if (skillCat) skillCat.value = "ALL";
      if (skillVillage) skillVillage.value = "ALL";
      renderSkillsProfiles();
    });
  }

  // Service Request Modal Events
  const serviceForm = document.getElementById("service-request-form");
  if (serviceForm) serviceForm.addEventListener("submit", handleServiceRequestSubmit);
  const btnCloseReq = document.getElementById("btn-close-request-modal");
  if (btnCloseReq) {
    btnCloseReq.addEventListener("click", () => {
      document.getElementById("service-request-modal").style.display = "none";
    });
  }

  // 8. Admin Events
  const adminTabs = document.querySelectorAll(".admin-tab-btn");
  adminTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      adminTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetTab = tab.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-content").forEach(tc => tc.classList.remove("active"));
      const activeContent = document.getElementById(targetTab);
      if (activeContent) activeContent.classList.add("active");
    });
  });

  const adminSearch = document.getElementById("admin-complaint-search");
  const adminCatFilter = document.getElementById("admin-complaint-filter-cat");
  const adminStatusFilter = document.getElementById("admin-complaint-filter-status");

  [adminSearch, adminCatFilter, adminStatusFilter].forEach(el => {
    if (el) el.addEventListener("input", renderAdminComplaintsTable);
  });

  const adminUpdateForm = document.getElementById("admin-update-form");
  if (adminUpdateForm) adminUpdateForm.addEventListener("submit", handleAdminStatusUpdate);

  const btnCloseAdminModal = document.getElementById("btn-close-admin-modal");
  if (btnCloseAdminModal) {
    btnCloseAdminModal.addEventListener("click", () => {
      document.getElementById("admin-status-modal").style.display = "none";
    });
  }

  // Demo Sample Data Resets
  const btnAdminReset = document.getElementById("btn-admin-reset-sample");
  if (btnAdminReset) {
    btnAdminReset.addEventListener("click", () => {
      if (confirm("Reset all complaints, education and skills profiles back to default Rampur sample records?")) {
        resetAllDataToDefault();
      }
    });
  }

  const btnAboutReset = document.getElementById("btn-about-reset-data");
  if (btnAboutReset) {
    btnAboutReset.addEventListener("click", () => {
      if (confirm("Restore original Rampur demo records?")) {
        resetAllDataToDefault();
      }
    });
  }

  // 9. Initial Route Resolution
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && VIEW_IDS.includes(initialHash)) {
    switchView(initialHash);
  } else {
    switchView("home");
  }

  // Pre-load default sample on track page
  trackComplaintById("GV-2026-001");
  updateHeroStats();
});
