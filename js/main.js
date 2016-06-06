var count = 0;

$(document).ready(function(){
    $("#inputNext,#inputNext2").click(function() {
            /*testCode*/
            count = Math.floor(Math.random()*10 + 1);
            /*testCode end*/

            if(!checkChose())
            {
                window.alert("请选择一个答案再继续。");
                return ;
            }
            $("#inputNext").hide();
            $("#inputGetAnswer").hide();

            allChoseVisibility();
            switch(count)
            {
                case 0:
                    $("#divAnswer1").hide();
                case 1:
                    $("#divAnswer2").hide();
                case 2:
                    $("#divAnswer3").hide();
                case 3:
                    $("#divAnswer4").hide();
                case 4:
                    $("#divAnswer5").hide();
                case 5:
                    $("#divAnswer6").hide();
                default:
                    break;
            }

            /*testCode*/
            document.getElementById("spanQuestion").innerHTML = "spanQuestion";
            document.getElementById("spanAnswer1").innerHTML = "spanAnswer1";
            document.getElementById("spanAnswer2").innerHTML = "spanAnswer2";
            document.getElementById("spanAnswer3").innerHTML = "spanAnswer3";
            document.getElementById("spanAnswer4").innerHTML = "spanAnswer4";
            document.getElementById("spanAnswer5").innerHTML = "spanAnswer5";
            document.getElementById("spanAnswer6").innerHTML = "spanAnswer6";
            /*testCode end*/

            setTimeout(function(){$("#inputNext").show();
                $("#inputGetAnswer").show();},3000);

            var modal = $(this);
            modal.trigger('reveal:close');

            $("#divScore").fadeIn("show");
            setTimeout(function () {
                $("#divScore").fadeOut("show");
            },1000)
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

function getQuestion(){
    $.get("http://localhost:10010/aos/system/listCatalogs.jhtml", function (data,status) {
        alert("数据:" + data + "\n状态:" + status);
        var obj = JSON.parse(data);
        $("#spanQuestion").text(obj)
    })
}