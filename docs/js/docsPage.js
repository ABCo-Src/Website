(function() {
    let stripContainers = [];
    let stripContainersInfo = [];
    let attachmentContainer;

    let currentStrips = [null, null, null, null, null, null];

    let scrollTimer = null;
    let movedByParent = false;

    let $document;
    let allHeadings;

    $(window).on('load', function() {
        $document = $(document);
        attachmentContainer = $(".attachmentsColumn");

        for (let i = 1; i < 7; i++) {
            stripContainers.push($(".stripsColumn" + i));
            stripContainersInfo.push([]);
        }

        allHeadings = $("h1:not(.noAnchor), h2:not(.noAnchor), h3:not(.noAnchor), h4:not(.noAnchor), h5:not(.noAnchor), h6:not(.noAnchor)");

        $(window).resize(function() {
            updateStrips();
            updateAttachments();
            scrollStrip();
        });

        $(window).scroll(function() {
            handleScroll();
            scrollStrip();
        });

        let onRecieveMessage = function(e) { recieveMessage(e.data); };
        if (window.addEventListener) {
            window.addEventListener('message', onRecieveMessage, false);
        } else if (window.attachEvent) {
            window.attachEvent('onmessage', onRecieveMessage);
        }

        $("[data-navigates='child']").click(function() {
            sendMessage("+" + $(this).attr("data-navigateTo"));
        });

        $("[data-navigates='alongside']").click(function() {
            sendMessage("-" + $(this).attr("data-navigateTo"));
        });

        $("[data-navigates='exact']").click(function() {
            sendMessage("=" + $(this).attr("data-navigateTo"));
        });

        calculateRequiredStripContainers();
        updateStrips();
        updateAttachments();
        scrollStrip();
        sendMessage("R");
    });

    let calculateRequiredStripContainers = function() {
        for (let i = 0; i < stripContainers.length; i++) {
            if ($("h" + (i + 1) + ":not(.noAnchor)").length)
                stripContainers[i].css("width", "25px");
            else
                stripContainers[i].css("width", "0");
        } 
    }

    let updateStrips = function() {

        for (let i = 0; i < 6; i++) {
            stripContainers[i].empty();
            stripContainersInfo[i] = [];
        }

        allHeadings.each(function(index, value) {
            eachHeading(value, (pos, value) => createStrip(pos, value));
        });

        let pos = $(document).height();
        for (let i = 0; i < 6; i++)
            if (currentStrips[i] != null)
                applyStrip(i, pos);
    }

    let updateAttachments = function() {
        attachmentContainer.empty();
        allHeadings.each(function(index, value) {
            eachHeading(value, (pos, value) => createAttachment(pos, value));
        });
    }

    let eachHeading = function(value, execute) {
        //let pos = getOffset(value).top;
        let pos = $(value).offset().top;
        execute(pos, value);
    }

    let createAttachment = function(itemTop, item) {
        let newAttachment = $('<a class="attachment" href="#' + item.id + '"><svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(4 15.715523719787525,14.810489654541007)"><path stroke-width="1px" fill="none" d="m20.369407,10.042175s-3.062667,6.868232 -5.086606,11.094528c-1.005381,2.099397 -5.134304,0.261813 -4.160447,-1.852351c2.633982,-5.718106 2.792786,-6.821243 5.310071,-11.926617c2.058755,-4.175432 7.995512,-1.53614 6.101991,2.716781c-2.893866,6.499729 -0.67369,1.59063 -5.310072,11.926617c-2.236711,4.986353 -10.543716,1.287836 -8.320895,-3.704701l4.939601,-11.094527"/></g></svg></a>');
        newAttachment.css("top", itemTop + "px");
        newAttachment.click(function() { sendMessage("#" + item.id); });

        attachmentContainer.append(newAttachment);
    }

    // STRIP GENERATION:
    // When we make the strips, we first put them into an array, because we don't know
    // the correct height yet. Then, when we reach the next one, we put that strip in.
    // When we "stop" a strip, we also stop any smaller strips.
    let createStrip = function(itemTop, item) {

        // Work out what level of heading it is.
        let index = item.nodeName.substring(1) - 1;

        // Stop the previous strip.
        for (let i = index; i < 6; i++)
            if (currentStrips[i] != null)
                applyStrip(i, itemTop);

        currentStrips[index] = {top: itemTop, text: item.textContent };
    }

    let applyStrip = function(index, itemTop) {

        let newStrip = $("<div class='strip'></div>");
        let stripText = $("<p>" + currentStrips[index].text + "</p>");
        newStrip.append(stripText);

        let newStripTop = currentStrips[index].top;
        let newStripHeight = itemTop - currentStrips[index].top - 10;

        newStrip.css("top", newStripTop);
        newStrip.css("height", newStripHeight);

        stripContainers[index].attr("data-contains-strips", "true");
        stripContainers[index].append(newStrip);
        currentStrips[index] = null;

        stripContainersInfo[index].push({ text: stripText, stripTop: newStripTop, stripBottom: newStripTop + newStripHeight, textHeight: stripText.height() });
    }

    let handleScroll = function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            scrollTimer = null;

            sendMessage("@" + $(document).scrollTop());
        }, 2000);
    }

    let scrollStrip = function() {
        let $documentScrollTop = $document.scrollTop();

        for (let i = 0; i < 6; i++)
            for (let j = 0; j < stripContainersInfo[i].length; j++) {

                let info = stripContainersInfo[i][j];

                if (info.stripTop < $documentScrollTop)
                    if (info.stripBottom - info.textHeight - 20 < $documentScrollTop)
                        info.text.css("visibility", "hidden");
                    else {
                        info.text.css("visibility", "visible");
                        info.text.css("bottom", ($documentScrollTop - info.stripTop + 10) + "px");
                    }
                else info.text.css("bottom", "10px");
            }
    }

    let recieveMessage = function(msg) {
        if (msg == "dark") toDarkTheme();
        else if (msg == "light") toLightTheme();
        else if (msg.startsWith("#") && msg != "#") {
            window.location.href = msg;
            scrollStrip();
            movedByParent = true;
        }
        else if (msg.startsWith("@") && !movedByParent) {
            $("body").scrollTop(parseInt(msg.substring(1, msg.length)));
            movedByParent = true;
        }
    }

    let toLightTheme = function() {
        $("body").addClass("lightContainer");
        $("body").removeClass("darkContainer");
    }
    
    let toDarkTheme = function() {
        $("body").addClass("darkContainer");
        $("body").removeClass("lightContainer");
    }

    let sendMessage = function(msg) {
        window.parent.postMessage(msg, '*');
    }

    let getOffset = function(el) {
        let _x = 0;
        let _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft;
            _y += el.offsetTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    
})();