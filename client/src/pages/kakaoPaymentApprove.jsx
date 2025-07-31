import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Index(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    console.log(params)
    const tid = params.get('tid')
    axios.post('http://localhost:5000/deliveryStatusUpdate',{'tid':tid,'status':'결제완료'})
    .then(response=>{
        if(response.data == 1) window.open('about:blank','_self').self.close();
    })
    return(
        <div>

        </div>   
    )
}
export default Index;