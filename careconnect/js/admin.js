// ===========================
// ADMIN.JS - Admin Dashboard
// ===========================

// Get DOM elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const requestsSearch = document.getElementById('requestsSearch');
const volunteersSearch = document.getElementById('volunteersSearch');
const exportRequestsBtn = document.getElementById('exportRequests');
const exportVolunteersBtn = document.getElementById('exportVolunteers');
const clearRequestsBtn = document.getElementById('clearRequests');
const clearVolunteersBtn = document.getElementById('clearVolunteers');

let allRequests = [];
let allVolunteers = [];

// Initialize on page load
window.addEventListener('load', () => {
    loadData();
    displayStats();
    displayRequests(getAllRequests());
    displayVolunteers(getAllVolunteers());
});

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Load data from Local Storage
function loadData() {
    try {
        allRequests = JSON.parse(localStorage.getItem('supportRequests')) || [];
        allVolunteers = JSON.parse(localStorage.getItem('volunteerRegistrations')) || [];
    } catch (error) {
        console.error('Error loading data:', error);
        allRequests = [];
        allVolunteers = [];
    }
}

// Get all requests
function getAllRequests() {
    loadData();
    return allRequests;
}

// Get all volunteers
function getAllVolunteers() {
    loadData();
    return allVolunteers;
}

// Display statistics
function displayStats() {
    const totalRequests = getAllRequests().length;
    const totalVolunteers = getAllVolunteers().length;
    const totalEntries = totalRequests + totalVolunteers;
    
    document.getElementById('totalRequests').textContent = totalRequests;
    document.getElementById('totalVolunteers').textContent = totalVolunteers;
    document.getElementById('totalEntries').textContent = totalEntries;
}

// Display support requests in table
function displayRequests(requests) {
    const tbody = document.getElementById('requestsTable');
    const emptyState = document.getElementById('requestsEmpty');
    
    if (requests.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tbody.innerHTML = requests.map(req => `
        <tr>
            <td>${req.id}</td>
            <td>${escapeHtml(req.name)}</td>
            <td>${req.age}</td>
            <td>${escapeHtml(req.email)}</td>
            <td>${escapeHtml(req.phone)}</td>
            <td>${req.supportType}</td>
            <td>${escapeHtml(req.description.substring(0, 50))}...</td>
            <td>${req.submittedAt}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-delete" onclick="deleteRequest(${req.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Display volunteers in table
function displayVolunteers(volunteers) {
    const tbody = document.getElementById('volunteersTable');
    const emptyState = document.getElementById('volunteersEmpty');
    
    if (volunteers.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tbody.innerHTML = volunteers.map(vol => `
        <tr>
            <td>${vol.id}</td>
            <td>${escapeHtml(vol.name)}</td>
            <td>${escapeHtml(vol.email)}</td>
            <td>${escapeHtml(vol.phone)}</td>
            <td>${vol.skill}</td>
            <td>${vol.availability}</td>
            <td>${escapeHtml(vol.motivation.substring(0, 50))}...</td>
            <td>${vol.submittedAt}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-delete" onclick="deleteVolunteer(${vol.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Delete support request
function deleteRequest(id) {
    if (confirm('Are you sure you want to delete this support request?')) {
        try {
            let requests = JSON.parse(localStorage.getItem('supportRequests')) || [];
            requests = requests.filter(req => req.id !== id);
            localStorage.setItem('supportRequests', JSON.stringify(requests));
            
            loadData();
            displayStats();
            displayRequests(getAllRequests());
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Error deleting request');
        }
    }
}

// Delete volunteer
function deleteVolunteer(id) {
    if (confirm('Are you sure you want to delete this volunteer registration?')) {
        try {
            let volunteers = JSON.parse(localStorage.getItem('volunteerRegistrations')) || [];
            volunteers = volunteers.filter(vol => vol.id !== id);
            localStorage.setItem('volunteerRegistrations', JSON.stringify(volunteers));
            
            loadData();
            displayStats();
            displayVolunteers(getAllVolunteers());
        } catch (error) {
            console.error('Error deleting volunteer:', error);
            alert('Error deleting volunteer');
        }
    }
}

// Search requests
requestsSearch.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = getAllRequests().filter(req => 
        req.name.toLowerCase().includes(searchTerm) || 
        req.email.toLowerCase().includes(searchTerm)
    );
    displayRequests(filtered);
});

// Search volunteers
volunteersSearch.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = getAllVolunteers().filter(vol => 
        vol.name.toLowerCase().includes(searchTerm) || 
        vol.skill.toLowerCase().includes(searchTerm)
    );
    displayVolunteers(filtered);
});

// Export requests as CSV
exportRequestsBtn.addEventListener('click', () => {
    const requests = getAllRequests();
    if (requests.length === 0) {
        alert('No support requests to export');
        return;
    }
    
    const csv = convertToCSV(requests, [
        'id', 'name', 'age', 'email', 'phone', 'supportType', 'description', 'submittedAt'
    ]);
    downloadCSV(csv, 'support_requests.csv');
});

// Export volunteers as CSV
exportVolunteersBtn.addEventListener('click', () => {
    const volunteers = getAllVolunteers();
    if (volunteers.length === 0) {
        alert('No volunteer registrations to export');
        return;
    }
    
    const csv = convertToCSV(volunteers, [
        'id', 'name', 'email', 'phone', 'skill', 'availability', 'motivation', 'submittedAt'
    ]);
    downloadCSV(csv, 'volunteer_registrations.csv');
});

// Clear all requests
clearRequestsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear ALL support requests? This cannot be undone.')) {
        try {
            localStorage.setItem('supportRequests', JSON.stringify([]));
            loadData();
            displayStats();
            displayRequests([]);
            alert('All support requests cleared');
        } catch (error) {
            console.error('Error clearing requests:', error);
            alert('Error clearing requests');
        }
    }
});

// Clear all volunteers
clearVolunteersBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear ALL volunteer registrations? This cannot be undone.')) {
        try {
            localStorage.setItem('volunteerRegistrations', JSON.stringify([]));
            loadData();
            displayStats();
            displayVolunteers([]);
            alert('All volunteer registrations cleared');
        } catch (error) {
            console.error('Error clearing volunteers:', error);
            alert('Error clearing volunteers');
        }
    }
});

// Convert array of objects to CSV format
function convertToCSV(data, columns) {
    // Create header row
    const header = columns.join(',');
    
    // Create data rows
    const rows = data.map(row => {
        return columns.map(col => {
            let value = row[col] || '';
            // Escape quotes and wrap in quotes if contains comma
            value = String(value).replace(/"/g, '""');
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                value = `"${value}"`;
            }
            return value;
        }).join(',');
    });
    
    // Combine header and rows
    return [header, ...rows].join('\n');
}

// Download CSV file
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
