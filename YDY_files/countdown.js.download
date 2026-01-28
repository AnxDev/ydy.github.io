
const lpDate = new Date("Feb 14, 2026 00:00:00").getTime();

const lpCountdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = lpDate - now;

  // Time calculations
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result
  document.getElementById("days").innerText = d.toString().padStart(2, '0') + ":";
  document.getElementById("hours").innerText = h.toString().padStart(2, '0') + ":";
  document.getElementById("minutes").innerText = m.toString().padStart(2, '0') + ":";
  document.getElementById("seconds").innerText = s.toString().padStart(2, '0') ;

  // If countdown is finished
  if (distance < 0) {
    clearInterval(updateCountdown);
    document.querySelector(".countdown-container").innerHTML = "AVAILABLE NOW";
  }
}, 1000);