from django.db import models

# Create your models here.
class userDetails(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

class houseDetails(models.Model):
    bedrooms = models.IntegerField()
    living_room =  models.IntegerField()
    yard =  models.IntegerField()
    natural_view = models.IntegerField()
    condition = models.IntegerField()
    bathrooms = models.IntegerField()
    waterfront =  models.IntegerField()
    year_built =  models.IntegerField()
    year_renovated =  models.IntegerField()
    price = models.CharField(max_length= 200)
    sold = models.CharField(max_length= 500, default="No")

class houseRevenue(models.Model):
    total_amount = models.IntegerField(default = 0)
    housesSold = models.IntegerField(default = 0)    