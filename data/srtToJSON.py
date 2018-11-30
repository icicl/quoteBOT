with open("iii.srt",errors="ignore") as f:
    d = f.read()
with open("iii.json","w+") as f:
    f.write("{\"subs\":["+",\n".join(str([i.replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][:2]+["\\".join([i.replace("\"","\'").replace("\'","[placeholder]") for i in i.split("\n")][2:])]).replace("\'","\"").replace("[placeholder]","\'") for i in d.split("\n\n"))+"\n]}")
