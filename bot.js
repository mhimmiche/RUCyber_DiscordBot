var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var helpMessage = 'Welcome to the Radford University Cyber Defense Club! I\'m here to help you with club things!\nHere are some of the available commands\n'
                    + '\t!contact - Displays contact information for the officers!\n'
                    + '\t!meeting - Display the club meeting information!';
// TODO: Implemet a DB to pull all club info from
var contactInfo = 'The officers\' emails are as follows:\n\tJacob Walters - jwalters22@radford.edu\n\tJohnnie Myers - jmyers69@radford.edu\n\tBen Adams - badams5@radford.edu\n\tMichael Basala - mbasala@radford.edu';
var meetingInfo = 'The club holds its meetings on Tuesdays at 17:00 (05:00PM) in the ARTIS LAB';
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: helpMessage + "\n" + args
                });
            break;
            case 'contact':
                bot.sendMessage({
                    to: channelID,
                    message: contactInfo
                });
            break;
            case 'meeting':
                bot.sendMessage({
                    to: channelID,
                    message: meetingInfo
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});