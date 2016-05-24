(function() {
    "use strict";

    var ClickerGame = function() {

        if (ClickerGame.instance) {
            return ClickerGame.instance;
        }
        //this viitab ClickerGame fn
        ClickerGame.instance = this;

        // KÕIK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
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
        this.codeQuality = 1;
        this.writePower = 1;
        this.sellPower = 1;
        this.upKeep = 0;
        console.log(this);
        this.init();
    };

    window.ClickerGame = ClickerGame;

    ClickerGame.prototype = {

        init: function() {
            console.log('###GAME STARTED###');
            if (JSON.parse(localStorage.getItem("cash"))) {
                this.load();
                console.log("###GAME LOADED###");
            } else {
                console.log("###NO SAVE FOUND###");
            }
            this.updateStats();
            this.bindEvents();
            console.log(this.codeUpgradeAmount.length);
            for (var s = 0; s < this.codeUpgradeAmount.length; s++) {
                //console.log("outerloop activated for canvas "+s);
                if (this.codeUpgradeAmount[s] > 0) {
                    for (var l = 0; l < this.codeUpgradeAmount[s]; l++) {
                        //console.log("innerloop "+l+" times");
                        this.drawCharacters(s);
                    }
                }
            }
            $('.upgrade').eq(0).css('display', 'block');
            this.checkAvailable();
            this.main();
            console.log(this.cash);
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
            this.codeUpgradeBaseCost = [15, 100, 500, 3500, 14000];
            this.codeUpgradeCPS = [0.1, 1, 5, 4, 13, 127];
            this.codeQuality = 0.1;
            this.writePower = 1;
            this.sellPower = 1;
            console.log("Save Deleted");
        },
        load: function() {
            this.cash = JSON.parse(localStorage.getItem("cash"));
            this.cps = JSON.parse(localStorage.getItem("cps"));
            for (var i = 0; i < this.codeUpgradeAmount.length; i++) {
                this.codeUpgradeAmount = JSON.parse(localStorage.getItem("codeUpgradeAmount"));
                $('.upgrade--code .upgrade__amount').eq(i).html(this.codeUpgradeAmount[i]);
                //var cost = Math.floor(Math.pow(10,i+1) * Math.pow(1.1,this.upgrade[i]));
                var cost = Math.floor(this.codeUpgradeBaseCost[i] * Math.pow(1.15, this.codeUpgradeAmount[i]));
                $('.upgrade--code .upgrade__cost').eq(i).html("$"+cost);
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
                $('.upgrade--code .upgrade__amount').eq(index).html(this.codeUpgradeAmount[index]);
                cost = Math.floor(this.codeUpgradeBaseCost[index] * Math.pow(1.15, this.codeUpgradeAmount[index]));
                $('.upgrade--code .upgrade__cost').eq(index).html("$"+cost);
                this.drawCharacters(index);
                this.checkAvailable();
                this.addUpKeep(index);
                this.checkCodeQuality(index);
            } else {
                console.log("Need mo money " + cost);
            }
        },
        upgradeMoneySkills: function(index) {
            //var cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
            var cost = Math.floor(this.codeUpgradeBaseCost[index] * Math.pow(1.15, this.codeUpgradeAmount[index]));
            if (this.cash >= cost && this.cash - cost >= 0) {
                this.cash -= cost;
                //console.log(this.codeUpgradeAmount[index]);
                this.codeUpgradeAmount[index] += 1;
                this.cps += this.codeUpgradeCPS[index];
                this.updateStats();
                $('.upgrade .upgrade__amount').eq(index).html(this.codeUpgradeAmount[index]);
                cost = Math.floor(this.codeUpgradeBaseCost[index] * Math.pow(1.15, this.codeUpgradeAmount[index]));
                $('.upgrade .upgrade__cost').eq(index).html("$"+cost);
                this.drawCharacters(index);
                this.checkAvailable();
                this.upkeep += this.codeUpgradeBaseCost[index]/10;
            } else {
                console.log("Need mo money " + cost);
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
            console.log("Drew a character on canvas " + index);
        },
        checkAvailable: function(){
            for(var i = 0;i<this.codeUpgradeAmount.length;i++){
                if(this.codeUpgradeAmount[i]>0){
                    var game = this;
                    $('.upgrade').eq(i).removeClass('notAvailable');
                    $('.upgrade').eq(i+1).css('display', 'block');
                    $('.characterCanvas').eq(i).css('display', 'block');
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
        }
    }
    window.onload = function() {
        var app = new ClickerGame();
    };

})();