
function SearchVisibility(index, NameResponse) {
    if (NameResponse != "" && NameResponse != null) {
        document.getElementById("output").innerHTML += '<div class="SearchResultBox"><img class="SearchResultImage" id="SearchDataImg' + index + '" src="" alt=""><div class="SearchResultText"><strong class="SearchResultName" id="SearchDataName' + index + '"></strong><div class="SearchResultBarcode" id="SearchDataBarcode' + index + '">123456789012</div><div class="SearchResultDescription" id="SearchDataDesc' + index + '">Ripe and sweet bananas.</div></div><div class="SearchResultAisleText" id="AisleText' + index + '"></div><div class="SearchResultAisle" id="SearchDataAisle' + index + '"></div></div>'
    }
}

function ResultClicked() {
    console.log("clicked")
}

$(document).ready(function () {
    $('#inputData').on('input', function () {
        $.ajax({
            type: 'POST',
            url: '/submit',
            
            data: $('#inputForm').serialize(),
            success: function (response) {

                document.getElementById("output").innerHTML = ""
                SearchVisibility(1, response.Search_Data_Name_1)
                SearchVisibility(2, response.Search_Data_Name_2)
                SearchVisibility(3, response.Search_Data_Name_3)
                SearchVisibility(4, response.Search_Data_Name_4)
                SearchVisibility(5, response.Search_Data_Name_5)

                $('#SearchDataName1').text(response.Search_Data_Name_1);
                $('#SearchDataName2').text(response.Search_Data_Name_2);
                $('#SearchDataName3').text(response.Search_Data_Name_3);
                $('#SearchDataName4').text(response.Search_Data_Name_4);
                $('#SearchDataName5').text(response.Search_Data_Name_5);

                $('#SearchDataDesc1').text(response.Search_Data_Desc_1);
                $('#SearchDataDesc2').text(response.Search_Data_Desc_2);
                $('#SearchDataDesc3').text(response.Search_Data_Desc_3);
                $('#SearchDataDesc4').text(response.Search_Data_Desc_4);
                $('#SearchDataDesc5').text(response.Search_Data_Desc_5);

                $('#SearchDataBarcode1').text(response.Search_Data_Barcode_1);
                $('#SearchDataBarcode2').text(response.Search_Data_Barcode_2);
                $('#SearchDataBarcode3').text(response.Search_Data_Barcode_3);
                $('#SearchDataBarcode4').text(response.Search_Data_Barcode_4);
                $('#SearchDataBarcode5').text(response.Search_Data_Barcode_5);

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

                try{
                    if (response.Search_Data_Img_1 == "") {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/images/" + response.Search_Data_Img_1)
                    }
                } catch {}

                try{
                    if (response.Search_Data_Img_1 == "") {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg1").setAttribute("src", "/static/images/" + response.Search_Data_Img_1)
                    }
                } catch {}

                try{
                    if (response.Search_Data_Img_2 == "") {
                        document.getElementById("SearchDataImg2").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg2").setAttribute("src", "/static/images/" + response.Search_Data_Img_2)
                    }
                } catch {}

                try{
                    if (response.Search_Data_Img_3 == "") {
                        document.getElementById("SearchDataImg3").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg3").setAttribute("src", "/static/images/" + response.Search_Data_Img_3)
                    }
                } catch {}

                try{
                    if (response.Search_Data_Img_4 == "") {
                        document.getElementById("SearchDataImg4").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg4").setAttribute("src", "/static/images/" + response.Search_Data_Img_4)
                    }
                } catch {}

                try{
                    if (response.Search_Data_Img_5 == "") {
                        document.getElementById("SearchDataImg5").setAttribute("src", "/static/images/MissingImage.jpg")
                    }
                    else {
                        document.getElementById("SearchDataImg5").setAttribute("src", "/static/images/" + response.Search_Data_Img_5)
                    }
                } catch {}
            }
        });
    });
});