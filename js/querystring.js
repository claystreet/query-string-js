// Copyright (c) 2013 Clay Street Online LLC
// http://www.claystreet.com
//
// MIT License
// http://opensource.org/licenses/MIT
//
//---------------------------------------------------------------------------------
// Provides functions for retrieving query string parameters from nodes and
// URL strings.
//
// pageVars = queryVarsFromNode(document);  // get this page's query vars
//
//=================================================================================

// mozilla.org polyfill
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        'use strict';
        var i, len;
        for (i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}

// Returns a map of name/value pairs from the specified query string
//    Returns an empty object if no query string vars are found
//    Vars with no query string value have their value set to an empty string
function getQueryVars(queryStr) {
    var queryMap = {};

    if (queryStr) {
        queryStr.replace(/\+/g, ' ').split('&').forEach(function(str) {
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
