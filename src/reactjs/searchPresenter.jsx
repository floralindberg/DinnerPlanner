import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView";
import { SearchResultsView } from "../views/searchResultsView";


const Search = observer (

        function SearchRender(props){
            

            function setSearchTextACB(text){
                props.model.setSearchQuery(text)
            }

            function setSearchDishTypeACB(type){
                props.model.setSearchType(type)
            }

            function searchNowACB(){
                props.model.doSearch(props.model.searchParams)
            }

            function conditionsForReturn(param){
                if(!param.promise){
                    return <div>No data</div>
                }
                else if(!param.data && !param.error ){
                    return <img src="https://brfenergi.se/iprog/loading.gif" />
                }
                else if (param.error){
                    return <div>{param.error.toString()}</div>
        
                }
                else if(param.data){
                    return <SearchResultsView searchResults={arrayOfSearchResults(props.model.searchResultsPromiseState)} onDishClicked={setCurrentDishACB}/>
                }
            }
        
            function arrayOfSearchResults(param){
                if(param){
                    return param.data;
                }
                else return [];
            }
        
            function setCurrentDishACB(dish){
                props.model.setCurrentDishId(dish.id);
            }

            return <div><SearchFormView dishTypeOptions= {["starter", "main course", "dessert"]} text = {props.model.searchParams.query}
            type = {props.model.searchParams.type} onTextContent={setSearchTextACB} onTypeSelected={setSearchDishTypeACB}
            onButtonClicked={searchNowACB}  />{conditionsForReturn(props.model.searchResultsPromiseState)}</div>

        }

)

export { Search };
