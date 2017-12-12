# Podzol
**A fallback server for minecraft**

Version: 1.0.0


![](./podzol.png)

## Installation
Podzol is a node module and therefore requires Node.js installed.
Podzol itself can be installed via terminal easily.

**Step 1:** Install Node.js

**Step 2:**
`npm install podzol -g`

## Usage
Podzol is a command line application. It provides the command `podzol` <sub>*Who would have guessed that?*</sub> and various subcommands.

### Starting server
Type `podzol start` to start the server. 
Note that the actual server is detatched from terminal and runs in the background, which means you can close the terminal session.

Running two servers at the same time is not possible.

### Stopping server
Type `podzol stop` to stop the server.


### Displaying version
Type `podzol -v` to output the current version.

## Config

The configuration for Podzol is saved in `config.json` in the main directory.
### Port
Integer between 0 and 65535. The port Podzol listens to. Default is `25565`.
### Version
String. The version that is displayed to the minecraft client in the server list. Default is `"Podzol 1.0.0"`.
### Protocol
Integer. The protocol version Podzol should respond to the client when pinging (A list of versions is available [here](http://wiki.vg/Protocol_version_numbers)). If explicitely set, this may stop clients from pinging. Set it to `-1` to respond with the protocol version the client uses. Default is `-1`. 
### Max-Players
Integer. The slots of the server pinged to the client. Default is `0`.
### Online-Players
Integer. The players online pinged to the client. Default is `0`.
### Description
String or [JSON-Text](https://minecraft-de.gamepedia.com/JSON-Text) object. The description/MOTD of the server.
It can be a string (including [formatting codes](https://minecraft.gamepedia.com/Formatting_codes)) or a valid JSON-Text object or list. Default is `"§6A Podzol server"`

### Login-Message
String or [JSON-Text](https://minecraft-de.gamepedia.com/JSON-Text) object. The message displayed when the client logs in.
It can be a string (including [formatting codes](https://minecraft.gamepedia.com/Formatting_codes))
 or a valid JSON-Text object or list. Default is `{"text":"Podzol Server","color":"aqua"}`