// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
  
    function backToSearchACB(){
        window.location.hash="#/search"
    }

    return (
           <div>
             <div className="backToSearchButton">
                 <button onClick={backToSearchACB}>Back to search</button>
             </div>

            <div className="debug">

              {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
              Summary for <span title="nr guests">{props.people}</span> persons:

              {

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  { //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
                    // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array)
                    sortIngredients(props.ingredients).map(ingredientTableRowCB)
                  }
                </tbody>
              </table>

            }

            </div>
            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                  <td className="right">{ingr.name}</td>
                  <td className="right">{ingr.aisle}</td>
                  <td className="right">{(props.people*ingr.amount).toFixed(2)} </td>
                  <td className="right"> {ingr.unit}</td>
                </tr>;
    }
}

