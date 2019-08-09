import os#idk os stuff in js so i have to use python
def slim(t):
    r = ' '
    for i in t.lower():
        if i in 'qwertyuiopasdfghjklzxcvbnm':r+=i+' '
    return r
with open("./names/_.json","w+") as f:
    f.write("{\"main\":[\""+"\",\"".join(i[:-4] for i in os.listdir() if i[-4:]==".srt")+"\"]}")
th = ''
buffer = ''
with open("thanos") as f:
    for i in f.read().split("\n\n"):
        th += slim(i[2:])
for ff in os.listdir():
    if ff[-4:]==".srt":
        with open(ff,errors="ignore") as f:
            d = f.read()
        while d[-1] == "\n":d=d[:-1]
        with open(ff[:-4]+".json","w+") as f:
            f.write("{\"subs\":["+",\n".join(str([i.replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][:2]+["\\".join([i.replace('<i>','').replace('</i','').replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][2:])]).replace("\'","\"").replace("[placeholder]","\'") for i in d.split("\n\n") if buffer+slim(i.replace('<i>','').replace('</i',''))+buffer in th)+"\n]}")
