import genai  from 'ti.genai';
const win = Ti.UI.createWindow({layout:"vertical"});
const label = Ti.UI.createLabel({text:"-", left:10,right:10});
const btn = Ti.UI.createButton({title:"check"});
const btn2 = Ti.UI.createButton({title:"rewrite"});
const btn3 = Ti.UI.createButton({title:"summarize"});
var picker = Ti.UI.createPicker({});
const tf = Ti.UI.createTextArea({width: 300, height:100, value:"The praject is compleet but needs too be reviewd", font:{fontSize: 14}});
win.add([tf,btn,picker,btn2,btn3,label]);
win.open();

var data = [];
var outputType = genai.ELABORATE;
data.push(Ti.UI.createPickerRow({outputType: genai.ELABORATE, title:'ELABORATE'}));
data.push(Ti.UI.createPickerRow({outputType: genai.PROFESSIONAL, title:'PROFESSIONAL'}));
data.push(Ti.UI.createPickerRow({outputType: genai.SHORTEN, title:'SHORTEN'}));
data.push(Ti.UI.createPickerRow({outputType: genai.FRIENDLY, title:'FRIENDLY'}));
data.push(Ti.UI.createPickerRow({outputType: genai.EMOJIFY, title:'EMOJIFY'}));
data.push(Ti.UI.createPickerRow({outputType: genai.REPHRASE, title:'REPHRASE'}));
picker.add(data);
picker.addEventListener("change", function(e){
	outputType = e.row.outputType;
})

btn.addEventListener("click", function() {
	label.text = "";
	genai.proofread({
		text: tf.value
	});
})

btn2.addEventListener("click", function() {
	label.text = "";
	genai.rewrite({
		text: tf.value,
		outputType: outputType
	});
})

btn3.addEventListener("click", function() {
	label.text = "";
	genai.summarize({
		text: tf.value,
		outputType: genai.THREE_BULLETS
	});
})

genai.addEventListener("done", function(e) {
	_.each(e.results, function(item) {
		label.text = item.text;
		tf.value = item.text;
	});
});

genai.addEventListener("streamResult", function(e) {
		label.text += e.text;
});
