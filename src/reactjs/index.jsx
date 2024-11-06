import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue

import { configure, observable } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions


// (1) ------------ retrieve the application state (model) ----------
import { model } from '/src/DinnerModel.js';

const reactiveModel= observable(model);


// (2) ----------  display (mount) the root component in the browser page. Pass the reactive model as prop ---------
// http://localhost:8080/react.html

// mount the app in the page DIV with the id "root":
createRoot(document.getElementById('root')).render(<div><ReactRoot model={reactiveModel}></ReactRoot></div>);
/* This <div id="root"></div> is configured in vite.config.js. Vite produces a react.html file, find it in Developer tools, Sources */



// ------ for debug purposes, do not do this in production! ----------
// making the model available at the console
window.myModel= reactiveModel;
// making some example dishes available at the console:
import dishesConst from "/test/dishesConst.js";
window.dishesConst= dishesConst;




