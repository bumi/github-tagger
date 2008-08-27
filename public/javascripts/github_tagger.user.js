// GitHub.com tagging extension tagging script
// version 0.1 BETA!
// 2008-08-26
// Copyright (c) 2008, Michael Bumann - michael@Railslove.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that adds tagging functions to the awesome github.com
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GitHub.com Tagger
// @namespace     http://railslove.com
// @description   script that adds tagging functions to the awesome github.com       
// @include       *github.com*
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
script.src = "http://github-tagger.railslove.com/javascripts/github_tagger.js";
script.type = "text/javascript";
head.appendChild(script);