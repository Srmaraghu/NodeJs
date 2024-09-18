require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
      name: 'create',
      description: 'Creates a new shortUrl',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => { 
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands("1273991906711437345"), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
