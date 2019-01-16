# quoteBOT
**About this branch**

quoteBot is an original Discord bot that get screenshots from the 2005 movie, Star Wars: Episode III – Revenge of the Sith. The code is written entirely in JavaScript using discord.js, other than an SRT to JSON converter that was written in Python 3.

This bot was made to have a single function: quote Star Wars Movies.

![Capture](https://i.imgur.com/FU25lFJ.png)

### Commands

The only command used by quoteBOT is ";quote <quote here>" and will display an image corresponding to the quote. 
  
If the quote is not accurate, or there are typos within it, the bot will use a [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) Algorithm to find the most similar quote within the database.

# Intallation
### Requires: 
    node.js
    discord.js
    ffmpeg-extract-frames
The bot can only function if the proper movie files and subtitles to the /data/ directory.

As of now, only `.mp4 videos and .srt subtitles` are supported.

The video and subtitles must have the same name for the bot to recognize the files.

Once you have added new files (and removed all old ones, including unused subtitles), run `initializer.py` - this will convert subtitles to json and make a list of movies at /data/names/_.json

### Invite Link
[https://discordapp.com/api/oauth2/authorize?client_id=517897194615865364&permissions=34816&scope=bot](Invite Link)

As of now, the bot can only query movie quotes from Revenge of the Sith

### TO-DO

Add more movies to the database for a larger query to sample from.

Rewrite wiki and document sampling function

# Credits
* Dakota Frost (icicl): Main developer
* Christopher Cha (Rinsworth): README writer/editor
