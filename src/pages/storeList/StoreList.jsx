import React, { useState, useEffect } from 'react'
import './storeList.css'
import { MarketItem } from '../../components'

function StoreList({ user, Logout }) {
  user = JSON.parse(user)
  const [priceList, setPriceList] = useState([])
  const [skinIDList, setSkinIDList] = useState([])
  const [skinNameList, setSkinNameList] = useState([])
  const [skinPriceList, setSkinPriceList] = useState([])
  const [skinImageList, setSkinImageList] = useState([])

  // get skin list
  useEffect(() => {
    fetch(`https://pd.${user.region}.a.pvp.net/store/v2/storefront/${user.userID}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
        'X-Riot-Entitlements-JWT': user.entitlementsToken
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.BonusStore.BonusStoreOffers.forEach((item) => {
          setPriceList(item.DiscountCost)
          setSkinIDList(item.Offer.Rewards)
        })
      })
  }, [user])

  //get skin info
  useEffect(() => {
    skinIDList.forEach((item) => {
      fetch(`https://valorant-api.com/v1/weapons/skinlevels/${item}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
          'X-Riot-Entitlements-JWT': user.entitlementsToken
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSkinNameList(data.data.displayName)
          setSkinImageList(data.data.displayIcon)
        })
    })
  }, [skinIDList, user])

  return (
    <div className="storeList">
      <div className="storeList__header">
        <h1>Night Market Listing</h1>
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