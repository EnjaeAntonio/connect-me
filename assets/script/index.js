'use strict';

import {onEvent, select, selectAll, create, log} from './utils.js';
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
                        errorOutput.innerText = '';
                        errorOutput.innerText = 'Success!';
                }else {
                        errorOutput.innerText = 'Invalid Credentials';
                }
        });
});


const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || [];

        onEvent('click', createBtn, function(event){
      
        const login = {
                email: userEmail.value,
                password: userPassword.value
        }

       
      
        event.preventDefault();

        if(userEmail.value === '' || userPassword.value === '') {
                errorOutput.innerText = 'Credentials Empty!';
        } else if (!emailRegex.test(userEmail.value)) {
                errorOutput.innerText = 'Enter a valid email!';
        } else {
                loginInfo.push(login);
                localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                console.log(loginInfo)
                errorOutput.innerText = 'Profile created!';
        }
});
console.log(loginInfo)


const showPw = select('.fa-eye')
onEvent('click', showPw, function(){
          var x = userPassword;
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
});
        


