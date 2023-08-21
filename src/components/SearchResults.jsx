import React from 'react'

const SearchResults = ({ searchedResults}) => {

  return (
    <div style={{
      backgroundColor: 'yellow',
      padding:20,
    }}>
      <h2 style={{textAlign:'center',}}>Search Results</h2>
      <div>
        {searchedResults?.length> 0 &&
          searchedResults.map((result) => (
            <h3
              style={{textAlign:'center',}}
              key={result._id}
            >{result.description}</h3>
          ))
        }
      </div>
    </div>
  )
}

export default SearchResults