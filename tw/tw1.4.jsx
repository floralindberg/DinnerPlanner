import {render} from "./teacherRender.js";
import dishesConst from "/test/dishesConst.js";

import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";

const X= TEST_PREFIX;

const SidebarView= !window.location.toString().includes("react") && (await getModule(`/src/views/${X}sidebarView.vue`))?.SidebarView ||
      (await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;

const winReact= window.React;
function getDishDetails(x){ return dishesConst.find(function(d){ return d.id===x;});}

if(!SidebarView)
    render(<div>Please define /src/views/sidebarView.jsx</div>,  document.getElementById('root'));

let plusMinusCustomEvent;
let plusMinusEventError;
try{
    plusMinusCustomEvent= plusMinusEventName();  
}catch(e){if(typeof(e)==="string")plusMinusEventError=e;}

let dishClickedCustomEvent;
let dishClickedError;
try{
    dishClickedCustomEvent= currentDishEventName();  
}catch(e){if(typeof(e)==="string")dishClickedError=e;}

let xClickedCustomEvent;
let xClickedError;
try{
    xClickedCustomEvent= removeEventName();
}catch(e){if(typeof(e)==="string")xClickedError=e;}

window.React=winReact;

if(SidebarView){
    let props= {
        number:5,
        dishes:[getDishDetails(2), getDishDetails(100), getDishDetails(200)],
        onNumberChange:    function numberChangeACB(nr){ console.log("custom event 'onNumberChange' fired, argument:", nr);}     
    };
    if(dishClickedCustomEvent)
        props= {...props, [dishClickedCustomEvent]: function dishClickedACB(x){ console.log("custom event '", dishClickedCustomEvent,"' fired on dish link click, argument: ", x);} };
    if(xClickedCustomEvent)
        props= {...props, [xClickedCustomEvent]: function xClickedACB(x){ console.log("custom event '", xClickedCustomEvent,"' fired on dish x button, argument: ", x);} };
    render(
        <div>
          <div> <p>TW1.4 events: here you can test the <b>(native) click events</b> detected by SidebarView, as well as the custom events it fires.</p>
        <p>For starters, just write click event listeners that log some text, and watch the Console. Log the desired number (the number prop + 1 for the + button ,the number prop -1 for the - button), and for the x and link clicks, log e.g. the dish object.</p>
          </div>
          <hr/>
          <SidebarView {...props}   />
          <hr/>
          <p>The aim of this tutorial step is to <b>fire custom events</b> for each of these native events. For the number, the custom event name must be <code>onNumberChange</code>. Look at the Console to see how the test handles the custom event!</p>
          <p>The custom event we have detected for clicking on + and - is: <code>{plusMinusCustomEvent || "none yet"}{plusMinusEventError && ", "}{ plusMinusEventError?.toString()}</code></p>

          <p>For clicking on an x button, as well as for clicking on a dish link, you can choose the two (different) custom event names. We detect these custom event names automatically if they are fired.  Look at the Console to see how the test handles these custom events! Note that you should see the dish parameter logged on the Console when you fire the event by clicking in the UI!</p>
          <p>The custom event we have detected for clicking on dish links is: <code>{dishClickedCustomEvent || "none yet"}{dishClickedError && ", "}{ dishClickedError?.toString()}</code></p>
          <p>The custom event we have detected for clicking on an x button is: <code>{xClickedCustomEvent || "none yet"}{xClickedError && ", "} { xClickedError?.toString()}</code></p>
        </div>,
        document.getElementById('root')
    );
}

    function expect(value, check){
    return {
        to: {
            equal(x){
                if(value!=x){
                    throw check;
                }
            }
        }
    };
}
import {findTag, prepareViewWithCustomEvents} from "/test/jsxUtilities.js";
import {dishInformation} from "/test/mockFetch.js";

function plusMinusEventName(){
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes:[dishInformation]

        },
        function collectControls(rendering){
            const buttons=findTag("button", rendering);
            expect(buttons[0].children[0], "Sidebar first button should have the label -").to.equal("-");
            expect(buttons[1].children[0], "Sidebar second button should have the label +").to.equal("+");
            return [buttons[0], buttons[1]];
        });


    const[minus, plus] = customEventNames;
    const[minusParam, plusParam]= customEventParams;
    expect(plus, "+ and - buttons should fire the same custom event").to.equal(minus);

    expect(plusParam.length, "expected custom event "+plus+" to be fired with one parameter").to.equal(1);
    expect(plusParam[0], "expected custom event "+plus+" to have a number parameter, number prop plus 1 for the plus button").to.equal(6);

    expect(minusParam.length, "expected custom event "+plus+" to be fired with one parameter").to.equal(1);
    expect(minusParam[0], "expected custom event "+plus+" to have a number parameter, number prop minus 1 for the minus button").to.equal(4);
    return minus;
}

function removeEventName(){
    const dishes= [dishInformation, {...dishInformation, id:42}, {...dishInformation, id:43}];
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes
        },
        function collectControls(rendering){
            const buttons=findTag("button", rendering);
            expect(buttons.length, "Sidebar view expected to have 5 buttons when there are three dishes").to.equal(5);
            expect(buttons[0].children[0], "Sidebar first button should have the label -").to.equal("-");
            expect(buttons[1].children[0], "Sidebar second button should have the label +").to.equal("+");
            expect(buttons[2].children[0].toLowerCase(), "Sidebar third button should have the label x").to.equal("x");
            return [buttons[2], buttons[3], buttons[4]];
        });
    const[xButton1, xButton2, xButton3] = customEventNames;
    expect(xButton1, "custom events fired by all x buttons should have the same name").to.equal(xButton2);
    expect(xButton2, "custom events fired by all x buttons should have the same name").to.equal(xButton3);
    return xButton1;
}


function currentDishEventName(){
    const dishes= [dishInformation, {...dishInformation, id:42}, {...dishInformation, id:43}];
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes
        },
        function collectControls(rendering){
            const links=findTag("a", rendering);
            expect(links.length, "Sidebar view expected to have 5 buttons when there are three dishes").to.equal(3);
            return links;

        });
    const[setCurrent1, setCurrent2, setCurrent3] = customEventNames;

    expect(setCurrent1, "custom events fired by all x buttons should have the same name").to.equal(setCurrent2);
    expect(setCurrent2, "custom events fired by all x buttons should have the same name").to.equal(setCurrent3);


    const[currentParam1, currentParam2, currentParam3]= customEventParams;
    return setCurrent1;
}
