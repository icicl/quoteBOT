# quoteBOT
**About this branch**

quoteBot is an original Discord bot that get screenshots from the 2005 movie, Star Wars: Episode III – Revenge of the Sith. The code is written entirely in JavaScript using discord.js, other than an SRT to JSON converter that was written in Python 3.

This bot was made to have a single function: quote Star Wars Movies.

![Capture](https://i.imgur.com/FU25lFJ.png)

### Commands

The only command used by quoteBOT is ";quote <quote here>" and will display an image corresponding to the quote. 
  
If the quote is not accurate, or there are typos within it, the bot will use a [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) Algorithm to find the most similar quote within the database.

### Intallation
requires: node.js, discord.js, ffmpeg-extract-frames
you have to add movie files and subtitles to the /data/ directory - right now only .mp4 videos and .srt subtitles are supported
the video and subtitles must have the exact same name
once you have added new files (and removed all old ones, including unused subtitles), run `initializer.py` - this will convert subtitles to json and make a list of movies at /data/names/_.json

### Invite Link
https://discordapp.com/api/oauth2/authorize?client_id=517897194615865364&permissions=34816&scope=bot
as of right now, the only movie it quotes from is Revenge of the Sith
### TO-DO

Add more movies to the database for a larger query to sample from.

Rewrite wiki and document sampling function

# Credits
* Dakota Frost (icicl): Main developer
* Christopher Cha (Rinsworth): README writer/editor
