compile:
	akashic scan asset

run : 
	akashic-sandbox

build:
    akashic export html --magnify --output /tmp/qramana

.PHONY : run
