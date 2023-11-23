import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/UIqWD0Io44NEZXCW/scene.splinecode');


const canvas_character = document.getElementById('canvas3d_character');
const app_character = new Application(canvas_character);
app_character.load('https://prod.spline.design/5CW7ccLxa9XhTM0t/scene.splinecode');

const canvas_card = document.getElementById('canvas3d_card');
const app_card = new Application(canvas_card);
app_card.load('https://prod.spline.design/cjkrJb8DSZbeRLw0/scene.splinecode');



