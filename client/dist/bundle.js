$(document).ready(function(){var o=function(o,t){var n="http://localhost:3000/api/",e=function(t){window.localStorage.setItem("sessionToken",t),o.ajaxSetup({headers:{Authorization:t}})};return{API_BASE:n,setAuthHeader:e}}(jQuery);$(".nav-tabs a[data-toggle=tab]").on("click",function(o){var t=window.localStorage.getItem("sessionToken");if($(this).hasClass("disabled")&&!t)return o.preventDefault(),!1}),$("a[data-toggle=tab]").on("shown.bs.tab",function(t){var n=$(t.target).attr("href");"#log"===n&&o.log.setDefinitions(),"#history"===n&&o.log.setHistory()}),$(document).on("keypress",function(o){13===o.which&&($("#signup-modal").is(":visible")&&$("#signup").trigger("click"),$("#login-modal").is(":visible")&&$("#login").trigger("click"))});var t=window.localStorage.getItem("sessionToken");t&&o.setAuthHeader(t),window.WorkoutLog=o}),$(function(){$.extend(WorkoutLog,{definition:{userDefinitions:[],create:function(){var o={desc:$("#def-description").val(),type:$("#def-logtype").val()},t={definition:o},n=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"definition",data:JSON.stringify(t),contentType:"application/json"});n.done(function(o){WorkoutLog.definition.userDefinitions.push(o.definition)}),n.fail(function(){console.log("oh no")})},fetchAll:function(){$.ajax({type:"GET",url:WorkoutLog.API_BASE+"definition",headers:{Authorization:window.localStorage.getItem("sessionToken")}}).done(function(o){WorkoutLog.definition.userDefinitions=o}).fail(function(o){console.log(o)})}}}),$("#def-save").on("click",WorkoutLog.definition.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.definition.fetchAll()}),$(function(){$.extend(WorkoutLog,{log:{workouts:[],setDefinitions:function(){for(var o=WorkoutLog.definition.userDefinitions,t=o.length,n="",e=0;e<t;e++)n+="<option value='"+o[e].id+"'>"+o[e].description+"</option>";$("#log-definition").children().remove(),$("#log-definition").append(n)},setHistory:function(){for(var o=WorkoutLog.log.workouts,t=o.length,n="",e=0;e<t;e++){var i=""===o[e].result?"No result found":o[e].result;n+="<li class='list-group-item'>"+o[e].def+" - "+i+"</li>"}$("#history-list").children().remove(),$("#history-list").append(n)},create:function(){var o={desc:$("#log-description").val(),result:$("#log-result").val(),def:$("#log-definition option:selected").text()},t={log:o},n=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(t),contentType:"application/json"});n.done(function(o){WorkoutLog.log.workouts.push(o)}),n.fail(function(){console.log("something broke")})},fetchAll:function(){var o=$.ajax({type:"GET",url:WorkoutLog.API_BASE+"log",headers:{Authorization:window.localStorage.getItem("sessionToken")}});o.done(function(o){WorkoutLog.log.workouts=o}),o.fail(function(o){console.log("an error occured"+o.message)})}}}),$("#log-save").on("click",WorkoutLog.log.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.log.fetchAll()}),$(function(){$.extend(WorkoutLog,{afterSignin:function(o){WorkoutLog.setAuthHeader(o),WorkoutLog.definition.fetchAll(),WorkoutLog.log.fetchAll(),$(".disabled").removeClass("disabled"),$("#loginout").text("Logout")},signup:function(){var o=$("#su_username").val(),t=$("#su_password").val(),n={user:{username:o,password:t}},e=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"user",data:JSON.stringify(n),contentType:"application/json"});e.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#signup-modal").modal("hide"))}).fail(function(){$("#su_error").text("There was an issue with sign up").show()})},login:function(){var o=$("#li_username").val(),t=$("#li_password").val(),n={user:{username:o,password:t}},e=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"login",data:JSON.stringify(n),contentType:"application/json"});e.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#login-modal").modal("hide"))}).fail(function(){$("#li_error").text("There was an issue with sign up").show()})},loginout:function(){window.localStorage.getItem("sessionToken")&&(window.localStorage.removeItem("sessionToken"),$("#loginout").text("Login"))}}),$("#login").on("click",WorkoutLog.login),$("#signup").on("click",WorkoutLog.signup),$("#loginout").on("click",WorkoutLog.loginout),window.localStorage.getItem("sessionToken")&&$("#loginout").text("Logout")});