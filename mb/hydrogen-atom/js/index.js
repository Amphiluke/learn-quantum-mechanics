"use strict";var _NumberparseInt=Number.parseInt;let utils=require("utils"),chart=require("chart.js"),quantumNumbers=require("quantum-numbers.js"),ui={elements:{form:document.getElementById("ha-form"),canvas:document.getElementById("ha-canvas"),numN:document.getElementById("ha-num-n"),numL:document.getElementById("ha-num-l")},init(){"0"===utils.getQuery("controls")?this.elements.form.classList.add("hidden"):(this.syncInputs(),this.addEventHandlers())},addEventHandlers(){let a=this.elements.form;a.addEventListener("change",({target:b})=>{let c=b.value.replace(/\D/g,"");quantumNumbers[b.name]=+c,this.syncInputs(),this.queueChartUpdate()},!1),a.addEventListener("submit",(b)=>{b.preventDefault(),this.queueChartUpdate(!0)},!1)},syncInputs(){let a=this.elements.numN,b=this.elements.numL;a.max=quantumNumbers.nMax,a.min=quantumNumbers.nMin,a.value=quantumNumbers.n,b.max=quantumNumbers.lMax,b.min=quantumNumbers.lMin,b.value=quantumNumbers.l},queueChartUpdate(a){this.debounceTimerId&&clearTimeout(this.debounceTimerId),this.debounceTimerId=setTimeout(()=>{this.updateChart(),this.debounceTimerId=null},a?0:750)},updateChart(){chart.updateSeries(quantumNumbers.n,quantumNumbers.l)}};quantumNumbers.n=_NumberparseInt(utils.getQuery("n")),quantumNumbers.l=_NumberparseInt(utils.getQuery("l")),chart.create(ui.elements.canvas,quantumNumbers.n,quantumNumbers.l),ui.init(),document.body.classList.remove("loading"),module.exports=chart;