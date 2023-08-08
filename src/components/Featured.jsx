

const Featured = ({featuredProduct}) => {
  return (
    <div>
      <h2 style={{textAlign:'center',marginTop:'10px',}}>{featuredProduct.title}</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center'
        }}>
        <img src={featuredProduct.images[2]} alt='' />
      </div>
    </div>
  )
}

export default Featured