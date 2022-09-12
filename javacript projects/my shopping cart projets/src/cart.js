
let label =document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data"))|| [];



let calculation = () => {
    let carticon = document.getElementById("cartAmount");
    // console.log(basket);
    const itemsCount = basket.map((item)=>item.item).reduce((x,y)=>x+y,0);
    console.log(itemsCount);
    carticon.innerHTML = itemsCount;
    // console.log(carticon)
    // carticon.innerHTML = basket.map((x)=> x.item).reduce((x , y) => x+y , 0);
};
calculation();

let generateCartItems =()=>{
    if(basket.length !=0){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id ,item}=x;
            let search= shopItemsdata.find((y)=>y.id === id) || [];
            let {img, name, price}= search; /**destructuring an object */
            return `
            <div class = "cart-item">
                <img  width = "100" src=${img} />
                <div class= "details">
                    <div class= "title-price-x">
                    <h4 class="title-price">
                        <p class = "cart-item-price"> ${name}</p>
                        <p>$ ${price}</p>
                    </h4>
                    <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
                   
                
                <div class="buttons">
                    <i  onclick ="decrement(${id})" class="bi bi-dash"></i>
                    <div  id=${id} class="quantity"> ${item}
                   
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>

                </div>
                <h3>$ ${item * parseInt(price)}</h3>
                </div>
            </div>
            
            `
        }).join(''))
       
        
    } else {
        ShoppingCart.innerHTML =``;
        label.innerHTML=`
        <h2> Cart is Empty</h2>
        <a href = "index.html">
            <button class = "HomeBtn">Back to home</button>
        </a>
            `;
    }
}
generateCartItems();
let increment =(id)=> {
    let selecteditem = id;
    let search = basket.find((x)=> x.id===selecteditem.id);
    if(search ===undefined){
        basket.push({
            id:selecteditem.id,
            item :1,
        })
    }
    else{
        search.item +=1;
    }

    
    

   
    generateCartItems();
    update(selecteditem.id);
    localStorage.setItem("data",JSON.stringify(basket));
};
let decrement =(id)=> {
    let selecteditem = id;
    let search = basket.find((x)=> x.id===selecteditem.id);
    if(search === undefined) return;
    else if (search.item === 0) {return}
    
    else{
        search.item -=1;
    }
    update(selecteditem.id);
    basket =basket.filter((x)=> x.item!=0);

   
    generateCartItems();
   
    localStorage.setItem("data",JSON.stringify(basket));
};
let update =(id)=> {
    let search = basket.find((x)=> x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML =search.item;
    calculation();
    Totalamount();
};
 
let removeItem =(id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket= basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    Totalamount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
};

let clearcart=()=> {
    basket=[]
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let Totalamount=()=>{
    if(basket.length !=0){
        let amount = basket.map((x)=>{
            let {item, id}=x;
            let search= shopItemsdata.find((y)=>y.id === id) || [];

            return item *search.price;
        })
        .reduce((x,y)=> x+y ,0);
        // console.log(amount)
        label.innerHTML=`
        <h2> Total Bill :$ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button  onclick="clearcart()" class="removeAll"> Clear Cart </button>
    

        `;
    }
    else return;
};
Totalamount();