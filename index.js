const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const { Client, Attachment } = require('discord.js');
const translate = require('translate-api');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
  	if (msg.content === 'ping') {
    	msg.reply('pong');
    	pms();
  	}
  	var prefix = '!';
  	if (msg.content.startsWith(prefix)) {
		var message = msg.content;
    	message = message.slice(1);
    	if (message == "remove") {
			async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 99});
            msg.channel.bulkDelete(fetched);
        }

        clear();
    	}

    if (message == 'translate') {

    msg.reply("Translating")
    let transUrl = 'https://nodejs.org/en/';
  	translate.getPage(transUrl).then(function(htmlStr){
    console.log(htmlStr.length)
  	});
 	let message = 'hello';
  	translate.getText(message,{to: 'De'}).then(function(text){
    console.log(text)
    msg.reply(text)
  		});

    }
    	if (message === 'rip') {
        // Create the attachment using Attachment
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        msg.channel.send(attachment);
    }

    	if (message == 'avatar') {
    		msg.reply(msg.author.avatarURL);
    	}
    	help = true;
    	if (message == 'admin') {
    		if (help == true) {
    		help = false;
    		msg.author.send("What do you want the message to include?:")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id);
        console.log(collector)
        collector.on('collect', msg => {
        	usermessage = msg.content;
            if (usermessage == " ") {
            	msg.reply("Please Enter Text");
            }


            if ( usermessage != " " ){
                msg.author.send("Thanks Sending it now");
                help = false;
                client.channels.get("641442259417563138").send(msg.author + " @here Needs Help With: " + usermessage )
            } else if (msg.content == "n") {
                msg.author.send("Okay will not send");
                help = false;
            }
        })
    	}
    }
    	}
    	if (message == 'help') {
    	const exampleEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle('UNSC')
			.setURL('https://unscnerf.com')
			.setAuthor('ShadowGun', 'https://i.imgur.com/wSTFkRM.png', 'https://unscnerf.com')
			.setDescription('Help')
			.setThumbnail('https://content.shopback.com/sg/wp-content/uploads/2015/05/Neuschwanstein-Castle-Germany.jpg')
			.addField('!admin', 'will request help from a admin')
			.addBlankField()
			.addField('!rip', 'Try it and find out', true)
			.addField('!translate', 'Get links for translateing', true)
			.addField('!avatar', 'get your avatar', true)
			.addField('!remove', 'Removes All messages that are not 2 weeks old!', true)
			.setTimestamp('Thanks for Asking Bot')
			.setFooter('Help Bot', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');

	msg.channel.send(exampleEmbed);    	


  	

}
});



client.login(auth.token);
