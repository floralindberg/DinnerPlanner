import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { observer } from "mobx-react-lite";

const ReactRoot = observer(

function ReactRoot(props){
    if(!props.model.ready){
        return <img src="https://brfenergi.se/iprog/loading.gif" />
    }
    return (<div className="flexParent">
                <div>
                    <div className="flexSidebar"><Sidebar model={props.model} /></div>
                </div>
                <div className="flexMain">
                    <div className="mainContent">
                    <div><Details model = {props.model} /></div>
                    <div className="summary"><Summary model={props.model} /></div>
                    <div><Search model={props.model} /></div>
                    </div>
                </div>
            </div>
            );
}
);

export { ReactRoot }
