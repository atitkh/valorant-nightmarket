import React, { useState, useEffect } from 'react'
import './storeList.css'
import { MarketItem } from '../../components'

function StoreList({ user, Logout }) {
  user = JSON.parse(user)
  // const [priceList, setStoreList] = useState([])
  // const [skinIDList, setSkinIDList] = useState([])

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
      <h1>Store List</h1>
      <h2>Welcome {user.username}</h2>
      <MarketItem name={'ASD'} image={'https://fpschampion.com/wp-content/uploads/2022/07/best-valorant-skins-scaled.jpg'} price={'2000'} discountedPrice={'1000'} />
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default StoreList