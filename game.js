const saveKey='tinley-online-boss-v2';
const AUCTION_WAIT=5*60*1000;
const upgradeCatalog=[
  {name:'Better Laptop 💻',cost:100,perk:'+4 pay on typed work'},
  {name:'Cute Headset 🎧',cost:125,perk:'happier customers'},
  {name:'Fast Wi‑Fi 📶',cost:150,perk:'unlocks harder jobs'},
  {name:'Auto Email Helper 🤖',cost:175,perk:'more work bonuses'},
  {name:'Pink Office Chair 🪑',cost:200,perk:'comfy boss office'},
  {name:'Ring Light 🎥',cost:225,perk:'better video calls'},
  {name:'Sticker Printer 🌈',cost:250,perk:'sell cute stickers'},
  {name:'Shipping Station 📦',cost:275,perk:'pack orders faster'},
  {name:'Boss Desk ✨',cost:300,perk:'professional office'},
  {name:'Customer Bot 💬',cost:350,perk:'message helper'},
  {name:'Ad Studio 📣',cost:400,perk:'launch ads'},
  {name:'Mini Warehouse 🏬',cost:475,perk:'bigger orders'},
  {name:'VIP Client List 👑',cost:550,perk:'premium clients'},
  {name:'Team Helper 👩‍💼',cost:650,perk:'extra shift power'},
  {name:'Rainbow HQ 🏢',cost:800,perk:'ultimate boss upgrade'},
  {name:'Glitter Keyboard ⌨️',cost:900,perk:'faster typing power'},
  {name:'Boss Planner 📒',cost:1000,perk:'better daily goals'},
  {name:'Photo Booth 📸',cost:1150,perk:'make product photos'},
  {name:'Delivery Van 🚚',cost:1300,perk:'ship big orders'},
  {name:'Podcast Mic 🎙️',cost:1500,perk:'record business ads'},
  {name:'Influencer Collab 🤝',cost:1750,perk:'more customers'},
  {name:'Billboard Ad 🪧',cost:2000,perk:'huge attention'},
  {name:'Toy Factory 🧸',cost:2400,perk:'make your own products'},
  {name:'Business School 🎓',cost:2800,perk:'smarter boss choices'},
  {name:'Executive Assistant 🗂️',cost:3250,perk:'helps with paperwork'},
  {name:'Luxury Office Tower 🌆',cost:3750,perk:'super fancy office'},
  {name:'Global Website 🌎',cost:4300,perk:'sell around the world'},
  {name:'Celebrity Customer ⭐',cost:5000,perk:'famous client bonus'},
  {name:'CEO Crown 👸',cost:6000,perk:'Tinley becomes CEO'},
  {name:'Dream Company Castle 🏰',cost:7500,perk:'final mega upgrade'}
];
const officeCatalog=[
  {name:'Pink Rug',emoji:'💗',cost:75},
  {name:'Flower Lamp',emoji:'🌸',cost:120},
  {name:'Gaming Chair',emoji:'💺',cost:180},
  {name:'Snack Table',emoji:'🍪',cost:220},
  {name:'Fish Tank',emoji:'🐠',cost:300},
  {name:'Neon Sign',emoji:'✨',cost:400},
  {name:'Mini Couch',emoji:'🛋️',cost:550},
  {name:'Plant Corner',emoji:'🪴',cost:700},
  {name:'Wall TV',emoji:'📺',cost:900},
  {name:'Tiny Fountain',emoji:'⛲',cost:1200},
  {name:'Royal Desk',emoji:'👑',cost:1700},
  {name:'Office Elevator',emoji:'🛗',cost:2500}
];
let S=JSON.parse(localStorage.getItem(saveKey)||'null')||{started:false,name:'Tinley',biz:"My Online Boss Shop",money:0,happy:50,streak:0,orders:0,day:1,tick:0,upgrades:[],officeItems:[],lastAuction:0};
S.name ||= 'Player'; S.upgrades ||= []; S.officeItems ||= []; S.lastAuction ||= 0; S.player={x:50,y:68};



function adultOfficeMode(){
  openM('Adult Office Mode 💼', `
    <p>You are the business owner. Pick real office work:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <button onclick="clientMeeting()">📅 Client Meeting</button>
      <button onclick="makeInvoice()">🧾 Create Invoice</button>
      <button onclick="writeReport()">📊 Write Report</button>
      <button onclick="approveRequest()">✅ Approve Request</button>
      <button onclick="performanceReview()">⭐ Performance Review</button>
      <button onclick="budgetPlan()">💰 Budget Plan</button>
    </div>
  `);
}
function officePrompt(title,question,need,pay){
  mb.innerHTML=`<h3>${title}</h3><p>${question}</p><textarea id="officeText" rows="5" maxlength="240" placeholder="Type a professional adult-work answer..."></textarea><br><button onclick="submitOfficeWork('${title.replaceAll("'","\\'")}', '${need}', ${pay})">Submit Work ✅</button>`;
}
function submitOfficeWork(title,need,pay){
  const text=(document.getElementById('officeText')?.value||'').trim().toLowerCase();
  if(text.length<15){showBuyResult('Write a more professional answer first.','#FFB7C5');return;}
  const words=need.split('|'); const good=words.filter(w=>text.includes(w)).length;
  const earned=pay+(good*15)+S.upgrades.length*5;
  S.money+=earned; S.happy=Math.min(100,S.happy+good+2); S.orders++; S.streak++;
  addNews('💼 Completed adult office work: '+title);
  sync(); save();
  mb.innerHTML=`<h3>Work submitted ✅</h3><p>${title} is done.</p><p>You earned <b>$${earned}</b>.</p><p>Boss note: ${good>=2?'Very professional!':'Good, but add more details next time.'}</p>`;
}
function clientMeeting(){officePrompt('📅 Client Meeting','A client wants a plan for their online shop. Type what you say in the meeting.','client|plan|shop',35)}
function makeInvoice(){officePrompt('🧾 Create Invoice','Write an invoice note for a customer who bought a website package.','invoice|customer|website',40)}
function writeReport(){officePrompt('📊 Write Report','Write a short business report about today’s calls, messages, and sales.','report|sales|calls',45)}
function approveRequest(){officePrompt('✅ Approve Request','An employee asks to buy a better headset for customer calls. Approve it professionally.','approve|headset|calls',30)}
function performanceReview(){officePrompt('⭐ Performance Review','Write a kind performance review for a worker who helped customers.','review|worker|customers',50)}
function budgetPlan(){officePrompt('💰 Budget Plan','Make a budget plan for ads, supplies, and savings.','budget|ads|savings',55)}


const proposalClients=[
  {client:'Sunny Bakery',ask:'needs a website to sell cupcakes online',need:['website','cupcakes','online']},
  {client:'Rainbow Pet Shop',ask:'wants more customers to visit and buy pet toys',need:['customers','pet','toys']},
  {client:'Tinley’s Play World',ask:'wants a plan for a fun game/video launch',need:['tinley','game','launch']},
  {client:'Cute Sticker Co.',ask:'needs a proposal for custom party stickers',need:['custom','party','stickers']},
  {client:'Boba Cafe',ask:'wants social media posts to get more orders',need:['social','orders','boba']},
  {client:'Little Tech Helper',ask:'needs customer service for calls, emails, and messages',need:['calls','emails','messages']}
];
let activeProposal=null;
function openProposalDesk(){
  const cards=proposalClients.map((c,i)=>`<button style="text-align:left;width:100%" onclick="startProposal(${i})"><b>${c.client}</b><br><span>${c.ask}</span></button>`).join('');
  openM('Proposal Desk 📋', `<p>Pick a real client, then write a proposal like a business owner.</p><div style="display:grid;gap:8px">${cards}</div>`);
}
function startProposal(i){
  activeProposal=proposalClients[i];
  mb.innerHTML=`<h3>📋 Proposal for ${activeProposal.client}</h3><p><b>Client needs:</b> ${activeProposal.ask}</p><p>Write your proposal. Include: what you will make, how it helps, and why they should pick you.</p><textarea id="proposalText" rows="8" maxlength="500" placeholder="Dear ${activeProposal.client}, I can help by..."></textarea><br><button onclick="submitProposal()">Submit Proposal ✅</button>`;
}
function proposalHint(){
  if(!activeProposal)return;
  showBuyResult('Try writing: Dear '+activeProposal.client+', I can help with '+activeProposal.ask+'. My plan is...','#C7CEEA');
}
function submitProposal(){
  if(!activeProposal)return;
  const text=(document.getElementById('proposalText')?.value||'').trim().toLowerCase();
  if(text.length<40){showBuyResult('Make the proposal longer, like a real business note.','#FFB7C5');return;}
  const hits=activeProposal.need.filter(w=>text.includes(w)).length;
  const hasPlan=text.includes('plan')||text.includes('help')||text.includes('make')||text.includes('create');
  const pay=60+hits*25+(hasPlan?25:0)+S.upgrades.length*8;
  S.money+=pay; S.orders++; S.happy=Math.min(100,S.happy+10+hits); S.streak++;
  addNews('📋 Sent a proposal to '+activeProposal.client+'!');
  sync(); save();
  mb.innerHTML=`<h3>Proposal sent! 🎉</h3><p>${activeProposal.client} read your proposal.</p><p>You earned <b>$${pay}</b>.</p><p>${hits>=2?'They loved how specific it was!':'Good start — next time mention more client details.'}</p>`;
}

const shiftJobs=[
  {name:'Check inbox',emoji:'📥',need:'Read new customer messages'},
  {name:'Reply to emails',emoji:'📧',need:'Answer 3 customer emails kindly'},
  {name:'Answer calls',emoji:'📞',need:'Help people on the phone'},
  {name:'Write proposal',emoji:'📋',need:'Make a plan for a client'},
  {name:'Pack orders',emoji:'📦',need:'Get online orders ready'},
  {name:'Team meeting',emoji:'👩‍💼',need:'Tell the boss what you finished'},
  {name:'Update website',emoji:'🌐',need:'Type a short website update'},
  {name:'Make invoice',emoji:'🧾',need:'Send a bill to the customer'},
  {name:'Customer support',emoji:'🎧',need:'Fix a customer problem'},
  {name:'End day report',emoji:'📊',need:'Write what you did today'}
];
let shift={active:false,tasks:[],done:0,goal:6};
function startWorkShift(){
  shift={active:true,done:0,goal:6+Math.min(4,S.upgrades.length),tasks:[]};
  for(let i=0;i<shift.goal;i++) shift.tasks.push({...shiftJobs[Math.floor(Math.random()*shiftJobs.length)],done:false});
  renderShift();
}
function renderShift(){
  openM('Real Work Shift 🏢', `<p><b>Goal:</b> Finish ${shift.done}/${shift.goal} tasks before the workday ends.</p><div style="background:#eef8ff;border-radius:16px;padding:10px;margin:8px 0"><b>Boss:</b> “Please stay focused, answer customers, and finish your queue!”</div><div id="shiftTasks">${shift.tasks.map((t,i)=>`<div style="padding:9px;margin:6px 0;border-radius:14px;background:${t.done?'#d8ffd8':'#fff'}"><b>${t.emoji} ${t.name}</b><br><span>${t.need}</span><br>${t.done?'✅ Done':`<button onclick="doShiftTask(${i})">Work on this</button>`}</div>`).join('')}</div><button onclick="finishShift()">Clock Out 🕔</button>`);
}
function doShiftTask(i){
  const t=shift.tasks[i]; if(!t||t.done)return;
  mb.innerHTML=`<h3>${t.emoji} ${t.name}</h3><p>${t.need}</p><p>Type what you would do for this work task:</p><textarea id="shiftReply" rows="4" maxlength="180" placeholder="Example: I will help the customer and check the order..."></textarea><br><button onclick="submitShiftTask(${i})">Submit Work ✅</button>`;
}
function submitShiftTask(i){
  const text=(document.getElementById('shiftReply')?.value||'').trim();
  if(text.length<8){showBuyResult('Type a little more work first!','#FFB7C5');return;}
  shift.tasks[i].done=true; shift.done++;
  const bonus=text.length>35?18:10;
  S.money+=bonus+S.upgrades.length*3; S.happy=Math.min(100,S.happy+2); S.orders++;
  if(shift.done>=shift.goal){S.money+=50; addNews('🏢 Finished a full real work shift!');}
  sync(); save(); renderShift();
}
function shiftTaskHint(i){
  const t=shift.tasks[i];
  showBuyResult(`Hint: Explain how you will do: ${t.need}`,'#C7CEEA');
}
function finishShift(){
  const pay=shift.done*12+(shift.done>=shift.goal?60:0);
  S.money+=pay; S.happy=Math.min(100,S.happy+(shift.done>=shift.goal?10:2));
  sync(); save();
  mb.innerHTML=`<h3>Shift finished! 🎉</h3><p>You finished ${shift.done}/${shift.goal} work tasks.</p><p>Paycheck: <b>$${pay}</b></p><p>${shift.done>=shift.goal?'Boss says: Amazing work!':'Boss says: Good try, finish more next shift!'}</p>`;
}

const chatTopics=[
  {q:'Hi! Can I order a pink sticker?',need:['pink','sticker'],yes:'Great, please add one pink sticker to my order!',no:'Okay, thanks for telling me. What colors do you have?'},
  {q:'Do you sell rainbow scooters?',need:['rainbow','scooter'],yes:'Yay! How much is one rainbow scooter?',no:'No problem. I will pick something else.'},
  {q:'My plushie order is late. Can you check it?',need:['order','check'],yes:'Thank you for checking my order!',no:'Okay, please tell me who can help.'},
  {q:'Can you send me the game link?',need:['link','send'],yes:'Thanks! I will try the link now.',no:'Okay, send it when it is ready.'},
  {q:'Do you have a 67 surprise box?',need:['67','surprise'],yes:'Cool! Please save one 67 surprise box.',no:'Okay, maybe next time.'},
  {q:'Can you write a proposal for my online store?',need:['proposal','store'],yes:'Perfect, please make it professional.',no:'Okay, I will ask later.'},
  {q:'Are you open on Saturday?',need:['open','saturday'],yes:'Great, I will shop on Saturday!',no:'Thanks for letting me know.'},
  {q:'Can I return this if it does not fit?',need:['return','fit'],yes:'Thanks, that helps a lot.',no:'Okay, I will be careful before buying.'},
  {q:'Can you send me a receipt?',need:['receipt','send'],yes:'Thank you, I needed that receipt.',no:'Okay, I will wait.'}
];
const chatPeople=[
  {name:'Mia',emoji:'👧'}, {name:'Dad',emoji:'👨'}, {name:'Lulu',emoji:'🧒'},
  {name:'Koko',emoji:'🌟'}, {name:'Customer 67',emoji:'6️⃣7️⃣'}, {name:'Business Lady',emoji:'👩‍💼'}
];
let activeChat=0;
function nextChatTopic(used=[]){const left=chatTopics.map((_,i)=>i).filter(i=>!used.includes(i)); return rand(left.length?left:chatTopics.map((_,i)=>i));}
function ensureChats(){
  if(S.chatVersion!==2){S.chatVersion=2;S.chats=null;}
  if(!S.chats){S.chats=chatPeople.map(()=>{const topic=nextChatTopic([]);return {topic,used:[topic],history:[{from:'them',text:chatTopics[topic].q}]};});}
}
function openChatApp(){
  ensureChats();
  openM('Messages App 💬', `<div style="display:grid;grid-template-columns:130px 1fr;gap:10px;min-height:360px">
    <div id="chatList"></div><div><div id="chatWindow"></div><textarea id="chatReply" rows="3" maxlength="160" placeholder="Type your reply..."></textarea><br><button onclick="sendChatReply()">Send 💬</button></div>
  </div>`);
  renderChats();
}
function renderChats(){
  ensureChats();
  const list=document.getElementById('chatList'), win=document.getElementById('chatWindow'); if(!list||!win)return;
  list.innerHTML=chatPeople.map((p,i)=>`<button style="width:100%;margin:3px 0;background:${i===activeChat?'#ffd6f3':'#fff'}" onclick="activeChat=${i};renderChats()">${p.emoji} ${p.name}</button>`).join('');
  const p=chatPeople[activeChat], c=S.chats[activeChat];
  win.innerHTML=`<h3>${p.emoji} ${p.name}</h3><div style="height:210px;overflow:auto;background:#f4f0ff;border-radius:16px;padding:10px">${c.history.map(m=>`<p style="text-align:${m.from==='me'?'right':'left'}"><span style="display:inline-block;max-width:85%;padding:8px 10px;border-radius:14px;background:${m.from==='me'?'#9ee7ff':'#fff'}">${esc(m.text)}</span></p>`).join('')}</div>`;
}
function sendChatReply(){
  ensureChats();
  const box=document.getElementById('chatReply'); const text=(box?.value||'').trim(); if(!text)return;
  const c=S.chats[activeChat], topic=chatTopics[c.topic];
  const lower=text.toLowerCase();
  c.history.push({from:'me',text}); box.value='';
  const saidNo=/\b(no|not|none|dont|don't|sorry|out|sold out)\b/.test(lower);
  const saidYes=/\b(yes|yeah|yep|sure|we do|have it|available)\b/.test(lower);
  const answeredTopic=topic.need.some(w=>lower.includes(w))||saidYes||saidNo;
  if(answeredTopic){S.money+=10+S.upgrades.length*2;S.happy=Math.min(100,S.happy+3);S.streak++;}
  else{S.happy=Math.max(0,S.happy-2);S.streak=0;}
  const reply=saidNo?topic.no:(saidYes||answeredTopic?topic.yes:'Okay, can you explain a little more?');
  const newTopic=nextChatTopic(c.used||[]); c.used=[...(c.used||[]),newTopic].slice(-chatTopics.length); c.topic=newTopic;
  setTimeout(()=>{
    c.history.push({from:'them',text:reply});
    setTimeout(()=>{c.history.push({from:'them',text:chatTopics[newTopic].q}); renderChats(); sync(); save();},500);
    renderChats(); sync(); save();
  },250);
  renderChats(); sync(); save();
}
function chatHint(){renderChats();}

const types={call:'📞 Call',msg:'💬 Message',email:'📧 Email',proposal:'📋 Proposal'};
const prompts=[
 {type:'call',q:'A customer calls: “Hi, I placed an order yesterday. Can you tell me when it will arrive?”',need:['order','arrive'],hint:'Say you can check the order and arrival date.'},
 {type:'msg',q:'Message: “Do you have this item in pink, and how much does it cost?”',need:['pink','cost'],hint:'Answer the color and price question.'},
 {type:'email',q:'Email: “Hello, I was charged twice. Can someone help me fix this?”',need:['charged','fix'],hint:'Apologize and say you can help fix the double charge.'},
 {type:'call',q:'A customer calls: “I need to change the shipping address before it ships.”',need:['shipping','address'],hint:'Say you can help update the shipping address.'},
 {type:'msg',q:'Message: “Can I return this if it does not fit?”',need:['return','fit'],hint:'Explain the return help kindly.'},
 {type:'email',q:'Email: “Can you send me a receipt for my purchase?”',need:['receipt','purchase'],hint:'Say you can send the receipt.'},
 {type:'call',q:'A customer calls: “Your website says sold out. Will you restock soon?”',need:['restock','soon'],hint:'Mention checking when it will restock.'},
 {type:'msg',q:'Message: “I forgot my password and cannot log in.”',need:['password','reset'],hint:'Tell them you can help reset the password.'},
 {type:'email',q:'Email: “My package arrived damaged. What should I do?”',need:['damaged','replace'],hint:'Apologize and offer a replacement/help.'},
 {type:'call',q:'A customer asks: “Can I speak to a manager?”',need:['manager','help'],hint:'Say you can help or connect them to a manager.'},
 {type:'msg',q:'Message: “Do you offer discounts for buying more than one?”',need:['discount','buy'],hint:'Answer about discounts for multiple items.'},
 {type:'email',q:'Email: “I need a quote for 20 custom stickers for a party.”',need:['quote','stickers'],hint:'Mention a quote for custom stickers.'},
 {type:'call',q:'A customer calls: “I’m confused about which option to pick.”',need:['help','option'],hint:'Say you can help them choose an option.'},
 {type:'msg',q:'Message: “Can you send me the tracking number?”',need:['tracking','number'],hint:'Say you can send the tracking number.'},
 {type:'email',q:'Email: “We are a small business and want help making a website.”',need:['website','business'],hint:'Mention helping their business with a website.'},
 {type:'call',q:'A parent asks: “Is this product safe for kids?”',need:['safe','kids'],hint:'Answer clearly about safety for kids.'},
 {type:'msg',q:'Message: “Can you hold this item for me until tomorrow?”',need:['hold','tomorrow'],hint:'Say whether you can hold it until tomorrow.'},
 {type:'email',q:'Email: “Please cancel my subscription before it renews.”',need:['cancel','subscription'],hint:'Say you can help cancel the subscription.'},
 {type:'call',q:'A customer calls: “I never got a confirmation email.”',need:['confirmation','email'],hint:'Say you can resend/check the confirmation email.'},
 {type:'msg',q:'Message: “Are you open on Saturday?”',need:['open','saturday'],hint:'Answer the Saturday hours question.'},
 {type:'email',q:'Email: “Can you make an invoice for my company?”',need:['invoice','company'],hint:'Say you can make the company invoice.'},
 {type:'call',q:'A customer asks: “Can you explain the difference between the basic and premium plan?”',need:['basic','premium'],hint:'Compare basic and premium.'},
 {type:'msg',q:'Message: “I accidentally ordered the wrong size.”',need:['wrong','size'],hint:'Say you can help change the wrong size.'},
 {type:'email',q:'Email: “Can we schedule a meeting this week?”',need:['schedule','meeting'],hint:'Say you can schedule a meeting this week.'}
];

const upgradedPrompts=[
 {type:'proposal',q:'Proposal request: “Write a simple proposal for building a website for a bakery.”',need:['proposal','website','bakery'],hint:'Mention a proposal, website, and bakery.',level:2},
 {type:'proposal',q:'Proposal request: “Create a plan to get more customers for our online shop.”',need:['plan','customers','shop'],hint:'Mention a plan to get customers for the shop.',level:2},
 {type:'email',q:'Client email: “Can you send a price estimate for logo design and social media posts?”',need:['estimate','logo','social'],hint:'Mention an estimate for logo and social posts.',level:2},
 {type:'call',q:'Business call: “We need someone to answer customer messages every day.”',need:['answer','messages','daily'],hint:'Say you can answer messages daily.',level:2},
 {type:'msg',q:'Team message: “Can you train the new worker on refunds and orders?”',need:['train','refunds','orders'],hint:'Say you can train them on refunds and orders.',level:2},
 {type:'proposal',q:'Proposal request: “Write a launch plan for a new online store.”',need:['launch','online','store'],hint:'Write a launch plan for an online store.',level:3},
 {type:'email',q:'Big client email: “Please write a professional apology to customers about delayed shipping.”',need:['sorry','customers','shipping'],hint:'Use sorry, customers, and shipping.',level:3},
 {type:'call',q:'Boss call: “Can you make an ad plan for our business?”',need:['ads','business','plan'],hint:'Mention an ad plan for the business.',level:3},
 {type:'msg',q:'Urgent message: “Three customers need help with payment problems right now.”',need:['help','payment','customers'],hint:'Say you will help customers with payments.',level:3},
 {type:'proposal',q:'Proposal request: “Make a business idea for Tinley’s Play World.”',need:['tinley','play','world'],hint:'Mention Tinley’s Play World and a business idea.',level:3},
 {type:'email',q:'CEO email: “Can you plan our online launch and send the steps?”',need:['plan','online','launch'],hint:'Mention planning the online launch steps.',level:4},
 {type:'call',q:'Investor call: “What makes this business special and why will people buy?”',need:['special','business','buy'],hint:'Explain why the business is special and why people buy.',level:4},
 {type:'msg',q:'Manager message: “Can you make a daily work schedule for calls, emails, and orders?”',need:['schedule','calls','emails'],hint:'Mention a daily schedule for calls and emails.',level:4},
 {type:'proposal',q:'Proposal request: “Create a customer service plan for a busy online business.”',need:['customer','service','business'],hint:'Mention customer service for the business.',level:4}
];
function workLevel(){return 1+Math.min(8,S.upgrades.length)}

let active=null;
let musicOn=false,musicCtx=null,musicTimer=null;
function save(){localStorage.setItem(saveKey,JSON.stringify(S))}
function playTone(ctx,freq,start,dur,gain=0.045){
  const osc=ctx.createOscillator(), vol=ctx.createGain();
  osc.type='sine'; osc.frequency.value=freq; vol.gain.setValueAtTime(0,start); vol.gain.linearRampToValueAtTime(gain,start+.08); vol.gain.linearRampToValueAtTime(0,start+dur);
  osc.connect(vol); vol.connect(ctx.destination); osc.start(start); osc.stop(start+dur+.05);
}
function musicLoop(){
  if(!musicOn||!musicCtx)return;
  const now=musicCtx.currentTime, notes=[261.63,329.63,392.00,523.25,440.00,392.00,329.63,293.66];
  notes.forEach((n,i)=>playTone(musicCtx,n,now+i*.55,.5));
  [130.81,196.00,174.61,146.83].forEach((n,i)=>playTone(musicCtx,n,now+i*1.1,1,.03));
  musicTimer=setTimeout(musicLoop,4300);
}
function toggleMusic(){
  if(!musicCtx) musicCtx=new (window.AudioContext||window.webkitAudioContext)();
  musicOn=!musicOn;
  const btn=document.getElementById('musicBtn'); if(btn) btn.textContent=musicOn?'🔇 Stop':'🎵 Music';
  if(musicOn){musicCtx.resume(); musicLoop(); flash('Relaxing music on 🎵');}
  else{clearTimeout(musicTimer); flash('Music off 🔇');}
}
function sync(){money.textContent=S.money;happy.textContent=S.happy;streak.textContent=S.streak;orders.textContent=S.orders;business.textContent=S.biz;const lvl=document.getElementById('workLevel'); if(lvl) lvl.textContent=workLevel(); clock.textContent=`Day ${S.day} • ${9+Math.floor(S.tick/4)}:${(S.tick%4)*15===0?'00':(S.tick%4)*15} ${9+Math.floor(S.tick/4)>=12?'PM':'AM'}`;upgrades.innerHTML=S.upgrades.map(u=>`<li>✅ ${u}</li>`).join('')||'<li>No upgrades yet</li>'}
function upgradePayBonus(){return S.upgrades.length*4+S.upgrades.filter(u=>u.includes('VIP')||u.includes('Rainbow')||u.includes('Team')||u.includes('CEO')||u.includes('Castle')||u.includes('Global')||u.includes('Celebrity')).length*10}
function openUpgradeShop(){
  const rows=upgradeCatalog.map((u,i)=>{
    const owned=S.upgrades.includes(u.name);
    const afford=S.money>=u.cost;
    return `<div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:${owned?'#dcffd9':afford?'#fff7fb':'#eeeeee'};border-radius:16px;padding:10px;margin:8px 0"><div><b>${u.name}</b><br><span class="tiny">$${u.cost} • ${u.perk}</span></div>${owned?'✅ Owned':`<button onclick="buyUpgrade(${i})">${afford?'Buy':'Need $'+(u.cost-S.money)}</button>`}</div>`;
  }).join('');
  openM('Upgrade Shop 🛍', `<p>Money: <b>$${S.money}</b></p><p>Buy more boss upgrades to earn more money and unlock bigger work.</p><button onclick="buyNextUpgrade()">Buy Next Upgrade ✅</button>${rows}`);
}
function buyNextUpgrade(){
  const i=upgradeCatalog.findIndex(u=>!S.upgrades.includes(u.name)&&S.money>=u.cost);
  if(i<0){showBuyResult('No upgrade is affordable yet — earn more money first.','#FFB7C5');return;}
  buyUpgrade(i);
}
function buyUpgrade(i){
  const u=upgradeCatalog[i]; if(!u)return;
  if(S.upgrades.includes(u.name)){showBuyResult('You already own that upgrade.','#C7CEEA');return;}
  if(S.money<u.cost){showBuyResult(`Need $${u.cost} for ${u.name}.`,'#FFB7C5');return;}
  S.money-=u.cost; S.upgrades.push(u.name); S.happy=Math.min(100,S.happy+5);
  addNews('🛍 Bought upgrade: '+u.name);
  sync(); save(); openUpgradeShop(); flash('Bought '+u.name+'!');
}
function showBuyResult(msg,color){
  const note=document.createElement('p'); note.innerHTML='<b>'+esc(msg)+'</b>'; note.style.background=color; note.style.color='#49365c'; note.style.padding='10px'; note.style.borderRadius='14px'; mb.prepend(note);
}
function addNews(msg){flash(msg)}
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function makeTask(){const pool=prompts.concat(upgradedPrompts.filter(p=>p.level<=workLevel())); active=rand(pool);inbox.innerHTML=`<div class="task ${active.type}"><h3>${types[active.type]}</h3><p>${active.q}</p><p><b>Type your own business reply:</b></p><textarea id="replyBox" rows="4" maxlength="180" placeholder="Type a kind helpful answer..."></textarea><div><button onclick="submitTyped()">Send Reply ✅</button></div><p class="tiny">Tip: kind words + the important customer problem = best score.</p></div>`;setTimeout(()=>replyBox?.focus(),100)}
function grade(text){const t=text.toLowerCase();let score=0;if(t.length>=8)score++;if(['please','thanks','thank','sorry','happy','help','sure','yes'].some(w=>t.includes(w)))score++;score+=active.need.filter(w=>t.includes(w)).length;return score}
function submitTyped(){if(!active)return;const text=(replyBox.value||'').trim();if(!text){flash('Type your answer first!');return}const score=grade(text);if(score>=3){S.money+=(active.type==='proposal'?30:15)+upgradePayBonus();S.happy=Math.min(100,S.happy+6);S.streak++;S.orders++;flash(`Great typed reply! ⭐ You wrote: “${esc(text)}”`)}else if(score>=2){S.money+=(active.type==='proposal'?15:7)+Math.floor(upgradePayBonus()/2);S.happy=Math.min(100,S.happy+1);S.streak=0;S.orders++;flash(`Okay reply! Try adding more helpful details next time.`)}else{S.happy=Math.max(0,S.happy-8);S.streak=0;flash('Oops! Make it kinder and answer the customer problem.')}S.tick++;if(S.tick>=32){S.day++;S.tick=0;S.money+=S.happy>70?50:15;flash('Work day finished! Bonus paid 🎉')}active=null;sync();save();setTimeout(makeTask,900)}
function showHint(){if(active)flash('Hint: '+active.hint)}
function flash(t){inbox.insertAdjacentHTML('afterbegin',`<p><b>${t}</b></p>`)}
start.onclick=()=>{S.started=true;S.name=playerName?.value||'Player';S.biz=bizName.value||S.biz;intro.hidden=true;game.hidden=false;sync();makeTask();save()}
chatAppBtn.onclick=openChatApp;
workShiftBtn.onclick=startWorkShift;
adultOfficeBtn.onclick=adultOfficeMode;
proposalBtn.onclick=openProposalDesk;
tutorial.onclick=()=>openM('Tutorial 🌟','<ol><li>Read the call/message/email.</li><li>Type your own kind answer.</li><li>Include the important words, like order, refund, password, or link.</li><li>Earn money and buy upgrades.</li><li>Every upgrade unlocks more work, harder questions, and proposals.</li><li>Auctions need a 5 minute wait after each sale.</li></ol>');


function itemPicture(text){
  const t=(text||'').toLowerCase();
  if(t.includes('phone')) return '📱';
  if(t.includes('computer')||t.includes('laptop')) return '💻';
  if(t.includes('game')) return '🎮';
  if(t.includes('pet')||t.includes('dog')) return '🐶';
  if(t.includes('cat')) return '🐱';
  if(t.includes('plush')||t.includes('teddy')) return '🧸';
  if(t.includes('sticker')) return '🌈';
  if(t.includes('book')) return '📚';
  if(t.includes('cake')||t.includes('cupcake')) return '🧁';
  if(t.includes('pizza')) return '🍕';
  if(t.includes('flower')) return '🌸';
  if(t.includes('car')) return '🚗';
  if(t.includes('house')) return '🏠';
  if(t.includes('dress')||t.includes('clothes')) return '👗';
  if(t.includes('makeup')) return '💄';
  if(t.includes('music')) return '🎵';
  if(t.includes('camera')||t.includes('video')) return '🎥';
  if(t.includes('money')) return '💵';
  if(t.includes('star')) return '🌟';
  return '🎁';
}
function updateAuctionPreview(){
  const item=document.getElementById('auctionItem')?.value||'';
  const desc=document.getElementById('auctionDesc')?.value||'';
  const pic=document.getElementById('auctionPic');
  const name=document.getElementById('auctionPicName');
  if(pic) pic.textContent=itemPicture(item+' '+desc);
  if(name) name.textContent=item||'Your item preview';
}

function enterGame(){if(!S.started){S.started=true;S.name=playerName?.value||S.name||'Player';S.biz=bizName?.value||S.biz;intro.hidden=true;game.hidden=false;sync();save();}}
function openAuction(){
  enterGame();
  const waitLeft=Math.max(0,AUCTION_WAIT-(Date.now()-S.lastAuction));
  if(waitLeft>0){const m=Math.floor(waitLeft/60000),s=Math.ceil((waitLeft%60000)/1000); openM('Auction Waiting ⏳', `<p>You already did an auction. Wait <b>${m}:${String(s).padStart(2,'0')}</b> before the next one.</p><button onclick="openOffice()">Teleport to Office 🏢</button>`); return;}
  openM('Create Your Own Auction 🔨', `
    <p>You are the host! Pick an item, write a cute description, then start bidding.</p>
    <div style="text-align:center;background:#fff0fb;border:3px dashed #ff9bd3;border-radius:18px;padding:12px;margin-bottom:10px"><div id="auctionPic" style="font-size:64px">🎁</div><b id="auctionPicName">Cute Mystery Box</b><p class="tiny">This picture changes when you type!</p></div>
    <label>Item name<br><input id="auctionItem" value="Cute Mystery Box" maxlength="30" oninput="updateAuctionPreview()"></label><br><br>
    <label>Description<br><textarea id="auctionDesc" rows="3" maxlength="120" placeholder="Tell buyers why it is special..." oninput="updateAuctionPreview()"></textarea></label><br>
    <button onclick="startAuction()">Start Auction 🎤</button>
  `);
}
function startAuction(){
  const item=(document.getElementById('auctionItem')?.value||'Cute Item').trim();
  const desc=(document.getElementById('auctionDesc')?.value||'A super cute item!').trim();
  let bid=20+Math.floor(Math.random()*20)+(S.upgrades.length*10);
  let round=1;
  mb.innerHTML=`<div style="text-align:center;font-size:70px">${itemPicture(item+' '+desc)}</div><h3>🎤 Hosting: ${esc(item)}</h3><p>${esc(desc)}</p><p id="auctionBid">Current bid: $${bid}</p><p id="auctionRound">Round 1/3</p><button onclick="auctionHype('${esc(item)}',${bid},${round})">📣 Hype the item</button><button onclick="finishAuction(${bid})">Sell Now 💵</button>`;
}
function auctionHype(item,bid,round){
  bid += 15 + Math.floor(Math.random()*30) + S.upgrades.length*5;
  round++;
  if(round>3) return finishAuction(bid);
  mb.innerHTML=`<div style="text-align:center;font-size:70px">${itemPicture(item)}</div><h3>🎤 Hosting: ${item}</h3><p>You hyped it up! Buyers are excited!</p><p id="auctionBid">Current bid: $${bid}</p><p id="auctionRound">Round ${round}/3</p><button onclick="auctionHype('${item}',${bid},${round})">📣 Hype again</button><button onclick="finishAuction(${bid})">Sell Now 💵</button>`;
}
function finishAuction(bid){
  S.money+=bid; S.happy=Math.min(100,S.happy+10); S.orders++; S.streak++; S.lastAuction=Date.now();
  sync(); save();
  mb.innerHTML=`<h3>Sold! 🎉</h3><p>You hosted the auction and sold it for <b>$${bid}</b>!</p><p>You are a great auction host 🔨✨</p>`;
}

function officeDecor(){return S.officeItems.length?S.officeItems.map(n=>officeCatalog.find(i=>i.name===n)?.emoji||'🎁').join(' '):'📦 empty office'}
function hasOfficeItem(name){return S.officeItems.includes(name)}
function openOffice(){
  enterGame();
  S.player.x=Math.max(12,Math.min(88,S.player.x||50));
  S.player.y=Math.max(32,Math.min(82,S.player.y||68));
  const item=(name,cls,label=name)=>hasOfficeItem(name)?`<button class="office-item ${cls}" data-thing="${name}" onclick="useOfficeThing('${name.replaceAll("'","\\'")}')">${officeCatalog.find(i=>i.name===name)?.emoji}<span>${label}</span></button>`:'';
  inbox.innerHTML=`<div class="task"><h3>🏢 Tinley’s Walk-Around Office</h3><p>Move Tinley around, then press <b>Use</b> near things.</p><div class="office-room walk-room" id="officeRoom">
    <div class="office-wall"><button class="window walk-hotspot" data-thing="Window" onclick="useOfficeThing('Window')">☀️<span>Window</span></button>${item('Neon Sign','neon')}${item('Wall TV','tv')}</div>
    <div class="office-floor"></div>
    <button class="office-desk walk-hotspot" data-thing="CEO Desk" onclick="useOfficeThing('CEO Desk')">${hasOfficeItem('Royal Desk')?'👑':'💻'}<br><span>Desk</span></button>
    <button class="office-chair walk-hotspot" data-thing="Chair" onclick="useOfficeThing('Chair')">${hasOfficeItem('Gaming Chair')?'💺':'🪑'}<span>Chair</span></button>
    <button class="office-phone walk-hotspot" data-thing="Phone" onclick="useOfficeThing('Phone')">☎️<span>Phone</span></button>
    <button class="office-printer walk-hotspot" data-thing="Printer" onclick="useOfficeThing('Printer')">🖨️<span>Printer</span></button>
    ${item('Pink Rug','rug')}${item('Flower Lamp','lamp')}${item('Snack Table','snacks')}${item('Fish Tank','fish')}${item('Mini Couch','couch')}${item('Plant Corner','plant')}${item('Tiny Fountain','fountain')}${item('Office Elevator','elevator')}
    <div id="tinleyPlayer" class="tinley-player" style="left:${S.player.x}%;top:${S.player.y}%"><div class="big-person"><div class="person-head"></div><div class="person-body"></div><div class="person-arm left"></div><div class="person-arm right"></div><div class="person-leg left"></div><div class="person-leg right"></div></div><span>${esc(S.name||'Player')}</span></div>
  </div><div class="move-pad"><button onclick="movePlayer(0,-8)">⬆️</button><button onclick="movePlayer(-8,0)">⬅️</button><button onclick="useNearbyThing()">Use ✨</button><button onclick="movePlayer(8,0)">➡️</button><button onclick="movePlayer(0,8)">⬇️</button></div><div class="office-actions"><button onclick="officeMiniJob('email')">📧 Answer Emails</button><button onclick="officeMiniJob('call')">📞 Take Calls</button><button onclick="officeMiniJob('meeting')">📅 Meeting</button><button onclick="officeMiniJob('pack')">📦 Pack Orders</button></div><p>Office cool score: <b>${S.officeItems.length}</b></p><button onclick="openOfficeShop()">🛋 Open Office Shop</button><button onclick="makeTask()">💻 Back to Work</button></div>`;
  if(modal.open) modal.close();
}
function movePlayer(dx,dy){
  S.player.x=Math.max(6,Math.min(92,S.player.x+dx));
  S.player.y=Math.max(24,Math.min(86,S.player.y+dy));
  const p=document.getElementById('tinleyPlayer'); if(p){p.style.left=S.player.x+'%'; p.style.top=S.player.y+'%'; p.classList.add('moving'); setTimeout(()=>p.classList.remove('moving'),250);}
  save();
}
function useNearbyThing(){
  const spots=[
    {name:'CEO Desk',x:50,y:58},{name:'Chair',x:50,y:44},{name:'Phone',x:61,y:48},{name:'Printer',x:30,y:53},{name:'Window',x:18,y:25},
    {name:'Snack Table',x:75,y:70},{name:'Fish Tank',x:13,y:62},{name:'Mini Couch',x:18,y:78},{name:'Plant Corner',x:88,y:78},{name:'Wall TV',x:50,y:22},{name:'Office Elevator',x:72,y:48}
  ];
  let best=spots.map(s=>({...s,d:Math.hypot(S.player.x-s.x,S.player.y-s.y)})).sort((a,b)=>a.d-b.d)[0];
  if(best&&best.d<28) useOfficeThing(best.name); else flash('Walk closer to something first!');
}
window.addEventListener('keydown',e=>{if(!document.getElementById('tinleyPlayer'))return; if(e.key==='ArrowUp'||e.key==='w')movePlayer(0,-8); if(e.key==='ArrowDown'||e.key==='s')movePlayer(0,8); if(e.key==='ArrowLeft'||e.key==='a')movePlayer(-8,0); if(e.key==='ArrowRight'||e.key==='d')movePlayer(8,0); if(e.key===' '||e.key==='Enter')useNearbyThing();});
function officeMiniJob(kind){
  const jobs={email:['📧 Email Work','Reply to 3 customer emails kindly.'],call:['📞 Phone Work','Help a customer on the phone.'],meeting:['📅 Meeting','Tell your team the plan for today.'],pack:['📦 Order Work','Pack and ship online orders.']};
  const j=jobs[kind]||jobs.email;
  openM(j[0], `<p>${j[1]}</p><textarea id="officeJobText" rows="4" maxlength="180" placeholder="Type what Tinley does..."></textarea><br><button onclick="finishOfficeMiniJob('${kind}')">Finish Job ✅</button>`);
}
function finishOfficeMiniJob(kind){
  const text=(document.getElementById('officeJobText')?.value||'').trim();
  if(text.length<8){showBuyResult('Type what you did first.','#FFB7C5');return;}
  const pay=25+S.officeItems.length*5+(text.length>35?20:0);
  S.money+=pay; S.orders++; S.happy=Math.min(100,S.happy+4); sync(); save();
  mb.innerHTML=`<h3>Office work done ✅</h3><p>Tinley finished real office work.</p><p>You earned <b>$${pay}</b>.</p><button onclick="openOffice()">Back to Office 🏢</button>`;
}
function useOfficeThing(name){
  if(name==='CEO Desk'){officeMiniJob('email');return;}
  if(name==='Phone'){officeMiniJob('call');return;}
  if(name==='Printer'){officeMiniJob('pack');return;}
  const messages={Window:'Tinley looks out the office window ☀️',Chair:'Tinley sits in the chair — comfy!', 'Snack Table':'Tinley takes a snack break 🍪', 'Fish Tank':'Tinley watches the fish swim 🐠', 'Mini Couch':'Tinley relaxes on the couch 🛋️', 'Wall TV':'Tinley checks the office TV 📺', 'Neon Sign':'The neon sign glows ✨', 'Office Elevator':'Tinley rides the elevator 🛗'};
  S.happy=Math.min(100,S.happy+1); sync(); save();
  flash(messages[name]||`Tinley used ${name}. No free money — do a job to earn cash!`);
}
function openOfficeShop(){
  enterGame();
  const rows=officeCatalog.map((it,i)=>{const owned=S.officeItems.includes(it.name), afford=S.money>=it.cost;return `<div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;background:${owned?'#dcffd9':'#fff7fb'};border-radius:16px;padding:10px;margin:8px 0"><span style="font-size:28px">${it.emoji}</span><div><b>${it.name}</b><br><span class="tiny">$${it.cost}</span></div>${owned?'✅ Owned':`<button ${afford?'':'disabled'} onclick="buyOfficeItem(${i})">Buy</button>`}</div>`}).join('');
  openM('Office Shop 🛋', `<p>Buy things to make your office look cool.</p>${rows}<button onclick="openOffice()">Teleport to Office 🏢</button>`);
}
function buyOfficeItem(i){
  const it=officeCatalog[i]; if(!it)return;
  if(S.officeItems.includes(it.name)){showBuyResult('You already have that in your office.','#C7CEEA');return;}
  if(S.money<it.cost){showBuyResult(`Need $${it.cost} for ${it.name}.`,'#FFB7C5');return;}
  S.money-=it.cost; S.officeItems.push(it.name); S.happy=Math.min(100,S.happy+3); sync(); save(); openOfficeShop();
}
reset.onclick=()=>{if(confirm('Reset game?')){localStorage.removeItem(saveKey);location.reload()}}
function openM(t,b){mt.textContent=t;mb.innerHTML=b;modal.showModal()} window.toggleMusic=toggleMusic; window.submitTyped=submitTyped; window.showHint=showHint; window.openAuction=openAuction; window.startAuction=startAuction; window.auctionHype=auctionHype; window.finishAuction=finishAuction; window.updateAuctionPreview=updateAuctionPreview; window.openProposalDesk=openProposalDesk; window.startProposal=startProposal; window.submitProposal=submitProposal; window.proposalHint=proposalHint; window.adultOfficeMode=adultOfficeMode; window.clientMeeting=clientMeeting; window.makeInvoice=makeInvoice; window.writeReport=writeReport; window.approveRequest=approveRequest; window.performanceReview=performanceReview; window.budgetPlan=budgetPlan; window.submitOfficeWork=submitOfficeWork; window.openUpgradeShop=openUpgradeShop; window.buyUpgrade=buyUpgrade; window.buyNextUpgrade=buyNextUpgrade; window.openOffice=openOffice; window.openOfficeShop=openOfficeShop; window.buyOfficeItem=buyOfficeItem; window.startWorkShift=startWorkShift; window.doShiftTask=doShiftTask; window.submitShiftTask=submitShiftTask; window.shiftTaskHint=shiftTaskHint; window.finishShift=finishShift; window.openChatApp=openChatApp; window.renderChats=renderChats; window.sendChatReply=sendChatReply; window.chatHint=chatHint;
if(S.started){intro.hidden=true;game.hidden=false;sync();makeTask()} else sync();
