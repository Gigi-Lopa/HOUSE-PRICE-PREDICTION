function getCookies(name){
    let cookieValues = null

    if(document.cookie && document.cookie !== ""){
        let cookies = document.cookie.split(";")
        for (var i = 0; i < cookies.length; i++){
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1 )=== (name + "=")){
                cookieValues = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }

    }
    return cookieValues
}
function removeFields(val){ 
    if (val ===  "Houses"){
         document.querySelector("#analytics").classList.add("hidden")
         document.querySelector("#manage-houses").classList.remove("hidden")
 
    }
    else if (val === "Analytics"){
         document.querySelector("#analytics").classList.remove("hidden")
         document.querySelector("#manage-houses").classList.add("hidden")
    }
 }
 
 /* HANDLE TABS */
 let BTN_TABS = document.querySelector(".btn-tabs")
BTN_TABS.querySelectorAll(".btn-tab").forEach(TAB =>{
    TAB.addEventListener("click", ()=>{
     BTN_TABS.querySelectorAll(".btn-tab").forEach(e =>{
         if (e.classList.contains("active")){
             e.classList.remove("active")
         }
      })
      TAB.classList.add("active")
      removeFields(TAB.children[0].innerHTML)
    })
 })
marginSlider=document.getElementById('slider-margin');
if(marginSlider!=undefined){
    noUiSlider.create(marginSlider,{
            start:[4],
            step:1,
            connect:[true,false],
            tooltips:[true],
            range:{
                'min':0,
                'max':5
            },
            format:wNumb({
                decimals:0
            })});}

document.querySelector("#addHouseBtn")
.addEventListener("click", (e)=>{
    document.querySelector(".overlay").classList.remove("hidden")
})
document.querySelector("#addHouse")
.addEventListener("submit", (e)=>{
    e.preventDefault()

    let validProps  = false
    let waterfront;
    let view
    let condition = document.querySelector(".noUi-tooltip").innerText
    let price = e.target.price.value
    let csrfToken  = getCookies("csrftoken")
    let livingRoom = Math.floor(parseInt(e.target.sqrlr.value) / 0.0929)
    let yardSize = Math.floor(parseInt(e.target.sqryd.value) / 0.0929)

    document.getElementsByName("option").forEach((Element)=>{
        if (Element.checked){
            waterfront = Element.value == "yes" ? (1) : (0)
        }
    })
    document.getElementsByName("view").forEach((Element)=>{
        if (Element.checked){
            view = Element.value == "yes" ? (1) : (0)
        }
    })
    /* AUTH */
    document.querySelectorAll(".required").forEach(label =>{
        let parentElement = label.parentElement


        if (parentElement.querySelector(".row__input").value == '')
        {
            
            validProps = false
            parentElement.querySelector(".row__input").style.border = "1px solid #b90000";
        }
        else if(parentElement.querySelector(".row__input").value != ''){

            validProps = true
            parentElement.querySelector(".row__input").style.border = "1px solid rgb(2, 169, 199)";

        }   
    })
    
    if (validProps){

        let houseData = {
            "bedrooms":parseInt(e.target.bedrooms.value),
            "bathrooms":parseInt(e.target.bathrooms.value),
            "sqft_living": livingRoom,
            "sqft_lot": yardSize,
            "waterfront" : parseInt(waterfront),
            "view": view ,
            "condition": parseInt(condition),
            "yr_built":parseInt(e.target.yearbuilt.value),
            "yr_renovated": parseInt(e.target.yearrenno.value),
            "price": parseInt(price)
    }
    console.log(houseData)
$.ajax({
    url:"/add/house/",
    type:"POST",
    data:{
        "houseData": houseData,
        csrfmiddlewaretoken: csrfToken    
    },
    success:(res)=>{
        if(res.status){
            $(location).attr("href", "/manage/houses/")
        }
    },
    error:(err)=>{
        
    }
})

    }
})
$(document).ready(()=>{
    let PRICE_VALUE = 0
    document.querySelectorAll(".sellHouse")
    .forEach(btn =>{
       btn.addEventListener("click", ()=>{
            let BTN_PARENT = btn.parentElement;
            let price = BTN_PARENT.querySelector("m").innerText;
            let house_id = BTN_PARENT.querySelector("p").innerText;
            let SELLING_MODAL = document.querySelector("#sell-house-overlay")
            PRICE_VALUE = price;
        
            SELLING_MODAL
            .querySelector("#price_").value = PRICE_VALUE;
            SELLING_MODAL
            .querySelector("#house_id").value = house_id;
           

            SELLING_MODAL.classList.remove("hidden")
       })
    })
    document.querySelector("#close-sell-modal")
    .addEventListener("click", ()=>{
        document.querySelector("#sell-house-overlay").classList.add("hidden")
        
    })
    document.querySelector("#close-big-modal")
    .addEventListener("click",()=>{
        document.querySelector(".add-house-modal").parentElement.classList.add("hidden")
    })
    document.querySelector("#sell-house")
    .addEventListener("click", ()=>{
        let houseID = document.querySelector("#house_id").value
        let sellingPrice = document.querySelector("#price_").value;
        let cookies = getCookies("csrftoken")

        $.ajax({
            url:"/set/house/sold/",
            type:"POST",
            data:{
                id : houseID,
                sellingPrice : sellingPrice, 
                csrfmiddlewaretoken: cookies    
            },
            success:(res)=>{
                if(res.status === 200){
                    $(location).attr("href", "/manage/houses/")
                }
            },
            error:(err)=>{
                
            }
        })
    })
})
