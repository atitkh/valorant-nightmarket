import React, { useState, useEffect, initialArray } from 'react'
import './storeList.css'
import { MarketItem } from '../../components'
import axios from 'axios'

function StoreList({ user, Logout }) {
  // user = JSON.parse(user)
  const [priceList, setPriceList] = useState([])
  const [skinIDList, setSkinIDList] = useState([])
  const [skinNameList, setSkinNameList] = useState([])
  const [skinPriceList, setSkinPriceList] = useState([])
  const [skinImageList, setSkinImageList] = useState([])

  // get skin list
  useEffect(() => {
    const fetchData = async () => {
      let priceArray = [];
      let skinIDArray = [];
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = JSON.parse(user);
      let details = {
        user_id: user.userID,
        access_token: user.accessToken,
        entitlements_token: user.entitlementsToken,
        region: user.region,
        username: user.username
      };

      let response = await fetch("https://api.atitkharel.com.np/valorant/storefront/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      let result = await response.json();
      result.BonusStore.BonusStoreOffers.forEach((item) => {
        for (var key in item.DiscountCosts) {
          priceArray.push(item.DiscountCosts[key]);
        }
        for (var key in item.Offer.Rewards) {
          skinIDArray.push(item.Offer.Rewards[key]['ItemID']);
        }
      });
      setPriceList(priceArray);
      setSkinIDList(skinIDArray);
    }
    fetchData();
  }, [user]);

  //get skin info
  useEffect(() => {
    const fetchData = async () => {
      let imageArray = [];
      let nameArray = [];

      for (let i = 0; i < skinIDList.length; i++) {
        let response = await fetch("https://valorant-api.com/v1/weapons/skinlevels/" + skinIDList[i]);
        let result = await response.json();
        imageArray.push(result.data.displayIcon);
        nameArray.push(result.data.displayName);
      }
      setSkinImageList(imageArray);
      setSkinNameList(nameArray);
    }
    fetchData();
  }, [skinIDList, user]);

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