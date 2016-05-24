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
        this.cps = 0;
        this.upgradeAmount = [0, 0, 0, 0, 0];
        this.upgradeBaseCost = [15, 100, 500, 3500, 14000];
        this.upgradeCPS = [0.1, 1, 5, 4, 13, 127];
        this.codeQuality = 0.1;
        this.writePower = 1;
        this.sellPower = 1;
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
            console.log(this.upgradeAmount.length);
            for (var s = 0; s < this.upgradeAmount.length; s++) {
                //console.log("outerloop activated for canvas "+s);
                if (this.upgradeAmount[s] > 0) {
                    for (var l = 0; l < this.upgradeAmount[s]; l++) {
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
        },
        bindEvents: function() {
            var game = this;
            $('.btn--write').click(function() {
                game.addLinesOfCode(game.writePower);
                game.updateStats();
            });
            $('.upgrade').click(function() {
                this.Index = $(".upgrade").index(this);
                console.log("upgrade" + this.Index);
                game.upgradeSkills(this.Index);
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
        },
        addLinesOfCode: function(amount) {
            this.linesOfCode += amount;
        },
        updateStats: function() {
            $('.stats__linesOfCode').html("Lines of code: "+this.linesOfCode.toFixed(1));
            $('.stats__cookieAmount').html("Cash: $"+this.cash.toFixed(2));
            $('.stats__cps').html("Lines of code per second: "+this.cps.toFixed(1));
            $('.stats__codeQuality').html("Code quality: "+this.codeQuality);
        },
        save: function() {
            localStorage.setItem("cash", JSON.stringify(this.cash));
            localStorage.setItem("cps", JSON.stringify(this.cps));
            localStorage.setItem("upgradeAmount", JSON.stringify(this.upgradeAmount));
            localStorage.setItem("upgradeCPS", JSON.stringify(this.upgradeCPS));
        },
        delete: function() {
            localStorage.removeItem("cash");
            localStorage.removeItem("cps");
            localStorage.removeItem("upgradeAmount");
            localStorage.removeItem("upgradeCPS");
            this.cash = 0;
            this.cps = 0;
            this.upgradeAmount = [0, 0, 0, 0, 0];
            this.upgradeBaseCost = [15, 100, 500, 3500, 14000];
            this.upgradeCPS = [0.1, 0, 5, 4, 13, 127];
            console.log("Save Deleted");
        },
        load: function() {
            this.cash = JSON.parse(localStorage.getItem("cash"));
            this.cps = JSON.parse(localStorage.getItem("cps"));
            for (var i = 0; i < this.upgradeAmount.length; i++) {
                this.upgradeAmount = JSON.parse(localStorage.getItem("upgradeAmount"));
                $('.upgrade .upgrade__amount').eq(i).html(this.upgradeAmount[i]);
                //var cost = Math.floor(Math.pow(10,i+1) * Math.pow(1.1,this.upgrade[i]));
                var cost = Math.floor(this.upgradeBaseCost[i] * Math.pow(1.15, this.upgradeAmount[i]));
                $('.upgrade .upgrade__cost').eq(i).html("$"+cost);
            }
        },
        upgradeSkills: function(index) {
            //var cost = Math.floor(Math.pow(10,index+1) * Math.pow(1.1,this.upgrade[index]));
            var cost = Math.floor(this.upgradeBaseCost[index] * Math.pow(1.15, this.upgradeAmount[index]));
            if (this.cash >= cost && this.cash - cost >= 0) {
                this.cash -= cost;
                //console.log(this.upgradeAmount[index]);
                this.upgradeAmount[index] += 1;
                this.cps += this.upgradeCPS[index];
                this.updateStats();
                $('.upgrade .upgrade__amount').eq(index).html(this.upgradeAmount[index]);
                cost = Math.floor(this.upgradeBaseCost[index] * Math.pow(1.15, this.upgradeAmount[index]));
                $('.upgrade .upgrade__cost').eq(index).html("$"+cost);
                this.drawCharacters(index);
                this.checkAvailable();
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
            for(var i = 0;i<this.upgradeAmount.length;i++){
                if(this.upgradeAmount[i]>0){
                    var game = this;
                    $('.upgrade').eq(i).removeClass('notAvailable');
                    $('.upgrade').eq(i+1).css('display', 'block');
                    $('.characterCanvas').eq(i).css('display', 'block');
                }
            }
        },
        checkCodeQuality: function(){
            if(this.totalLinesOfCode > this.qualityTier.indexOf(this.totalLinesOfCode)){
                this.codeQuality += 0.1;
            }
        },
        sellCode: function(amount){
            if(this.linesOfCode - amount >0){
                this.linesOfCode -= amount;
                this.cash += amount*this.codeQuality;
            }
        }
    }
    window.onload = function() {
        var app = new ClickerGame();
    };

})();