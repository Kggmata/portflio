// initialize chocolate js
function init_chocolat() {
    let chocapi = Chocolat(document.querySelectorAll('.chocolat-image'), {
        setTitle: function () {
            return 'Images'
        },
    }).api;
}

// add options to contentNavigation
function append_options_to_contentNavigation() {
    $(".contentNavigation").each(function () {
        let navigation = this;
        let innerUl = 0;
        let innerUlUl = 0;
        $(navigation).parent().parent().children(".contentContent").children("h2,h3,h4").each(
            function (index, value) {
                if (index !== 0 && value.tagName === "H2") {
                    $(navigation).append("<hr/>");
                } else if (index !== 0 && value.tagName === "H3" && innerUl) {
                    $(navigation).children('ul').last().append("<hr/>");
                } else if (index !== 0 && value.tagName === "H4" && innerUlUl) {
                    $(navigation).children('ul').children('ul').last().append("<hr/>");
                }
                if (value.tagName === "H2") {
                    innerUl = 0;
                    innerUlUl = 0;
                    $(navigation).append($('<li>').append($('<a>').attr("href", "#" + value.id).text(value.innerText)))
                } else if (value.tagName === "H3") {
                    if (!innerUl) {
                        $(navigation).append($('<ul>'))
                        innerUl = 1;
                    }
                    innerUlUl = 0;
                    $(navigation).children('ul').last().append($('<li>').append($('<a>').attr("href", "#" + value.id).text(value.innerText)))
                } else if (value.tagName === "H4") {
                    if (!innerUlUl) {
                        $(navigation).children('ul').last().append($('<ul>'))
                        innerUlUl = 1;
                    }
                    $(navigation).children('ul').children('ul').last().append($('<li>').append($('<a>').attr("href", "#" + value.id).text(value.innerText)))
                }
            }
        )
    })
}

// add smooth scroll effect on navigation
function smooth_scroll_navigation() {
    $('ul> li > a, figcaption>a').click(function (event) {
        event.preventDefault();
        const id = $(this).attr('href');
        $('html, body').animate({
            //display parent id
            scrollTop: $(id).offset().top
        }, 600);
    })
}

// add slide effect on navigation button for mobile version website
function topNavigationMobile_button() {
    $("#topNavigationMobileButton").click(function (event) {
        $("#topNavigationMobile").slideToggle();
    });
}

// add options to navigation
function add_contentCard_to_navigation() {
    $(".navigation").append("<ul>")
    let length = $(".contentCard").length;
    $(".navigation>ul").append(
        $('<li>').append(
            $('<a>').attr("href", "#pageTitle").append(
                "<p>Top</p>"
            )
        )
    ).append("<hr/>");
    $(".contentCard").each(function (key, value) {
        $(".navigation>ul").append(
            $('<li>').append(
                $('<a>').attr("href", "#" + value.id).append(
                    "<p>" + value.children[0].innerText + "</p>"
                )
            )
        )
        if (key < length - 1) {
            $(".navigation>ul").append("<hr/>");
        }
    })
}

// add sub navigation to navigation
function add_subNavigation() {
    $("#topNavigation>ul>li,#sideNavigation>ul>li").each(function (index, value) {
        let topNavigationOption = this;
        let length = $(value.children[0].attributes[0].value).children(".contentContent").children("h2,h3,h4").length//get the number of h2
        if (!length) {
            return
        }
        $(topNavigationOption).append(
            $("<div>").attr('class', 'subNavigation').append(
                $("<ul>")
            )
        )// add subNavigation
        let innerUl = 0;
        let innerUlUl = 0;
        let h2h3h4 = $(value.children[0].attributes[0].value).children(".contentContent").children("h2,h3,h4");
        h2h3h4.each(function (index, value) {
            if (value.tagName === "H2") {
                innerUl = 0;
                innerUlUl = 0;
            } else if (value.tagName === "H3") {
                innerUlUl = 0;
                if (!innerUl) {
                    $(topNavigationOption).children(".subNavigation").children("ul").append(
                        $("<ul>")
                    )
                }
            } else if (value.tagName === "H4") {
                if (!innerUlUl) {
                    $(topNavigationOption).children(".subNavigation").children("ul").children("ul").append(
                        $("<ul>")
                    )
                }
            }
            if (value.tagName === "H2") {
                if (index !== 0 && value.tagName === "H2") {
                    $(topNavigationOption).children(".subNavigation").children("ul").last().append("<hr/>");
                }
                $(topNavigationOption).children(".subNavigation").children("ul").append(
                    $("<li>").append(
                        $("<a>").attr("href", "#" + value.id).text(value.innerText)
                    )
                )
            } else if (value.tagName === "H3") {
                if (index !== 0 && value.tagName === "H3" && innerUl) {
                    $(topNavigationOption).children(".subNavigation").children("ul").children('ul').last().append("<hr/>");
                }
                innerUl = 1;
                $(topNavigationOption).children(".subNavigation").children("ul").children("ul").last().append(
                    $("<li>").append(
                        $("<a>").attr("href", "#" + value.id).text(value.innerText)
                    )
                )
            } else if (value.tagName === "H4") {
                if (index !== 0 && value.tagName === "H4" && innerUlUl) {
                    $(topNavigationOption).children(".subNavigation").children("ul").children('ul').children('ul').last().append("<hr/>");
                }
                innerUlUl = 1;
                $(topNavigationOption).children(".subNavigation").children("ul").children("ul").children("ul").last().append(
                    $("<li>").append(
                        $("<a>").attr("href", "#" + value.id).text(value.innerText)
                    )
                )
            }
        })
    })
}

// add figure number, chocolat-image class, figcaption reference etc
function iterate_images() {
    let figIndex = 0
    $(".contentContent").find("img").each(function (index, value) {
        let figText = $(value).parent().next().text();
        // uppercase first character
        let firstLetter = figText[0].toUpperCase();
        figText = figText.replace(figText[0], firstLetter);
        // get intent reference using regex
        let intentReference = figText.match(/\(.*?\)/);
        // get rest of text
        let restOfText = figText.replace(intentReference ? intentReference[0] : null, "");
        // construct new figure string
        figText = 'Figure ' + (figIndex += 1) + ', ' + restOfText;
        // overwrite the figcaption
        $(value).parent().next().text(figText);
        // add intentReference as a in figcaption
        if (intentReference) {
            $(value).parent().next().append(
                $('<a>').attr('href', "#references").text(intentReference[0])
            )
        }
        // add alt
        $(value).attr('alt', figText);
        // add chocolate-image to a
        $(value).parent().addClass('chocolat-image');
    })
    // initialize chocolat js
    init_chocolat();
}

// load content status from local cache
function restore_contentContent_status_from_local_cache() {
    let loadingStatus = localStorage.getItem("loadingStatus") ? localStorage.getItem("loadingStatus").split(',') : [];
    if (loadingStatus.length) {
        loadingStatus.forEach(function (value, index) {
            //hide
            $("#" + value).children(".contentContent").hide();
        })
    }
    return loadingStatus;
}

// click header to fold or unfold content
function click_contentHeader(contentContentStatus) {
    $(".contentHeaderTitle>a>h1").click(function () {
        $(this).parents().children(".contentContent").slideToggle(800);
        // save status to local cache
        let contentId = $(this).parent().parent().parent().parent().attr('id');
        let contentStatus = $($(this).parents().children(".contentContent")[0]).css('height');
        if (contentContentStatus.indexOf(contentId) !== -1) {
            // delete id from array
            contentContentStatus = contentContentStatus.filter(function (value) {
                return value !== contentId;
            })
        } else {
            // add id to array
            contentContentStatus.push(contentId);
        }
        localStorage.setItem("loadingStatus", contentContentStatus);
    });
}

// load content status from local cache
function restore_contentMenuStatus_from_local_cache() {
    // restore contentMenuStatus from local cache
    let contentMenuStatus = localStorage.getItem("contentMenuStatus") ? localStorage.getItem("contentMenuStatus").split(',') : [];
    if (contentMenuStatus.length) {
        contentMenuStatus.forEach(function (value, index) {
            //show
            let cacheId = $("#" + value);
            cacheId.children(".contentHeader").children(".contentNavigation").show();
        })
    }
    return contentMenuStatus;
}

// click contentNavigation button to show or hide content navigation
function click_contentNavigationButton(contentMenuStatus) {
    $(".contentMenuButton").click(function () {
        // click and slide toggle contentNavigation
        $(this).parents().children(".contentHeader").children(".contentNavigation").slideToggle();
        // save contentMenu status to local cache
        let contentId = $(this).parent().parent().parent().attr('id');
        if (contentMenuStatus.indexOf(contentId) !== -1) {
            // delete id from array
            contentMenuStatus = contentMenuStatus.filter(function (value) {
                return value !== contentId;
            })
        } else {
            // add id to array
            contentMenuStatus.push(contentId);
        }
        localStorage.setItem("contentMenuStatus", contentMenuStatus);
    });
}

// hover and slide show sub navigation
function hover_topNavigation() {
    $("#topNavigation>ul>li").hover(function () {
        $(this).children(".subNavigation").stop().slideDown(300);
    })
    $("#topNavigation>ul>li").mouseleave(function () {
        $(this).children(".subNavigation").stop().slideUp(300);
    });
}

// save scroll position to local cache
function scroll_handler() {
    $(window).scroll(function (event) {
        // get the current scroll position
        let scrollPosition = $(window).scrollTop();
        // save scroll position to local cache
        localStorage.setItem("scrollPosition", scrollPosition);
    })
}

// load previous scroll position from local cache
function restore_scroll_position_from_local_cache() {
    localStorage.getItem("scrollPosition") ? $(window).scrollTop(localStorage.getItem("scrollPosition")) : null;// restore scroll position
}

$(document).ready(function () {
    // add options to contentNavigation
    append_options_to_contentNavigation();
    // add options to navigation
    add_contentCard_to_navigation();
    // add subNavigation to topNavigation
    add_subNavigation();
    // slide and show the topNavigationMobile when click on menu button
    topNavigationMobile_button();
    // if screen width large than 800px, hide topNavigationMobile
    $(window).resize(function () {
        if ($(window).width() > 800) {
            $("#topNavigationMobile").hide();
        }
    });
    // restore scroll position from local cache
    restore_scroll_position_from_local_cache();
    // listen to scroll event
    scroll_handler();
    // add figcaption
    iterate_images();
    // add smooth slide effect when click on navigation
    smooth_scroll_navigation();
    // restore status from local cache
    let contentContentStatus = restore_contentContent_status_from_local_cache();
    let contentMenuStatus = restore_contentMenuStatus_from_local_cache();
    // show A2subNavigation when hover with animation appear
    // hide A2subNavigation when mouse leave with animation
    hover_topNavigation();
    // show contentNavigation when click contentHeader
    click_contentNavigationButton(contentMenuStatus);
    // click contentHeader
    click_contentHeader(contentContentStatus);
});
