import {render} from "./teacherRender.js";
import getModule from "/test/filesToTest.js";

const X= TEST_PREFIX;

const model=(await getModule(`/src/${X}DinnerModel.js`))?.model;
const Search= (await getModule(`/src/reactjs/${X}searchPresenter.jsx`))?.Search;

if(!Search){
    render(<div>
             Please write /src/reactjs/searchPresenter.jsx
           </div>,  document.getElementById('root'));
}
if(Search){
    const preamble=<div><p> This is the TW3.3 React Search presenter test (resolving promises in Applicatin State, Lifecycle).</p>
                     <p>It displays the Search interface, and you should be able to perform searches</p>
                     <p>You should also see some initial search results (use component lifecycle).</p>
                     <hr/></div>;        
    window.myModel=model;
    render(
        <div>
          {preamble}
          <Search model={model}/>
        </div>,
        document.getElementById('root')
    );       
}
