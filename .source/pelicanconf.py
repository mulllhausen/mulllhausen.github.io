#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import time

AUTHOR = u'Peter Miller'
SITENAME = u'analysis'
SITENAME_ASCIIART = r"""
!                    _           _      
!                   | |         (_)     
!   __ _ _ __   __ _| |_   _ ___ _ ___  
!  / _` | '_ \ / _` | | | | / __| / __| 
! | (_| | | | | (_| | | |_| \__ \ \__ \ 
!  \__,_|_| |_|\__,_|_|\__, |___/_|___/ 
!                       __/ |           
!                      |___/            """
BLOG_DESCRIPTION = 'Blog by ' + AUTHOR

PATH = 'content'

TIMEZONE = 'Australia/Adelaide'
UNIXTIME = int(time.time())
NOWYMD = time.strftime('%Y-%m-%d_%H:%M:%S')

DEFAULT_LANG = u'en'
# fs = filesystem
DEFAULT_DATE = 'fs'
DEFAULT_DATE_FORMAT = '%Y-%m-%d'

THEME = './themes/thematrix'

# disable the default pelican rss and atom feeds (use direct templates instead)
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
FEED_ALL_RSS = None

# currently no author page
AUTHOR_URL = ''
AUTHOR_SAVE_AS = ''

DIRECT_TEMPLATES = [
    'index', 'tags', 'archives', 'sitemap', 'robots', 'CNAME', 'sw', 'manifest',
    'rss', 'atom'
]
INDEX_SAVE_AS = 'index.html'
TAGS_SAVE_AS = 'tags/index.html'
ARCHIVES_SAVE_AS = 'archives/index.html'
SITEMAP_SAVE_AS = 'sitemap.xml'
ROBOTS_SAVE_AS = 'robots.txt'
CNAME_SAVE_AS = 'CNAME'
SW_SAVE_AS = 'sw.js'
MANIFEST_SAVE_AS = 'theme/js/manifest.json'
RSS_SAVE_AS = 'feeds/all.rss.xml'
ATOM_SAVE_AS = 'feeds/all.atom.xml'

ARTICLE_URL = '{slug}/'
ARTICLE_SAVE_AS = '{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'
TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = 'tag/{slug}/index.html'

DEFAULT_PAGINATION = False
DISPLAY_PAGES_ON_MENU = False
DELETE_OUTPUT_DIRECTORY = False

GITHUB_URL = 'https://github.com/mulllhausen/analysis.null.place'

STATIC_PATHS = ['img', 'js', 'css', 'json']
# files that will be merged by the static-file-merge plugin
STATIC_FILE_MERGES = {
    'js/base.js': [
        'js/polyfills.js',
        'js/utils.js',
        'js/matrix-animation.js',
        'js/autofooter.js',
        'js/cookie-warning-notice.js',
        'js/ads.js',
        'js/register-service-worker.js'
    ]
}
DELETE_PRE_MERGE_FILES = False

LOAD_CONTENT_CACHE = False
PLUGIN_PATHS = [THEME + '/plugins']
PLUGINS = [
    'static-file-merge',
    'jinja2content_simple',
    'querystring-cache'
]

# file paths relative to the output dir
YUICOMPRESSOR_SKIP = [
    '/sw.js' # skip this file because yuicompressor cannot handle es6
]

GOOGLE_AD_CLIENT = 'ca-pub-0118741364962624'
GOOGLE_AD_CLIENT_SKYSCRAPER_ID = 5984463506
GOOGLE_AD_CLIENT_IN_FEED_ID = 7540285424
TEST_ADSENSE = True

# debug settings:

# add 127.0.0.1 null.place to /etc/hosts for this (it is necessary if you want
# to debug the fb comments section on localhost)
#SITE_HOSTNAME = 'null.place'
#SITEURL = 'http://' + SITE_HOSTNAME + ':8000'

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# uncomment to view disqus on localhost
#DISQUS_SITENAME = 'analysis-null-place'

# uncomment to view facebook comments on localhost
#FACEBOOK_APP_ID = '2040066019560327'

if (('FACEBOOK_APP_ID' in vars()) or ('DISQUS_SITENAME' in vars())):
    COMMENTS_SCRIPTS = ['js/comments-manager.js'] # init
    if 'FACEBOOK_APP_ID' in vars():
        COMMENTS_SCRIPTS.append('js/facebook-comments.js')
    if 'DISQUS_SITENAME' in vars():
        COMMENTS_SCRIPTS.append('js/disqus-comments.js')
    STATIC_FILE_MERGES['js/comments-section.js'] = COMMENTS_SCRIPTS
