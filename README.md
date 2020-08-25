# discordjs-skeleton
Skeleton for discord.js bot applications

## Getting Started

Clone this repository and follow the steps:
* Initialise npm and install the required packages:
```
npm init
npm install discord.js
npm install dotenv --save-dev
```
* In your `package.json` add `"start_local": "node -r dotenv/config server.js"` to your scripts.
* Rename the `.env.example` file to `.env` and insert your bot token.
  Note that the `.env` file will not be checked into the repository with the default `.gitignore`.
* Start the application with `npm run start_local`.


## Command Structure

### Calling a command

After connecting the bot to your server, you can call a command like this:

```
!my-command blob

```
`my-command` is the called command and `blob` is the argument for that command

In this example the default prefix `!` is used. This can be changed in `config.json`.

### Creating a new command

Every `.js` file in the commands folder represents one command of the bot.
These commands are loaded dynamically when starting the application.
The commands have to follow this structure in order to be processed dynamically:
```
# my-command.js
module.exports = {
  name: 'my-command',
  description: 'This is my command.',
  aliases: ['my-cmd'],
  args: true,
  usage: '<some word>',
  cooldown: 5,
  execute(message, args) {
    // ...
  }
}
```
Properties are defined as follows:
* `name` (*required*): This is the name of the command. It has to match the file name.
* `description` (*required*): Short description of the command. This will be showed when using the `help` command.
* `aliases` (*optional*): Array of aliases which also execute this command.
* `args` (*optional*): Indicates whether arguments are required.
* `usage` (*optional*): Describes what arguments are required.
* `cooldown` (*optional*): The time in seconds that a user has to wait to execute the command again.
  This overwrites the default cooldown defined in `config.json`.
* `execute` (*required*): Function that is executed when the command is called. The first argument is the message object
  and the second argument is an array of the arguments, split by spaces.
  
## Default Commands

The skeleton comes with three basic commands.

### ping

This command responds `Pong!` and can be used to check whether to bot is able to respond.

### help

This command sends a list of all commands as a DM to the calling user, when no arguments were provided.

When a command is provided as an argument, a description of the command is written in the channel.

### reload

This command reloads the provided command from the corresponding file in the `commands` folder.
