from django.urls import path
from . import views

urlpatterns = [
    path("", views.renderLogin, name = "Login"),
    path("user/logins/", views.loginUser, name ="userLogin"),
    path("predict/", views.predictModel, name="predict-Model"),
    path("create-account/", views.renderCreateAccount, name ="createAccount"),
    path("create/user/", views.createUser, name="createUser"),
    path("home/", views.renderHome, name ="home"),
    path("estimate/house/price/", views.predictModel),
    path("estimate/land/price/", views.predictLandPrice),
    path("manage/houses/", views.renderHouses),
    path("add/house/", views.addHouse),
    path("set/house/sold/", views.setHouse)
]