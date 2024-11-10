
export function SearchFormView(props){ 

    const { dishTypeOptions, text, type } = props;
   
    const dishes = [
        {display: "Starter", value :"s"},
        {display: "Main course", value:"m"},
        {display: "Dessert", value : "d"}
    ]
    
    function renderOptionsCB(optionObj){
        return <option key = {optionObj.value} value={optionObj.value}>{optionObj.display}</option>

    }
return (
    <div>
        <span>
            <input value = {props.text || ""}></input>
        </span>
        <span>
            <select value = {props.text || ""}> 
            <option value="">Choose:</option>{
           dishes.map(renderOptionsCB)
            }
          </select>
          </span>
        <span>
            <button title="search">Search!</button>
        </span>
    </div>
)
}


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
}

