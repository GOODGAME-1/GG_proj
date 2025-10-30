// 倒计时到 2025-11-01 18:00 UTC
const countdownEl = document.getElementById('countdown');
const target = new Date('2025-11-01T18:00:00Z').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = target - now;
  if (diff <= 0) {
    countdownEl.textContent = "🚀 Presale is Live!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `Presale starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 自动显示年份
document.getElementById('year').textContent = new Date().getFullYear();
