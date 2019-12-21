var express = require('express');
var router = express.Router();

var data = {
    "success": "true",
    "products": [
        {
            "id": "001",
            "productName": "Cyclone",
            "productUrl": "https://2wheels.com/velo-26/female-velo/Pride-Pink",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_32/u_files_store_0_1277790.jpg",
            "productPrice": "300",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "female",
            "productType": "mounting",
            "productWheelSize": "26"
        },
        {
            "id": "002",
            "productName": "Pride Rebel",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_27/u_files_store_0_1269991.jpg",
            "productPrice": "500",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "male",
            "productType": "mounting",
            "productWheelSize": "28"
        },
        {
            "id": "003",
            "productName": "Comanche",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_30/u_files_store_0_1275311.jpg",
            "productPrice": "450",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "male",
            "productType": "city",
            "productWheelSize": "28"
        },
        {
            "id": "004",
            "productName": "Optimo",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_33/u_files_store_0_1278510.jpg",
            "productPrice": "500",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "female",
            "productType": "city",
            "productWheelSize": "27"
        }
    ]
}

// const filterParams = {
//     "productGender":["male","female"],
//     "productType":"mounting"
// }



/* GET products. */
router.get('/', function(req, res, next) {

    let filterParams = req.query;

    var responseFilter = () => {

        var response = [];

        for (let key in filterParams) {
            if (typeof filterParams[key] === 'object') {
                console.log('array');
                var arrayResp = [];
                if (response.length === 0) {
                    console.log('response length 0 !!!!!!!!!!!!!!!!!');
                    filterParams[key].forEach( (filterArg,index) => {
                        arrayResp = data.products.filter( (el,i) => el[key] === filterArg)
                        response = response.concat(arrayResp);
                    })
                }else {
                    console.log('response length >>>>>>>>>>>> 0');
                    filterParams[key].forEach( (filterArg,index) => {
                        arrayResp = response.filter( (el,i) => el[key] === filterArg)
                        response = response.concat(arrayResp);
                    })
                }
            } else {
                console.log('string');
                var stringResp = [];
                if (response.length === 0){
                    stringResp = data.products.filter( (el,i) => el[key] === filterParams[key])
                }else {
                    stringResp = response.filter( (el,i) => el[key] === filterParams[key])
                }
                response = stringResp;
            }
        }
        return response
    }

    var result = null;

    console.log(filterParams);

    if (Object.entries(filterParams).length != 0) {
        console.log('params');
        result = {
            "success": "true",
            "products": responseFilter(),
        }
    } else {
        console.log('no params');
        result = data;
    }

    res.json(result);

});

module.exports = router;
