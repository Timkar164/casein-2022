import re

with open("220522_105207.csv", "r") as file:
	x = re.sub(r",[\d-]+\s+(\d+:)", r",\1", file.read())

with open("220522_105207.csv", "w") as file:
	file.write(x)