import { Link } from "react-router-dom";
import styles from '../css/Cart.module.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Main(){
    const [cartData, setCartData] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [totalResultMoney, setTotalResultMoney] = useState(0);
    const [deliveryMoney,setDeliveryMoney] = useState(0)
    useEffect(()=>{
        axios.post('http://localhost:5000/cartList',{"userId":document.querySelector("#userId").value})
        .then(response => {
            let tm = 0
            let trm = 0
            response.data[0].map(item=>{
                item['totalCnt'] = 0
                item['totalMoney'] = 0
                item['checked'] = true
                item.cnt = JSON.parse(item.cnt)
                Object.keys(item.cnt).map(color=>{
                    Object.keys(item.cnt[color]).map(size=>{
                        item['totalCnt'] += item.cnt[color][size]
                        item['totalMoney'] += parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.cnt[color][size])
                        tm += parseInt(item.price) * item.cnt[color][size]
                        trm += parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.cnt[color][size])
                    })
                })
            })
            setCartData(response.data[0])
            setTotalMoney(tm)
            setTotalResultMoney(trm)
        })
        .catch(err => {
            console.log(err)
        });
    },[])

    function minus_btn(e){
        const newCartData = cartData.map(item =>{
            const newItem = { ...item, cnt: { ...item.cnt } };
            Object.keys(item.cnt).map(color=>{
                newItem.cnt[color] = { ...item.cnt[color] };
                Object.keys(item.cnt[color]).map(size=>{
                    if(item.productId+"_"+color+"_"+size == e.target.parentNode.parentNode.id ||
                        item.productId+"_"+color+"_"+size == e.target.parentNode.parentNode.parentNode.id
                    ){
                        newItem.cnt[color][size] -= 1
                        newItem.totalCnt -= 1
                        newItem.totalMoney -= parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(1)
                    }
                })
            })
            return newItem;
        })
        setCartData(newCartData);
    }
    function plus_btn(e){
        const newCartData = cartData.map(item =>{
            const newItem = { ...item, cnt: { ...item.cnt } };
            Object.keys(item.cnt).map(color=>{
                newItem.cnt[color] = { ...item.cnt[color] };
                Object.keys(item.cnt[color]).map(size=>{
                    if(item.productId+"_"+color+"_"+size == e.target.parentNode.parentNode.id ||
                        item.productId+"_"+color+"_"+size == e.target.parentNode.parentNode.parentNode.id
                    ){
                        newItem.cnt[color][size] += 1;
                        newItem.totalCnt += 1
                        newItem.totalMoney += parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(1)
                    }
                })
            })
            return newItem;
        })
        setCartData(newCartData);
    }

    function colorChange(e){
        
        let el = e.target.parentNode.parentNode.querySelectorAll("select option")

        for(let i=1;i<el.length;i++){
            let color = rgbToHex(e.target.style.backgroundColor)
            el[i].value = color+'_'+el[i].textContent
            el[i].style.backgroundColor = '#'+color
            el[i].style.color = parseInt(color)<7631988?"#ffffff":'#000000'

        }
    }

    function rgbToHex(rgb) {
        const clean = rgb.replace(/\s+/g, '');
        const match = clean.match(/^rgb\((\d+),(\d+),(\d+)\)$/i);

        if (!match) return null;

        const [, r, g, b] = match.map(Number);
        const toHex = (n) => n.toString(16).padStart(2, '0');

        return `${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function size_add(e){
        const [color, size] = e.currentTarget.value.split("_");

        const newCartData = cartData.map((item,idx) => {
            const productId = e.target.parentNode.parentNode.querySelectorAll("td")[0].querySelector("input").value
            const newItem = { ...item, cnt: { ...item.cnt } };
            newItem.cnt[color] = { ...item.cnt[color] };
            if(item.productId == productId){
                
                newItem.cnt[color][size] = 1;
                newItem.totalCnt += 1
                newItem.totalMoney += parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(1)
                setTotalMoney(totalMoney + parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(1))
                setTotalResultMoney(totalResultMoney + parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(1))
            }
            return newItem
        })
        setCartData(newCartData)
    }

    function cartCancel(productId){
        setCartData((prevItems) => prevItems.filter(item => {
            if(item.productId == productId){
                setTotalMoney(totalMoney - parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.totalCnt))
                setTotalResultMoney(totalResultMoney - parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.totalCnt))
            }
            return item.productId !== productId
        }));
    }

    function buy(){
        let tmpCartData = []
        let el = document.getElementsByName("clothes")
        
        let c = 0
        el.forEach(e=>{
            if(e.checked){
                c += 1
                cartData.map(item=>{
                    if(e.value == item.productId){
                        tmpCartData.push({
                            userId:document.querySelector("#userId").value,
                            productId : item.productId,
                            cnt:JSON.stringify(item.cnt)
                        })
                    }
                })
            }
        })
        if(tmpCartData.length == 0){
            alert("구매할 상품을 선택해주세요.")
        }else{
            axios.post('http://localhost:5000/tmpCartSave',tmpCartData)
            .then((response)=>{
                window.location.href = '/buy?keyData='+response.data
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    function checked(e){
        const newCartData = cartData.map(item =>{
            const newItem = item;
            if(newItem.productId == e.target.value){
                newItem.checked = e.target.checked
                let cnt = 0
                Object.keys(item.cnt).map(color=>{
                    Object.keys(item.cnt[color]).map(size=>{
                        cnt += newItem.cnt[color][size]
                    })
                })
                if(newItem.checked){
                    setTotalMoney(totalMoney + parseInt(newItem.price) * cnt)
                    setTotalResultMoney(totalResultMoney + parseInt(newItem.price * ((100-parseInt(newItem.discount))*0.01))*parseInt(cnt))
                }else{
                    setTotalMoney(totalMoney - parseInt(newItem.price) * cnt)
                    setTotalResultMoney(totalResultMoney - parseInt(newItem.price * ((100-parseInt(newItem.discount))*0.01))*parseInt(cnt))
                }
            }
            return newItem;
        })
        setCartData(newCartData);
    }

    // useEffect(()=>{
    //     console.log(cartData)
    // },[cartData])

    return(
        <div className={styles.main}>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="clothes_all" className={styles.clothes} name="clothesAll" value="all"/></th>
                        <th>이미지</th>
                        <th>정보</th>
                        <th>옵션</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map((item,idx)=>(
                            <tr key={idx}>
                                <td>
                                    <input type="checkbox" className={styles.clothes} name="clothes" value={item.productId} checked={item.checked} onChange={checked} />
                                </td>
                                <td>
                                    <picture>
                                        <source srcSet={'http://localhost:5000/imgLoad?img='+item.img} type="image/webp"/>
                                        <Link to={"/sell?productId="+item.productId}>
                                            <img src={'http://localhost:5000/imgLoad?img='+item.img}/>
                                        </Link>
                                    </picture>
                                </td>
                                <td>
                                    <Link to={"/sell?productId="+item.productId}>{item.productName}</Link>
                                    <span className={styles.price}>
                                        <em className={styles.discount}>{item.discount==0 ? '' : item.discount+"%"}</em>
                                        <em>{item.price}</em>
                                    </span>
                                    <div className={styles.color}>
                                        {
                                            Object.keys(item.cnt).map(color=>(
                                                <div key={color} className={"color_"+color} onClick={colorChange}
                                                    style={{backgroundColor:`#${color}`,
                                                    borderColor:`#${parseInt(color)>7631988?"000000":'ffffff'}`,
                                                    color:`#${parseInt(color)>7631988?"000000":'ffffff'}`}}>
                                                    {
                                                        Object.keys(item.cnt[color]).map(size=>{
                                                            <input type="hidden" className={"c_"+item.cnt[color]+"_"+size} value={item.cnt[color][size]}/>
                                                        })
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <select onInput={size_add}>
                                        <option hidden className={styles.default}>사이즈</option>
                                        {
                                            Object.keys(item.cnt[Object.keys(item.cnt)[0]]).map(item2=>(
                                                <option key={item2} value={Object.keys(item.cnt)[0]+"_"+item2} 
                                                        style={{backgroundColor:`#${Object.keys(item.cnt)[0]}`,color:`#${parseInt(Object.keys(item.cnt)[0])>7631988?"000000":'ffffff'}`}}>
                                                    {item2}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td>
                                    <p className={styles.x_btn} onClick={()=>cartCancel(item.productId)}>X</p>
                                    <div className={styles.size_cnt}>
                                        {
                                            Object.keys(item.cnt).map((color,idx)=>{
                                                return (
                                                    Object.keys(item.cnt[color]).map(size=>{
                                                        if(item.cnt[color][size] > 0){
                                                            return(
                                                                <div key={item.productId+"_"+color+"_"+size} className={styles.size_cnt_one} id={item.productId+"_"+color+"_"+size}>
                                                                    <div className={"color_"+color} style={{backgroundColor:`#${color}`,borderColor:`#${color}`}}></div>
                                                                    <label className={styles.size}>{size}</label>
                                                                    <label className={styles.cnt}>
                                                                        <span className={styles.minus_btn} onClick={minus_btn}>
                                                                            <label></label>
                                                                        </span>
                                                                        <span className={styles.num}>{item.cnt[color][size]}</span>
                                                                        <span className={styles.plus_btn} onClick={plus_btn}>
                                                                            <label></label>
                                                                            <label></label>
                                                                        </span>
                                                                    </label>
                                                                    <label className={styles.money}>{parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.cnt[color][size])}원</label>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                )
                                            })
                                        }
                                    </div>
                                    <p className={styles.total_money}>
                                        <span className={styles.total_cnt}>총 {item.totalCnt}개</span>
                                        <span className={styles.money}>{item.totalMoney}원</span>
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className={styles.total}>
                <h3>구매 금액</h3>
                <p><span>상품 금액</span><span className={styles.product_total_money}>{totalMoney}</span><span>원</span></p>
                <p><span>할인 금액</span><span className={styles.product_total_discount_money}>{totalMoney-totalResultMoney}</span><span>원</span></p>
                <p><span>배송비</span><span className={styles.delivery_money}>{deliveryMoney}</span><span>원</span></p>
                <p><span>총 구매 금액</span><span className={styles.total_buy_money}>{totalResultMoney-deliveryMoney}</span><span>원</span></p>
                <button className={styles.buy_btn} onClick={buy}>구매하기</button>
            </div>
        </div>
    )
}

export default Main;