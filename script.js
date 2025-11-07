// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 自动更新年份
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // 初始化所有组件
  //initCountdown();
  initPresaleCountdown();
  initParticles();
  initScrollAnimations();
  initCopyButton();
  initCommunityStats();
  initMobileMenu();
 // initGGMoments();
});

// 主倒计时
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  //const target = new Date('2025-12-01T01:30:00Z').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = target - now;
    
    if (diff <= 0) {
      countdownEl.textContent = "🚀 Presale is Live!";
      countdownEl.style.color = "#00ffaa";
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownEl.innerHTML = `
      <div class="countdown-item">
        <span>${days}</span>
        <label>Days</label>
      </div>
      <div class="countdown-item">
        <span>${hours}</span>
        <label>Hours</label>
      </div>
      <div class="countdown-item">
        <span>${minutes}</span>
        <label>Minutes</label>
      </div>
      <div class="countdown-item">
        <span>${seconds}</span>
        <label>Seconds</label>
      </div>
    `;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// 预售倒计时功能
function initPresaleCountdown() {
  const presaleCountdown = document.getElementById('presaleCountdown');
  const presaleProgress = document.getElementById('presaleProgress');
  const raisedAmount = document.getElementById('raisedAmount');
  
  // 模拟预售数据
  let raised = 45; // 已筹集BNB数量
  const hardCap = 200; // 硬顶
  
  // 更新进度条
  if (presaleProgress && raisedAmount) {
    const progress = (raised / hardCap) * 100;
    presaleProgress.style.width = `${progress}%`;
    raisedAmount.textContent = raised;
  }
  
  // 预售倒计时
  if (presaleCountdown) {
    const target = new Date('2024-02-01T18:00:00Z').getTime();
    
    function updatePresaleCountdown() {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        presaleCountdown.textContent = "🚀 Presale Live!";
        presaleCountdown.style.color = "#00ffaa";
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      presaleCountdown.innerHTML = `
        <div class="countdown-large-item">
          <div>${days}</div>
          <span>Days</span>
        </div>
        <div class="countdown-large-item">
          <div>${hours}</div>
          <span>Hours</span>
        </div>
        <div class="countdown-large-item">
          <div>${minutes}</div>
          <span>Mins</span>
        </div>
        <div class="countdown-large-item">
          <div>${seconds}</div>
          <span>Secs</span>
        </div>
      `;
    }
    
    setInterval(updatePresaleCountdown, 1000);
    updatePresaleCountdown();
  }
}

// 背景粒子动画
function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  
  // 设置canvas尺寸
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasSize();
  
  // 粒子数组
  let particles = [];
  const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
  
  // 创建粒子
  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  createParticles();
  
  // 绘制粒子
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 191, 255, ${p.alpha})`;
      ctx.fill();
      
      // 更新位置
      p.x += p.dx;
      p.y += p.dy;
      
      // 边界检查
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    
    // 绘制连接线
    drawConnections();
  }
  
  // 绘制粒子之间的连接线
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  // 动画循环
  function animate() {
    drawParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // 窗口调整大小时重置canvas和粒子
  window.addEventListener('resize', () => {
    setCanvasSize();
    createParticles();
  });
}

// 滚动动画
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

// 复制合约地址
function initCopyButton() {
  const copyBtn = document.getElementById('copyBtn');
  const contractCode = document.getElementById('contractCode');
  const toast = document.getElementById('copyToast');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = contractCode.textContent;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        // 显示成功提示
        toast.classList.add('show');
        
        // 3秒后隐藏提示
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }
}

// 社区统计数字动画
function initCommunityStats() {
  const holderCount = document.getElementById('holderCount');
  const marketCap = document.getElementById('marketCap');
  const communitySize = document.getElementById('communitySize');
  
  // 模拟数据 - 在实际应用中应从API获取
  const stats = {
    holders: 1250,
    marketCap: 125000,
    community: 5800
  };
  
  // 数字动画函数
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // 使用缓动函数使动画更自然
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeOutQuart * (end - start) + start);
      
      if (element === marketCap) {
        element.textContent = `$${value.toLocaleString()}`;
      } else {
        element.textContent = value.toLocaleString();
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // 当统计元素进入视口时触发动画
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(holderCount, 0, stats.holders, 2000);
        animateValue(marketCap, 0, stats.marketCap, 2000);
        animateValue(communitySize, 0, stats.community, 2000);
        
        // 停止观察，避免重复动画
        statsObserver.unobserve(entry.target);
      }
    });
  });
  
  // 观察社区版块
  const communitySection = document.getElementById('community');
  if (communitySection) {
    statsObserver.observe(communitySection);
  }
}

// 移动端菜单
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.querySelector('header nav');
  
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      headerNav.style.display = headerNav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // 点击导航链接后关闭菜单（移动端）
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          headerNav.style.display = 'none';
        }
      });
    });
    
    // 窗口调整大小时重置导航显示
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        headerNav.style.display = 'flex';
      } else {
        headerNav.style.display = 'none';
      }
    });
  }
}


  // 工具函数
  function getGameIcon(gameType) {
    const icons = {
      'MOBA': 'fas fa-users',
      'FPS': 'fas fa-crosshairs',
      'Battle Royale': 'fas fa-trophy',
      'RPG': 'fas fa-dragon',
      'Sports': 'fas fa-running',
      'Racing': 'fas fa-flag-checkered',
      'Strategy': 'fas fa-chess',
      'Other': 'fas fa-gamepad'
    };
    return icons[gameType] || 'fas fa-gamepad';
  }

  function getBadgeClass(ggType) {
    const classes = {
      'Good Game': 'good-game',
      'Great Going': 'great-going',
      'Game\'s Gift': 'games-gift'
    };
    return classes[ggType] || 'good-game';
  }

// 增强的提示功能
function showToast(message, type = 'success') {
  let toast = document.getElementById('dynamicToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dynamicToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // 设置样式基于类型
  if (type === 'error') {
    toast.style.background = 'var(--danger)';
  } else if (type === 'warning') {
    toast.style.background = 'var(--warning)';
    toast.style.color = 'var(--darker)';
  } else {
    toast.style.background = 'var(--success)';
    toast.style.color = 'var(--darker)';
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
  // 为所有按钮添加点击效果
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // 为导航链接添加活动状态
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  
  function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  
  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// 错误处理
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
});

// 性能监控
if ('performance' in window) {
  window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  });
}