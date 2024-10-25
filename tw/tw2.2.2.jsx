import { render } from "./teacherRender.js";
import { searchResults } from "../test/mockFetch.js";
import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";

const X = TEST_PREFIX;

//var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
//nativeInputValueSetter.call(input, 'react 16 value');

let uiError;

const SearchResultsView = (
  await getModule(`/src/views/${X}searchResultsView.jsx`)
)?.SearchResultsView;

if (!SearchResultsView) {
  render(
    <div>
      Please write /src/views/searchResultsView.jsx to define SearchResultsView
    </div>,
    document.getElementById("root")
  );
}

let dishChosenCustomEvent;
try {
  [dishChosenCustomEvent] = findResultsEventName();
} catch (e) {if(typeof(e)==="string")uiError=e;}

if (SearchResultsView) {
  const preamble = (
    <div>
      <p> This is the TW2.2.2 search result view test</p>
      <p>
        It waits for one second to simulate a search, then it displays three
        search results. Of course your view should accomodate more results,
        using array rendering
      </p>
      <p>
        The custom event we have detected for chosing dish is:{" "}
        <code>{dishChosenCustomEvent || "none yet"}{ uiError && ", "}{uiError?.toString()}</code>
      </p>
      <hr />
    </div>
  );
  render(<div>{preamble}Wait...</div>, document.getElementById("root"));
  // we simulate a searchDishes that returns some results after 1 second
  new Promise(function makePromiseACB(resolve) {
    setTimeout(function laterACB() {
      resolve(searchResults);
    }, 1000);
  }).then(function displayResultsACB(results) {
    render(
      <div>
          {preamble}
          <SearchResultsView {...{
              searchResults:results,
              [dishChosenCustomEvent]:function resultChosenACB(searchResult) {
                  console.log(
                      "user chose searchResult: ",
                      JSON.stringify(searchResult)
                  );
              }}
                             }
        />
      </div>,
      document.getElementById("root")
    );
  });
}

function expect(value, check){
    return {
        to: {
            equal(x){
                if(value!=x){
                    throw check;
                }
            },
            gte(x){
                if(value<x){
                    throw check;
                }
            }
            
        }
    };
}
import {findTag, prepareViewWithCustomEvents} from "/test/jsxUtilities.js";

function findResultsEventName(){
    const {customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SearchResultsView,
        {searchResults:[searchResults[0]]},
        function findSpans(rendering){
            const spans= findTag("span", rendering).filter(function checkSpanCB(span){ return span.props && span.props.onClick; });
            expect(spans.length, "SearchResultsView with one result should contain at least a span with click handler").to.gte(1);
            return spans;
        });
    const[onDishClick]= customEventNames;
    const[dishChosen]= customEventParams;
    expect(dishChosen.length, "expected custom event "+onDishClick+" to be fired with one parameter").to.equal(1);
    expect(dishChosen[0], "expected custom event "+onDishClick+" to get a search result as parameter").to.equal(searchResults[0]);

    return customEventNames;
}


