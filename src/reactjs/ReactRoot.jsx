import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { observer } from "mobx-react-lite";
import { RouterProvider, createHashRouter, useParams } from "react-router-dom";

const ReactRoot = observer(

function ReactRoot(props){
    if(!props.model.ready){
        return <img src="https://brfenergi.se/iprog/loading.gif" />
    }

    return (<div className="flexParent">
                <div>
                    <div className="flexSidebar"><Sidebar model={props.model} /></div>
                </div>

                {MakeRouter(props.model)/*
                <div>
                    <div>
                    <div className="summary"><Summary model={props.model} /></div>
                    <div className="mainContent"><Details model = {props.model} /></div>
                    <div><Search model={props.model} /></div>
                    </div>
                </div>*/}
            </div> 
    );          
 },
);

function createRouter(model){

    return createHashRouter([
        {
            path:"/",
            element:<Search model={model} />,
        },
        {
            path:"/search",
            element:<Search model={model} />,
        },
        {
            path:"/summary",
            element:<Summary model={model} />,
        },
        {
            path:"/details",
            element:<Details model = {model} />,
        },
        {
        path:"/pathD/:ID",
         element: <ParamsRoute />
        }
    
    ])
}

function ParamsRoute(props){
    return <div>choose Route {useParams().ID}</div>

}

function MakeRouter(reactiveModel){

    return <RouterProvider router={createRouter(reactiveModel)} />

}

export { ReactRoot }
