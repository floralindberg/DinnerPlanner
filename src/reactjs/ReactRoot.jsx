import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Search } from "./searchPresenter.jsx";

// const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (<div>
                <div>
                    <div><Sidebar model={props.model} /></div>
                </div>
                <div>
                    <div><Details model = {props.model} /></div>
                    <div><Summary model={props.model} /></div>
                    <div><Search model={props.model} /></div>
                </div>
            </div>
            );
}

export { ReactRoot }
