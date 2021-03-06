// Clone arrays
Array.prototype.clone = function() {
    return this.slice(0);
};

// Get max value of array
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

// D3 stuff
var parseDate = d3.time.format("%d-%b-%y").parse;
var parseYearMonth = d3.time.format("%Y-%m").parse;
var parseDateYearFirst = d3.time.format("%Y-%m-%d").parse;
var parseYear = d3.time.format("%Y").parse;
var commaNumbers = d3.format("0,000");

var pymChild = new pym.Child();

// FUNCTIONS
// Used to capitalize first letter of string
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Used to capitalize first letter of all words
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        first_letter = txt.charAt(0).toUpperCase();

        // This captures words with an apostrophe as the second character
        // And capitalizes them correctly
        // Example: o'brien = O'Brien
        if (txt.charAt(1) === "'") {
            return first_letter + txt.charAt(1) + txt.charAt(2).toUpperCase() + txt.substr(3).toLowerCase();
        } else {
            return first_letter + txt.substr(1).toLowerCase();
        }
    });
}

// Add commas to numbers over 1000
function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

// This removes special characters and spaces
function removeSpecialCharacters(string) {
    return string.replace(/[^\w\s]/gi, '').replace(/ /g,'');
}

// Sort by key on objects
_.mixin({
    'sortKeysBy': function (obj, comparator) {
        var keys = _.sortBy(_.keys(obj), function (key) {
            return comparator ? comparator(obj[key], key) : key;
        });
    
        return _.object(keys, _.map(keys, function (key) {
            return obj[key];
        }));
    }
});

// Used to save console output
// Used to pull data out of a Google spreadsheet
// And into a JSON file
(function(console){
    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)