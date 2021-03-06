/*

OK... this is really ugly!! It is currently 3:17 a.m. and this is very, very hackish ugly code. So if you really want to have a look at this.. I'm sorry.. :)
Perhaps I'll have some minutes in a few days to rewrite this. ;) 

*/



















// IS THERE A NICE SCRIPT TO MAKE A MD5 STRING WITH JS? 


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}


(function(){
	GithubTagger = {
		taggerUrl:"http://github-tagger.railslove.com/",
		//taggerUrl:"http://localhost:3000/",
		init: function() {
			if(GithubTagger.isRepositoryUrl())
				GithubTagger.initRepositorySite();
			if(GithubTagger.isSearchUrl())
				GithubTagger.globalSearch(GithubTagger.searchQuery());
		},
		// create the HTML-skeleton for the tag stuff and add it to the .meta table and load the tags. 
		// I've currently two <tr> - one for private tags and one for public tags
		initRepositorySite: function(){
			var global_td_head = jQuery("<td />").addClass("label").html("all tags:");
			var global_td_tags = jQuery("<td />").html('<span id="global_tags"></span>');
			var global_tag_row = jQuery("<tr />");
			global_tag_row.append(global_td_head);
			global_tag_row.append(global_td_tags);
				
			var my_td_head = jQuery("<td />").addClass("label").html("your tags:");
			var my_td_tags = jQuery("<td />").html('<span id="my_tags"></span> <input type="text" value="" name="tags" id="tags_input"/><input type="button" id="save_tags" value="Save"/>');
			var my_tag_row = jQuery("<tr />");
			my_tag_row.append(my_td_head);
			my_tag_row.append(my_td_tags);

			$(".meta table").append(my_tag_row);				
			$(".meta table").append(global_tag_row);
			
			$("#save_tags").bind('click', function(e) { e.preventDefault();GithubTagger.saveTags($('#tags_input').val())});
			
			GithubTagger.loadTags();
		},
		// saves the tags doing a jQuery.getJSON request
		saveTags: function(tags) {
			if(!GithubTagger.User.loggedIn()) {
				alert("you need to login to github to save tags.");
				return;
			}
			var url = this.taggerUrl + "taggings/?_method=post&user="+GithubTagger.User.name() + "&repository="+GithubTagger.url()+"&tags="+tags+"&callback=?";
			jQuery.getJSON(url,function(response){
				$("#tags_input").val("");
				GithubTagger.loadTags();
			});
		},
		// wrapper to load my tags an the global tags
		loadTags: function() {
			GithubTagger.loadMyTags();
			GithubTagger.loadGlobalTags();
		},
		// OK... NOW IT GETS UGLY! UMPH... THIS IS VERY SIMILAR TO THE loadGlobalTags() - SO REFACTOR!!! the main difference are the different urls and different json srings that are returned.
		loadMyTags: function(){
			if(!GithubTagger.url())
				return;
			var url = this.taggerUrl + "users/" + GithubTagger.User.name() + "/taggings" + "?repository="+GithubTagger.url()+"&callback=?";
			jQuery.getJSON(url,function(response){
				$("#my_tags").html("");
				if(!response)
					return;
				
				jQuery.each(response,function(count,tagging){ 
					var tag_url = GithubTagger.taggerUrl + "users/" + GithubTagger.User.name() + "/repositories.js?tags="+escape(tagging.tag_name);
					var tag_link =  jQuery("<a/>").attr({href:tag_url, rel:"facebox"}).html(" "+ tagging.tag_name +" ");
					$("#my_tags").append(tag_link);
					tag_link.bind("click", function(event) { 
						event.preventDefault();
						url = $(this).attr("href");
						jQuery.getJSON(url+"&callback=?",function(response){
							var facebox_content = jQuery("<div/>").append(jQuery("<h3/>").text("Search result:"));
							for(var i=0;i<response.length;i++) {
								var url = response[i].url;
								var name = response[i].name;
								var tag_list = response[i].tag_list;
								var wrapper = jQuery("<div />").addClass("");
								var title = jQuery("<strong/>").append(jQuery("<a/>").attr({href:url}).html(name));
								wrapper.append(title);
								wrapper.append(jQuery("<span/>").html("<br /><em>"+tag_list+"</em>"));
								facebox_content.append(wrapper);
							}
							jQuery.facebox(facebox_content);
						});
					});
				});
			});
		},
		// OK... NOW IT GETS UGLY! UMPH... THIS IS VERY SIMILAR TO THE loadMyTags() - SO REFACTOR!!! the main difference are the different urls and different json srings that are returned.
		loadGlobalTags: function(){
			if(!GithubTagger.url())
				return;
			var url = GithubTagger.taggerUrl + "repositories/" + GithubTagger.md5_url() + "?callback=?";
			jQuery.getJSON(url,function(response){
				$("#global_tags").html("");
				if(!response || !response.tags)
					return;
					
				jQuery.each(response.tags,function(count,tag){ 
					var tag_url = GithubTagger.taggerUrl + "repositories.js?tags="+escape(tag.name);
					var tag_link =  jQuery("<a/>").attr({href:tag_url, rel:"facebox"}).html(" "+ tag.name +" ");
					$("#global_tags").append(tag_link);
					tag_link.bind("click", function(event) { 
						event.preventDefault();
						url = $(this).attr("href");
						jQuery.getJSON(url+"&callback=?",function(response){
							var facebox_content = jQuery("<div/>").append(jQuery("<h3/>").text("Search result:"));
							
							for(var i=0;i<response.length;i++) {
								var url = response[i].url;
								var name = response[i].name;
								var tag_list = response[i].tag_list;
								var wrapper = jQuery("<div />").addClass("");
								var title = jQuery("<strong/>").append(jQuery("<a/>").attr({href:url}).html(name));
								wrapper.append(title);
								wrapper.append(jQuery("<span/>").html("<br /><em>"+tag_list+"</em>"));
								facebox_content.append(wrapper);
							}
							jQuery.facebox(facebox_content);
						});
					});
				});
			});
		},
		globalSearch: function(query) {
			var url = GithubTagger.taggerUrl + "repositories.js?tags="+query;
			jQuery.getJSON(url+"&callback=?",function(response){
				for(var i=0;i<response.length;i++) {
					var repository = response[i];
					var tr_name = jQuery("<tr />");
					var td_name = jQuery("<td/>").addClass("title").append(jQuery("<a/>").attr({href:repository.url}).html(repository.name));
					var td_user = jQuery("<td/>").addClass("owner").append(jQuery("<a/>").attr({href:"http://github.com/"+repository.author}).html(repository.author));
					var graph_content = '<div class="bars"><object width="416" height="20" id="participation_graph" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="/flash/participation_graph.swf" name="movie"/><param value="always" name="allowScriptAccess"/><param value="high" name="quality"/><param value="noscale" name="scale"/><param value="transparent" name="wmode"/><param value="location='+repository.graph_url + '" name="FlashVars"/> <embed width="416" height="20" flashvars="location='+repository.graph_url+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent" quality="high" name="participation_graph" src="/flash/participation_graph.swf"/></object></div> <img alt="legend" src="/images/modules/dashboard/dossier/participation_legend.png" class="legend"/>';
					tr_name.append(jQuery("<td/>").addClass("gravatar"));
					tr_name.append(td_name);
					tr_name.append(td_user)
					tr_name.append(jQuery("<td/>").addClass("date"));
					tr_name.append(jQuery("<td/>").attr({rowspan:"2"}).addClass("graph").html(graph_content));
					
					var tr_tags = jQuery("<tr />");
					var td_empty = jQuery("<td/>");
					var td_tags = jQuery("<td/>").attr({colspan:"3"}).addClass("desc").html("<strong>Tags:</strong> "+ repository.tag_list);
					tr_tags.append(td_empty).append(td_tags);
					
					var tr_sep = jQuery("<tr/>").addClass("sep").append(jQuery("<td/>")).append(jQuery("<td/>").attr({colspan:"4"}).addClass("border")).append(jQuery("<td/>"));
					
					$("#directory table.repo").append(tr_name);
					$("#directory table.repo").append(tr_tags);
					$("#directory table.repo").append(tr_sep);
					
					
				}
			});
		},
		User: {
			name: function() {
				return $(".userbox .name a").text();
			},
			loggedIn: function(){
				return (GithubTagger.User.name() != "");
			}
		},
		url: function(){
			var m = document.location.toString().match(/http[s]?:\/\/github.com\/([^\/]*)\/([^\/]*)/);
			if(m)
				return m[0];
		},
		ropository_name: function(){
			var m = document.location.toString().match(/http[s]?:\/\/github.com\/([^\/]*)\/([^\/]*)/);
			if(m)
				return m[2];
		},
		md5_url: function(){
			return hex_md5(GithubTagger.url());
		},
		isRepositoryUrl: function(){
			return GithubTagger.url() ? true : false;
		},
		searchQuery: function(){
			var m = document.location.toString().match(/\?q=(.*)/);
			if(m)
				return m[1]
		},
		isSearchUrl: function(){
			return GithubTagger.searchQuery() ? true : false;
		}
		
	};
	GithubTagger.init();
})();