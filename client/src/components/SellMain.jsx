import { Link,useNavigate } from "react-router-dom";
import styles from '../css/Sell.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(){
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const [cnt, setCnt] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [img,setImg] = useState(null);
    const [category,setCategory] = useState(null);
    const [product_name,setProduct_name] = useState(null);
    const [discount,setDiscount] = useState(null);
    const [price,setPrice] = useState(null);
    const [sizeAdd,setSizeAdd] = useState([]);
    const [totalCnt,setTotalCnt] = useState(0);
    const [totalMoney,setTotalMoney] = useState(0);

    useEffect(()=>{
        axios.post('http://localhost:5000/getProduct',{"productId":params.get('productId')})
        .then(response => {
            setImg("http://localhost:5000/imgLoad?img="+response.data[0][0].img)
            setCategory(response.data[0][0].category)
            setProduct_name(response.data[0][0].productName)
            setDiscount(response.data[0][0].discount==0 ? '' : response.data[0][0].discount+"%")
            setPrice(response.data[0][0].price)
            
            setCnt(JSON.parse(response.data[0][0].cnt))
            let cnt = JSON.parse(response.data[0][0].cnt)

            const colors = []
            Object.keys(cnt).map((color)=>(
                colors.push(color)
            ))
            setColors(colors)

            const sizes = []
            Object.keys(cnt[Object.keys(cnt)[0]]).map((size)=>(
                sizes.push(size)
            ))
            setSizes(sizes)

        })
        .catch(err => {
            console.log(err)
        });
    },[])

    
    function size(cnt){
        let c_total = {}
        Object.keys(cnt).map((color)=>{
            Object.keys(cnt[color]).map((size)=>{
                if(Object.keys(c_total).includes(color)){
                    c_total[color] += parseInt(cnt[color][size])
                }else{
                    c_total[color] = parseInt(cnt[color][size])
                }
            })
        })

        return c_total;
    }
    function colorChange(e){
        let el = document.querySelectorAll("select option")
        
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
        let ch = -1;
        sizeAdd.map((item,idx) => {
            if(e.currentTarget.value == item.color_size){
                ch = idx
            }
        })
        if(ch == -1){
            setSizeAdd([...sizeAdd,{
                'color_size':e.currentTarget.value,
                'color':e.currentTarget.value.split("_")[0],
                'size':e.currentTarget.value.split("_")[1],
                'cnt':1
            }])
            setTotalCnt(totalCnt+1)
            setTotalMoney(totalMoney+money(1))
        }
    }
    function money(num){
        let money = parseInt(price)
        if(price != ''){
            money = parseInt(price * ((100-parseInt(discount))*0.01))
        }
        return money*num
    }
    function size_cancel(e){
        sizeAdd.map(item=>{
            if(item.color_size == e.target.parentNode.parentNode.id){
                setSizeAdd((prevItems) => prevItems.filter(item2 => item2 !== item));
            }
        })   
    }
    function minus_btn(e){
        setTotalMoney(money(totalCnt-1))
        setTotalCnt(totalCnt-1)

        const newSizeAdd = sizeAdd
        newSizeAdd.map(item =>{
            if(item.color_size == e.target.parentNode.parentNode.parentNode.id ||
                item.color_size == e.target.parentNode.parentNode.parentNode.parentNode.id
            ){
                item.cnt -= 1
                if(item.cnt < 1){
                    setSizeAdd((prevItems) => prevItems.filter(item2 => item2 !== item));
                }else{
                    item.price = money(item.cnt)
                    setSizeAdd(newSizeAdd);
                }
            }
        })
        
    }
    function plus_btn(e){
        setTotalMoney(money(totalCnt+1))
        setTotalCnt(totalCnt+1)

        const newSizeAdd = sizeAdd
        newSizeAdd.map(item =>{
            if(item.color_size == e.target.parentNode.parentNode.parentNode.id ||
                item.color_size == e.target.parentNode.parentNode.parentNode.parentNode.id
            ){
                item.price = money(item.cnt+1)
                item.cnt += 1
            }
        })
        setSizeAdd(newSizeAdd);
    }
    function goCart(e){
        let cnt={};
        
        sizeAdd.map((item)=>{
            if(!Object.keys(cnt).includes(item.color)){
                cnt[item.color] = {}
            }
            cnt[item.color][item.size] = item.cnt
        })

        axios.post('http://localhost:5000/cartSave',{
            productId:document.querySelector("#productId").value,
            userId:document.querySelector("#userId").value,
            cnt:JSON.stringify(cnt)
        }).then(response => {
            if(response.data == 1){
                navigate('/cart')
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return(
        <div className={styles.main}>
            <input type="hidden" id="productId" value={params.get('productId')}/>
            <picture>
                <source type="image/webp" srcSet={img}/>
                <img src={img}/>
            </picture>
            <div className={styles.product_info}>
                <span className={styles.category}>{category}</span>
                <span className={styles.product_name}>{product_name}</span>
                <span className={styles.price}>
                    <em className={styles.discount}>{discount}</em>
                    <em>{price}</em>
                </span>
                <div className={styles.color}>
                    {
                        Object.keys(cnt).map((color)=>(
                            <div key={color} className={`color_${color}`} style={{backgroundColor:"#"+color, 
                            borderColor:parseInt(color)>7631988?"#000000":'#ffffff',
                            color:parseInt(color)<7631988?"#ffffff":'#000000'}}
                            onClick={colorChange}>
                                {
                                    Object.keys(size(cnt[color])).map((size)=>(
                                        <input key={size} type="hidden" className={`c_'${color}_${size}'`} value={cnt[color][size]}/>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <select id="aaa" onInput={size_add}>
                    <option hidden value="사이즈" className="default">사이즈</option>
                    {
                        sizes.map((size)=>(
                            <option key={size} value={colors[0]+'_'+size} style={{
                                backgroundColor:'#'+colors[0],color:'#'+(parseInt(colors[0])<7631988?"ffffff":'000000')}}>
                            {size}
                            </option>
                        ))
                    }
                </select>
                <div className={styles.size_cnt}>
                    {
                        sizeAdd.map(item=>(
                            <div key={item.color_size} id={item.color_size} className={styles.size_cnt_one}>
                                <p>
                                <span className={styles.size}>
                                    <label style={{backgroundColor:`#${item.color}`,
                                        borderColor:`#${parseInt(item.color)>7631988?"000000":'ffffff'}`,
                                        color:`#${parseInt(item.color)<7631988?"ffffff":'000000'}`}}></label>
                                    {item.size}
                                </span>
                                <span className={styles.cancel_btn} onClick={size_cancel}>X</span>
                                </p>
                                <div className={styles.cnt_price}>
                                    <label className={styles.cnt}>
                                    <span className={styles.minus_btn} onClick={minus_btn}>
                                        <label></label>
                                    </span>
                                    <span className={styles.num}>{item.cnt}</span>
                                    <span className={styles.plus_btn} onClick={plus_btn}>
                                        <label></label>
                                        <label></label>
                                    </span>
                                    </label>
                                    <label className={styles.money}>{money(`${item.cnt}`)}원</label>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <p className={styles.total_money}>
                    <span className={styles.total_cnt}>총 {totalCnt}개</span>
                    <span className={styles.money}>총 {totalMoney}원</span>
                </p>
                <button className={styles.cartSave} onClick={goCart}>장바구니</button>
                <button className={styles.fastSell}>바로구매</button>
            </div>
        </div>
    )
}

export default Main;