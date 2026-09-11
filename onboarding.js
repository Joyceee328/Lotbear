(() => {
  const phone = document.querySelector('.onboarding-phone');
  const onboardingLayer = document.getElementById('onboardingLayer');
  const mainAppLayer = document.getElementById('mainAppLayer');
  const startBtn = document.getElementById('startBtn');
  const testIntro = document.getElementById('testIntro');
  const questionWrap = document.getElementById('questionWrap');
  const complete = document.getElementById('complete');
  const buddyPage = document.getElementById('buddyPage');
  const startTest = document.getElementById('startTest');
  const continueBtn = document.getElementById('continue');
  const buddyBack = document.getElementById('buddyBack');
  const back = document.getElementById('back');
  const bar = document.getElementById('bar');
  const count = document.getElementById('count');
  const upload = document.getElementById('upload');
  const createBtn = document.getElementById('create');
  const pages = questionWrap ? [...questionWrap.querySelectorAll('.question-page')] : [];
  let current = 0;
  const answers = {};

  function showOnboardingScreen(screen){
    [testIntro, questionWrap, complete, buddyPage].forEach(el => el?.classList.remove('active'));
    screen?.classList.add('active');
  }

  function render(){
    pages.forEach((page,i) => page.classList.toggle('active', i===current));
    if(count) count.textContent = `${current+1} / ${pages.length}`;
    if(bar) bar.style.width = `${((current+1)/pages.length)*100}%`;
    if(back) back.style.visibility = current===0 ? 'hidden' : 'visible';
  }

  startBtn?.addEventListener('click', () => {
    phone?.classList.add('recovery-mode');
    showOnboardingScreen(testIntro);
  });

  startTest?.addEventListener('click', () => {
    showOnboardingScreen(questionWrap);
    current = 0;
    render();
  });

  pages.forEach((page, pageIndex) => {
    const options = [...page.querySelectorAll('.option')];
    const next = page.querySelector('.next');
    const input = page.querySelector('input');
    const valid = () => {
      const selected = page.querySelector('.option.selected');
      if(!selected) return false;
      if(selected.classList.contains('custom')) return !!input && input.value.trim().length > 0;
      return true;
    };
    options.forEach(option => option.addEventListener('click', e => {
      if(e.target.tagName === 'INPUT') return;
      options.forEach(x => x.classList.remove('selected'));
      option.classList.add('selected');
      if(input && !option.classList.contains('custom')) input.value = '';
      next.disabled = !valid();
      if(option.classList.contains('custom')) input?.focus();
    }));
    input?.addEventListener('input', () => next.disabled = !valid());
    next?.addEventListener('click', () => {
      if(next.disabled) return;
      const selected = page.querySelector('.option.selected');
      if(selected){
        const strong = selected.querySelector('strong')?.textContent?.trim() || '';
        const customValue = selected.classList.contains('custom') ? input?.value.trim() : '';
        answers[`q${pageIndex+1}`] = customValue || strong;
      }
      if(current < pages.length-1){ current++; render(); }
      else { showOnboardingScreen(complete); }
    });
  });

  back?.addEventListener('click', () => { if(current>0){ current--; render(); } });
  continueBtn?.addEventListener('click', () => showOnboardingScreen(buddyPage));
  buddyBack?.addEventListener('click', () => showOnboardingScreen(complete));
  upload?.addEventListener('click', () => upload.classList.add('show-nagano'));

  createBtn?.addEventListener('click', () => {
    const buddyName = document.getElementById('buddyName')?.value.trim() || 'Nagano';
    const yourName = document.getElementById('yourName')?.value.trim() || 'Joyce';
    localStorage.setItem('lotbearBuddyName', buddyName);
    localStorage.setItem('lotbearUserName', yourName);
    localStorage.setItem('lotbearPersonality', JSON.stringify({
      q1: answers.q1 || 'Go outside',
      q2: answers.q2 || 'Give me some space',
      q3: answers.q3 || 'Somewhere outdoors'
    }));
    sessionStorage.setItem('lotbearOnboardingComplete', 'true');
    onboardingLayer?.classList.add('hidden');
    mainAppLayer?.classList.add('visible');
    window.initializeLotbearApp?.();
    window.showScreen?.('home');
  });

  // Always show onboarding on a fresh prototype session; after Create Buddy the app remains available on reload.
  window.addEventListener('load', () => {
    const completePreviously = sessionStorage.getItem('lotbearOnboardingComplete') === 'true';
    if(completePreviously){
      onboardingLayer?.classList.add('hidden');
      mainAppLayer?.classList.add('visible');
      window.initializeLotbearApp?.();
      window.showScreen?.('home');
    } else {
      onboardingLayer?.classList.remove('hidden');
      mainAppLayer?.classList.remove('visible');
    }
  });
})();
