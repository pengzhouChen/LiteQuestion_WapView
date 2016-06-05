/**
 * Created by chenpengzhou on 16/6/4.
 */


$(document).ready(function () {
    $("#inputGetCash").on("click",function () {
        if(!checkInput())
        {
            window.alert("请完成基本基本资料填写再继续。");
            return ;
        }

        e.preventDefault();
        var modalLocation = $(this).attr("data-reveal-id");
        $('#'+modalLocation).reveal($(this).data());
        $("#divAnswer").hide();
        $("#divAD").show();
        setTimeout(function () {
            $("#divAD").hide();
            $("#divAnswer").show();
        },5000)
    })
})

function checkInput() {
    
}