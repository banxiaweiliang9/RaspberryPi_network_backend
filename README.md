## This is the Back-end Code of Our Team's Server Based on Raspberry PI Remote Real-time Monitoring of the Planting System.
### Raspberry Pie sends two sets of json data and an image file to the backend server.
1. *The first set of json data is the real-time display data*
    * *Real-time display data including temperature, light intensity, soil moisture, air moisture*
2. *The second set of json is log data*
    * *On the basis of real Time data, time keyword and Action keyword are added to log data, respectively indicating the time of logging data and the operation mode of watering (automatic or manual).*
    * *The log data is saved as a.json file by the back-end server*
3. *The picture file is the real-time state of the plants that we monitor*
    * *And save as lyzhu.jpg locally on the server*