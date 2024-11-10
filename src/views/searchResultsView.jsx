import "/src/style.css"

export function SearchResultsView(props){

    function renderResultsCB(searchResult){
        return (

            <span key={searchResult.id} className="spanet">

                <img src={searchResult.image} height={'100'} className="image"/> 
                <div>{searchResult.title}</div>

            </span>


        )
    }
    return (

        <div className="result">
                {
                   props.searchResults.map(renderResultsCB)
                }
        </div>
    )

}

{/*
    function renderResultsCB(searchResult){
        return <div key={searchResult.id}>{searchResult.title + " | " + searchResult.image + " | " + searchResult.id + " | " + searchResult.sourceUrl + " | "}</div>
            
    }
    */
}