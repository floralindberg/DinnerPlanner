import { Summary } from "./summaryPresenter.jsx";

// const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (<div>
                <div><span id="TODO">Replace this span with a rendering of Sidebar</span></div>
                <div><Summary model={props.model} /></div>
            </div>
           );
}
// )

export { ReactRoot }
