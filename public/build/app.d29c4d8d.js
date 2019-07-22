(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{ejCh:function(e,t,r){var n,i,a,o;function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r("pNMO"),r("4Brf"),r("0oug"),r("QWBl"),r("4mDm"),r("oVuX"),r("zKZe"),r("eoL8"),r("3KgV"),r("tkto"),r("07d7"),r("TWNs"),r("rB9j"),r("JfAA"),r("PKPk"),r("UxlC"),r("FZtP"),r("3bBZ"),o=function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},t="function"==typeof Symbol&&"symbol"==s(Symbol.iterator)?function(e){return s(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":s(e)},r=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),n=function(){function n(e,t){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,n),this.context_=e||{base_url:"",prefix:"",host:"",port:"",scheme:""},this.setRoutes(t||{})}return r(n,[{key:"setRoutingData",value:function(e){this.setBaseUrl(e.base_url),this.setRoutes(e.routes),"prefix"in e&&this.setPrefix(e.prefix),"port"in e&&this.setPort(e.port),this.setHost(e.host),this.setScheme(e.scheme)}},{key:"setRoutes",value:function(e){this.routes_=Object.freeze(e)}},{key:"getRoutes",value:function(){return this.routes_}},{key:"setBaseUrl",value:function(e){this.context_.base_url=e}},{key:"getBaseUrl",value:function(){return this.context_.base_url}},{key:"setPrefix",value:function(e){this.context_.prefix=e}},{key:"setScheme",value:function(e){this.context_.scheme=e}},{key:"getScheme",value:function(){return this.context_.scheme}},{key:"setHost",value:function(e){this.context_.host=e}},{key:"getHost",value:function(){return this.context_.host}},{key:"setPort",value:function(e){this.context_.port=e}},{key:"getPort",value:function(){return this.context_.port}},{key:"buildQueryParams",value:function(e,r,n){var i=this,a=void 0,o=new RegExp(/\[\]$/);if(r instanceof Array)r.forEach(function(r,a){o.test(e)?n(e,r):i.buildQueryParams(e+"["+("object"===(void 0===r?"undefined":t(r))?a:"")+"]",r,n)});else if("object"===(void 0===r?"undefined":t(r)))for(a in r)this.buildQueryParams(e+"["+a+"]",r[a],n);else n(e,r)}},{key:"getRoute",value:function(e){var t=this.context_.prefix+e;if(t in this.routes_)e=t;else if(!(e in this.routes_))throw new Error('The route "'+e+'" does not exist.');return this.routes_[e]}},{key:"generate",value:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.getRoute(t),a=r||{},o=e({},a),s="",u=!0,l="",d=void 0===this.getPort()||null===this.getPort()?"":this.getPort();if(i.tokens.forEach(function(e){if("text"===e[0])return s=e[1]+s,void(u=!1);if("variable"!==e[0])throw new Error('The token type "'+e[0]+'" is not supported.');var r=i.defaults&&e[3]in i.defaults;if(!1===u||!r||e[3]in a&&a[e[3]]!=i.defaults[e[3]]){var n=void 0;if(e[3]in a)n=a[e[3]],delete o[e[3]];else{if(!r){if(u)return;throw new Error('The route "'+t+'" requires the parameter "'+e[3]+'".')}n=i.defaults[e[3]]}var l=!0===n||!1===n||""===n;if(!l||!u){var d=encodeURIComponent(n).replace(/%2F/g,"/");"null"===d&&null===n&&(d=""),s=e[1]+d+s}u=!1}else r&&e[3]in o&&delete o[e[3]]}),""===s&&(s="/"),i.hosttokens.forEach(function(e){var t=void 0;return"text"===e[0]?void(l=e[1]+l):void("variable"===e[0]&&(e[3]in a?(t=a[e[3]],delete o[e[3]]):i.defaults&&e[3]in i.defaults&&(t=i.defaults[e[3]]),l=e[1]+t+l))}),s=this.context_.base_url+s,i.requirements&&"_scheme"in i.requirements&&this.getScheme()!=i.requirements._scheme?s=i.requirements._scheme+"://"+(l||this.getHost())+s:void 0!==i.schemes&&void 0!==i.schemes[0]&&this.getScheme()!==i.schemes[0]?s=i.schemes[0]+"://"+(l||this.getHost())+s:l&&this.getHost()!==l+(""===d?"":":"+d)?s=this.getScheme()+"://"+l+(""===d?"":":"+d)+s:!0===n&&(s=this.getScheme()+"://"+this.getHost()+s),Object.keys(o).length>0){var c=void 0,f=[],m=function(e,t){t=null===(t="function"==typeof t?t():t)?"":t,f.push(encodeURIComponent(e)+"="+encodeURIComponent(t))};for(c in o)this.buildQueryParams(c,o[c],m);s=s+"?"+f.join("&").replace(/%20/g,"+")}return s}}],[{key:"getInstance",value:function(){return i}},{key:"setData",value:function(e){var t=n.getInstance();t.setRoutingData(e)}}]),n}();n.Route,n.Context;var i=new n;return{Router:n,Routing:i}}(),i=[],n=o.Routing,void 0===(a="function"==typeof n?n.apply(t,i):n)||(e.exports=a)},liU1:function(e){e.exports=JSON.parse('{"base_url":"","routes":{"register":{"tokens":[["text","/register"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"tour_new":{"tokens":[["text","/tour/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"tour_edit":{"tokens":[["variable","/","[^/]++","id",true],["text","/tour/edit"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"tour_delete":{"tokens":[["variable","/","[^/]++","id",true],["text","/tour/delete"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"user_new":{"tokens":[["text","/user/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"user_edit":{"tokens":[["variable","/","[^/]++","id",true],["text","/user/edit"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"user_delete":{"tokens":[["variable","/","[^/]++","id",true],["text","/user"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"user_account":{"tokens":[["text","/account"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http"}')},ng4s:function(e,t,r){"use strict";r.r(t);r("fbCW"),r("4l63"),r("sZ/o");var n=r("EVdn"),i=r.n(n);r("eoL8"),r("R5XZ");function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n;return t=e,(r=[{key:"save",value:function(e,t,r){i.a.ajax({url:e,contentType:!1,processData:!1,type:"POST",dataType:"JSON",data:t,beforeSend:function(){r.btnSave.prepend('<div class="spinner-border align-middle mr-2" role="status"><span class="sr-only">Loading...</span></div>').prop("disabled",!0)},success:function(e){"success"===e.status&&(i()(".notification").html('<div class="alert alert--success">'.concat(e.message,"</div>")),setTimeout(function(){window.location.href=e.url},2e3))},complete:function(){i()(".spinner-border").length>0&&i()(".spinner-border").remove(),i()(".notification .alert").fadeOut(3e3),r.btnSave.prop("disabled",!1)},error:function(){i()(".notification").html('<div class="alert alert--error">Something went wrong. Please try again.</div>')}})}},{key:"delete",value:function(e,t,r){var n=r.tourId;i.a.ajax({url:e,dataType:"JSON",success:function(e){"success"===e.status&&(i()(".notification").html('<div class="alert alert--success">'.concat(e.message,"</div>")),i()('a[data-tour-id="'.concat(n,'"')).parents("tr").fadeOut(3e3))},complete:function(){i()(".notification .alert").fadeOut(3e3)},error:function(){i()(".notification").html('<div class="alert alert--error">Something went wrong. Please try again.</div>')}})}}])&&a(t.prototype,r),n&&a(t,n),e}();function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,n;return t=e,(r=[{key:"save",value:function(e,t,r){i.a.ajax({url:e,contentType:!1,processData:!1,type:"POST",dataType:"JSON",data:t,beforeSend:function(){r.btnSave.prepend('<div class="spinner-border align-middle mr-2" role="status"><span class="sr-only">Loading...</span></div>').prop("disabled",!0)},success:function(e){"success"===e.status?(i()(".notification").html('<div class="alert alert--success">'.concat(e.message,"</div>")),setTimeout(function(){window.location.href=e.url},2e3)):i()(".notification").html('<div class="alert alert--error">'.concat(e.message,"</div>"))},complete:function(){i()(".spinner-border").length>0&&i()(".spinner-border").remove(),i()(".notification .alert").fadeOut(3e3),r.btnSave.prop("disabled",!1)},error:function(){i()(".notification").html('<div class="alert alert--error">Something went wrong. Please try again.</div>')}})}},{key:"delete",value:function(e,t,r){var n=r.userId;i.a.ajax({url:e,dataType:"JSON",success:function(e){"success"===e.status&&(i()(".notification").html('<div class="alert alert--success">'.concat(e.message,"</div>")),i()('a[data-user-id="'.concat(n,'"')).parents("tr").fadeOut(3e3))},complete:function(){i()(".notification .alert").fadeOut(3e3)},error:function(){i()(".notification").html('<div class="alert alert--error">Something went wrong. Please try again.</div>')}})}},{key:"register",value:function(e,t,r){i.a.ajax({url:e,type:"POST",dataType:"JSON",data:t,beforeSend:function(){r.btnSignUp.prepend('<div class="spinner-border align-middle mr-2" role="status"><span class="sr-only">Loading...</span></div>').prop("disabled",!0)},success:function(e){"success"===e.status?(i()(".notification").html('<div class="alert alert--success">'.concat(e.message,"</div>")),r.form.trigger("reset")):i()(".notification").html('<div class="alert alert--error">'.concat(e.message,"</div>"))},complete:function(){i()(".spinner-border").length>0&&i()(".spinner-border").remove(),i()(".notification .alert").fadeOut(3e3),r.btnSignUp.prop("disabled",!1)},error:function(){i()(".notification").html('<div class="alert alert--error">Something went wrong. Please try again.</div>')}})}}])&&s(t.prototype,r),n&&s(t,n),e}();r("rIKr");function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var d=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.formObj=t,this.rules=r,this.messages=n}var t,r,n;return t=e,(r=[{key:"init",value:function(){return this.formObj.validate({rules:this.rules,messages:this.messages,errorElement:"div",errorClass:"text-left invalid-feedback",errorPlacement:function(e,t){e.insertAfter(t)},highlight:function(e){i()(e).addClass("is-invalid")},unhighlight:function(e){i()(e).removeClass("is-invalid")}})}},{key:"onSubmit",value:function(){return this.formObj.validate({rules:this.rules,messages:this.messages,errorElement:"div",errorClass:"text-left invalid-feedback",errorPlacement:function(e,t){e.insertAfter(t)},highlight:function(e){i()(e).addClass("is-invalid")},unhighlight:function(e){i()(e).removeClass("is-invalid")},submitHandler:function(e){e.submit()}})}}])&&l(t.prototype,r),n&&l(t,n),e}(),c=(r("pNMO"),r("4Brf"),r("4ZJM")),f=r.n(c);r("rG3h");function m(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.accessToken="pk.eyJ1Ijoia2JveXoiLCJhIjoiY2p5NGsxYTdpMTc3bTNiczdhaHF6cGFuaiJ9.GnW4vOEe-3XN_y7f4KgFKQ",this.location=t}var t,r,n;return t=e,(r=[{key:"init",value:function(){f.a.accessToken=this.accessToken;var e=new f.a.Map({container:"map",style:"mapbox://styles/kboyz/cjy4k348700im1clc3p8vn256",zoom:5,maxZoom:10}),t=new f.a.LngLatBounds,r=document.createElement("div");r.className="marker",new f.a.Marker({element:r,anchor:"bottom"}).setLngLat(this.location.coordinates).addTo(e),new f.a.Popup({offset:30}).setLngLat(this.location.coordinates).setHTML("".concat(this.location.description)).addTo(e),t.extend(this.location.coordinates),e.fitBounds(t,{padding:{top:200,bottom:150,left:100,right:100}})}}])&&m(t.prototype,r),n&&m(t,n),e}(),v=(r("q4sD"),r("SYky"),r("BAPL")),h=r.n(v),g=r("wlbR"),b=r.n(g),y=(r("K+Wz"),r("zwY0"),r("liU1")),w=r("ejCh"),_=r.n(w);_.a.setRoutingData(y),i()(function(){i()("#tour_startDate").flatpickr(),i()(document).on("submit",".tour-form",k),i()(document).on("click",".delete-tour",S),i()(document).on("submit",".form--login",q),i()(document).on("submit",".form--signup",x),i()(document).on("submit",".form-user-data",P),i()(document).on("submit",".user-form",T),i()(document).on("click",".delete-user",O);var e=i()("#map");if(e.length>0){var t=e.data("location");new p(t).init()}i()(document).on("click","#book-tour",function(){h.a.alert({message:"<h1>Coming soon</h1>",backdrop:!0,buttons:{ok:{label:"Ok",className:"btn--green"}}})})});var k=function(e){e.preventDefault();var t=i()(e.target),r=t.attr("id");i.a.validator.addMethod("isValidLatitude",function(e){return e=parseInt(e),b.a.latitude(e)}),i.a.validator.addMethod("isValidLongitude",function(e){return e=parseInt(e),b.a.longitude(e)});var n=new d(t,{"tour[name]":"required","tour[duration]":"required","tour[maxGroupSize]":"required","tour[ratings]":"required","tour[price]":"required","tour[location]":"required","tour[latitude]":{required:!0,isValidLatitude:!0},"tour[longitude]":{required:!0,isValidLongitude:!0},"tour[startDate]":"required"},{"tour[name]":"Name is required.","tour[duration]":"Duration is required.","tour[maxGroupSize]":"Max Group Size is required.","tour[ratings]":"Ratings is required.","tour[price]":"Price is required.","tour[location]":"Location is required.","tour[latitude]":{required:"Latitude is required.",isValidLatitude:"Latitude is invalid."},"tour[longitude]":{required:"Longitude is required.",isValidLongitude:"Longitude is invalid"},"tour[startDate]":"Start Date is required."}).init();if(i()(".notification").html(""),n.form()){var a=t.find("#tour_id").val(),s="create-tour"===r?_.a.generate("tour_new"):_.a.generate("tour_edit",{id:a}),u=t.find("#tour_name").val(),l=t.find("#tour_duration").val(),c=t.find("#tour_maxGroupSize").val(),f=t.find("#tour_difficulty").val(),m=t.find("#tour_ratings").val(),p=t.find("#tour_price").val(),v=t.find("#tour_summary").val(),h=t.find("#tour_description").val(),g=t.find("#tour_imageCover"),y=""!=g.val()&&g.val().length>0?g[0].files[0]:"",w=t.find("#tour_location").val(),k=t.find("#tour_latitude").val(),S=t.find("#tour_longitude").val(),q=t.find("#tour_startDate").val(),x=t.find("#btn-save"),P=new FormData;P.append("name",u),P.append("duration",l),P.append("maxGroupSize",c),P.append("difficulty",f),P.append("ratings",m),P.append("price",p),P.append("summary",v),P.append("description",h),P.append("imageCover",y),P.append("location",w),P.append("latitude",k),P.append("longitude",S),P.append("startDate",q);var T={btnSave:x};(new o).save(s,P,T)}},S=function(e){e.target.id;var t=e.target.dataset.tourId,r=_.a.generate("tour_delete",{id:t});h.a.confirm({message:'<h1 class="h1 ml-2">Are you sure you want to delete this tour?</h1>',buttons:{confirm:{label:"Yes",className:"btn--green"},cancel:{label:"No"}},callback:function(e){if(e){var n=new o,i={tourId:t};n.delete(r,null,i)}}})},q=function(e){e.preventDefault();var t=i()(e.target);new d(t,{email:{required:!0,email:!0},password:"required"},{email:{required:"Email is required.",email:"Email is invalid"},password:"Password is required."}).onSubmit().form()&&t.submit()},x=function(e){e.preventDefault();var t=i()(e.target),r=new d(t,{"registration_form[email]":{required:!0,email:!0},"registration_form[password][first]":"required","registration_form[password][second]":"required"},{"registration_form[email]":{required:"Email is required.",email:"Email is invalid"},"registration_form[password][first]":"Password is required.","registration_form[password][second]":"Confirm Password is required."}).init();if(i()(".notification").html(""),r.form()){var n=_.a.generate("register"),a=t.find("#registration_form_email").val(),o=t.find("#registration_form_password_first").val(),s=t.find("#registration_form_password_second").val(),l=t.find("#btn-sign-up");if(o==s){var c={email:a,password:o},f={form:t,btnSignUp:l};(new u).register(n,c,f)}else i()(".notification").html('<div class="alert alert--error">The password fields must match.</div>'),t.find(":input").blur()}},P=function(e){e.preventDefault();var t=i()(e.target),r=(t.attr("id"),new d(t,{"user[email]":"required"},{"user[email]":"Email is required."}).init());if(i()(".notification").html(""),r.form()){t.find("#user_id").val();var n=_.a.generate("user_account"),a=t.find("#user_firstName").val(),o=t.find("#user_lastName").val(),s=t.find("#user_email").val(),l=t.find("#user_password").val(),c=t.find('input[name="user[profileImage]"]'),f=""!=c.val()&&c.val().length>0?c[0].files[0]:"",m=t.find("#btn-save"),p=new FormData;p.append("firstName",a),p.append("lastName",o),p.append("email",s),p.append("password",l),p.append("profileImage",f);var v={btnSave:m};(new u).save(n,p,v)}},T=function(e){e.preventDefault();var t=i()(e.target),r=t.attr("id"),n=new d(t,{"user[email]":"required","user[password]":"required"},{"user[email]":"Email is required.","user[password]":"Password is required."}).init();if(i()(".notification").html(""),n.form()){var a=t.find("#user_id").val(),o="create-user"===r?_.a.generate("user_new"):_.a.generate("user_edit",{id:a}),s=t.find("#user_firstName").val(),l=t.find("#user_lastName").val(),c=t.find("#user_email").val(),f=t.find("#user_password").val(),m=t.find('input[name="user[profileImage]"]'),p=""!=m.val()&&m.val().length>0?m[0].files[0]:"",v=t.find("#btn-save"),h=new FormData;h.append("firstName",s),h.append("lastName",l),h.append("email",c),h.append("password",f),h.append("profileImage",p);var g={btnSave:v};(new u).save(o,h,g)}},O=function(e){e.target.id;var t=e.target.dataset.userId,r=_.a.generate("user_delete",{id:t});h.a.confirm({message:'<h1 class="h1 ml-2">Are you sure you want to delete this user?</h1>',buttons:{confirm:{label:"Yes",className:"btn--green"},cancel:{label:"No"}},callback:function(e){if(e){var n=new u,i={userId:t};n.delete(r,null,i)}}})}},"sZ/o":function(e,t,r){}},[["ng4s","runtime",0]]]);