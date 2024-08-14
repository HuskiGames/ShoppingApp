var LocationAnchor = [0, 0]
var global_index = -1
var Search_Data_Indexes = [0, 0, 0, 0, 0]

$.ajax({
    type: 'POST',
    url: '/GetShopData',
    success: function (response) {
        LocationAnchor = response.LocationAnchor.split(", ")
    }
})

if (window.innerHeight < window.innerWidth) {
    alert("To search for products please rotate your phone to portrait");
}

window.addEventListener("load", function () {
    setTimeout(function () {
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

document.getElementById("HelpWindow").addEventListener("click", TogglehelpWindow)
document.getElementById("ToggleHelpButton").addEventListener("click", TogglehelpWindow)
function TogglehelpWindow() {
    console.log(document.getElementById("HelpWindow").getAttribute("hidden"))
    if (document.getElementById("HelpWindow").getAttribute("hidden") == null) {
        document.getElementById("HelpWindow").setAttribute("hidden", "")
    }
    else {
        document.getElementById("HelpWindow").removeAttribute("hidden", "")
    }
}


function SearchVisibility(index, NameResponse) {
    if (NameResponse != "" && NameResponse != null) {
        var button = document.getElementById("output").innerHTML += '<button id="SearchResultBox' + index + '" class="SearchResultBox"><img class="SearchResultImage" id="SearchDataImg' + index + '" src="" alt=""><div class="SearchResultText"><strong class="SearchResultName" id="SearchDataName' + index + '"></strong><div class="SearchResultBarcode" id="SearchDataBarcode' + index + '">123456789012</div><div class="SearchResultDescription" id="SearchDataDesc' + index + '">Ripe and sweet bananas.</div></div><div class="SearchResultAisleText" id="AisleText' + index + '"></div><div class="SearchResultAisle" id="SearchDataAisle' + index + '"></div></button>'
        return true
    }
    return false
}

document.getElementById("ConfirmMapButton").addEventListener('click', UpdateProductLocation)
function UpdateProductLocation() {
    console.log("Confirm")
    var x = localStorage.getItem('NewConfirmMarkerLocation_x');
    var y = localStorage.getItem('NewConfirmMarkerLocation_y');
    if (global_index != -1) {
        UpdateProduct(global_index, x, y)
    }
    else {
        alert("Please Select A Location")
    }
}

function UpdateProduct(item, new_x, new_y) {
    console.log(Search_Data_Indexes)
    console.log(item)
    console.log(Search_Data_Indexes[item])
    $.ajax({
        type: 'POST',
        url: '/UpdateLocation',
        data: { index: Search_Data_Indexes[item], new_x: new_x, new_y: new_y },
        success: function (response) {
            ProductSearched(item)
            localStorage.setItem('Update Marker', 3)
            console.log("Set New Location")
            // alert(response.x + "  " + response.y)
        }
    })
}

function hideKeyboard(element) {
    element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
    element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
    setTimeout(function () {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
}

function ProductSearched(item) {
    if (document.getElementById("SearchResultBox" + 1) != null) {
        document.getElementById("SearchResultBox" + 1).setAttribute("class", "SearchResultBox")
    }
    if (document.getElementById("SearchResultBox" + 2) != null) {
        document.getElementById("SearchResultBox" + 2).setAttribute("class", "SearchResultBox")
    }
    if (document.getElementById("SearchResultBox" + 3) != null) {
        document.getElementById("SearchResultBox" + 3).setAttribute("class", "SearchResultBox")
    }
    if (document.getElementById("SearchResultBox" + 4) != null) {
        document.getElementById("SearchResultBox" + 4).setAttribute("class", "SearchResultBox")
    }
    if (document.getElementById("SearchResultBox" + 5) != null) {
        document.getElementById("SearchResultBox" + 5).setAttribute("class", "SearchResultBox")
    }

    document.getElementById("SearchResultBox" + (item + 1)).setAttribute("class", "SearchResultBox SelectedItem")
    // for (let i = 1; i < 6; i++) {
    //     console.log(i + "   " + (item + 1))
    //     if (i == (item + 1)) {
    //         if (document.getElementById("SearchResultBox" + i) != null) {
    //             console.log("clear")
    //             document.getElementById("SearchResultBox" + i).setAttribute("class", document.getElementById("SearchResultBox" + i).getAttribute("class") + " SelectedItem")
    //         }
    //     }
    // }

    hideKeyboard($('input'))

    $.ajax({
        type: 'POST',
        url: '/GetLocation',
        data: { index: Search_Data_Indexes[item] },
        success: function (response) {
            global_index = item
            if (response.x == "0" && response.y == "0") {
                UpdateProduct(item, LocationAnchor[0], LocationAnchor[1]);
            }
            else {
                localStorage.setItem('MarkerLocation_x', response.x);
                localStorage.setItem('MarkerLocation_y', response.y);
            }
        }
    })

    localStorage.setItem('Update Marker', 5)
}

var Search_Data_Names = [0, 0, 0, 0, 0]

function ResultClicked(evt) {
    ProductSearched(evt.currentTarget.myParam - 1)
}


$(function () {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $("html, body").css({ "height": h });
});

function onFocusFunction() {
    var element = document.getElementById('inputForm');
    var headerOffset = 80;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}


$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if (document.getElementById("SignInPage").getAttribute("SignInPageVisible") == "false") {
                ProductSearched(0)
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.getElementById("inputData");
    inputField.addEventListener("input", onFocusFunction);
});


function AddSpace(event) {
    document.getElementById("BottemSpace").style.height = "80vh"
}
function RemoveSpace(event) {
    document.getElementById("BottemSpace").style.height = "30vh"
}

document.getElementById("inputData").addEventListener("focus", AddSpace);
document.getElementById("inputData").addEventListener("blur", RemoveSpace);



$(document).ready(function () {
    $('#inputData').on('input', function () {

        $.ajax({
            type: 'POST',
            url: '/Search',
            data: $('#inputForm').serialize(),
            success: function (response) {

                document.getElementById("output").innerHTML = ""

                var item
                var count = 0


                if (SearchVisibility(1, response.Search_Data_Name_1)) {
                    count = 1
                }
                if (SearchVisibility(2, response.Search_Data_Name_2)) {
                    count = 2
                }
                if (SearchVisibility(3, response.Search_Data_Name_3)) {
                    count = 3
                }
                if (SearchVisibility(4, response.Search_Data_Name_4)) {
                    count = 4
                }
                if (SearchVisibility(5, response.Search_Data_Name_5)) {
                    count = 5
                }

                if (count >= 1) {
                    item = document.getElementById("SearchResultBox1")
                    item.addEventListener('click', ResultClicked)
                    item.myParam = '1';
                }
                if (count >= 2) {
                    item = document.getElementById("SearchResultBox2")
                    item.addEventListener('click', ResultClicked)
                    item.myParam = '2';
                }
                if (count >= 3) {
                    item = document.getElementById("SearchResultBox3")
                    item.addEventListener('click', ResultClicked)
                    item.myParam = '3';
                }
                if (count >= 4) {
                    item = document.getElementById("SearchResultBox4")
                    item.addEventListener('click', ResultClicked)
                    item.myParam = '4';
                }
                if (count >= 5) {
                    item = document.getElementById("SearchResultBox5")
                    item.addEventListener('click', ResultClicked)
                    item.myParam = '5';
                }

                Search_Data_Names[0] = response.Search_Data_Name_1
                Search_Data_Names[1] = response.Search_Data_Name_2
                Search_Data_Names[2] = response.Search_Data_Name_3
                Search_Data_Names[3] = response.Search_Data_Name_4
                Search_Data_Names[4] = response.Search_Data_Name_5

                Search_Data_Indexes[0] = response.Search_Data_Index_1
                Search_Data_Indexes[1] = response.Search_Data_Index_2
                Search_Data_Indexes[2] = response.Search_Data_Index_3
                Search_Data_Indexes[3] = response.Search_Data_Index_4
                Search_Data_Indexes[4] = response.Search_Data_Index_5


                $('#SearchDataName1').text(Search_Data_Names[0]);
                $('#SearchDataName2').text(Search_Data_Names[1]);
                $('#SearchDataName3').text(Search_Data_Names[2]);
                $('#SearchDataName4').text(Search_Data_Names[3]);
                $('#SearchDataName5').text(Search_Data_Names[4]);

                $('#SearchDataDesc1').text(response.Search_Data_Desc_1);
                $('#SearchDataDesc2').text(response.Search_Data_Desc_2);
                $('#SearchDataDesc3').text(response.Search_Data_Desc_3);
                $('#SearchDataDesc4').text(response.Search_Data_Desc_4);
                $('#SearchDataDesc5').text(response.Search_Data_Desc_5);

                try {
                    $('#SearchDataAisle1').text(response.Search_Data_Aisle_1);
                    if (response.Search_Data_Aisle_1 != "") {
                        document.getElementById("AisleText1").innerHTML = response.Search_Data_Aisle_Type_1;
                    }
                    else { document.getElementById("AisleText1").innerHTML = ""; }
                }
                catch { }

                try {
                    $('#SearchDataAisle2').text(response.Search_Data_Aisle_2);
                    if (response.Search_Data_Aisle_2 != "") {
                        document.getElementById("AisleText2").innerHTML = response.Search_Data_Aisle_Type_2;
                    }
                    else { document.getElementById("AisleText2").innerHTML = ""; }
                } catch { }

                try {
                    $('#SearchDataAisle3').text(response.Search_Data_Aisle_3);
                    if (response.Search_Data_Aisle_3 != "") {
                        document.getElementById("AisleText3").innerHTML = response.Search_Data_Aisle_Type_3;
                    }
                    else { document.getElementById("AisleText3").innerHTML = ""; }
                } catch { }

                try {
                    $('#SearchDataAisle4').text(response.Search_Data_Aisle_4);
                    if (response.Search_Data_Aisle_4 != "") {
                        document.getElementById("AisleText4").innerHTML = response.Search_Data_Aisle_Type_4;
                    }
                    else { document.getElementById("AisleText4").innerHTML = ""; }
                } catch { }

                try {
                    $('#SearchDataAisle5').text(response.Search_Data_Aisle_5);
                    if (response.Search_Data_Aisle_5 != "") {
                        document.getElementById("AisleText5").innerHTML = response.Search_Data_Aisle_Type_5;
                    }
                    else { document.getElementById("AisleText5").innerHTML = ""; }
                } catch { }

                try {
                    if (response.Search_Data_Img_1 == "") {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/Images/" + response.Search_Data_Img_1)
                    }
                } catch { }

                try {
                    if (response.Search_Data_Img_1 == "") {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/Images/" + response.Search_Data_Img_1)
                    }
                } catch { }

                try {
                    if (response.Search_Data_Img_2 == "") {
                        document.getElementById("SearchDataImg2").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg2").setAttribute("src", "/static/Images/" + response.Search_Data_Img_2)
                    }
                } catch { }

                try {
                    if (response.Search_Data_Img_3 == "") {
                        document.getElementById("SearchDataImg3").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg3").setAttribute("src", "/static/Images/" + response.Search_Data_Img_3)
                    }
                } catch { }

                try {
                    if (response.Search_Data_Img_4 == "") {
                        document.getElementById("SearchDataImg4").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg4").setAttribute("src", "/static/Images/" + response.Search_Data_Img_4)
                    }
                } catch { }

                try {
                    if (response.Search_Data_Img_5 == "") {
                        document.getElementById("SearchDataImg5").setAttribute("src", "/static/Images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg5").setAttribute("src", "/static/Images/" + response.Search_Data_Img_5)
                    }
                } catch { }
            }
        });
    });
});