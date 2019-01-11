var readline = require('readline');
var events = require('events');
var e = new events.EventEmitter();
const os = require('os');
const fs = require("fs");
const path = require("path");
var basDir =path.join(__dirname,'data')


var cli = {};
var inputArray =["man","help","exit","date","stats","users","userdetail"];
var commandObj = {
	man : "hear to help you",
	help : "happy to help ypu",
	date : "display date",
	stats : "show the status",
	exit : "back directory",
	users : "list of users",
	userdetail : "detail of user"
}

// var listOfUsers =["ashsih","sachin","nihal","ramlal","rakkumar"]

e.on('man',(line)=> {
		cli.fullLine();
		cli.name();
		cli.fullLine()
	for(var key in commandObj) {
		var str = '';
		str = key;
		var dashString = ""
		var space = 60 - str.length;
		for(i=0; i< space;i++){
			dashString += " "
		}	
		str += dashString + commandObj[key];
		console.log(str);
	}
	
})

e.on('userdetail',(line)=>{
	cli.userDetailInfo(line)
})

cli.userDetailInfo = (line) => {
	var path = basDir;
	var arr =line.split("--");
	// console.log(path)
	fs.readFile(path +`/${arr[1]}.json`,(err,data)=> {
		if(err) console.log(err)
		console.log(data.toString())
	})

}

cli.fullLine =() => {
	var line = "";
	for(i=0; i<process.stdout.columns; i++) {
		line += "-"
	}
	console.log(line);
}


cli.name = () => {
	var name = "lists";
	// console.log(name)
 var center = (process.stdout.columns-name.length)/2;
	var centerText = ""
	for(i=0; i<center;i++){
		centerText += " ";
	}
	centerText += " " +name
	console.log(centerText)
}


cli.processInput = (line) => {
	line =  typeof(line) === 'string' && line.length > 0 ? line : false;
	var matched = false;
	if(line) {
		inputArray.some(input => {
			if(line.toLowerCase().indexOf(input) > -1) {
				matched = true;
				e.emit(input,line);
				return true;
			}
			
		});
	}
	if(!matched) {
		console.log('No match found');
	}
}

e.on('stats',(line)=> {
	cli.osDisplay()
})

cli.osDisplay = () => {
	console.log(os.homedir());
	cli.fullLine();
	console.log(os.hostname())
	cli.fullLine();
	console.log(os.cpus());
	cli.fullLine();
	console.log(os.freemem());
	cli.fullLine();
 }

 e.on('users',(line)=>{
	cli.displayUsers()
 })
cli.displayUsers = () =>{
	// listOfUsers.map((v) => console.log(v)"ashsih","sachin","nihal","ramla)
	var info =basDir;
	console.log(info,"data")
	fs.readdir(info,(err,fileInfo)=> {
		if(err) console.log(err)
		// console.log(fileInfo)
    fileInfo.map((v)=> {
			// console.log(info+v)
			fs.readFile(info + '/' + v,(err,data)=> {
				if(err) throw err;
				console.log(data.toString())
			})

		})
	
	})
}

e.on('exit', (line) => {
	process.exit(0)
});

e.on('date', (line) => {
	var date =new Date();
	var day = date.getDate();
	var mon = date.getMonth()+1;
	var year = date.getFullYear();
	var today = day + '/' + mon + '/' +year
	console.log(today)
})



cli.init = () => {
	console.log('CLI is running');
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'OHAI> '
	});
	
	rl.prompt();
	rl.on('line',(line)=> {
		cli.processInput(line);
		rl.prompt()
	}).on('close',()=> {
		console.log('Have a nice day')
		process.exit(0)
	})
};

module.exports = cli;