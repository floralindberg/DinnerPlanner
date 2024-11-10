import { SidebarView } from "../views/sidebarView";
import { observer } from "mobx-react-lite";

const Sidebar = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    
    function SidebarRender(props){
        function changeGuestsACB(number){
            return props.model.setNumberOfGuests(number);
        }
        function setDishACB(dish){
            return props.model.setCurrentDishId(dish.id);
            
        }
        function removeDishACB(dish){
            return props.model.removeFromMenu(dish);
        }

        return <SidebarView number={props.model.numberOfGuests} dishes={props.model.dishes} onNumberChange={changeGuestsACB} interestedInDish={setDishACB} dishToRemove={removeDishACB}/>;
    }
);

export { Sidebar };