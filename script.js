let courriers = [];
let archivedCourriers = [];
let users = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    document.getElementById('welcomeAdmin').innerText = `Bienvenue, ${username}`;
    document.getElementById('welcomeSecretary').innerText = `Bienvenue, ${username}`;
    document.getElementById('welcomeuser').innerText = `Bienvenue, ${username}`;

    // Vérification du mot de passe et validation de l'utilisateur (à implémenter)
    if (role === 'Admin') {
        showSection('admin');
    } else if (role === 'Utilisateur') {
        showSection('user');
    } else if (role === 'Secrétaire') {
        showSection('secretary');
    }
}

function logout() {
    alert("Vous êtes déconnecté.");
    showSection('login');
}

function showAddMailForm() {
    showSection('addMailForm');
}

function addMail(event) {
    event.preventDefault();
    const mailObject = document.getElementById('mailObject').value;
    const receivedDate = document.getElementById('receivedDate').value;
    const service = document.getElementById('service').value;
    const senderReceiver = document.getElementById('senderReceiver').value;
    const nature = document.getElementById('nature').value;

    const courrier = {
        objet: mailObject,
        recuLe: receivedDate,
        service: service,
        expDest: senderReceiver,
        nature: nature,
        id: courriers.length + 1
    };

    courriers.push(courrier);
    alert('Courrier ajouté avec succès!');
    showSection('admin');
    displayMails();
}

function displayMails() {
    const table = document.getElementById('adminMailTable');
    table.innerHTML = `
    <tr>
      <th>Objet</th>
      <th>Reçu le</th>
      <th>Service</th>
      <th>Expéditeur / Destinataire</th>
      <th>Nature</th>
      <th>Actions</th>
    </tr>
  `;

    courriers.forEach(courrier => {
        const row = table.insertRow();
        row.insertCell(0).innerText = courrier.objet;
        row.insertCell(1).innerText = courrier.recuLe;
        row.insertCell(2).innerText = courrier.service;
        row.insertCell(3).innerText = courrier.expDest;
        row.insertCell(4).innerText = courrier.nature;
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
      <button class="btn btn-warning btn-sm" onclick="editMail(${courrier.id})">Modifier</button>
      <button class="btn btn-danger btn-sm" onclick="deleteMail(${courrier.id})">Supprimer</button>
      <button class="btn btn-info btn-sm" onclick="archiveMail(${courrier.id})">Archiver</button>
    `;
    });
}

function editMail(id) {
    const courrier = courriers.find(c => c.id === id);
    if (courrier) {
        document.getElementById('mailObject').value = courrier.objet;
        document.getElementById('receivedDate').value = courrier.recuLe;
        document.getElementById('service').value = courrier.service;
        document.getElementById('senderReceiver').value = courrier.expDest;
        document.getElementById('nature').value = courrier.nature;

        showAddMailForm();
        courriers = courriers.filter(c => c.id !== id);
    }
}

function deleteMail(id) {
    courriers = courriers.filter(c => c.id !== id);
    displayMails();
}

function archiveMail(id) {
    const courrier = courriers.find(c => c.id === id);
    if (courrier) {
        archivedCourriers.push(courrier);
        deleteMail(id);
        alert('Courrier archivé avec succès!');
    }
}

function showArchive() {
    showSection('archive');
    const table = document.getElementById('archiveMailTable');
    table.innerHTML = `
    <tr>
      <th>Objet</th>
      <th>Reçu le</th>
      <th>Service</th>
      <th>Expéditeur / Destinataire</th>
      <th>Nature</th>
      <th>Actions</th>
    </tr>
  `;

    archivedCourriers.forEach(courrier => {
        const row = table.insertRow();
        row.insertCell(0).innerText = courrier.objet;
        row.insertCell(1).innerText = courrier.recuLe;
        row.insertCell(2).innerText = courrier.service;
        row.insertCell(3).innerText = courrier.expDest;
        row.insertCell(4).innerText = courrier.nature;
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
      <button class="btn btn-warning btn-sm" onclick="editArchivedMail(${courrier.id})">Modifier</button>
      <button class="btn btn-danger btn-sm" onclick="deleteArchivedMail(${courrier.id})">Supprimer</button>
    `;
    });
}

function editArchivedMail(id) {
    const courrier = archivedCourriers.find(c => c.id === id);
    if (courrier) {
        document.getElementById('mailObject').value = courrier.objet;
        document.getElementById('receivedDate').value = courrier.recuLe;
        document.getElementById('service').value = courrier.service;
        document.getElementById('senderReceiver').value = courrier.expDest;
        document.getElementById('nature').value = courrier.nature;

        showAddMailForm();
        archivedCourriers = archivedCourriers.filter(c => c.id !== id);
    }
}

function deleteArchivedMail(id) {
    archivedCourriers = archivedCourriers.filter(c => c.id !== id);
    showArchive();
}

function addUser(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newUserRole = document.getElementById('newUserRole').value;
    const newUserPassword = document.getElementById('newUserPassword').value;

    const newUser = {
        id: users.length + 1,
        username: newUsername,
        role: newUserRole,
        password: newUserPassword
    };
    users.push(newUser);
    alert('Utilisateur ajouté avec succès!');
    showSection('admin');
    displayUsers();
}

function displayUsers() {
    const table = document.getElementById('userTable');
    table.innerHTML = `
    <tr>
      <th>Nom d'utilisateur</th>
      <th>Rôle</th>
      <th>Actions</th>
    </tr>
  `;

    users.forEach(user => {
        const row = table.insertRow();
        row.insertCell(0).innerText = user.username;
        row.insertCell(1).innerText = user.role;
        const actionsCell = row.insertCell(2);
        actionsCell.innerHTML = `
      <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Modifier</button>
      <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
    `;
    });
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('newUsername').value = user.username;
        document.getElementById('newUserRole').value = user.role;
        document.getElementById('newUserPassword').value = user.password;

        users = users.filter(u => u.id !== id);
        showSection('addUserForm');
    }
}

function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    displayUsers();
}

// Affichage initial de la section d'accueil
showSection('home');