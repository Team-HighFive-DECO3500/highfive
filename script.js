// Initialize data from localStorage or use defaults
const initData = () => {
    const defaultTasks = [
        { id: 1, text: 'Clean Cabinet', priority: 'Today', category: 'Cleaning', assignee: 3 },
        { id: 2, text: 'Refill Coffee Machine', priority: 'Today', category: 'Supplies', assignee: 5 },
        { id: 3, text: 'Take out trash', priority: 'Today', category: 'Cleaning', assignee: 2 },
        { id: 4, text: 'Replace Water Filter', priority: 'This Week', category: 'Maintenance', assignee: 0 },
        { id: 5, text: 'Deep Clean Floor', priority: 'This Week', category: 'Cleaning', assignee: 0 },
        { id: 6, text: 'Organize Pantry', priority: 'This Week', category: 'Organization', assignee: 3 },
        { id: 7, text: 'Clean Oven', priority: 'Monthly', category: 'Cleaning', assignee: 0 },
        { id: 8, text: 'Wipe Down Sink', priority: 'Monthly', category: 'Cleaning', assignee: 0 }
    ];

    const defaultSupplies = [
        { name: 'Dish soap', status: 'urgent', note: '(reported by Emma)' },
        { name: 'Floor Cleaner', status: 'urgent', note: '' },
        { name: 'Coffee beans', status: 'low', note: '(3 days left)' },
        { name: 'Toilet paper', status: 'low', note: '' },
        { name: 'Water Filter Cartridge', status: 'low', note: '' },
        { name: 'Trash Bags', status: 'stocked', note: '' },
        { name: 'Paper Towels', status: 'stocked', note: '' },
        { name: 'Dishwasher Tablets', status: 'stocked', note: '' }
    ];

    const defaultNotes = [
        { id: 1, text: "Made extra bolognese - help yourselves! It's in the big container in the fridge 👍", author: 'Sarah', time: '2h ago', avatar: 1 }
    ];

    const defaultActivities = [
        { id: 1, text: 'Sarah cleaned the microwave', time: '-30m ago', avatar: 4 },
        { id: 2, text: 'Alex restocked milk and eggs', time: '-1hr ago', avatar: 2 }
    ];

    return {
        tasks: JSON.parse(localStorage.getItem('kitchenkat_tasks')) || defaultTasks,
        supplies: JSON.parse(localStorage.getItem('kitchenkat_supplies')) || defaultSupplies,
        notes: JSON.parse(localStorage.getItem('kitchenkat_notes')) || defaultNotes,
        activities: JSON.parse(localStorage.getItem('kitchenkat_activities')) || defaultActivities
    };
};

let appData = initData();

// Save data to localStorage
const saveData = () => {
    localStorage.setItem('kitchenkat_tasks', JSON.stringify(appData.tasks));
    localStorage.setItem('kitchenkat_supplies', JSON.stringify(appData.supplies));
    localStorage.setItem('kitchenkat_notes', JSON.stringify(appData.notes));
    localStorage.setItem('kitchenkat_activities', JSON.stringify(appData.activities));
};

// Avatar generator
const getAvatar = (index) => {
    const colors = ['%23E8B534', '%237DB1FF', '%2366CC99', '%23F0C5BE', '%23FFB6C1'];
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='${colors[index % colors.length]}'/%3E%3C/svg%3E`;
};

// Show toast notification
const showToast = (message) => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

// Show confetti animation
const showConfetti = () => {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = window.innerHeight + 'px';
        confetti.style.background = ['#7DB1FF', '#F5C542', '#66CC88', '#F0C5BE', '#FFB6C1'][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
};

// View Management
const switchView = (viewId) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Render Functions
const renderTasks = () => {
    const immediateContainer = document.getElementById('immediate-tasks');
    const weekContainer = document.getElementById('week-tasks');
    const monthlyContainer = document.getElementById('monthly-tasks');

    immediateContainer.innerHTML = '';
    weekContainer.innerHTML = '';
    monthlyContainer.innerHTML = '';

    appData.tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task-chip';
        taskEl.draggable = true;
        taskEl.dataset.taskId = task.id;
        taskEl.innerHTML = `
            <span>${task.text}</span>
            <img src="${getAvatar(task.assignee)}" alt="Assignee">
        `;

        taskEl.addEventListener('dragstart', handleDragStart);
        taskEl.addEventListener('dragend', handleDragEnd);

        if (task.priority === 'Today') {
            immediateContainer.appendChild(taskEl);
        } else if (task.priority === 'This Week') {
            weekContainer.appendChild(taskEl);
        } else {
            monthlyContainer.appendChild(taskEl);
        }
    });
};

const renderSupplies = () => {
    const supplyList = document.getElementById('supply-list');
    const urgent = appData.supplies.filter(s => s.status === 'urgent');
    const low = appData.supplies.filter(s => s.status === 'low');
    const stocked = appData.supplies.filter(s => s.status === 'stocked');

    supplyList.innerHTML = `
        ${urgent.length > 0 ? `
            <div class="supply-section">
                <h4><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Urgent Needs</h4>
                <ul>
                    ${urgent.map(s => `<li>• ${s.name}${s.note ? ` <span class="supply-note">${s.note}</span>` : ''}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        ${low.length > 0 ? `
            <div class="supply-section">
                <h4><span class="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span> Running Low</h4>
                <ul>
                    ${low.map(s => `<li>• ${s.name}${s.note ? ` <span class="supply-note">${s.note}</span>` : ''}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        ${stocked.length > 0 ? `
            <div class="supply-section">
                <h4><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Well Stocked</h4>
                <ul>
                    ${stocked.map(s => `<li>• ${s.name}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
    `;
};

const renderNotes = () => {
    const notesContainer = document.getElementById('house-notes');
    notesContainer.innerHTML = appData.notes.map(note => `
        <div class="note-card">
            <img src="${getAvatar(note.avatar)}" alt="${note.author}">
            <div class="note-content">
                <p>${note.text}</p>
                <span>— ${note.author}, ${note.time}</span>
            </div>
        </div>
    `).join('');
};

const renderActivities = () => {
    const activitiesContainer = document.getElementById('recent-activities');
    setTimeout(() => {
        activitiesContainer.innerHTML = appData.activities.map(activity => `
            <div class="activity-item">
                <img src="${getAvatar(activity.avatar)}" alt="User">
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span>${activity.time}</span>
                </div>
            </div>
        `).join('');
    }, 800);
};

// Drag and Drop Handlers
let draggedTask = null;

const handleDragStart = (e) => {
    draggedTask = e.target;
    e.target.classList.add('dragging');
};

const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    draggedTask = null;
};

const handleDragOver = (e) => {
    e.preventDefault();
    const dropZone = e.target.closest('.task-drop-zone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
};

const handleDragLeave = (e) => {
    const dropZone = e.target.closest('.task-drop-zone');
    if (dropZone && !dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('drag-over');
    }
};

const handleDrop = (e) => {
    e.preventDefault();
    const dropZone = e.target.closest('.task-drop-zone');
    if (!dropZone || !draggedTask) return;

    dropZone.classList.remove('drag-over');
    const taskId = parseInt(draggedTask.dataset.taskId);
    const task = appData.tasks.find(t => t.id === taskId);

    if (dropZone.classList.contains('complete-zone')) {
        // Remove task and add to activities
        appData.tasks = appData.tasks.filter(t => t.id !== taskId);
        appData.activities.unshift({
            id: Date.now(),
            text: `Task completed: ${task.text}`,
            time: 'Just now',
            avatar: task.assignee
        });
        showToast('Task completed! 🎉');
        showConfetti();
    } else {
        // Update task priority
        const newPriority = dropZone.dataset.priority;
        task.priority = newPriority;
        showToast(`Task moved to ${newPriority}`);
    }

    saveData();
    renderTasks();
    renderActivities();
};

// Form Handlers
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('task-description').value.trim();
    if (!description) return;

    const category = document.querySelector('input[name="category"]:checked').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;

    const newTask = {
        id: Date.now(),
        text: description,
        priority,
        category,
        assignee: Math.floor(Math.random() * 5)
    };

    appData.tasks.push(newTask);
    appData.activities.unshift({
        id: Date.now(),
        text: `New task added: ${description}`,
        time: 'Just now',
        avatar: newTask.assignee
    });

    saveData();
    renderTasks();
    renderActivities();
    showToast('Task added successfully!');
    e.target.reset();
});

document.getElementById('cancel-task').addEventListener('click', () => {
    document.getElementById('task-form').reset();
});

document.getElementById('supply-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = document.getElementById('supply-item').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const note = document.getElementById('supply-note').value.trim();

    if (!item) {
        showToast('Please select an item');
        return;
    }

    const existingSupply = appData.supplies.find(s => s.name === item);
    const statusMap = {
        'Running low': 'low',
        'Empty': 'urgent',
        'Expired': 'urgent'
    };

    if (existingSupply) {
        existingSupply.status = statusMap[status];
        existingSupply.note = note ? `(${note})` : '';
    } else {
        appData.supplies.push({
            name: item,
            status: statusMap[status],
            note: note ? `(${note})` : ''
        });
    }

    appData.activities.unshift({
        id: Date.now(),
        text: `Supply reported: ${item} - ${status}`,
        time: 'Just now',
        avatar: 1
    });

    saveData();
    renderSupplies();
    renderActivities();
    showToast('Supply issue reported!');
    e.target.reset();
});

document.getElementById('cancel-supply').addEventListener('click', () => {
    document.getElementById('supply-form').reset();
});

document.getElementById('note-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const noteText = document.getElementById('note-text').value.trim();
    if (!noteText) return;

    const newNote = {
        id: Date.now(),
        text: noteText,
        author: 'You',
        time: 'Just now',
        avatar: 0
    };

    appData.notes.unshift(newNote);
    appData.activities.unshift({
        id: Date.now(),
        text: 'New house note added',
        time: 'Just now',
        avatar: 0
    });

    saveData();
    renderNotes();
    renderActivities();
    showToast('Note added!');
    document.getElementById('note-modal').classList.remove('active');
    e.target.reset();
});

// Navigation Handlers
document.getElementById('check-tasks-btn').addEventListener('click', () => {
    switchView('task-manager-view');
});

document.getElementById('supply-status-btn').addEventListener('click', () => {
    switchView('supply-view');
});

document.getElementById('back-from-tasks').addEventListener('click', () => {
    switchView('dashboard-view');
});

document.getElementById('back-from-supply').addEventListener('click', () => {
    switchView('dashboard-view');
});

// Modal Handlers
document.getElementById('add-note-btn').addEventListener('click', () => {
    document.getElementById('note-modal').classList.add('active');
});

document.getElementById('cancel-note').addEventListener('click', () => {
    document.getElementById('note-modal').classList.remove('active');
    document.getElementById('note-form').reset();
});

document.getElementById('note-modal').addEventListener('click', (e) => {
    if (e.target.id === 'note-modal') {
        document.getElementById('note-modal').classList.remove('active');
        document.getElementById('note-form').reset();
    }
});

// Drag and Drop Setup
document.addEventListener('DOMContentLoaded', () => {
    // Render initial data
    renderTasks();
    renderSupplies();
    renderNotes();
    renderActivities();

    // Setup drag and drop
    const dropZones = document.querySelectorAll('.task-drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('note-modal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.getElementById('note-form').reset();
        }
    }
});