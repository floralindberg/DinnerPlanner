
import "/src/style.css"
import { dishType } from "../utilities";
import { menuPrice } from "../utilities";
import { sortDishes } from "../utilities";

export function SidebarView (props) {
    
    function updatePlusACB(){
        console.log(props.number+1)
        return props.onNumberChange(props.number+1)
    }

    function updateMinusACB(){
        console.log("New number:",props.number-1)
        return props.onNumberChange(props.number-1)
    }

    function dishesTableRowCB(dish){
        
        function removeDish(evt) {
            console.log(evt) // incase all of the information about the event is necessary
            console.log("Dish to remove: ", dish.title)
            return props.dishToRemove(dish)
        }
        function hyperLinkACB(evt){
            console.log("Clicked dish:",dish.title)
            return props.interestedInDish(dish)
        }

        return (
                    <tr key={dish.id } >
                        <td> <button className="buttonXSidebar" onClick={removeDish}>x</button></td>
                        <td> <a className="textSidebar" href="#dish.title" onClick={hyperLinkACB}> {dish.title} </a></td>
                        <td> <span > {dishType(dish)} </span> </td>
                        <td className="right">{(dish.pricePerServing*props.number).toFixed(2)} </td>
                    </tr>
                )
        
    }

    return(
    <div>
        <button className="buttonMSidebar" disabled={props.number == 1} onClick={updateMinusACB}>-</button>
            <span className="buttonPSidebar">
                {props.number} 
            </span>
        <button className="buttonPSidebar" onClick={updatePlusACB}>+</button>

            <table>
                <tbody>
                        {
                            sortDishes(props.dishes).map(dishesTableRowCB)
                        }
                    <tr>
                        <td></td>
                        <td> Total:  </td>
                        <td></td>
                        <td className="right">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
    </div>
)
    }



