// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 自动更新年份
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // 初始化所有组件
  initCountdown();
  initPresaleCountdown();
  initParticles();
  initScrollAnimations();
  initCopyButton();
  initCommunityStats();
  initMobileMenu();
  initGGMoments();
});

// 主倒计时
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  const target = new Date('2025-12-01T01:30:00Z').getTime();

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

// GG Moments 功能
function initGGMoments() {
  const momentForm = document.getElementById('momentForm');
  const momentsGrid = document.getElementById('momentsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const charCount = document.getElementById('charCount');
  const momentStory = document.getElementById('momentStory');
  const submitBtn = document.getElementById('submitBtn');
  
  let currentFilter = 'all';
  let displayedMoments = 2;
  const momentsPerLoad = 4;

  // 示例数据
  const sampleMoments = [
    {
      id: 1,
      playerName: "ValleyGuardian",
      title: "Let enemy surrender after pentakill",
      story: "After getting pentakill in League, I didn't taunt but told opponents 'GG, you played well'. They responded 'True esports spirit, GG'",
      gameType: "MOBA",
      ggType: "Good Game",
      likes: 128,
      comments: 23,
      timestamp: "2024-01-15"
    },
    {
      id: 2,
      playerName: "FairPlayer",
      title: "Gave reconnection chance after DC",
      story: "Opponent's internet disconnected, I had chance to win easily. But I paused and waited for reconnection. After match he thanked me for showing 'true GG spirit'",
      gameType: "MOBA",
      ggType: "Game's Gift",
      likes: 89,
      comments: 15,
      timestamp: "2024-01-14"
    },
    {
      id: 3,
      playerName: "SniperElite",
      title: "Impossible no-scope across map",
      story: "Final circle in Warzone, 1v1 situation. Hit a crazy no-scope from 300m to win the game. Even the opponent said 'deserved win GG'",
      gameType: "FPS",
      ggType: "Great Going",
      likes: 156,
      comments: 23,
      timestamp: "2024-01-13"
    },
    {
      id: 4,
      playerName: "RacingPro",
      title: "Clean overtake in final lap",
      story: "In a tight Gran Turismo race, made a clean overtake in the final corner without any contact. Respectful racing at its best!",
      gameType: "Racing",
      ggType: "Good Game",
      likes: 42,
      comments: 7,
      timestamp: "2024-01-12"
    }
  ];

  // 字符计数
  if (momentStory && charCount) {
    momentStory.addEventListener('input', function() {
      charCount.textContent = this.value.length;
      
      if (this.value.length > 450) {
        charCount.style.color = 'var(--warning)';
      } else {
        charCount.style.color = 'var(--gray)';
      }
    });
  }

  // 表单提交
  if (momentForm) {
    momentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      const formData = {
        playerName: document.getElementById('playerName').value,
        playerEmail: document.getElementById('playerEmail').value || 'Not provided',
        title: document.getElementById('momentTitle').value,
        story: document.getElementById('momentStory').value,
        gameType: document.getElementById('gameType').value,
        ggType: document.querySelector('input[name="ggType"]:checked').value,
        timestamp: new Date().toLocaleString()
      };
      
      // 显示加载状态
      setButtonLoading(true);
      
      try {
        // 模拟发送到后端
        setTimeout(() => {
          submitMoment(formData);
          setButtonSuccess();
          
          // 重置表单
          setTimeout(() => {
            momentForm.reset();
            charCount.textContent = '0';
            setButtonNormal();
          }, 2000);
        }, 1500);
        
      } catch (error) {
        console.error('Failed to submit:', error);
        showToast('Failed to submit your GG moment. Please try again.', 'error');
        setButtonNormal();
      }
    });
  }

  // 表单验证
  function validateForm() {
    const requiredFields = [
      'playerName',
      'momentTitle', 
      'momentStory',
      'gameType'
    ];
    
    for (let field of requiredFields) {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        showToast(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
        element.focus();
        return false;
      }
    }
    
    if (!document.getElementById('emailConsent').checked) {
      showToast('Please agree to share your GG moment', 'error');
      return false;
    }
    
    return true;
  }

  // 提交时刻
  function submitMoment(data) {
    const newMoment = {
      id: Date.now(),
      playerName: data.playerName,
      title: data.title,
      story: data.story,
      gameType: data.gameType,
      ggType: data.ggType,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString().split('T')[0]
    };
    
    // 添加到示例数据开头
    sampleMoments.unshift(newMoment);
    
    // 重新渲染时刻
    renderMoments();
    
    // 重置显示数量
    displayedMoments = 2;
  }

  // 按钮状态控制
  function setButtonLoading(isLoading) {
    if (isLoading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sharing...';
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  function setButtonSuccess() {
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Successfully Shared!';
    showToast('Your GG moment has been shared! 🎮', 'success');
  }

  function setButtonNormal() {
    submitBtn.classList.remove('loading', 'success');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-share"></i> Share Your Moment';
  }

  // 过滤按钮事件
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新活动按钮
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新当前过滤器
      currentFilter = this.dataset.filter;
      
      // 重新渲染时刻
      renderMoments();
    });
  });

  // 加载更多
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      displayedMoments += momentsPerLoad;
      renderMoments();
    });
  }

  // 渲染时刻
  function renderMoments() {
    if (!momentsGrid) return;
    
    // 过滤时刻
    let filteredMoments = sampleMoments;
    if (currentFilter !== 'all') {
      filteredMoments = sampleMoments.filter(moment => moment.ggType === currentFilter);
    }
    
    // 清空网格
    momentsGrid.innerHTML = '';
    
    // 显示的时刻数量
    const momentsToShow = filteredMoments.slice(0, displayedMoments);
    
    if (momentsToShow.length === 0) {
      momentsGrid.innerHTML = `
        <div class="moments-empty">
          <i class="fas fa-gamepad"></i>
          <h3>No GG Moments Yet</h3>
          <p>Be the first to share your gaming story!</p>
        </div>
      `;
      return;
    }
    
    // 渲染时刻卡片
    momentsToShow.forEach(moment => {
      const momentCard = createMomentCard(moment);
      momentsGrid.appendChild(momentCard);
    });
    
    // 更新加载更多按钮状态
    if (loadMoreBtn) {
      if (displayedMoments >= filteredMoments.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
      }
    }
  }

  // 创建时刻卡片
  function createMomentCard(moment) {
    const card = document.createElement('div');
    card.className = 'moment-card';
    card.dataset.ggType = moment.ggType.replace(/'/g, '');
    
    // 获取对应的图标
    const gameIcon = getGameIcon(moment.gameType);
    const badgeClass = getBadgeClass(moment.ggType);
    
    card.innerHTML = `
      <div class="moment-header">
        <div class="player-avatar">
          <i class="${gameIcon}"></i>
        </div>
        <div class="moment-meta">
          <h4>${moment.title}</h4>
          <span class="player-name">@${moment.playerName}</span>
        </div>
        <span class="gg-badge ${badgeClass}">${moment.ggType}</span>
      </div>
      <div class="moment-content">
        <p>${moment.story}</p>
      </div>
      <div class="moment-footer">
        <div class="game-tag">${moment.gameType}</div>
        <div class="moment-actions">
          <button class="action-btn like-btn" data-moment-id="${moment.id}">
            <i class="far fa-heart"></i> <span>${moment.likes}</span>
          </button>
          <button class="action-btn share-btn" data-moment-id="${moment.id}">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    `;
    
    // 添加点赞功能
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
      handleLike(moment.id, this);
    });
    
    // 添加分享功能
    const shareBtn = card.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
      shareMoment(moment);
    });
    
    return card;
  }

  // 处理点赞
  function handleLike(momentId, button) {
    const moment = sampleMoments.find(m => m.id === momentId);
    if (!moment) return;
    
    const heartIcon = button.querySelector('i');
    const likeCount = button.querySelector('span');
    
    if (button.classList.contains('liked')) {
      // 取消点赞
      moment.likes--;
      button.classList.remove('liked');
      heartIcon.className = 'far fa-heart';
    } else {
      // 点赞
      moment.likes++;
      button.classList.add('liked');
      heartIcon.className = 'fas fa-heart';
    }
    
    likeCount.textContent = moment.likes;
  }

  // 分享时刻功能
  function shareMoment(moment) {
    const shareText = `Check out this GG moment: "${moment.title}" - ${moment.story.substring(0, 100)}... #GGCoin #GoodGame`;
    const shareUrl = `https://x.com/gege749258?s=11`;
    
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal';
    shareModal.innerHTML = `
      <div class="share-content">
        <h3>Share this GG Moment</h3>
        <p>${shareText}</p>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}" 
             class="btn btn-twitter" target="_blank">
            <i class="fab fa-twitter"></i> Share on Twitter
          </a>
          <button class="btn btn-secondary copy-share">Copy Text</button>
          <button class="btn btn-outline close-share">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // 添加分享模态框样式
    const style = document.createElement('style');
    style.textContent = `
      .share-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .share-content {
        background: var(--darker);
        padding: 30px;
        border-radius: 15px;
        border: 2px solid var(--primary);
        max-width: 500px;
        width: 90%;
      }
      .share-content h3 {
        color: var(--primary);
        margin-bottom: 15px;
      }
      .share-content p {
        color: var(--gray);
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
      }
      .share-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .btn-twitter {
        background: #1DA1F2;
        color: white;
      }
      .copy-share {
        margin: 10px 0;
      }
    `;
    document.head.appendChild(style);
    
    // 事件监听
    shareModal.querySelector('.copy-share').addEventListener('click', function() {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('GG Moment text copied! 📋');
      });
    });
    
    shareModal.querySelector('.close-share').addEventListener('click', function() {
      document.body.removeChild(shareModal);
      document.head.removeChild(style);
    });
    
    // 点击背景关闭
    shareModal.addEventListener('click', function(e) {
      if (e.target === shareModal) {
        document.body.removeChild(shareModal);
        document.head.removeChild(style);
      }
    });
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

  // 初始渲染
  renderMoments();
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