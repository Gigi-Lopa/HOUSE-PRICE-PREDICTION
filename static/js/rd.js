function rd(res){
    
    let length  =  Math.floor(res).toString().length
    let newSum = ""
    for(let i = 0; i < length - 1; i++){
        
        newSum = newSum + Math.floor(res).toString()[i]
    }
    if (parseInt(newSum) >= 50000){
        newSum = parseInt(newSum)
        newSum = newSum / 2
        newSum.toString()
    }

    return newSum
}
function createAlert(message, alert){
    let div = document.createElement("div")
    div.setAttribute("class",`alert ${alert}`)
    div.innerHTML = message
    document.querySelector(".reviews__bars").appendChild(div)
}
let showReviews  = (bedrooms, bathrooms, waterfront, view, yards, amount) =>{

    // BEDROOMS 
    let bedroomsMessages = {
     "success": `The model estimated the value $${amount} becouse you have more than the average number of bedrooms i.e 3`,
     "average" : `The model estimated the value $${amount} because your house has the average number of bedrooms i.e 3`, 
     "lessAmount" :  `The model estimated the value $${amount} becouse you have less than the average number of bedrooms i.e 3`
    }
    if (bedrooms > 3 ){     
        createAlert(bedroomsMessages["success"], "alert-success")
    }
    else if (bedrooms == 3){
        createAlert(bedroomsMessages["average"], "alert-warning")
    }
    else if (bedrooms < 3){
        createAlert(bedroomsMessages["lessAmount"], "alert-danger")
    }

    //WATERFRONTS
    let waterfrontMesages = {
        "success" : `The model estimated the value $${amount} because you have access to a waterfront which is quite expensive to purchase`, 
        "lessAmount" : `The model estimated the value $${amount} becouse you dont have access to waterfront.`
       }
       if (waterfront ==  1){     
           createAlert(waterfrontMesages["success"], "alert-success")
       }
       else if (waterfront == 0){
           createAlert(waterfrontMesages["lessAmount"], "alert-danger")
       }

    // BATHROOMS    
    let bathroomsMessages = {
        "success": `The model estimated the value $${amount} becouse you have more than the average number of bathrooms i.e 2`,
        "average" : `The model estimated the value $${amount} because your house has the average number of bathrooms i.e 2`, 
        "lessAmount" :  `The model estimated the value $${amount} becouse you have less than the average number of bathrooms i.e 2`
       }
       if (bathrooms > 2 ){     
           createAlert(bathroomsMessages["success"], "alert-success")
       }
       else if (bathrooms == 2){
           createAlert(bathroomsMessages["average"], "alert-warning")
       }
       else if (bathrooms < 2){
           createAlert(bathroomsMessages["lessAmount"], "alert-danger")
       }

    // VIEW
    let viewMessages = {
        "success": `The model estimated the value $${amount} becouse your estate has a natural landscape view, which led to the increase of the price`,
        "lessAmount" :  `The model estimated the value $${amount} becouse your estate doesn't have a natural landscape view, hence downgrading its price`
       }
       if (view == 1 ){     
           createAlert(viewMessages["success"], "alert-success")
       }
       else if (view == 0 ){
           createAlert(viewMessages["lessAmount"], "alert-danger")
       }

    // YARD   
    let yardsMessages = {
        "success": `The model estimated the value $${amount} becouse your yard is too big, hence your estate is pricey`,
        "lessAmount" :  `The model estimated the value $${amount} becouse your yard is average sized hence a normal value has been predicted`
       }
       if (yards > 600 ){     
           createAlert(yardsMessages["success"], "alert-success")
       }
       else if (yards <  600){
           createAlert(yardsMessages["lessAmount"], "alert-danger")
       }
    
}
