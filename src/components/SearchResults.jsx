import React from 'react'
import ProductBox from './ProductBox'

const SearchResults = ({ searchedResults }) => {

  return (
    <div style={{
      backgroundColor: '#fff',
      padding:10,
    }}>
      {searchedResults?.length > 0 && 
              <h2 style={{ textAlign: 'center', }}>Search Results</h2>}
      <div
        style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign:'center',
                  gap: 30,
                  overflowX:'scroll',
                  margin:'0 8px',
                  justifyContent:'space-between',
              }}
      >
        {searchedResults?.length> 0 &&
          searchedResults.map((result) => (
            <div>
              <div>
              <ProductBox
                images={result.images}
                title={result.title}
                description={result.description}
                price={result.price}
                _id={result._id}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchResults