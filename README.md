Front End for Test4Theory Challenge - Run 2
===========================================

Draft Implementation of the Analytics Dashboard for Test4Theory Challenge Run    

This can be tested by :
```bash
git clone --recursive https://github.com/spMohanty/test4theory-challenge-run-2-front-end.git
cd test4theory-challenge-run-2-front-end.git
python -m SimpleHTTPServer
```
And then you should be able to access it at `localhost:8000`   

Notes
=====
* `json` is the result type that is used for all the `google-analytics-super-proxy` queries.
* The analytics data is hardcoded for now, and is made available in a separate javascript file at : https://github.com/spMohanty/test4theory-challenge-run-2-front-end/blob/master/js/analytics_data.js
    * If the analytics data changes less frequently, then it can be fetched from the `Google AppEngine` `google-analytics-super-proxy` instance from time to time and then written into the above mentioned file in the required format.
    * If the analytics data is directly fetched form a `Google AppEngine` instance, then `renderT4TCAnalytics()` has to be called after the analytics data are downloaded and are made available in their respective variables, instead of calling `renderT4TCAnalytics()` in `$(document).ready` as is being now.

Author
=====
S.P. Mohanty < <spmohanty91@gmail.com> >