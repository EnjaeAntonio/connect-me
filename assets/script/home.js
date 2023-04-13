'use strict';

import {onEvent, select, selectAll, create, log} from './utils.js';

import { User } from './User.js';

/*****************************************
        Variables
*****************************************/

const postText = select('.content-input');
const postBtn = select('.post-btn');
const parentPostContent = select('.post');
const errorOutput = select('.error-output');


/*****************************************
        Post Content
*****************************************/

onEvent('click', postBtn, function(){
        // Variables for function
        let img = select('.content-left img').src;
        const selectedFile = document.getElementById('file-upload');
   
        // Validating empty fields
        if (postText.value == '' && selectedFile.value == '') {
                errorOutput.innerText = 'Fields are empty';

        }  else if (selectedFile.value) {
                
                // Obtaining path of selected file
                let url = URL.createObjectURL(selectedFile.files[0]);
                errorOutput.innerText = '';

                // Creating div element
                let newDiv = create('div');
                newDiv.className = 'content'

                newDiv.innerHTML = `
                        <div class="content-header">
                                <div class="content-left">
                                <img src="${img}" class="avatar-pic" alt="">
                                <h1>${user.name}</h1>
                                </div>
                                <i class="fa-solid fa-sliders"></i>
                        </div>
                        <p class="user-output">${postText.value}</p>
                        <img class="user-img" src="${url}"/>
                        <div class="comment-wrapper">
                        <h4 class="time">${getCurrentDateTime()}</h4>
                        </div>                            `;

                // Prepending and also resetting values
                parentPostContent.prepend(newDiv);
                postText.value = '';
                document.getElementById('file-upload').value = '';
                infoArea.textContent = '';

        } else {

                // If a picture is not selected, text box will still post
                errorOutput.innerText = '';
                let newDiv = create('div');
                newDiv.className = 'content'

                newDiv.innerHTML = `
                        <div class="content-header">
                                <div class="content-left">
                                <img src="${img}" class="avatar-pic" alt="">
                                        <h1>${user.name}</h1>
                                </div>
                                <i class="fa-solid fa-sliders"></i>
                        </div>
                        <p class="user-output">${postText.value}</p>
                        <div class="comment-wrapper">
                        <h4 class="time">${getCurrentDateTime()}</h4>
                        </div>                        `;

                parentPostContent.prepend(newDiv);
                postText.value = '';

        }
});




/*****************************************
        Show file name
*****************************************/

let input = document.getElementById( 'file-upload' );
let infoArea = document.getElementById( 'file-upload-filename' );

input.addEventListener( 'change', showFileName );

function showFileName( event ) {
  
  input = event.srcElement;
  let fileName = input.files[0].name;
  infoArea.textContent =  fileName;

}

/*****************************************
        Creating new User
*****************************************/

const user = new User(34369, 'Enjae Antonio', 'EnjaeAC', 'enjaeantonio@gmail.com');

/*****************************************
        Creating profile card
*****************************************/

const profileCard = document.createElement('div');
profileCard.classList.add('user-profile-card');
profileCard.classList.add('profile-dropdown');

profileCard.innerHTML = `
    <div class="profile-card">
        <div class="profile-card-header">
            <h2>${user.name}</h2>
            <div class="dropdown">
                <button class="dropbtn"><i class="fa-solid fa-gear"></i></button>
                <div class="dropdown-content">
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Discover</a></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">My Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#" class="logout-hover">Logout</a></li>
                </div>
            </div>
        </div>
        <div class="profile-card-content">
        <p class="profile-card-username">@${user.userName}</p>
        <p class="profile-card-id">ID: ${user.id}</p>
        <p class="profile-card-email">${user.email}</p>
        </div>
        <button class="premium-btn">
        Subscribe
        </button>
    </div>
`;


const profileContainer = document.querySelector('.profile-container');
profileContainer.appendChild(profileCard);

const userSubInfo = document.querySelector('.fa-user');
userSubInfo.addEventListener('click', function(e) {
    if (profileCard.style.display === 'block') {
        profileCard.style.display = 'none';
    } else {
        profileCard.style.display = 'block';
    }
    e.stopPropagation();
});

// Add click event listener to the document object
document.addEventListener('click', function(e) {
    if (profileCard.style.display === 'block' && !profileCard.contains(e.target) && !userSubInfo.contains(e.target)) {
        profileCard.style.display = 'none';
    }
});

/*****************************************
        Generate User
*****************************************/

const genParent = select('.gen-profile');


function getUser() {
        const url = `https://randomuser.me/api/?nat=CA&results=5&`;
        const options = {
          method: 'GET',
          mode: 'cors'
        };
      
        fetch(url, options)
          .then(result => result.json())
          .then(data => randomUser(data));
      }
      
getUser();
      
function getCurrentDateTime() {
        const currentDateTime = new Date();
        const date = currentDateTime.toLocaleDateString();
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${date} ${formattedHours}:${formattedMinutes} ${ampm}`;
      }
      

function randomUser(randomUser) {
        const users = randomUser.results;
        users.forEach(element => {
          const genUserDiv = create('div');
          genUserDiv.classList.add('gen-users');
          genUserDiv.innerHTML = `
            <img src="${element.picture.thumbnail}" class="gen-pic" alt="">
            <div class="gen-desc">
              <h2>${element.name.first} ${element.name.last}</h2>
              <p>${element.location.city}, ${element.location.state}</p>
              <button class="gen-follow">Follow</button>
            </div>
          `;
          genParent.append(genUserDiv);
        });
      }
      
      