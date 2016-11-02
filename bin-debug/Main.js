//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////、
var Pole = (function (_super) {
    __extends(Pole, _super);
    function Pole() {
        _super.call(this);
        this.MySta = new Stamachine;
        this.MoveSpeed = 10;
        this.Modle = 0;
        this.IdleAni = new Array();
        this.MoveAni = new Array();
        this.MyPhoto = this.createBitmapByName("10000_png");
        this.addChild(this.MyPhoto);
        this.LoadAni();
        this.anchorOffsetX = this.MyPhoto.width / 2;
        this.anchorOffsetY = this.MyPhoto.height / 2;
    }
    var d = __define,c=Pole,p=c.prototype;
    p.LoadAni = function () {
        var texture = RES.getRes("still1_png");
        texture = RES.getRes("still1_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("still2_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("still3_png");
        this.IdleAni.push(texture);
        texture = RES.getRes("still4_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("1_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("2_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("3_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("4_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("5_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("6_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("7_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("8_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("9_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("10_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("11_png");
        this.MoveAni.push(texture);
        texture = RES.getRes("12_png");
        this.MoveAni.push(texture);
    };
    p.PlayAni = function (Ani) {
        var count = 0;
        var Bit = this.MyPhoto;
        var M = this.Modle;
        console.log("M:" + M);
        var timer = new egret.Timer(125, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, Play, this);
        timer.start();
        function Play() {
            Bit.texture = Ani[count];
            if (count < Ani.length - 1) {
                //   console.log(Ani.length+" "+count);
                count++;
            }
            else {
                count = 0;
            }
            if (this.Modle != M) {
                console.log("tM:" + M + " nowM:" + this.Modle);
                timer.stop();
            }
        }
        /* 帧动画一代目
        PlayAni1();
        var timer:egret.Timernew egret.Timer(100, time);
            egret.Tween.get(Bit).wait(150).call(PlayAni2);
        }
        function PlayAni2(){
            Bit.texture=Ani[count];
            if(count<Ani.length-1){console.log(Ani.length+" "+count); count++;}
            else{count=0;}
            PlayAni1();
       }
       */
    };
    p.Move = function (x, y) {
        var MS = new MoveStage(x, y, this);
        this.MySta.Reload(MS);
    };
    p.Idle = function () {
        var IS = new IdleStage(this);
        this.MySta.Reload(IS);
    };
    /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Pole;
}(egret.DisplayObjectContainer));
egret.registerClass(Pole,'Pole');
var MoveStage = (function () {
    function MoveStage(x, y, Player) {
        this.Ty = y;
        this.Tx = x;
        this.Player = Player;
    }
    var d = __define,c=MoveStage,p=c.prototype;
    p.Load = function () {
        var _this = this;
        this.Player.Modle++;
        var xx = this.Tx - this.Player.x;
        var yy = this.Ty - this.Player.y;
        if (xx > 0) {
            this.Player.scaleX = -1;
        }
        else {
            this.Player.scaleX = 1;
        }
        var zz = Math.pow(xx * xx + yy * yy, 0.5);
        //   console.log(xx+" "+yy);
        var time = zz / this.Player.MoveSpeed;
        this.timer = new egret.Timer(50, time);
        this.LeastTime = time;
        //   console.log("time:"+time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.Player.x += xx / time;
            _this.Player.y += yy / time;
            _this.LeastTime--;
            if (_this.LeastTime < 1) {
                _this.timer.stop();
                //        this.Player.Modle=-1;
                //         console.log("1");
                if (_this.LeastTime > -10) {
                    _this.Player.Idle();
                } //意味着是走停不是逼停
            }
        }, this);
        this.timer.start();
        this.Player.PlayAni(this.Player.MoveAni);
        //     console.log("kaishiM");
    };
    p.exit = function () {
        this.LeastTime = -10;
        //       console.log("exitM");
    };
    return MoveStage;
}());
egret.registerClass(MoveStage,'MoveStage',["Sta"]);
var IdleStage = (function () {
    function IdleStage(Player) {
        this.Player = Player;
    }
    var d = __define,c=IdleStage,p=c.prototype;
    p.Load = function () {
        //      console.log("Loadidle");
        this.Player.Modle = 0;
        this.Player.PlayAni(this.Player.IdleAni);
    };
    p.exit = function () {
        //  console.log("exitIdle");
    };
    return IdleStage;
}());
egret.registerClass(IdleStage,'IdleStage',["Sta"]);
var Stamachine = (function () {
    function Stamachine() {
    }
    var d = __define,c=Stamachine,p=c.prototype;
    p.Reload = function (S) {
        if (this.nowSta) {
            this.nowSta.exit();
        }
        this.nowSta = S;
        this.nowSta.Load();
    };
    return Stamachine;
}());
egret.registerClass(Stamachine,'Stamachine');
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var sky = this.createBitmapByName("background_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.Player = new Pole();
        this.addChild(this.Player);
        this.Player.x = 450;
        this.Player.y = 850;
        this.Player.Idle();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Movegogogo, this);
        /*
                var textfield = new egret.TextField();
                this.addChild(textfield);
                textfield.alpha = 0;
                textfield.width = stageW - 172;
                textfield.textAlign = egret.HorizontalAlign.CENTER;
                textfield.size = 24;
                textfield.textColor = 0xffffff;
                textfield.x = 172;
                textfield.y = 135;
                this.textfield = textfield;
                //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
                // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
                RES.getResAsync("description", this.startAnimation, this)
        */
    };
    p.Movegogogo = function (evt) {
        this.Player.Move(evt.stageX, evt.stageY);
        //   console.log(evt.stageX+" "+evt.stageY);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map