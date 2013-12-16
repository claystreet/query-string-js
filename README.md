#Query String JS

**Provided by [Clay Street Online](http://www.claystreet.com) under an MIT License**

Visit [LoanDelta.com](http://www.loandelta.com/) and its "Save URL" feature for a live example usage.

LoanDelta.com is a static html page with no server-side code,
yet it allows users to save and restore the state of the loan calculator by parsing
query string parameters in the client-side JavaScript code.

### Purpose

Parses query string parameters in client-side JavaScript.

### Overview

Provides the ability to retrieve query string parameters from a page's document
or any nodes containing 'src', 'href', 'action', or 'formAction' properties.

Returns a JavaScript object containing the name/value pairs of all query string
parameters.

### The Code

Two JavaScript files are provided.  Both files are self-contained (they don't depend on each other).

1. **querystring.js** - 
   A pure/plain JavaScript implementation
   
2. **querystring_jq.js** - 
   A JQuery plugin implementation
   
### Example Usage

*querystring.js* (stand-alone JavaScript code)
```javascript
// get query vars for the current page
pageVars = queryVarsFromNode(document); 
if ('myVar' in pageVars) {
    // do something with pageVars['myVar']
}

// get query vars for the '#myLink' node
myLinkVars = queryVarsFromNode(document.getElementById('myLink')); 
if ('yourVar' in myLinkVars) {
    // do something with myLinkVars['yourVar']
}
```

*querystring_jq.js* (JQuery plugin code)
```javascript
pageVars = $(document).queryVars();  // query vars for the current page
if ('myVar' in pageVars) {
    // do something with pageVars['myVar']
}

myLinkVars = $('#myLink').queryVars(); // query vars for the '#myLink' node
if ('yourVar' in myLinkVars) {
    // do something with myLinkVars['yourVar']
}
```

### That's it

The "Save URL" feature of the following sites are example usages:
* [LoanDelta.com - Loan Calculator](http://www.loandelta.com/)
* [CompareTvSizes.com - TV Screen Size Comparison](http://www.comparetvsizes.com/)
