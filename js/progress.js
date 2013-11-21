
/*=== below some hints for jslint ===*/
/*jslint nomen: true*/
/*global Uint8Array*/
/*global XMLHttpRequest*/
/*===================================*/

function Progress() {
    "use strict";

    this.size = null;
}

Progress.prototype = (function() {

    "use strict";

    function _get(url, onprogress, onerror, onload) {
        var self = this,
            request = new XMLHttpRequest();

        request.addEventListener("load", function() {
            if (!self.size) {
                self.size = Number(request.getResponseHeader("Content-Length"));
            }
            var data = new Uint8Array(request.response);
            onload(data);
        }, false);
        request.addEventListener("progress", onprogress, false);
        request.addEventListener("error", onerror, false);
        request.open("GET", url);
        request.responseType = "arraybuffer";
        request.send();
    }

    // public api 
    return {
        get: _get
    };

}());