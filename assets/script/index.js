'use strict';

import {onEvent, select} from './utils.js';
/*****************************************
        Login Page
*****************************************/

/*****************************************
        Variables
*****************************************/
const errorOutput = select('.error')

const userEmail = select('.user-email');
const userPassword = select('.user-password');

const loadScreen = select('.load-screen');
const loginBtn = select('.user-login')
const createBtn = select('.user-create');

const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;

onEvent('click', loginBtn, function(event){
        if((userEmail.value === '' && userPassword.value === '')){
        errorOutput.innerText = 'Login credentials Invalid!'
        }
        event.preventDefault();
        loginInfo.forEach(element => {
                if(userEmail.value === element.email && userPassword.value === element.password) {
                loadScreen.classList.remove('hidden');
                       setTimeout(() => {
                        window.open(
                                './home.html',
                                '_blank'
                              );
                              loadScreen.classList.add('hidden');

                       }, 2000) 
                        errorOutput.innerText = 'Success!';
                }else {
                        errorOutput.innerText = 'Email or password is invalid!';
                }
        });
});


const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || [];

onEvent('click', createBtn, function(event){
        event.preventDefault();
      
        const login = {
                email: userEmail.value,
                password: userPassword.value
        }

        if(userEmail.value == '' && userPassword.value == '') {
                errorOutput.innerText = 'Credentials empty!'
        }else if(!emailRegex.test(userEmail.value)) {
                errorOutput.innerText = 'Email Invalid!';
        } else if (userPassword.value == '') {
                errorOutput.innerText = 'Enter a valid password!';
        } else {
                loginInfo.push(login);
                localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
                errorOutput.innerText = 'Profile created!';
        }
});

function showLogin() {
        if(loginInfo.length >= 1){
                loginInfo.forEach(element => {
                        console.log(`Email: ${element.email}`, '\n');
                        console.log(`Password: ${element.password}`);
                });
        }else {
                console.log(`Create a profile!`)
        }
}

showLogin();


const showPw = select('.fa-eye')
onEvent('click', showPw, function(){
          var x = userPassword;
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
});
        


