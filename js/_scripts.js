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
        this.cps = 0;
        this.upgradeAmount = [0, 0, 0, 0, 0];
        this.upgradeBaseCost = [15, 100, 500, 3500, 14000];
        this.upgradeCPS = [0.1, 1, 5, 4, 13, 127];
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
            this.main();
            console.log(this.cash);
        },
        main: function() {
            var game = this;
            setInterval(function() {
                game.addCookie(game.cps);
                game.updateStats();
                game.save();
            }, 1000);
        },
        bindEvents: function() {
            var game = this;
            $('.btn--cookie').click(function() {
                game.addCookie(1);
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
                game.cash = 9999999;
            });
        },
        addCookie: function(amount) {
            this.cash += amount;
        },
        updateStats: function() {
            $('.stats__cookieAmount').html(this.cash.toFixed(2) + "$");
            $('.stats__cps').html(this.cps.toFixed(2) + "$");
        },
        save: function() {
            localStorage.setItem("cash", JSON.stringify(this.cash));
            localStorage.setItem("cps", JSON.stringify(this.cps));
            localStorage.setItem("upgradeAmount", JSON.stringify(this.upgradeAmount));
            localStorage.setItem("upgradeCPS", JSON.stringify(this.upgradeCPS));
        },
        delete: function() {
            localStorage.removeItem("cookies");
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
                $('.upgrade .upgrade__cost').eq(i).html(cost + "$");
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
                $('.upgrade .upgrade__cost').eq(index).html(cost + "$");
                this.drawCharacters(index);
            } else {
                console.log("Need mo money " + cost);
            }
        },
        drawCharacters: function(index) {
            var canvas = document.querySelectorAll('.characterCanvas')[index];
            var ctx = canvas.getContext('2d');
            var i1 = new Image();
            i1.onload = function() {
                ctx.drawImage(i1, Math.floor(Math.random() * (795 - 5) + 5), Math.floor(Math.random() * (195 - 5) + 5));
            };
            i1.src = '' + index + '.png';
            console.log("Drew a character on canvas " + index);
        }
    }
    window.onload = function() {
        var app = new ClickerGame();
    };

})();