import React, { useState, useEffect } from 'react'
import './storeList.css'
import { MarketItem } from '../../components'

function StoreList({ user, Logout }) {
  user = JSON.parse(user)
  const [priceList, setStoreList] = useState([])
  const [skinIDList, setSkinIDList] = useState([])
  const [skinNameList, setSkinNameList] = useState([])
  const [skinPriceList, setSkinPriceList] = useState([])
  const [skinImageList, setSkinImageList] = useState([])

  // useEffect(() => {
  //   fetch(`https://pd.${user.region}.a.pvp.net/store/v2/storefront/${user.userID}/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${user.accessToken}`,
  //       'X-Riot-Entitlements-JWT': user.entitlementsToken
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       data.BonusStore.BonusStoreOffers.forEach((item) => {
  //         setStoreList((prev) => [...prev, item.DiscountCost])
  //         setSkinIDList((prev) => [...prev, item.Offer.Rewards])
  //       })
  //     })
  // }, [user])

  return (
    <div className="storeList">
      <div className="storeList__header">
        <h1>Store List</h1>
      </div>
      <div className="storeList__body">
        {skinNameList.map((item, index) => (
          <MarketItem key={index} name={item} price={skinPriceList[index]} image={skinImageList[index]} discountedPrice={priceList[index]} />
        ))}
      </div>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default StoreList