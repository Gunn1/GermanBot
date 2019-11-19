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
  	if (msg.content == "!Do") {
  		msg.reply("I can do lots of things like remove messages and getting your avatar I also can help you! just Private Message Me !admin for help")
  	}
  	var prefix = '!';
  	/*if (msg.content.startsWith(prefix))*/ //{
		var message = msg.content;
    	message = message.slice(1);
    	var num = msg.content.replace( /^\D+/g, '');
    	if (msg.content == prefix + 'purge') {
    		async function purge() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 100});
            msg.channel.bulkDelete(fetched);
        }
        purge()
    	}
    	if (msg.content == prefix + "remove " + num) {
			async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: num});
            msg.channel.bulkDelete(fetched);
            client.channels.get("641442259417563138").send(num + " Messages Have Been Deleted By " + msg.author)

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
			msg.reply('Getting your avatar ' + msg.author)
    		msg.reply(msg.author.avatarURL);
    	}
    	if (message == 'admin') {
    		msg.author.send("Sorry Was not able to start please say !admin again")
    		msg.author.send("What do you want the message to include?:")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, {max: 1});
        console.log(collector)
        collector.on('collect', msg => {
        	usermessage = msg.content;
            if (usermessage == " ") {
            	msg.reply("Please Enter Text");
            }
            if (msg.content == "!ban") {
            	msg.reply("Banning Admin")
            }


            if ( usermessage != " " ){
            msg.author.send("Thanks Sending it now");
		    client.channels.get("641442259417563138").send(msg.author + " @here Needs Help With: " + usermessage )
            }
        })
    	
    }
    	
    	if (message == 'help') {
    		msg.delete()
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
//}
});



client.login(auth.token);
