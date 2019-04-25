To be solved:

tablet view: forecastDiv: center
tablet & web view: shade from upper to lower part

solved:
space at the bottom: body min-height: 100 vh
function movedown: (async) animation first, lessContent second: set timeout
input: background color padding-left
JS file updated for all images/temperatures/times
"not found" errors explicitly made into alerts, and implemented throws so that nothing executes on errors.
	-Also made error/throw for if person types garbage by checking the array element 23. 
	If it's a valid city, then the value is a number (normally 0), otherwise it's a quotation mark (") because it throws an error.