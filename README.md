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

### Notes

To create big binary file with random staff in it (10M) except first bytes which should be "foo.bar" \x66\x6f\x6f\x0a\x62\x61\x72 

```
// create file
head -c 10M </dev/urandom > test.bin

// Then override the first 7 bytes with 

printf '\x66\x6f\x6f\x0a\x62\x61\x72' | dd conv=notrunc of=test.bin bs=7 seek=$((0x00000000))
```

To create big text file with filled with "1" (10M) except first chars which should be "foo.bar"


```
// create file
tr -dc A-Za-z0-9 </dev/urandom |  head -c 10M > test.txt

// Then change first 7 chars to foo.bar 

!!!
cat test.txt | sed 's/^......./foo.bar/' > test.txt
```

So for the test first 7 elements in data:
* for binary should be 102,111,111,46,98,97,114
* for test should be foo.bar   



