
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $newsHeaderElem = $('#news-header');
    var $newsElem = $('#news-articles');
    var $greeting = $('#greeting');
    var $weatherElem = $('.weather-report');
    var $imgElem = $('#img');

    // clear out old data before new request
    $wikiElem.text("");
    $newsElem.text("");
    $weatherElem.text("");

    // load streetview

    var str = $("#street").val();
    var cty = $("#city").val();

    var re = /[.]*[^a-z\s\,]+[.]*/gi;
    var m = cty.match(re);
    if (m) { 
        alert("Invalid city name entered"); cty="";
    }

    /* test for empty input */
    if (cty=="") {
        var a = "Please enter a city";
        /* use confirm instead of alert to refresh after clicking ok */
        if(confirm(a)){ window.location.reload(); }
    }


    var address = str+','+cty;
    $greeting.text('So you want to move to '+cty+'?');
    var streetview = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+cty+'';
    $imgElem.html('<img class="bgimg" src="'+streetview+'">');


    /* requests with 8 second (8000 ms) timeout. 
     * use class gap on list entries. 
     * jsonp for cross-domain ajax 
    */

    var wikiRequestTimeout = setTimeout(function() { 
        $wikiElem.text("Failed to get Wikipedia resources. Wait a few seconds for refresh."); 
    }, 8000);

    var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cty+'&format=json&callback=wikiCallback';
    $.ajax({
        url: wikiurl, 
        dataType: 'jsonp', 
        success: function(data) {
            var articleList = data[1];
            for(var i=0; i<articleList.length; i++){
                entry = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/'+entry;
                $wikiElem.append('<li class="gap"><a href="'+url+'">'+entry+'</a></li>');
            }
        clearTimeout(wikiRequestTimeout);
        }
    });


    var redditRequestTimeout = setTimeout(function() { 
    $newsElem.text("Failed to get Reddit resources.  Wait a few seconds for refresh."); 
    getNews();
    }, 8000);

    var redditurl = 'http://www.reddit.com/r/news/search.json?q='+cty+'&sort=new&restrict_sr=on&t=all&jsonp=?';
    var getNews = function() {
        $.ajax({
            url: redditurl, 
            dataType: 'jsonp', 
            success: function(response) {
                var articleList = response.data.children;
                var result = "";
                for(var i=0; i<articleList.length; i++){
                    entry = articleList[i].data;
                    //var link = 'http://www.reddit.com/'+entry.permalink;
                    result += ('<li class="gap"><a href="'+entry.url+'">'+entry.title+'</a></li>');
                }
                $newsElem.html(result);
                clearTimeout(redditRequestTimeout);
            },
            complete: function() {
              // Schedule the next request when the current one's complete
              setTimeout(getNews, 30000); // refresh every 30 seconds
            },
        });
    }

    getNews();


    var weatherRequestTimeout = setTimeout(function() { 
    $weatherElem.text("Failed to get weather resources.  Wait a few seconds for refresh."); 
    getWeather();
    }, 10000);

    var getWeather = function() {
        $.ajax({
            type: "get",
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+cty+'&units=imperial',
            dataType: "json",
            success: function(data) {
                /* handle data here */
                var result = "<div class='weather-report gap'>"+data.weather[0].description; 
                result += ", " + data.main.temp + " &#8457;</div>";
                $weatherElem.html(result);
            },
            complete: function() {
              // Schedule the next request when the current one's complete
              setTimeout(getWeather, 25000); // refresh every 25 seconds
            },
            error: function(xhr, status) {
                /* handle error here */
                $weatherElem.html(status);
            }
        });
    }

    getWeather();

    return false;
};

$('#form-container').submit(loadData);

// loadData();

// testing addresses:  
// 1600 pennsylvania ave; washington, dc
// 24 willie mays plaza; san francisco, ca
// 30 rockefeller center; new york city, ny



