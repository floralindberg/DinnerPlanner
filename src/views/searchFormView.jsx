
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