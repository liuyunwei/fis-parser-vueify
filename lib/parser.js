var deasync = require("deasync");
var compiler = require("vueify").compiler;

module.exports = function(content, file, options){

	compiler.applyConfig(options);

	var res = null;
	
	//先按html过一遍，替换里面的资源什么的
	content = fis.compile.partial(content, file, {
		ext: "html"
	});

	compiler.compile(content, file.realpath, function(err, result){
		if(err) {
			res = "/*compile error:"+err+"*/";
		}
		res = result;
	});

	while(res == null) {
		deasync.sleep(100);
	}

	return res;
};