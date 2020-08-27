# Discord Tic Tac Toe
Tic Tac Toe for discord bots.

## Installing locally

* Install Node 12.0 or higher.
* Run `npm install` in the project root.
* Create a bot application on (https://discord.com/developers). Refer to the [documentation of discord.js](https://discordjs.guide/preparations/setting-up-a-bot-application.html) for more information on how to set up a bot application and getting it on your server.
* Copy `.env.example`, rename it to `.env` and replace `your-bot-token-goes-here` with your bot's token.
* Run `npm run-script start_local` to start the bot. It should now be connected to your server.

## Commands

Commands are executed as follow:

```
!my-command param1 param2
```

The call starts with the prefix, which is `!` by default (that can be changed in `config.json`). The prefix is followed by the command name or one of its aliases. Parameters are separated with whitespaces. For the sake of simplicity, every command uses `!` as prefix in this README.

A list of all available commands can be retrieved by running the `help` command. For further help on one specific command, `!help <command>` can be used.

## Playing

The basic idea is, that a user challenges another user by mentioning him in the challenge command.

```
General usage: !challenge [size] [symbols to win] @<user>
```
```
Example usage: !c 5 4 @MyBestFriend
```

This creates a game and shows an empty field.

```
  x 1 2 3
y -------
1 |      
2 |      
3 |      
```

The players can now make turns by indexing the position they want to place a symbol at. The indices can be found next to the field.

```
General usage: !turn <x index> <y index> [@<user>]
```
```
Example usage: !t 2 2
```

Note that the player has to mention his opponent when he has multiple games running. If the player has only one game running he can still mention his opponent to show that it's his turn now.

If some time passed since the last turn was made, the field can be displayed again.

```
General usage: !show [@<user>]
```
```
Example usage: !show @MyBestFriend
```

The same rule as in the `turn` command applies here too - the mention is only needed if the player has multiple games running.

All running games of the player can be displayed like this:

```
General usage: !games
```
```
Example usage: !g
```
