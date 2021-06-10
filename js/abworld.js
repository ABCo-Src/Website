!function() {
    let body;
    let projectsSection;
    let documentationSection;
    let opening;

    let wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    let scrollTo = function(ele) {
        body.animate({
            scrollTop: ele.offset().top
        }, 600);
    };

    let hideAllSliders = function() { projectsSection.find(".sliderList").hide(); documentationSection.find(".sliderList").hide(); }

    let showOnlySlider = async function(within, slider) {
        let toHide = within.find(".sliderList:not(" + slider + ")");
        toHide.addClass("fadeOut");
        await wait(150);
        toHide.hide();
        toHide.removeClass("fadeOut");

        let theSlider = $(slider);
        theSlider.addClass("fadeIn");
        theSlider.show();
        await wait(150);
        theSlider.removeClass("fadeIn");
    }

    $(document).ready(function() {
        $(".warningBox").hide();
        $(".infoBox").css("visibility", "visible");
        opening = $(".opening, .openingContents");
        body = $("body");
        projectsSection = $(".projects");
        documentationSection = $(".documentation");

        // Click to scroll
        $("[data-scrollOnClick='true']").click(function() {
            scrollTo($($(this).attr("data-scrollTo")));
        });

        // Slider tabs
        // Projects
        $(".projects .sliderTab").click(function() {
            showOnlySlider(projectsSection, $(this).attr("data-opens"));

            projectsSection.find(".sliderTab").removeClass("sliderTabSelected");
            $(this).addClass("sliderTabSelected");
        });

        // Documentation
        $(".documentation .sliderTab").click(function() {
            showOnlySlider(documentationSection, $(this).attr("data-docsOpens"));

            documentationSection.find(".sliderTab").removeClass("sliderTabSelected");
            $(this).addClass("sliderTabSelected");
        });

        // Sliders
        $(".sliderFront").click(async function() {
            let slider = $(this);
            let sliderBack = slider.parent().find(".sliderBack");
            if (slider.attr("data-is-open") == "true") {
                sliderBack.css("transform", "translateX(calc(-100%))");

                slider.removeClass("sliderFrontOpen");
                slider.addClass("sliderFrontMoving");
                slider.addClass("sliderFrontClosed");

                await wait(500);
                slider.removeClass("sliderFrontMoving");
                slider.attr("data-is-open", "false");
            } else {
                sliderBack.css("transform", "translateX(0%)");

                slider.removeClass("sliderFrontClosed");
                slider.addClass("sliderFrontMoving");
                slider.addClass("sliderFrontOpen");

                await wait(500);
                slider.removeClass("sliderFrontMoving");

                slider.attr("data-is-open", "true");
            }
        });

        // More Info Buttons
        $(".allLearnGuides").click(function() {
            showOnlySlider(documentationSection, "#learnSliders");
            documentationSection.find(".sliderTab").removeClass("sliderTabSelected");
            documentationSection.find(".sliderTab[data-docsOpens='#learnSliders'").addClass("sliderTabSelected");
        });
        $(".allDocsGuides").click(function() { 
            showOnlySlider(documentationSection, "#docsSliders");
            documentationSection.find(".sliderTab").removeClass("sliderTabSelected");
            documentationSection.find(".sliderTab[data-docsOpens='#docsSliders'").addClass("sliderTabSelected");
        });

        // Real Parallax
        $("[data-parallaxBg='true']").each(function() {
            let toChange = $(this);
            let parallaxSpeed = parseInt(toChange.attr("data-parallax-speed"));
            $(window).scroll(function() {
                let yPos = -($(this).scrollTop() / parallaxSpeed);
                toChange.css("background-position", "0% " + yPos + "px");
            });
        });

        hideAllSliders();
        projectsSection.find(projectsSection.attr("data-default-slider")).show();
        documentationSection.find(documentationSection.attr("data-default-slider")).show();
    });
}();