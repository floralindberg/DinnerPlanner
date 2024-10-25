import { render } from "./teacherRender.js";
import getModule from "/test/filesToTest.js";

const X = TEST_PREFIX;

import {findTag, prepareViewWithCustomEvents} from "/test/jsxUtilities.js";

const SearchFormView = (await getModule(`/src/views/${X}searchFormView.jsx`))
  ?.SearchFormView;

if (!SearchFormView) {
  render(
    <div>Please define /src/views/searchFormView.jsx</div>,
    document.getElementById("root")
  );
}

let textChangeCustomEvent, typeChangeCustomEvent, searchButtonCustomEvent;
let textChangeError, typeChangeError, searchButtonError;

try {
     const {customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SearchFormView,
        {dishTypeOptions:['starter', 'main course', 'dessert']},
        function collectControls(rendering){
            const buttons=findTag("button", rendering).filter(function(button){ return button.children.flat()[0].toLowerCase().trim().startsWith("search"); });
           
            expect(buttons.length, "SearchFormview expected to have one search button").to.equal(1);
            return [ ...buttons];
        },
        []
    );
    [searchButtonCustomEvent] = customEventNames;
} catch (e) {if(typeof(e)==="string")searchButtonError= e;}

try{
        const {customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SearchFormView,
        {dishTypeOptions:['starter', 'main course', 'dessert']},
        function collectControls(rendering){
            const selects=findTag("select", rendering);
            expect(selects.length, "SearchFormView expected to have one  select box").to.equal(1);
            return [ ...selects ];
        },
        [ "some test type"]
    );

    const [onSelect]=customEventNames;
    const [selectParam]= customEventParams;
    
    expect(selectParam.length, "expected custom event "+onSelect+" to be fired with one parameter").to.equal(1);
    expect(selectParam[0], "expected custom event "+ onSelect+" to get as parameter the value chosen in the dropdown").to.equal("some test type");
    typeChangeCustomEvent= onSelect;
}catch(e){if(typeof(e)==="string")typeChangeError=e; }

try{
        const {customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SearchFormView,
        {dishTypeOptions:['starter', 'main course', 'dessert']},
        function collectControls(rendering){
            const inputs=findTag("input", rendering);
            expect(inputs.length, "SearchFormView expected to have one  input box").to.equal(1);
            return [...inputs,  ];
        },
        ["some test query",]
    );

    const [onInput,]=customEventNames;
    const [inputParam]= customEventParams;
    
    expect(inputParam.length, "expected custom event "+onInput+" to be fired with one parameter").to.equal(1);
    expect(inputParam[0], "expected custom event "+onInput+" to get as parameter the value typed in the input box").to.equal("some test query");
    
    textChangeCustomEvent= onInput;
}catch(e){if(typeof(e)==="string")textChangeError=e;}

if (SearchFormView) {
  const preamble = (
    <div>
      <p>
        {" "}
        This is the TW2.2.1 search form view test. Note that this is just a View
        and interatction will not work yet.
      </p>
      <p>
        The props 'text' and 'type' are set, to demonstrate the case when the
        search form was hidden away and the user comes back to it during
        Navigation (TW3). Then we want the user to see what they searched for
        last time.
      </p>
      <p>
        The custom event we have detected for changing search text is:{" "}
        <code>{textChangeCustomEvent || "none yet"}{ textChangeError && ", "}{textChangeError?.toString()}</code>
      </p>
      <p>
        The custom event we have detected for changing search type is:{" "}
      <code>{typeChangeCustomEvent || "none yet"}{ typeChangeError && ", "}{typeChangeError?.toString()}</code>
      </p>
      <p>
        The custom event we have detected for clicking search button is:{" "}
        <code>{searchButtonCustomEvent || "none yet"}{ searchButtonError && ", "}{searchButtonError?.toString()}</code>
      </p>
      <hr />
    </div>
  );
  render(
    <div>
      {preamble}
        <SearchFormView {...{
            dishTypeOptions:["starter", "main course", "dessert"],
            text:"pizza",
            type:"main course",
            
            [textChangeCustomEvent]:function searchTextACB(txt) {
                console.log("user wants to set the dish search text ", txt);
            },
            [typeChangeCustomEvent]:function searchTypeCB(typ) {
                console.log("user wants to set the dish search type ", typ);
            },
            [searchButtonCustomEvent]:function searchNowACB() {
                console.log("user wants to search now!");
            }
        }
                        }
      />
    </div>,
    document.getElementById("root")
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

