import FillterView from './scripts/views/fillter.view.js';
import StudentView from './scripts/views/student.view.js';
const sutdent = new StudentView();
const fillter = new FillterView();

sutdent.init();
fillter.init();

import template from './scripts/views/student.view.html';

const ul = document.querySelector('.students');

const demo = template
    .replace(
        '$image',
        'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/305214764_1255025758580130_7437695226023162279_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=nwzJFlYYpisAX8ptr9L&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBgSlFxWKUykBS8yWy_-_Xm9ixK2q_gK55AY6XdLXvybQ&oe=636659E9'
    )
    .replace('$name', 'Pham Tan Duong');
ul.innerHTML = demo;

console.log(template);
