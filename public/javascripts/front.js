$(document).ready(function(){
    var wh = $(window).height();
    $(window).on('resize',function(){    
        $(".d-block").height(wh-54);
    });
    $(".d-block").height(wh-54);
})