import React, { useState, useEffect } from 'react'
import './storeList.css'
import { MarketItem } from '../../components'

function StoreList({ user, Logout }) {
  // user = JSON.parse(user)
  const [priceList, setPriceList] = useState([])
  const [discountPercent, setDiscountPercent] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [wallet, setWallet] = useState(0)
  const [walletKeys, setWalletKeys] = useState([])
  const [walletImages, setWalletImages] = useState([])
  const [skinIDList, setSkinIDList] = useState([])
  const [skinNameList, setSkinNameList] = useState([])
  const [skinPriceList, setSkinPriceList] = useState([])
  const [skinImageList, setSkinImageList] = useState([])

  const [loading, setLoading] = useState(true)

  // get skin list
  useEffect(() => {
    const fetchData = async () => {
      let priceArray = [];
      let originalPriceArray = [];
      let skinIDArray = [];
      let discountPercentArray = [];

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
      if(result.BonusStore){
        result.BonusStore.BonusStoreOffers.forEach((item) => {
          discountPercentArray.push(item.DiscountPercent);
          for (let key in item.DiscountCosts) {
            priceArray.push(item.DiscountCosts[key]);
          }
          for (let key in item.Offer.Cost) {
            originalPriceArray.push(item.Offer.Cost[key]);
          }
          for (let key in item.Offer.Rewards) {
            skinIDArray.push(item.Offer.Rewards[key]['ItemID']);
          }
        });
        setTimeRemaining(result.BonusStore.BonusStoreRemainingDurationInSeconds);
        setPriceList(priceArray);
        setSkinPriceList(originalPriceArray);
        setSkinIDList(skinIDArray);
        setDiscountPercent(discountPercentArray);
      }
      else{
        setTimeRemaining(0);
        setLoading(false);
      }
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
    if (skinIDList.length > 0) {
      setLoading(false);
    }
  }, [skinIDList, user]);

  //get wallet
  useEffect(() => {
    const fetchData = async () => {
      let wallet = {};
      let details = {
        user_id: user.userID,
        access_token: user.accessToken,
        entitlements_token: user.entitlementsToken,
        region: user.region,
        username: user.username
      };

      let response = await fetch("https://api.atitkharel.com.np/valorant/wallet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      let result = await response.json();

      let keys = Object.keys(result.Balances);
      let images = [];

      let response2 = await fetch(`https://valorant-api.com/v1/currencies/${keys[0]}`);
      let result2 = await response2.json();
      wallet[result2.data.displayName] = result.Balances[keys[0]];
      keys[0] = result2.data.displayName;
      images.push(result2.data.displayIcon);

      let response3 = await fetch(`https://valorant-api.com/v1/currencies/${keys[1]}`);
      let result3 = await response3.json();
      wallet[result3.data.displayName] = result.Balances[keys[1]];
      keys[1] = result3.data.displayName;
      images.push(result3.data.displayIcon);

      let response4 = await fetch(`https://valorant-api.com/v1/currencies/${keys[2]}`);
      let result4 = await response4.json();
      wallet[result4.data.displayName] = result.Balances[keys[2]];  
      keys[2] = result4.data.displayName;
      images.push(result4.data.displayIcon);

      setWallet(wallet);
      setWalletKeys(keys);
      setWalletImages(images);
    }
    fetchData();
  }, [user]);

  return (
    <div className="storeList">
      <div className="storeList__header">
        <h1>Night Market Listing</h1>
      </div>
      <div className="storeList__wallet">
        <div className="storeList__wallet__content">
          {walletKeys.map((key, index) => (
            (index < 2) ? (
            <div className="storeList__wallet__content__item" key={index}>
              <img src={walletImages[index]} alt={key} />
              <h4>{wallet[key]}</h4>
            </div>
            ) : null 
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className='storeList__loading'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="storeList__body">
          {timeRemaining > 0 ? skinNameList.map((item, index) => (
            <MarketItem key={index} name={item} price={skinPriceList[index] + ' VP'} image={skinImageList[index]} discountedPrice={priceList[index] + ' VP'} discountPercent={discountPercent[index] + '%'} />
          )) : (
            <div className="storeList__body__empty">
              <h1>Night Market Has Ended.</h1>
            </div>  
              )}
        </div>
      )}
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default StoreList