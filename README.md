citysnapshot
============

City Snapshot

In this application, the user enters city and/or state (and optionally an address).  Valid city names are considered the be only using letters A-Z (case insensitive).  Google maps API provides background image.  Weather courtesy of OpenWeatherMap API (refreshed periodically).  News courtesy of various sources (pulled from Reddit news links, courtesy of Reddit API).  Wikipedia links courtesy of Wikipedia API.  All AJAX requests (except maps image) are in JSON format, with JSONP specified for cross-domain communication requests.

============
Front-end only implementation of jQuery-based AJAX communication with cross-domain API libraries using JSONP.  AJAX refreshes periodically, with error handling.  JS Regex demo for filtering city input.  HTML and CSS hand-made, no framework used but row and container concepts parallel to Bootstrap.

============

gh-pages is primary branch with most recent changes, because this branch updates to project page
