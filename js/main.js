var count = 0;

var url = "http://localhost:8081/";

$(document).ready(function(){
    $("#inputNext,#inputNext2").click(function() {
            if(!checkChose())
            {
                window.alert("请选择一个答案再继续。");
                return ;
            }

            postAnswer();
            getQuestion();

        });

    $('.form-wrapper, html').addClass('dark');
    
    $('input[value="dark"]').attr('checked', 'checked');

   /* $('#options input').click(function(){
        $('.form-wrapper, html')
            .removeClass('dark light none')
            .addClass($(this).val());
    });*/

    /* Label click for iPad iOS  */
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {

        $('label[for]').click(function() {
            var el = $(this).attr('for');
            if ($('#' + el + '[type=radio], #' + el + '[type=checkbox]').attr('selected', !$('#' + el).attr('selected'))) {
                return;
            } else {
                $('#' + el)[0].focus();
            }
        });

    }

    $("#inputGetAnswer").on("click",function (e) {
        if(!checkChose())
        {
            window.alert("请选择一个答案再继续。");
            return ;
        }

        getAd();
        getAnswer();
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

    $.fn.reveal = function(options) {
        var defaults = {
            animation: 'fadeAndPop', //fade, fadeAndPop, none
            animationspeed: 300, //how fast animtions are
            closeonbackgroundclick: true, //if you click background will modal close?
            dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
        };
        var options = $.extend({}, defaults, options);

        return this.each(function() {
            var modal = $(this),
                topMeasure  = parseInt(modal.css('top')),
                topOffset = modal.height() + topMeasure,
                locked = false,
                modalBG = $('.reveal-modal-bg');
            if(modalBG.length == 0) {
                modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
            }
            modal.bind('reveal:open', function () {
                modalBG.unbind('click.modalEvent');
                $('.' + options.dismissmodalclass).unbind('click.modalEvent');
                if(!locked) {
                    lockModal();
                    if(options.animation == "fadeAndPop") {
                        modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
                        modalBG.fadeIn(options.animationspeed/2);
                        modal.delay(options.animationspeed/2).animate({
                            "top": $(document).scrollTop()+topMeasure + 'px',
                            "opacity" : 1
                        }, options.animationspeed,unlockModal());
                    }
                    if(options.animation == "fade") {
                        modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
                        modalBG.fadeIn(options.animationspeed/2);
                        modal.delay(options.animationspeed/2).animate({
                            "opacity" : 1
                        }, options.animationspeed,unlockModal());
                    }
                    if(options.animation == "none") {
                        modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
                        debugger;
                        modalBG.css({"display":"block"});
                        unlockModal()
                    }
                }
                modal.unbind('reveal:open');
            });

            //Closing Animation
            modal.bind('reveal:close', function () {
                if(!locked) {
                    lockModal();
                    if(options.animation == "fadeAndPop") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "top":  $(document).scrollTop()-topOffset + 'px',
                            "opacity" : 0
                        }, options.animationspeed/2, function() {
                            modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
                            unlockModal();
                        });
                    }
                    if(options.animation == "fade") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "opacity" : 0
                        }, options.animationspeed, function() {
                            modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
                            unlockModal();
                        });
                    }
                    if(options.animation == "none") {
                        modal.css({'visibility' : 'hidden', 'top' : topMeasure});
                        modalBG.css({'display' : 'none'});
                    }
                }
                modal.unbind('reveal:close');
            });
            modal.trigger('reveal:open')
            var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
                modal.trigger('reveal:close')
            });

            if(options.closeonbackgroundclick) {
                modalBG.css({"cursor":"pointer"})
                modalBG.bind('click.modalEvent', function () {
                    modal.trigger('reveal:close')
                });
            }
            $('body').keyup(function(e) {
                if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
            });
            function unlockModal() {
                locked = false;
            }
            function lockModal() {
                locked = true;
            }

        });//each call
    }//orbit plugin call

    $('.skillbar').each(function(){
        $(this).find('.skillbar-bar').animate({
            width:$(this).attr('data-percent')
        },6000);
    });

    getQuestion();

    hideAnswer();
});

function allChoseVisibility() {
    $("div").not(".reveal-modal-bg").show();
    $(":radio").attr("checked",false);
}

function checkChose(){
    if($("input[name='foo']:checked").val() != null)
        return true;
    else
        return false;
}

function hideAnswer(){
    switch(count)
    {
        case 0:
            $("#divAnswer1,#div_skill_bar_0").hide();
        case 1:
            $("#divAnswer2,#div_skill_bar_1").hide();
        case 2:
            $("#divAnswer3,#div_skill_bar_2").hide();
        case 3:
            $("#divAnswer4,#div_skill_bar_3").hide();
        case 4:
            $("#divAnswer5,#div_skill_bar_4").hide();
        case 5:
            $("#divAnswer6,#div_skill_bar_5").hide();
        default:
            break;
    }
}

function getQuestion(){
    var reqString = {"userId":"1001"};
    $.get(url + "getQuestion", reqString,
        function (data,status) {
            if (status != success){ return ; }

            var res = JSON.parse(data);
            $("#spanQuestion").text(res.question.question_title);
            $("#spanQuestion").attr("data-question-id",res.question.question_id);
            count = obj.question[0].answer.length;

            for(var i = 0 ; i < count ; i++) {
                $("#spanAnswer" + i).text(res.question.answer[i].result_content);
                $("#spanAnswer" + i).attr("data-answer-id",res.question.answer[i].result_id);
            }

            allChoseVisibility();
            hideAnswer();
            $("#inputNext").hide();
            $("#inputGetAnswer").hide();

            setTimeout(
                function(){
                    $("#inputNext").show();
                    $("#inputGetAnswer").show();
                }, 3000);

            var modal = $(this);
            modal.trigger('reveal:close');
        });

    /*//testCode
    data = '{"resultcode":"1","question":[{"question_title":"你喜欢这个应用吗?","question_id":"1001","answer":[{"result_id":"101","result_content":"当然,简直完美啊!哈哈哈"},{"result_id":"102","result_content":"什么鬼东西,简直浪费时间!"},{"result_id":"103","result_content":"先看看再说吧~"}]}]}';
    alert("数据:" + data + "\n状态:" + status);
    var obj = JSON.parse(data);
    $("#spanQuestion").text(obj.question[0].question_title);
    $("#spanQuestion").attr("data-question-id",obj.question[0].question_id);
    count = obj.question[0].answer.length;

    for(var i = 0 ; i < count ; i++)
    {
        $("#spanAnswer" + i).text(obj.question[0].answer[i].result_content);
        $("#spanAnswer" + i).attr("data-answer-id",obj.question[0].answer[i].result_id);
    }
    allChoseVisibility();
    hideAnswer();
    $("#inputNext").hide();
    $("#inputGetAnswer").hide();

    setTimeout(function(){$("#inputNext").show();
        $("#inputGetAnswer").show();},3000);


    var modal = $(this);
    modal.trigger('reveal:close');
    //end of testCode*/
}

function getAd(){
    $.get(url + "getAd",function (data,status) {
        var obj = JSON.parse(data);
        $("#img_AD").attr("src",obj.ad_pic);
        $("#h1_AD").text(obj.ad_context);
        $("#a_AD").attr("href",obj.ad_url);
    })
}

function getAnswer(){
    $.get(url + "getAnswer",function (data,status) {
        var obj = JSON.parse(data);
        count = obj.answer.length;
        for(var i = 0; i <count; i++) {
            $("#skill_bar_title_" + i).text(obj.answer[i].answerContent);
            $("#skill_bar_percent_" + i).text(obj.answer[i].answerPercent);
        }
    })
}

function postAnswer(){
    var userId = $.cookie("userId");
    var questionId = $("spanQuestion").attr("data-question-id");
    var answerId = $("input[name='foo']:checked").attr("data-answer-id");
    $.post(url + "/postAnswer",{
        userId : userId,
        questionId : questionId,
        answerId : answerId
    },function(data,status){
        //testCode
        var res = JSON.parse(data);
        $("#h1Score").text("积分: +" + res.userScore);
        $("#divScore").fadeIn("show");
        setTimeout(function () {
            $("#divScore").fadeOut("show");
        },1000);
        //end of testCode
    })
}