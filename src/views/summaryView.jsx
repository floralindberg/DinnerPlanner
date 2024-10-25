// un-comment when needed:
//import {sortIngredients} from "/src/utilities.js";
//import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
    return (
            <div className="debug">

  


              {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
              Summary for <span title="nr guests">{ "TODO" }</span> persons:




              {/* TW 1.3: remove this line (and the TW1.3 one below) to uncomment

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>
                <tbody>
                  { //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
                    // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array) 
                    props.ingredients.map(ingredientTableRowCB)
                  }
                </tbody>
              </table>

              TW 1.3: remove this line to uncomment */} 




            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>TODO aisle</td>
                 <td className="TODO">TODO qty</td>
                 <td> TODO unit </td>
               </tr>;
    }
}

