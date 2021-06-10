var SlidersReady = function () { };
var Sliders = [];
(function() {
    
    
    $(document).ready(function () {
    
        $(".slider").each(function (index, value) {
            if ($(value).data("slider-id")) {
                let data = $(value).data("slider-id");
    
                Sliders[data] = {
                    isRight: false,
                    toggle: function () { ToggleSlider(Sliders[data], $(value)) },
                    moveTo: function (right) { SetSlider(Sliders[data], $(value), right) },
                    onMove: function (right) { }
                };
    
                $(value).click(function () {
                    ToggleSlider(Sliders[data], $(value));
                });
    
            }
       
        });
    
        SlidersReady();
    
    });
    
    function ToggleSlider(slider, documentSlider) {
    
        if (slider.isRight)
            SetSlider(slider, documentSlider, false);
        else
            SetSlider(slider, documentSlider, true);
    
    }
    
    function SetSlider(slider, documentSlider, right) {
        if (right) {
            // Move it to the right.
            documentSlider.find(".slider-drag").addClass("slider-right");
    
            // Show only the left text.
            documentSlider.find(".slider-text-left").css("display", "block");
            documentSlider.find(".slider-text-right").css("display", "none");
    
            // Make it blue.
            documentSlider.removeClass("slider-red");
            documentSlider.addClass("slider-blue");
        } else {
            // Move it to the left.
            documentSlider.find(".slider-drag").removeClass("slider-right");
    
            // Show only the right text.
            documentSlider.find(".slider-text-left").css("display", "none");
            documentSlider.find(".slider-text-right").css("display", "block");
    
            // Make it red.
            documentSlider.removeClass("slider-blue");
            documentSlider.addClass("slider-red");
        }
    
        slider.isRight = right;
        slider.onMove(right);
    }
})();
