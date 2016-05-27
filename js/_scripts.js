(function() {
    "use strict";

    var ClickerGame = function() {

        if (ClickerGame.instance) {
            return ClickerGame.instance;
        }
        //this viitab ClickerGame fn
        ClickerGame.instance = this;

        // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
        this.userName = "local";
        this.cash = 0;
        this.linesOfCode = 0;
        this.totalLinesOfCode = 0;
        this.totalLinesOfCodeClicked = 0;
        this.cps = 0;
        this.codeUpgradeAmount = [0, 0, 0, 0, 0];
        this.codeUpgradeBaseCost = [15, 100, 500, 3500, 14000];
        this.codeUpgradeCPS = [0.1, 1, 5, 4, 13, 127];
        this.codeUpgradeQuality = [-0.05, 1, 8, 15, 23];
        this.codeUpgradeSalaries = [5, 33, 150, 1100, 4500]
        this.marketingUpgradeAmount = [0, 0, 0, 0, 0];
        this.marketingUpgradeBaseCost = [1, 10, 600, 2000, 4500, 24000];
        this.marketingUpgradeSalaries = [0, 0, 200, 450, 1500, 6000];
        this.marketingUpgradePower = [0.1, 0.3, 0, 5, 0, 200];
        this.codeQuality = 1;
        this.writePower = 1;
        this.sellPower = 1;
        this.upKeep = 0;
        this.loggedIn = 0;
        this.pw = "";
        //console.log(this);
        this.init();
    };

    window.ClickerGame = ClickerGame;

    ClickerGame.prototype = {

        init: function() {
            console.log('###NEW GAME###');
            if (JSON.parse(localStorage.getItem("cash"))) {
                this.load();
                console.log("###SAVE LOADED###");
            } else {
                console.log("###NO SAVE FOUND###");
            }
            this.updateStats();
            this.bindEvents();
            //console.log(this.codeUpgradeAmount.length);
            for (var s = 0; s < this.codeUpgradeAmount.length; s++) {
                //console.log("outerloop activated for canvas "+s);
                if (this.codeUpgradeAmount[s] > 0) {
                    for (var l = 0; l < this.codeUpgradeAmount[s]; l++) {
                        //console.log("innerloop "+l+" times");
                        this.drawCharacters(s);
                    }
                }
            }
            $('.upgrade--money').eq(0).css('display', 'block');
            $('.upgrade--code').eq(0).css('display', 'block');
            this.checkAvailable();
            this.main();
        },
        main: function() {
            var game = this;
            setInterval(function() {
                game.addLinesOfCode(game.cps);
                game.updateStats();
                game.save();
            }, 1000);
            setInterval(function(){
                game.cash -= game.upKeep;
            }, 30000)
        },
        bindEvents: function() {
            var game = this;
            $('.btn--write').click(function() {
                game.addLinesOfCode(game.writePower);
                game.totalLinesOfCodeClicked += game.writePower;
                game.updateStats();
            });
            $('.upgrade--code').click(function() {
                this.Index = $(".upgrade--code").index(this);
                //console.log("upgrade" + this.Index);
                game.upgradeCodeSkills(this.Index);
            });
            $('.upgrade--money').click(function() {
                this.Index = $(".upgrade--money").index(this);
                //console.log("upgrade" + this.Index);
                game.upgradeMoneySkills(this.Index);
            });
            $('.btn--delete').click(function() {
                game.delete();
            });
            $('.btn--testing').click(function() {
                game.cash = 99999999999;
            });
            $('.btn--sell').click(function(){
                game.sellCode(game.sellPower);
                game.updateStats();
            });
            $('.btn--codeUpgrades').click(function(){
                $('.moneyUpgradeTab').removeClass('is-visible');
                $('.codeUpgradeTab').addClass('is-visible');
            });
            $('.btn--moneyUpgrades').click(function(){
                $('.moneyUpgradeTab').addClass('is-visible');
                $('.codeUpgradeTab').removeClass('is-visible');
            });
            $('.btn--overlay').click(function(){
            	$('.overlay').show("fast");
            });
            $('.overlay').click(function(){
            	if(event.target.matches('.overlay')){
            		$('.overlay').hide("fast");
            	}
            });
            $('.btn--login').click(function(){
            	game.userName = $('.username').val();
            	game.pw = $('.password').val();
            	console.log(game.userName);
            	game.loadFromServer();
            });
        },
        addLinesOfCode: function(amount) {
            this.linesOfCode += amount;
            this.totalLinesOfCode += amount;
        },
        updateStats: function() {
            this.linesOfCode = parseFloat(this.linesOfCode.toFixed(1));
            this.cash = parseFloat(this.cash.toFixed(2));
            this.cps = parseFloat(this.cps.toFixed(1));
            $('.stats__linesOfCode').html("Lines of code: "+this.linesOfCode);
            $('.stats__cookieAmount').html("Cash: $"+this.cash);
            $('.stats__cps').html("Lines of code per second: "+this.cps);
            $('.stats__codeQuality').html("Code quality: "+this.codeQuality);
            $('.stats__upKeep').html("Salaries: $"+this.upKeep);
        },
        save: function() {
            localStorage.setItem("cash", JSON.stringify(this.cash));
            localStorage.setItem("cps", JSON.stringify(this.cps));
            localStorage.setItem("codeUpgradeAmount", JSON.stringify(this.codeUpgradeAmount));
            localStorage.setItem("codeUpgradeCPS", JSON.stringify(this.codeUpgradeCPS));
            localStorage.setItem("linesOfCode", JSON.stringify(this.linesOfCode));
            localStorage.setItem("totalLinesOfCodeClicked", JSON.stringify(this.totalLinesOfCodeClicked));
            localStorage.setItem("codeQuality", JSON.stringify(this.codeQuality));
            localStorage.setItem("upKeep", JSON.stringify(this.upKeep));
            if(this.loggedIn==1){
            	this.saveToServer();
            }
        },
        delete: function() {
            localStorage.removeItem("cash");
            localStorage.removeItem("cps");
            localStorage.removeItem("codeUpgradeAmount");
            localStorage.removeItem("codeUpgradeCPS");
            localStorage.removeItem("linesOfCode");
            localStorage.removeItem("totalLinesOfCodeClicked");
            localStorage.removeItem("upKeep");
            this.cash = 0;
            this.linesOfCode = 0;
            this.totalLinesOfCodeClicked = 0;
            this.cps = 0;
            this.codeUpgradeAmount = [0, 0, 0, 0, 0];
            this.codeUpgradeBaseCost = [20, 150, 750, 5000, 20000];
            this.codeUpgradeCPS = [0.1, 1, 5, 4, 13, 127];
            this.codeQuality = 0.1;
            this.writePower = 1;
            this.sellPower = 1;
            this.deleteFromServer();
            this.userName = "local";
            this.loggedIn = 0;
            console.log("Save Deleted");
        },
        load: function() {
            this.cash = JSON.parse(localStorage.getItem("cash"));
            this.cps = JSON.parse(localStorage.getItem("cps"));
            for (var i = 0; i < this.codeUpgradeAmount.length; i++) {
                this.codeUpgradeAmount = JSON.parse(localStorage.getItem("codeUpgradeAmount"));
                $('.upgrade--code .upgrade__amount').eq(i).html("amount: "+this.codeUpgradeAmount[i]);
                //var cost = Math.floor(Math.pow(10,i+1) * Math.pow(1.1,this.upgrade[i]));
                var cost = Math.floor(this.codeUpgradeBaseCost[i] * Math.pow(1.15, this.codeUpgradeAmount[i]));
                $('.upgrade--code .upgrade__stats').eq(i).html("<span class='upgrade--cost'>cost: -$"+cost+"</span> | <span class='upgrade--salary'>salary: -$"+this.codeUpgradeSalaries[i]+"</span>");
            }
            this.linesOfCode = JSON.parse(localStorage.getItem("linesOfCode"));
            this.totalLinesOfCodeClicked = JSON.parse(localStorage.getItem("totalLinesOfCodeClicked"));
            this.codeQuality = JSON.parse(localStorage.getItem("codeQuality"));
            this.upKeep = JSON.parse(localStorage.getItem("upKeep"));
        },
        upgradeCodeSkills: function(index) {
            //var cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
            var cost = Math.floor(this.codeUpgradeBaseCost[index] * Math.pow(1.15, this.codeUpgradeAmount[index]));
            if (this.cash - cost >= 0) {
                this.cash -= cost;
                //console.log(this.codeUpgradeAmount[index]);
                this.codeUpgradeAmount[index] += 1;
                this.cps += this.codeUpgradeCPS[index];
                this.updateStats();
                $('.upgrade--code .upgrade__amount').eq(index).html("amount: "+this.codeUpgradeAmount[index]);
                cost = Math.floor(this.codeUpgradeBaseCost[index] * Math.pow(1.15, this.codeUpgradeAmount[index]));
                $('.upgrade--code .upgrade__stats').eq(index).html("<span class='upgrade--cost'>cost: -$"+cost+"</span> | <span class='upgrade--salary'>salary: -$"+this.codeUpgradeSalaries[index]+"</span>");
                this.drawCharacters(index);
                this.checkAvailable();
                this.addUpKeep(index);
                this.checkCodeQuality(index);
            } else {
                console.log("Need more money " + cost);
            }
        },
        upgradeMoneySkills: function(index) {
            //var cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
            var cost = Math.floor(this.marketingUpgradeBaseCost[index] * Math.pow(1.3, this.marketingUpgradeAmount[index]));
            if (this.cash - cost >= 0) {
                this.cash -= cost;
                //console.log(this.codeUpgradeAmount[index]);
                this.marketingUpgradeAmount[index] += 1;
                this.updateStats();
                $('.upgrade--money .upgrade__amount').eq(index).html(this.marketingUpgradeAmount[index]);
                cost = Math.floor(this.marketingUpgradeBaseCost[index] * Math.pow(1.3, this.marketingUpgradeAmount[index]));
                $('.upgrade--money .upgrade__stats').eq(index).html("$"+cost);
                this.sellPower += this.marketingUpgradePower[index];
                this.checkAvailable();
            } else {
                console.log("Need more money " + cost);
            }
        },
        drawCharacters: function(index) {
            var canvas = document.querySelectorAll('.characterCanvas')[index];
            var ctx = canvas.getContext('2d');
            var i1 = new Image();
            i1.onload = function() {
                ctx.drawImage(i1, Math.floor(Math.random() * (795 - 5) + 5), Math.floor(Math.random() * (128 - 64) + 64));
            };
            i1.src = '' + index + '.png';
            //console.log("Drew a character on canvas " + index);
        },
        checkAvailable: function(){
            for(var i = 0;i<this.codeUpgradeAmount.length;i++){
                if(this.codeUpgradeAmount[i]>0){
                    var game = this;
                    $('.upgrade--code').eq(i).removeClass('notAvailable');
                    $('.upgrade--code').eq(i+1).css('display', 'block');
                    $('.characterCanvas').eq(i).css('display', 'block');
                }
            }
            for(var i = 0;i<this.marketingUpgradeAmount.length;i++){
                //console.log(this.marketingUpgradeAmount[i]);
                if(this.marketingUpgradeAmount[i]>0){
                    var game = this;
                    $('.upgrade--money').eq(i).removeClass('notAvailable');
                    $('.upgrade--money').eq(i+1).css('display', 'block');
                }
            }
        },
        checkCodeQuality: function(index){
            var quality = 0;
            quality += this.codeUpgradeQuality[index];
            var amount = 0;
            for(var i = 0;i<this.codeUpgradeAmount.length;i++){
                amount += this.codeUpgradeAmount[i];
            }
            this.codeQuality += (quality/amount);
            this.codeQuality = parseFloat(this.codeQuality.toFixed(1));
        },
        addUpKeep: function(index){
            this.upKeep += this.codeUpgradeSalaries[index];
        },
        sellCode: function(amount){
            if(this.linesOfCode - amount >= 0){
                this.linesOfCode -= amount;
                this.cash += amount*this.codeQuality;
            }
        },
        saveToServer: function(){
            $.post("save.php", {
            	user: this.userName,
            	cps:this.cps,
            	cash:this.cash,
            	codeQuality:this.codeQuality,
            	codeUpgradeAmount:this.codeUpgradeAmount,
            	codeUpgradeCPS:this.codeUpgradeCPS,
            	linesOfCode:this.linesOfCode,
            	totalLinesOfCodeClicked:this.totalLinesOfCodeClicked,
            	upKeep:this.upKeep
            });
        },
        loadFromServer: function(){
            var game = this;
            $.getJSON("accounts/"+game.userName+".json")
            .done(function(result){
            	game.loggedIn = 1;
            	console.log("###LOGGED IN###");
            	if(game.pw == result[0].pw){
            		console.log(result[0]);
            	}
            }).fail(function(){
	            $.post("create.php", {
	            	user: game.userName,
	            	pw: game.pw
	            });
            });
        },
        deleteFromServer: function(){
        	$.post("delete.php", {
            	user: this.userName,
            });
        },
    }
    window.onload = function() {
        var app = new ClickerGame();
    };

})();
