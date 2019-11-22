const Discord = require('discord.js');
const client = new Discord.Client();
//This Is For Getting Your Bot Token
const auth = require('./auth.json');
const { Client, Attachment } = require('discord.js');
//translate Might be in a update
//This is the prefix
var prefix = '!';
//This is the !new Embed
const newEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('UNSC')
.setURL('https://unscnerf.com')
.setAuthor('ShadowGun', 'https://i.imgur.com/wSTFkRM.png', 'https://unscnerf.com')
.setDescription('New')
.setThumbnail('https://content.shopback.com/sg/wp-content/uploads/2015/05/Neuschwanstein-Castle-Germany.jpg')
.addField('!admin', 'will request help from a admin')
.addBlankField()
.addField('!rip', 'Will display rip', true)
.addField('!avatar', 'get your avatar', true)
.addField('!ban (name)', 'This will ban users', true)
.addField('!purge', 'This Will remove 100 messages from the channel your in unless they are two weeks old', true )
.addField('!remove (number)', 'This will remove as many messages as you want just enter your number', true)
.setTimestamp('Thanks for Asking Bot')
.setFooter('Help Bot', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');

//When You Start The Bot it Prints this to the console 
client.on('ready', () => {
    //Prints Logged in as Bot Name to the console
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
	if (msg.content == "!new") {
		msg.delete()
	msg.channel.send(newEmbed);
	}

//This Will Ban users
// if the message content starts with "!ban"
  if (msg.content.startsWith('!ban')) {
  	if (msg.member.roles.find(r => r.name === "Admin") || msg.member.roles.find(r => r.name === "Owner")) {


    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = msg.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          msg.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          msg.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        msg.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      msg.reply('You didn\'t mention the user to ban!');
    }
}
  }
		var message = msg.content;
    	message = message.slice(1);
    	var num = msg.content.replace( /^\D+/g, '');
    	if (msg.content === '!purge') {
        //Deletes 100 messages
         async function purge() {
            if (msg.member.roles.find(r => r.name === "Admin") || msg.member.roles.find(r => r.name === "Owner")) {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 100});
            msg.channel.bulkDelete(fetched);
     
        }
      }
        purge();
    }
    	if (msg.content == prefix + "remove " + num) {
        async function clear() {
        if (msg.member.roles.find(r => r.name === "Admin") || msg.member.roles.find(r => r.name === "Owner")) { 
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: num});
            msg.channel.bulkDelete(fetched);
            client.channels.get("641442259417563138").send(num + " Messages Have Been Deleted By " + msg.author)
        }
    }

    clear();
    }

});



client.login(auth.token);
