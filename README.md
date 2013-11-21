progress
========

## demo how to download file and display progress (pure js)

### Info

Sometimes we want to display progress while downloading big resource 
See demo page how to accomplish this in pure javascript

### Usage

Progress class has only 1 method: **get**

```
var progress = new Progress();            
progress.get(url,onprogress,onerror,onload);    
// where: url is the resource url     
// the 3 other parameters are callback functions    
```

See demo page source for more details

### Demo

[See demo here](http://coderneosmith.github.io/progress)

### Tests

Tested at:

OSX:     
 * safari 6.1    
 * Firefox 25.0    
 * Chrome 31.0.1650.57    
 * Opera 12.16    


