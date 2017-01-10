/*Global Variables*/
var outputEnum = ["firstOut", "secondOut", "thirdOut", "fourthOut", "fifthOut", "sixthOut"];
var numDatesEnum = [$('#firstSelection').val(), $('#secondSelection').val(), $('#thirdSelection').val(), $('#fourthSelection').val(), $('#fifthSelection').val(), $('#sixthSelection').val()];
var selectID = ['firstSelection', 'secondSelection', 'thirdSelection', 'fourthSelection', 'fifthSelection', 'sixthSelection'];
var USHolidays = ["01/01/2015", "19/01/2015", "16/02/2015", "25/05/2015", "04/07/2015", "07/09/2015", "12/10/2015", "11/11/2015", "26/11/2015", "25/12/2015", "01/01/2016", "18/01/2016", "15/02/2016", "30/05/2016", "04/07/2016", "05/09/2016", "10/10/2016", "11/11/2016", "24/11/2016", "26/12/2016", "02/01/2017", "16/01/2017", "20/02/2017", "29/05/2017", "04/07/2017", "04/09/2017", "09/10/2017", "11/11/2017", "23/11/2017", "25/12/2017", "01/01/2018", "15/01/2018", "19/02/2018", "28/05/2018", "04/07/2018", "03/09/2018", "08/10/2018", "12/11/2018", "22/11/2018", "25/12/2018"]
var UKHolidays = ["02/01/2017", "14/04/2017", "17/04/2017", "01/05/2017", "29/05/2017", "28/08/2017", "25/12/2017", "26/12/2017", "01/01/2018", "30/03/2018", "02/04/2018", "07/05/2018", "28/05/2018", "27/08/2018", "25/12/2018", "26/12/2018"]
var output;
var allData = [];

function updateNumDatesEnum() {
    numDatesEnum[0] = $('#firstSelection').val();
    numDatesEnum[1] = $('#secondSelection').val();
    numDatesEnum[2] = $('#thirdSelection').val();
    numDatesEnum[3] = $('#fourthSelection').val();
    numDatesEnum[4] = $('#fifthSelection').val();
    numDatesEnum[5] = $('#sixthSelection').val();
}



function datePrint() {
    var startDate = moment(Date.parse($('#startDate').val()));
    var endDate = moment(Date.parse($('#endDate').val()));
    var randDate = moment(new Date(getRndInteger(startDate, endDate)));
    console.log(randDate.format("DD/MM/YYYY"));
    console.log(endDate.diff(startDate, 'days'));
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
function initialSubset(args) {
    //console.log(randDate.day());
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        //do stuff for IE.
        var startDate = moment($('#startDate').val(), "DD-MM-YYYY");
        var endDate = moment($('#endDate').val(), "DD-MM-YYYY");
        var subsetSize = args == "weekend" ? SubsetSize(startDate, endDate, true) : SubsetSize(startDate, endDate, false);
        var subArr = [];
        console.log(startDate);
        console.log(endDate);
        console.log(SubsetSize(startDate, endDate, false));
        for (var x = 0; x < subsetSize; x++) {
            var randDate = moment(new Date(getRndInteger(startDate, endDate)));
            if (subArr.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                console.log("Date already in array.");
                x -= 1;
                continue;
            } else if (args == "weekend" && (randDate.day() == 0 || randDate.day() == 6)) {
                console.log("Cannot select weekend.")
                x -= 1;
                continue;
            }
            if (document.getElementById("USCheck").checked == true && USHolidays.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                console.log("Cannot be a US holiday.");
                x -= 1
                continue;
            } else if (document.getElementById("UKCheck").checked == true && UKHolidays.indexOf(randDate.format("DD/MM/YYYY")) != -1) {
                console.log("Cannot be a UK holiday.");
                x -= 1
                continue;
            } else {
                subArr.push(randDate.format("DD/MM/YYYY"));
            }
        }
    } else {
        var startDate = moment(Date.parse($('#startDate').val()));
        var endDate = moment(Date.parse($('#endDate').val()));
        var subsetSize = args == "weekend" ? SubsetSize(startDate, endDate, true) : SubsetSize(startDate, endDate, false);
        var subArr = [];
        for (var x = 0; x < subsetSize; x++) {
            var randDate = moment(new Date(getRndInteger(startDate, endDate)));
            if (subArr.includes(randDate.format("DD/MM/YYYY"))) {
                console.log("Date already in array.");
                x -= 1;
                continue;
            } else if (args == "weekend" && (randDate.day() == 0 || randDate.day() == 6)) {
                console.log("Cannot select weekend.")
                x -= 1;
                continue;
            }
            if (document.getElementById("USCheck").checked == true && USHolidays.includes(randDate.format("DD/MM/YYYY"))) {
                console.log("Cannot be a US holiday.");
                x -= 1
                continue;
            } else if (document.getElementById("UKCheck").checked == true && UKHolidays.includes(randDate.format("DD/MM/YYYY"))) {
                console.log("Cannot be a UK holiday.");
                x -= 1
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

function SubsetSize(startDate, endDate, weekend) {
    var daysBetween = endDate.diff(startDate, 'days');
    //console.log(daysBetween);
    if (weekend == true) {
        for (var i = 0; i < numDatesEnum.length; i++) {
            if (numDatesEnum[i] < daysBetween - Math.ceil(daysBetween / 7 * 2)) {
                output = i;
                return numDatesEnum[i];
            }
        }
    } else {
        for (var i = 0; i < numDatesEnum.length; i++) {
            if (numDatesEnum[i] < daysBetween) {
                output = i;
                return numDatesEnum[i];
            }
        }
    }
}

function createList(array) {
    var list = document.createElement('ul');
    list.className = "list-group";
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.className = "list-group-item";
        item.appendChild(document.createTextNode(array[i]));
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

function go() {
    //console.log("Go button pressed");
    //console.log(USHolidays.includes("04/07/2016"));
    console.log($("#startDate").val());
    updateNumDatesEnum();
    if (moment(Date.parse($('#endDate').val())).diff(moment(Date.parse($('#startDate').val())), 'days') > 2) {
        var initArray = [];
        if (document.getElementById("weekendCheck").checked == true) {
            initArray = initialSubset("weekend");
        } else {
            initArray = initialSubset("normal");
        }
        allData = [];
        showElement("csvBtn");
        var addArr = initArray.slice(0);
        addArr.unshift(numDatesEnum[output] + " dates")
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
                var tempArray = createSubset(initArray, numDatesEnum[i]);
                initArray = tempArray;
                addArr = tempArray.slice(0);
                addArr.unshift(numDatesEnum[i] + " dates.");
                //console.log(initArray);
                allData.push(addArr);
                document.getElementById(outputEnum[i]).appendChild(createList(initArray));
                //console.log(allData);
            }
        }
    } else {
        console.log("Dates are invalid");
        clearChildNodes("alertBox");
        document.getElementById("alertBox").appendChild(createAlert("danger", "Error:", "The dates selected are invalid."));
    }
}

function createCSV() {
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        var lineArray = [];
        allData = _.zip.apply(null, allData);
        allData.forEach(function(infoArray, index) {
            var line = infoArray.join(",");
            lineArray.push(line);
        });
        var csvContent = lineArray.join('\n');
        var IEwindow = window.open();
        IEwindow.document.write(csvContent);
        IEwindow.document.close();
        IEwindow.document.execCommand('SaveAs', true, 'randomDates' + ".csv");
        IEwindow.close();
    } else {
        var lineArray = [];
        allData = _.zip.apply(null, allData);
        allData.forEach(function(infoArray, index) {
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

function clearChildNodes(ID) {
    var temp = document.getElementById(ID);
    if (temp.hasChildNodes()) {
        temp.removeChild(temp.childNodes[0]);
    }
}

function clearOutput() {
    document.getElementById("firstOut").innerHTML = ""
    document.getElementById("secondOut").innerHTML = ""
    document.getElementById("thirdOut").innerHTML = ""
    document.getElementById("fourthOut").innerHTML = ""
    document.getElementById("fifthOut").innerHTML = ""
    document.getElementById("sixthOut").innerHTML = ""
}

function createSubset(set, sizeOfSub) {
    var subArray = [];
    for (var i = 0; i < sizeOfSub; i++) {
        var randSet = set[getRndInteger(0, set.length - 1)];
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

function showElement(ID) {
    if (document.getElementById(ID).disabled == true) {
        document.getElementById(ID).disabled = false;
    }
}

function clearForm() {

    console.log($('#firstSelection').val());
    console.log(numDatesEnum[0]);
    clearOutput();
    document.getElementById("csvBtn").disabled = true;
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    clearChildNodes("alertBox");
}

function fillDropDowns() {
    for (var x = 0; x < selectID.length; x++) {
        select = document.getElementById(selectID[x])
        for (var i = 1; i <= 100; i++) {
            option = document.createElement("option");
            option.value = i;
            option.innerHTML = i + " Dates";
            select.appendChild(option);
        }
    }
    $('#firstSelection').val(40);
    $('#secondSelection').val(25);
    $('#thirdSelection').val(15);
    $('#fourthSelection').val(10);
    $('#fifthSelection').val(5);
    $('#sixthSelection').val(2);
}

function fixDatefields() {
    var input = document.getElementById("startDate");
    var input2 = document.getElementById("endDate");
    if (input.type != 'date') {
        $('input[type="date"]').datepicker({ dateFormat: 'dd-mm-yy' });
        $('input2[type="date"]').datepicker({ dateFormat: 'dd-mm-yy' });
    }
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        $(".outDiv").css("padding-bottom", "8em");
    }

}
