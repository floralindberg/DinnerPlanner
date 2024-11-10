
export function SearchFormView(props){ 
    
    function renderOptionsCB(optionStrng){
        return <option key = {optionStrng} value={optionStrng}>{optionStrng}</option>

    }

return (
    <div>
        <span>
            <input value = {props.text || ""}></input>
        </span>
        <span>
            <select value = {props.type || ""}> 
            <option value="">Choose:</option>
            {
            props.dishTypeOptions.map(renderOptionsCB)
            }
          </select>
          </span>
        <span>
            <button title="search">Search!</button>
        </span>
    </div>
)
}

/*
{
/* OKLART OM MAN SKA HA DESSA UTANFÖR ELLER INNANFÖR, KOMMER ISF BEHÖVA identifiera options som i filmen JSX 15:25
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
*/
}*/

