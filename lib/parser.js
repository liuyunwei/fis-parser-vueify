
var compiler = require("vueify").compiler;

module.exports = function(content, file, options){

	compiler.applyConfig(options);

	var res = null;
	var done = false;	
	console.log("vueify :"+file.realpath +" start");
	//先按html过一遍，替换里面的资源什么的
	content = fis.compile.partial(content, file, {
		ext: "html"
	});

	compiler.compile(content, file.realpath, function(err, result){
		if(err) {
			res = "/*compile error:"+err+"*/";
			throw new Error(err);
		}
		res = result;
		console.log("compile done");
		done = true;
	});


	require('deasync').loopWhile(function(){return !done;});
	console.log("vueify:"+file.realpath + " end");
	return res;
};
