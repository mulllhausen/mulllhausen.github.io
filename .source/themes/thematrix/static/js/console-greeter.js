// greet developers in the console window
(function(siteGlobalsCopy) { // separate scope
    var styles = 'color: #7db904;';//background: #000000; ';
    var padRight = '';//' '.repeat(200);
    var header = 'Welcome to the source code for the ';
    var fullConsoleSupport = (siteGlobalsCopy.browser.chrome || siteGlobalsCopy.browser.safari);

    // all browsers except IE support colors in the console
    var styleConsoleSupport = !siteGlobalsCopy.browser.ie;

    if (fullConsoleSupport) {
        var group = function(text, styleOverride) {
            var localStyles = (styleOverride != null) ? styleOverride : styles;
            console.group('%c' + text + padRight, localStyles);
        };
        var groupEnd = console.groupEnd;
        var log = function(text, styleOverride) {
            var localStyles = (styleOverride != null) ? styleOverride : styles;
            console.log('%c' + text + padRight, localStyles);
        };
        header += siteGlobalsCopy.sitename;
    } else {
        // no support for font size - use ascii art instead
        // minimal support for grouping - use ascii art instead
        var indentLevel = -3; // hack to prevent first indent (looks better)
        var logText = ''; // init
        var group = function(text) {
            log(text);
            indentLevel += 3;
        };
        var groupEnd = function() {
            indentLevel -= 3;
            log(''); // empty line after groups
        };
        var log = function(text) {
            var indent = (indentLevel >= 0) ? ' '.repeat(indentLevel) : '';
            logText += indent + text + '\n';
        };
        header += siteGlobalsCopy.sitenameASCIIArt;
    }
    function logEnd() {
        if (fullConsoleSupport) return;
        if (styleConsoleSupport) console.log('%c' + logText, styles);
        else console.log(logText);
    }
    group(header + ' blog', styles + 'font-size: x-large;');
    log('');
    log('This website is hosted on github. You can view the Pelican files which generate the static website files at ' + siteGlobalsCopy.githubURL + '/tree/master/.source');
    log('');
    group('The global Javascript file is ' + siteGlobalsCopy.siteURL + '/theme/js/base.js, which is built by merging and minifying the following files:');
    log(siteGlobalsCopy.githubURL + '/tree/master/.source/themes/thematrix/static/js/polyfills.js - polyfills to get this site working on older browsers');
    log(siteGlobalsCopy.githubURL + '/tree/master/.source/themes/thematrix/static/js/utils.js - common functions used on many pages');
    log(siteGlobalsCopy.githubURL + '/tree/master/.source/themes/thematrix/static/js/matrix-animation.js - code to animate the matrix logo');
    groupEnd();
    if (siteGlobalsCopy.hasOwnProperty('article')) {
        if (siteGlobalsCopy.article.hasOwnProperty('consoleExplainScripts')) {
            group('The Javascript files for the \'' + siteGlobalsCopy.article.title + '\' article are:');
                var consoleExplanations = siteGlobalsCopy.article.consoleExplainScripts.split('|');
                foreach(consoleExplanations, function (i, consoleExp) {
                    log(siteGlobalsCopy.githubURL + '/tree/master/.source/content/' + consoleExp);
                });
            groupEnd();
        } else {
            log('There are no Javascript files for the \'' + siteGlobalsCopy.article.title + '\' article.');
        }
    } else {
        log('Please navigate to an article to view the Javascript files specific to that article (if any).');
    }
    groupEnd();
    logEnd();
})(siteGlobals);
