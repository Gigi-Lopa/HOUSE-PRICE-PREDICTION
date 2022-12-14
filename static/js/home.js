let PREDICTION_MODE = "HP"
/*GET COOOKIES*/ 
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
   if (val ===  "House Price"){
        document.querySelector("#houseProps").classList.remove("hidden")
        document.querySelector("#landProps").classList.add("hidden")

   }
   else if (val === "Land Price"){
        document.querySelector("#houseProps").classList.add("hidden")
        document.querySelector("#landProps").classList.remove("hidden")
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

/*SHOW ERROR*/
function showError(){
    document.querySelector(".alert-danger").classList.remove("hidden")
}
function hideError(){
    document.querySelector(".alert-danger").classList.add("hidden")

}
/* SLIDER */ 
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
/*  PREDICTION */
document.querySelector("#houseProps")
.addEventListener("submit", (e)=>{
    e.preventDefault()

    let validProps  = false
    let waterfront;
    let view
    let condition = document.querySelector(".noUi-tooltip").innerText
    let price = e.target.price.value.length == 0 ? (e.target.price.value) :(0)
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
            "bathrooms":parseFloat(e.target.bathrooms.value),
            "sqft_living": livingRoom,
            "sqft_lot": yardSize,
            "floors" : parseFloat(1.5),
            "waterfront" : parseInt(waterfront),
            "view": view ,
            "condition": parseInt(condition),
            "yr_built":parseInt(e.target.yearbuilt.value),
            "yr_renovated": parseInt(e.target.yearrenno.value),
            "price": parseInt(price),
            "PREDICTION_MODE" : PREDICTION_MODE
    }
$.ajax({
    url:"/estimate/house/price/",
    type:"POST",
    data:{
        "houseData": houseData,
        csrfmiddlewaretoken: csrfToken    
    },
    success:(res)=>{
         let amount = res["prediction"][0]
        if (amount > 0){

            hideError()
            document.querySelector(".reviews").classList.remove("hidden")
            $(".reviews__bars").empty()
            showReviews(
                parseInt(e.target.bedrooms.value),
                parseInt(e.target.bathrooms.value),
                parseInt(waterfront),
                parseInt(view),
                parseInt(e.target.sqryd.value),
                amount
            )
            document.querySelector(".estd__price").innerHTML = `<span class = "bi bi-currency-dollar"></span> ${amount}`
        }
        else{
            showError()
        }
  
    },
    error:(err)=>{
        
    }
})

    }
}) 

document.querySelector("#landProps").addEventListener("submit", e=>{
    e.preventDefault()
    
    if (e.target.land.value.length == 0){
        document.querySelector("#land").style.borderColor = "red"
    }
    else{
        document.querySelector("#land").style.borderColor = "rgb(2, 169, 199)"
        let landData = {
            area :e.target.land.value
        }
        $.ajax({
            url:"/estimate/land/price/",
            type:"POST",
            data:{
                "landData": {
                    landData
                },
                csrfmiddlewaretoken:getCookies("csrftoken")    
            },
            success : (res)=>{
                console.log(res["prediction"][0])
                document.querySelector("#land-price").classList.remove("hidden")
                document.querySelector(".land-price").innerText = res["prediction"][0]
            }   
        })
    }
})



/**
  
*/