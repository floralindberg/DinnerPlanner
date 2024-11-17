import "/src/style.css"

export function SearchResultsView(props){

    function renderResultsCB(searchResult){
        return (
            <span key={searchResult.id} className="spanet" onClick={clickedACB}>

                <img src={searchResult.image} height={'100'} className="image" />
                <div className="searchImageTitle">{searchResult.title}</div>

            </span>
        )

        function clickedACB(evt){
            console.log(evt);
            return props.onDishClicked(searchResult);
        }

    }

    return (
        <div className="result" onClick={showsDetailsACB}>
                {
                    props.searchResults.map(renderResultsCB)
                }
        </div>
    )

    function showsDetailsACB(dishObj){
        console.log(dishObj);
    }

}