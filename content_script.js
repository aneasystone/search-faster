chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    
    var response = doReplace();
    sendResponse(response);
});

/**
 * replace the redirect url to direct url
 */
function doReplace() {
    
    // url not match
    if(location.host.indexOf('www.google.com') == -1) {
        return null;
    }
    
    // get the keyword
    var lstib = $('#lst-ib');
    if(lstib.length == 0) {
        return null;
    }
    
    // get the links & add a click event
    var links = $('.srg .g h3.r a');
    links.on('click', function(e) {
        var href = $(e.target).attr('data-href');
        window.open(href);
        return false;
    });
    
    return {
        keyword: lstib[0].value,
        replace_cnt: links.length
    };
}
