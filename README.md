# Maseer | مسير

**Maseer** is a web-based project designed to introduce users to traditional Saudi handicrafts. It combines an interactive map, craft information pages, and a craft discovery quiz to make exploring Saudi cultural heritage engaging and accessible.

## Project Information

- **University:** King Saud University
- **Course:** IT320 – Practical Software Engineering
- **Project stage:** Phase 3 – Sprint 1
- **Team:** Group 4 (five members)

## Main Features

- **Interactive heritage map:** Explore traditional crafts by location in Saudi Arabia.
- **Craft browsing:** Browse, search, and filter crafts by region.
- **Craft details:** Read information about individual crafts.
- **Craft discovery quiz:** Answer questions to discover a matching craft and view recommendations/results.
- **Login and registration interfaces:** Frontend forms with client-side validation.
- **Administrator quiz management:** Interface to add, edit, and delete quiz questions.
- **Demo logout:** Frontend-only user and administrator session-state handling, where implemented.

## Technologies

- HTML5, CSS3, JavaScript
- Local JavaScript data for the Sprint 1 prototype
- Browser `sessionStorage` for demonstration-only login/logout state
- NoSQL/MongoDB-style collections and documents as a **data design proposal**, not a live database connection

## System Design

The report describes a **three-tier logical architecture**:

1. **Presentation layer:** Website pages and user interfaces.
2. **Application logic layer:** JavaScript-based interactions, validation, navigation, and quiz functionality.
3. **Data layer (design):** Proposed NoSQL data organization. In Sprint 1, the running website uses local JavaScript data instead of a connected database.

The project documentation also includes a class diagram, component design, data design, and interface design/user flows.

## How to Run

1. Clone or download the repository.
2. Open the website project folder in Visual Studio Code.
3. Start a local development server (for example, the **Live Server** extension).
4. Open `index.html` in your browser.
5. Use the navigation menu to explore crafts, the map, the quiz, and the authentication interfaces.

> **Sprint 1 limitation:** Login and administrator routing are frontend demonstrations. They do not verify passwords against a backend, create real accounts, or enforce secure administrator permissions. A production deployment would require server-side authentication and authorization.

## Selected Project Files

```text
Maseer/
├── index.html           # Homepage and interactive map
├── crafts.html          # Craft browsing
├── craft.html           # Craft details
├── quiz.html            # Craft discovery quiz
├── admin-quiz.html      # Quiz-question management interface
├── login.html           # Login page
├── register.html        # Registration page
├── auth.js              # Frontend authentication demo and validation
├── admin-auth.js        # Administrator session demo
├── site.js              # Shared navigation and craft-page interactions
├── data.js              # Local craft data
├── site.css             # Main website styling
├── style.css            # Authentication page styling
├── README.md            # Project documentation
└── AUTHORS              # Team members and contributions
```

Additional JavaScript, CSS, and image assets support the quiz, administrator pages, and visual design.

## Team Contributions

The five members' assigned Sprint 1 responsibilities are listed in [AUTHORS](AUTHORS).
