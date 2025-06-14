# 💖 Love Days Counter 💖

A beautiful and interactive web application to celebrate your love story by counting the days you've been together and enjoying your favorite songs.

<p align="center">
  <a href="https://love-day-counter.netlify.app">
    <img src="https://img.shields.io/badge/Live_Demo-FF69B4?style=for-the-badge&logo=Vercel&logoColor=white" alt="Live Demo"/>
  </a>
</p>

---

## ✨ Features

This project is more than just a counter. It's a digital keepsake with a variety of features:

-   **Live Countdown:** Tracks your time together down to the second from a specific start date.
-   **Anniversary Tracker:** Automatically calculates and counts down the days to your next anniversary.
-   **Integrated Music Player:**
    -   Features a collapsible playlist menu.
    -   Plays a list of your favorite songs, loaded dynamically from a `musicData.json` file.
    -   Automatically plays the next song when the current one ends.
-   **Dynamic Background:** A beautiful, animated background with floating hearts created using the HTML5 Canvas API.
-   **Responsive Design:** A fully responsive layout that looks great on both desktop and mobile devices.
-   **Personalization:** Easily customize names, profile pictures, the start date, and the entire music playlist.

---

## 🛠️ Tech Stack

This project was built using fundamental web technologies, focusing on a pure vanilla JavaScript implementation.

-   **HTML5:** For the core structure and content.
-   **CSS3:** For styling, animations (`@keyframes`), and responsive design (Flexbox, Media Queries).
-   **JavaScript (ES6):** For all the interactive logic, including the countdown timers, music player, and DOM manipulation.
-   **Canvas API:** To create the dynamic and interactive heart animations in the background.
-   **JSON:** To manage and load the music playlist data.

---

## 🚀 Getting Started

To run this project locally, follow these simple steps:

1.  **Clone the repository:**
    ```
    git clone https://github.com/your-username/love-days-counter.git
    ```
2.  **Navigate to the project directory:**
    ```
    cd love-days-counter
    ```
3.  **Open `index.html` in your browser.**
    -   For the best experience (especially for the music player to fetch the JSON file), it's recommended to use a live server extension in your code editor (like "Live Server" for VS Code).

---

## 🎨 Customization

Making this project your own is easy!

### 1. Change the Start Date

-   Open the `assets/main.js` file.
-   Find the line: `const startDay = new Date(2024, 10, 23);`.
-   Change the values `(YYYY, MM-1, DD)` to your special date. **Note:** The month is zero-indexed (0 = January, 1 = February, ..., 11 = December).

### 2. Change Names & Photos

-   Open the `index.html` file.
-   To change the names, find the `<span class="name">` tags and edit the text inside.
-   To change the photos, replace the file paths in the `<img>` tags for `main-box__male` and `main-box__female`.

### 3. Customize the Playlist

-   **Add Audio Files:** Place your `.mp3` files into the `/audio/` directory.
-   **Update Data:** Open the `musicData.json` file.
-   Add new song objects to the array, following the existing format:
    ```json
    {
      "audio": "/audio/your-song-name.mp3",
      "avatar": "link-to-song-or-artist-image.jpg",
      "title": "Your Song Title",
      "author": "Artist Name"
    }
    ```
- The file `COPY-PASTE.TXT` also contains a template for a new song entry.