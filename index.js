const prefix = "$";
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const client = new Discord.Client();
const search = require('yt-search');

client.once('ready', () => {
    console.log("Connected !")
});

client.once('reconnect', () => {
    console.log('Reconnected !')
});

client.once('disconnect', () => {
    console.log("Disconnected !")
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`${prefix}ping`)){
        message.channel.send('Pong ! :ping_pong:');
        var ping = Date.now() - message.createdTimestamp;
        message.channel.send("Tu as " + ping + " ms !");
    };
    if(message.content.startsWith(`${prefix}imc`)){
        const argu = message.content.split(' ').slice(1);
        const poids = parseFloat(argu.slice(0).join(' '));
        const taille = parseFloat(argu.slice(1).join(' '));
        const imc = (poids/taille**2).toFixed(2);
        if (message.content == "$imc") {
            message.reply('**Veuillez ajouter un poids (en kg) et une taille (en m) !**')
        } else {
            message.channel.send('Vous avez une imc de : ' + imc);
            message.channel.send('Voici les différents résultats possible : ', {files: ['https://static.wixstatic.com/media/132e6a_fd132a2b73974e2da140d78328555379~mv2.gif']});
        }
    };
    if(message.content.startsWith('$procrastination')) {
        message.channel.send('Voici un graphique détaillant les facteurs qui jouent sur votre procrastination !', {files: ['https://se-realiser.com/wp-content/uploads/2014/07/ProcrastinationProcGraph.png']});
    };
    if(message.content.startsWith(`${prefix}video`)) {
        message.channel.send('N\'oubliez pas de vous abonner haha !', {files : ['https://media.tenor.com/images/1d55655c71e6806d7b74a26cf0dcb57d/tenor.gif']});
        message.channel.send('https://www.youtube.com/watch?v=3_fgW1t7Ufc');
    };
    if(message.content.startsWith('Rick')) {
        message.reply("Tg toi t'es con, t'es moche et tu pus sale caca de merde qui pus du cul ! :poop: :face_with_symbols_over_mouth: :middle_finger:");
    };
    if(message.content.startsWith(`${prefix}help`)) {
        message.channel.send('**Voici les différentes commandes possibles :**');
        message.channel.send('-  $imc poids(kg) taille(m)');
        message.channel.send('-  $procrastination');
        message.channel.send('-  $video');
        message.channel.send('-  $play (lien)');
        message.channel.send('-  $stop');
    };
    if (message.content === `${prefix}join`) {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.join();
        } else {
          message.reply('Connectes toi à un salon !');
        }
    };
    if(message.content.startsWith(`${prefix}play`)) {
       const connection = await message.member.voice.channel.join();
       const link =  message.content.slice(6);
       
       ytdl.getInfo(link, function(err, info) {
            message.reply('Now playing : ' + info.title);     
        })
       connection.play(ytdl(link, { filter: 'audioonly' }));
    }
    if(message.content.startsWith(`${prefix}stop`)) {
        message.member.voice.channel.leave();
    }
    if(message.content.startsWith(`${prefix}morphotyp`)) {
        const morph = message.content.slice(13);
        if (message.content == "$morphotype") {
            message.channel.send("**Voici les différents morphotypes :** ", {files: ["https://www.eole.co/wp-content/uploads/2018/07/3-morphotypes-Homme-EOLE-PARIS.png"]});
        }
    }
    if (!message.guild) return;

    // If the message content starts with "!kick"
    if (message.content.startsWith('$kick')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply('Je n\'ai pas réussi à le kick !');
                // Log the error
                console.error(err);
            });
        } else {
            // The mentioned user isn't in this guild
            message.reply("That user isn't in this guild!");
        }
        // Otherwise, if no user was mentioned
        } else {
        message.reply("Tu n\'a pas mentionné d'utilisateur !");
        }
    
    }
    if (message.content.startsWith(`${prefix}ban`)) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Ban the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             * Read more about what ban options there are over at
             * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
             */
            member
              .ban({
                reason: 'They were bad!',
              })
              .then(() => {
                // We let the message author know we were able to ban the person
                message.reply(`Successfully banned ${user.tag}`);
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to ban the member,
                // either due to missing permissions or role hierarchy
                message.reply('I was unable to ban the member');
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            message.reply("That user isn't in this guild!");
          }
        } else {
          // Otherwise, if no user was mentioned
          message.reply("You didn't mention the user to ban!");
        }
    }
    if (message.content.startsWith(`${prefix}search`)) {
        const title = message.content.slice(8)
        search(title, function ( err, r ) {
            const videos = r.videos
            message.reply(`${videos.url}`)
            console.log( videos[ 0 ] )
          } )
    }

});

function morpho(type) {
    if (type == "endormorphe") {
        message.reply('Malheureusement, les endomorphes sont ceux ayant le plus de difficulté à perdre du poids !')
        message.channel.send("Tu as un corps en forme de poire, un métabolisme lent, une difficutlé à bruler la graisse, tu gagnes du poids très facilement, tu ")
    }
    else if (type == "ectomorphe") {
        message.reply('Ectomorphe')
    }
    else if (type == "mesomorphe") {
        message.reply("Mesomorphe")
    } else {
        return ;
    }
}

client.login(process.env.token);