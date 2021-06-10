var Sections = [];
var StartPath = "";

function Section(Title, PagePath, IconSrc, InnerSections)
{
    this.Title = Title;
    this.PagePath = PagePath; 
    this.IconSrc = IconSrc;
    this.InnerSections = InnerSections;
}

(function() {

    let cookiesEnabled = false;
    let iFrameReady = false;
    let isThemeDark = false;
    let isMobile = false;

    let anchorCache = "";

    // When the page loads.
    SlidersReady = function() {
        $("#noJSMenu").hide();

        $(window).resize(function() { updateIsMobile(); });

        cookiesEnabled = getCookie("acceptedCookies");
        if (cookiesEnabled == false)
            displayCookies(false);

        $(".topBarBtn").click(function() {
            let $this = $(this);
            toggleVisibility($($this.attr("data-to-open")), $this, $this.attr("data-is-open") == "true");
        });

        $("#cookiesEnable").click(function() {
            cookiesEnabled = true;
            setCookie("acceptedCookies", "t", 365);
            displayCookies(true);
        });

        $("#cookiesDisable").click(function() {
            cookiesEnabled = false;
            clearCookies();
            displayCookies(true);
        });

        // Title - Navigate back to start page
        $("#absDocsNavTitle").click(function() { 
            loadFromSource(StartPath); 
            $(".menuItemSelected").removeClass("menuItemSelected");
        });

        // Generate the menu items.
        let menuListRoot = $("#rootMenuList");
        for (let i = 0; i < Sections.length; i++)
            menuListRoot.append(generateMenuItem(Sections[i], [i]));

        // Handle recieving messages from the iFrame.
        let onRecieveMessage = function(e) { recieveMessage(e.data); };
        if (window.addEventListener) {
            window.addEventListener('message', onRecieveMessage, false);
        } else if (window.attachEvent) {
            window.attachEvent('onmessage', onRecieveMessage);
        }

        Sliders["theme"].onMove = function(right) {
            changeTheme(right);
        };
        if (getCookie("wasDark") == "yes")
            Sliders["theme"].moveTo(true);

        if (window.location.hash != "")
            handleAnchor(decodeURIComponent(window.location.hash));
        else loadPreviousDocument();

        savePreviousDocument();
        updateIsMobile();
    };

    let updateIsMobile = function() {
        if (window.innerWidth < 980) isMobile = true;
        else isMobile = false;

        if (isMobile) displayMenu(true);
        else displayMenu(false);
    }

    let displayMenu = function(hide) { toggleVisibility($("#menu"), $("#menuBtn"), hide); }
    let displayCookies = function(hide) { toggleVisibility($("#cookiesMenu"), $("#cookiesBtn"), hide); }

    // Toggles the visibility of menus and enabled buttons, used for menu and cookies menus.
    let toggleVisibility = function(item, btn, isOpen) {
        if (isOpen) {
            btn.attr("data-is-open", "false");
            btn.removeClass("topBarBtnSelected");
            item.hide();
        } else {
            btn.attr("data-is-open", "true");
            btn.addClass("topBarBtnSelected");
            item.show();
        }   
    }

    // ===============
    // MENU
    // ===============
    // Generates all the menu items.
    let generateMenuItem = function(section, indexPath) {
        let item = $('<div class="menuItem" id="item' + indexPath[indexPath.length - 1] + '"></div>');
        let itemInfo = $('<div class="menuItemInfo"></div>').appendTo(item);
        
        // Arrow
        if (section.InnerSections.length > 0)
            $('<img class="arrow" id="arrow" src="https://abworld.ml/img/graphics/smallRightArrow.svg">').click(function () { expandOrNestSection($(this).parent().parent()); }).appendTo(itemInfo);

        // Image
        if (section.IconSrc != "")
            $('<img class="icon" src="' + section.IconSrc + '"></img>').appendTo(itemInfo);

        // Title
        $('<h4>' + section.Title + '</h4>').appendTo(itemInfo);

        // Inner Items
        if (section.InnerSections.length > 0) {
            let menuList = $('<div class="menuList menuList-inner" id="inner"></div>').appendTo(item);

            for (let i = 0; i < section.InnerSections.length; i++)
                menuList.append(generateMenuItem(section.InnerSections[i], indexPath.concat(i)));
        }

        item.click(function() { 
            loadSection(indexPath, $(this));
            if (isMobile)
                displayMenu(true);
        });
        return item;
    }

    // Expands and collapses an item in the menu.
    let expandOrNestSection = function(ele) {
        event.stopPropagation();

        let inner = ele.children("#inner");
        let arrow = ele.children(".menuItemInfo").children("#arrow");

        if (inner.is(":visible")) {
            inner.hide();
            arrow.removeClass("selectedArrow");
        } else {
            inner.show();
            arrow.addClass("selectedArrow");
        }
    }

    // ===============
    // MAIN FUNCTIONALITY
    // ===============
    // Loads a certain section.
    let loadSection = function(indexPath, ele) {
        // Expand it if it isn't already expanded.
        if (ele.find("#inner").is(":visible"))
            event.stopPropagation();
        else expandOrNestSection(ele);

        let section = findSectionFromIndexPath($.extend([], indexPath), Sections, true);

        if (ele.hasClass("menuItemSelected")) {
            ele.removeClass("menuItemSelected");

            loadFromSource(StartPath);

        } else {
            $(".menuItemSelected").removeClass("menuItemSelected");
            ele.addClass("menuItemSelected");

            loadFromSource(section.PagePath);
        }
    }

    // Loads a certain page in the main iFrame.
    let loadFromSource = function(src) {
        iFrameReady = false;
        $("#mainContent").attr("src", src);
        onIFrameChanged();
    }

    // Runs when the contents of the main iFrame has changed.
    let onIFrameChanged = function() {
        anchorCache = null;

        if (isThemeDark)
            sendMessage("dark");
        else
            sendMessage("light");

        savePreviousDocument();
        loadCurrentPageLocation();
    }

    // ===============
    // ANCHORING
    // ===============

    // Expands all of the parents of the given section, used for anchors.
    let expandAllParentSections = function(ele) {

        if (ele.length == 0)
            return;

        ele.find("#arrow").addClass("selectedArrow");
        ele.find("#inner").show();

        if (ele.parent().attr("id") != "rootMenuList")
            expandAllParentSections(ele.parent().parent());

    }

    // Navigates to where the given anchor is.
    let handleAnchor = function(theAnchor) {

        let anchor = parseAnchor(theAnchor);

        if (anchor == null)
            return;
    
        // If it links to the start page, pass down the ID to that.
        if (anchor.isInStartPage) {
            sendMessage("#" + anchor.id);
            return;
        }
    
        // Show the correct "selected" section.
        let $anchorPath = $(anchor.path);
        $(".menuItemSelected").removeClass("menuItemSelected");
        if (anchor.path != "#rootMenuList")
            $anchorPath.addClass("menuItemSelected");
    
        expandAllParentSections($anchorPath);
        loadFromSource(anchor.section.PagePath);
    
        // Send down the anchor to the iframe so that it can actually anchor to the correct title, but, only do this, if there was actually a dot.
        if (anchor.id != "")
            sendMessage("#" + anchor.id);
    }

    // Reads through the given anchor and works out the different parts of it.
    let parseAnchor = function(anchor) {

        // (This would be a lot easier if ABParser existed for JS... but it doesn't so... we're doing parsing the anchor with a for loop!)
        let currentSection = null;
        let currentSectionPath = "#rootMenuList";
        let currentSectionText = "";
        let onStartPage = false;
        let wasDot = false;

        let processCurrentSectionText = function() {
            let search = getSectionTree(currentSection == null ? Sections : currentSection.InnerSections, "Title", currentSectionText);
            if (!search.valid) return false;
            currentSectionPath += (currentSection == null ? "" : "> #inner") + " > #item" + search.endIndex;
            currentSection = search.result[0];
            return true;
        }
    
        for (let i = 0; i < anchor.length; i++) {
            switch (anchor[i]) {

                case '#':
                    continue;
                
                // Find the section within the currentSection.
                case '>':
                    if (!processCurrentSectionText())
                        return null;

                    currentSectionText = "";
                    break;
    
                case '.':
    
                    wasDot = true;
    
                    // If there was nothing before this, mark us as being on the start page.
                    if (currentSectionText == "")
                        onStartPage = true;

                    else if (!processCurrentSectionText())
                        return null;
    
                    currentSectionText = "";
                    break;
    
                default:
                    currentSectionText += anchor[i];
            }
        }

        return { path: currentSectionPath, section: currentSection, id: (wasDot) ? currentSectionText : "", isInStartPage: onStartPage }
    }
    
    // Generates an anchor based on the current section, and the given id.
    let generateAnchor = function(id) {

        if (anchorCache) return anchorCache + id;
        else {
            let res = "#";
            let tree = [];
            let src = $("#mainContent").attr("src");
            if (src != StartPath) {
                let treeResult = getSectionTree(Sections, "PagePath", src);
                if (!treeResult.valid) return res;
                tree = treeResult.result;
            }
        
            // Translate that tree into a string.
            for (let i = 0; i < tree.length; i++)
                if (i == 0)
                    res += tree[i].Title;
                else
                    res += ">" + tree[i].Title;
        
            // Finally, put on the "." part.
            res += ".";
            anchorCache = res;
            res += id;
                
            return res;
        }
    }

    // ===============
    // COOKIE MEMORY
    // ===============

    // Saves which document we're on as a cookie.
    let savePreviousDocument = function() {
        if (!cookiesEnabled)
            return;

        setCookie("previousDocument", generateAnchor(""), 365);
    }

    // Opens up a document from the saved location.
    let loadPreviousDocument = function() {
        let prev = getCookie("previousDocument");
        if (prev == "")
            return;

        handleAnchor(prev);
    }

    // Go to the saved location on the page.
    let loadCurrentPageLocation = function() {
        let cookie = getCookie(generateAnchor(""));
        if (cookie == "")
            return;
    
        sendMessage("@" + cookie);
    }

    // Save where we are on the page.
    let saveCurrentPageLocation = function(currentPageLocation) {
    
        // Don't save anything if we don't have Page Memory enabled.
        if (!cookiesEnabled)
            return;
    
        // Otherwise, save the page location to a cookie under the anchor to this page.
        setCookie(generateAnchor(""), currentPageLocation, 365);
    }

    // ===============
    // IFRAME COMMUNICATION
    // ===============
    // NOTE: We send messages to and from the iframe to get the page to do what we want.
    // If the page hasn't loaded yet, then all messages are built up into a queue, and then released from that queue when the iframe is ready to recieve.
    let queuedMessages = [];

    // Recieves a message from the iframe.
    let recieveMessage = function(msg) {

        if (msg == "R") {
            iFrameReady = true;
            handleQueuedMessages();
        }
    
        // An anchor on the page.
        else if (msg.startsWith("#"))
            document.location.href = generateAnchor(msg.substring(1, msg.length));

        // When the page location has changed.
        else if (msg.startsWith("@"))
            saveCurrentPageLocation(msg.substring(1, msg.length));
    
        // Navigate to a child.
        else if (msg.startsWith("+"))
            navigateToChild(msg.substring(1, msg.length));

        // Navigate to an item alongside the current one.
        else if (msg.startsWith("-"))
            navigateAlongside(msg.substring(1, msg.length));

        // Navigate to an exact anchor at the exact page.
        else if (msg.startsWith("="))
            handleAnchor(msg.substring(1, msg.length));
    }

    let navigateToChild = function(child) {

        // If we're in a section.
        if ($("#rootMenuList *").hasClass("menuItemSelected")) {
            let anchor = generateAnchor("");
            handleAnchor(anchor.substring(0, anchor.length - 1) + ">" + child + ".");
        }

        else handleAnchor(child + ".");
    }

    let navigateAlongside = function(child) {
        let anchor = generateAnchor("");

        // If we're in an inner section.
        if (anchor.indexOf(">") >= 0) {
            // Trim off the last ">section."
            let trimmedAnchor = anchor.substring(0, anchor.lastIndexOf(">"));
            handleAnchor(trimmedAnchor + ">" + child + ".");    
        } 
        
        // If we're in a root section.
        else handleAnchor(child + ".");
    }
    
    let sendMessage = function(msg) {
        if (iFrameReady)
            sendActualMessage(msg);
        else
            queuedMessages.push(msg);
    }

    let sendActualMessage = function(msg) {
        document.getElementById("mainContent").contentWindow.postMessage(msg, '*');
    }

    let handleQueuedMessages = function() {
        for (let i = 0; i < queuedMessages.length; i++)
            sendActualMessage(queuedMessages[i]);
    
        queuedMessages = [];
    }

    // ===============
    // THEME
    // ===============

    let changeTheme = function(theme) {
        isThemeDark = theme;
        if (isThemeDark) {
            $("body").removeClass("lightTheme");
            $("body").addClass("darkTheme");
            $(".arrow").attr("src", "https://abworld.ml/img/graphics/smallRightArrowLight.svg");
            if (cookiesEnabled) setCookie("wasDark", "yes", 365);
            sendMessage("dark");
        } else {
            $("body").removeClass("darkTheme");
            $("body").addClass("lightTheme");
            $(".arrow").attr("src", "https://abworld.ml/img/graphics/smallRightArrow.svg");
            if (cookiesEnabled) setCookie("wasDark", "no", 365);
            sendMessage("light");
        }
    }

    // ===============
    // HELPERS
    // ===============

    // Gets a tree of all of the parents up to a given item, matching the given property with the given value.
    let getSectionTree = function(within, propertyName, propertyValue) {

        for (let i = 0; i < within.length; i++)
            if (within[i][propertyName] == propertyValue)
                return { valid: true, result: [within[i]], endIndex: i };
    
        for (let i = 0; i < within.length; i++) {
            let search = getSectionTree(within[i].InnerSections, propertyName, propertyValue);
            if (search.valid) {
                search.result.unshift(within[i]);
                return { valid: true, result: search.result, endIndex: i };
            }
        }
    
        return { valid: false };
    }
    
    let findSectionFromIndexPath = function(indexPath, inside, top) {

        if (!top) indexPath.shift();

        if (indexPath.length == 1)
            return inside[indexPath[0]];

        if (indexPath.length > 1)
            return findSectionFromIndexPath(indexPath, inside[indexPath[0]].InnerSections, false);
    }
    
    let setCookie = function(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        document.cookie = cname + "=" + cvalue + ";" + ("expires=" + d.toUTCString()) + ";SameSite=Strict;path=/";
    }

    let getCookie = function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    let clearCookies = function() {
        let cookies = decodeURIComponent(document.cookie).split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:00 GMT;path=/";
        }
    }
})();