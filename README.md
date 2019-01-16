# quoteBOT
**About this branch**

quoteBot is an original Discord bot that get screenshots from the 2005 movie, Star Wars: Episode III – Revenge of the Sith. The code is written entirely in JavaScript using discord.js, other than a SRT to JSON converter that was written in Python 3.

### Commands

The only command used by quoteBOT is ";quote <quote here>" and will display an image corresponding to the quote. 
  
If the quote is not accurate, or there are typos within it, the bot will use a [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) Algorithm to find the most similar quote within the database.

