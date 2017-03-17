function _toConsumableArray(baseArr) {
    "use strict";
    if (Array.isArray(baseArr)) {
        for (var i = 0, arr2 = Array(baseArr.length); i < baseArr.length; i++) {
            arr2[i] = baseArr[i];
        }
        return arr2;
    } else {
        return Array.from(baseArr);
    }
}

/*Global Variables*/
var outputEnum = ["firstOut", "secondOut", "thirdOut", "fourthOut", "fifthOut", "sixthOut", "seventhOut"];
var numDatesEnum = [$('#firstSelection').val(), $('#secondSelection').val(), $('#thirdSelection').val(), $('#fourthSelection').val(), $('#fifthSelection').val(), $('#sixthSelection').val(), $('#seventhSelection').val()];
var selectID = ['firstSelection', 'secondSelection', 'thirdSelection', 'fourthSelection', 'fifthSelection', 'sixthSelection', 'seventhSelection'];
var csvHeaders = ["High Recurring", "Low Recurring", "High Daily", "High Week Commencing", "Low Week Commencing", "High Monthly", "Low Monthly"];
var USHolidays = ["02/01/2012", "16/01/2012", "20/02/2012", "28/05/2012", "04/07/2012", "03/09/2012", "08/10/2012", "12/11/2012", "22/11/2012", "25/12/2012", "01/01/2013", "21/01/2013", "18/02/2013", "27/05/2013", "04/07/2013", "02/09/2013", "14/10/2013", "11/11/2013", "28/11/2013", "25/12/2013", "01/01/2014", "20/01/2014", "17/02/2014", "26/05/2014", "04/07/2014", "01/09/2014", "13/10/2014", "11/11/2014", "27/11/2014", "25/12/2014", "01/01/2015", "19/01/2015", "16/02/2015", "25/05/2015", "03/07/2015", "07/09/2015", "12/10/2015", "11/11/2015", "26/11/2015", "25/12/2015", "01/01/2016", "18/01/2016", "15/02/2016", "30/05/2016", "04/07/2016", "05/09/2016", "10/10/2016", "11/11/2016", "24/11/2016", "25/12/2016", "02/01/2017", "16/01/2017", "20/02/2017", "29/05/2017", "04/07/2017", "04/09/2017", "09/10/2017", "10/11/2017", "23/11/2017", "25/12/2017", "01/01/2018", "15/01/2018", "19/02/2018", "28/05/2018", "04/07/2018", "03/09/2018", "08/10/2018", "12/11/2018", "22/11/2018", "25/12/2018", "01/01/2019", "21/01/2019", "18/02/2019", "27/05/2019", "04/07/2019", "02/09/2019", "14/10/2019", "11/11/2019", "28/11/2019", "25/12/2019", "01/01/2020", "20/01/2020", "17/02/2020", "25/05/2020", "03/07/2020", "07/09/2020", "12/10/2020", "11/11/2020", "26/11/2020", "25/12/2020"];
var UKHolidays = ["2/01/2012", "6/04/2012", "9/04/2012", "7/05/2012", "4/06/2012", "5/06/2012", "27/08/2012", "25/12/2012", "26/12/2012", "1/01/2013", "29/03/2013", "1/04/2013", "6/05/2013", "27/05/2013", "26/08/2013", "25/12/2013", "26/12/2013", "1/01/2014", "18/04/2014", "21/04/2014", "5/05/2014", "26/05/2014", "25/08/2014", "25/12/2014", "26/12/2014", "1/01/2015", "3/04/2015", "6/04/2015", "4/05/2015", "25/05/2015", "31/08/2015", "25/12/2015", "28/12/2015", "1/01/2016", "25/03/2016", "28/03/2016", "2/05/2016", "30/05/2016", "29/08/2016", "26/12/2016", "27/12/2016", "2/01/2017", "14/04/2017", "17/04/2017", "1/05/2017", "29/05/2017", "28/08/2017", "25/12/2017", "26/12/2017", "1/01/2018", "30/03/2018", "2/04/2018", "7/05/2018", "28/05/2018", "27/08/2018", "25/12/2018", "26/12/2018"];
var output;
var allData = [];

function updateNumDatesEnum() {
    numDatesEnum[0] = $('#firstSelection').val();
    numDatesEnum[1] = $('#secondSelection').val();
    numDatesEnum[2] = $('#thirdSelection').val();
    numDatesEnum[3] = $('#fourthSelection').val();
    numDatesEnum[4] = $('#fifthSelection').val();
    numDatesEnum[5] = $('#sixthSelection').val();
    numDatesEnum[6] = $('#seventhSelection').val();
}

function datePrint() {
    var startDate = moment(Date.parse($('#strtDt').val()));
    var endDate = moment(Date.parse($('#ndDt').val()));
    var randDate = moment(new Date(getRndInteger(startDate, endDate)));
    //console.log(randDate.format("DD/MM/YYYY"));
    //console.log(endDate.diff(startDate, 'days'));
}
// Hack and slash minmax random function inclusive.
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* Formats the date object input to dd/mm/yy string */
function ddmmyy(Date) {
    var date = Date.getDate();
    var month = Date.getMonth() + 1;
    var year = Date.getFullYear();
    return date.toString() + "/" + month.toString() + "/" + year.toString();
}
/* Returns the initial subset of dates based on start date, end date and count*/
function initialSubset(args, startDate, endDate, range) {
    //console.log(randDate.day());
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        //do stuff for IE.
        var subsetSize = args == "weekend" ? SubsetSize(startDate, endDate, true) : SubsetSize(startDate, endDate, false);
        var subArr = [];
        //console.log(startDate);
        //console.log(endDate);
        //console.log(SubsetSize(range));
        for (var x = 0; x < subsetSize; x++) {
            var randDate = moment(new Date(getRndInteger(startDate, endDate)));
            if (subArr.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                //console.log("Date already in array.");
                x -= 1;
                continue;
            } else if (args == "weekend" && (randDate.day() == 0 || randDate.day() == 6)) {
                //console.log("Cannot select weekend.");
                x -= 1;
                continue;
            }
            if (document.getElementById("USCheck").checked == true && USHolidays.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                //console.log("Cannot be a US holiday.");
                x -= 1;
                continue;
            } else if (document.getElementById("UKCheck").checked == true && UKHolidays.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                //console.log("Cannot be a UK holiday.");
                x -= 1;
                continue;
            } else {
                subArr.push(randDate.format("DD/MM/YYYY"));
            }
        }
    } else {
        var subsetSize = args == "weekend" ? SubsetSize(startDate, endDate, true) : SubsetSize(startDate, endDate, false);
        var subArr = [];
        for (var x = 0; x < subsetSize; x++) {
            var randDate = moment(new Date(getRndInteger(startDate, endDate)));
            if (subArr.includes(randDate.format("DD/MM/YYYY"))) {
                //console.log("Date already in array.");
                x -= 1;
                continue;
            } else if (args == "weekend" && (randDate.day() == 0 || randDate.day() == 6)) {
                //console.log("Cannot select weekend.");
                x -= 1;
                continue;
            }
            if (document.getElementById("USCheck").checked == true && USHolidays.includes(randDate.format("DD/MM/YYYY"))) {
                //console.log("Cannot be a US holiday.");
                x -= 1;
                continue;
            } else if (document.getElementById("UKCheck").checked == true && UKHolidays.includes(randDate.format("DD/MM/YYYY"))) {
                //console.log("Cannot be a UK holiday.");
                x -= 1;
                continue;
            } else {
                subArr.push(randDate.format("DD/MM/YYYY"));
            }
        }
    }
    subArr.sort(function(a, b) {
        a = a.split('/').reverse().join('');
        b = b.split('/').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
    });
    return subArr;
}

function SubsetSize(range) {
    for (var i = 0; i < numDatesEnum.length; i++) {
        if (numDatesEnum[i] < range) {
            output = i;
            return numDatesEnum[i];
        }
    }
}

function createList(inArray) {
    var list = document.createElement('ul');
    list.className = "list-group";
    for (var i = 0; i < inArray.length; i++) {
        var item = document.createElement('li');
        item.className = "list-group-item";
        item.appendChild(document.createTextNode(inArray[i]));
        list.appendChild(item);
    }
    return list;
}

function createAlert(cat, type, msg) {
    var div = document.createElement('div');
    div.className = "alert alert-" + cat;
    div.innerHTML = "<strong>" + type + "</strong> " + msg;
    return div;
}

function std_date(rawDate) {
    if (rawDate.indexOf("-") >= 0) {
        var arrDate = rawDate.split("-");
    } else {
        var arrDate = rawDate.split("/");
    }
    var std_date_str = [arrDate[2], arrDate[1], arrDate[0]].join("/");
    return std_date_str;
}

function go() {
    //console.log("Go button pressed");
    //console.log(USHolidays.includes("04/07/2016"));
    //console.log($("#strtDt").val());
    updateNumDatesEnum();
    var startDate = moment(std_date(document.getElementById('strtDt').value), 'YYYY-MM-DD');
    var endDate = moment(std_date(document.getElementById('ndDt').value), 'YYYY-MM-DD');
    var rangeDays = endDate.diff(startDate, 'days');
    var rangeMonths = endDate.diff(startDate, 'months');
    //console.log(rangeDays);
    if (rangeMonths > 5) {
        var initArray = [];
        if (document.getElementById("weekendCheck").checked == true) {
            initArray = initialSubset("weekend", startDate, endDate, rangeDays);
        } else {
            initArray = initialSubset("normal", startDate, endDate, rangeDays);
        }
        var allData = [];
        $('#csvBtn').attr("disabled", false);
        var addArr = initArray.slice(0);
        addArr.unshift(csvHeaders[output]);
        //console.log(initArray);
        allData.push(addArr);
        //document.getElementById("output").innerHTML = initArray;
        clearOutput();
        clearChildNodes("alertBox");
        document.getElementById(outputEnum[output]).appendChild(createList(initArray));
        for (var i = output + 1; i < outputEnum.length; i++) {
            if (parseInt(numDatesEnum[i - 1]) <= parseInt(numDatesEnum[i])) {
                document.getElementById("alertBox").appendChild(createAlert("danger", "Error:", "Number of dates must flow from high to low. Dates " + numDatesEnum[i - 1] + " must be greater than Dates " + numDatesEnum[i]));
                break;
            } else {
                /* Months output*/
                if (i == outputEnum.length - 1 || i == outputEnum.length - 2) {
                    //numDatesEnum[i] <=3) {
                    var initcopy = new Array(initArray);
                    var crap = [];

                    for (var j = 0; j < initArray.length; j++) {
                        var d = moment(std_date(initArray[j]), "YYYY/MM/DD");
                        var test = moment(d).month(d.month()).format("MMMM");
                        crap.push(test);
                    }

                    var unique = [].concat(_toConsumableArray(new Set(crap)));
                    while (unique.length > numDatesEnum[i]) {
                        unique.splice(getRndInteger(0, unique.length - 1), 1);
                        //console.log(unique);
                    }
                    document.getElementById(outputEnum[i]).appendChild(createList(unique));
                    addArr = unique.slice(0);
                    addArr.unshift(csvHeaders[i]);
                    allData.push(addArr);
                }
                /* Weeks starting with Monday based on previous dates */
                else if (i == outputEnum.length - 3 || i == outputEnum.length - 4) {
                    var initcopy = new Array(initArray);
                    var crap = [];

                    for (var j = 0; j < initArray.length; j++) {
                        var d = moment(std_date(initArray[j]), "YYYY/MM/DD");
                        var test = moment(d).isoWeekday("Monday").year(d.year()).week(d.week()).format("DD/MM/YYYY");
                        crap.push(test);
                    }

                    var unique = [].concat(_toConsumableArray(new Set(crap)));
                    while (unique.length > numDatesEnum[i]) {
                        unique.splice(getRndInteger(0, unique.length - 1), 1);
                        //console.log(unique);
                    }
                    document.getElementById(outputEnum[i]).appendChild(createList(unique));
                    initArray = unique;
                    addArr = unique.slice(0);
                    addArr.unshift(csvHeaders[i]);
                    allData.push(addArr);
                } else {
                    var tempArray = createSubset(initArray, numDatesEnum[i]);
                    initArray = tempArray;
                    addArr = tempArray.slice(0);
                    addArr.unshift(csvHeaders[i]);
                    //console.log(initArray);
                    allData.push(addArr);
                    document.getElementById(outputEnum[i]).appendChild(createList(initArray));
                    //console.log(allData);
                }
            }
        }
        //console.log(allData);
        createCSV(allData);
    } else if (rangeMonths <= 5) {
        //console.log("Dates are invalid");
        clearChildNodes("alertBox");
        document.getElementById("alertBox").appendChild(createAlert("danger", "Error:", "The dates selected need to be at least 6 months apart for optimum results."));
    } else {
        //console.log("Dates are invalid");
        clearChildNodes("alertBox");
        document.getElementById("alertBox").appendChild(createAlert("danger", "Error:", "The dates selected are invalid."));
    }
}

function toMonth(monthArr) {
    var hold = [];
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    for (var x = 0; x < monthArr.length; x++) {
        hold.push(month[monthArr[x]]);
    }
    return hold;
}


function createCSV(allData) {
  if (!!navigator.userAgent.match(/Trident\/7\./)) {
    var lineArray = [];
    allData = _.zip.apply(null, allData);
    allData.forEach(function(infoArray, index) {
        var line = infoArray.join(",");
        lineArray.push(line);
    });
    var csvContent = lineArray.join('\n');


    var b = document.getElementById('csvBtn');
    if (window.navigator.msSaveOrOpenBlob) {
        blobObject = new Blob([decodeURIComponent(encodeURI(csvContent))], {
            type: "text/csv;charset=utf-8;"
        });
        b.onclick = function() {
            window.navigator.msSaveOrOpenBlob(blobObject, 'MyFile.csv');
        }
    }
  }
  else {
    var lineArray = [];
    allData = _.zip.apply(null, allData);
    allData.forEach(function (infoArray, index) {
        var line = infoArray.join(",");
        lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
    });
    var csvContent = lineArray.join('\n');
    var encodedUri = encodeURI(csvContent);
    var link = document.getElementById("csvBtn");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "RandomDates.csv");
    //document.body.appendChild(link); // Required for FF
  }
}


/*
function createCSV() {
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        var lineArray = [];
        allData = _.zip.apply(null, allData);
        allData.forEach(function (infoArray, index) {
            var line = infoArray.join(",");
            lineArray.push(line);
        });
        var csvContent = lineArray.join('\n');
        var a = document.createElement('a');
        if(window.navigator.msSaveOrOpenBlob){
            var blobObject = new Blob(allData);
            a.onclick=function(){
                window.navigator.msSaveOrOpenBlob(blobObject, 'MyFile.csv');
            }
        }
        a.appendChild(document.createTextNode('Click to Download'));
        document.body.appendChild(a);
console.log("All data: " + allData);
console.log("-------------------------------------------------------------");
console.log(blobObject);
        a.click();

    } else {
        var lineArray = [];
        allData = _.zip.apply(null, allData);
        allData.forEach(function (infoArray, index) {
            var line = infoArray.join(",");
            lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
        });
        var csvContent = lineArray.join('\n');
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "RandomDates.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    }
}
*/

function clearChildNodes(nID) {
    var temp = document.getElementById(nID);
    if (temp.hasChildNodes()) {
        temp.removeChild(temp.childNodes[0]);
    }
}

function clearOutput() {
    document.getElementById("firstOut").innerHTML = "";
    document.getElementById("secondOut").innerHTML = "";
    document.getElementById("thirdOut").innerHTML = "";
    document.getElementById("fourthOut").innerHTML = "";
    document.getElementById("fifthOut").innerHTML = "";
    document.getElementById("sixthOut").innerHTML = "";
    document.getElementById("seventhOut").innerHTML = "";
}

function createSubset(sset, sizeOfSub) {
    var subArray = [];
    for (var i = 0; i < sizeOfSub; i++) {
        var randSet = sset[getRndInteger(0, sset.length - 1)];
        //console.log('Subset rand: ' + randSet);
        if (!!navigator.userAgent.match(/Trident\/7\./)) {
            if (subArray.indexOf(randSet) != -1) {
                i -= 1;
                continue;
            } else {
                subArray.push(randSet);
            }
        } else {
            if (subArray.includes(randSet)) {
                i -= 1;
                continue;
            } else {
                subArray.push(randSet);
            }
        }
    }
    subArray.sort(function(a, b) {
        a = a.split('/').reverse().join('');
        b = b.split('/').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
    });
    return subArray;
}

function clearForm() {
    //console.log($('#firstSelection').val());
    //console.log(numDatesEnum[0]);
    clearOutput();
    $('#csvBtn').attr("disabled", true);
    $('#strtDt').datepicker("setDate", "-1y");
    $('#ndDt').datepicker("setDate", "0d");
    clearChildNodes("alertBox");
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
      $('#csvBtn').onClick();
    }
    else {
      var link = document.getElementById("csvBtn");
      link.removeAttribute("href");
      link.removeAttribute("download");
    }

}

function fillDropDowns() {
    for (var x = 0; x < selectID.length; x++) {
        var selected = document.getElementById(selectID[x]);
        for (var i = 1; i <= 100; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.innerHTML = i + " Dates";
            selected.appendChild(option);
        }
    }
    $('#firstSelection').val(40);
    $('#secondSelection').val(25);
    $('#thirdSelection').val(15);
    $('#fourthSelection').val(8);
    $('#fifthSelection').val(5);
    $('#sixthSelection').val(3);
    $('#seventhSelection').val(2);
}

function fixDatefields() {

    $.datepicker.setDefaults({
        defaultDate: 0,
        showOn: "button",
        dateFormat: 'dd/mm/yy',
        showButtonPanel: true,
        buttonImageOnly: true,
        buttonImage: "./css/images/calendar.png",
        buttonText: "Calendar"
    });
    /*
    $('#strtDt').datepicker({ defaultDate: -365, dateFormat: 'dd-mm-yy' });
    $('#ndDt').datepicker({
        defaultDate: 0,
        dateFormat: 'dd-mm-yy',
        showButtonPanel: true,
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
    */

    $(function() {
        $('#strtDt').datepicker();
        $('#strtDt').datepicker("setDate", "-1y");
        $('#ndDt').datepicker();
        $('#ndDt').datepicker("setDate", "0d");
        //$(".ui-datepicker-trigger").attr("src", "calendar.png");
    });

    $('#csvBtn').attr("disabled", true);

    //console.log("dates fixed");
    /*
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        $(".outDiv").css("padding-bottom", "8em");
    }
    */
}
