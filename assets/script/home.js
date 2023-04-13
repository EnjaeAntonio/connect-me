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
        Creating new User
*****************************************/

const user = new User(34369, 'Enjae Antonio', 'EnjaeAC', 'enjaeantonio@gmail.com');

/*****************************************
        Post Content
*****************************************/

function userPost(){

        // Variables for function
        let img = select('.avatar').innerHTML;
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
                                        ${img}
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
                                        ${img}
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
}       



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
        Display Profile
*****************************************/
let userInfoBtn = select('.info-btn')
onEvent('click', userInfoBtn, function() {

        let x = select('.user-sub-info');
        if (x.style.display === "block") {
          x.style.display = "none";
        } else 
          x.style.display = "block";
          
      });


/*****************************************
        OnEvent handler
*****************************************/
onEvent('click', postBtn, function(){
        userPost();
});

/*****************************************
        Generate User
*****************************************/

const genParent = select('.gen-profile');


function getUser(){

const url = `https://randomuser.me/api/?nat=CA&results=5&`;
const options = {
        method: 'GET',
        mode: 'cors'
     };
        fetch(url, options)
          .then((result) => {
                return result.json();
        })
          .then((data) => {
                randomUser(data);
        });
      };

getUser();


function getCurrentDateTime() {
        const currentDateTime = new Date();
        const date = currentDateTime.toLocaleDateString();
        const time = currentDateTime.toLocaleTimeString();
        return `${date} ${time}`;
}

function randomUser(randomUser){

const users = randomUser.results;

        users.forEach(element => {
                let genUserDiv = create('div');
                genUserDiv.className = 'gen-users';

               genUserDiv.innerHTML = `
               <img src="${element.picture.thumbnail}" class="gen-pic" alt="">
                   <div class="gen-desc">
                       <h2>${element.name.first} ${element.name.last}</h2>
                       <p>${element.location.city}, ${element.location.state}</p>

                       <button class="gen-follow">Follow</button>
                   </div>
               `
               genParent.append(genUserDiv)
               
        });
      };

      