/* ---------- App state & helpers ---------- */
/* AI tool like (ChatGPT) was used for guidance and code generation in selective areas, mainly to handle complex logic and link interactive views across pages (e.g., dashboard → task manager → supply view). They also helped draft drag-and-drop functions, localStorage setup, and repetitive render methods for tasks, supplies, and notes.
All AI-assisted code was reviewed, tested, and modified to ensure functionality, originality, and academic integrity.
Core logic, UI design, colour themes, and user interactions were human-designed and implemented manually.
const MEMBER_COLORS = ['#E8B534','#7DB1FF','#66CC99','#F0C5BE','#FFB6C1','#FFD166','#B5EAEA','#C3F0CA']; */

// Order: You=0, Priya=1, Kiran=2, Sadhika=3, Cora=4
const defaultMembers = [
  { id: 0, name: 'You',     color: MEMBER_COLORS[0] },
  { id: 1, name: 'Priya',   color: MEMBER_COLORS[1] },
  { id: 2, name: 'Kiran',   color: MEMBER_COLORS[2] },
  { id: 3, name: 'Sadhika', color: MEMBER_COLORS[3] },
  { id: 4, name: 'Cora',    color: MEMBER_COLORS[4] },
];

const initData = () => {
  // redistributed across members (not “mostly You”)
  const defaultTasks = [
    { id: 1, text: 'Clean Cabinet',          priority: 'Today',     category: 'Cleaning',     assignee: 3 }, // Sadhika
    { id: 2, text: 'Refill Coffee Machine',  priority: 'Today',     category: 'Supplies',     assignee: 4 }, // Cora
    { id: 3, text: 'Take out trash',         priority: 'Today',     category: 'Cleaning',     assignee: 2 }, // Kiran
    { id: 4, text: 'Replace Water Filter',   priority: 'This Week', category: 'Maintenance',  assignee: 1 }, // Priya
    { id: 5, text: 'Deep Clean Floor',       priority: 'This Week', category: 'Cleaning',     assignee: 0 }, // You
    { id: 6, text: 'Organize Pantry',        priority: 'This Week', category: 'Organization', assignee: 3 }, // Sadhika
    { id: 7, text: 'Clean Oven',             priority: 'Monthly',   category: 'Cleaning',     assignee: 2 }, // Kiran
    { id: 8, text: 'Wipe Down Sink',         priority: 'Monthly',   category: 'Cleaning',     assignee: 4 }, // Cora
  ];

  const defaultSupplies = [
    { name: 'Dish soap', status: 'urgent', note: '(reported by Cora)' },
    { name: 'Floor Cleaner', status: 'urgent', note: '' },
    { name: 'Coffee beans', status: 'low', note: '(3 days left)' },
    { name: 'Toilet paper', status: 'low', note: '' },
    { name: 'Water Filter Cartridge', status: 'low', note: '' },
    { name: 'Trash Bags', status: 'stocked', note: '' },
    { name: 'Paper Towels', status: 'stocked', note: '' },
    { name: 'Dishwasher Tablets', status: 'stocked', note: '' }
  ];

  const defaultNotes = [
    { id: 1, text: "Made extra bolognese - help yourselves! It's in the big container in the fridge 👍", authorId: 3, time: '2h ago' } // Sadhika
  ];

  const defaultActivities = [
    { id: 1, text: 'Cleaned the microwave',  by: 3, time: '30m ago' }, // Sadhika
    { id: 2, text: 'Restocked milk and eggs',by: 1, time: '1h ago' }   // Priya
  ];

  // Bin alert (no acknowledged state)
  const defaultBin = { isFull: true, reportedBy: 1, text: 'Bin is full — needs taking out' }; // Priya

  return {
    members: JSON.parse(localStorage.getItem('kk_members')) || defaultMembers,
    tasks: JSON.parse(localStorage.getItem('kitchenkat_tasks')) || defaultTasks,
    supplies: JSON.parse(localStorage.getItem('kitchenkat_supplies')) || defaultSupplies,
    notes: JSON.parse(localStorage.getItem('kitchenkat_notes')) || defaultNotes,
    activities: JSON.parse(localStorage.getItem('kitchenkat_activities')) || defaultActivities,
    bin: JSON.parse(localStorage.getItem('kitchenkat_bin')) || defaultBin,
  };
};

let appData = initData();

const saveData = () => {
  localStorage.setItem('kk_members', JSON.stringify(appData.members));
  localStorage.setItem('kitchenkat_tasks', JSON.stringify(appData.tasks));
  localStorage.setItem('kitchenkat_supplies', JSON.stringify(appData.supplies));
  localStorage.setItem('kitchenkat_notes', JSON.stringify(appData.notes));
  localStorage.setItem('kitchenkat_activities', JSON.stringify(appData.activities));
  localStorage.setItem('kitchenkat_bin', JSON.stringify(appData.bin));
};

const getMember = (id) => appData.members.find(m => m.id === id) || appData.members[0];
const initials = (name) => (name || '?').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();

const avatarHTML = (member, size='base', extra='') =>
  `<div class="avatar ${size==='sm'?'sm':size==='lg'?'lg':''}" style="background:${member.color}" title="${member.name}" ${extra}>${initials(member.name)}</div>`;

const showToast = (message) => {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

const showConfetti = () => {
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * window.innerWidth + 'px';
    c.style.top = window.innerHeight + 'px';
    c.style.background = MEMBER_COLORS[Math.floor(Math.random() * MEMBER_COLORS.length)];
    c.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
};

const switchView = (id) => {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ---------- Renderers ---------- */
const renderBinAlert = () => {
  const el = document.getElementById('bin-alert');
  const who = getMember(appData.bin.reportedBy || 0);

  el.style.display = 'inline-flex';
  el.innerHTML = `
    <span class="dot"></span>
    <span>${appData.bin.text || 'Bin is full — needs taking out'}</span>
    <span class="reporter">— ${who.name}</span>
    <button id="ack-bin" class="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose hover:bg-lightrose transition">
      Mark as taken
    </button>
  `;

  document.getElementById('ack-bin').onclick = () => {
    showToast('Thanks! Bin taken care of!');
  };
};

const renderAvatarStack = () => {
  const stack = document.getElementById('avatar-stack');
  const rightCol = document.getElementById('right-avatars');
  stack.innerHTML = '';
  rightCol.innerHTML = '';

  const maxShow = 4;
  const toShow = appData.members.slice(0, maxShow);
  toShow.forEach((m, i) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = avatarHTML(m);
    wrap.firstChild.style.marginLeft = i === 0 ? '0' : '-12px';
    stack.appendChild(wrap.firstChild);
  });

  if (appData.members.length > maxShow) {
    const extra = appData.members.length - maxShow;
    const more = document.createElement('div');
    more.className = 'avatar';
    more.style.background = '#fff';
    more.style.borderColor = '#e5e7eb';
    more.textContent = `+${extra}`;
    more.style.marginLeft = '-12px';
    stack.appendChild(more);
  }

  // right floating column
  appData.members.forEach(m => {
    const wrap = document.createElement('div');
    wrap.innerHTML = avatarHTML(m,'lg');
    rightCol.appendChild(wrap.firstChild);
  });
};

const renderTasks = () => {
  const zones = {
    'Today': document.getElementById('immediate-tasks'),
    'This Week': document.getElementById('week-tasks'),
    'Monthly': document.getElementById('monthly-tasks')
  };
  Object.values(zones).forEach(z => z.innerHTML = '');

  appData.tasks.forEach(task => {
    const chip = document.createElement('div');
    chip.className = 'task-chip';
    chip.draggable = true;
    chip.dataset.taskId = task.id;
    const assignee = getMember(task.assignee);
    chip.innerHTML = `<span>${task.text}</span>${avatarHTML(assignee,'sm')}`;
    chip.addEventListener('dragstart', handleDragStart);
    chip.addEventListener('dragend', handleDragEnd);
    zones[task.priority].appendChild(chip);
  });
};

const renderSupplies = () => {
  const supplyList = document.getElementById('supply-list');
  const urgent = appData.supplies.filter(s => s.status === 'urgent');
  const low = appData.supplies.filter(s => s.status === 'low');
  const stocked = appData.supplies.filter(s => s.status === 'stocked');

  supplyList.innerHTML = `
    ${urgent.length ? `
      <div class="supply-section">
        <h4><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Urgent Needs</h4>
        <ul>${urgent.map(s=>`<li>• ${s.name}${s.note?` <span class="supply-note">${s.note}</span>`:''}</li>`).join('')}</ul>
      </div>`:''}
    ${low.length ? `
      <div class="supply-section">
        <h4><span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span> Running Low</h4>
        <ul>${low.map(s=>`<li>• ${s.name}${s.note?` <span class="supply-note">${s.note}</span>`:''}</li>`).join('')}</ul>
      </div>`:''}
    ${stocked.length ? `
      <div class="supply-section">
        <h4><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Well Stocked</h4>
        <ul>${stocked.map(s=>`<li>• ${s.name}</li>`).join('')}</ul>
      </div>`:''}
  `;
};

const renderNotes = () => {
  const wrap = document.getElementById('house-notes');
  wrap.innerHTML = appData.notes.map(n => {
    const author = getMember(n.authorId);
    return `<div class="note-card">${avatarHTML(author)}<div class="note-content"><p>${n.text}</p><span>— ${author.name}, ${n.time}</span></div></div>`;
  }).join('');
};

const renderActivities = () => {
  const container = document.getElementById('recent-activities');
  setTimeout(() => {
    container.innerHTML = appData.activities.map(a => {
      const by = getMember(a.by);
      return `<div class="activity-item">${avatarHTML(by)}<div class="activity-content"><p><span class="font-semibold">${by.name}</span> ${a.text}</p><span>${a.time}</span></div></div>`;
    }).join('');
  }, 700);
};

/* ---------- Drag & Drop ---------- */
let draggedTask = null;
const handleDragStart = (e) => { draggedTask = e.target; e.target.classList.add('dragging'); };
const handleDragEnd = (e) => { e.target.classList.remove('dragging'); draggedTask = null; };
const handleDragOver = (e) => { e.preventDefault(); const dz = e.target.closest('.task-drop-zone'); if (dz) dz.classList.add('drag-over'); };
const handleDragLeave = (e) => { const dz = e.target.closest('.task-drop-zone'); if (dz && !dz.contains(e.relatedTarget)) dz.classList.remove('drag-over'); };
const handleDrop = (e) => {
  e.preventDefault();
  const dz = e.target.closest('.task-drop-zone');
  if (!dz || !draggedTask) return;
  dz.classList.remove('drag-over');
  const id = parseInt(draggedTask.dataset.taskId);
  const task = appData.tasks.find(t => t.id === id);

  if (dz.classList.contains('complete-zone')) {
    appData.tasks = appData.tasks.filter(t => t.id !== id);
    appData.activities.unshift({ id: Date.now(), text:`completed "${task.text}"`, by: task.assignee, time:'Just now' });
    showToast('Task completed! 🎉'); showConfetti();
  } else {
    const newPri = dz.dataset.priority;
    task.priority = newPri;
    appData.activities.unshift({ id: Date.now(), text:`moved "${task.text}" to ${newPri}`, by: task.assignee, time:'Just now' });
    showToast(`Task moved to ${newPri}`);
  }
  saveData(); renderTasks(); renderActivities();
};

/* ---------- Forms & UI events ---------- */
document.getElementById('task-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const description = document.getElementById('task-description').value.trim();
  if(!description) return;
  const category = document.querySelector('input[name="category"]:checked').value;
  const priority = document.querySelector('input[name="priority"]:checked').value;

  const assignee = Math.floor(Math.random()*appData.members.length);
  const newTask = { id: Date.now(), text: description, priority, category, assignee };
  appData.tasks.push(newTask);
  appData.activities.unshift({ id: Date.now(), text:`added task "${description}"`, by: assignee, time:'Just now' });
  saveData(); renderTasks(); renderActivities(); showToast('Task added successfully!'); e.target.reset();
});
document.getElementById('cancel-task').addEventListener('click',()=>document.getElementById('task-form').reset());

document.getElementById('supply-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const item = document.getElementById('supply-item').value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const note = document.getElementById('supply-note').value.trim();
  if(!item){ showToast('Please select an item'); return; }

  const existing = appData.supplies.find(s=>s.name===item);
  const statusMap = {'Running low':'low','Empty':'urgent','Expired':'urgent'};
  if(existing){ existing.status = statusMap[status]; existing.note = note?`(${note})`:''; }
  else{ appData.supplies.push({ name:item, status:statusMap[status], note: note?`(${note})`:'' }); }

  if(item==='Trash Bags' && status !== 'Running low'){
    appData.bin = { isFull: true, reportedBy: 1, text: 'Bin is full — needs taking out' }; // Priya
  }

  appData.activities.unshift({ id: Date.now(), text:`reported supply: ${item} - ${status}`, by: 0, time:'Just now' });
  saveData(); renderSupplies(); renderActivities(); renderBinAlert(); showToast('Supply issue reported!'); e.target.reset();
});
document.getElementById('cancel-supply').addEventListener('click',()=>document.getElementById('supply-form').reset());

document.getElementById('note-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const v = document.getElementById('note-text').value.trim();
  if(!v) return;
  const me = 0;
  appData.notes.unshift({ id: Date.now(), text: v, authorId: me, time:'Just now' });
  appData.activities.unshift({ id: Date.now(), text:'added a house note', by: me, time:'Just now' });
  saveData(); renderNotes(); renderActivities(); showToast('Note added!');
  document.getElementById('note-modal').classList.remove('active'); e.target.reset();
});
document.getElementById('cancel-note').addEventListener('click',()=>{ document.getElementById('note-modal').classList.remove('active'); document.getElementById('note-form').reset(); });

/* Navigation */
document.getElementById('check-tasks-btn').addEventListener('click',()=>switchView('task-manager-view'));
document.getElementById('supply-status-btn').addEventListener('click',()=>switchView('supply-view'));
document.getElementById('back-from-tasks').addEventListener('click',()=>switchView('dashboard-view'));
document.getElementById('back-from-supply').addEventListener('click',()=>switchView('dashboard-view'));

/* Modals open/close */
document.getElementById('add-note-btn').addEventListener('click',()=>document.getElementById('note-modal').classList.add('active'));
document.getElementById('note-modal').addEventListener('click',(e)=>{ if(e.target.id==='note-modal'){ e.currentTarget.classList.remove('active'); document.getElementById('note-form').reset(); } });

// People modal (household)
document.getElementById('open-people').addEventListener('click',()=>{ renderPeopleModal(); document.getElementById('people-modal').classList.add('active'); });
document.getElementById('close-people').addEventListener('click',()=>document.getElementById('people-modal').classList.remove('active'));
document.getElementById('people-modal').addEventListener('click',(e)=>{ if(e.target.id==='people-modal'){ e.currentTarget.classList.remove('active'); } });

const renderPeopleModal = () => {
  const list = document.getElementById('people-list');
  list.innerHTML = appData.members.map(m=>`
    <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200">
      <div class="flex items-center gap-3">${avatarHTML(m)}<span class="font-medium">${m.name}</span></div>
      ${m.id===0?'<span class="text-xs text-gray-500">(you)</span>':`<button data-id="${m.id}" class="text-sm px-3 py-1 rounded-full bg-sand hover:bg-lightpeach">Remove</button>`}
    </div>
  `).join('');

  list.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      appData.members = appData.members.filter(m => m.id !== id);
      saveData(); renderPeopleModal(); renderAvatarStack(); renderRightAvatars();
    };
  });
};

document.getElementById('add-person-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = document.getElementById('person-name').value.trim();
  if(!name) return;
  const color = MEMBER_COLORS[Math.floor(Math.random()*MEMBER_COLORS.length)];
  const id = Math.max(0, ...appData.members.map(m=>m.id)) + 1;
  appData.members.push({ id, name, color });
  saveData(); renderPeopleModal(); renderAvatarStack(); showToast(`${name} added to household`); e.target.reset();
});

const renderRightAvatars = () => {
  const rightCol = document.getElementById('right-avatars');
  if(!rightCol) return;
  rightCol.innerHTML = '';
  appData.members.forEach(m => {
    const div = document.createElement('div');
    div.innerHTML = avatarHTML(m,'lg');
    rightCol.appendChild(div.firstChild);
  });
};

/* Drag & drop setup & initial render */
document.addEventListener('DOMContentLoaded', () => {
  renderAvatarStack();
  renderBinAlert();
  renderTasks();
  renderSupplies();
  renderNotes();
  renderActivities();
  renderRightAvatars();

  document.querySelectorAll('.task-drop-zone').forEach(zone=>{
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('dragleave', handleDragLeave);
    zone.addEventListener('drop', handleDrop);
  });
});

/* Keyboard */
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){
    ['note-modal','people-modal'].forEach(id=>{
      const m = document.getElementById(id);
      if(m.classList.contains('active')) m.classList.remove('active');
    });
  }
});
