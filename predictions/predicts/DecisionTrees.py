import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import  RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor

class RandomForestRegressor_:
    def __init__(self):
        self.DTC_price =  RandomForestRegressor()
        self.data = pd.read_csv("predictions\\predicts\\kc_house_data.csv")
        self.data = self.data.drop(["date","grade","sqft_above","sqft_basement", "zipcode", "lat", "long", "sqft_living15","sqft_lot15"], axis= 1 )
        self.data["bathrooms"] = round(self.data["bathrooms"])
        self.data["price"] = round(self.data["price"] / 13)

    def split_data(self, X, Y):
        x_train , x_test , y_train , y_test = train_test_split(X , Y , test_size = 0.10,random_state =2)

        return (x_train, x_test, y_train, y_test)

    def predict_price(self):
        predict_price_data = self.data.copy()
        Y = predict_price_data['price']
        X = predict_price_data.drop(['id', 'price'],axis=1)
        x_train , x_test , y_train , y_test = self.split_data(X, Y)

        self.DTC_price.fit(x_train,y_train)


    def predict(self, houseProps, MODE):
        headers = [
            "price",
            "bedrooms",
            "bathrooms",
            "sqft_living",
            "sqft_lot",
            "floors",
            "waterfront",
            "view",
            "condition",
            "yr_built",
            "yr_renovated"
        ]
        testDf = pd.DataFrame([houseProps], columns=headers)
        if MODE == "HP":
            testDf = testDf.drop("price", axis = 1)
            price =  self.DTC_price.predict(testDf)

            return price

        else:
            return False


class DecisionTreeRegressor_:
    def __init__(self):
        self.RFR_land =  DecisionTreeRegressor()
        self.lands = pd.read_csv("predictions\\predicts\\standPrices1.csv")
    
    def train(self):
        X = self.lands.drop("price", axis= 1)
        Y = self.lands.drop("area", axis=1)
        x_train , x_test , y_train , y_test = train_test_split(X , Y , test_size = 0.10,random_state =2)

        self.RFR_land.fit(x_train, y_train)

    
    def predict(self, val):
        price  = self.RFR_land.predict([[val]])
        
        return price