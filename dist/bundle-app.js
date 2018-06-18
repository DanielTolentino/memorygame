!function(t){var e={};function a(r){if(e[r])return e[r].exports;var c=e[r]={i:r,l:!1,exports:{}};return t[r].call(c.exports,c,c.exports,a),c.l=!0,c.exports}a.m=t,a.c=e,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)a.d(r,c,function(e){return t[e]}.bind(null,c));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=1)}([function(t,e,a){"use strict";a.r(e);const r=3,c=1e3,n=7;var o=class{constructor(){this.deck=null,this.gameDeck=[],this.gameUI=null,this.turnCount=0,this.playerRating=r,this.firstCard=void 0,this.wait=(t=>new Promise((e,a)=>setTimeout(e,t)))}setDeck(t){this.deck=t}setGameUI(t){this.gameUI=t}getGameDeck(){return this.gameDeck}startNewGame(){this.turnCount=1,this.flipCount=0,this.gameDeck=this.deck.shuffle(),this.gameUI.buildDeck(this.gameDeck)}async turn(t,e){return this.turnCount+=1,this.flipCount+=1,this.gameUI.turnCardFaceUp(t),this.flipCount>1?(console.log("flip count: ",this.flipCount),this.deck.isSymbolMatch(this.gameDeck,this.firstCard,e)||(console.log("not matched!"),await this.wait(c),this.gameUI.turnCardFaceDown(document.getElementById(`${this.firstCard}`)),this.gameUI.turnCardFaceDown(document.getElementById(`${e}`))),this.firstCard=void 0,this.flipCount=0):this.firstCard=e,this.turnCount>=n&&(this.firstCard=void 0,this.flipCount=0,this.turnCount=0,this.playerRating=r,!0)}};var s=class{buildDeck(t){const e=document.createDocumentFragment();t.forEach((t,a)=>{const r=document.createElement("li");r.setAttribute("id",`${a}`),r.setAttribute("class","card");const c=document.createElement("i");c.setAttribute("class",`fa ${t.symbol}`),r.appendChild(c),e.appendChild(r)}),document.querySelector(".deck").appendChild(e)}turnCardFaceDown(t){t.setAttribute("class","card")}turnCardFaceUp(t){let e=t.getAttribute("class")+" open faceup ";t.setAttribute("class",e)}};const i=new class{constructor(){this.templateCardDeck=[{symbol:"fa-diamond",faceup:!1,matched:!1},{symbol:"fa-diamond",faceup:!1,matched:!1},{symbol:"fa-paper-plane-o",faceup:!1,matched:!1},{symbol:"fa-paper-plane-o",faceup:!1,matched:!1},{symbol:"fa-anchor",faceup:!1,matched:!1},{symbol:"fa-anchor",faceup:!1,matched:!1},{symbol:"fa-bolt",faceup:!1,matched:!1},{symbol:"fa-bolt",faceup:!1,matched:!1},{symbol:"fa-cube",faceup:!1,matched:!1},{symbol:"fa-cube",faceup:!1,matched:!1},{symbol:"fa-leaf",faceup:!1,matched:!1},{symbol:"fa-leaf",faceup:!1,matched:!1},{symbol:"fa-bicycle",faceup:!1,matched:!1},{symbol:"fa-bicycle",faceup:!1,matched:!1},{symbol:"fa-bomb",faceup:!1,matched:!1},{symbol:"fa-bomb",faceup:!1,matched:!1}]}isSymbolMatch(t,e,a){return t[e].symbol===t[a].symbol}shuffle(){let t,e,a=this.templateCardDeck,r=a.length;for(;0!==r;)e=Math.floor(Math.random()*r),t=a[r-=1],a[r]=a[e],a[e]=t;return a}},u=new o,l=new s;u.setDeck(i),u.setGameUI(l),u.startNewGame(),document.querySelector(".deck").addEventListener("click",t=>{console.log("selected card id: ",t.target.getAttribute("id")),u.turn(t.target,t.target.getAttribute("id"))})},function(t,e,a){t.exports=a(0)}]);