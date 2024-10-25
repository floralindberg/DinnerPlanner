import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createApp, h } from "vue";
window.React= {createElement:h};  // needed in the lab because it works with both React and Vue


// (1) ------------ retrieve the application state (model) ----------
import { model } from "/src/DinnerModel.js";
import { reactive } from "vue";

const reactiveModel= "TODO, make a reactive model here";


// (2) ----------  display (mount) the root component in the browser page. Pass the reactive model as prop ---------
// http://localhost:8080/vue.html
const app= createApp(<div>TODO: _Replace_ this DIV with a rendering of VueRoot (don't forget to import it), set its model prop to be the reactive model</div>);


// mount the app in the page DIV with the id "root":
app.mount('#root'); 
/* This <div id="root"></div> is configured in vite.config.js. Vite produces a vue.html file, find it in Developer tools, Sources */




// ------ for debug purposes, do not do this in production! ----------
// making the model available at the console
window.myModel= reactiveModel;
// making some example dishes available at the console:
import dishesConst from "/test/dishesConst.js";
window.dishesConst= dishesConst;
