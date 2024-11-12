import "/src/style.css"

export function DetailsView(props){

    function renderPrice(){

        return (
            <table className="debug">
                <tbody>
                <div className="inTable">Price: {props.dishData.pricePerServing}</div>
                <div className="inTable">For {props.guests} guests: {((props.dishData.pricePerServing)*(props.guests)).toFixed(2)}</div>
                </tbody>
            </table>
        );
    }

    function renderIngredientsCB(ingredients){

        return (
            <div>
                <span className="inTable">{ingredients.name}:</span>
                <span className="inTable">{ingredients.measures.us.amount}</span>
                <span className="inTable">{ingredients.measures.us.unitShort}</span>
            </div>
                
        );
    }

    function renderInstructions(){

        return (
            <table className="table">
                <tbody>
                <div className="inTable">{props.dishData.instructions}</div>
                </tbody>
            </table>
        );
    }

    return (

        <div>
            <span>
                <button disabled={props.isDishInMenu} className="buttons" onClick={addToMenuACB}>Add to menu!</button>
            </span>
            <span> </span>
            <span>
                <button className="buttons" onClick={cancelDishACB}>Cancel</button>
            </span>
            <div className="dishName">
                {
                    props.dishData.title
                }
            </div>
            <div className="result">
                <span><img className="dishImage" src={props.dishData.image}></img></span>
                <span className="price">{
                    renderPrice()
                }
                </span>
            </div>
            <table className="debug">
                <tbody>
                    <div>
                        {
                            props.dishData.extendedIngredients.map(renderIngredientsCB)
                        }
                    </div>
                </tbody>
            </table>
                    <div>
                        {
                            renderInstructions()
                        }
                    </div>

                    <div>
                        <a href={props.dishData.sourceUrl} target="_blank">More information</a>
                    </div>

        </div>

    )

    function addToMenuACB(evt){
        console.log(evt)
        return props.onAddToMenu()
    }

    function cancelDishACB(evt){
        console.log(evt)
        return props.evt
    }
}