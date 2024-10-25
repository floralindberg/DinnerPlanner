import { Summary }  from "./summaryPresenter.jsx";


function VueRoot(props){
    return (<div>
                <div><span id="TODO">Replace this span with a rendering of Sidebar</span></div>
                <div><Summary model={props.model} /></div>
            </div>
           );
}

export { VueRoot }

