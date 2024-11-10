
export function SearchFormView(props){
    
    function renderOptionsCB(optionStrng){
        return <option key = {optionStrng} value={optionStrng}>{optionStrng}</option>
    }

    return (
        <div>
            <span>
                <input value = {props.text || ""} onChange = {sendTextContentACB}></input>
             </span>
             <span>
                <select value = {props.type || ""} onChange = {selectedTypeACB}> 
                    <option value="">Choose:</option>
                    {
                         props.dishTypeOptions.map(renderOptionsCB)
                    }
                </select>
             </span>
            <span>
                <button title="search" onClick={searchForDishACB}>Search!</button>
            </span>
        </div>
    );
                

    function sendTextContentACB(evt){
        console.log(evt.target.value)
        props.onTextContent(evt.target.value)
    }

    function selectedTypeACB(evt){
        console.log(evt.target.value);
        props.onTypeSelected(evt.target.value );
    }
    
    function searchForDishACB(evt){
        console.log(evt)
        props.onButtonClicked();
    }

}
/*
{
OKLART OM MAN SKA HA DESSA UTANFÖR ELLER INNANFÖR, KOMMER ISF BEHÖVA identifiera options som i filmen JSX 15:25
const types = [
    {display: "Starter", value :"type1"},
    {display: "Main course", value:"type2"},
    {display: "Dessert", value : "type3"}
]
 <option value= "">Choose:</option>
              {dishTypes.map((optionStrng) => (
             <option key={optionStrng} value={optionStrng}>
               {optionStrng}
             </option>
          ))}

          alt2:
            <option value="Starter">Starter</option>
             <option value="Main course ">Main course </option>
             <option value="Dessert">Dessert</option>

}
*/
