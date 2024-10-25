import {render} from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";

const X= TEST_PREFIX;

const SummaryView= !window.location.toString().includes("react") && (await getModule(`/src/views/${X}summaryView.vue`))?.SummaryView ||
      (await getModule(`/src/views/${X}summaryView.jsx`))?.SummaryView;

function getDishDetails(x){ return dishesConst.find(function(d){ return d.id===x;});}

render(
    <div>This page tests TW1.2 Basic Rendering in a SummaryView {getType(SummaryView)} for 3 people. We then do another SummaryView rendering for 5 people. The ingredients prop is empty.
      <hr/>
      <SummaryView people={3} ingredients={[]}/>
      <hr/>
      <SummaryView people={5} ingredients={[]}/>
    </div>,
        
    document.getElementById('root')
);


    
