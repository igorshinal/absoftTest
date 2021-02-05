"use strict";

const scriptCountry = document.createElement("script");
scriptCountry.src = `https://www.ringcentral.com/api/index.php?cmd=getCountries&typeResponse=json&callback=couintries`;
document.body.append(scriptCountry);
const select = document.getElementById("selectCountry");
var nameSelectCountry;
var arrayObjects;
var reduceArrayObj;

function couintries(callback) {
    if (callback.status.success) {
        callback.result.forEach(function item(currentValue) {
                const option = document.createElement("option");
                option.appendChild(document.createTextNode(currentValue.name));
                option.value = currentValue.id;
                select.appendChild(option);
            }
        );
    }
}

select.onchange = function () {
    reduceArrayObj = [];
    var el = document.querySelector("#description");
    var matches = el.querySelectorAll("p");
    matches.forEach(function (item) {
        item.remove();
    });
    const scriptCountryDetail = document.createElement("script");
    scriptCountryDetail.src = `http://www.ringcentral.com/api/index.php?cmd=getInternationalRates&param[internationalRatesRequest][brandId]=1210&param[internationalRatesRequest][countryId]=` + this.value + `&param[internationalRatesRequest][tierId]=3311&typeResponse=json&callback=countryDetail`;
    document.body.append(scriptCountryDetail);
    const spinner = document.getElementById("spinner");
    spinner.classList.add("show-spinner");
}

function countryDetail(callback) {
    if (callback.status.success) {
        spinner.classList.remove("show-spinner");
        callback.rates.forEach(function item(currentValue) {
                nameSelectCountry = currentValue.key.name;
                currentValue.value.forEach(function (value) {
                    arrayObjects = value;
                });
            }
        );
        if (!Array.isArray(arrayObjects)) {
            let areaC = arrayObjects.areaCode === undefined ? "" : arrayObjects.areaCode;
            let phoneP = arrayObjects.phonePart === undefined ? "" : arrayObjects.phonePart;
            description.innerHTML += `<p>Name: ` + nameSelectCountry + `</p>`;
            description.innerHTML += `<p>Code: ` + areaC + "" + phoneP + `</p>`;
            description.innerHTML += `<p>Rate: ` + arrayObjects.rate + `</p>`;
            description.innerHTML += `<p>Type: ` + arrayObjects.type + `</p>`;
        }
        if (Array.isArray(arrayObjects)) {
            let map = arrayObjects.reduce(function (acc, cur) {
                acc[cur.type] = acc[cur.type] || {
                    type: cur.type,
                    areaCode: [],
                    phonePart: [],
                    rate: []
                };
                acc[cur.type].areaCode.push(cur.areaCode);
                acc[cur.type].phonePart.push(cur.phonePart);
                acc[cur.type].rate.push(cur.rate);
                return acc;
            }, {});
            reduceArrayObj = Object.values(map);
            description.innerHTML += `<p>Name: ` + nameSelectCountry + `</p>`;
        }
        reduceArrayObj.forEach(function (item) {
            concatArray(item.areaCode, item.phonePart);
            let checkRate = Array.isArray(item.rate) ? item.rate[0] : item.rate;
            description.innerHTML += `<p>Code: ` + arr3 + `</p>`;
            description.innerHTML += `<p>Rate: ` + checkRate + `</p>`;
            description.innerHTML += `<p>Type: ` + item.type + `</p>`;
        });
    }
}

var arr3 = [];

function concatArray(arr1, arr2) {
    arr3 = [];
    if (arr1.length < arr2.length) {
        let num = arr2.length - arr1.length;
        for (let i = 0; i < num; i++) {
            arr1.push("");
        }
        for (let i = 0; i < arr2.length; i++) {
            let areaC = arr1[i] === undefined ? "" : arr1[i];
            let phoneP = arr2[i] === undefined ? "" : arr2[i];
            arr3.push(areaC + "" + phoneP);
        }
    }
    if (arr1.length > arr2.length) {
        let num = arr1.length - arr2.length;
        for (let i = 0; i < num; i++) {
            arr2.push("");
        }
        for (let i = 0; i < arr1.length; i++) {
            let areaC = arr1[i] === undefined ? "" : arr1[i];
            let phoneP = arr2[i] === undefined ? "" : arr2[i];
            arr3.push(areaC + "" + phoneP);
        }
    }
    if (arr1.length === arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            let areaC = arr1[i] === undefined ? "" : arr1[i];
            let phoneP = arr2[i] === undefined ? "" : arr2[i];
            arr3.push(areaC + "" + phoneP);
        }
    }
}









