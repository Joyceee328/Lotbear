const phone=document.querySelector('.phone');
const startBtn=document.getElementById('startBtn');
const testIntro=document.getElementById('testIntro');
const questionWrap=document.getElementById('questionWrap');
const complete=document.getElementById('complete');
const buddyPage=document.getElementById('buddyPage');
const startTest=document.getElementById('startTest');
const continueBtn=document.getElementById('continue');
const buddyBack=document.getElementById('buddyBack');
const back=document.getElementById('back');
const bar=document.getElementById('bar');
const count=document.getElementById('count');
const upload=document.getElementById('upload');
const createBtn=document.getElementById('create');
const pages=questionWrap?[...questionWrap.querySelectorAll('.page')]:[];
let current=0;

if(startBtn) startBtn.addEventListener('click',()=>{
  phone?.classList.add('recovery-mode');
  testIntro?.classList.add('active');
});

function render(){
  pages.forEach((page,i)=>page.classList.toggle('active',i===current));
  if(count) count.textContent=`${current+1} / ${pages.length}`;
  if(bar) bar.style.width=`${((current+1)/pages.length)*100}%`;
  if(back) back.style.visibility=current===0?'hidden':'visible';
}

if(startTest) startTest.addEventListener('click',()=>{
  testIntro?.classList.remove('active');
  questionWrap?.classList.add('active');
  current=0;
  render();
});

pages.forEach(page=>{
  const options=[...page.querySelectorAll('.option')];
  const next=page.querySelector('.next');
  const input=page.querySelector('input');
  if(!next) return;
  const valid=()=>{
    const selected=page.querySelector('.option.selected');
    if(!selected) return false;
    if(selected.classList.contains('custom')) return !!input&&input.value.trim().length>0;
    return true;
  };
  options.forEach(option=>option.addEventListener('click',e=>{
    if(e.target.tagName==='INPUT') return;
    options.forEach(x=>x.classList.remove('selected'));
    option.classList.add('selected');
    if(input&&!option.classList.contains('custom')) input.value='';
    next.disabled=!valid();
    if(option.classList.contains('custom')) input?.focus();
  }));
  input?.addEventListener('input',()=>next.disabled=!valid());
  next.addEventListener('click',()=>{
    if(next.disabled) return;
    if(current<pages.length-1){current++;render();}
    else{questionWrap?.classList.remove('active');complete?.classList.add('active');}
  });
});

back?.addEventListener('click',()=>{if(current>0){current--;render();}});
continueBtn?.addEventListener('click',()=>{complete?.classList.remove('active');buddyPage?.classList.add('active');});
buddyBack?.addEventListener('click',()=>{buddyPage?.classList.remove('active');complete?.classList.add('active');});
upload?.addEventListener('click',()=>upload.classList.add('show-nagano'));
createBtn?.addEventListener('click',()=>{
  const buddyName=document.getElementById('buddyName')?.value.trim()||'Nagano';
  const yourName=document.getElementById('yourName')?.value.trim()||'Joyce';
  alert(`${buddyName} is ready to be your buddy, ${yourName}!`);
});
