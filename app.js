// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const PROMPTS = [
  {c:'gratitude',t:'What three small things today made your heart feel full, even if no one else noticed them?'},
  {c:'gratitude',t:'Describe a person whose quiet kindness has shaped who you are, without them ever knowing.'},
  {c:'gratitude',t:'What is something your body does for you every day that you have never once thanked it for?'},
  {c:'gratitude',t:'Write about a memory that, when you return to it, still feels like warm sunlight through leaves.'},
  {c:'gratitude',t:'What does your favourite place feel, smell, and sound like? Why are you grateful it exists?'},
  {c:'gratitude',t:'Name something difficult you have been through that quietly made you wiser or more compassionate.'},
  {c:'gratitude',t:'If you wrote a thank-you letter to your past year, what would you say to it?'},
  {c:'gratitude',t:'What is a small daily pleasure you would miss terribly if it disappeared tomorrow?'},
  {c:'dreams',t:'If you had one year free of obligations, what would you create, explore, or become?'},
  {c:'dreams',t:'What does the most beautiful version of your everyday life look like, in full, tender detail?'},
  {c:'dreams',t:'Write about a recurring dream, or one that stayed with you for days after waking.'},
  {c:'dreams',t:'What is a wish you have held so quietly for so long that you have almost stopped saying it out loud?'},
  {c:'dreams',t:'Describe where you want to be in five years — not your career, but how you feel inside your chest.'},
  {c:'dreams',t:'What is the wildest dream you once had? Is any thread of it still worth pulling on?'},
  {c:'dreams',t:'Write a scene from the most adventurous chapter of your future life.'},
  {c:'self',t:'What do people always come to you for? What does that quietly say about who you are?'},
  {c:'self',t:'What do you know now that your younger self desperately, urgently needed to hear?'},
  {c:'self',t:'Describe yourself as a season. What is the weather like inside you today?'},
  {c:'self',t:'What does your inner critic say most often? And what would your wisest, kindest self reply?'},
  {c:'self',t:'What are three things you are in the slow and tender process of becoming?'},
  {c:'self',t:'When did you feel most fully, effortlessly like yourself? What were you doing? Who were you with?'},
  {c:'self',t:'What is something you have forgiven yourself for that you have never written down?'},
  {c:'self',t:'If you were a tree in a forest, what kind would you be, and what would grow in your shade?'},
  {c:'creative',t:'Write the opening paragraph of a novel that begins with the last thing you touched today.'},
  {c:'creative',t:'Imagine your life as a film. What scene is playing right now, and what is the soundtrack?'},
  {c:'creative',t:'Write a letter from your future self, five years from now, back to today.'},
  {c:'creative',t:'Invent a small magical creature who lives in your home. What does it guard or watch over?'},
  {c:'creative',t:'Describe the colour of a feeling you cannot name. Then give it a word of your own.'},
  {c:'creative',t:'If your life were a jungle, what is thriving? What is tangled? What is waiting for rain?'},
  {c:'creative',t:'Write the mythology of a place you love — turn it into legend.'},
  {c:'creative',t:'A langoor has been secretly watching you for a week. Write what it observed in its tiny diary.'},
  {c:'nature',t:'When did you last notice something beautiful in nature? Describe it as if writing to someone who will never see it.'},
  {c:'nature',t:'What season feels most like your soul right now, and why?'},
  {c:'nature',t:'Imagine you are a tree. Where are your roots? How high do your branches reach? What storms have you survived?'},
  {c:'nature',t:'Write about a time you felt completely at peace outdoors. What made that moment feel almost sacred?'},
  {c:'nature',t:'If you could live as any animal for a single day, what would you experience and notice?'},
  {c:'nature',t:'Describe the last time rain, wind, or sunlight surprised you with its beauty.'},
  {c:'nature',t:'The forest holds its breath before a storm. What are you holding your breath before?'},
  {c:'letters',t:'Write to someone you miss. Tell them one true thing you forgot to say when they were still here.'},
  {c:'letters',t:'Write a letter to your past self at a moment when they needed courage they did not yet have.'},
  {c:'letters',t:'Write to someone who changed your life — they may not even know the full extent of it.'},
  {c:'letters',t:'Write a letter to someone you have forgiven, or are quietly learning to forgive.'},
  {c:'letters',t:'Write to your future self on a day when everything will have turned out okay.'},
  {c:'letters',t:'Write a love letter to a place that holds your happiest memory.'},
  {c:'letters',t:'Write a letter to a younger version of someone you love deeply.'},
  {c:'letters',t:'Write to a version of yourself that almost gave up. Tell them what happened next.'},
];

const QUOTES = [
  {t:'Fill your paper with the breathings of your heart.',a:'— William Wordsworth'},
  {t:'Write hard and clear about what hurts.',a:'— Ernest Hemingway'},
  {t:'There is no greater agony than bearing an untold story inside you.',a:'— Maya Angelou'},
  {t:'A journal is your completely unaltered voice.',a:'— Lucy Dacus'},
  {t:'In the journal I do not just express myself more openly — I create myself.',a:'— Susan Sontag'},
  {t:'Writing is the painting of the voice.',a:'— Voltaire'},
  {t:'To write is to descend, to excavate, to go underground.',a:'— Anaïs Nin'},
  {t:'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',a:'— Sylvia Plath'},
  {t:'You must stay drunk on writing so reality cannot destroy you.',a:'— Ray Bradbury'},
  {t:'One must always be careful of bookshelves, and think of the lives you might be leaving behind.',a:'— Cassandra Clare'},
];

const OPENINGS = [
  'I have been carrying this thought like a stone in my pocket, and I think it is time I gave it to you…',
  'There are things I say easily out loud and things that only come to me when I write. This is one of the second kind…',
  'If I could sit across from you with chai and an afternoon to spare, I would tell you…',
  'I have been meaning to write this for months. Maybe years. Today finally feels like the day.',
  'Before I lose my nerve: I want you to know something.',
  'The thing about you is — and I have thought about this more than you know —',
  'I am writing because some feelings do not fit in a text message. This one needs paper.',
  'I do not know if you know how much you have mattered. So I am telling you now.',
  'There is a version of this conversation I have had in my head a hundred times. Here it finally is, on paper.',
  'I have been watching the way sunlight moves and thinking of you.',
];

const CAT_META = {
  gratitude:{label:'🌺 Gratitude'},
  dreams:{label:'🌙 Dreams'},
  self:{label:'🦋 Self'},
  creative:{label:'✨ Creative'},
  nature:{label:'🌿 Nature'},
  letters:{label:'✉ Letters'},
};

// ═══════════════════════════════════════
// SEASONS
// ═══════════════════════════════════════
// Based on South Asian (Punjab) seasonal calendar
const SEASONS = {
  spring: {
    label: '🌸 Spring',
    floats: ['🌸','🌺','🌷','🌼','🦋','🌱','🌸','🌹','🍀','🌸','🌺','🌻'],
    speed: [10, 14],   // fast & light
    size:  [0.7, 1.4],
    count: 20,
    overlay: 'radial-gradient(ellipse 70% 50% at 30% 5%, rgba(255,182,193,0.1) 0%,transparent 60%), radial-gradient(ellipse 50% 40% at 80% 95%, rgba(144,238,144,0.07) 0%,transparent 50%)',
  },
  summer: {
    label: '☀️ Summer',
    floats: ['🌻','🌴','🌿','🍃','🌺','🌾','🎋','🌵','🌼','🌿','🍃','🌴'],
    speed: [18, 22],   // slow & lush
    size:  [1.0, 2.0],
    count: 14,
    overlay: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,0,0.07) 0%,transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(34,139,34,0.07) 0%,transparent 50%)',
  },
  autumn: {
    label: '🍂 Autumn',
    floats: ['🍂','🍁','🍃','🌾','🍄','🍂','🍁','🌿','🍂','🍁','🌾','🍃'],
    speed: [7, 20],    // variable — some drift, some tumble
    size:  [0.8, 1.8],
    count: 22,
    overlay: 'radial-gradient(ellipse 70% 50% at 60% 0%, rgba(205,133,63,0.11) 0%,transparent 60%), radial-gradient(ellipse 50% 40% at 90% 70%, rgba(178,34,34,0.07) 0%,transparent 50%)',
  },
  winter: {
    label: '❄️ Winter',
    floats: ['❄️','✨','💫','⭐','🌟','🌙','❄️','🌨️','✨','❄️','💫','⭐'],
    speed: [20, 28],   // very slow drift
    size:  [0.5, 1.1],
    count: 12,
    overlay: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(173,216,230,0.1) 0%,transparent 60%), radial-gradient(ellipse 60% 50% at 30% 100%, rgba(176,196,222,0.09) 0%,transparent 50%)',
  },
};

function getSeason(){
  const m = new Date().getMonth() + 1; // 1–12
  if(m >= 2 && m <= 4) return 'spring';
  if(m >= 5 && m <= 8) return 'summer';
  if(m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

// ═══════════════════════════════════════
// LETTER TEMPLATES
// ═══════════════════════════════════════
const LETTER_TEMPLATES = [
  {
    icon:'💌', name:'Love Letter',
    subject:'Something I have been meaning to say',
    body:`There are words I have practised a hundred times in my head and lost every single time I tried to say them aloud. So here they are, on paper, where they cannot run away.\n\nThe truth is, you have become one of the constants I did not know I was looking for. Not loud or sudden — just quietly, steadily there. And I think that is the rarest kind of thing.\n\nI am writing this because you deserve to know it, even if I never quite find the courage to hand it to you.`,
  },
  {
    icon:'🙏', name:'Thank You',
    subject:'A thank you that is long overdue',
    body:`I have been carrying this gratitude around for a while now, and it has started to feel wrong not to put it somewhere you can actually read it.\n\nWhat you did — or perhaps just who you are — made a difference that I suspect you do not fully know about. It shifted something. The kind of shift you only notice later, when you are somewhere better and you trace back the path.\n\nSo, simply: thank you. For real, and for more than you know.`,
  },
  {
    icon:'💔', name:'Apology',
    subject:'Something I should have said sooner',
    body:`I have written this letter several times in my head and talked myself out of sending it each time. But I think that is exactly why I need to send it.\n\nI am sorry. Not the kind of sorry that is really just hoping you will say it is fine — but the kind that sits quietly in your chest and knows it was wrong without needing to be told.\n\nI do not expect anything from this. I just needed you to have it.`,
  },
  {
    icon:'🌟', name:'To My Future Self',
    subject:'From the person you used to be',
    body:`Hello. I am writing from a moment that feels uncertain, a little crowded, and occasionally beautiful — which I suppose is just what living feels like.\n\nI do not know what has happened by the time you read this. I hope some of the things I am worrying about turned out to be smaller than they looked. I hope you are a little softer, and a little braver, and that you still notice the same small things that make you feel like yourself.\n\nBe kind to whoever you have become. They have earned it.`,
  },
  {
    icon:'🕰️', name:'To My Past Self',
    subject:'What I wish you had known',
    body:`You are in a chapter that feels very permanent. I want you to know that it is not — not the hard parts, and not the good parts either. All of it moves.\n\nThe things you are afraid of mostly do not happen. And the things that do happen, you handle — imperfectly, humanly, but you handle them.\n\nYou are allowed to be uncertain. You are allowed to change your mind. You are, in fact, doing better than you think.`,
  },
  {
    icon:'🌸', name:'Someone I Miss',
    subject:'I have been thinking of you',
    body:`I thought of you today. Not for any particular reason — just the way you sometimes surface in ordinary moments, like a song you did not know you remembered.\n\nI miss the specific weight of being around you. The way conversations went nowhere important and felt important anyway.\n\nI hope wherever you are, life is treating you gently. You always deserved gentleness, even when you did not ask for it.`,
  },
  {
    icon:'🎉', name:'Congratulations',
    subject:'You did it — and I mean that',
    body:`I want to say this properly, because I think congratulations often get said quickly and forgotten just as fast.\n\nWhat you did took something real. Not just talent or luck, but the particular kind of stubbornness that keeps going when going is hard. I have watched that in you, and I want you to know it has not gone unnoticed.\n\nCelebrate this. Fully. You have earned the right to be proud without apology.`,
  },
];


let mood='', promptIdx=0, entries=[], activeCat='all';

// ═══════════════════════════════════════
// STORAGE HELPERS
// ═══════════════════════════════════════
const LS = {
  ENTRIES:    'langoor-entries',
  DRAFT:      'langoor-journal-draft',
  LETTER:     'langoor-letter-draft',
  DRAFTS:     'langoor-letter-drafts',
  FONT:       'langoor-font',
  THEME:      'langoor-theme',
  WATER:      'langoor-water',
  WATER_HIST: 'langoor-water-hist',
  MEDS:       'langoor-meds',
  MEDS_LOG:   'langoor-meds-log',
  RECAP:      'langoor-recap-seen',
};

function persistEntries(){
  try{ localStorage.setItem(LS.ENTRIES, JSON.stringify(entries)); }catch(e){}
}
function persistDraft(){
  try{ localStorage.setItem(LS.DRAFT, document.getElementById('journalText').value); }catch(e){}
}
function persistLetter(){
  try{
    localStorage.setItem(LS.LETTER, JSON.stringify({
      to:      document.getElementById('lTo').value,
      from:    document.getElementById('lFrom').value,
      subject: document.getElementById('lSubject').value,
      body:    document.getElementById('lBody').value,
    }));
  }catch(e){}
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
function init(){
  // ── Restore theme first (before paint) ──
  const savedTheme = localStorage.getItem(LS.THEME)||'daylight';
  setTheme(savedTheme, false);

  const now=new Date();
  document.getElementById('headerDate').textContent=
    now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).toUpperCase();

  const q=QUOTES[now.getDate()%QUOTES.length];
  document.getElementById('dqText').textContent='\u201C'+q.t+'\u201D';
  document.getElementById('dqAuthor').textContent=q.a;

  promptIdx=Math.floor(Math.random()*PROMPTS.length);
  document.getElementById('journalPrompt').textContent=PROMPTS[promptIdx].t;

  // ── Restore entries ──
  try{ entries=JSON.parse(localStorage.getItem(LS.ENTRIES)||'[]'); }catch(e){ entries=[]; }
  updateStats();
  checkOnThisDay();
  checkWeeklyRecap();

  // ── Restore in-progress journal draft ──
  const savedDraft = localStorage.getItem(LS.DRAFT)||'';
  if(savedDraft){
    document.getElementById('journalText').value=savedDraft;
    countWords('journalText','jwc');
  }

  // ── Restore letter draft ──
  try{
    const ld=JSON.parse(localStorage.getItem(LS.LETTER)||'{}');
    if(ld.to)      document.getElementById('lTo').value=ld.to;
    if(ld.from)    document.getElementById('lFrom').value=ld.from;
    if(ld.subject) document.getElementById('lSubject').value=ld.subject;
    if(ld.body){   document.getElementById('lBody').value=ld.body; countWords('lBody','lwc'); }
  }catch(e){}

  // ── Restore font ──
  const savedFont = localStorage.getItem(LS.FONT)||'Lora';
  applyFont(savedFont, false);

  renderGrid('all');
  newSuggestion();
  spawnBotanicals();
  renderArchive();
  loadLetterDrafts();
  loadWater();
  loadMeds();

  // ── Auto-save listeners ──
  document.getElementById('journalText').addEventListener('input', ()=>{ countWords('journalText','jwc'); persistDraft(); });
  document.getElementById('lBody').addEventListener('input',    ()=>{ countWords('lBody','lwc'); persistLetter(); });
  document.getElementById('lTo').addEventListener('input',      persistLetter);
  document.getElementById('lFrom').addEventListener('input',    persistLetter);
  document.getElementById('lSubject').addEventListener('input', persistLetter);

  // Ink effect (after DOM is ready)
  initInkEffect();
}

// ═══════════════════════════════════════
// INK EFFECT
// ═══════════════════════════════════════
function initInkEffect(){
  const ta = document.getElementById('journalText');

  // Wrap textarea so canvas can sit on top
  const wrap = document.createElement('div');
  wrap.className = 'ink-wrap';
  ta.parentNode.insertBefore(wrap, ta);
  wrap.appendChild(ta);

  const canvas = document.createElement('canvas');
  canvas.id = 'inkCanvas';
  wrap.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // ── Mirror div: hidden clone that lets us measure real caret position ──
  // This handles word-wrap correctly, unlike counting \n characters.
  const mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden','true');
  mirror.style.cssText=[
    'position:absolute','top:0','left:-9999px',
    'visibility:hidden','pointer-events:none',
    'white-space:pre-wrap','word-break:break-word',
    'overflow-wrap:break-word','overflow:hidden',
  ].join(';');
  document.body.appendChild(mirror);

  // Copy all layout-affecting styles from textarea → mirror
  function syncMirror(){
    const s = getComputedStyle(ta);
    [
      'fontFamily','fontSize','fontWeight','fontStyle','lineHeight',
      'letterSpacing','textIndent','paddingTop','paddingRight',
      'paddingBottom','paddingLeft','borderTopWidth','borderRightWidth',
      'borderBottomWidth','borderLeftWidth','boxSizing',
    ].forEach(p => { mirror.style[p] = s[p]; });
    mirror.style.width = ta.clientWidth + 'px';
  }

  // Accurate caret {x, y} — works on every line including word-wrapped ones
  function caretCoords(){
    syncMirror();
    const pos = ta.selectionStart ?? ta.value.length;
    mirror.textContent = ta.value.substring(0, pos);
    const sentinel = document.createElement('span');
    sentinel.textContent = '\u200B';
    mirror.appendChild(sentinel);
    const rawY = sentinel.offsetTop  + sentinel.offsetHeight * 0.5 - ta.scrollTop;
    const rawX = sentinel.offsetLeft + sentinel.offsetWidth  * 0.5;
    return {
      x: Math.max(4, Math.min(rawX, ta.clientWidth  - 4)),
      y: Math.max(4, Math.min(rawY, ta.clientHeight - 4)),
    };
  }

  // Resize canvas to match textarea pixels (HiDPI-aware)
  function resize(){
    const r   = ta.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = r.width  * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Ink colour per theme
  function inkRGB(){
    const t = document.documentElement.getAttribute('data-theme')||'';
    if(t==='night') return '106,174,110';
    if(t==='sepia') return '122,80,40';
    return '42,26,8';
  }

  let drops = [], animId = null;

  function spawnDrop(){
    const {x, y} = caretCoords();
    const col     = inkRGB();

    // Main bloom — tight scatter around actual cursor X
    drops.push({
      x: x + (Math.random()-.5)*10,
      y: y + (Math.random()-.5)*6,
      r:0, maxR:1.8+Math.random()*3.5,
      alpha:0.5+Math.random()*0.25, col, spd:0.9+Math.random()*0.7,
    });
    // Micro-satellite specks — also near cursor, not scattered across the line
    for(let i=0; i<2+Math.floor(Math.random()*2); i++){
      drops.push({
        x: x + (Math.random()-.5)*18,
        y: y + (Math.random()-.5)*10,
        r:0, maxR:0.4+Math.random()*1.6,
        alpha:0.2+Math.random()*0.2, col, spd:0.35+Math.random()*0.45,
      });
    }
    if(!animId) tick();
  }

  function tick(){
    const r = ta.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    drops = drops.filter(d => d.alpha > 0.004);
    for(const d of drops){
      if(d.r < d.maxR) d.r += d.spd;
      d.alpha *= 0.87;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${d.col},${d.alpha.toFixed(3)})`;
      ctx.fill();
    }
    animId = drops.length ? requestAnimationFrame(tick) : null;
  }

  ta.addEventListener('scroll', ()=>{ drops=[]; ctx.clearRect(0,0,canvas.width,canvas.height); });
  ta.addEventListener('keydown', e=>{
    if(e.key.length===1 || e.key==='Enter' || e.key==='Backspace') spawnDrop();
  });

  resize();
  window.addEventListener('resize', resize);
  new ResizeObserver(resize).observe(ta);
}

// ═══════════════════════════════════════
// STREAK CALCULATION
// ═══════════════════════════════════════
const MILESTONES = [3,7,14,21,30,50,100];

function dayKey(ts){
  const d = new Date(ts);
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function calcStreak(){
  if(!entries.length) return {current:0, best:0};

  // Unique sorted day keys, newest first
  const days = [...new Set(entries.map(e=>dayKey(e.ts)))].sort().reverse();

  const todayKey    = dayKey(Date.now());
  const yestKey     = dayKey(Date.now()-86400000);

  // Streak must include today or yesterday to be "active"
  if(days[0]!==todayKey && days[0]!==yestKey) return {current:0, best:calcBest(days)};

  let current=1;
  for(let i=1;i<days.length;i++){
    const a=new Date(days[i-1]), b=new Date(days[i]);
    if((a-b)===86400000) current++;
    else break;
  }
  return {current, best:Math.max(current, calcBest(days))};
}

function calcBest(days){
  if(!days.length) return 0;
  let best=1, cur=1;
  for(let i=1;i<days.length;i++){
    const a=new Date(days[i-1]), b=new Date(days[i]);
    if((a-b)===86400000){ cur++; if(cur>best) best=cur; }
    else cur=1;
  }
  return best;
}

function updateStats(prevStreak){
  const {current, best} = calcStreak();
  document.getElementById('streakCurrent').textContent = current;
  document.getElementById('streakBest').textContent    = best;
  document.getElementById('streakTotal').textContent   = entries.length;

  // Milestone celebration
  if(prevStreak!==undefined && current > prevStreak && MILESTONES.includes(current)){
    celebrateMilestone(current);
  }
  return current;
}

function celebrateMilestone(days){
  const msgs = {
    3:  ['🌱','Three days strong!','The roots are taking hold.'],
    7:  ['🌿','One whole week!','You showed up every single day.'],
    14: ['🌳','Two weeks of writing!','You\'re growing into something beautiful.'],
    21: ['🌺','21 days! A habit is born.','This is who you are now.'],
    30: ['🔥','A whole month!','You are truly a scribe of the treetops.'],
    50: ['⭐','50 days of words!','The pages remember everything.'],
   100: ['🏆','One hundred days.','Langooric legend. The forest applauds.'],
  };
  const [emoji, msg, sub] = msgs[days]||['✨',days+' day streak!','Keep going.'];
  document.getElementById('milestoneEmoji').textContent = emoji;
  document.getElementById('milestoneMsg').textContent   = msg;
  document.getElementById('milestoneSub').textContent   = sub;
  const el = document.getElementById('milestonePop');
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 4200);
}

// ═══════════════════════════════════════
// BOTANICALS (SEASONAL)
// ═══════════════════════════════════════
function spawnBotanicals(){
  const season = getSeason();
  const s      = SEASONS[season];
  const wrap   = document.getElementById('bg-botanicals');
  wrap.innerHTML = '';

  // Set seasonal overlay gradient
  document.getElementById('seasonal-overlay').style.background = s.overlay;

  // Set season attribute for CSS tweaks
  document.documentElement.setAttribute('data-season', season);

  // Set seasonal badge in header
  document.getElementById('seasonalBadge').textContent = s.label;

  // Spawn floats
  for(let i = 0; i < s.count; i++){
    const el = document.createElement('div');
    el.className = 'float-leaf';
    el.textContent = s.floats[Math.floor(Math.random() * s.floats.length)];
    el.style.left   = Math.random() * 100 + '%';
    el.style.fontSize = (s.size[0] + Math.random() * s.size[1]) + 'rem';
    el.style.animationDuration = (s.speed[0] + Math.random() * s.speed[1]) + 's';
    el.style.animationDelay    = (-Math.random() * 42) + 's';
    wrap.appendChild(el);
  }
}

// ═══════════════════════════════════════
// TABS
// ═══════════════════════════════════════
function switchTab(name){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('section-'+name).classList.add('active');
  document.getElementById('tnav-'+name).classList.add('active');
  if(name==='archive') filterArchive();
  if(name==='water')   renderWater();
  if(name==='meds')    renderMeds();
}

// ═══════════════════════════════════════
// PROMPTS
// ═══════════════════════════════════════
function nextPrompt(){
  const el=document.getElementById('journalPrompt');
  el.style.opacity='0';
  setTimeout(()=>{
    promptIdx=(promptIdx+1)%PROMPTS.length;
    el.textContent=PROMPTS[promptIdx].t;
    el.style.opacity='1';
  },200);
}

function renderGrid(cat){
  const grid=document.getElementById('promptGrid');
  const list=cat==='all'?PROMPTS:PROMPTS.filter(p=>p.c===cat);
  grid.innerHTML=list.map(p=>`
    <div class="prompt-card" onclick="usePrompt(${JSON.stringify(p.t)})">
      <div class="pc-cat">${CAT_META[p.c]?.label||p.c}</div>
      ${p.t}
    </div>
  `).join('');
}

function filterCat(cat,btn){
  activeCat=cat;
  document.querySelectorAll('.cat-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid(cat);
}

function usePrompt(text){
  const el=document.getElementById('journalPrompt');
  el.style.opacity='0';
  setTimeout(()=>{el.textContent=text;el.style.opacity='1';},180);
  switchTab('journal');
  setTimeout(()=>document.getElementById('journalText').focus(),350);
  toast('🌿 Prompt ready — start writing!');
}

// ═══════════════════════════════════════
// THEME SWITCHER
// ═══════════════════════════════════════
function setTheme(name, save=true){
  document.documentElement.setAttribute('data-theme', name==='daylight' ? '' : name);
  document.querySelectorAll('.theme-dot').forEach(b=>{
    b.classList.toggle('active', b.dataset.theme===name);
  });
  if(save) try{ localStorage.setItem(LS.THEME, name); }catch(e){}
}

// ═══════════════════════════════════════
// FONT PICKER
// ═══════════════════════════════════════
function setFont(btn){
  applyFont(btn.dataset.font, true);
}

function applyFont(fontName, save){
  const ta = document.getElementById('journalText');
  ta.style.fontFamily = `'${fontName}', serif`;

  // Update active button state
  document.querySelectorAll('.font-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.font===fontName);
  });

  // Adjust size for display fonts
  const bigFonts = ['Crimson Text','IM Fell English'];
  ta.style.fontSize = bigFonts.includes(fontName) ? '1.1rem' : '0.97rem';

  if(save) try{ localStorage.setItem(LS.FONT, fontName); }catch(e){}
}

// ═══════════════════════════════════════
// MOOD
// ═══════════════════════════════════════
function pickMood(btn){
  document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  mood=btn.dataset.mood;
}

// ═══════════════════════════════════════
// WORD COUNT
// ═══════════════════════════════════════
function countWords(srcId,outId){
  const txt=document.getElementById(srcId).value.trim();
  const n=txt?txt.split(/\s+/).length:0;
  document.getElementById(outId).textContent=n+(n===1?' word':' words');
}

// ═══════════════════════════════════════
// JOURNAL
// ═══════════════════════════════════════
function saveEntry(){
  const text=document.getElementById('journalText').value.trim();
  if(!text){toast('✏️ Write something first!');return;}
  const prevStreak = calcStreak().current;
  entries.unshift({
    date:new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}),
    prompt:document.getElementById('journalPrompt').textContent,
    text, mood, tags:[...currentTags], ts:Date.now()
  });
  persistEntries();
  try{ localStorage.removeItem(LS.DRAFT); }catch(e){}
  updateStats(prevStreak);
  // Clear tags after save
  currentTags = [];
  renderCurrentTags();
  document.getElementById('tagInput').value = '';
  toast('🌿 Entry saved to your Scriptures!');
}

function clearJournal(){
  if(document.getElementById('journalText').value&&!confirm('Clear this entry?'))return;
  document.getElementById('journalText').value='';
  countWords('journalText','jwc');
  try{ localStorage.removeItem(LS.DRAFT); }catch(e){}
}

function downloadJournal(){
  const text=document.getElementById('journalText').value.trim();
  if(!text){toast('✏️ Nothing to download yet.');return;}
  const prompt=document.getElementById('journalPrompt').textContent;
  const date=new Date().toLocaleDateString();
  dl('Langooric Scriptures — Entry\n'+date+'\n\nPrompt:\n'+prompt+'\n\n'+text,'langooric-entry-'+Date.now()+'.txt');
  toast('⬇ Entry downloaded!');
}

// ═══════════════════════════════════════
// ARCHIVE
// ═══════════════════════════════════════
let activeTagFilters = new Set();

function renderArchive(list){
  const pool = list || entries;
  const el   = document.getElementById('archiveList');

  if(!entries.length){
    el.innerHTML='<div class="empty-state">Your entries will gather here, like leaves in a favourite tree.<br><br>Save your first page to begin. 🌴</div>';
    renderTagFilters(); return;
  }
  if(!pool.length){
    el.innerHTML='<div class="empty-state" style="padding:1.5rem;">No entries match your search. 🔍</div>';
    renderTagFilters(); return;
  }

  const q = (document.getElementById('searchInput')?.value||'').trim().toLowerCase();

  el.innerHTML = pool.map((e,i)=>{
    const realIdx = entries.indexOf(e);
    const preview = q ? highlightText(e.text.slice(0,120), q) : e.text.slice(0,120);
    const tagsHTML = (e.tags||[]).length
      ? `<div class="arch-entry-tags">${(e.tags||[]).map(t=>`<span class="arch-tag">#${t}</span>`).join('')}</div>`
      : '';
    return `
    <div class="arch-entry" style="display:flex;align-items:flex-start;gap:0.8rem;">
      <div style="flex:1;min-width:0;cursor:pointer;" onclick="loadEntry(${realIdx})">
        <div class="arch-date">${e.mood||'🌿'} &nbsp;${e.date}</div>
        <div class="arch-preview">${preview}${e.text.length>120?'…':''}</div>
        ${tagsHTML}
      </div>
      <button onclick="deleteEntry(event,${realIdx})" title="Delete"
        style="background:none;border:none;cursor:pointer;color:var(--bark-light);opacity:0.4;
               font-size:1rem;padding:0.2rem 0.3rem;flex-shrink:0;transition:opacity 0.2s;margin-top:0.1rem;"
        onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0.4'">✕</button>
    </div>`;
  }).join('');

  renderTagFilters();
}

function deleteEntry(event,i){
  event.stopPropagation();
  if(!confirm('Delete this entry? This cannot be undone.'))return;
  entries.splice(i,1);
  persistEntries();
  updateStats();
  filterArchive();
  toast('🍂 Entry removed.');
}

function loadEntry(i){
  const e=entries[i];
  document.getElementById('journalPrompt').textContent=e.prompt;
  document.getElementById('journalText').value=e.text;
  countWords('journalText','jwc');
  // Restore tags
  currentTags = [...(e.tags||[])];
  renderCurrentTags();
  switchTab('journal');
  toast('📖 Entry loaded');
}

// ═══════════════════════════════════════
// TAG INPUT
// ═══════════════════════════════════════
let currentTags = [];

function handleTagKey(e){
  if(e.key === 'Enter' || e.key === ','){
    e.preventDefault();
    const raw = e.target.value.trim().replace(/^#/, '').replace(/,/g,'').toLowerCase();
    if(raw) addTag(raw);
    e.target.value = '';
  }
}

function addTag(raw){
  const tag = raw.trim().toLowerCase().replace(/[^a-z0-9\-_]/g,'');
  if(!tag || currentTags.includes(tag) || currentTags.length >= 8) return;
  currentTags.push(tag);
  renderCurrentTags();
}

function removeTagFromInput(idx){
  currentTags.splice(idx, 1);
  renderCurrentTags();
}

function renderCurrentTags(){
  const el = document.getElementById('currentTagPills');
  if(!el) return;
  el.innerHTML = currentTags.map((t,i)=>
    `<span class="tag-pill">#${t}<button class="tag-pill-remove" onclick="removeTagFromInput(${i})">✕</button></span>`
  ).join('');
}

// ═══════════════════════════════════════
// SEARCH & TAG FILTER
// ═══════════════════════════════════════
function filterArchive(){
  const q    = document.getElementById('searchInput').value.trim().toLowerCase();
  const clear = document.getElementById('searchClear');
  const info  = document.getElementById('searchInfo');

  clear.style.display = q ? 'block' : 'none';

  let pool = entries;

  // Filter by active tag filters (OR — entry must have at least one selected tag)
  if(activeTagFilters.size){
    pool = pool.filter(e =>
      (e.tags||[]).some(t => activeTagFilters.has(t))
    );
  }

  // Filter by search query
  if(q){
    pool = pool.filter(e =>
      e.text.toLowerCase().includes(q)         ||
      (e.prompt||'').toLowerCase().includes(q) ||
      (e.tags||[]).some(t => t.includes(q))
    );
  }

  // Show info bar
  if(q || activeTagFilters.size){
    info.style.display = 'block';
    const tagNote = activeTagFilters.size ? ` · tags: ${[...activeTagFilters].map(t=>'#'+t).join(', ')}` : '';
    info.textContent = `${pool.length} of ${entries.length} entries${q ? ` matching "${q}"` : ''}${tagNote}`;
  } else {
    info.style.display = 'none';
  }

  renderArchive(pool.length < entries.length ? pool : undefined);
}

function clearSearch(){
  document.getElementById('searchInput').value = '';
  activeTagFilters.clear();
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('searchInfo').style.display  = 'none';
  renderTagFilters();
  renderArchive();
}

function highlightText(text, q){
  if(!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return text.replace(new RegExp(escaped,'gi'),
    m=>`<mark style="background:rgba(192,144,48,0.3);border-radius:2px;padding:0 1px;">${m}</mark>`
  );
}

function getUniqueTags(){
  const all = new Set();
  entries.forEach(e => (e.tags||[]).forEach(t => all.add(t)));
  return [...all].sort();
}

function renderTagFilters(){
  const wrap = document.getElementById('tagFilterWrap');
  if(!wrap) return;
  const tags = getUniqueTags();
  if(!tags.length){ wrap.innerHTML=''; return; }

  wrap.innerHTML = tags.map(t=>`
    <button class="tag-filter-pill ${activeTagFilters.has(t)?'active':''}"
      onclick="toggleTagFilter('${t}')">
      #${t}
    </button>`
  ).join('');
}

function toggleTagFilter(tag){
  if(activeTagFilters.has(tag)) activeTagFilters.delete(tag);
  else activeTagFilters.add(tag);
  filterArchive();
}

// ═══════════════════════════════════════
// ON THIS DAY
// ═══════════════════════════════════════
let otdEntry = null;

function checkOnThisDay(){
  const now      = new Date();
  const thisMonth = now.getMonth();
  const thisDay   = now.getDate();
  const todayKey  = dayKey(Date.now());

  // Find entries on same month+day but NOT today
  const matches = entries.filter(e=>{
    const d = new Date(e.ts);
    return d.getMonth()===thisMonth && d.getDate()===thisDay && dayKey(e.ts)!==todayKey;
  });

  const card = document.getElementById('otdCard');
  if(!matches.length){ card.style.display='none'; return; }

  otdEntry = matches[0];
  const d   = new Date(otdEntry.ts);
  const ago = now.getFullYear() - d.getFullYear();
  const agoStr = ago===0 ? 'earlier this year'
               : ago===1 ? 'one year ago'
               : `${ago} years ago`;

  const preview = otdEntry.text.length > 160
    ? otdEntry.text.slice(0,160).trimEnd() + '…'
    : otdEntry.text;

  document.getElementById('otdText').textContent = preview;
  document.getElementById('otdMeta').textContent =
    `${otdEntry.mood||'🌿'} ${d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})} · ${agoStr}`;

  card.style.display='block';
}

function otdClick(){
  if(!otdEntry) return;
  const i = entries.indexOf(otdEntry);
  if(i>=0) loadEntry(i);
}

// ═══════════════════════════════════════
// WORD CLOUD
// ═══════════════════════════════════════
let wordCloudOpen = false;

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','is','are','was','were','be','been','being',
  'have','has','had','do','does','did','will','would','could','should','may',
  'might','shall','can','i','me','my','we','our','you','your','he','him','his',
  'she','her','it','its','they','them','their','what','which','who','this',
  'that','these','those','am','not','no','so','if','as','at','by','for','with',
  'about','of','to','from','up','in','out','on','into','then','just','very',
  'also','even','still','only','more','all','one','when','where','there','here',
  'some','any','than','too','how','get','like','know','think','feel','felt','got',
  'went','said','want','wanted','need','needed','because','though','through',
  'over','now','back','time','day','way','see','seen','come','came','go','well',
  'make','made','take','took','every','never','always','often','much','many',
  'most','after','before','being','own','little','something','someone','around',
]);

function toggleWordCloud(){
  wordCloudOpen=!wordCloudOpen;
  const wrap  =document.getElementById('wordCloudWrap');
  const toggle=document.getElementById('wordCloudToggle');
  wrap.style.display=wordCloudOpen?'block':'none';
  toggle.textContent=(wordCloudOpen?'▴ ':'☁️ ')+'Word Cloud';
  if(wordCloudOpen) renderWordCloud();
}

function renderWordCloud(){
  const el = document.getElementById('wordCloudEl');
  if(!entries.length){
    el.innerHTML='<p class="mc-empty">Write some entries first to see your word cloud.</p>';
    return;
  }

  const freq={};
  entries.forEach(e=>{
    (e.text||'').toLowerCase()
      .replace(/[^a-z\s'-]/g,' ')
      .split(/\s+/)
      .forEach(w=>{
        w=w.replace(/^[-']+|[-']+$/g,'');
        if(w.length>3 && !STOP_WORDS.has(w)) freq[w]=(freq[w]||0)+1;
      });
  });

  const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,55);
  if(!sorted.length){
    el.innerHTML='<p class="mc-empty">Keep writing — your most-used words will appear here!</p>';
    return;
  }

  const maxF  = sorted[0][1];
  const colors= ['var(--forest)','var(--bark)','var(--fig)','var(--gold)','var(--forest-mid)','var(--bark-light)','var(--lavender)'];

  // Shuffle so common words don't always cluster at the start
  const shuffled=[...sorted].sort(()=>Math.random()-0.5);

  el.innerHTML=shuffled.map(([word,count],i)=>{
    const size   = 0.72 + (count/maxF)*1.85;
    const opacity= 0.45 + (count/maxF)*0.55;
    const color  = colors[i%colors.length];
    const weight = count/maxF > 0.6 ? '600' : '400';
    return `<span class="wc-word" style="font-size:${size.toFixed(2)}rem;color:${color};opacity:${opacity};font-weight:${weight};" title="${count} time${count===1?'':'s'}">${word}</span>`;
  }).join('');
}

// ═══════════════════════════════════════
// RANDOM MEMORY
// ═══════════════════════════════════════
function randomMemory(){
  if(!entries.length){ toast('📖 Write some entries first!'); return; }

  const i = Math.floor(Math.random()*entries.length);
  const e = entries[i];
  const bodyHTML = e.text.split('\n').map(l=>
    `<p style="margin-bottom:0.75rem;line-height:1.85;">${l||'&nbsp;'}</p>`
  ).join('');

  document.getElementById('previewContent').innerHTML=`
    <div style="font-family:'Dancing Script',cursive;color:var(--gold);font-size:0.82rem;margin-bottom:0.3rem;letter-spacing:0.04em;">🎲 Random Memory</div>
    <div style="font-family:'Dancing Script',cursive;color:var(--bark-light);font-size:0.88rem;margin-bottom:1.4rem;opacity:0.8;">
      ${e.mood||'🌿'} &nbsp;${e.date}
    </div>
    ${e.prompt?`<div style="font-family:'Lora',serif;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-light);margin-bottom:1.2rem;font-style:italic;border-left:2px solid var(--forest-pale);padding-left:0.7rem;">${e.prompt}</div>`:''}
    <div style="font-family:'Lora',serif;font-size:0.95rem;color:var(--ink);">${bodyHTML}</div>
    <div style="display:flex;gap:0.65rem;margin-top:1.8rem;flex-wrap:wrap;">
      <button onclick="closeModal();loadEntry(${i})"
        style="background:var(--forest);color:var(--cream);border:none;padding:0.65rem 1.4rem;font-family:'Lora',serif;font-size:0.82rem;cursor:pointer;border-radius:1px;transition:opacity 0.2s;"
        onmouseenter="this.style.opacity='.85'" onmouseleave="this.style.opacity='1'">
        Open in Journal
      </button>
      <button onclick="randomMemory()"
        style="background:none;border:1px solid var(--bark-light);color:var(--bark-light);padding:0.65rem 1.4rem;font-family:'Dancing Script',cursive;font-size:0.9rem;cursor:pointer;border-radius:1px;transition:all 0.2s;"
        onmouseenter="this.style.background='var(--bark-light)';this.style.color='white'" onmouseleave="this.style.background='none';this.style.color='var(--bark-light)'">
        ✦ Another one
      </button>
    </div>
  `;
  document.getElementById('previewModal').classList.add('open');
}

// ═══════════════════════════════════════
// PRINT-READY VIEW
// ═══════════════════════════════════════
function printLetter(){
  const body = document.getElementById('lBody').value.trim();
  if(!body){ toast('✏️ Write your letter first!'); return; }

  const to      = document.getElementById('lTo').value      || 'Dearest Friend';
  const from    = document.getElementById('lFrom').value    || '';
  const subject = document.getElementById('lSubject').value || '';
  const date    = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const bodyHTML= body.split('\n').map(l=>
    `<p style="margin:0 0 .9em 0;line-height:1.9;">${l||'&nbsp;'}</p>`
  ).join('');

  const html=`<!DOCTYPE html><html><head>
<meta charset="UTF-8"><title>Letter — ${to}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;1,400&family=Dancing+Script:wght@500&display=swap" rel="stylesheet">
<style>
@page{margin:2.5cm 3cm;}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Lora',serif;color:#2A1A08;background:#fff;}
.wrap{max-width:580px;margin:0 auto;padding:2rem 0;}
.brand{display:flex;justify-content:space-between;align-items:center;font-family:'Dancing Script',cursive;font-size:.78rem;letter-spacing:.14em;color:#8B6550;opacity:.65;text-transform:uppercase;border-bottom:1px solid #E0C07A;padding-bottom:.6rem;margin-bottom:2.5rem;}
.subject{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#8B6550;margin-bottom:1.4rem;}
.salutation{font-family:'Playfair Display',serif;font-size:1.12rem;margin-bottom:1.5rem;}
.body{font-size:.96rem;}
.sig{font-family:'Playfair Display',serif;font-style:italic;font-size:1rem;margin-top:2.5rem;}
.footer{font-family:'Dancing Script',cursive;font-size:.72rem;color:#8B6550;text-align:center;margin-top:3rem;border-top:1px solid #E0C07A;padding-top:.6rem;opacity:.5;}
</style></head><body>
<div class="wrap">
  <div class="brand"><span>Langooric Scriptures</span><span>${date}</span></div>
  ${subject?`<div class="subject">${subject}</div>`:''}
  <div class="salutation">${to},</div>
  <div class="body">${bodyHTML}</div>
  <div class="sig">${from||'With love'}</div>
  <div class="footer">✦ &nbsp; written in the treetops, kept in the heart &nbsp; ✦</div>
</div>
<script>window.onload=()=>{window.focus();window.print();}<\/script>
</body></html>`;

  const win=window.open('','_blank','width=780,height=950');
  if(!win){ toast('⚠️ Allow pop-ups to use Print.'); return; }
  win.document.write(html);
  win.document.close();
}

// ═══════════════════════════════════════
// MOOD CHART
// ═══════════════════════════════════════
let moodChartOpen=false;

function toggleMoodChart(){
  moodChartOpen=!moodChartOpen;
  const wrap  =document.getElementById('moodChart');
  const toggle=document.getElementById('moodChartToggle');
  wrap.style.display=moodChartOpen?'block':'none';
  toggle.textContent=(moodChartOpen?'▴ ':'📊 ')+'Mood History';
  if(moodChartOpen) renderMoodChart();
}

function renderMoodChart(){
  const el=document.getElementById('moodChart');
  const withMood=entries.filter(e=>e.mood);
  if(!withMood.length){
    el.innerHTML='<p class="mc-empty">Select a mood on a few entries to see your history here.</p>';
    return;
  }
  const recent=withMood.slice(0,30).reverse();
  const timelineHTML=recent.map(e=>{
    const d=new Date(e.ts);
    return `<div class="mc-bubble" title="${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}">
      <span class="mc-emoji">${e.mood}</span>
      <span class="mc-day">${d.getDate()}</span>
    </div>`;
  }).join('');

  const freq={};
  withMood.forEach(e=>{freq[e.mood]=(freq[e.mood]||0)+1;});
  const maxFreq=Math.max(...Object.values(freq));
  const barsHTML=Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(([emoji,count])=>`
    <div class="mc-bar-row">
      <span class="mc-bar-emoji">${emoji}</span>
      <div class="mc-bar-track"><div class="mc-bar-fill" style="width:0%"data-w="${Math.round((count/maxFreq)*100)}"></div></div>
      <span class="mc-count">${count}×</span>
    </div>`).join('');

  el.innerHTML=`
    <span class="mc-label">Last ${recent.length} entries</span>
    <div class="mc-timeline">${timelineHTML}</div>
    <hr class="mc-divider">
    <span class="mc-label">Frequency</span>
    <div class="mc-bars">${barsHTML}</div>`;

  // Animate bars in
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    el.querySelectorAll('.mc-bar-fill').forEach(b=>{
      b.style.width=b.dataset.w+'%';
    });
  }));
}

// ═══════════════════════════════════════
// LETTER TEMPLATES
// ═══════════════════════════════════════
let templatesOpen = false;

function toggleTemplates(){
  templatesOpen = !templatesOpen;
  const grid   = document.getElementById('templatesGrid');
  const toggle = document.getElementById('templatesToggle');
  if(templatesOpen){
    renderTemplates();
    grid.style.display = 'grid';
    toggle.textContent = '✕ close templates';
  } else {
    grid.style.display = 'none';
    toggle.textContent = '✦ start from a template';
  }
}

function renderTemplates(){
  document.getElementById('templatesGrid').innerHTML =
    LETTER_TEMPLATES.map((t,i) => `
      <button class="template-card" onclick="useTemplate(${i})">
        <span class="tc-icon">${t.icon}</span>
        <span class="tc-name">${t.name}</span>
      </button>`
    ).join('');
}

function useTemplate(i){
  const t = LETTER_TEMPLATES[i];
  if(document.getElementById('lBody').value.trim()){
    if(!confirm('This will replace your current letter. Continue?')) return;
  }
  document.getElementById('lSubject').value = t.subject;
  document.getElementById('lBody').value    = t.body;
  countWords('lBody','lwc');
  persistLetter();
  // Close the picker
  templatesOpen = true;
  toggleTemplates();
  toast(`${t.icon} Template loaded — make it yours!`);
}

// ═══════════════════════════════════════
// LETTER DRAFTS
// ═══════════════════════════════════════
let letterDrafts = [];

function loadLetterDrafts(){
  try{ letterDrafts = JSON.parse(localStorage.getItem(LS.DRAFTS)||'[]'); }catch(e){ letterDrafts=[]; }
  renderDrafts();
}

function saveDraft(){
  const body = document.getElementById('lBody').value.trim();
  if(!body){ toast('✏️ Write something first!'); return; }
  const to      = document.getElementById('lTo').value.trim();
  const rawName = to || 'Untitled';
  const name    = prompt('Name this draft:', `Letter to ${rawName}`);
  if(name === null) return; // cancelled
  letterDrafts.unshift({
    id:      Date.now(),
    name:    name.trim() || `Letter to ${rawName}`,
    to,
    from:    document.getElementById('lFrom').value,
    subject: document.getElementById('lSubject').value,
    body,
    ts:      Date.now(),
  });
  try{ localStorage.setItem(LS.DRAFTS, JSON.stringify(letterDrafts)); }catch(e){}
  renderDrafts();
  toast('📁 Draft saved!');
}

function loadDraft(id){
  const d = letterDrafts.find(x=>x.id===id);
  if(!d) return;
  document.getElementById('lTo').value      = d.to      || '';
  document.getElementById('lFrom').value    = d.from    || '';
  document.getElementById('lSubject').value = d.subject || '';
  document.getElementById('lBody').value    = d.body    || '';
  countWords('lBody','lwc');
  persistLetter();
  toast('📂 Draft loaded!');
}

function deleteDraft(e, id){
  e.stopPropagation();
  if(!confirm('Delete this draft?')) return;
  letterDrafts = letterDrafts.filter(x=>x.id!==id);
  try{ localStorage.setItem(LS.DRAFTS, JSON.stringify(letterDrafts)); }catch(e){}
  renderDrafts();
  toast('🍂 Draft removed.');
}

let draftsOpen = false;
function toggleDrafts(){
  draftsOpen = !draftsOpen;
  document.getElementById('draftsList').style.display  = draftsOpen ? 'flex'    : 'none';
  document.getElementById('draftsChevron').style.transform = draftsOpen ? 'rotate(180deg)' : '';
}

function renderDrafts(){
  const panel = document.getElementById('draftsPanel');
  const list  = document.getElementById('draftsList');
  const count = document.getElementById('draftsCount');

  count.textContent = letterDrafts.length;
  panel.style.display = letterDrafts.length ? 'block' : 'none';

  if(!letterDrafts.length){ draftsOpen=false; return; }

  list.innerHTML = letterDrafts.map(d=>{
    const date = new Date(d.ts).toLocaleDateString('en-US',{month:'short',day:'numeric'});
    return `
      <div class="draft-card" onclick="loadDraft(${d.id})">
        <span class="draft-name">✉ ${d.name}</span>
        <span class="draft-meta">${date}</span>
        <button class="draft-del" onclick="deleteDraft(event,${d.id})" title="Delete">✕</button>
      </div>`;
  }).join('');
}

// ═══════════════════════════════════════
// LETTERS
// ═══════════════════════════════════════
function newSuggestion(){
  const s=OPENINGS[Math.floor(Math.random()*OPENINGS.length)];
  const el=document.getElementById('lSuggest');
  el.style.opacity='0';
  setTimeout(()=>{el.textContent='\u201C'+s+'\u201D — click for another';el.style.opacity='1';},150);
}

function sendLetter(){
  const body=document.getElementById('lBody').value.trim();
  if(!body){toast('✏️ Write your letter first!');return;}
  const from=document.getElementById('lFrom').value.trim();
  const subject=document.getElementById('lSubject').value.trim()||'A letter for you';
  const full=body+'\n\n'+(from?'— '+from:'With love');
  window.open('mailto:?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(full),'_blank');
  toast('💌 Your letter is ready to send!');
}

function previewLetter(){
  const body=document.getElementById('lBody').value.trim();
  if(!body){toast('✏️ Write your letter first!');return;}
  const to=document.getElementById('lTo').value||'Dearest Friend';
  const from=document.getElementById('lFrom').value||'With love';
  const subject=document.getElementById('lSubject').value;
  const date=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const lines=body.split('\n').map(l=>'<p style="margin-bottom:0.75rem;line-height:1.85;">'+(l||'&nbsp;')+'</p>').join('');
  document.getElementById('previewContent').innerHTML=`
    <div style="font-family:'Dancing Script',cursive;color:var(--bark-light);font-size:0.88rem;margin-bottom:2rem;opacity:0.7;">${date}</div>
    ${subject?`<div style="font-family:'Lora',serif;font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-light);margin-bottom:1.4rem;font-style:italic;">${subject}</div>`:''}
    <div style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:1.4rem;">${to},</div>
    <div style="font-family:'Lora',serif;font-size:0.94rem;color:var(--ink);">${lines}</div>
    <div style="font-family:'Playfair Display',serif;font-style:italic;margin-top:2.2rem;font-size:1rem;">${from}</div>
    <div style="text-align:center;margin-top:2rem;font-size:1.5rem;">🌿 💌 🌿</div>
  `;
  document.getElementById('previewModal').classList.add('open');
}

function downloadLetter(){
  const body=document.getElementById('lBody').value.trim();
  if(!body){toast('✏️ Write your letter first!');return;}
  const to=document.getElementById('lTo').value||'Friend';
  const from=document.getElementById('lFrom').value||'';
  const subject=document.getElementById('lSubject').value||'A Letter';
  const date=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  dl('Langooric Scriptures — Letter\n'+date+'\n\nTo: '+to+'\nSubject: '+subject+'\n\n'+body+'\n\n'+(from?'— '+from:''),'langooric-letter-'+Date.now()+'.txt');
  toast('⬇ Letter saved!');
}

// ═══════════════════════════════════════
// MODAL
// ═══════════════════════════════════════
function closeModal(){document.getElementById('previewModal').classList.remove('open');}
function modalClick(e){if(e.target===document.getElementById('previewModal'))closeModal();}

// ═══════════════════════════════════════
// UTILS
// ═══════════════════════════════════════
function dl(content,filename){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([content],{type:'text/plain'}));
  a.download=filename;a.click();
}

let toastTimer;
function toast(msg){
  clearTimeout(toastTimer);
  const el=document.getElementById('toast');
  el.textContent=msg;el.classList.add('show');
  toastTimer=setTimeout(()=>el.classList.remove('show'),2800);
}

// ═══════════════════════════════════════
// WATER TRACKER
// ═══════════════════════════════════════
let waterData    = { date:'', count:0, goal:8 };
let waterHistory = [];

function todayStr(){ return new Date().toISOString().split('T')[0]; }

function loadWater(){
  try{ waterData    = JSON.parse(localStorage.getItem(LS.WATER)     ||'{}'); }catch(e){}
  try{ waterHistory = JSON.parse(localStorage.getItem(LS.WATER_HIST)||'[]'); }catch(e){ waterHistory=[]; }
  if(!waterData.goal) waterData.goal = 8;

  const today = todayStr();
  if(waterData.date !== today){
    // Archive yesterday's count before resetting
    if(waterData.date && waterData.count > 0){
      waterHistory.unshift({ date:waterData.date, count:waterData.count, goal:waterData.goal });
      waterHistory = waterHistory.slice(0,7);
      try{ localStorage.setItem(LS.WATER_HIST, JSON.stringify(waterHistory)); }catch(e){}
    }
    waterData.count = 0;
    waterData.date  = today;
    saveWaterData();
  }
  renderWater();
}

function saveWaterData(){
  try{ localStorage.setItem(LS.WATER, JSON.stringify(waterData)); }catch(e){}
}

function adjustWater(delta){
  waterData.count = Math.max(0, Math.min(waterData.goal+3, waterData.count+delta));
  saveWaterData();
  renderWater();
  if(waterData.count === waterData.goal) toast('🎉 Water goal reached! Amazing!');
}

function setWaterGoal(g){
  waterData.goal = g;
  saveWaterData();
  renderWater();
}

function renderWater(){
  const { count, goal } = waterData;
  const pct = Math.min(count / goal, 1);

  document.getElementById('wNum').textContent         = count;
  document.getElementById('wGoalDisplay').textContent = goal;
  document.getElementById('waterFillEl').style.height = (pct*100)+'%';

  // Motivational message
  const MSGS = [
    [1.0, '🎉 Goal reached! You crushed it today.'],
    [0.75,'💧 Almost there — one more push!'],
    [0.5, '🌿 Halfway! You\'re doing great.'],
    [0.25,'✨ Good start — keep going!'],
    [0.01,'💧 First sip — let\'s go!'],
    [0,   '🌱 Tap + to log your first glass.'],
  ];
  const msg = MSGS.find(([t])=> pct >= t);
  document.getElementById('waterMsg').textContent = msg ? msg[1] : '';

  // Dot indicators
  document.getElementById('waterDots').innerHTML =
    Array.from({length:goal},(_,i)=>
      `<span class="water-dot ${i<count?'filled':''}" onclick="adjustWater(${i<count?-1:1})" title="Glass ${i+1}"></span>`
    ).join('');

  // Goal buttons
  document.querySelectorAll('.wg-btn').forEach(b=>{
    b.classList.toggle('active', +b.dataset.goal === goal);
  });

  // History bars
  const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const histEl = document.getElementById('waterHistRow');
  if(!waterHistory.length){
    histEl.innerHTML='<span style="font-style:italic;font-size:0.78rem;opacity:0.5;">No history yet</span>';
  } else {
    histEl.innerHTML = waterHistory.slice(0,7).map(h=>{
      const d   = new Date(h.date);
      const p   = Math.min(h.count/h.goal,1);
      const col = p>=1?'var(--forest)':p>=0.5?'var(--gold)':'var(--bark-light)';
      return `<div class="water-hist-day">
        <div class="whd-bar"><div class="whd-fill" style="height:${Math.round(p*100)}%;background:${col};"></div></div>
        <span class="whd-label">${DAY_LABELS[d.getDay()]}</span>
      </div>`;
    }).join('');
  }
}

// ═══════════════════════════════════════
// MEDICINE TRACKER
// ═══════════════════════════════════════
let meds       = [];
let medsLog    = { date:'', taken:{} };
let medFormOpen = false;

const MED_COLORS = ['#4A8A4E','#9B7DAA','#C09030','#4A9A8A','#C97090','#6A7AAA'];
const TIME_ICONS  = { Morning:'🌅', Afternoon:'☀️', Evening:'🌆', Night:'🌙' };

function loadMeds(){
  try{ meds    = JSON.parse(localStorage.getItem(LS.MEDS)    ||'[]'); }catch(e){ meds=[]; }
  try{ medsLog = JSON.parse(localStorage.getItem(LS.MEDS_LOG)||'{}'); }catch(e){}
  if(!medsLog.taken) medsLog.taken = {};

  const today = todayStr();
  if(medsLog.date !== today){
    medsLog = { date:today, taken:{} };
    saveMedsLog();
  }
  renderMeds();
}

function saveMedsData(){ try{ localStorage.setItem(LS.MEDS,    JSON.stringify(meds));    }catch(e){} }
function saveMedsLog(){   try{ localStorage.setItem(LS.MEDS_LOG,JSON.stringify(medsLog)); }catch(e){} }

function toggleMedForm(){
  medFormOpen = !medFormOpen;
  document.getElementById('medForm').style.display      = medFormOpen ? 'block':'none';
  document.getElementById('medFormToggle').textContent  = medFormOpen ? '✕ Cancel':'＋ Add Medicine';
  if(!medFormOpen) clearMedForm();
}

function clearMedForm(){
  ['medName','medDose','medNotes'].forEach(id=>{ document.getElementById(id).value=''; });
  document.querySelectorAll('#medTimeSelect input').forEach(cb=>{ cb.checked=false; });
}

function addMed(){
  const name = document.getElementById('medName').value.trim();
  if(!name){ toast('💊 Enter a medicine name first.'); return; }
  const times = [...document.querySelectorAll('#medTimeSelect input:checked')].map(cb=>cb.value);
  if(!times.length){ toast('💊 Pick at least one time slot.'); return; }

  meds.push({
    id:    Date.now(),
    name,
    dose:  document.getElementById('medDose').value.trim(),
    notes: document.getElementById('medNotes').value.trim(),
    times,
    color: MED_COLORS[meds.length % MED_COLORS.length],
  });
  saveMedsData();
  toggleMedForm();
  renderMeds();
  toast('💊 Medicine added!');
}

function toggleMedTaken(medId, timeIdx){
  const key = `${medId}_${timeIdx}`;
  medsLog.taken[key] = !medsLog.taken[key];
  saveMedsLog();
  renderMeds();
  // Celebrate if all doses done for that med
  const med = meds.find(m=>m.id===medId);
  if(med && med.times.every((_,i)=>medsLog.taken[`${medId}_${i}`])){
    toast(`✅ All doses of ${med.name} done for today!`);
  }
}

function deleteMed(id){
  if(!confirm('Remove this medicine?')) return;
  meds = meds.filter(m=>m.id!==id);
  saveMedsData();
  renderMeds();
  toast('🍂 Medicine removed.');
}

function renderMeds(){
  const list = document.getElementById('medList');
  if(!meds.length){
    list.innerHTML=`<div class="empty-state" style="padding:2rem 1rem;">
      Your medicine list is empty.<br><br>
      Tap <strong>＋ Add Medicine</strong> above to get started. 💊
    </div>`;
    return;
  }

  // Overall progress
  let total=0, taken=0;
  meds.forEach(m=> m.times.forEach((_,i)=>{
    total++;
    if(medsLog.taken[`${m.id}_${i}`]) taken++;
  }));
  const pct = total ? Math.round((taken/total)*100) : 0;

  list.innerHTML = `
    <div class="med-overall">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
        <span style="font-family:'Dancing Script',cursive;color:var(--forest-mid);font-size:0.92rem;">Today's doses</span>
        <span style="font-family:'Lora',serif;font-size:0.8rem;color:var(--ink-light);">${taken} / ${total} taken</span>
      </div>
      <div class="mc-bar-track" style="height:8px;">
        <div class="mc-bar-fill" style="width:${pct}%;transition:width 0.5s ease;"></div>
      </div>
    </div>

    ${meds.map(m=>{
      const doneCt = m.times.filter((_,i)=>medsLog.taken[`${m.id}_${i}`]).length;
      const allDone = doneCt === m.times.length;
      return `
      <div class="med-card" style="${allDone?'opacity:0.75;':''}">
        <div class="med-card-header" style="border-left:3px solid ${m.color};">
          <div class="med-card-info">
            <span class="med-name">💊 ${m.name}${allDone?' <span style="font-size:0.75rem;color:var(--forest);">✓ all done</span>':''}</span>
            ${m.dose ?`<span class="med-dose">${m.dose}</span>`:''}
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span class="med-badge" style="background:${m.color}20;color:${m.color};">${doneCt}/${m.times.length}</span>
            <button class="draft-del" onclick="deleteMed(${m.id})" title="Remove">✕</button>
          </div>
        </div>
        ${m.notes?`<div class="med-notes">📝 ${m.notes}</div>`:''}
        <div class="med-times">
          ${m.times.map((t,i)=>{
            const done = !!medsLog.taken[`${m.id}_${i}`];
            return `<button class="med-time-btn${done?' taken':''}"
              onclick="toggleMedTaken(${m.id},${i})"
              style="${done
                ? `background:${m.color};border-color:${m.color};color:#fff;`
                : `border-color:${m.color};color:${m.color};`}">
              ${TIME_ICONS[t]||'⏰'} ${t}${done?' ✓':''}
            </button>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}`;
}

// ═══════════════════════════════════════
// WEEKLY RECAP
// ═══════════════════════════════════════
function getWeekId(){
  const d = new Date();
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil((((d - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2,'0')}`;
}

function checkWeeklyRecap(){
  const card = document.getElementById('weeklyRecap');
  // Don't show if already dismissed this week
  if(localStorage.getItem(LS.RECAP) === getWeekId()){ card.style.display='none'; return; }

  const stats = calcWeeklyStats();
  if(!stats){ card.style.display='none'; return; }

  renderWeeklyRecap(stats);
  card.style.display='block';
}

function calcWeeklyStats(){
  const now     = Date.now();
  const weekAgo = now - 7*24*60*60*1000;
  const week    = entries.filter(e => e.ts >= weekAgo);
  if(!week.length) return null;

  // Date range label
  const oldest = new Date(Math.min(...week.map(e=>e.ts)));
  const newest = new Date(Math.max(...week.map(e=>e.ts)));
  const fmt    = d => d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const range  = oldest.toDateString()===newest.toDateString()
    ? fmt(oldest)
    : `${fmt(oldest)} – ${fmt(newest)}`;

  // Unique days
  const days = new Set(week.map(e=>dayKey(e.ts))).size;

  // Top mood
  const moodCount = {};
  week.forEach(e=>{ if(e.mood) moodCount[e.mood]=(moodCount[e.mood]||0)+1; });
  const topMood = Object.entries(moodCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || '🌿';

  // Top 5 words
  const freq = {};
  week.forEach(e=>{
    (e.text||'').toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).forEach(w=>{
      if(w.length>3 && !STOP_WORDS.has(w)) freq[w]=(freq[w]||0)+1;
    });
  });
  const topWords = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([w])=>w);

  // Random highlight sentence from this week
  const allText  = week.map(e=>e.text).join(' ');
  const sentences= allText.match(/[^.!?\n]{20,}[.!?]/g)||[];
  const highlight= sentences.length
    ? sentences[Math.floor(Math.random()*Math.min(sentences.length,8))].trim()
    : week[0]?.text.slice(0,120);

  return { count:week.length, days, topMood, topWords, highlight, range };
}

function renderWeeklyRecap(s){
  document.getElementById('recapRange').textContent  = s.range;

  document.getElementById('recapStats').innerHTML = `
    <div class="recap-stat">
      <span class="recap-stat-num">${s.count}</span>
      <span class="recap-stat-lbl">${s.count===1?'entry':'entries'}</span>
    </div>
    <div class="recap-stat">
      <span class="recap-stat-num">${s.days}/7</span>
      <span class="recap-stat-lbl">days written</span>
    </div>
    <div class="recap-stat">
      <span class="recap-stat-num">${s.topMood}</span>
      <span class="recap-stat-lbl">top mood</span>
    </div>`;

  document.getElementById('recapHighlight').textContent = s.highlight
    ? `"${s.highlight.trim()}"`
    : '';

  document.getElementById('recapWords').innerHTML = s.topWords.length
    ? s.topWords.map(w=>`<span class="recap-word">#${w}</span>`).join('')
    : '';
}

function dismissRecap(){
  try{ localStorage.setItem(LS.RECAP, getWeekId()); }catch(e){}
  const card = document.getElementById('weeklyRecap');
  card.style.opacity='0';
  card.style.transition='opacity 0.4s ease';
  setTimeout(()=>{ card.style.display='none'; card.style.opacity=''; card.style.transition=''; },400);
}

// ═══════════════════════════════════════
// SETTINGS & DATA MANAGEMENT
// ═══════════════════════════════════════
let settingsOpen = false;

function toggleSettings(){
  settingsOpen = !settingsOpen;
  const modal = document.getElementById('settingsModal');
  modal.classList.toggle('open', settingsOpen);
  if(settingsOpen) renderDataSummary();
}

function settingsModalClick(e){
  if(e.target === document.getElementById('settingsModal')) toggleSettings();
}

function renderDataSummary(){
  document.getElementById('dataSummary').innerHTML = `
    <div class="ss-card">
      <span class="ss-num">${entries.length}</span>
      <span class="ss-lbl">journal entries</span>
    </div>
    <div class="ss-card">
      <span class="ss-num">${letterDrafts.length}</span>
      <span class="ss-lbl">letter drafts</span>
    </div>
    <div class="ss-card">
      <span class="ss-num">${meds.length}</span>
      <span class="ss-lbl">medicines</span>
    </div>
    <div class="ss-card">
      <span class="ss-num">${waterHistory.length}</span>
      <span class="ss-lbl">days tracked</span>
    </div>
  `;
}

// ── Export ──────────────────────────────────────────────────
function exportData(){
  const payload = {
    version:      2,
    app:          'Langooric Scriptures',
    exported:     new Date().toISOString(),
    entries,
    letterDrafts,
    letterDraft:  JSON.parse(localStorage.getItem(LS.LETTER) || '{}'),
    meds,
    medsLog,
    water:        waterData,
    waterHistory,
    settings: {
      theme: localStorage.getItem(LS.THEME) || 'daylight',
      font:  localStorage.getItem(LS.FONT)  || 'Lora',
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type:'application/json' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `langooric-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('📦 Backup downloaded!');
}

// ── Import ──────────────────────────────────────────────────
function handleImport(e){
  const file = e.target.files[0];
  if(!file){ return; }
  e.target.value = ''; // reset so same file can be re-imported

  const reader = new FileReader();
  reader.onload = ev => {
    try{
      const data = JSON.parse(ev.target.result);

      // Validate
      if(!data.version || data.app !== 'Langooric Scriptures'){
        toast('⚠️ Not a valid Langooric backup file.');
        return;
      }

      // Show summary and ask mode
      const eCount = data.entries?.length || 0;
      const dCount = data.letterDrafts?.length || 0;
      const mCount = data.meds?.length || 0;

      const merge = confirm(
        `Backup contains:\n` +
        `📖 ${eCount} journal entries\n` +
        `✉️  ${dCount} letter drafts\n` +
        `💊 ${mCount} medicines\n\n` +
        `OK → Merge (add to existing data)\n` +
        `Cancel → Replace (wipe & restore)`
      );

      if(merge){
        // Merge entries by timestamp — no duplicates
        const existingTs  = new Set(entries.map(e => e.ts));
        const newEntries  = (data.entries||[]).filter(e => !existingTs.has(e.ts));
        entries = [...entries, ...newEntries].sort((a,b) => b.ts - a.ts);

        // Merge letter drafts by id
        const existingIds = new Set(letterDrafts.map(d => d.id));
        const newDrafts   = (data.letterDrafts||[]).filter(d => !existingIds.has(d.id));
        letterDrafts = [...letterDrafts, ...newDrafts];

        // Merge meds by id
        const existingMedIds = new Set(meds.map(m => m.id));
        const newMeds = (data.meds||[]).filter(m => !existingMedIds.has(m.id));
        meds = [...meds, ...newMeds];

        toast(`✅ Merged! ${newEntries.length} new entries added.`);

      } else {
        if(!confirm('⚠️ This will DELETE all current data. Are you absolutely sure?')) return;

        entries      = data.entries      || [];
        letterDrafts = data.letterDrafts || [];
        meds         = data.meds         || [];
        medsLog      = data.medsLog      || { date:'', taken:{} };
        waterData    = data.water        || { date:'', count:0, goal:8 };
        waterHistory = data.waterHistory || [];

        // Restore settings
        if(data.settings?.theme) setTheme(data.settings.theme);
        if(data.settings?.font)  applyFont(data.settings.font, false);
        if(data.letterDraft)
          try{ localStorage.setItem(LS.LETTER, JSON.stringify(data.letterDraft)); }catch(e){}

        toast(`✅ Replaced! ${entries.length} entries restored.`);
      }

      // Persist everything
      persistEntries();
      try{ localStorage.setItem(LS.DRAFTS,     JSON.stringify(letterDrafts)); }catch(e){}
      saveMedsData();
      saveMedsLog();
      saveWaterData();
      try{ localStorage.setItem(LS.WATER_HIST, JSON.stringify(waterHistory)); }catch(e){}

      // Re-render all views
      updateStats();
      checkOnThisDay();
      renderDrafts();
      renderArchive();
      renderDataSummary();

    } catch(err){
      toast('⚠️ Could not read that file. Is it a valid backup?');
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// ── Clear all ───────────────────────────────────────────────
function clearAllData(){
  if(!confirm('This will permanently delete ALL your data.\n\nExport a backup first if you need it!')) return;
  if(!confirm('Last chance — delete everything?')) return;

  Object.values(LS).forEach(key => { try{ localStorage.removeItem(key); }catch(e){} });

  // Reset state
  entries      = [];
  letterDrafts = [];
  meds         = [];
  medsLog      = { date:todayStr(), taken:{} };
  waterData    = { date:todayStr(), count:0, goal:8 };
  waterHistory = [];

  updateStats();
  renderDrafts();
  renderArchive();
  renderMeds();
  renderWater();
  renderDataSummary();
  document.getElementById('otdCard').style.display = 'none';
  toggleSettings();
  toast('🍂 All data cleared.');
}

init();
