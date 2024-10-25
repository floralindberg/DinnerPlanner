import {render} from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";

const X= TEST_PREFIX;

const SummaryView= !window.location.toString().includes("react") && (await getModule(`/src/views/${X}summaryView.vue`))?.SummaryView ||
      (await getModule(`/src/views/${X}summaryView.jsx`))?.SummaryView;

const shoppingList= (await getModule(`/src/${X}utilities.js`))?.shoppingList;

function getDishDetails(x){ return dishesConst.find(function(d){ return d.id===x;});}

render(
    <div>This page tests TW1.3 Array rendering in SummaryView {getType(SummaryView)} for 3 people and the ingredinents of 3 dishes.
      <hr/>
      { shoppingList?
        <SummaryView people={3} ingredients={shoppingList([getDishDetails(2), getDishDetails(100), getDishDetails(200)])}/>
        : <span>Implement and export the shoppingList function from utilities.js to enable this UI test.</span>
      }
    </div>,
        
    document.getElementById('root')
);


    
