import "/src/style.css"

export function SearchResultsView(props){

    function renderResultsCB(searchResult){
        return (
            <span key={searchResult.id} className="spanet">

                <img src={searchResult.image} height={'100'} className="image" onClick={clickedACB}/>
                <div onClick={clickedACB}>{searchResult.title}</div>

            </span>
        )

        function clickedACB(evt){
            console.log(searchResult);
            return searchResult.onDishClicked(searchResult);
        }
    }

    return (
        <div className="result" on>
                {
                    props.searchResults.map(renderResultsCB)
                }
        </div>
    )

    function showsDetailsACB(dishObj){
        console.log(dishObj.target.value);
    }

}