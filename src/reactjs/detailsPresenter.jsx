import { DetailsView } from "../views/detailsView";
import { observer } from "mobx-react-lite";


const Details = observer(
              // needed for the presenter to update (its view) when relevant parts of the model change
    function DetailsRender(props){
        if(!props.model.currentDishPromiseState.promise){
            return <div>No data</div>
        }
        else if(!props.model.currentDishPromiseState.data && !props.model.currentDishPromiseState.error ){
            return <img src="https://brfenergi.se/iprog/loading.gif" />
        }
        else if (props.model.currentDishPromiseState.error){
            return <div>{props.model.currentDishPromiseState.error.toString()}</div>

        }
        else if(props.model.currentDishPromiseState.data){
            return <DetailsView guests={props.model.numberOfGuests} dishData = {props.model.currentDishPromiseState.data}
            currentDishPromiseState={props.model.currentDishPromiseState} isDishInMenu={(props.model.dishes).find(isDishInMenuCB)}
             onAddToMenu={addToMenuHandlerACB}/>;
        }

        function isDishInMenuCB(param){
            return param && param.id === props.model.currentDishPromiseState.data.id;
        }

        function addToMenuHandlerACB(){
            props.model.addToMenu(props.model.currentDishPromiseState.data);
        }

    }
    
);

export { Details };