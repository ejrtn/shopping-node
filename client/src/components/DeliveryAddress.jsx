import { Link,useNavigate } from "react-router-dom";
import styles from '../css/DeliveryAddress.module.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Main(){
    const navigate = useNavigate();
    const [addressList, setAddressList] = useState([]);

    useEffect(()=>{
        axios.post("http://localhost:5000/deliveryAddressList",{"userId":document.querySelector("#userId").value})
        .then(response=>{
            // console.log(response.data[0])
            setAddressList(response.data[0])
        }).catch(err=>{
            console.log(err)
        })
    },[])

    // useEffect(()=>{
    //     console.log(addressList)
    // },[addressList])

    function address(deliveryAddressId){
        navigate('/deliveryAddressSC', {
            state: { deliveryAddressId: deliveryAddressId}
        });
    }

    function addressSearch(e){
        addressList.map(item=>{
            let el = document.querySelector("#add_"+item.deliveryAddressId)
            let address = `${item.address} ${item.detailAddress} ${item.extraAddress!=''?item.extraAddress:''}`
            if(!item.name.includes(e.target.value)){
                if(!address.includes(e.target.value)){
                    if(!item.phon.includes(e.target.value)){
                        el.classList.add(styles.hidden)
                    }else{
                        el.classList.remove(styles.hidden)
                    }
                }else{
                    el.classList.remove(styles.hidden)
                }
            }else{
                el.classList.remove(styles.hidden)
            }
        })
    }
    
    function radioCheck(deliveryAddressId){
        const newAddressList = addressList.map(item2=>{
            if(deliveryAddressId == item2.deliveryAddressId){
                item2.defaultYn = 'Y'
            }else{
                item2.defaultYn = 'N'
            }
            return item2
        })
        console.log(newAddressList)
        setAddressList(newAddressList)
        
    }

    function addChange(){
        addressList.map((item,idx)=>{
            if(item.defaultYn == 'Y'){
                window.opener.postMessage(
                    {
                        userAddress:`${item.address} ${item.detailAddress} ${item.extraAddress!=''?item.extraAddress:''}`,
                        userName:item.name,
                        userPhon:item.phon,
                    },
                    window.location.origin
                );
                window.close()
            }
        })
    }

    function delAddress(deliveryAddressId){
        axios.post('http://localhost:5000/deliveryAddressDelete',{'deliveryAddressId':deliveryAddressId})
        .then((response)=>{
            if(response.data == 1){
                setAddressList(prevItems => prevItems.filter(item => item.deliveryAddressId !== deliveryAddressId));
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className={styles.main}>
            <input type="hidden" id="userId" value={sessionStorage.getItem('user')==null?'deoksu':sessionStorage.getItem('user')}/>
            <h3>배송지 정보</h3>
            <div className={styles.search}>
                <input type="text" placeholder="배송지 이름, 주소, 연락처로 검색하세요" onInput={addressSearch}/>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="5.5" stroke="#8A8A8A"></circle><path d="M12.5 12.5L17 17" stroke="#8A8A8A"></path></svg>
            </div>
            <button className={styles.address_add} onClick={()=>{address("")}}>배송지 추가하기</button>
            <div className={styles.address_list}>
                {
                    addressList.map((item,idx)=>(
                        <div className={styles.user_info} key={idx} id={"add_"+item.deliveryAddressId}>
                            <input type="radio" name="chose" checked={item.defaultYn=='Y'} onClick={()=>{radioCheck(item.deliveryAddressId)}}/>
                            <div>
                                <span>
                                    <em className={styles.name}>{item.name}</em>
                                    <em className={styles.default_yn}></em>
                                </span> 
                                <span className={styles.address}>{item.address} {item.detailAddress} {item.extraAddress!=''?item.extraAddress:''}</span>
                                <span className={styles.phon}>{item.phon}</span>
                                <div className={styles.change_del}>
                                    <button className={styles.change} value={item.deliveryAddressId} onClick={()=>{address(item.deliveryAddressId)}}>수정</button>
                                    <button className={styles.del} value={item.deliveryAddressId} onClick={()=>delAddress(item.deliveryAddressId)}>삭제</button>
                                </div>
                                
                            </div>
                        </div>
                    )) 
                }
            </div>
            <button className={styles.ok} onClick={addChange}>변경하기</button>
        </div>
    )
}
    

export default Main;