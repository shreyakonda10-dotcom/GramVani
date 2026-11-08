# GramVani – Smart Rural Community Platform
> *"Your Village, Your Voice, Your Community."*

GramVani is a responsive, mobile-first web application designed for rural community development and civic empowerment.

### 🌟 Core Design Principle: Voice-First & Zero Literacy Barrier
> **"A villager who cannot read or write should still be able to register a complaint with minimal assistance, using their voice."**

The platform combines two major community systems:
1. **Voice-First Rural Grievance Redressal System** — Allowing villagers to report civic issues (water, electricity, roads, sanitation, drainage) using their spoken voice in **Telugu** or **English**, with spoken audio instructions, automatic keyword-based department classification, urgency prioritization, and spoken audio confirmations.
2. **Village Education and Skills Directory** — A voluntary community registry where educated villagers and local craftsmen connect with students and neighbors for mentorship, career guidance, and practical trade services.

---

## 🌾 Project Architecture & Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Structure** | Semantic HTML5 | High-contrast accessible layouts, responsive navigation, screen reader support |
| **Styling** | Modern CSS3 | Rural green and clean white palette (`#1b5e20`, `#2e7d32`, `#4caf50`), giant touch-friendly buttons, animated waveform visualizers |
| **Logic** | Vanilla JavaScript (ES6) | Client-side Single Page Application (SPA) controller, weighted keyword classification heuristic, LocalStorage state management |
| **Voice Input** | Web Speech API (`SpeechRecognition`) | Browser-native speech recognition supporting **Telugu (`te-IN`)** and **English (`en-IN`)** |
| **Voice Output** | Web Speech Synthesis (`SpeechSynthesis`) | Spoken audio instructions, spoken complaint confirmation, and status read-aloud |
| **Audio Feedback** | Web Audio API (`AudioContext`) | Offline harmonic chimes on recording start and stop |
| **Charts** | Chart.js (CDN) | Interactive departmental breakdown, redressal status distribution, qualification & trade analytics |
| **Storage** | Browser LocalStorage | Local persistence of complaints, education profiles, and skills records |

---

## 🎙️ Voice-First Grievance Redressal (Module 1 Redesign)

### 1. Villager Voice Mode (Primary & Default)
- **Zero Typing Required**: Villagers do not have to type their name, village, or description.
- **Giant Microphone Button**: A prominent 135px pulsing button with live concentric ripple waves and animated audio visualizer bars.
- **Spoken Voice Guidance**: Click *"🔊 వినండి / Spoken Instructions"* to hear natural audio instructions in Telugu or English.
- **Bilingual Support**: Instant toggle between **Telugu (`te-IN` - తెలుగు)** and **English (`en-IN`)**.
- **Automatic Classification & Priority**: Speech is analyzed in real time using weighted keyword heuristics to identify civic departments (*Water Supply*, *Electricity*, *Roads*, *Sanitation*, *Drainage*, *Other*) and safety urgency (*High*, *Medium*, *Low*).
- **Anonymous Complaints Allowed**: Citizen name defaults to `Anonymous Villager (గ్రామస్థుడు)` if left blank. An optional field allows giving a name if desired.
- **Default Village with 1-Tap Chips**: Defaults to `Rampur`. Includes 1-tap chips (`[Rampur]`, `[Kalyanpur]`, `[Shivpur]`).
- **Optional Mobile Number**: Only asked if the villager desires SMS or callback updates.
- **Automatic Timestamps**: Date and time are assigned automatically from the system clock.
- **Giant One-Tap Submit**: A large, full-width button `✅ ఫిర్యాదు నమోదు చేయండి / Confirm & Register Grievance`.
- **Spoken Confirmation (Text-to-Speech)**: Once submitted, the system **reads the confirmation and Complaint ID aloud**:
  - *Telugu*: `"మీ ఫిర్యాదు విజయవంతంగా నమోదైంది. మీ ఫిర్యాదు సంఖ్య: GV-2026-006. పంచాయతీ సిబ్బంది దీనిని త్వరలోనే పరిశీలిస్తారు."`
  - *English*: `"Your grievance has been submitted successfully. Your complaint ID is: GV-2026-006. Our local panchayat team will inspect this shortly."`
  - Includes a *"🔊 మళ్లీ వినండి / Listen Again"* button.

### 2. Assisted / Volunteer Mode (For Helpers & Family)
- Designed for family members (sons/daughters), village youth, ASHA workers, or Panchayat volunteers assisting an illiterate elder or neighbor.
- Captures: Volunteer Name, Role/Relationship, Citizen Name (or Anonymous), Village, Contact (optional), Voice or Text complaint description.
- Tags complaints transparently: `Assisted by Volunteer: [Name] ([Role])`.

### 3. Text Entry Fallback Mode
- Accessible keyboard form if a microphone is not connected or speech permissions are blocked.

---

## 🔍 Additional Preserved Modules

### Module 2: Complaint Tracking System
- Search by Complaint ID (e.g., `GV-2026-001`).
- Quick sample buttons (`GV-2026-001` to `GV-2026-005`).
- 4-stage visual progress stepper (*Registered* → *Reviewed* → *In Progress* → *Resolved*).
- **🔊 Spoken Status Read-Aloud**: Click *"🔊 వినండి / Read Aloud"* to have the complaint status and official panchayat note read aloud via Text-to-Speech!

### Module 3: Village Education Directory
- Voluntary registry of educated villagers (10th, Intermediate, Diploma, Degree, B.Tech/Engineering, Postgraduate).
- Mentorship availability indicator for school student guidance.
- **Privacy by Default**: Phone numbers remain hidden unless explicitly authorized.
- 1-click *"Request Guidance"* mentorship workflow with add, edit, and delete controls.

### Module 4: Village Skills Directory
- Directory for local tradesmen (Electricians, Plumbers, Carpenters, Tailors, Mechanics, Farmers, Computer Operators, Teachers, Healthcare Workers).
- Lists practical experience, trade specifics, and working availability.
- *"Request Work"* modal for villagers to send service inquiries.

### Module 5: Panchayat Admin Dashboard
- Real-time KPI stat cards.
- **4 Chart.js Visualizations**: Complaints by Department, Complaints by Status, Education by Qualification, and Skilled Workers by Category.
- **Live Status Updates**: Admins can update a complaint's status (*Pending* → *In Progress* → *Resolved*) and add official notes, immediately updating the public tracking page in real-time.
- 1-click **Reset Default Sample Data** button to restore initial Rampur records anytime.

---

## 📋 Sample Dataset (Village Rampur)

### Sample Complaints
1. **GV-2026-001** — Water Supply — *High Priority* — **In Progress** (Voice submission)
   - *"Main drinking water pipeline near Ram temple has severe leakage for 3 days..."*
2. **GV-2026-002** — Electricity — *High Priority* — **Pending** (Text submission)
   - *"Street light pole #14 near Zilla Parishad school is flickering and sparking in evening rain..."*
3. **GV-2026-003** — Roads — *Medium Priority* — **In Progress** (Voice submission)
   - *"Large potholes on Rampur-Kalyanpur connecting road after heavy rains..."*
4. **GV-2026-004** — Sanitation — *Medium Priority* — **Resolved** (Text submission)
   - *"Garbage collection bin near weekly market has been overflowing for past week..."*
5. **GV-2026-005** — Drainage — *Medium Priority* — **Pending** (Voice submission)
   - *"Clogged open drainage canal near North colony causing wastewater stagnation..."*

### Sample Education Profiles
1. **Ramesh Kumar Varma** — B.Tech / Computer Science — Software Engineer (Private contact)
2. **Ananya Reddy** — Postgraduate / Agriculture — Agri Extension Officer (Public contact)
3. **Suresh Babu** — Degree / Science — High School Maths Teacher (Private contact)
4. **Priya Devi** — Intermediate / Arts — Student & Welfare Guide (Public contact)
5. **Dr. K. Venkat** — Postgraduate / Healthcare — Primary Health Doctor (Private contact)

### Sample Skills Profiles
1. **M. Satyanarayana** — Electrician (12 yrs exp, pump motors & house wiring, Public)
2. **G. Krishna Murthy** — Plumber (8 yrs exp, PVC pipes & tanks, Private)
3. **Lakshmi Bai** — Tailor (10 yrs exp, school uniforms & blouses, Public)
4. **Ravi Teja** — Mechanic (6 yrs exp, motorcycles & tractors, Private)
5. **B. Venkatesh** — Computer Operator (4 yrs exp, MeeSeva & certificates, Public)

---

## 🎤 Internship Demonstration Script (Step-by-Step)

Follow these steps when demonstrating GramVani to examiners or evaluators:

1. **Homepage Overview**:
   - Point out the **giant microphone button on the homepage** and click *"🔊 వినండి / Listen (Voice Guide)"* to demonstrate the spoken Telugu introduction.
2. **Voice-First Complaint Submission (Zero Typing)**:
   - Click the giant mic or go to **Submit Complaint**.
   - Show the 3-step visual instruction banner in Telugu & English.
   - Click the 135px microphone button and speak:
     > *"తాగునీటి పైపులైన్ పగిలిపోయింది నీరు వృధాగా పోతోంది"* (Drinking water pipeline burst and water is wasting)
     > or in English: *"Street light pole near school is sparking and dangerous"*
   - Watch the words transcribe live on screen.
   - Point out that the department (*Water Supply* or *Electricity*) and priority (*High Priority*) were **automatically detected** without the user having to configure anything!
   - Show that **Name, Village, and Mobile are optional/defaulted** (`Anonymous Villager`, `Rampur`).
   - Click the giant green button: **"✅ ఫిర్యాదు నమోదు చేయండి / Confirm & Register"**.
   - **Listen to the browser read the confirmation and Complaint ID aloud**:
     `"మీ ఫిర్యాదు విజయవంతంగా నమోదైంది. మీ ఫిర్యాదు సంఖ్య GV-2026-006..."`
   - Click *"🔊 మళ్లీ వినండి"* to replay the audio.
3. **Track Complaint with Audio Readout**:
   - Click *"Track This Complaint Now"*.
   - View the 4-stage visual progress stepper.
   - Click the **"🔊 వినండి / Read Aloud"** button to hear the status and official update read out loud.
4. **Assisted / Volunteer Mode**:
   - Switch to **Assisted / Volunteer Mode** tab.
   - Show how a family member or Panchayat volunteer can log an issue on behalf of an elder.
5. **Admin Dashboard Synchronization**:
   - Navigate to **Admin Dashboard**.
   - Show the live stat counters and the 4 interactive Chart.js charts.
   - Update the newly logged complaint from *Pending* to *Resolved*, write an official note, and save.
   - Go back to **Track Complaint** and confirm the change is live immediately!
6. **Education & Skills Directories**:
   - Filter by *Willing to Guide Students* or trade category (*Electrician*).
   - Demonstrate the default contact privacy protection and the *"Request Work"* inquiry modal.

---

## 💻 How to Run Locally

You can run GramVani directly in two ways:

### Option A: Direct Browser Launch
Simply double-click `index.html` to open it in **Google Chrome**, **Microsoft Edge**, or an Android browser.

### Option B: Local Web Server (Recommended for Persistent Mic Access)
Double-click `start-server.bat` or run:
```bash
# Using Node.js:
npx serve .
# Or using Python:
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---
*Developed for Rural Internship Project Demonstration &bull; GramVani Prototype 2026*
