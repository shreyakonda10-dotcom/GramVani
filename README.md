# GramVani – Voice-First Rural Grievance Redressal & Community Support Platform
> *"Your Village, Your Voice, Your Community."*

GramVani is a voice-first, mobile-responsive civic web application designed for rural community development and transparent grievance redressal in Indian villages.

---

### 🌟 Core Design Principle: Voice-First & Zero Literacy Barrier
> **"A villager who cannot read or write should still be able to register a civic complaint with minimal assistance, using their natural voice."**

Rural citizens often face severe friction when reporting drinking water leakage, broken street lights, dangerous potholes, or clogged drainage due to literacy barriers, complex English forms, or lack of direct administrative access. 

**GramVani transforms rural grievance redressal into a voice-first experience**:
- **Multilingual Spoken Input**: Villagers speak naturally in **Telugu (`te-IN` - తెలుగు)**, **Hindi (`hi-IN` - हिन्दी)**, or **English (`en-IN`)**.
- **Zero Typing Required**: Name is optional (defaults to Anonymous Villager), village is defaulted, mobile number is optional.
- **Automated Intelligence**: Smart keyword heuristics automatically categorize civic departments and urgency priority without requiring confusing dropdowns.
- **Audio Feedback & Readout**: Web Speech Synthesis reads instructions aloud, verifies spoken input, reads confirmation and Complaint IDs aloud, and provides spoken status updates.
- **Photo Evidence Attachment**: Citizens and volunteers can attach photos (compressed client-side via HTML5 canvas to prevent LocalStorage bloat).
- **Village Volunteer Assistance**: Educated youth, ASHA workers, and Panchayat volunteers can file verified complaints on behalf of illiterate neighbors or elders.
- **Duplicate Complaint Detection**: Transparent heuristic algorithms alert administrators when duplicate complaints are filed for the same locality and issue.
- **Village Issues Map**: An interactive geographic breakdown of Rampur's 6 localities showcasing active issues and category distribution.
- **4-Stage Progress Stepper & Resolution Ratings**: Track status (*Submitted* &rarr; *Under Review* &rarr; *In Progress* &rarr; *Resolved*) with 1–5 star citizen satisfaction ratings.

---

## 🌾 Technology Stack & Architecture

| Layer | Technology | Key Details |
|---|---|---|
| **Structure** | Semantic HTML5 | Accessible, high-contrast, screen-reader friendly markup |
| **Styling** | Modern CSS3 | Rural green and clean white palette (`#1b5e20`, `#2e7d32`, `#4caf50`), touch-friendly 48px+ targets, animated audio waveform bars |
| **Logic** | Vanilla JavaScript (ES6) | Client-side Single Page Application (SPA), zero external paid APIs, 100% offline-ready |
| **Speech Recognition** | Browser Web Speech API (`SpeechRecognition`) | Native voice transcription supporting **Telugu (`te-IN`)**, **Hindi (`hi-IN`)**, and **English (`en-IN`)** |
| **Speech Synthesis** | Web Speech API (`SpeechSynthesis`) | Measured spoken voice guidance, ID read-aloud, and status updates |
| **Audio Feedback** | Web Audio API (`AudioContext`) | Offline harmonic chimes on recording start and stop |
| **Photo Compression** | HTML5 Canvas API | In-memory downscaling (max 500px, 0.7 JPEG) to store images in ~25–35KB without exceeding browser quotas |
| **Analytics Visuals** | Chart.js (CDN) | Real-time charts for departmental breakdown, 4-stage statuses, and locality heatmaps |
| **Storage** | Browser LocalStorage | Local persistence of complaints, photos, volunteer records, and resolution ratings |

---

## 🧭 Site Navigation & Modules

GramVani features 7 streamlined, grievance-dedicated navigation views:

1. **Home (`#home`)**: Hero section with giant microphone button, spoken voice guide, live grievance statistics, and 5 citizen accessibility shortcut cards.
2. **Submit Complaint (`#complaint`)**: Voice-first submission center with giant 135px microphone, language selector (Telugu, Hindi, English), photo attachment, and manual fallback mode.
3. **Volunteer Help (`#volunteer`)**: Dedicated assisted-submission mode for village youth and ASHA workers to file complaints for elders.
4. **Track Complaint (`#track`)**: Live tracking with 4-stage stepper (*Submitted* &rarr; *Under Review* &rarr; *In Progress* &rarr; *Resolved*), voice search of Complaint ID, spoken audio updates, photo evidence display, and citizen satisfaction ratings (1–5 stars).
5. **Village Issues Map (`#map`)**: Interactive map cards for Rampur's 6 localities with active issue counts, category chips, and click-to-filter locality tables.
6. **Admin Dashboard (`#admin`)**: Panchayat administrative monitoring with 7 live KPI stat cards, 3 Chart.js graphs, duplicate comparison modal, photo inspection modal, and status update workflows.
7. **About (`#about`)**: Transparent technical architecture, privacy disclosures, and prototype reset controls.

---

## 🗺️ Village Rampur Localities

The prototype is pre-configured with 6 realistic localities in model village **Rampur**:
1. **Ram Mandir Street** (రామాలయం వీధి) — High-density central village area.
2. **Zilla Parishad School Area** (పాఠశాల ప్రాంతం) — Educational zone with high foot traffic.
3. **North Colony** (ఉత్తర కాలనీ) — Residential community with open drainage channels.
4. **Weekly Market / Rythu Bazaar** (సంత ప్రాంతం) — Commercial trading hub with high waste generation.
5. **South Bypass & Bus Stand** (బస్ స్టాండ్) — Connecting highway junction with heavy vehicle traffic.
6. **Gram Panchayat & Water Tank Center** (పంచాయతీ కేంద్రం) — Administrative core and municipal water overhead tank.

---

## 📋 Pre-Populated Demonstration Dataset

GramVani includes pre-configured sample complaints to showcase every feature during evaluations:

| ID | Locality | Department | Priority | Status | Method / Submitter | Special Highlight |
|---|---|---|---|---|---|---|
| **GV-2026-001** | Ram Mandir Street | Water Supply | High | In Progress | Voice (Ramu Yadav) | Includes attached photo evidence of pipe leak |
| **GV-2026-002** | School Area | Electricity | High | Under Review | Voice (Venkatamma G.) | Sparking streetlight pole hazard |
| **GV-2026-003** | South Bypass | Roads | Medium | In Progress | Volunteer (Kalyan Kumar) | Assisted on behalf of elderly resident Lachamma |
| **GV-2026-004** | Weekly Market | Sanitation | Medium | **Resolved** | Text Fallback (Babu Lal) | **5-Star Citizen Rating** & feedback comment |
| **GV-2026-005** | North Colony | Drainage | Medium | Submitted | Volunteer (ASHA Worker Ananya) | Clogged drainage report |
| **GV-2026-006** | Ram Mandir Street | Water Supply | High | Under Review | Voice (Suresh Kumar) | **⚠️ Flagged as Potential Duplicate of GV-2026-001** |

---

## 🎤 Internship Evaluation Walkthrough Script

Follow these steps to demonstrate the prototype to evaluators or professors:

### Step 1: Voice-First Homepage Experience
1. Open the homepage.
2. Click **"🔊 వినండి / Spoken Voice Guide"** to hear the measured audio greeting in Telugu.
3. Show the **Hero Stats Bar** (Complaints Logged, Issues Resolved, Volunteer Assisted, Localities Covered).
4. Tap the **Giant Central Microphone Button** (`నొక్కండి - మాట్లాడండి`) on the homepage; notice how it navigates directly to the complaint page and activates the microphone.

### Step 2: One-Tap Voice Submission
1. Select language: **Telugu (`తెలుగు`)**, **Hindi (`हिन्दी`)**, or **English**.
2. Tap the giant pulsing microphone button.
3. Speak naturally:
   - *In Telugu*: `"తాగునీటి పైపులైన్ పగిలిపోయింది రోడ్డుపై నీరు కారుతోంది"`
   - *Or in English*: `"Street light pole is sparking and dangerous near school"`
4. Watch the words transcribe live on screen.
5. Highlight the **Automatic Classification Banner**:
   - The department is automatically tagged as **Water Supply** (or **Electricity**).
   - Priority is automatically tagged as **High** based on safety keywords.
6. Point out that **Name and Phone are optional** (`Anonymous Villager`, `Rampur`).
7. (Optional) Click **Select / Capture Photo** to demonstrate client-side canvas compression.
8. Click **"✅ ఫిర్యాదు నమోదు చేయండి / Confirm & Register Grievance"**.
9. **Hear the browser read the confirmation and new Complaint ID aloud** in your chosen language!
10. Click **"🔊 మళ్లీ వినండి"** to demonstrate accessibility for non-readers.

### Step 3: 4-Stage Complaint Tracking & Audio Updates
1. Click **"Track This Complaint Now"** from the confirmation modal (or navigate to *Track Complaint*).
2. Enter or click any sample ID:
   - Click `GV-2026-001`: Inspect the 4-stage stepper (*Submitted* &rarr; *Under Review* &rarr; *In Progress* &rarr; *Resolved*) showing 75% progress.
   - Inspect the **Attached Photo Evidence** showing the pipeline leak.
   - Click the photo to view it enlarged in the modal viewer.
   - Click **"🔊 వినండి / Read Aloud"** to have the current status and official panchayat inspection note read aloud via Text-to-Speech!
3. Demonstrate **Voice Search**:
   - Click **"🎤 Voice Search"** next to the search input.
   - Speak `"004"` or `"GV 2026 004"`.
   - The system automatically formats the ID and triggers tracking!

### Step 4: Citizen Resolution Feedback System
1. Track complaint `GV-2026-004` (Sanitation - Resolved).
2. Point out that because the issue is **Resolved (100%)**, the **Citizen Resolution Feedback** section is active.
3. Show the submitted 5-star rating: `★★★★★` and the citizen's review comment.
4. Mention that unresolved complaints do not show feedback until work is completed, preventing fake reviews.

### Step 5: Village Issues Map (Locality Heatmap)
1. Navigate to **Village Issues Map**.
2. Show the visual grid of Rampur's 6 localities with active issue counts, category chips, and priority alerts.
3. Click on **"Ram Mandir Street"**:
   - The card highlights in green with a selected border.
   - The table below instantly filters to show grievances specifically logged in Ram Mandir Street.
4. Click **"View All Localities"** to reset the filter.

### Step 6: Dedicated Village Volunteer Assistance Mode
1. Navigate to **Volunteer Help**.
2. Show how an educated youth volunteer, ASHA worker, or family member can log a grievance on behalf of an illiterate neighbor.
3. Note how the complaint records the volunteer's name and role while keeping citizen details private or anonymous.

### Step 7: Panchayat Admin Dashboard & Duplicate Detection
1. Navigate to **Admin Dashboard**.
2. Show the **7 Live KPI Summary Cards** including:
   - Total Complaints
   - Pending / Under Review
   - In Progress
   - Resolved Issues
   - Volunteer-Assisted Reports
   - **Duplicate Alerts**
   - **Average Citizen Satisfaction Rating (`★ 5.0`)**
3. Review the **3 Chart.js Visualizations**:
   - Complaints by Department (Doughnut)
   - Complaints by 4-Stage Status (Pie)
   - Complaints by Locality (Horizontal Bar)
4. Show the **Duplicate Warning**:
   - Point to `GV-2026-006` with the red badge: `⚠️ Duplicate of GV-2026-001`.
   - Click the badge to open the **Duplicate Grievance Comparison Modal**, displaying both complaints side-by-side (showing matching locality, category, and pipeline leakage keywords).
5. Demonstrate **Status Update**:
   - Click **Update** on any complaint.
   - Change status to *Resolved*, write an official remark: `"Repairs completed by lineman."`, and click Save.
   - Return to the public tracking page and show that the status, stepper, and spoken audio update immediately!

---

## 🔒 Offline & Privacy Integrity

- **Zero External Paid API Keys**: Uses standard W3C browser APIs (`webkitSpeechRecognition`, `speechSynthesis`, `AudioContext`, `HTMLCanvasElement`).
- **Privacy First**: Villagers can remain completely anonymous. Contact numbers are optional.
- **LocalStorage Data Safety**: Photos are compressed client-side to ~25–35KB before storage, ensuring the entire prototype operates smoothly without hitting browser storage quotas.

---

&copy; 2026 GramVani Prototype. Built for Rural Civic Empowerment & Internship Demonstration.
