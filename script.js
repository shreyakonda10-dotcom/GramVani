/**
 * GramVani – Voice-First Rural Grievance Redressal Platform
 * Main Application Logic
 * 
 * Modules:
 * 1. Single Page Application (SPA) Controller & Routing
 * 2. Multilingual Voice Assistant (Telugu, Hindi, English - Web Speech API)
 * 3. Voice-First Grievance Redressal & Auto Department/Urgency Classification
 * 4. Village Volunteer Assistance Mode (Assisted Submission for Illiterate Elders)
 * 5. Photo Evidence Handling (Client-Side HTML5 Canvas Compression)
 * 6. Duplicate Complaint Detection (Heuristic Locality & Keyword Matching)
 * 7. 4-Stage Complaint Tracking System with Voice Search & Audio Status
 * 8. Citizen Resolution Feedback (1-5 Star Ratings & Feedback Voice Input)
 * 9. Village Issues Map (Interactive Rampur Locality Breakdown & Heatmap)
 * 10. Panchayat Admin Dashboard (Live Metrics, 3 Chart.js Visualizations & Filters)
 */

// ==========================================================================
// 1. Rampur Village Dataset & LocalStorage Configuration
// ==========================================================================

// Sample lightweight SVG photo data URIs to demonstrate photo evidence out-of-the-box
const SAMPLE_PHOTO_WATER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23e0f2fe'/><path d='M20 160 Q70 120 120 160 T220 160 T300 160 L300 200 L0 200 Z' fill='%230284c7'/><circle cx='150' cy='90' r='35' fill='%230369a1'/><text x='150' y='95' font-family='Arial' font-size='12' fill='white' text-anchor='middle'>Water Pipeline Leak</text><text x='150' y='180' font-family='Arial' font-size='11' fill='white' text-anchor='middle'>Photo Evidence: Ram Mandir St.</text></svg>";
const SAMPLE_PHOTO_ELECTRIC = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23fef3c7'/><line x1='150' y1='20' x2='150' y2='180' stroke='%2378350f' stroke-width='10'/><polygon points='140,50 160,30 150,70 170,50 145,100' fill='%23d97706'/><text x='150' y='140' font-family='Arial' font-size='12' fill='%2392400e' text-anchor='middle'>Sparking Streetlight Pole #14</text><text x='150' y='160' font-family='Arial' font-size='10' fill='%23b45309' text-anchor='middle'>School Area Rampur</text></svg>";
const SAMPLE_PHOTO_ROADS = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f3f4f6'/><path d='M0 130 Q150 110 300 130 L300 200 L0 200 Z' fill='%234b5563'/><ellipse cx='140' cy='150' rx='45' ry='20' fill='%231f2937'/><text x='150' y='80' font-family='Arial' font-size='12' fill='%23374151' text-anchor='middle'>Deep Road Potholes</text><text x='150' y='185' font-family='Arial' font-size='10' fill='%239ca3af' text-anchor='middle'>South Bypass Road</text></svg>";
const SAMPLE_PHOTO_SANITATION = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='%23f0fdf4'/><rect x='100' y='80' width='100' height='90' rx='10' fill='%2315803d'/><circle cx='150' cy='50' r='20' fill='%2316a34a'/><text x='150' y='130' font-family='Arial' font-size='12' fill='white' text-anchor='middle'>Clean Waste Bin</text><text x='150' y='150' font-family='Arial' font-size='10' fill='white' text-anchor='middle'>Rythu Bazaar</text></svg>";

const DEFAULT_COMPLAINTS = [
  {
    id: "GV-2026-001",
    citizen: "Ramu Yadav",
    village: "Rampur",
    locality: "Ram Mandir Street",
    mobile: "9876543210",
    category: "Water Supply",
    priority: "High",
    method: "Voice-First Mode (Telugu)",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: "Main drinking water pipeline near Ram temple has severe leakage for 3 days. Water is overflowing into the street and houses are receiving low pressure.",
    status: "In Progress", // 4-stages: Submitted, Under Review, In Progress, Resolved
    statusMessage: "Panchayat lineman and water board contractor inspected the valve. Replacement pipe segment procured; repairs underway.",
    date: "06 Nov 2026",
    timestamp: Date.now() - 172800000,
    lastUpdated: "07 Nov 2026, 04:30 PM",
    photo: SAMPLE_PHOTO_WATER,
    potentialDuplicateOf: null,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  },
  {
    id: "GV-2026-002",
    citizen: "Venkatamma G.",
    village: "Rampur",
    locality: "Zilla Parishad School Area",
    mobile: "9848123456",
    category: "Electricity",
    priority: "High",
    method: "Voice-First Mode (Telugu)",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: "Street light pole #14 near Zilla Parishad school is flickering and sparking in evening rain. Poses safety hazard for school children.",
    status: "Under Review",
    statusMessage: "Complaint logged into electricity sub-station register. Field inspection squad scheduled for verification tomorrow morning.",
    date: "07 Nov 2026",
    timestamp: Date.now() - 86400000,
    lastUpdated: "07 Nov 2026, 06:15 PM",
    photo: SAMPLE_PHOTO_ELECTRIC,
    potentialDuplicateOf: null,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  },
  {
    id: "GV-2026-003",
    citizen: "Lachamma G. (Elderly Resident)",
    village: "Rampur",
    locality: "South Bypass & Bus Stand",
    mobile: "9988776655",
    category: "Roads",
    priority: "Medium",
    method: "Volunteer-Assisted",
    submissionType: "Volunteer-Assisted",
    volunteerName: "Kalyan Kumar",
    volunteerRole: "Panchayat Volunteer",
    description: "Large potholes on Rampur-Kalyanpur connecting road near bus stand after heavy rains. Two tractor carts almost overturned.",
    status: "In Progress",
    statusMessage: "Gravel and road repair truck dispatched by panchayat engineering wing. Patchwork is in progress.",
    date: "05 Nov 2026",
    timestamp: Date.now() - 259200000,
    lastUpdated: "07 Nov 2026, 11:00 AM",
    photo: SAMPLE_PHOTO_ROADS,
    potentialDuplicateOf: null,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  },
  {
    id: "GV-2026-004",
    citizen: "Babu Lal Patel",
    village: "Rampur",
    locality: "Weekly Market / Rythu Bazaar",
    mobile: "9440112233",
    category: "Sanitation",
    priority: "Medium",
    method: "Text Entry Fallback",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: "Garbage collection bin near weekly market has been overflowing for past week, creating foul smell and stray animal menace.",
    status: "Resolved",
    statusMessage: "Sanitation squad cleared the market bin and established daily waste pickup schedule. Disinfectant powder sprayed.",
    date: "02 Nov 2026",
    timestamp: Date.now() - 518400000,
    lastUpdated: "04 Nov 2026, 02:00 PM",
    photo: SAMPLE_PHOTO_SANITATION,
    potentialDuplicateOf: null,
    rating: 5,
    feedbackText: "Thank you to the panchayat sanitation squad for clearing the bin quickly within 2 days! Much cleaner now.",
    feedbackDate: "05 Nov 2026"
  },
  {
    id: "GV-2026-005",
    citizen: "Mallamma (Senior Citizen)",
    village: "Rampur",
    locality: "North Colony",
    mobile: "9700123987",
    category: "Drainage",
    priority: "Medium",
    method: "Volunteer-Assisted",
    submissionType: "Volunteer-Assisted",
    volunteerName: "Ananya Reddy",
    volunteerRole: "ASHA Worker",
    description: "Clogged open drainage canal near North colony causing wastewater stagnation and mosquito breeding.",
    status: "Submitted",
    statusMessage: "Complaint registered by ASHA worker Ananya on behalf of citizen. Awaiting initial panchayat review.",
    date: "07 Nov 2026",
    timestamp: Date.now() - 43200000,
    lastUpdated: "07 Nov 2026, 08:30 PM",
    photo: null,
    potentialDuplicateOf: null,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  },
  {
    id: "GV-2026-006",
    citizen: "Suresh Kumar (Resident)",
    village: "Rampur",
    locality: "Ram Mandir Street",
    mobile: "9849900112",
    category: "Water Supply",
    priority: "High",
    method: "Voice-First Mode (Telugu)",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: "Drinking water pipeline broken near Ram temple. Water flooding onto road and no water in taps.",
    status: "Under Review",
    statusMessage: "Identified as related to existing pipeline leak GV-2026-001. Bundled with current repair work order.",
    date: "07 Nov 2026",
    timestamp: Date.now() - 20000000,
    lastUpdated: "07 Nov 2026, 09:15 PM",
    photo: null,
    potentialDuplicateOf: "GV-2026-001",
    rating: null,
    feedbackText: null,
    feedbackDate: null
  }
];

const STORAGE_COMPLAINTS_KEY = "gramvani_complaints";

// Localities of Village Rampur
const RAMPUR_LOCALITIES = [
  "Ram Mandir Street",
  "Zilla Parishad School Area",
  "North Colony",
  "Weekly Market / Rythu Bazaar",
  "South Bypass & Bus Stand",
  "Gram Panchayat & Water Tank Center"
];

function getStoredComplaints() {
  const data = localStorage.getItem(STORAGE_COMPLAINTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
    return DEFAULT_COMPLAINTS;
  }
  try {
    const parsed = JSON.parse(data);
    // Ensure array format
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_COMPLAINTS;
  } catch (e) {
    return DEFAULT_COMPLAINTS;
  }
}

function saveComplaints(complaints) {
  localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(complaints));
}

function resetAllDataToDefault() {
  localStorage.setItem(STORAGE_COMPLAINTS_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
  showToast("Sample Data Restored", "Rampur default grievance records, photo evidence, and volunteer logs restored.", "info");
  refreshAllViews();
}

// ==========================================================================
// 2. Navigation & Single Page Application Controller
// ==========================================================================

const VIEW_IDS = ["home", "complaint", "volunteer", "track", "map", "admin", "about"];
let currentSelectedMapLocality = null;

function switchView(viewName) {
  if (!VIEW_IDS.includes(viewName)) {
    viewName = "home";
  }

  // Update URL hash
  if (window.location.hash !== `#${viewName}`) {
    window.location.hash = viewName;
  }

  // Toggle view panels
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

  // Update navbar links
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile nav drawer if open
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
  } else if (viewName === "map") {
    renderVillageIssuesMap();
  } else if (viewName === "complaint") {
    // Speak brief welcome guide on opening complaint page
    speakComplaintGuide();
  }
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && VIEW_IDS.includes(hash)) {
    switchView(hash);
  }
});

// ==========================================================================
// 3. Toast Notification System
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
// 4. Multilingual Voice Assistant & Text-to-Speech (TTS)
// ==========================================================================

let speechRecognition = null;
let isRecordingVoiceFirst = false;
let isRecordingVolunteer = false;
let isRecordingTrackingSearch = false;
let isRecordingFeedback = false;
let selectedVoiceLang = "te-IN"; // "te-IN" (Telugu), "hi-IN" (Hindi), "en-IN" (English)
let lastRegisteredComplaintId = "GV-2026-001";

// Client-side Photo Temporary State
let currentVoicePhotoData = null;
let currentVolunteerPhotoData = null;
let currentFallbackPhotoData = null;

function speakAloud(text, lang = selectedVoiceLang) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (lang.startsWith("te")) {
        const teVoice = voices.find(v => v.lang.startsWith("te") || v.name.toLowerCase().includes("telugu"));
        if (teVoice) utterance.voice = teVoice;
      } else if (lang.startsWith("hi")) {
        const hiVoice = voices.find(v => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi"));
        if (hiVoice) utterance.voice = hiVoice;
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
    speakAloud("నమస్కారం! గ్రామవాణి వేదికకు స్వాగతం. మీ గ్రామంలో నీరు, రహదారులు, విద్యుత్ వంటి సమస్యలను పెద్ద మైక్రోఫోన్ బటన్ నొక్కి మీ గొంతుతో చెప్పండి. రాయడం అవసరం లేదు.", "te-IN");
  } else if (selectedVoiceLang.startsWith("hi")) {
    speakAloud("नमस्ते! ग्रामवाणी मंच पर आपका स्वागत है। गांव की समस्याओं को बताने के लिए बड़े माइक बटन पर टैप करें और बोलें। लिखने की आवश्यकता नहीं है।", "hi-IN");
  } else {
    speakAloud("Welcome to GramVani. Tap the large microphone button and speak your village problems naturally in Telugu, Hindi, or English. No reading or typing is required.", "en-IN");
  }
}

function speakComplaintGuide() {
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud("వాయిస్ ఫిర్యాదు సూచనలు: ఒకటి - పెద్ద మైక్రోఫోన్ బటన్ నొక్కండి. రెండు - మీ సమస్యను సహజంగా మాట్లాడండి. మూడు - ఆకుపచ్చ నమోదు బటన్ నొక్కండి.", "te-IN");
  } else if (selectedVoiceLang.startsWith("hi")) {
    speakAloud("शिकायत दर्ज करने के निर्देश: पहला - बड़े माइक बटन को दबाएं। दूसरा - अपनी समस्या बोलें। तीसरा - हरे बटन पर टैप करें।", "hi-IN");
  } else {
    speakAloud("Voice instructions: Step 1 - Tap the big mic button. Step 2 - Speak your problem naturally. Step 3 - Tap the green confirm button. Photo and name are optional.", "en-IN");
  }
}

function replayConfirmationAudio() {
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud(`మీ ఫిర్యాదు విజయవంతంగా నమోదైంది. మీ ఫిర్యాదు సంఖ్య: ${lastRegisteredComplaintId}. పంచాయతీ సిబ్బంది దీనిని త్వరలోనే పరిశీలిస్తారు. ధన్యవాదాలు.`, "te-IN");
  } else if (selectedVoiceLang.startsWith("hi")) {
    speakAloud(`आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है। आपकी शिकायत संख्या है: ${lastRegisteredComplaintId}। पंचायत टीम जल्द ही इस पर कार्रवाई करेगी। धन्यवाद।`, "hi-IN");
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
    } else if (selectedVoiceLang.startsWith("hi")) {
      speakAloud("अभी तक कोई आवाज रिकॉर्ड नहीं हुई है। कृपया माइक दबाकर बोलें।", "hi-IN");
    } else {
      speakAloud("No speech captured yet. Please tap the microphone button and speak your problem.", "en-IN");
    }
  }
}

function speakCurrentTrackingStatus() {
  const compId = document.getElementById("track-disp-id")?.textContent || "";
  const status = document.getElementById("track-status-text")?.textContent?.trim() || "";
  const updateMsg = document.getElementById("track-disp-status-message")?.textContent?.trim() || "";
  
  if (!compId) return;

  if (selectedVoiceLang.startsWith("te")) {
    speakAloud(`ఫిర్యాదు సంఖ్య: ${compId}. ప్రస్తుత స్థితి: ${status}. తాజా పంచాయతీ సమాచారం: ${updateMsg}`, "te-IN");
  } else if (selectedVoiceLang.startsWith("hi")) {
    speakAloud(`शिकायत संख्या: ${compId}। वर्तमान स्थिति: ${status}। पंचायत का आधिकारिक संदेश: ${updateMsg}`, "hi-IN");
  } else {
    speakAloud(`Complaint ID: ${compId}. Current stage is: ${status}. Official update: ${updateMsg}`, "en-IN");
  }
}

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
    // Audio Context restricted before user gesture
  }
}

function setVoiceLanguage(lang) {
  selectedVoiceLang = lang;
  
  const btnTe = document.getElementById("btn-lang-te");
  const btnHi = document.getElementById("btn-lang-hi");
  const btnEn = document.getElementById("btn-lang-en");
  
  if (btnTe) btnTe.classList.toggle("active", lang.startsWith("te"));
  if (btnHi) btnHi.classList.toggle("active", lang.startsWith("hi"));
  if (btnEn) btnEn.classList.toggle("active", lang.startsWith("en"));

  if (speechRecognition) {
    speechRecognition.lang = lang;
    if (isRecordingVoiceFirst) {
      speechRecognition.stop();
      setTimeout(() => speechRecognition.start(), 200);
    }
  }

  const statusLabel = document.getElementById("voice-first-status-label");
  if (statusLabel && !isRecordingVoiceFirst) {
    if (lang.startsWith("te")) {
      statusLabel.textContent = "మైక్రోఫోన్ సిద్ధంగా ఉంది (Microphone Ready)";
    } else if (lang.startsWith("hi")) {
      statusLabel.textContent = "माइक्रोफ़ोन तैयार है (Microphone Ready)";
    } else {
      statusLabel.textContent = "Microphone Ready (Tap to Speak)";
    }
  }
}

// ==========================================================================
// 5. Keyword Heuristics for Auto Department & Priority Classification
// ==========================================================================

const CATEGORY_KEYWORDS = {
  "Electricity": [
    "street light", "streetlight", "transformer", "electricity", "power", "current",
    "wire", "pole", "voltage", "blackout", "spark", "sparking", "shock", "bulb", "vidyut",
    "విద్యుత్", "దీపం", "కరెంట్", "ట్రాన్స్ఫార్మర్", "స్తంభం", "बिजली", "खंभा", "ट्रांसफॉर्मर", "लाइट"
  ],
  "Water Supply": [
    "drinking water", "water supply", "pipeline", "borewell", "water", "bore", "tap",
    "pump", "submersible", "leak", "leakage", "neellu", "neeru", "jal", "tank", "valve",
    "తాగునీరు", "నీరు", "పైపు", "నీటి", "బోరు", "నల్లా", "पानी", "पाइपलाइन", "नल", "जल"
  ],
  "Drainage": [
    "waste water", "open drainage", "drainage", "drain", "gutter", "sewage", "clog",
    "clogged", "overflow", "overflowing", "kaaluva", "stagnant water", "mosquito",
    "మురుగు", "కాలువ", "మురుగునీరు", "नाली", "गटर", "सीवर", "कीचड़"
  ],
  "Sanitation": [
    "garbage bin", "garbage", "waste", "cleaning", "dustbin", "trash", "smell",
    "sweeping", "chetha", "stench", "rot", "plastic", "cleanliness",
    "చెత్త", "పరిశుభ్రత", "దుర్వాసన", "कचरा", "सफाई", "बदबू", "कूड़ा"
  ],
  "Roads": [
    "pothole", "potholes", "tar road", "gravel", "highway", "broken road",
    "mud road", "bridge", "road", "street", "dhaari",
    "రహదారి", "గుంత", "రోడ్డు", "దారి", "सड़क", "गड्ढा", "मार्ग", "रास्ता"
  ]
};

const HIGH_PRIORITY_KEYWORDS = [
    "urgent", "danger", "dangerous", "hazard", "spark", "sparking", "shock", 
    "overflowing", "disease", "accident", "broken pole", "flooding", "emergency", 
    "critical", "no drinking water", "immediate", "children", 
    "ఆపద", "ప్రమాదం", "అత్యవసరం", "షాక్", "ఖత్రా", "तुरंत", "आपातकालीन", "खतरा"
];

const MEDIUM_PRIORITY_KEYWORDS = [
    "leakage", "pothole", "repair", "broken", "garbage", "street light", 
    "flickering", "waste", "smell", "stench", "damage", "need fix", 
    "సమస్య", "బాగుచేయండి", "मरम्मत", "समस्या", "लीक"
];

function classifyText(rawText) {
  if (!rawText || rawText.trim() === "") {
    return { category: "Water Supply", priority: "Medium", matchedKeywords: [] };
  }

  const text = rawText.toLowerCase();
  const scores = {};
  const matchedKeywords = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = 0;
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) {
        const weight = kw.includes(" ") ? 3 : 1;
        scores[category] += weight;
        if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      }
    }
  }

  let bestCategory = "Other";
  let maxScore = 0;
  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  }

  let detectedPriority = "Medium";
  for (const kw of HIGH_PRIORITY_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      detectedPriority = "High";
      if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      break;
    }
  }

  if (detectedPriority !== "High") {
    for (const kw of MEDIUM_PRIORITY_KEYWORDS) {
      if (text.includes(kw.toLowerCase())) {
        detectedPriority = "Medium";
        break;
      }
    }
  }

  return { category: bestCategory, priority: detectedPriority, matchedKeywords };
}

function getBilingualCategoryName(cat) {
  switch (cat) {
    case "Water Supply": return "Water Supply (తాగునీరు / जल आपूर्ति)";
    case "Roads": return "Roads (రహదారులు / सड़क)";
    case "Electricity": return "Electricity (విద్యుత్ & లైట్లు / बिजली)";
    case "Sanitation": return "Sanitation (పారిశుధ్యం & చెత్త / स्वच्छता)";
    case "Drainage": return "Drainage (మురుగు కాలువలు / नाली)";
    default: return "Other Village Issue (ఇతర సమస్య)";
  }
}

// ==========================================================================
// 6. Speech Recognition Engine
// ==========================================================================

function initializeSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const alertEl = document.getElementById("voice-first-mic-alert");

  if (!SpeechRecognition) {
    if (alertEl) {
      alertEl.style.display = "flex";
      document.getElementById("voice-first-mic-alert-msg").textContent = 
        "Note: Web Speech API is not supported in this browser. Please use the Text Entry fallback.";
    }
    return null;
  }

  speechRecognition = new SpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = selectedVoiceLang;

  speechRecognition.onstart = () => {
    playChime("start");
    if (isRecordingVoiceFirst) updateVoiceFirstUI(true);
    if (isRecordingVolunteer) updateVolunteerMicUI(true);
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
          if (!descEl.value.endsWith(" ") && descEl.value.length > 0) descEl.value += " ";
          descEl.value += finalTranscript;
        }
        updateVoiceFirstClassification(descEl.value + interimTranscript);
      }
    } else if (isRecordingVolunteer) {
      const volDesc = document.getElementById("vol-desc");
      if (volDesc) {
        if (finalTranscript) {
          if (!volDesc.value.endsWith(" ") && volDesc.value.length > 0) volDesc.value += " ";
          volDesc.value += finalTranscript;
        }
        const detected = classifyText(volDesc.value + interimTranscript);
        const catSelect = document.getElementById("vol-category");
        const prioSelect = document.getElementById("vol-priority");
        if (catSelect && detected.category !== "Other") catSelect.value = detected.category;
        if (prioSelect) prioSelect.value = detected.priority;
      }
    } else if (isRecordingTrackingSearch) {
      const cleanId = (finalTranscript + interimTranscript).trim().replace(/\s+/g, "-").toUpperCase();
      const input = document.getElementById("track-id-input");
      if (input && cleanId) {
        // Look for GV or number pattern
        let formattedId = cleanId;
        const match = cleanId.match(/(\d+)/);
        if (match) {
          const num = match[1].padStart(3, "0");
          formattedId = `GV-2026-${num}`;
        }
        input.value = formattedId;
        trackComplaintById(formattedId);
      }
    } else if (isRecordingFeedback) {
      const feedbackInput = document.getElementById("feedback-comment-input");
      if (feedbackInput) {
        if (finalTranscript) feedbackInput.value += finalTranscript;
      }
    }
  };

  speechRecognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    isRecordingVoiceFirst = false;
    isRecordingVolunteer = false;
    isRecordingTrackingSearch = false;
    isRecordingFeedback = false;
    updateVoiceFirstUI(false);
    updateVolunteerMicUI(false);

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
    isRecordingVolunteer = false;
    isRecordingTrackingSearch = false;
    isRecordingFeedback = false;
    updateVoiceFirstUI(false);
    updateVolunteerMicUI(false);
  };

  return speechRecognition;
}

function updateVoiceFirstClassification(text) {
  const { category, priority, matchedKeywords } = classifyText(text);

  const categoryDisp = document.getElementById("voice-first-category-disp");
  const categoryInput = document.getElementById("voice-first-category");
  const priorityDisp = document.getElementById("voice-first-priority-disp");
  const priorityInput = document.getElementById("voice-first-priority");
  const kwPill = document.getElementById("voice-first-kw-pill");

  if (categoryDisp) categoryDisp.textContent = getBilingualCategoryName(category);
  if (categoryInput) categoryInput.value = category;

  if (priorityDisp) {
    priorityDisp.textContent = `${priority} Priority (${priority === 'High' ? 'అత్యవసరం' : 'సాధారణం'})`;
    priorityDisp.className = `priority-badge priority-${priority.toLowerCase()}`;
  }
  if (priorityInput) priorityInput.value = priority;

  if (kwPill) {
    if (matchedKeywords.length > 0) {
      kwPill.textContent = `Keywords: ${matchedKeywords.slice(0, 3).join(", ")}`;
    } else {
      kwPill.textContent = text ? "Analyzing speech..." : "Awaiting voice input...";
    }
  }
}

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
    isRecordingVolunteer = false;
    isRecordingTrackingSearch = false;
    isRecordingFeedback = false;
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
  updateVoiceFirstClassification("");
}

function updateVoiceFirstUI(listening) {
  const micBtn = document.getElementById("voice-first-mic-btn");
  const micIcon = document.getElementById("voice-first-mic-icon");
  const statusDot = document.getElementById("voice-first-pulse-dot");
  const statusLabel = document.getElementById("voice-first-status-label");
  const heading = document.getElementById("voice-first-action-heading");
  const sub = document.getElementById("voice-first-action-sub");
  const visualizer = document.getElementById("voice-first-visualizer");

  const heroMicBtn = document.getElementById("hero-mic-btn");
  const heroMicTitle = document.getElementById("hero-mic-caption-title");

  if (listening) {
    if (micBtn) micBtn.classList.add("recording");
    if (micIcon) { micIcon.classList.remove("fa-microphone"); micIcon.classList.add("fa-stop"); }
    if (statusDot) statusDot.classList.add("listening");
    if (statusLabel) statusLabel.textContent = selectedVoiceLang.startsWith("te") ? "వినబడుతోంది... మాట్లాడండి" : "Listening... Speak Now";
    if (heading) heading.textContent = selectedVoiceLang.startsWith("te") ? "మీ సమస్యను చెప్పండి..." : "Listening to your grievance...";
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

function switchSubmissionMode(mode) {
  ['voice', 'text'].forEach(m => {
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

  if (mode !== 'voice' && isRecordingVoiceFirst && speechRecognition) {
    speechRecognition.stop();
  }
}

// ==========================================================================
// 7. Client-Side Image Compression (HTML5 Canvas to prevent LocalStorage bloat)
// ==========================================================================

function compressImageFile(file, maxWidth = 500, quality = 0.7, callback) {
  if (!file || !file.type.startsWith("image/")) {
    callback(null);
    return;
  }

  const reader = new FileReader();
  reader.onload = (readerEvent) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Lightweight compressed JPEG data URI (~25-35KB)
      const compressedDataUri = canvas.toDataURL("image/jpeg", quality);
      callback(compressedDataUri);
    };
    img.src = readerEvent.target.result;
  };
  reader.readAsDataURL(file);
}

function removeVoicePhoto() {
  currentVoicePhotoData = null;
  const previewWrap = document.getElementById("voice-photo-preview-wrap");
  const fileInput = document.getElementById("voice-photo-input");
  if (previewWrap) previewWrap.style.display = "none";
  if (fileInput) fileInput.value = "";
}

function removeVolunteerPhoto() {
  currentVolunteerPhotoData = null;
  const previewWrap = document.getElementById("vol-photo-preview-wrap");
  const fileInput = document.getElementById("vol-photo-input");
  if (previewWrap) previewWrap.style.display = "none";
  if (fileInput) fileInput.value = "";
}

function removeFallbackPhoto() {
  currentFallbackPhotoData = null;
  const previewWrap = document.getElementById("fallback-photo-preview-wrap");
  const fileInput = document.getElementById("fallback-photo-input");
  if (previewWrap) previewWrap.style.display = "none";
  if (fileInput) fileInput.value = "";
}

function openPhotoViewerModal(imageSrc) {
  const modal = document.getElementById("photo-viewer-modal");
  const enlargedImg = document.getElementById("modal-enlarged-photo");
  if (modal && enlargedImg && imageSrc) {
    enlargedImg.src = imageSrc;
    modal.style.display = "flex";
  }
}

function closePhotoViewerModal() {
  const modal = document.getElementById("photo-viewer-modal");
  if (modal) modal.style.display = "none";
}

// ==========================================================================
// 8. Duplicate Complaint Detection
// ==========================================================================

function detectDuplicates(newComplaint, existingComplaints) {
  if (!newComplaint || !newComplaint.description) return null;

  const newLocality = (newComplaint.locality || "").toLowerCase();
  const newCat = (newComplaint.category || "").toLowerCase();
  const newDesc = newComplaint.description.toLowerCase();

  for (const existing of existingComplaints) {
    // Don't compare with self
    if (existing.id === newComplaint.id) continue;
    // Don't compare with resolved complaints older than a month
    if (existing.status === "Resolved") continue;

    const exLocality = (existing.locality || "").toLowerCase();
    const exCat = (existing.category || "").toLowerCase();
    const exDesc = existing.description.toLowerCase();

    // Check 1: Same locality and same category
    if (newLocality && exLocality && newLocality === exLocality && newCat === exCat) {
      // Check for shared significant words
      const keywords = ["pipeline", "leak", "leakage", "water", "pipe", "street light", "light", "spark", "pole", "drain", "drainage", "pothole", "road", "garbage", "waste"];
      const sharedWords = keywords.filter(kw => newDesc.includes(kw) && exDesc.includes(kw));
      if (sharedWords.length >= 1) {
        return existing.id;
      }
    }
  }

  return null;
}

function openDuplicateModal(currentId, originalId) {
  const complaints = getStoredComplaints();
  const current = complaints.find(c => c.id === currentId);
  const original = complaints.find(c => c.id === originalId);

  if (!current || !original) return;

  document.getElementById("dup-curr-id").textContent = current.id;
  document.getElementById("dup-curr-loc").textContent = current.locality;
  document.getElementById("dup-curr-citizen").textContent = current.citizen;
  document.getElementById("dup-curr-date").textContent = current.date;
  document.getElementById("dup-curr-desc").textContent = current.description;

  document.getElementById("dup-orig-id").textContent = original.id;
  document.getElementById("dup-orig-loc").textContent = original.locality;
  document.getElementById("dup-orig-citizen").textContent = original.citizen;
  document.getElementById("dup-orig-status").textContent = original.status;
  document.getElementById("dup-orig-desc").textContent = original.description;

  const modal = document.getElementById("duplicate-compare-modal");
  if (modal) modal.style.display = "flex";
}

function closeDuplicateModal() {
  const modal = document.getElementById("duplicate-compare-modal");
  if (modal) modal.style.display = "none";
}

// Sequential ID Generator: GV-2026-007
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

// ==========================================================================
// 9. Complaint Submission Handlers (Voice-First, Volunteer, Fallback)
// ==========================================================================

function submitVoiceFirstComplaint() {
  const desc = document.getElementById("voice-first-desc")?.value.trim();

  if (!desc) {
    showToast("Voice Input Needed", "Please tap the microphone and speak your problem first.", "error");
    if (selectedVoiceLang.startsWith("te")) {
      speakAloud("దయచేసి పెద్ద మైక్రోఫోన్ బటన్ నొక్కి మీ సమస్యను చెప్పండి.", "te-IN");
    } else if (selectedVoiceLang.startsWith("hi")) {
      speakAloud("कृपया माइक बटन दबाएं और अपनी समस्या बताएं।", "hi-IN");
    } else {
      speakAloud("Please tap the microphone button and speak your problem first.", "en-IN");
    }
    return;
  }

  const rawName = document.getElementById("voice-first-name")?.value.trim();
  const citizenName = rawName || "Anonymous Villager (గ్రామస్థుడు)";
  const locality = document.getElementById("voice-first-locality")?.value || "Ram Mandir Street";
  const mobile = document.getElementById("voice-first-mobile")?.value.trim() || "Not provided";
  const category = document.getElementById("voice-first-category")?.value || "Water Supply";
  const priority = document.getElementById("voice-first-priority")?.value || "Medium";

  const newId = generateNextComplaintId();
  lastRegisteredComplaintId = newId;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const complaints = getStoredComplaints();

  const tempComplaint = {
    id: newId,
    locality: locality,
    category: category,
    description: desc
  };
  const potentialDup = detectDuplicates(tempComplaint, complaints);

  const newComplaint = {
    id: newId,
    citizen: citizenName,
    village: "Rampur",
    locality: locality,
    mobile: mobile,
    category: category,
    priority: priority,
    method: "Voice-First Mode",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: desc,
    status: "Submitted", // 4 stages: Submitted, Under Review, In Progress, Resolved
    statusMessage: "Complaint registered via Voice-First mode. Scheduled for initial panchayat review.",
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`,
    photo: currentVoicePhotoData,
    potentialDuplicateOf: potentialDup,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  };

  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  if (isRecordingVoiceFirst && speechRecognition) speechRecognition.stop();

  // Show Success Modal
  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = citizenName;
  document.getElementById("modal-locality-disp").textContent = locality;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = "Voice-First Mode (Bilingual)";

  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  replayConfirmationAudio();

  // Reset form
  document.getElementById("voice-first-desc").value = "";
  if (document.getElementById("voice-first-name")) document.getElementById("voice-first-name").value = "";
  if (document.getElementById("voice-first-mobile")) document.getElementById("voice-first-mobile").value = "";
  removeVoicePhoto();
  updateVoiceFirstClassification("");

  showToast("Grievance Registered", `Your Complaint ID is ${newId}`, "success");
  updateHeroStats();
}

// Volunteer Mode Submission
function handleVolunteerComplaintSubmit(e) {
  e.preventDefault();

  const volName = document.getElementById("vol-name")?.value.trim() || "Panchayat Volunteer";
  const volRole = document.getElementById("vol-role")?.value || "Volunteer";
  const rawCitizen = document.getElementById("vol-citizen-name")?.value.trim();
  const citizenName = rawCitizen || "Anonymous Villager";
  const locality = document.getElementById("vol-locality")?.value || "South Bypass & Bus Stand";
  const mobile = document.getElementById("vol-mobile")?.value.trim() || "Not provided";
  const desc = document.getElementById("vol-desc")?.value.trim();
  const category = document.getElementById("vol-category")?.value || "Roads";
  const priority = document.getElementById("vol-priority")?.value || "Medium";

  if (!desc) {
    showToast("Description Required", "Please record or type the complaint details.", "error");
    return;
  }

  const newId = generateNextComplaintId();
  lastRegisteredComplaintId = newId;

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const complaints = getStoredComplaints();
  const potentialDup = detectDuplicates({ id: newId, locality, category, description: desc }, complaints);

  const newComplaint = {
    id: newId,
    citizen: `${citizenName} (Assisted by ${volName})`,
    village: "Rampur",
    locality: locality,
    mobile: mobile,
    category: category,
    priority: priority,
    method: "Volunteer-Assisted",
    submissionType: "Volunteer-Assisted",
    volunteerName: volName,
    volunteerRole: volRole,
    description: desc,
    status: "Submitted",
    statusMessage: `Registered by volunteer ${volName} (${volRole}). Scheduled for panchayat verification.`,
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`,
    photo: currentVolunteerPhotoData,
    potentialDuplicateOf: potentialDup,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  };

  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  if (isRecordingVolunteer && speechRecognition) speechRecognition.stop();

  // Show Success Modal
  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = newComplaint.citizen;
  document.getElementById("modal-locality-disp").textContent = locality;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = `Volunteer Help (${volRole})`;

  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  replayConfirmationAudio();
  document.getElementById("volunteer-submission-form").reset();
  removeVolunteerPhoto();
  showToast("Assisted Grievance Logged", `Complaint ID: ${newId}`, "success");
  updateHeroStats();
}

function toggleVolunteerVoiceRecording() {
  if (!speechRecognition) {
    initializeSpeechRecognition();
    if (!speechRecognition) return;
  }

  if (isRecordingVolunteer) {
    speechRecognition.stop();
  } else {
    isRecordingVolunteer = true;
    isRecordingVoiceFirst = false;
    isRecordingTrackingSearch = false;
    isRecordingFeedback = false;
    speechRecognition.lang = selectedVoiceLang;
    try {
      speechRecognition.start();
    } catch (e) {
      console.warn("Failed to start volunteer speech:", e);
    }
  }
}

function updateVolunteerMicUI(listening) {
  const micBtn = document.getElementById("btn-vol-mic");
  const micIcon = document.getElementById("vol-mic-icon");
  const micLabel = document.getElementById("vol-mic-label");

  if (listening) {
    if (micBtn) micBtn.classList.add("btn-danger");
    if (micIcon) micIcon.className = "fa-solid fa-stop";
    if (micLabel) micLabel.textContent = "Stop Recording Citizen's Voice";
  } else {
    if (micBtn) micBtn.classList.remove("btn-danger");
    if (micIcon) micIcon.className = "fa-solid fa-microphone";
    if (micLabel) micLabel.textContent = "Record Citizen's Voice (మాట్లాడించండి)";
  }
}

// Fallback Mode Handler
function handleFallbackComplaintSubmit(e) {
  e.preventDefault();

  const rawName = document.getElementById("fallback-name")?.value.trim();
  const citizenName = rawName || "Anonymous Villager (గ్రామస్థుడు)";
  const locality = document.getElementById("fallback-locality")?.value || "Ram Mandir Street";
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

  const complaints = getStoredComplaints();
  const potentialDup = detectDuplicates({ id: newId, locality, category, description: desc }, complaints);

  const newComplaint = {
    id: newId,
    citizen: citizenName,
    village: "Rampur",
    locality: locality,
    mobile: mobile,
    category: category,
    priority: priority,
    method: "Text Entry Fallback",
    submissionType: "Direct Citizen",
    volunteerName: "",
    volunteerRole: "",
    description: desc,
    status: "Submitted",
    statusMessage: "Complaint registered via text fallback. Scheduled for review.",
    date: dateFormatted,
    timestamp: Date.now(),
    lastUpdated: `${dateFormatted}, ${timeFormatted}`,
    photo: currentFallbackPhotoData,
    potentialDuplicateOf: potentialDup,
    rating: null,
    feedbackText: null,
    feedbackDate: null
  };

  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  document.getElementById("modal-complaint-id").textContent = newId;
  document.getElementById("modal-citizen-name").textContent = citizenName;
  document.getElementById("modal-locality-disp").textContent = locality;
  document.getElementById("modal-category-badge").textContent = category;
  
  const modalPrio = document.getElementById("modal-priority-badge");
  modalPrio.textContent = priority;
  modalPrio.className = `priority-badge priority-${priority.toLowerCase()}`;
  document.getElementById("modal-method-text").textContent = "Text Fallback";

  const modal = document.getElementById("complaint-success-modal");
  if (modal) modal.style.display = "flex";

  replayConfirmationAudio();
  document.getElementById("text-fallback-form").reset();
  removeFallbackPhoto();
  showToast("Grievance Submitted", `Complaint ID: ${newId}`, "success");
  updateHeroStats();
}

// ==========================================================================
// 10. Complaint Tracking (4-Stage Stepper, Audio Status & Resolution Feedback)
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

  if (emptyState) emptyState.style.display = "none";
  if (notFoundAlert) notFoundAlert.style.display = "none";
  if (trackCard) trackCard.style.display = "block";

  document.getElementById("track-disp-id").textContent = complaint.id;
  document.getElementById("track-disp-category").textContent = complaint.category;
  document.getElementById("track-disp-locality").textContent = complaint.locality || "Rampur";
  document.getElementById("track-disp-citizen").textContent = complaint.citizen;
  document.getElementById("track-disp-date").textContent = complaint.date;
  document.getElementById("track-disp-method").textContent = complaint.method;
  document.getElementById("track-disp-description").textContent = complaint.description;
  document.getElementById("track-disp-last-update").textContent = `Updated on: ${complaint.lastUpdated || complaint.date}`;
  document.getElementById("track-disp-status-message").textContent = complaint.statusMessage || "Panchayat administration is currently processing this grievance.";

  const prioEl = document.getElementById("track-disp-priority");
  prioEl.textContent = `${complaint.priority} Priority`;
  prioEl.className = `priority-badge priority-${complaint.priority.toLowerCase()}`;

  const typeEl = document.getElementById("track-disp-submission-type");
  if (typeEl) {
    typeEl.textContent = complaint.submissionType || "Direct Citizen";
    typeEl.className = complaint.submissionType === "Volunteer-Assisted" ? "badge badge-teal" : "badge badge-neutral";
  }

  // 4-Stage Stepper Configuration
  // Stages: Submitted (25%), Under Review (50%), In Progress (75%), Resolved (100%)
  const statusBadge = document.getElementById("track-disp-status");
  const statusText = document.getElementById("track-status-text");
  const statusIcon = document.getElementById("track-status-icon");
  const progressBar = document.getElementById("stepper-progress-bar");

  const step1 = document.getElementById("step-point-1");
  const step2 = document.getElementById("step-point-2");
  const step3 = document.getElementById("step-point-3");
  const step4 = document.getElementById("step-point-4");

  [step1, step2, step3, step4].forEach(s => {
    if (s) s.classList.remove("active", "completed");
  });

  const currentStatus = complaint.status || "Submitted";

  if (currentStatus === "Submitted") {
    statusBadge.className = "status-indicator-badge status-pending";
    statusText.textContent = "1. Submitted";
    statusIcon.className = "fa-solid fa-clock";
    progressBar.style.width = "25%";
    step1.classList.add("completed");
    step2.classList.add("active");
  } else if (currentStatus === "Under Review") {
    statusBadge.className = "status-indicator-badge status-review";
    statusText.textContent = "2. Under Review";
    statusIcon.className = "fa-solid fa-clipboard-check";
    progressBar.style.width = "50%";
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("active");
  } else if (currentStatus === "In Progress") {
    statusBadge.className = "status-indicator-badge status-in-progress";
    statusText.textContent = "3. In Progress";
    statusIcon.className = "fa-solid fa-person-digging fa-spin";
    progressBar.style.width = "75%";
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("completed");
    step4.classList.add("active");
  } else if (currentStatus === "Resolved") {
    statusBadge.className = "status-indicator-badge status-resolved";
    statusText.textContent = "4. Resolved";
    statusIcon.className = "fa-solid fa-circle-check";
    progressBar.style.width = "100%";
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("completed");
    step4.classList.add("completed");
    document.getElementById("step-resolved-note").textContent = "Completed & Closed";
  }

  // Photo evidence display in tracking
  const photoBox = document.getElementById("track-photo-box");
  const photoImg = document.getElementById("track-photo-img");
  if (photoBox && photoImg) {
    if (complaint.photo) {
      photoImg.src = complaint.photo;
      photoBox.style.display = "block";
    } else {
      photoBox.style.display = "none";
    }
  }

  // FEATURE 7: Citizen Resolution Feedback Section
  const feedbackSection = document.getElementById("track-feedback-section");
  const feedbackFormContainer = document.getElementById("feedback-form-container");
  const feedbackSubmittedDisplay = document.getElementById("feedback-submitted-display");

  if (feedbackSection) {
    if (currentStatus === "Resolved") {
      feedbackSection.style.display = "block";

      if (complaint.rating) {
        // Feedback already submitted
        if (feedbackFormContainer) feedbackFormContainer.style.display = "none";
        if (feedbackSubmittedDisplay) {
          feedbackSubmittedDisplay.style.display = "block";
          document.getElementById("submitted-stars-disp").textContent = "★".repeat(complaint.rating) + "☆".repeat(5 - complaint.rating);
          document.getElementById("submitted-feedback-text").textContent = complaint.feedbackText ? `"${complaint.feedbackText}"` : "Rated without written comment.";
        }
      } else {
        // Allow submitting feedback
        if (feedbackFormContainer) feedbackFormContainer.style.display = "block";
        if (feedbackSubmittedDisplay) feedbackSubmittedDisplay.style.display = "none";
        selectFeedbackStar(5);
      }
    } else {
      feedbackSection.style.display = "none";
    }
  }
}

function startVoiceSearchTrackId() {
  if (!speechRecognition) {
    initializeSpeechRecognition();
    if (!speechRecognition) return;
  }

  isRecordingTrackingSearch = true;
  isRecordingVoiceFirst = false;
  isRecordingVolunteer = false;
  isRecordingFeedback = false;
  speechRecognition.lang = selectedVoiceLang;

  showToast("Listening for Complaint ID", "Speak your ID (e.g. GV-2026-001 or 001)...", "info");
  if (selectedVoiceLang.startsWith("te")) {
    speakAloud("మీ ఫిర్యాదు సంఖ్యను చెప్పండి, ఉదాహరణకు 001", "te-IN");
  } else if (selectedVoiceLang.startsWith("hi")) {
    speakAloud("अपनी शिकायत संख्या बोलें, जैसे कि 001", "hi-IN");
  } else {
    speakAloud("Speak your complaint ID, for example 001", "en-IN");
  }

  try {
    speechRecognition.start();
  } catch (e) {
    console.warn("Tracking voice search start error:", e);
  }
}

function selectFeedbackStar(rating) {
  const hiddenInput = document.getElementById("selected-star-rating");
  if (hiddenInput) hiddenInput.value = rating;

  const stars = document.querySelectorAll("#star-rating-widget .star-btn");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });

  const label = document.getElementById("feedback-rating-label");
  const labels = ["1 Star - Poor", "2 Stars - Fair", "3 Stars - Good", "4 Stars - Very Good", "5 Stars - Excellent Resolution!"];
  if (label) label.textContent = labels[rating - 1] || `${rating} Stars`;
}

function toggleFeedbackVoice() {
  if (!speechRecognition) {
    initializeSpeechRecognition();
    if (!speechRecognition) return;
  }

  isRecordingFeedback = true;
  isRecordingVoiceFirst = false;
  isRecordingVolunteer = false;
  isRecordingTrackingSearch = false;
  speechRecognition.lang = selectedVoiceLang;
  showToast("Recording Feedback", "Speak your comments aloud...", "info");

  try {
    speechRecognition.start();
  } catch (e) {
    console.warn(e);
  }
}

function submitCitizenFeedback() {
  const compId = document.getElementById("track-disp-id")?.textContent;
  if (!compId) return;

  const rating = parseInt(document.getElementById("selected-star-rating")?.value || "5", 10);
  const comment = document.getElementById("feedback-comment-input")?.value.trim() || "";

  const complaints = getStoredComplaints();
  const idx = complaints.findIndex(c => c.id === compId);

  if (idx !== -1) {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    complaints[idx].rating = rating;
    complaints[idx].feedbackText = comment;
    complaints[idx].feedbackDate = dateFormatted;
    saveComplaints(complaints);

    showToast("Feedback Recorded", `Thank you for rating this resolution ${rating} stars!`, "success");
    trackComplaintById(compId);
    updateHeroStats();
  }
}

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
// 11. Village Issues Map (Interactive Rampur Locality Breakdown)
// ==========================================================================

function renderVillageIssuesMap() {
  const grid = document.getElementById("village-map-grid");
  if (!grid) return;

  const complaints = getStoredComplaints();

  // Aggregate stats per locality
  const localityData = {};
  RAMPUR_LOCALITIES.forEach(loc => {
    localityData[loc] = {
      total: 0,
      active: 0,
      resolved: 0,
      highPriority: 0,
      categories: {}
    };
  });

  complaints.forEach(c => {
    const loc = c.locality || "Ram Mandir Street";
    if (!localityData[loc]) {
      localityData[loc] = { total: 0, active: 0, resolved: 0, highPriority: 0, categories: {} };
    }
    localityData[loc].total++;
    if (c.status === "Resolved") {
      localityData[loc].resolved++;
    } else {
      localityData[loc].active++;
    }
    if (c.priority === "High") {
      localityData[loc].highPriority++;
    }
    localityData[loc].categories[c.category] = (localityData[loc].categories[c.category] || 0) + 1;
  });

  grid.innerHTML = RAMPUR_LOCALITIES.map(loc => {
    const data = localityData[loc];
    const isSelected = currentSelectedMapLocality === loc;

    const catBadges = Object.entries(data.categories).map(([cat, count]) => {
      return `<span class="locality-cat-pill">${cat}: ${count}</span>`;
    }).join("");

    return `
      <div class="village-locality-card ${isSelected ? 'selected' : ''}" onclick="filterLocalityMap('${loc}')">
        <div class="locality-card-header">
          <div class="locality-name-wrap">
            <i class="fa-solid fa-location-dot text-green"></i>
            <h4>${loc}</h4>
          </div>
          <span class="badge ${data.active > 0 ? 'badge-primary' : 'badge-neutral'}">
            ${data.active} Active Issue${data.active !== 1 ? 's' : ''}
          </span>
        </div>

        <div class="locality-stat-row mt-2">
          <div class="locality-mini-stat">
            <strong>${data.total}</strong>
            <small>Total Logged</small>
          </div>
          <div class="locality-mini-stat">
            <strong class="text-green">${data.resolved}</strong>
            <small>Resolved</small>
          </div>
          <div class="locality-mini-stat">
            <strong class="${data.highPriority > 0 ? 'text-danger' : 'text-muted'}">${data.highPriority}</strong>
            <small>Urgent High</small>
          </div>
        </div>

        <div class="locality-cat-chips mt-3">
          ${catBadges || '<span class="font-sm text-muted">No active issues</span>'}
        </div>

        <div class="locality-card-footer mt-3">
          <span class="view-issues-link"><i class="fa-solid fa-filter"></i> ${isSelected ? 'Selected Locality' : 'Filter Issues in This Area'}</span>
        </div>
      </div>
    `;
  }).join("");

  renderLocalityDrilldownTable();
}

function filterLocalityMap(locality) {
  currentSelectedMapLocality = locality;
  renderVillageIssuesMap();
}

function resetLocalityMapFilter() {
  currentSelectedMapLocality = null;
  renderVillageIssuesMap();
}

function renderLocalityDrilldownTable() {
  const title = document.getElementById("drilldown-locality-title");
  const subtitle = document.getElementById("drilldown-locality-subtitle");
  const tbody = document.getElementById("locality-complaints-tbody");
  if (!tbody) return;

  const complaints = getStoredComplaints();
  let filtered = complaints;

  if (currentSelectedMapLocality) {
    filtered = complaints.filter(c => (c.locality || "Ram Mandir Street") === currentSelectedMapLocality);
    if (title) title.innerHTML = `<i class="fa-solid fa-location-dot text-green"></i> Locality: ${currentSelectedMapLocality}`;
    if (subtitle) subtitle.textContent = `Showing ${filtered.length} issues reported in ${currentSelectedMapLocality}.`;
  } else {
    if (title) title.innerHTML = `<i class="fa-solid fa-location-crosshairs text-green"></i> All Rampur Localities`;
    if (subtitle) subtitle.textContent = "Showing all active and resolved complaints across Village Rampur.";
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No complaints recorded for this locality.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    let statusClass = "status-pending";
    if (c.status === "Under Review") statusClass = "status-review";
    if (c.status === "In Progress") statusClass = "status-in-progress";
    if (c.status === "Resolved") statusClass = "status-resolved";

    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><small>${c.locality || 'Rampur'}</small></td>
        <td><span class="badge badge-category">${c.category}</span></td>
        <td style="max-width: 250px;"><small class="d-block text-truncate" title="${c.description}">${c.description}</small></td>
        <td><span class="priority-badge priority-${c.priority.toLowerCase()}">${c.priority}</span></td>
        <td><span class="status-indicator-badge ${statusClass}" style="padding: 2px 8px; font-size: 0.75rem;">${c.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-primary" onclick="switchView('track'); trackComplaintById('${c.id}');">
            <i class="fa-solid fa-magnifying-glass"></i> Track
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

// ==========================================================================
// 12. Improved Admin Dashboard (Live KPIs, 3 Chart.js Visuals, Duplicates)
// ==========================================================================

let chartCatInstance = null;
let chartStatusInstance = null;
let chartLocalityInstance = null;

function renderAdminDashboard() {
  const complaints = getStoredComplaints();

  // 1. Calculate Metrics
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Submitted" || c.status === "Under Review").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const volunteerAssisted = complaints.filter(c => c.submissionType === "Volunteer-Assisted").length;
  const duplicates = complaints.filter(c => !!c.potentialDuplicateOf).length;

  // Average Citizen Satisfaction
  const rated = complaints.filter(c => typeof c.rating === "number" && c.rating > 0);
  let avgRatingStr = "★ N/A";
  if (rated.length > 0) {
    const avg = (rated.reduce((acc, c) => acc + c.rating, 0) / rated.length).toFixed(1);
    avgRatingStr = `★ ${avg}`;
  }

  // Update DOM Numbers
  const elTotal = document.getElementById("dash-total-complaints");
  const elPending = document.getElementById("dash-pending-complaints");
  const elInProgress = document.getElementById("dash-inprogress-complaints");
  const elResolved = document.getElementById("dash-resolved-complaints");
  const elVolunteer = document.getElementById("dash-volunteer-complaints");
  const elDuplicate = document.getElementById("dash-duplicate-complaints");
  const elSatisfaction = document.getElementById("dash-satisfaction-rating");
  const elBadgeCount = document.getElementById("admin-badge-complaints-count");

  if (elTotal) elTotal.textContent = total;
  if (elPending) elPending.textContent = pending;
  if (elInProgress) elInProgress.textContent = inProgress;
  if (elResolved) elResolved.textContent = resolved;
  if (elVolunteer) elVolunteer.textContent = volunteerAssisted;
  if (elDuplicate) elDuplicate.textContent = duplicates;
  if (elSatisfaction) elSatisfaction.textContent = avgRatingStr;
  if (elBadgeCount) elBadgeCount.textContent = total;

  // 2. Render Analytics Charts
  renderAdminCharts(complaints);

  // 3. Render Complaints Table
  renderAdminComplaintsTable();
}

function renderAdminCharts(complaints) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded");
    return;
  }

  // Chart 1: Categories
  const catCounts = { "Water Supply": 0, "Roads": 0, "Electricity": 0, "Sanitation": 0, "Drainage": 0, "Other": 0 };
  complaints.forEach(c => {
    if (catCounts[c.category] !== undefined) catCounts[c.category]++;
    else catCounts["Other"]++;
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
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } }
      }
    });
  }

  // Chart 2: 4-Stage Statuses
  const statusCounts = {
    "Submitted": complaints.filter(c => c.status === "Submitted").length,
    "Under Review": complaints.filter(c => c.status === "Under Review").length,
    "In Progress": complaints.filter(c => c.status === "In Progress").length,
    "Resolved": complaints.filter(c => c.status === "Resolved").length
  };

  const statusCanvas = document.getElementById("chartComplaintsStatus");
  if (statusCanvas) {
    if (chartStatusInstance) chartStatusInstance.destroy();
    chartStatusInstance = new Chart(statusCanvas, {
      type: "pie",
      data: {
        labels: ["Submitted", "Under Review", "In Progress", "Resolved"],
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ["#f57c00", "#ab47bc", "#1976d2", "#2e7d32"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } }
      }
    });
  }

  // Chart 3: Localities Distribution
  const locCounts = {};
  RAMPUR_LOCALITIES.forEach(loc => locCounts[loc] = 0);
  complaints.forEach(c => {
    const loc = c.locality || "Ram Mandir Street";
    locCounts[loc] = (locCounts[loc] || 0) + 1;
  });

  const locCanvas = document.getElementById("chartComplaintsLocality");
  if (locCanvas) {
    if (chartLocalityInstance) chartLocalityInstance.destroy();
    chartLocalityInstance = new Chart(locCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(locCounts).map(l => l.replace(" & ", "\n")),
        datasets: [{
          label: "Complaints per Locality",
          data: Object.values(locCounts),
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
}

function renderAdminComplaintsTable() {
  const tbody = document.getElementById("admin-complaints-tbody");
  if (!tbody) return;

  const complaints = getStoredComplaints();
  const searchVal = (document.getElementById("admin-complaint-search")?.value || "").toLowerCase();
  const catFilter = document.getElementById("admin-complaint-filter-cat")?.value || "ALL";
  const statusFilter = document.getElementById("admin-complaint-filter-status")?.value || "ALL";
  const locFilter = document.getElementById("admin-complaint-filter-locality")?.value || "ALL";
  const typeFilter = document.getElementById("admin-complaint-filter-type")?.value || "ALL";

  const filtered = complaints.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(searchVal) ||
                        c.citizen.toLowerCase().includes(searchVal) ||
                        (c.locality && c.locality.toLowerCase().includes(searchVal)) ||
                        c.description.toLowerCase().includes(searchVal);
    const matchCat = catFilter === "ALL" || c.category === catFilter;
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchLoc = locFilter === "ALL" || (c.locality || "Ram Mandir Street") === locFilter;

    let matchType = true;
    if (typeFilter === "Direct") matchType = c.submissionType !== "Volunteer-Assisted";
    else if (typeFilter === "Volunteer") matchType = c.submissionType === "Volunteer-Assisted";
    else if (typeFilter === "Duplicate") matchType = !!c.potentialDuplicateOf;

    return matchSearch && matchCat && matchStatus && matchLoc && matchType;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-muted">No grievances found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    let statusClass = "status-pending";
    if (c.status === "Under Review") statusClass = "status-review";
    if (c.status === "In Progress") statusClass = "status-in-progress";
    if (c.status === "Resolved") statusClass = "status-resolved";

    // Photo icon or thumbnail
    let photoCell = '<span class="text-muted font-sm">None</span>';
    if (c.photo) {
      photoCell = `
        <button type="button" class="btn-icon-photo" onclick="openPhotoViewerModal('${c.photo}')" title="View attached photo">
          <i class="fa-solid fa-camera text-teal"></i> Photo
        </button>
      `;
    }

    // Duplicate alert
    let duplicateCell = '<span class="text-muted font-sm">-</span>';
    if (c.potentialDuplicateOf) {
      duplicateCell = `
        <button type="button" class="btn-duplicate-warning" onclick="openDuplicateModal('${c.id}', '${c.potentialDuplicateOf}')" title="Compare with ${c.potentialDuplicateOf}">
          <i class="fa-solid fa-clone text-danger"></i> Duplicate of ${c.potentialDuplicateOf}
        </button>
      `;
    }

    // Rating stars
    let ratingCell = '<span class="text-muted font-sm">-</span>';
    if (c.rating) {
      ratingCell = `<span class="rating-stars-sm text-gold" title="${c.feedbackText || ''}">${"★".repeat(c.rating)}</span>`;
    }

    return `
      <tr id="admin-row-${c.id}">
        <td><strong>${c.id}</strong></td>
        <td>
          <div><strong>${c.citizen}</strong></div>
          <small class="text-muted"><i class="fa-solid fa-map-pin"></i> ${c.locality || 'Rampur'} &bull; ${c.date}</small>
        </td>
        <td><span class="badge badge-category">${c.category}</span></td>
        <td><span class="priority-badge priority-${c.priority.toLowerCase()}">${c.priority}</span></td>
        <td>${photoCell}</td>
        <td><span class="status-indicator-badge ${statusClass}" style="padding: 2px 8px; font-size: 0.78rem;">${c.status}</span></td>
        <td>${duplicateCell}</td>
        <td>${ratingCell}</td>
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
  document.getElementById("admin-select-status").value = c.status || "Submitted";
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

    showToast("Grievance Updated", `${id} marked as "${newStatus}". Live tracking updated!`, "success");

    document.getElementById("admin-status-modal").style.display = "none";
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

// ==========================================================================
// 13. Global Stats Synchronization
// ==========================================================================

function updateHeroStats() {
  const complaints = getStoredComplaints();

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const volunteerCount = complaints.filter(c => c.submissionType === "Volunteer-Assisted").length;

  const elComplaints = document.getElementById("hero-stat-complaints");
  const elResolved = document.getElementById("hero-stat-resolved");
  const elVolunteer = document.getElementById("hero-stat-volunteer");
  const elLocalities = document.getElementById("hero-stat-localities");

  if (elComplaints) elComplaints.textContent = total;
  if (elResolved) elResolved.textContent = resolved;
  if (elVolunteer) elVolunteer.textContent = volunteerCount;
  if (elLocalities) elLocalities.textContent = RAMPUR_LOCALITIES.length;
}

function refreshAllViews() {
  updateHeroStats();
  renderAdminDashboard();
  renderVillageIssuesMap();
  trackComplaintById("GV-2026-001");
}

// ==========================================================================
// 14. Event Listeners & Application Bootstrapping
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize default dataset
  getStoredComplaints();

  // 2. Initialize Speech Recognition
  initializeSpeechRecognition();

  // 3. Navigation Bar Listeners
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const view = link.getAttribute("data-view");
      if (view) {
        e.preventDefault();
        switchView(view);
      }
    });
  });

  const bannerClose = document.getElementById("banner-close");
  if (bannerClose) {
    bannerClose.addEventListener("click", () => {
      const banner = document.querySelector(".top-banner");
      if (banner) banner.style.display = "none";
    });
  }

  // 4. Voice-First Photo File Input Listener
  const voicePhotoInput = document.getElementById("voice-photo-input");
  if (voicePhotoInput) {
    voicePhotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageFile(file, 500, 0.7, (compressedUri) => {
          if (compressedUri) {
            currentVoicePhotoData = compressedUri;
            const preview = document.getElementById("voice-photo-preview");
            const previewWrap = document.getElementById("voice-photo-preview-wrap");
            if (preview && previewWrap) {
              preview.src = compressedUri;
              previewWrap.style.display = "flex";
            }
          }
        });
      }
    });
  }

  // 5. Volunteer Mode Photo Input Listener
  const volPhotoInput = document.getElementById("vol-photo-input");
  if (volPhotoInput) {
    volPhotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageFile(file, 500, 0.7, (compressedUri) => {
          if (compressedUri) {
            currentVolunteerPhotoData = compressedUri;
            const preview = document.getElementById("vol-photo-preview");
            const previewWrap = document.getElementById("vol-photo-preview-wrap");
            if (preview && previewWrap) {
              preview.src = compressedUri;
              previewWrap.style.display = "flex";
            }
          }
        });
      }
    });
  }

  // 6. Fallback Mode Photo Input Listener
  const fallbackPhotoInput = document.getElementById("fallback-photo-input");
  if (fallbackPhotoInput) {
    fallbackPhotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImageFile(file, 500, 0.7, (compressedUri) => {
          if (compressedUri) {
            currentFallbackPhotoData = compressedUri;
            const preview = document.getElementById("fallback-photo-preview");
            const previewWrap = document.getElementById("fallback-photo-preview-wrap");
            if (preview && previewWrap) {
              preview.src = compressedUri;
              previewWrap.style.display = "flex";
            }
          }
        });
      }
    });
  }

  // 7. Form Submissions
  const voiceFirstDesc = document.getElementById("voice-first-desc");
  if (voiceFirstDesc) {
    voiceFirstDesc.addEventListener("input", () => {
      updateVoiceFirstClassification(voiceFirstDesc.value);
    });
  }

  const volForm = document.getElementById("volunteer-submission-form");
  if (volForm) {
    volForm.addEventListener("submit", handleVolunteerComplaintSubmit);
  }

  const textFallbackForm = document.getElementById("text-fallback-form");
  if (textFallbackForm) {
    textFallbackForm.addEventListener("submit", handleFallbackComplaintSubmit);
  }

  // 8. Tracking Form
  const trackingForm = document.getElementById("tracking-search-form");
  if (trackingForm) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("track-id-input");
      if (input) trackComplaintById(input.value);
    });
  }
  setupTrackingQuickSamples();

  // 9. Admin Search & Filters
  const adminSearch = document.getElementById("admin-complaint-search");
  const adminCatFilter = document.getElementById("admin-complaint-filter-cat");
  const adminStatusFilter = document.getElementById("admin-complaint-filter-status");
  const adminLocFilter = document.getElementById("admin-complaint-filter-locality");
  const adminTypeFilter = document.getElementById("admin-complaint-filter-type");

  [adminSearch, adminCatFilter, adminStatusFilter, adminLocFilter, adminTypeFilter].forEach(el => {
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

  // Success Modal Actions
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

  // Demo Resets
  const btnAdminReset = document.getElementById("btn-admin-reset-sample");
  if (btnAdminReset) {
    btnAdminReset.addEventListener("click", () => {
      if (confirm("Reset all grievances and volunteer records back to default Rampur sample data?")) {
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

  // Initial Route Resolution
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && VIEW_IDS.includes(initialHash)) {
    switchView(initialHash);
  } else {
    switchView("home");
  }

  // Load sample on tracking page & update counts
  trackComplaintById("GV-2026-001");
  updateHeroStats();
});
