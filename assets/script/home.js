'use strict';

import {onEvent, select, selectAll, create, log} from './utils.js';

import { User } from './User.js';

import { Subscriber } from './Subscriber.js';
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
        Creating new Subscriber
*****************************************/



/*****************************************
        Post Content
*****************************************/

function userPost(){

        // Variables for function
        let userPost = postText.value;
        let todaysDate = new Date();
        let currentTime = new Date();
        let currentHours = currentTime.getHours().toString();
        let currentMinutes = currentTime.getMinutes().toString().padStart('2', 0)
        let ampm = currentHours >= 12 ? 'pm' : 'am';
        let img = select('.avatar').innerHTML;
        const selectedFile = document.getElementById('file-upload');
   
        // Validating empty fields
        if (userPost == '' && selectedFile.value == '') {
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
                                ${img}
                                <h1>${user.name}</h1>
                                <p>${todaysDate.toDateString()}</p>
                        </div>
                        <p class="user-output">${postText.value}</p>
                        <img class="user-img" src="${url}"/>
                        <h4 class="clock">${currentHours}:${currentMinutes} ${ampm}</h4>
                        `;

                // Prepening and also resetting values
                parentPostContent.prepend(newDiv);
                postText.value = '';
                document.getElementById('file-upload').value = '';
                infoArea.textContent = '';

        } else {

                // If a picture is not selected, text box will still post
                // (I get a bug if a picture is not selected)
                errorOutput.innerText = '';
                let newDiv = create('div');
                newDiv.className = 'content'

                newDiv.innerHTML = `
                        <div class="content-header">
                                ${img}
                                <h1>${user.name}</h1>
                                <p>${todaysDate.toDateString()}</p>
                        </div>
                        <p class="user-output">${postText.value}</p>
                        <h4 class"clock">${currentHours}:${currentMinutes} ${ampm}</h4>
                        `;

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

const genParent = select('.gen-profile');


function randomUserGenerator(){
        const url = `https://randomuser.me/api/?nat=CA&results=10&`;

const options = {
        method: 'GET',
        mode: 'cors'
     };
        fetch(url, options)
          .then((result) => {
                return result.json();
        })
          .then((data) => {
                showRandomUserData(data);
        });
      };

randomUserGenerator();

      function showRandomUserData(randomUser){
        const users = randomUser.results;

        users.forEach(element => {
                console.log(element)
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

      