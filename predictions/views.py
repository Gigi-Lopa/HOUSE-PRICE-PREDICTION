from email import header
from django.shortcuts import render
from requests import request
from urllib3 import HTTPResponse
from predictions.predicts.DecisionTrees import RandomForestRegressor_
from predictions.predicts.DecisionTrees import DecisionTreeRegressor_
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from predictions.models import userDetails
from predictions.models import houseDetails
from predictions.models import houseRevenue

DTC = RandomForestRegressor_()
DTC.predict_price()

DFR = DecisionTreeRegressor_()
DFR.train()

@csrf_exempt
def renderLogin(request):
    return render(request, "login.html")

@csrf_exempt
def renderCreateAccount(request):
    return render(request, "createAccount.html")

@csrf_exempt
def renderHouses(request):
    houseInformation = houseDetails.objects.filter(sold = 'No')
    soldHouses = houseDetails.objects.filter(sold = "YES")
    houses = houseRevenue.objects.all()
    total_sales = len(houses)
    revenue =  0

    for house  in houses:
        selling_price = house.total_amount
        revenue  = revenue + selling_price
    
    return render(request, "manageHouses.html", {
        "houseData": houseInformation,
        "soldHouses" : soldHouses,
        "total_sales" : total_sales,
        "revenue" : revenue
    })

@csrf_exempt
def renderHome(request):
    if request.session.get("username"):
        return render(request, "index.html", {
            "username": request.session.get("username"),
            "email": request.session.get("email"),
             })
    else:
        return HttpResponseRedirect("/")
   
@csrf_exempt
def loginUser(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        logProps = userDetails.objects.filter(
            username = username,
            password = password
        )
        if logProps:
            request.session["username"] = username
            request.session["email"] = logProps[0].email
            return JsonResponse({
                "status": True,
                "username" : request.POST["username"]
            })
        else:
            return JsonResponse({
                "status": False,
            })

@csrf_exempt
def createUser(request):
    if request.method == "POST":
        userProps = userDetails(username = request.POST["username"],
            email = request.POST["email"],
            password = request.POST["password"]
        )        
        userProps.save()

        return HttpResponseRedirect("/")

@csrf_exempt
def predictModel(request):
    if request.method  =="POST":
        houseData = [
            request.POST["houseData[price]"],
            request.POST["houseData[bedrooms]"],
            request.POST["houseData[bathrooms]"],
            request.POST["houseData[sqft_living]"],
            request.POST["houseData[sqft_lot]"],
            request.POST["houseData[floors]"],
            request.POST["houseData[waterfront]"],
            request.POST["houseData[view]"],
            request.POST["houseData[condition]"],
            request.POST["houseData[yr_built]"],
            request.POST["houseData[yr_renovated]"],
        ]
        prediction = DTC.predict(houseData, request.POST["houseData[PREDICTION_MODE]"])
    
        print(prediction)

        return JsonResponse({
            "prediction" : prediction.tolist()
        })

@csrf_exempt
def predictLandPrice(request):
    if request.method == "POST":
        landArea = request.POST["landData[landData][area]"]
        prediction = DFR.predict(landArea)

        return JsonResponse({
            "prediction" : prediction.tolist()
        })

@csrf_exempt
def addHouse(request):
    if request.method== "POST":
        houseDataDetails = houseDetails(
            bedrooms =  request.POST["houseData[bedrooms]"],
            living_room = request.POST["houseData[sqft_living]"],
            yard= request.POST["houseData[sqft_lot]"],
            natural_view = request.POST["houseData[view]"],
            condition = request.POST["houseData[condition]"],
            bathrooms = request.POST["houseData[bathrooms]"],
            waterfront = request.POST["houseData[waterfront]"],
            year_built = request.POST["houseData[yr_built]"],
            year_renovated = request.POST["houseData[yr_renovated]"],
            price = request.POST["houseData[price]"],
            sold = "No" )
        houseDataDetails.save()

        return JsonResponse({
            "status": 200
        })

@csrf_exempt
def setHouse(request):
    if request.method == "POST":
        setRevenue = houseRevenue()
        setRevenue.total_amount = setRevenue.total_amount + int(request.POST['sellingPrice'])
        setRevenue.housesSold =  setRevenue.housesSold + 1
        setRevenue.save()

        setHouse = houseDetails.objects.get(id = request.POST['id'])
        setHouse.sold = 'YES'
        setHouse.save()
        return JsonResponse({
            'status':200
        })
