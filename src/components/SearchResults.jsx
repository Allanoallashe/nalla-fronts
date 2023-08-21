import React from 'react'
import ProductBox from './ProductBox'

const justfierOne = {
                  display: 'flex',
                  alignItems: 'center',
                  textAlign:'center',
                  gap: 40,
                  overflowX:'auto',
                  margin:'0 8px',
                  paddingBottom:'16px',
                  justifyContent:'center',
}
const justfierTwo = {
                  display: 'flex',
                  alignItems: 'center',
                  textAlign:'center',
                  gap: 30,
                  overflowX:'auto',
                  margin:'0 8px',
                  paddingBottom:'16px',
                  justifyContent:'space-between ',
}

const SearchResults = ({ searchedResults}) => {

  if (searchedResults?.length === 0) {
    return
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      padding:10,
    }}>
      {searchedResults?.length > 0 &&
        <h2 style={{ textAlign: 'center', }}>Search Results</h2>
            }
      <div
        style={searchedResults?.length <= 4 ? justfierOne : justfierTwo}
        className='scroll-searched'
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