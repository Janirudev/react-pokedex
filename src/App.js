import { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from './PokemonList'
import Pagination from './Pagination'

function App() {
  const [ pokemon, setPokemon ] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setPokemon(res.data.results.map(p => p.name))
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setLoading(false)
    })

    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <div className="App">
      <PokemonList pokemon={pokemon}></PokemonList>
      <Pagination goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage: null}></Pagination>
    </div>
  );
}

export default App;
