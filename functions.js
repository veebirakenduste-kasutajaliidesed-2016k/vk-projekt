//PARSE START
Parse.initialize("mnBuZ0BSyojKsyUNKxUAbJqy2gsVAtucOFJ6By7e", "nVC9gfLVC0mz9FdlEJ6O8aDMFpcILnQUqeYNuFqb");
var listitems = [];
var itemsids = [];
//REGISTREERIMISE NUPP
$(document).on("click", "#registerBtn", function(){
	$(".login").fadeOut();
	$(".register").fadeIn();
});

//SISSELOGIMISE NUPP
$(document).on("click", "#loginBtn", function(){
	var admin= "admin";
	var username = $(".login #username").val();
	var password = $(".login #password").val();
	Parse.User.logIn(username, password, {
		success: function(user){
			if (username == admin){
				window.location.href = "http://www.tlu.ee/~loginz/Sahver/admin.html";
			} else{
				window.location.href = "http://www.tlu.ee/~loginz/Sahver/user.html";
			}
		},
		error: function(user, error){
			alert("Sisselogimine ebaõnnestus");
			console.log(error);
		}
	});
});

//REGISTREERIMINE
$(document).on("click", "#register", function(){
	var username = $(".register #username").val();
	var password = $(".register #password").val();
	var passwordAgain = $(".register #passwordAgain").val();
	var email = $(".register #email").val();
	if (password == passwordAgain){
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.signUp(null,{
			success: function(user){
				alert("Kasutaja loomine õnnestus");
			},
			error: function(user,error){
				alert("Error: "+error.code + " " +error.message );
			}
		});
	}
});


//PAROOLI TAASTAMINE
$(document).on("click", "#forgotpwBtn", function(){
	var email = $(".forgotpw #email").val();
	Parse.User.requestPasswordReset(email, {
		success: function(){
			alert("Mine kontrolli oma eposti, uus parool on seal");
		},
		error: function(){
			alert("Sellist emaili ei pruugi olla andmebaasis");
		}
	});
});

//VÄLJALOGIMINE
	$(document).on("click", "#logout", function(){
		Parse.User.logOut();
		window.location.href = "http://www.tlu.ee/~loginz/Sahver/index.html";
	});

//AVALEHE KUVA
$(document).ready(function(){
	var user = Parse.User.current();
	var username = user.get("username");
	$(".avaleht").html("Tere tulemast, "+username+"!");
});

//HOIDISE LISAMINE
$(document).on("click", "#lisaHoidis", function(){
	var user = Parse.User.current();
	var username = user.get("username");
	var name = $(".add #name").val();
	var content = $(".add #content").val();
	var location = $(".add #location").val();
	var makeDate = $(".add #makeDate").val();

		var Hoidised = Parse.Object.extend("Hoidised");
		var hoidis = new Hoidised();
		hoidis.set("username", username);
		hoidis.set("name", name);
		hoidis.set("content", content);
		hoidis.set("location", location);
		hoidis.set("makeDate", makeDate);
		hoidis.set("mitu", 1);
		hoidis.save(null,{
			success: function(user){
				alert("Hoidise lisamine õnnestus!");
				getListItems();
			},
			error: function(user,error){
				alert("Hoidise lisamine ei õnnestunud!" );
				console.log(error);
			}
		});
});

//LISAMISE NUPP
$(document).on("click", "#addBtn", function(){
	$(".lisaHoidis").fadeIn();
});
var plusCount = function(id,objid){
	console.log("addmore",id);
	if (isNaN(parseInt($("#amount_"+id).text()))){
		$("#amount_"+id).text("0");
	}
	var query = new Parse.Query("Hoidised");
	query.equalTo("objectId", objid);
	query.first({
		success: function(data){
			console.log("query #1 success");
			data.save(null,{
				success: function(d){
					console.log("query #2 success");
					console.log($("#amount_"+id).text());
					d.set("mitu", parseInt($("#amount_"+id).text())+1);
					d.save(null, function(){
						console.log("query saved #3");
						$("#amount_"+id).text(parseInt($("#amount_"+id).text())+1);
					});
					console.log("new amount", $("#amount_"+id).text()+1);
				}
			});
		}
	});
};

var minusCount = function(id, objid){
	console.log("minus item",id);
	if (isNaN(parseInt($("#amount_"+id).text()))){
		$("#amount_"+id).text("1");
	}
	if ( parseInt($("#amount_"+id).text()) < 2 ){
		var q = new Parse.Query("Hoidised");
		q.equalTo("objectId", objid);
		q.first({
			success: function(data){
				data.destroy({
					success:function(d){
						console.log("data deleted successfully", d);
						getListItems();
					},
					error: function(d){
						console.log("data deletion error", d);
					}
				});
			}
		});
	} else {
		var query = new Parse.Query("Hoidised");
		query.equalTo("objectId", objid);
		query.first({
			success: function(data){
				console.log("query #1 success");
				data.save(null,{
					success: function(d){
						console.log("query #2 success");
						console.log($("#amount_"+id).text());
						d.set("mitu", parseInt($("#amount_"+id).text())-1);
						d.save(null, function(){
							console.log("query saved #3");
							$("#amount_"+id).text(parseInt($("#amount_"+id).text())-1);
						});
						//console.log("new amount", $("#amount_"+id).text()+1);
					}
				});
			}
		});
	}
};

//MUUDA PAROOLI
$(document).on("click", "#changePw", function(){
	var password = $(".changePw #password").val();
	var passwordAgain = $(".changePw #passwordAgain").val();
	if (password == passwordAgain){
		var user =  Parse.User.current();
		user.set("password", password);
		user.save(null,{
			success: function(user){
				alert("Parooli muutmine õnnestus!");
			},
			error: function(user,error){
				alert("Error: "+error.code + " " +error.message );
			}
		});
	}
});

var showList = function(data,d2){
	d2 = d2 ? d2 : itemsids;
	var t = '' ;
	var s = '';
	var i = 0;
	data.forEach(function(d){
		s+=
		console.log(d);
		t += '<div class="row"><div class="col-xs-8" style="margin-top:27px;">'+
		'<div class="panel-group" id="accordion">'+
		'<div class="panel panel-default">'+
		'<div class="panel-heading">'+
			'<h4 class="panel-title">'+
				'<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'">'+d.name+' (<span id="amount_'+i+'">'+d.mitu+'</span>)'+'<div id="info" class="info"></div></a>'+
			'</h4>'+
		'</div>'+
		'<div id="collapse'+i+'" class="panel-collapse collapse in">'+
			'<div class="panel-body" id="info"> <label>Koostis:</label>'+d.content+'</br><label>Asukoht:</label>'+d.location+'</br><label>Valmistamise kuupäev:</label>'+d.makeDate+'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			''+
				'<div class="col-xs-4"><div class="btn-group">'+
					'<button onclick="plusCount('+i+',\''+d2[i]+'\')" type="button" class="btn btn-default lisaHoidis"><div class="glyphicon glyphicon-plus"></div></button>'+
					'<button onclick="minusCount('+i+',\''+d2[i]+'\')" type="button" class="btn btn-default"><div class="glyphicon glyphicon-minus"></div></button>'+
				'</div>'+
			'</div></div>';


		i++;
	}) ;
	document.getElementById("item_list").innerHTML = t;

};

//HOIDISTE KUVAMINE
$(document).ready(".info",function(){
	var user = Parse.User.current();
	var username = user.get("username");
	var username1 = Parse.Hoidised.get("username");
	if(username == username1){
		var hoidis = Parse.Hoidised.get("name");

	} else {

	}
});

$(document).on("click", "#koostis", function(){
	var bycontent = listitems.slice(0);
	bycontent.sort(function(a,b){
		var x = a.content.toLowerCase();
		var y = b.content.toLowerCase();
		return x < y ? -1 : x > y ? 1 : 0;
	});
	console.log("by content sort", bycontent);
	showList(bycontent);
});

$(document).on("click", "#asukoht", function(){
	var bylocation = listitems.slice(0);
	bylocation.sort(function(a,b){
		var x = a.location.toLowerCase();
		var y = b.location.toLowerCase();
		return x < y ? -1 : x > y ? 1 : 0;
	});
	console.log("by content sort", bylocation);
	showList(bylocation);
});

$(document).on("click", "#kuupaev", function(){
	var bydate = listitems.slice(0);
	bydate.sort(function(a,b){
		return a.makeDate - b.makeDate;
	});
	console.log("by content sort", bydate);
	showList(bydate);
});
//HOIDISTE KUVAMINE
// sellega peaks küsima andmeid Parse andmebaasis, see listItem on äkki andmetabeli nimi
var getListItems = function(){
	listitems = [];
	itemsids = [];
	var query = new Parse.Query("Hoidised");
	// siin siis reastame kuupäeva järgi kahanevas järjekorras
	query.descending("createdAt");
	// siin nüüd võtame ainult 10 viimast
	//query.limit(10);
	// siin siis vist käsk fetchimiseks, et võtab andmed andmebaasist ja määrame ära kaks funktsiooni. kui on success ja kui on error.
	query.find({
		success: function(data) {
			// siin peaks kätte saama andmed andmebaasist ja siis saab edasi tegeleda nende kuvamisega
			//console.log("QUERY SUCCESS", data);
			console.log(data);
	    data.forEach(function(d){
	        //console.log(d) ;
					listitems.push(d.attributes);

	    }) ;
			data.forEach(function(d){
				itemsids.push(d.id);
			});
	    showList(listitems,itemsids);
		},
		error: function(data){
			// see on selleks, kui tekib error andmete kättesaamisega
			//console.log("QUERY FAILED",data);
		}
	});
};
getListItems();
