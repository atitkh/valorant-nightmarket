import React from 'react'
import './marketItem.css'

function MarketItem({ name, price, image, discountedPrice, discountPercent }) {
  return (
    <div className='marketItem'>
      <div className="marketItem__image">
        <img src={image} alt={name} />
      </div>
      <div className="marketItem__info">
        <h3>{name}</h3>
        <h4 id='oldPrice'>{price}</h4>
        <h4 id='newPrice'>{discountedPrice}</h4>
        <h5 id='discount'>-{discountPercent}</h5>
      </div>
    </div>
  )
}

export default MarketItem