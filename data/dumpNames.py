import os
with open("./names/_.json","w+") as f:
    f.write("{\"main\":[\""+"\",\"".join(i[:-4] for i in os.listdir() if i[-4:]==".mp4")+"\"]}")
