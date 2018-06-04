var fs = require('fs');
var request = require("request");
const Settings = require('./config.json');

var proxies = fs.readFileSync('proxy.txt').toString().split("\n");
var data = fs.readFileSync('filtered_proxy.txt').toString();

proxies.forEach(function(proxy){
	checkProxy(proxy);
});

function checkProxy(proxy)
{
	var reqOpts = {
		url: Settings.URL,
		proxy: "http://" + proxy,
	};
	request(reqOpts, function(err, response, body) {
		if(response && response.statusCode == 200)
		{
			data += reqOpts.proxy + "\n";
			fs.writeFileSync("filtered_proxy.txt", data);
		}
	});
}
