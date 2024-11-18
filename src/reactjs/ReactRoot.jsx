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
                <div>
                    <div>
                        <RouterProvider router={makeRouter(props.model)} />
                    </div>
                </div>
            </div>
    );
},
);


function makeRouter(model) {

    return createHashRouter([
        {
            path:"/",
            element:<div><Search model={model} /></div>
        },
        {
            path:"/search",
            element:<div><Search model={model} /></div>
        },
        {
            path:"/summary",
            element:<div className="summary"><Summary model={model} /></div>
        },

        {
            path:"/details",
            element:<div className="mainContent"><Details model = {model} /></div>
        },

        {/*
        path:"/pathD/:ID",
        element: <ParamsRoute />
        */}
    ])
}

/*function ParamsRoute(props){
    return <div>choose Route {useParams().ID}</div>
}*/

export { ReactRoot }
