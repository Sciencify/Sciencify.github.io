var lastImgUrl = 0;

    $("#canvas 0").prop({width: window.innerWidth - 2, height: window.innerHeight * 0.875});


$("#newImg").click(function(){
    $("#"+lastImgUrl).after("<li id='"+(lastImgUrl+1)+"'></li>");
    lastImgUrl++;
    var width = window.innerWidth - 2;
    var height = window.innerHeight * 0.875;
    var html = "<input type='text' class='imgurl' placeholder='Image "+lastImgUrl+" name'><canvas style='display: block' width="+width+" height="+height+" id='canvas "+lastImgUrl+"'></canvas>";
    $("#"+(lastImgUrl)).html(html);
});