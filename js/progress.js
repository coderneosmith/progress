
/*=== below some hints for jslint ===*/
/*jslint nomen: true*/
/*global Uint8Array*/
/*global XMLHttpRequest*/
/*global window*/
/*===================================*/

function Progress() {
    "use strict";

    this.size = null;
    this.t0 = null;
}

Progress.prototype = (function() {

    "use strict";

    function _get( url, opt ) {

        var self = this,
            onstart = opt.onstart || function(){},
            onprogress = opt.onprogress || function(){},
            onerror = opt.onerror || function(){},
            onload = opt.onload || function(){},
            binary = opt.binary || false,
            request = new XMLHttpRequest();

        
        request.addEventListener("load", function() {
            if (!self.size) {
                self.size = Number(request.getResponseHeader("Content-Length"));
            }
            
            // hack for opera opera sometimes does not fire progress with 100% - so we fire it here to make sure that last progress event will report 100%
            //if (window.navigator.userAgent.indexOf("Opera") !== -1) {
                onprogress({
                    lengthComputable: true,
                    loaded: self.size,
                    total: self.size,
                    t0: self.t0,
                    t1: new Date().getTime(),
                    t2:0,
                    percent: 100
                });
            //}
            // end of a hack
            if(binary){
                onload(new Uint8Array(request.response));
            }else{
                onload(request.responseText);
            }
        }, false);
        request.addEventListener("progress", function(e){
            e.t0 = self.t0;
            e.t1 = new Date().getTime();
            e.percent = (e.loaded / e.total * 100);
            e.t2 =  e.t0 - e.t1 + ( e.total*(e.t1 - e.t0)) /e.loaded;
            console.log(e);
            onprogress(e); 
        }, false);
        request.addEventListener("error", onerror, false);
        request.open("GET", url);
        if(binary){
            request.responseType = "arraybuffer";
        }else{
            request.overrideMimeType('text/plain; charset=x-user-defined');
        }
        
        request.send();
        self.t0 = new Date().getTime();
        onstart();
    }

    // public api 
    return {
        get: _get
    };

}());