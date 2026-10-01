let form = document.querySelector('form');

let name = document.querySelector('#name');
let email = document.querySelector('#email');
let image = document.querySelector('#image');

let cardsContainer = document.querySelector('#cards-container');


// Dummy data
let users = [
    {
        name: "Yuvraj Dubey",
        email: "yuvraj@gmail.com",
        image: "https://i.pravatar.cc/150?img=12"
    },
    {
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        image: "https://i.pravatar.cc/150?img=13"
    },
    {
        name: "Aman Verma",
        email: "aman@gmail.com",
        image: "https://i.pravatar.cc/150?img=14"
    }

];


// UI render function
const ui = () => {

    // Pehle existing cards clear karo
    cardsContainer.innerHTML = '';

    // Array ke har user ka card banao
    users.forEach((user,index) => {

        let card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `

            <img src="${user.image}" alt="Profile">

            <h3>${user.name}</h3>

            <p>${user.email}</p>

            <div class="card-buttons">
                <button onclick="editUser(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteUser(${index})" class="delete-btn">Delete</button>
            </div>
        `;

        // Card ko container mein add karo
        cardsContainer.appendChild(card);
    });
};


// Page load hote hi dummy cards show honge
ui();


// Form submit
form.addEventListener('submit', function (event) {

    // Page reload prevent karo
    event.preventDefault();

    // Values trim karke check karo
    let userName = name.value.trim();
    let userEmail = email.value.trim();
    let userImage = image.value.trim();


    // Agar koi bhi field empty hai
    if (
        userName === '' ||
        userEmail === '' ||
        userImage === ''
    ) {
        alert('Please fill in all the fields');
        return;
    }


    // New user object
    let formData = {
        name: userName,
        email: userEmail,
        image: userImage
    };

    if (editIndex !== null) {

        users[editIndex] = formData;

        // Edit complete hone ke baad reset
        editIndex = null;

    } else{
        users.push(formData);
    }
    // Updated array ko UI par render karo
    ui();

    // Form clear karo
    form.reset();
});



function deleteUser(index) {
    users.splice(index, 1);
    ui();
}

function editUser(index) {
    let user = users[index];

    name.value = user.name;
    email.value = user.email;
    image.value = user.image;

    editIndex = index;
}