"use strict";var _Mathfloor=Math.floor;let a={init(b,{autoPlay:c=!0,interval:d=1e4}={}){this.items||(this.items=b,this.slideOrder=this.getRndOrder(),this.activeIdx=this.slideOrder[_Mathfloor(Math.random()*this.slideOrder.length)],this.items[this.slideOrder[this.activeIdx]].classList.add("active"),this.interval=Math.max(d,1500),!1!==c&&this.play())},getRndOrder(){let b=this.items.length,c=Array(b);for(let d=0;d<b;d++)c[d]=d;for(let d=b-1;0<d;d--){let e=_Mathfloor(Math.random()*d+1),f=c[d];c[d]=c[e],c[e]=f}return c},slide(b=a.activeIdx+1){this.items[this.slideOrder[this.activeIdx]].classList.remove("active"),this.activeIdx=b%this.slideOrder.length,this.items[this.slideOrder[this.activeIdx]].classList.add("active")},play(){this.intervalId||(this.intervalId=setInterval(()=>this.slide(),this.interval))},pause(){clearInterval(this.intervalId),this.intervalId=null},goto(b){b%=this.slideOrder.length,b!==this.slideOrder[this.activeIdx]&&this.slide(this.slideOrder.indexOf(b))}};module.exports={init:a.init.bind(a),play:a.play.bind(a),pause:a.pause.bind(a),goto:a.goto.bind(a)};