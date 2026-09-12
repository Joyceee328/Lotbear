const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('#app > .screen');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
let stars = 120;
let sleepStartedAt = null;
let sleepMode = false;

let currentLanguage = localStorage.getItem('lotbearLanguage') || 'en';

const translations = {
  en: {
    hello:'Hello, Joyce!', todaysWorkload:"TODAY'S WORKLOAD", moderate:'Moderate', fourTasks:'You have 4 tasks today.',
    feed:'Feed', careForNagano:'Care for Nagano', sleep:'Sleep', trackRest:'Track rest', dress:'Dress', naganoLook:"Nagano's look",
    tinyReminder:'A tiny reminder', tinyReminderText:"You don't have to finish everything today.",
    yourWorkload:'YOUR WORKLOAD', calendar:'Calendar', addTask:'＋ Add task', seeEnergy:'See what is taking up your energy.',
    yourPatterns:'YOUR PATTERNS', analytics:'Analytics', analyticsDesc:'See how your workload affects your energy and recovery.',
    weeklyWorkload:'WEEKLY WORKLOAD', tapExplore:'Tap to explore ›', stressEnergy:'STRESS & ENERGY',
    whatHelps:'WHAT HELPS YOU RECOVER?', fromRecoveryTest:'From your Recovery Test', thisWeek:'This week',
    yourSpace:'YOUR SPACE', profile:'Profile', profileDesc:'Keep your Lotbear settings simple and personal.',
    preferences:'Preferences', language:'Language', personalityTest:'Personality Test', reviewPreferences:'Review your recovery preferences',
    notifications:'Notifications', reminders:'Reminders', remindersOn:'Gentle reminders are on',
    starNotifications:'Star notifications', starNotificationDesc:'Show when stars are earned or spent',
    about:'About', aboutLotbear:'About Lotbear', aboutDesc:'Your workload, your recovery, your pace.',
    analysis:'Analysis', home:'Home', recoveryTest:'Recovery Test',
    noTasks:'No tasks yet', addTaskWhenReady:'Add a task for this day when you\'re ready.',
    averageSleep:'Average sleep', quietRoom:'Quiet time in my room', meetFriend:'Meet a friend',
    relaxCafe:'Relax at a café', talkThings:'Talk things out', enjoy:'Do something I enjoy',
    giveSpace:'Give me some space', parkWalk:'5-minute park walk', smallSnack:'Small snack',
    listenMusic:'Listen to music', outdoorBreaks:'You seem to respond best to short outdoor breaks and quiet time when your energy is low.'
  },
  zh: {
    hello:'你好，Joyce！', todaysWorkload:'今日工作量', moderate:'中等', fourTasks:'今天有 4 个任务。',
    feed:'喂食', careForNagano:'照顾 Nagano', sleep:'睡眠', trackRest:'记录休息', dress:'装扮', naganoLook:'Nagano 的造型',
    tinyReminder:'小小提醒', tinyReminderText:'你不需要今天把所有事情都完成。',
    yourWorkload:'你的工作量', calendar:'日历', addTask:'＋ 添加任务', seeEnergy:'看看什么正在消耗你的精力。',
    yourPatterns:'你的状态趋势', analytics:'分析', analyticsDesc:'看看工作量如何影响你的精力与恢复。',
    weeklyWorkload:'每周工作量', tapExplore:'点击查看 ›', stressEnergy:'压力与精力',
    whatHelps:'什么能帮助你恢复？', fromRecoveryTest:'来自恢复测试', thisWeek:'本周',
    yourSpace:'你的空间', profile:'个人资料', profileDesc:'简单地管理你的 Lotbear 设置。',
    preferences:'偏好设置', language:'语言', personalityTest:'性格测试', reviewPreferences:'查看你的恢复偏好',
    notifications:'通知', reminders:'提醒', remindersOn:'温和提醒已开启',
    starNotifications:'星星通知', starNotificationDesc:'获得或使用星星时显示通知',
    about:'关于', aboutLotbear:'关于 Lotbear', aboutDesc:'你的工作量、你的恢复、你的节奏。',
    analysis:'分析', home:'首页', recoveryTest:'恢复测试',
    noTasks:'还没有任务', addTaskWhenReady:'准备好后，可以为这一天添加任务。',
    averageSleep:'平均睡眠', quietRoom:'在房间安静休息', meetFriend:'和朋友见面',
    relaxCafe:'去咖啡馆放松', talkThings:'找人聊聊', enjoy:'做喜欢的事情',
    giveSpace:'给我一点空间', parkWalk:'去公园走 5 分钟', smallSnack:'吃点小零食',
    listenMusic:'听音乐', outdoorBreaks:'你似乎最适合短暂的户外休息和安静的独处时间。'
  },
  ms: {
    hello:'Hello, Joyce!', todaysWorkload:'BEBAN HARI INI', moderate:'Sederhana', fourTasks:'Anda mempunyai 4 tugasan hari ini.',
    feed:'Beri Makan', careForNagano:'Jaga Nagano', sleep:'Tidur', trackRest:'Rekod rehat', dress:'Pakaian', naganoLook:'Gaya Nagano',
    tinyReminder:'Peringatan kecil', tinyReminderText:'Anda tidak perlu menyiapkan semuanya hari ini.',
    yourWorkload:'BEBAN KERJA ANDA', calendar:'Kalendar', addTask:'＋ Tambah tugasan', seeEnergy:'Lihat perkara yang menggunakan tenaga anda.',
    yourPatterns:'CORAK ANDA', analytics:'Analisis', analyticsDesc:'Lihat bagaimana beban kerja mempengaruhi tenaga dan pemulihan anda.',
    weeklyWorkload:'BEBAN KERJA MINGGUAN', tapExplore:'Tekan untuk lihat ›', stressEnergy:'TEKANAN & TENAGA',
    whatHelps:'APA YANG MEMBANTU ANDA PULIH?', fromRecoveryTest:'Daripada Ujian Pemulihan', thisWeek:'Minggu ini',
    yourSpace:'RUANG ANDA', profile:'Profil', profileDesc:'Urus tetapan Lotbear anda dengan mudah.',
    preferences:'Keutamaan', language:'Bahasa', personalityTest:'Ujian Personaliti', reviewPreferences:'Lihat pilihan pemulihan anda',
    notifications:'Pemberitahuan', reminders:'Peringatan', remindersOn:'Peringatan lembut dihidupkan',
    starNotifications:'Pemberitahuan bintang', starNotificationDesc:'Tunjukkan apabila bintang diperoleh atau digunakan',
    about:'Tentang', aboutLotbear:'Tentang Lotbear', aboutDesc:'Beban kerja anda, pemulihan anda, rentak anda.',
    analysis:'Analisis', home:'Laman Utama', recoveryTest:'Ujian Pemulihan',
    noTasks:'Tiada tugasan lagi', addTaskWhenReady:'Tambah tugasan untuk hari ini apabila anda bersedia.',
    averageSleep:'Purata tidur', quietRoom:'Masa tenang di bilik', meetFriend:'Jumpa rakan',
    relaxCafe:'Berehat di kafe', talkThings:'Bercakap dengan seseorang', enjoy:'Lakukan perkara yang anda suka',
    giveSpace:'Beri saya ruang', parkWalk:'Berjalan 5 minit di taman', smallSnack:'Makan snek kecil',
    listenMusic:'Dengar muzik', outdoorBreaks:'Anda nampaknya paling sesuai dengan rehat luar yang singkat dan masa tenang.'
  },
  ja: {
    hello:'こんにちは、Joyce！', todaysWorkload:'今日のワークロード', moderate:'普通', fourTasks:'今日は4つのタスクがあります。',
    feed:'ごはん', careForNagano:'Naganoのお世話', sleep:'睡眠', trackRest:'休息を記録', dress:'着せ替え', naganoLook:'Naganoのスタイル',
    tinyReminder:'小さなリマインダー', tinyReminderText:'今日はすべてを終わらせなくても大丈夫。',
    yourWorkload:'あなたのワークロード', calendar:'カレンダー', addTask:'＋ タスクを追加', seeEnergy:'何があなたのエネルギーを使っているか見てみましょう。',
    yourPatterns:'あなたのパターン', analytics:'分析', analyticsDesc:'ワークロードがエネルギーと回復にどう影響するか確認します。',
    weeklyWorkload:'週間ワークロード', tapExplore:'タップして見る ›', stressEnergy:'ストレスとエネルギー',
    whatHelps:'何が回復に役立つ？', fromRecoveryTest:'リカバリーテストから', thisWeek:'今週',
    yourSpace:'あなたのスペース', profile:'プロフィール', profileDesc:'Lotbearの設定をシンプルに管理します。',
    preferences:'設定', language:'言語', personalityTest:'パーソナリティテスト', reviewPreferences:'回復の好みを見る',
    notifications:'通知', reminders:'リマインダー', remindersOn:'やさしいリマインダーがオン',
    starNotifications:'星の通知', starNotificationDesc:'星を獲得または使用した時に通知します',
    about:'このアプリについて', aboutLotbear:'Lotbearについて', aboutDesc:'あなたのワークロード、回復、ペース。',
    analysis:'分析', home:'ホーム', recoveryTest:'リカバリーテスト',
    noTasks:'タスクはありません', addTaskWhenReady:'準備ができたら、この日にタスクを追加できます。',
    averageSleep:'平均睡眠', quietRoom:'部屋で静かに過ごす', meetFriend:'友達に会う',
    relaxCafe:'カフェで休む', talkThings:'話をする', enjoy:'好きなことをする',
    giveSpace:'ひとりの時間', parkWalk:'公園を5分歩く', smallSnack:'軽いおやつ',
    listenMusic:'音楽を聴く', outdoorBreaks:'短い屋外休憩と静かな時間が合っているようです。'
  },
  ko: {
    hello:'안녕하세요, Joyce!', todaysWorkload:'오늘의 작업량', moderate:'보통', fourTasks:'오늘 4개의 할 일이 있어요.',
    feed:'먹이 주기', careForNagano:'Nagano 돌보기', sleep:'수면', trackRest:'휴식 기록', dress:'꾸미기', naganoLook:'Nagano 스타일',
    tinyReminder:'작은 알림', tinyReminderText:'오늘 모든 일을 끝낼 필요는 없어요.',
    yourWorkload:'나의 작업량', calendar:'캘린더', addTask:'＋ 할 일 추가', seeEnergy:'무엇이 에너지를 소모하는지 확인해 보세요.',
    yourPatterns:'나의 패턴', analytics:'분석', analyticsDesc:'작업량이 에너지와 회복에 어떤 영향을 주는지 확인해 보세요.',
    weeklyWorkload:'주간 작업량', tapExplore:'눌러서 보기 ›', stressEnergy:'스트레스 & 에너지',
    whatHelps:'무엇이 회복에 도움이 되나요?', fromRecoveryTest:'회복 테스트 기반', thisWeek:'이번 주',
    yourSpace:'나의 공간', profile:'프로필', profileDesc:'Lotbear 설정을 간단하고 편하게 관리하세요.',
    preferences:'환경설정', language:'언어', personalityTest:'성향 테스트', reviewPreferences:'회복 선호도 보기',
    notifications:'알림', reminders:'리마인더', remindersOn:'부드러운 알림이 켜져 있어요',
    starNotifications:'별 알림', starNotificationDesc:'별을 얻거나 사용할 때 알려줍니다',
    about:'정보', aboutLotbear:'Lotbear 정보', aboutDesc:'나의 작업량, 회복, 나만의 속도.',
    analysis:'분석', home:'홈', recoveryTest:'회복 테스트',
    noTasks:'할 일이 없어요', addTaskWhenReady:'준비가 되면 이 날짜에 할 일을 추가하세요.',
    averageSleep:'평균 수면', quietRoom:'방에서 조용히 쉬기', meetFriend:'친구 만나기',
    relaxCafe:'카페에서 쉬기', talkThings:'이야기 나누기', enjoy:'좋아하는 일 하기',
    giveSpace:'혼자만의 시간', parkWalk:'공원에서 5분 걷기', smallSnack:'간단한 간식',
    listenMusic:'음악 듣기', outdoorBreaks:'짧은 야외 휴식과 조용한 시간이 잘 맞는 것 같아요.'
  }
};

const monthLocales = {
  en:['January','February','March','April','May','June','July','August','September','October','November','December'],
  zh:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  ms:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember']
};
const weekdayLocales = {
  en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  zh:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  ms:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu']
};

function t(key){
  return (translations[currentLanguage] && translations[currentLanguage][key]) || translations.en[key] || key;
}

function applyLanguage(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key=el.dataset.i18n;
    if(t(key)) el.textContent=t(key);
  });
  const current=document.getElementById('languageCurrent');
  if(current) current.textContent = currentLanguage==='zh'?'简体中文':currentLanguage==='ms'?'Bahasa Melayu':currentLanguage==='ja'?'日本語':currentLanguage==='ko'?'한국어':'English';
  const months=monthLocales[currentLanguage] || monthLocales.en;
  const weekdays=weekdayLocales[currentLanguage] || weekdayLocales.en;
  const weekdayEl=document.getElementById('weekdayLabels');
  if(weekdayEl) weekdayEl.innerHTML = weekdays.map(d=>`<span>${d.slice(0, currentLanguage==='zh'?2:1)}</span>`).join('');
  renderCalendar();
  const userName = localStorage.getItem('lotbearUserName') || 'Joyce';
  const buddyName = localStorage.getItem('lotbearBuddyName') || 'Nagano';
  const hello = document.querySelector('[data-i18n="hello"]');
  if(hello){
    const helloMap={en:`Hello, ${userName}!`,zh:`你好，${userName}！`,ms:`Hello, ${userName}!`,ja:`こんにちは、${userName}！`,ko:`안녕하세요, ${userName}!`};
    hello.textContent=helloMap[currentLanguage]||helloMap.en;
  }
  const message=document.getElementById('daily-message');
  if(message) message.textContent = currentLanguage==='zh' ? `今天一起照顾好自己和${buddyName}。` : currentLanguage==='ja' ? `${buddyName}と一緒に今日も自分を大切にしましょう。` : currentLanguage==='ko' ? `${buddyName}와 함께 오늘도 나를 돌봐요.` : currentLanguage==='ms' ? `Jaga diri anda dan ${buddyName} hari ini.` : `Let's take care of you and ${buddyName} today.`;
  document.querySelectorAll('.pet-name').forEach(el=>el.textContent=buddyName);
  const profileName=document.querySelector('.profile-card strong');
  if(profileName) profileName.textContent=userName;
  const avatar=document.querySelector('.profile-avatar');
  if(avatar) avatar.textContent=(userName[0]||'J').toUpperCase();
}

function setLanguage(lang){
  currentLanguage=lang;
  localStorage.setItem('lotbearLanguage',lang);
  applyLanguage();
  closeModal();
  toast(lang==='zh'?'语言已切换为中文':lang==='ms'?'Bahasa ditukar ke Bahasa Melayu':lang==='ja'?'日本語を選択しました':lang==='ko'?'한국어를 선택했습니다':'Language changed to English');
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (!sleepMode) showScreen(item.dataset.screen);
  });
});

function showScreen(id){
  if (sleepMode && id !== 'sleepModeScreen') return;
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.screen === id));
  window.scrollTo({top:0, behavior:'smooth'});
}

function openModal(html){
  modalContent.innerHTML = html;
  modal.classList.add('show');
}
function closeModal(){ modal.classList.remove('show'); }
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });

function getTodayTasks(){
  return (calendarTasks['2026-09-08'] || []).filter(t => !t.completed);
}

function getTodayWorkloadScore(){
  const tasks = getTodayTasks();
  if(!tasks.length) return 8;
  const raw = tasks.reduce((sum,t) => sum + Number(t.stress || 0), 0);
  return Math.min(100, Math.round(raw * 0.34 + tasks.length * 4));
}

function getWorkloadLabel(score){
  if(score >= 70) return 'High';
  if(score >= 40) return 'Moderate';
  return 'Light';
}

function updateHomeWorkload(){
  const tasks = getTodayTasks();
  const score = getTodayWorkloadScore();
  const label = getWorkloadLabel(score);
  const workloadText = document.getElementById('workloadText');
  if(workloadText){
    workloadText.textContent = label;
    workloadText.removeAttribute('data-i18n');
  }
  const countText = document.querySelector('.workload-home-card p');
  if(countText) countText.textContent = `You have ${tasks.length} task${tasks.length===1?'':'s'} today.`;
  const fill = document.getElementById('meterFill');
  if(fill) fill.style.height = `${Math.max(10, score)}%`;
}

function updateBurnoutMeter(){
  const score = getTodayWorkloadScore();
  const label = score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low';
  const valueEl = document.getElementById('burnoutScore');
  const fillEl = document.getElementById('burnoutFill');
  const labelEl = document.getElementById('burnoutLabel');
  if(valueEl) valueEl.textContent = `${score}/100`;
  if(fillEl) fillEl.style.width = `${score}%`;
  if(labelEl) labelEl.textContent = label;
  const cardScore = document.getElementById('burnoutScoreCard');
  const cardFill = document.getElementById('burnoutFillCard');
  const cardLabel = document.getElementById('burnoutLabel');
  if(cardScore) cardScore.textContent = `${score}/100`;
  if(cardFill) cardFill.style.width = `${score}%`;
  if(cardLabel) cardLabel.textContent = label;
  const card = document.querySelector('.burnout-card');
  if(card) card.classList.toggle('burnout-low', score < 40);
  if(card) card.classList.toggle('burnout-medium', score >= 40 && score < 70);
}

function openTodayWorkload(){
  const todayTasks = getTodayTasks().map(t => [t.name, t.time, t.stress, t.category]);
  if(!todayTasks.length){
    openModal(`
      <div class="eyebrow">TODAY'S WORKLOAD</div>
      <h3>Your day is clear. 🌿</h3>
      <p>You have no unfinished tasks today.</p>
      <div class="modal-highlight">✨ Nice work. You have more room for recovery.</div>
      <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
    `);
    return;
  }
  openModal(`
    <div class="eyebrow">TODAY'S WORKLOAD</div>
    <h3>What is taking up your energy today?</h3>
    <p>Here is a quick view of your tasks for today.</p>
    <div class="detail-task-list">
      ${todayTasks.map(([name,time,stress]) => `
        <div><span><b>${escapeHtml(name)}</b><small style="display:block;color:var(--muted);margin-top:3px">${escapeHtml(time)}</small></span><b>${stress}/100</b></div>
      `).join('')}
    </div>
    <div class="modal-highlight">💡 <span><b>Highest stress:</b> ${escapeHtml([...todayTasks].sort((a,b)=>b[2]-a[2])[0][0])} (${[...todayTasks].sort((a,b)=>b[2]-a[2])[0][2]}/100).</span></div>
    <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
  `);
}

function openFeed(){
  showScreen('feedScreen');
}

function feedNagano(event) {
  if (stars < 5) {
    toast('Not enough stars! 🌟');
    return;
  }

  // 1. 获取点击的按钮（Little Fish 卡片）
  const btn = (event && event.currentTarget) || document.querySelector('.treat-card') || event.target;

  // 2. 准确定位界面上的 Nagano 小熊图片
  // 优先查找图片标签，如果没有就找卡片里的 img
  const bearImg = document.querySelector('.screen.active img') || 
                  document.querySelector('.feed-screen img') || 
                  document.querySelector('#feedScreen img') ||
                  document.querySelector('.pet-avatar');

  if (btn && bearImg) {
    const btnRect = btn.getBoundingClientRect();
    const bearRect = bearImg.getBoundingClientRect();

    // 创建小鱼元素
    const fish = document.createElement('div');
    fish.className = 'flying-fish';
    fish.innerText = '🐟';

    // 计算起点（Little Fish 按钮中心）和终点（小熊中心）
    const startX = btnRect.left + btnRect.width / 2 - 15;
    const startY = btnRect.top + btnRect.height / 2 - 15;
    const endX = bearRect.left + bearRect.width / 2 - 15;
    const endY = bearRect.top + bearRect.height / 2 - 15;

    // 设置小鱼初始位置
    fish.style.left = `${startX}px`;
    fish.style.top = `${startY}px`;
    fish.style.opacity = '1';
    fish.style.transform = 'scale(1.2)';
    document.body.appendChild(fish);

    // 触发飞行动画
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fish.style.left = `${endX}px`;
        fish.style.top = `${endY}px`;
        fish.style.opacity = '0';
        fish.style.transform = 'scale(0.5) rotate(-20deg)';
      });
    });

    // 延迟 0.7 秒等小鱼飞到小熊嘴里后：移除小鱼，小熊震动/缩小吃掉，再弹出提示框
    setTimeout(() => {
      fish.remove();
      
      // 让小熊播放吃东西的动效
      bearImg.classList.remove('eating-anim');
      void bearImg.offsetWidth; // 刷新动画
      bearImg.classList.add('eating-anim');

      // 扣除星星
      stars -= 5;
      const starsEl = document.getElementById('stars');
      const profileStars = document.getElementById('profileStars');
      if(starsEl) starsEl.textContent = stars;
      if(profileStars) profileStars.textContent = stars;
      notifyStars(-5, 'Feed Nagano');

      const status = document.getElementById('feedStatus');
      if(status) status.textContent = 'Nagano is enjoying the Little Fish! 🍣';

      // 动画飞完后再弹窗，体验更好
      openModal(`
        <div class="eyebrow">NAGANO'S LITTLE MOMENT</div>
        <h3>🍽️ Nagano is eating!</h3>
        <p>You fed Nagano a Little Fish (-5 ★). Taking small care moments can help make recovery feel easier.</p>
        <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
      `);
    }, 700);
  } else {
    // 防错备用逻辑
    stars -= 5;
    toast('Fed Nagano! -5 ★');
  }
}

function openSleep(){
  openModal(`
    <div class="eyebrow">SLEEP MODE</div>
    <h3>🌙 Ready to rest?</h3>
    <p>Start sleep mode when you're going to bed. The prototype will keep you in Sleep Mode until you choose to wake up.</p>
    <div class="modal-buttons">
      <button class="cancel" onclick="closeModal()">Not now</button>
      <button class="ok" onclick="startSleep()">Start sleep</button>
    </div>
  `);
}

function startSleep(){
  closeModal();
  sleepStartedAt = new Date();
  sleepMode = true;
  document.body.classList.add('sleeping');
  showScreen('sleepModeScreen');
}

function wakeUp(){
  sleepMode = false;
  document.body.classList.remove('sleeping');

  const sleepDuration = '7h';
  const sleepStat = document.getElementById('sleepStat');
  if(sleepStat) sleepStat.textContent = sleepDuration;

  stars += 10;
  const starsEl = document.getElementById('stars');
  if(starsEl) starsEl.textContent = stars;
  const profileStars = document.getElementById('profileStars');
  if(profileStars) profileStars.textContent = stars;

  showScreen('home');
  notifyStars(10, 'Sleep logged');
  toast('Good morning! +10 ★ · 7h sleep logged');
}

function openDress(){
  showScreen('dressScreen');
}

function selectOutfit(){
  toast('This outfit is locked 🔒');
}

const calendarTasks = {
  '2026-09-08': [
    { id:'assignment-1', name:'Software Engineering Assignment', time:'No fixed time', stress:78, category:'school', completed:false },
    { id:'job-1', name:'Part-time Job', time:'6:00 PM – 10:00 PM', stress:62, category:'work', completed:false },
    { id:'party-1', name:'Birthday Party', time:'8:00 PM – 10:30 PM', stress:35, category:'social', completed:false },
    { id:'class-1', name:'Computer Architecture Class', time:'10:00 AM – 12:00 PM', stress:55, category:'school', completed:false }
  ]
};

let calendarYear = 2026;
let calendarMonthIndex = 8; // September
let selectedCalendarDate = '2026-09-08';
let activeTaskForEnergy = null;
let activeTaskForRecovery = null;

const monthNames = monthLocales.en;
const weekdayNames = weekdayLocales.en;

function formatDateKey(year, monthIndex, day){
  return `${year}-${String(monthIndex + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

function formatSelectedDate(dateKey){
  const d = new Date(dateKey + 'T12:00:00');
  const weekdays = weekdayLocales[currentLanguage] || weekdayLocales.en;
  const months = monthLocales[currentLanguage] || monthLocales.en;
  return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()].slice(0,3)}`;
}

function renderCalendar(){
  const title = document.getElementById('calendarMonth');
  const daysEl = document.getElementById('calendarDays');
  const label = document.getElementById('selectedDateLabel');
  if(!title || !daysEl) return;

  const months = monthLocales[currentLanguage] || monthLocales.en;
  title.textContent = `${months[calendarMonthIndex]} ${calendarYear}`;
  const first = new Date(calendarYear, calendarMonthIndex, 1);
  const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7;
  daysEl.innerHTML = '';

  for(let i = 0; i < leading; i++){
    const blank = document.createElement('span');
    blank.className = 'day-empty';
    daysEl.appendChild(blank);
  }

  for(let day = 1; day <= daysInMonth; day++){
    const key = formatDateKey(calendarYear, calendarMonthIndex, day);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day-button';
    if(key === selectedCalendarDate) button.classList.add('selected-day');
    if((calendarTasks[key] || []).length) button.classList.add('has-tasks');
    button.textContent = day;
    button.setAttribute('aria-label', formatSelectedDate(key));
    button.onclick = () => selectCalendarDate(key);
    daysEl.appendChild(button);
  }

  if(label) label.textContent = formatSelectedDate(selectedCalendarDate);
  renderTasksForDate(selectedCalendarDate);
}

function selectCalendarDate(dateKey){
  selectedCalendarDate = dateKey;
  const d = new Date(dateKey + 'T12:00:00');
  calendarYear = d.getFullYear();
  calendarMonthIndex = d.getMonth();
  renderCalendar();
}

function changeMonth(step){
  calendarMonthIndex += step;
  if(calendarMonthIndex < 0){ calendarMonthIndex = 11; calendarYear--; }
  else if(calendarMonthIndex > 11){ calendarMonthIndex = 0; calendarYear++; }

  const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
  const selected = new Date(selectedCalendarDate + 'T12:00:00');
  const day = Math.min(selected.getDate(), daysInMonth);
  selectedCalendarDate = formatDateKey(calendarYear, calendarMonthIndex, day);
  renderCalendar();
}

function renderTasksForDate(dateKey){
  const container = document.getElementById('taskItems');
  if(!container) return;
  const tasks = calendarTasks[dateKey] || [];

  if(!tasks.length){
    container.innerHTML = `
      <div class="empty-day">
        <span>♡</span>
        <strong>${t('noTasks')}</strong>
        <small>${t('addTaskWhenReady')}</small>
      </div>`;
    return;
  }

  container.innerHTML = tasks.map(task => {
    const stress = Math.max(1, Math.min(100, Number(task.stress) || 1));
    const timeText = task.time || 'No fixed time';
    return `
      <div class="task ${task.category || 'school'} ${task.completed ? 'task-completed' : ''}">
        <label class="task-check" title="Mark task complete">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="completeTask('${task.id}', this.checked)">
          <span class="checkmark"></span>
        </label>
        <div class="task-main">
          <b>${escapeHtml(task.name)}</b>
          <small>${escapeHtml(timeText)}</small>
        </div>
        <span class="task-stress">${stress}/100</span>
      </div>`;
  }).join('');
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}

document.addEventListener('DOMContentLoaded', () => { renderCalendar(); applyLanguage(); });

let taskTimeMode = 'time';

function setTimeMode(mode){
  taskTimeMode = mode;
  const timeBtn = document.getElementById('timeModeBtn');
  const durationBtn = document.getElementById('durationModeBtn');
  const timeInputs = document.getElementById('timeInputs');
  const durationWrap = document.getElementById('durationInputWrap');
  if(timeBtn) timeBtn.classList.toggle('active', mode === 'time');
  if(durationBtn) durationBtn.classList.toggle('active', mode === 'duration');
  if(timeInputs) timeInputs.style.display = mode === 'time' ? 'flex' : 'none';
  if(durationWrap) durationWrap.style.display = mode === 'duration' ? 'block' : 'none';
}

function addTask(){
  const selected = selectedCalendarDate || '2026-09-08';
  openModal(`
    <div class="eyebrow">NEW TASK</div>
    <h3>＋ Add a task</h3>
    <form class="task-form" onsubmit="saveTask(event)">
      <label>Task name
        <input id="taskName" type="text" placeholder="e.g. Software Engineering Assignment" required>
      </label>

      <label>Date
        <input id="taskDate" type="date" value="${selected}" required>
      </label>

      <label>Time / duration <span class="optional-label">(optional)</span></label>
      <div class="time-mode-toggle">
        <button type="button" class="time-mode active" id="timeModeBtn" onclick="setTimeMode('time')">Time</button>
        <button type="button" class="time-mode" id="durationModeBtn" onclick="setTimeMode('duration')">Duration</button>
      </div>
      <div id="timeInputs" class="time-inputs">
        <input id="taskStartTime" type="time" aria-label="Start time">
        <span>to</span>
        <input id="taskEndTime" type="time" aria-label="End time">
      </div>
      <div id="durationInputWrap" class="duration-input-wrap" style="display:none;">
        <select id="taskDuration" aria-label="Duration">
          <option value="">Select duration</option>
          <option>30 minutes</option><option>1 hour</option><option>1.5 hours</option>
          <option>2 hours</option><option>3 hours</option><option>4 hours</option>
          <option>5+ hours</option>
        </select>
      </div>
      <small class="field-hint">Choose a time or duration, or leave it blank if there is no fixed schedule.</small>

      <label>Stress level <span class="range-value"><b id="stressValue">50</b>/100</span>
        <input id="taskStress" class="stress-range" type="range" min="1" max="100" value="50"
          oninput="document.getElementById('stressValue').textContent=this.value">
      </label>

      <div class="modal-buttons">
        <button type="button" class="cancel" onclick="closeModal()">Cancel</button>
        <button type="submit" class="ok">Add task</button>
      </div>
    </form>
  `);
}

function saveTask(event){
  event.preventDefault();
  const name = document.getElementById('taskName').value.trim();
  const date = document.getElementById('taskDate').value;
  let time = '';
  if(taskTimeMode === 'time'){
    const start = document.getElementById('taskStartTime')?.value || '';
    const end = document.getElementById('taskEndTime')?.value || '';
    if(start && end){
      const fmt = t => {
        const [h,m] = t.split(':').map(Number);
        const ap = h >= 12 ? 'PM' : 'AM';
        const hh = h % 12 || 12;
        return `${hh}:${String(m).padStart(2,'0')} ${ap}`;
      };
      time = `${fmt(start)} – ${fmt(end)}`;
    } else if(start){
      time = fmt(start);
    }
  } else {
    time = document.getElementById('taskDuration')?.value || '';
  }
  const stress = Number(document.getElementById('taskStress').value);
  if(!name || !date) return;

  if(!calendarTasks[date]) calendarTasks[date] = [];
  calendarTasks[date].push({
    id: 'task-' + Date.now(),
    name,
    time,
    stress,
    category:'school',
    completed:false
  });

  selectedCalendarDate = date;
  const d = new Date(date + 'T12:00:00');
  calendarYear = d.getFullYear();
  calendarMonthIndex = d.getMonth();
  closeModal();
  renderCalendar();
  toast('Task added to your calendar');
}

function completeTask(taskId, checked){
  const tasks = calendarTasks[selectedCalendarDate] || [];
  const task = tasks.find(t => t.id === taskId);
  if(!task) return;

  task.completed = checked;
  renderTasksForDate(selectedCalendarDate);
  if(checked){
    stars += 5;
    document.getElementById('stars').textContent = stars;
    const profileStars = document.getElementById('profileStars');
    if(profileStars) profileStars.textContent = stars;
    notifyStars(5, 'Task completed');
    activeTaskForEnergy = task;
    openEnergyModal(task);
  }
}

function openEnergyModal(task){
  openModal(`
    <div class="eyebrow">TASK COMPLETED</div>
    <h3>How much energy do you have left?</h3>
    <p>You finished <strong>${escapeHtml(task.name)}</strong>. Slide to show how much energy you have remaining.</p>
    <div class="energy-display"><b id="energyValue">50</b><span>/ 100 energy</span></div>
    <input id="energyRange" class="energy-range" type="range" min="1" max="100" value="50"
      oninput="document.getElementById('energyValue').textContent=this.value">
    <div class="energy-labels"><span>Very low</span><span>Full energy</span></div>
    <div class="modal-buttons"><button class="ok" onclick="submitEnergy()">Continue</button></div>
  `);
}

function submitEnergy(){
  const energy = Number(document.getElementById('energyRange').value);
  const task = activeTaskForEnergy;
  if(!task) { closeModal(); return; }
  task.energyAfter = energy;
  activeTaskForEnergy = null;

  if(energy <= 40){
    activeTaskForRecovery = task;
    openRecoveryModal();
  } else {
    closeModal();
    toast('Task completed ✓');
  }
}

function openRecoveryModal(){
  openModal(`
    <div class="eyebrow">RECOVERY RECOMMENDATION</div>
    <h3>Your energy is running low.</h3>
    <p>You've got this. Choose a small recovery action that feels right for you.</p>
    <div class="recovery-options">
      <button onclick="chooseRecovery('Grab a small snack')"><span>🍪</span><b>Grab a small snack</b><small>Take a little energy break</small></button>
      <button onclick="chooseRecovery('Take a 5-minute walk in the park')"><span>🌳</span><b>5-minute park walk</b><small>Step outside and reset</small></button>
      <button onclick="chooseRecovery('Listen to music')"><span>🎧</span><b>Listen to music</b><small>Take a gentle break</small></button>
      <button class="recovery-reject" onclick="rejectRecovery()"><span>×</span><b>Not now</b><small>I don't have time to reset right now.</small></button>
    </div>
  `);
}

function chooseRecovery(choice){
  closeModal();
  openModal(`
    <div class="eyebrow">RECOVERY</div>
    <h3>🌿 ${escapeHtml(choice)}</h3>
    <p>Take a little time for yourself. When you're done, tell us how this recovery felt.</p>
    <div class="modal-buttons"><button class="ok" onclick="finishRecovery()">Recovery complete</button></div>
  `);
}

function rejectRecovery(){
  activeTaskForRecovery = null;
  closeModal();
  toast('Recovery skipped');
}

function finishRecovery(){
  activeTaskForRecovery = null;
  stars += 5;
  document.getElementById('stars').textContent = stars;
  const profileStars = document.getElementById('profileStars');
  if(profileStars) profileStars.textContent = stars;
  notifyStars(5, 'Recovery complete');
  openRecoveryFeedback();
}

function openRecoveryFeedback(){
  openModal(`
    <div class="eyebrow">QUICK FEEDBACK</div>
    <h3>How did that recovery feel?</h3>
    <p>Your feedback helps us learn which recovery suggestions fit you best.</p>
    <div class="feedback-emojis">
      <button onclick="submitRecoveryFeedback('😌','Better')">😌<small>Better</small></button>
      <button onclick="submitRecoveryFeedback('🙂','Okay')">🙂<small>Okay</small></button>
      <button onclick="submitRecoveryFeedback('😕','Not for me')">😕<small>Not for me</small></button>
    </div>
  `);
}

function submitRecoveryFeedback(emoji, label){
  closeModal();
  toast(`${emoji} ${label} — feedback saved`);
}

function openBurnoutMeter(){
  openModal(`
    <div class="eyebrow">BURNOUT METER · <span id="burnoutScore">82/100</span></div>
    <h3>⚠️ Your day looks unusually busy.</h3>
    <p>Lotbear detected several tasks with high combined workload. Would you like to make a little more room today?</p>
    <div class="burnout-options">
      <button onclick="moveTaskToDate('assignment-1','2026-09-10','Thursday')">
        <span>📚</span><span><b>Move your assignment</b><small>Move Software Engineering Assignment to Thursday</small></span><span>›</span>
      </button>
      <button onclick="moveTaskToDate('party-1','2026-09-12','Saturday')">
        <span>🎉</span><span><b>Move your party</b><small>Move Birthday Party to Saturday</small></span><span>›</span>
      </button>
      <button onclick="moveTaskToDate('reply-1','2026-09-13','Sunday')">
        <span>💬</span><span><b>Move a small task</b><small>Move “Reply to friends” to Sunday</small></span><span>›</span>
      </button>
    </div>
    <div class="modal-buttons"><button class="cancel" onclick="closeModal()">No, keep my schedule</button></div>
  `);
  updateBurnoutMeter();
}

function moveTaskToDate(taskId, targetDate, dayName){
  let movedTask = null;
  for(const dateKey of Object.keys(calendarTasks)){
    const list = calendarTasks[dateKey] || [];
    const index = list.findIndex(t => t.id === taskId);
    if(index !== -1){ movedTask = list.splice(index,1)[0]; break; }
  }
  if(!movedTask){
    const fallback = {
      'assignment-1': {id:'assignment-1',name:'Software Engineering Assignment',time:'No fixed time',stress:78,category:'school',completed:false},
      'party-1': {id:'party-1',name:'Birthday Party',time:'8:00 PM – 10:30 PM',stress:35,category:'social',completed:false},
      'reply-1': {id:'reply-1',name:'Reply to friends',time:'Flexible',stress:31,category:'social',completed:false}
    };
    movedTask = fallback[taskId];
  }
  if(movedTask){
    calendarTasks[targetDate] = calendarTasks[targetDate] || [];
    calendarTasks[targetDate].push(movedTask);
  }
  closeModal();
  renderCalendar();
  updateHomeWorkload();
  updateBurnoutMeter();
  toast(`Moved to ${dayName} ✓ Today's workload is now lighter.`);
}

function openWeeklyWorkload(){
  openModal(`
    <div class="eyebrow">WEEKLY WORKLOAD</div>
    <h3>Where did your workload peak?</h3>
    <p>Tap a day to see the simulated tasks behind the workload score.</p>
    <div class="weekly-detail-list">
      <button onclick="openWorkloadDay('Monday',28)"><span>Mon</span><b>28/100</b><small>2 tasks · Light</small></button>
      <button onclick="openWorkloadDay('Tuesday',48)"><span>Tue</span><b>48/100</b><small>3 tasks · Moderate</small></button>
      <button onclick="openWorkloadDay('Wednesday',66)"><span>Wed</span><b>66/100</b><small>3 tasks · Busy</small></button>
      <button onclick="openWorkloadDay('Thursday',42)"><span>Thu</span><b>42/100</b><small>2 tasks · Moderate</small></button>
      <button class="highest" onclick="openWorkloadDay('Friday',78)"><span>Fri</span><b>78/100</b><small>4 tasks · Most demanding</small></button>
      <button onclick="openWorkloadDay('Saturday',34)"><span>Sat</span><b>34/100</b><small>2 tasks · Light</small></button>
      <button onclick="openWorkloadDay('Sunday',22)"><span>Sun</span><b>22/100</b><small>2 tasks · Light</small></button>
    </div>
    <div class="modal-highlight">🔥 <span><b>Friday was your heaviest day.</b><br>Part-time job + assignment + class created the highest combined stress.</span></div>
  `);
}

function openWorkloadDay(day, score){
  const details = {
    Monday: [['Reply to emails',32],['Laundry',24]],
    Tuesday: [['Computer Architecture Class',55],['Software Engineering Assignment',78],['Reply to friends',31]],
    Wednesday: [['Group project',68],['Study session',61],['Part-time shift',52]],
    Thursday: [['Coding practice',44],['Grocery shopping',40]],
    Friday: [['Software Engineering Assignment',82],['Part-time Job',74],['Computer Architecture Class',63],['Group meeting',71]],
    Saturday: [['Birthday Party',35],['Personal errands',32]],
    Sunday: [['Weekly planning',25],['Free time',18]]
  };
  const tasks = details[day] || [];
  const high = tasks.filter(t => t[1] >= 70);
  openModal(`
    <div class="eyebrow">${day.toUpperCase()} · ${score}/100</div>
    <h3>${score >= 70 ? 'A high-load day' : 'Your workload that day'}</h3>
    <p>Here is a simulated breakdown of what contributed to your workload.</p>
    <div class="detail-task-list">
      ${tasks.map(([name,stress]) => `<div><span>${escapeHtml(name)}</span><b>${stress}/100</b></div>`).join('')}
    </div>
    <div class="modal-highlight">${score >= 70 ? '⚠️' : '🌿'} <span><b>${high.length ? high.length + ' high-stress task' + (high.length>1?'s':'') : 'No high-stress tasks'}.</b><br>${score >= 70 ? 'Consider leaving a little recovery space after this kind of day.' : 'This looks like a relatively manageable day.'}</span></div>
    <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
  `);
}

function openStressEnergy(){
  openModal(`
    <div class="eyebrow">STRESS &amp; ENERGY</div>
    <h3>How did your week feel?</h3>
    <p>These are simulated prototype values based on your logged workload and energy check-ins.</p>
    <div class="metric-detail">
      <div><span>Average stress</span><b>64/100</b><i><em style="width:64%"></em></i></div>
      <div><span>Average energy</span><b>57/100</b><i><em style="width:57%"></em></i></div>
      <div><span>Lowest energy</span><b>38/100</b><i><em style="width:38%"></em></i></div>
      <div><span>Highest stress</span><b>82/100</b><i><em style="width:82%"></em></i></div>
    </div>
    <div class="modal-highlight">💡 <span><b>Pattern:</b> Energy was lowest after your highest-stress days, especially Friday.</span></div>
    <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
  `);
}

function notifyStars(delta, reason){
  const sign = delta >= 0 ? '+' : '−';
  const label = delta >= 0 ? 'stars earned' : 'stars spent';
  toast(`★ ${sign}${Math.abs(delta)} · ${reason} · ${label}`);
}

function openLanguage(){
  const selected = lang => currentLanguage===lang ? 'selected-choice' : '';
  openModal(`
    <div class="eyebrow">LANGUAGE</div>
    <h3>Choose your language</h3>
    <p>Select the language you'd like Lotbear to use.</p>
    <div class="simple-choice-list">
      <button class="${selected('en')}" onclick="setLanguage('en')"><b>English</b><span>${currentLanguage==='en'?'✓':'›'}</span></button>
      <button class="${selected('zh')}" onclick="setLanguage('zh')"><b>简体中文</b><span>${currentLanguage==='zh'?'✓':'›'}</span></button>
      <button class="${selected('ms')}" onclick="setLanguage('ms')"><b>Bahasa Melayu</b><span>${currentLanguage==='ms'?'✓':'›'}</span></button>
      <button class="${selected('ja')}" onclick="setLanguage('ja')"><b>日本語</b><span>›</span></button>
      <button class="${selected('ko')}" onclick="setLanguage('ko')"><b>한국어</b><span>›</span></button>
    </div>
  `);
}

let personalityAnswers = JSON.parse(localStorage.getItem('lotbearPersonality') || 'null') || {q1:'Go outside', q2:'Give me some space', q3:'Somewhere outdoors'};

function openPersonalityTest(){
  const q1=[['Stay home alone','🌙'],['Meet my friends','👯'],['Go outside','🌿'],['Do something I enjoy','🎮']];
  const q2=[['Give me some space','🤫'],['Stay with me','🫂'],['Talk to me','💬'],['Distract me','😂']];
  const q3=[['My room','🏠'],['Somewhere outdoors','🌳'],['A café / somewhere outside','☕'],['Something else','✍️']];
  const group=(id,title,opts)=>`<div class="personality-q"><b>${title}</b><div class="personality-options">${opts.map(([label,icon])=>`<button class="${personalityAnswers[id]===label?'selected':''}" onclick="selectPersonality('${id}', '${label.replace(/'/g, "\\'")}')">${icon} ${label}</button>`).join('')}</div></div>`;
  openModal(`
    <div class="eyebrow">RECOVERY PROFILE</div>
    <h3>Redo your personality test</h3>
    <p>Your answers shape the recovery suggestions shown in Analytics and when your energy is low.</p>
    ${group('q1',"Q1 · After a stressful week, what sounds best?",q1)}
    ${group('q2',"Q2 · When your brain feels exhausted, what do you want from others?",q2)}
    ${group('q3',"Q3 · Where do you usually feel most relaxed?",q3)}
    <div class="modal-buttons"><button class="cancel" onclick="closeModal()">Cancel</button><button class="ok" onclick="savePersonalityTest()">Save answers</button></div>
  `);
}

function selectPersonality(q, value){
  personalityAnswers[q]=value;
  openPersonalityTest();
}

function savePersonalityTest(){
  localStorage.setItem('lotbearPersonality', JSON.stringify(personalityAnswers));
  closeModal();
  toast('Personality test updated ✓');
}

function toggleReminders(){
  const status=document.getElementById('reminderStatus');
  const toggle=document.getElementById('reminderToggle');
  const on=toggle && toggle.textContent==='●';
  if(status) status.textContent=on ? 'Reminders are off' : 'Gentle reminders are on';
  if(toggle) toggle.textContent=on ? '○' : '●';
  toast(on ? 'Reminders turned off' : 'Reminders turned on');
}

function openNotificationSettings(){
  openModal(`
    <div class="eyebrow">STAR NOTIFICATIONS</div>
    <h3>Star updates are on</h3>
    <p>Lotbear will show a small notification whenever you earn or spend stars.</p>
    <div class="modal-highlight">★ <span><b>Earn stars</b><br>Complete a task or recovery → +5 ★</span></div>
    <div class="modal-highlight">★ <span><b>Spend stars</b><br>Feed Nagano → −5 ★</span></div>
    <div class="modal-buttons"><button class="ok" onclick="closeModal()">Done</button></div>
  `);
}

function rebalance(button){
  button.textContent = '✓ Done';
  button.style.background = '#dce9d8';
  toast('Your workload has been rebalanced 🌿');
}

function shareProgress(){
  if(navigator.share){
    navigator.share({title:'Joyce & Nagano',text:'My Lotbear wellbeing score is 72.'}).catch(()=>{});
  } else {
    toast('Share card ready to send ✨');
  }
}

function toast(message){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

// Session check and application startup
window.addEventListener('load', () => {
  updateHomeWorkload();
  updateBurnoutMeter();
  setTimeout(() => {
    const appVisible = document.getElementById('mainAppLayer')?.classList.contains('visible');
    if(appVisible && !sessionStorage.getItem('lotbearBurnoutSeen') && !sleepMode){
      sessionStorage.setItem('lotbearBurnoutSeen','1');
      openBurnoutMeter();
    }
  }, 900);
});

window.initializeLotbearApp = function(){
  updateHomeWorkload();
  updateBurnoutMeter();
  applyLanguage();
  renderCalendar();
};