var e={},t={},s=(t={getRandomIndex:function(e){return Math.floor(Math.random()*e)},createFreeNumber:function(e,t){return .9>Math.random()?e:t}}).getRandomIndex,l=t.createFreeNumber;class r{constructor(e){if(this.state=[],e)this.state=e;else for(let e=0;e<4;e++)this.state.push([,,,,].fill(0));this.status="idle",this.score=0,this.initialState=JSON.parse(JSON.stringify(this.state))}getState(){return this.state}getScore(){return this.score}getStatus(){return this.status}static getFreeCells(e){let t=[];for(let s=0;s<e.length;s++){let l=e[s];if(l.some(e=>0===e))for(let e=0;e<l.length;e++)0===l[e]&&t.push([s,e])}return t}static fillRandomCell(e){let t=r.getFreeCells(e),i=t.length;if(0===i)return;let[n,a]=t[s(i)];e[n][a]=l(2,4)}static moveFilledCellsRight(e){e.forEach((t,s)=>{let l=t.filter(e=>0!==e),r=Array(t.length-l.length).fill(0);e[s]=r.concat(l)})}static moveFilledCellsLeft(e){e.forEach((t,s)=>{let l=t.filter(e=>0!==e),r=Array(t.length-l.length).fill(0);e[s]=l.concat(r)})}static moveFilledCellsDown(e){for(let t=0;t<e.length;t++){let s=[],l=[];for(let r=0;r<e[t].length;r++)0===e[r][t]?l.push(e[r][t]):s.push(e[r][t]);let r=l.concat(s);if(l.length)for(let s=0;s<e[t].length;s++)e[s][t]=r[s]}}static moveFilledCellsUp(e){for(let t=0;t<e.length;t++){let s=[],l=[];for(let r=0;r<e[t].length;r++)0===e[r][t]?l.push(e[r][t]):s.push(e[r][t]);let r=s.concat(l);if(l.length)for(let s=0;s<e[t].length;s++)e[s][t]=r[s]}}static canMove(e){for(let t=0;t<e.length;t++){let s=e[t];for(let l=0;l<s.length-1;l++)if(s[l]===s[l+1]||e[l][t]===e[l+1][t])return!0}return!1}static isstateChanged(e,t){let s=!1;return e.forEach((e,l)=>{e.every((e,s)=>t[l][s]===e)||(s=!0)}),s}static checkStatus(e){let t=e.state;t.forEach(t=>{t.some(e=>2048===e)&&(e.status="win")});let s=r.getFreeCells(t);r.canMove(t)||0!==s.length||(e.status="lose")}static checkAfterMove(e,t,s){r.isstateChanged(t,s)&&r.fillRandomCell(s),r.checkStatus(e)}start(){this.status="playing";for(let e=0;e<2;e++)r.fillRandomCell(this.state)}restart(){this.state=JSON.parse(JSON.stringify(this.initialState)),this.status="idle",this.score=0}moveRight(){if("playing"!==this.status)return;let e=this.state,t=JSON.parse(JSON.stringify(e));r.moveFilledCellsRight(e);for(let t=0;t<e.length;t++){let s=e[t];for(let e=s.length-1;e>0;e--)s[e]===s[e-1]&&0!==s[e]&&(s[e-1]=0,s[e]*=2,this.score+=s[e])}r.moveFilledCellsRight(e),r.checkAfterMove(this,t,e)}moveLeft(){if("playing"!==this.status)return;let e=this.state,t=JSON.parse(JSON.stringify(e));r.moveFilledCellsLeft(e);for(let t=0;t<e.length;t++){let s=e[t];for(let e=0;e<s.length-1;e++)s[e]===s[e+1]&&0!==s[e]&&(s[e]*=2,s[e+1]=0,this.score+=s[e])}r.moveFilledCellsLeft(e),r.checkAfterMove(this,t,e)}moveDown(){if("playing"!==this.status)return;let e=this.state,t=JSON.parse(JSON.stringify(e));r.moveFilledCellsDown(e);for(let t=0;t<e.length;t++)for(let s=e[t].length-1;s>0;s--)e[s][t]===e[s-1][t]&&0!==e[s][t]&&(e[s][t]*=2,e[s-1][t]=0,this.score+=e[s][t]);r.moveFilledCellsDown(e),r.checkAfterMove(this,t,e)}moveUp(){if("playing"!==this.status)return;let e=this.state,t=JSON.parse(JSON.stringify(e));r.moveFilledCellsUp(e);for(let t=0;t<e.length;t++)for(let s=0;s<e[t].length-1;s++)e[s][t]===e[s+1][t]&&0!==e[s][t]&&(e[s][t]*=2,e[s+1][t]=0,this.score+=e[s][t]);r.moveFilledCellsUp(e),r.checkAfterMove(this,t,e)}}e=r;const i=document.querySelector(".button"),n=document.querySelector(".message-start"),a=document.querySelector(".message-win"),o=document.querySelector(".message-lose"),c=document.querySelector(".game-score"),h=new e;d();const f=e=>{switch(e.code){case"ArrowLeft":h.moveLeft();break;case"ArrowRight":h.moveRight();break;case"ArrowDown":h.moveDown();break;case"ArrowUp":h.moveUp();break;default:return}g()};function d(){let e=document.querySelector(".game-field").rows,t=h.state;for(let s=0;s<t.length;s++){let l=t[s];for(let t=0;t<l.length;t++)if(l[t]){let r=e[s].cells[t],i=l[t];r.textContent=i,r.className=`field-cell field-cell--${i}`}else e[s].cells[t].textContent="",e[s].cells[t].className="field-cell"}}function g(){d(),c.textContent=h.score,function(){switch(h.status){case"win":a.classList.remove("hidden"),document.removeEventListener("keydown",f);break;case"lose":o.classList.remove("hidden");break;default:o.classList.add("hidden"),a.classList.add("hidden")}}()}i.addEventListener("click",()=>{i.classList.contains("start")?(h.start(),g(),n.classList.add("hidden"),document.addEventListener("keydown",f)):(h.restart(),g(),n.classList.remove("hidden"),document.removeEventListener("keydown",f)),i.classList.toggle("start"),i.classList.toggle("restart"),i.textContent=i.classList.contains("start")?"Start":"Restart"});
//# sourceMappingURL=index.d4bfcbdb.js.map
