import styles from '@/styles/Home.module.css'
 
  const heading = {
  backgroundImage: 'linear-gradient(to right bottom, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor:'transparent',
  backgroundSize: '10%',
  marginTop:'70px',
  textAlign: 'center',
}

const SingleProduct = ({product}) => {
  return (
    <>
      <div
        className={styles.singlesBox}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 30,
          padding:'10px 36px'
        }}
      >
        <div className={styles.singleProduct}>
        <img height={180} src={product.images[0]} alt='singles' />
        </div>
        <h4 style={heading}>{product.description}</h4>
      </div>
    </>
   )
}
 
export default SingleProduct