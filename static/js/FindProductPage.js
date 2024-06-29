if(window.innerHeight < window.innerWidth){
    alert("To search for products please rotate your phone to portrait");
}

window.addEventListener("load", function () {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

function SearchVisibility(index, NameResponse) {
    if (NameResponse != "" && NameResponse != null) {
        document.getElementById("output").innerHTML += '<button onclick="ResultClicked(' + index + ')" class="SearchResultBox"><img class="SearchResultImage" id="SearchDataImg' + index + '" src="" alt=""><div class="SearchResultText"><strong class="SearchResultName" id="SearchDataName' + index + '"></strong><div class="SearchResultBarcode" id="SearchDataBarcode' + index + '">123456789012</div><div class="SearchResultDescription" id="SearchDataDesc' + index + '">Ripe and sweet bananas.</div></div><div class="SearchResultAisleText" id="AisleText' + index + '"></div><div class="SearchResultAisle" id="SearchDataAisle' + index + '"></div></button>'
    }
}

var Search_Data_Names = [0,0,0,0,0]

function ResultClicked(index) {
    blur();
    alert(Search_Data_Names[index - 1]);
}


$(function () {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $("html, body").css({"height": h });
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
            alert((Search_Data_Names[0])
        )
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.getElementById("inputData");
    inputField.addEventListener("input", onFocusFunction);
});

$(document).ready(function () {
    $('#inputData').on('input', function () {

        $.ajax({
            type: 'POST',
            url: '/Search',
            data: $('#inputForm').serialize(),
            success: function (response) {

                document.getElementById("output").innerHTML = ""
                SearchVisibility(1, response.Search_Data_Name_1)
                SearchVisibility(2, response.Search_Data_Name_2)
                SearchVisibility(3, response.Search_Data_Name_3)
                SearchVisibility(4, response.Search_Data_Name_4)
                SearchVisibility(5, response.Search_Data_Name_5)

                Search_Data_Names[0] = response.Search_Data_Name_1
                Search_Data_Names[1] = response.Search_Data_Name_2
                Search_Data_Names[2] = response.Search_Data_Name_3
                Search_Data_Names[3] = response.Search_Data_Name_4
                Search_Data_Names[4] = response.Search_Data_Name_5


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