import os
for ff in os.listdir():
    if ff[-4:]==".srt":
        with open(ff,errors="ignore") as f:
            d = f.read()
        while d[-1] == "\n":d=d[:-1]
        with open(ff[:-4]+".json","w+") as f:
            f.write("{\"subs\":["+",\n".join(str([i.replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][:2]+["\\".join([i.replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][2:])]).replace("\'","\"").replace("[placeholder]","\'") for i in d.split("\n\n"))+"\n]}")
