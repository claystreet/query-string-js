// Copyright (c) 2013 Clay Street Online LLC
// http://www.claystreet.com
//
// MIT License
// http://opensource.org/licenses/MIT
//
//---------------------------------------------------------------------------------
// A JQuery plug-in to retrieve query string parameters from nodes containing URLs
// (including the current page)
//
// Provides the ability to retrieve query string parameters from nodes containing
// 'src', 'href', 'action', or 'formAction' properties
//
// pageVars = $(document).queryVars();  // query vars for the current page
//
// myLinkVars = $('#myLink').queryVars(); // query vars for the '#myLink' node
//
//=================================================================================


// Begin namespace protection
(function($) {

    // Returns a map of name/value pairs from the specified query string
    //    Returns an empty object if no query string vars are found
    //    Vars with no query string value have their value set to an empty string
    function getQueryVars(queryStr) {
        var queryMap = {};

        if (queryStr) {
            $.each(queryStr.replace(/\+/g, ' ').split('&'), function(i, str) {
                var nvpair = str.split('=');

                queryMap[decodeURIComponent(nvpair[0])] = nvpair.length > 1 ? decodeURIComponent(nvpair[1]) : '';
            });
        }

        return queryMap;
    }

    // Extracts the full query string from a URL
    //    Returns an empty string if no query string is found
    function queryStrFromUrl(url) {
        var start = url.indexOf('?') + 1,
            end;

        if (start > 0) {
            end = url.indexOf('#');
            if (end > start) {
                return url.substring(start, end);
            }
            return url.substr(start);
        }
        return '';
    }

    // Return query vars associated with the specified DOM node
    //    Returns an empty object if a supported URL property was not found
    function queryVarsFromNode(node) {
        var url,
            propList = [
                'src',
                'href',
                'action',
                'formAction'
            ],
            i = 0,
            ilen = propList.length;

        if (node) {
            // If the document object...
            if (node.nodeType === 9) {
                return getQueryVars(window.location.search.substr(1));
            }

            // Loop over the property list
            for (; i < ilen;  i++) {
                url = node[propList[i]];
                if (url !== undefined) {
                    return getQueryVars(queryStrFromUrl(url));
                }
            }
        }

        return {};
    }

    //-----------------------
    // JQuery Utility Methods
    //-----------------------

    // Expose the utility methods
    $.queryVars = getQueryVars;
    $.queryStrFromUrl = queryStrFromUrl;

    //-----------------------
    // JQuery Object Method
    //-----------------------

    // Returns a map of name/value pairs from URL associated with the first node in the jquery object, if any
    //    Returns an empty object if no query string vars are found
    //    Vars with no query string value have their value set to an empty string
    //
    // Note: This method is NOT chainable
    //
    $.fn.queryVars = function() {
        return queryVarsFromNode(this[0]);
    };

}(jQuery));
