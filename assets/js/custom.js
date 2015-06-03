$(document).ready(function(){

    /*
    Temporary Solution as due to cross domain Issue while accessing JSON
    Set Header from server side to allow Cross domain access
     */
    var jsonURI = "https://json2jsonp.com/?url=http://m.lowes.com/IntegrationServices/resources/productList/json/v3_0/4294857975?langId=-1&storeId=10702&catalogId=10051&nValue=4294857975&storeNumber=0595&pageSize=20&firstRecord=0&refinements=5003703&&callback=cbfunc";
    var itemNumber = 0 ;
    var jsonData = null;
    var priceInfo = 0;
    /*
    AJAX request which fetches JSON Data and populate the data on HTML file using Jquery Syntax
     */
    $.ajax({
        url: jsonURI,
        type: "GET",
        dataType: 'jsonp',
        cache: false,
        success: function(response){
            $.each(response.ProductsList, function(i, item) {


                /*
                Collect the required information from JSON Data
                 */
            jsonData = response;
            var brandName = this.ProductInfo.Brand;
            var productDesc = this.ProductInfo.p_product_description;
            var price =       this.ProductInfo.p_product_price;
            itemNumber = this.ProductInfo.p_product_item_number;

            var productInfo= brandName+" "+productDesc;

            var imgSmall = this.imageURLs.sm;



                /*
                Generate the HTML code to populate the JSON Data
                 */
            var productDiv = "<div class='col-md-3 parentDiv'><div class='single-products' id="+itemNumber+"><div class='product-info text-center'><img  src="+imgSmall+" alt=''></div><div class='product-info text-center'><p>"+productInfo+"</p><h3>$ "+price+"</h3><a href='#'class='btn btn-default btn-block btnView'>View More</a></div></div></div>";
            $("#productList").append(productDiv);

        })
            /*
            Logic to populate the data on HERO
             */
            $('.single-products').mouseover(function() {
                var modelNo = this.id;
                console.log(modelNo);
                $.each(jsonData.ProductsList, function(i, item) {
                    if(this.ProductInfo.p_product_item_number == modelNo){

                        var imhLarge = this.imageURLs.lg;
                        priceInfo = this.ProductInfo.p_product_price;
                        var productIntro = this.ProductInfo.p_product_description;

                        var functionality = this.ProductInfo.p_product_bullets_json;

                        $( "#imgView" ).html("<div><img  src="+imhLarge+"></div>");
                        $( "#prodDesc" ).html("<p>"+productIntro+"</p><ul>");
                        $.each(functionality, function(index, obj){
                            for(var i=0;i < obj.length;i++){

                                $( "#prodDesc" ).append("<li>"+obj[i]+"</li>");
                            }
                        });
                        $( "#prodDesc" ).append("</ul>");


                        $( "#price" ).html("<p>$ "+priceInfo+"</p>");

                        $( "#hero-unit" ).focus();
                    }

                })
            });

            /*
            Alert Message on Click of Add to Cart
             */

            $( "#crtBtn" ).click(function() {
                alert( "Price is "+priceInfo);
            });
    }
});
});