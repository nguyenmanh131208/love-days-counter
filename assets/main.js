// Ngày bắt đầu
const startDay = new Date(2024, 10, 23); // YYYY, MM-1, DD

// Cập nhật đồng hồ đếm ngược
function updateCountDown() {
  const now = new Date();
  const timeRela = now - startDay;

  const days = Math.floor(timeRela / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRela % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRela % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRela / 1000) % 60);

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  daysElement.textContent = days;
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

// Ngày kỷ niệm
const anniversaryDate = new Date(2024, 10, 23); // YYYY, MM-1, DD

// Hàm cập nhật đếm ngược đến ngày kỷ niệm
function updateAnniversaryCountDown() {
  const now = new Date();
  let timeDifference = anniversaryDate - now;

  // Nếu đã đến ngày kỷ niệm, reset lại từ đầu
  if (timeDifference <= 0) {
    anniversaryDate.setFullYear(anniversaryDate.getFullYear() + 1);
    timeDifference = anniversaryDate - now;
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference / 1000) % 60);

  // Cập nhật phần tử HTML
  document.getElementById("anniversary-days").textContent = days;
}

// Gọi hàm cập nhật đồng hồ và ngày kỷ niệm
updateCountDown();
setInterval(updateCountDown, 1000);
updateAnniversaryCountDown();
setInterval(updateAnniversaryCountDown, 1000);

// MENU
function showMenu() {
  const menu = document.querySelector("#playlist-menu");
  menu.style.display = "flex";
}

function closeMenu() {
  const menu = document.querySelector("#playlist-menu");
  menu.style.display = "none";
}

// PLAYLIST
let fetchedMusicData = []; // Biến toàn cục để lưu dữ liệu nhạc
const playlist = document.querySelector(".music-box .music-playlist");
let currentSongIndex = 0; // Biến để theo dõi bài hát hiện tại

fetch("/musicData.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    fetchedMusicData = data; // Lưu dữ liệu nhạc vào biến toàn cục
    for (let i = 0; i < data.length; i++) {
      playlist.innerHTML += `
        <div class="music-song" onclick="playMusic(${i})">
          <div class="song-image"><img class="img" src="${data[i].avatar}"></div>
          <div class="song-name">${data[i].title}</div>
          <div class="song-authors">${data[i].author}</div>
        </div>`;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Hàm phát nhạc và chuyển bài khi hết nhạc
function playMusic(index) {
  currentSongIndex = index;

  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");

  audioSource.src = fetchedMusicData[index].audio;

  audioPlayer.load();
  audioPlayer.play();

  audioPlayer.onended = function () {
    currentSongIndex = (currentSongIndex + 1) % fetchedMusicData.length;
    playMusic(currentSongIndex);
  };
}

// BACKGROUND ANIMATION
const c = document.getElementById("c");
const ctx = c.getContext("2d");

let cw = (c.width = window.innerWidth);
let ch = (c.height = window.innerHeight);

const rad = Math.PI / 180;
let stopped = true;
const howMany = 100;
const Circles = [];
ctx.strokeStyle = "red";
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.globalAlpha = 0.75;

function Circle() {
  this.R = randomIntFromInterval(50, 200);
  this.X = randomIntFromInterval(this.R, cw - this.R);
  this.Y = randomIntFromInterval(this.R, ch - this.R);
  this.iX = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
  this.iY = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);

  this.r = randomIntFromInterval(5, 50);
  this.r1 = randomIntFromInterval(this.R / 2, this.R);

  this.a = ~~(Math.random() * 360) + 1;
  this.x = this.X + this.r1 * Math.cos(this.a * rad);
  this.y = this.Y + this.r1 * Math.sin(this.a * rad);
  this.l = randomIntFromInterval(50, 80);
}

for (let i = 0; i < howMany; i++) {
  Circles.push(new Circle());
}

function Draw() {
  ctx.fillRect(0, 0, cw, ch);

  for (let i = 0; i < Circles.length; i++) {
    const p = Circles[i];
    if (p.X < p.R || p.X > cw - p.R || p.Y < p.R || p.Y > ch - p.R) {
      p.iX *= -1;
      p.iY *= -1;
    }

    p.X += p.iX;
    p.Y += p.iY;
    p.a += 1;
    p.x = p.X + p.r1 * Math.cos(p.a * rad);
    p.y = p.Y + p.r1 * Math.sin(p.a * rad);
    p.gx = p.x + p.r * Math.cos(p.a * rad);
    p.gy = p.y + p.r * Math.sin(p.a * rad);

    ctx.save();
    ctx.fillStyle = Grd(p.gx, p.gy, p.r, p.l);
    heart(p.x, p.y, p.r, p.a);
    ctx.restore();
  }
  requestAnimationFrame(Draw);
}

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

function Grd(x, y, r, l) {
  const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, `hsla(0, 99%, ${l}%, .9)`);
  grd.addColorStop(1, `hsla(0, 99%, ${l}%, 0.1)`);
  return grd;
}

function heart(x, y, r, a) {
  ctx.beginPath();
  const x1 = x + r * Math.cos(a * rad);
  const y1 = y + r * Math.sin(a * rad);
  const cx1 = x + r * Math.cos((a + 22.5) * rad);
  const cy1 = y + r * Math.sin((a + 22.5) * rad);

  const cx2 = x + r * Math.cos((a - 22.5) * rad);
  const cy2 = y + r * Math.sin((a - 22.5) * rad);
  const chord = 2 * r * Math.sin(22.5 * rad / 2);

  ctx.moveTo(x1, y1);
  ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
  ctx.lineTo(x, y);
  ctx.moveTo(x1, y1);
  ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
  ctx.lineTo(x, y);
  ctx.fill();
}

function start() {
  requestAnimationFrame(Draw);
  stopped = false;
}

function stopAnim() {
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  stopped = true;
}

window.addEventListener("load", start, false);
c.addEventListener(
  "click",
  () => {
    stopped ? start() : stopAnim();
  },
  false
);

// prevent
document.addEventListener("keydown", function (event) {
    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J" || event.key === "C")) ||
      (event.ctrlKey && (event.key === "U" || event.key === "u"))
    ) {
      event.preventDefault();
      return false;
    }
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    return false;
  });
  document.addEventListener("selectstart", (event) => {
    event.preventDefault();
    return false;
  });
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
  document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("dragstart", (e) => e.preventDefault());
  });