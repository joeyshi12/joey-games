(()=>{"use strict";var t={9458:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i,o){this._ctx=t,this.posX=e,this.posY=s,this._sprite=i,this._unitLength=o}draw(){this._ctx.drawImage(this._sprite,this.posX*this._unitLength,this.posY*this._unitLength,this._unitLength,this._unitLength)}updatePosition(t,e){this.posX=t,this.posY=e}}},950:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i,o,n){this._ctx=t,this._scoreElement=e,this._snake=s,this._food=i,this._gridSize=o,this._length=n}start(){this._ctx.fillStyle="#fff",this._ctx.fillRect(0,0,this._ctx.canvas.width,this._ctx.canvas.height),window.addEventListener("keydown",this._handleKeyDown.bind(this)),requestAnimationFrame((t=>{this._previousTimeStamp=t,requestAnimationFrame(this._gameLoop.bind(this))}))}get score(){return this._snake.size-3}_gameLoop(t){t-this._previousTimeStamp>80&&(this._draw(),this._previousTimeStamp=t),requestAnimationFrame(this._gameLoop.bind(this))}_draw(){this._ctx.fillStyle="#fff",this._ctx.fillRect(0,0,this._ctx.canvas.width,this._ctx.canvas.height),this._food.draw(),this._snake.draw(),this._snake.isHeadAtPos(this._food.posX,this._food.posY)&&(this._snake.grow(),this._setNextFoodPosition(),this._updateScoreText()),this._ctx.fillStyle="#000";for(let t=1;t<this._gridSize;t++){const e=t*this._length-1;this._ctx.fillRect(e,0,1,this._ctx.canvas.height),this._ctx.fillRect(0,e,this._ctx.canvas.width,1)}}_handleKeyDown(t){switch(t.key.toLowerCase()){case"w":case"arrowup":this._snake.setDirection(0,-1);break;case"a":case"arrowleft":this._snake.setDirection(-1,0);break;case"s":case"arrowdown":this._snake.setDirection(0,1);break;case"d":case"arrowright":this._snake.setDirection(1,0)}}_setNextFoodPosition(){const t=this._gridSize*this._gridSize,e=Math.floor(Math.random()*t);for(let s=0;s<t;s++){const i=(s+e)%t,o=i%this._gridSize,n=Math.floor(i/this._gridSize);if(!this._snake.contains(o,n)){this._food.updatePosition(o,n);break}}}_updateScoreText(){this._scoreElement.textContent=String(this.score)}}},9237:function(t,e,s){var i,o,n,r,h=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=h(s(950)),d=h(s(5491)),c=h(s(9458)),l=s(7130),_=document.createElement("canvas");null===(i=document.getElementById("canvas-container"))||void 0===i||i.appendChild(_),_.width=480,_.height=480;const u=_.getContext("2d",{alpha:!1});if(!u)throw new Error("2d context is not supported by browser");const p=null===(o=document.getElementById("score-field"))||void 0===o?void 0:o.getElementsByTagName("span")[0];if(!p)throw Error("score-field element not found");const f=null===(n=document.getElementById("name-field"))||void 0===n?void 0:n.getElementsByTagName("input")[0];if(!f)throw Error("name-field element not found");const m=null===(r=document.getElementById("submit-button"))||void 0===r?void 0:r.getElementsByTagName("button")[0];if(!m)throw Error("submit-button element not found");Promise.all([function(t){const e=new Image;return new Promise(((s,i)=>{e.onload=()=>{s(e)},e.onerror=()=>{i(`Could not load image [${t}]`)},e.src=t}))}("/images/apple.png"),(0,l.loadAudioBuffer)("/sounds/pop.wav")]).then((([t,e])=>{const s=new l.Sound(e),i=new d.default(u,f,m,s,16,30),o=new c.default(u,10,10,t,30),n=new a.default(u,p,i,o,16,30);m.addEventListener("click",(()=>{const t=f.value;if(t.length<3)return void alert("Name is too short");if(t.length>8)return void alert("Name is too long");const e={score:n.score,playerName:t};fetch("/snake/scores",{method:"put",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((()=>{window.location.reload()})).catch((t=>{console.error(t)}))})),n.start()})),fetch("/snake/scores").then((t=>{var e;const s=null===(e=document.getElementById("score-table"))||void 0===e?void 0:e.getElementsByTagName("tbody")[0];s?t.json().then((t=>{var e;for(const i of t){const t=s.insertRow(),o=t.insertCell(),n=document.createTextNode(String(i.score));o.appendChild(n);const r=t.insertCell(),h=document.createTextNode(i.playerName);r.appendChild(h);const a=t.insertCell(),d=document.createTextNode(null!==(e=i.creationDate)&&void 0!==e?e:"");a.appendChild(d)}})):console.warn("Score table body not found")}))},5491:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i,o,n){this._ctx=t,this._nameInputElement=e,this._submitButtonElement=s,this._growSound=i,this._gridSize=o,this._unitLength=n,this.isDead=!1,this._dx=0,this._dy=0,this._posX=[5,4,3],this._posY=[10,10,10]}draw(){this.isDead||(this.isDead=this._hasCollided(),this.isDead&&(this._nameInputElement.disabled=!1,this._submitButtonElement.disabled=!1)),this.isStationary()||this.isDead||(this._posX.unshift(this._posX[0]+this._dx),this._posY.unshift(this._posY[0]+this._dy),this._posX.pop(),this._posY.pop()),this._ctx.fillStyle=this.isDead?"#880000":"#008800";for(let t=0;t<this.size;t++)this._ctx.fillRect(this._posX[t]*this._unitLength,this._posY[t]*this._unitLength,this._unitLength,this._unitLength)}setDirection(t,e){const s=this._posX[0]-this._posX[1],i=this._posY[0]-this._posY[1];s*t<0||i*e<0||(this._dx=t,this._dy=e)}grow(){this._growSound.play(),this._posX.push(2*this._posX[this.size-1]-this._posX[this.size-2]),this._posY.push(2*this._posY[this.size-1]-this._posY[this.size-2])}isStationary(){return 0===this._dx&&0===this._dy}_hasCollided(){for(let t=1;t<this.size;t++)if(this._posX[0]===this._posX[t]&&this._posY[0]===this._posY[t])return!0;return this._posX[0]<0||this._posX[0]>=this._gridSize||this._posY[0]<0||this._posY[0]>=this._gridSize}get size(){return this._posX.length}isHeadAtPos(t,e){return this._posX[0]===t&&this._posY[0]===e}contains(t,e){for(let s=0;s<this.size;s++)if(this._posX[s]===t&&this._posY[e]===e)return!0;return!1}}},7130:function(t,e){var s,i=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(o,n){function r(t){try{a(i.next(t))}catch(t){n(t)}}function h(t){try{a(i.throw(t))}catch(t){n(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}a((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.loadAudioBuffer=e.Sound=void 0;const o=new(null!==(s=window.AudioContext)&&void 0!==s?s:window.webkitAudioContext),n=o.createGain();n.connect(o.destination),e.Sound=class{constructor(t){this._audioBuffer=t,this._gainNode=o.createGain(),this._gainNode.connect(n)}play(){const t=o.createBufferSource();t.buffer=this._audioBuffer,t.loop=!1,t.connect(this._gainNode),t.start()}},e.loadAudioBuffer=function(t){return i(this,void 0,void 0,(function*(){const e=yield(yield fetch(t)).arrayBuffer();return new Promise(((t,s)=>{o.decodeAudioData(e,(e=>t(e)),(t=>s(t)))}))}))}}},e={};!function s(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,s),n.exports}(9237)})();