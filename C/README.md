

IMPLEMENTATION OF A*<br/> ARTIFICIAL INTELLIGENCE ALGORITHM<br/> (in C)
======================================================================

Introduction
----------------------------------------------------------------------
This repository contains an implementation for the A* algorithm in language C.
First of all, download the project :
```sh
git clone https://github.com/dimosr7/A.I.
cd A.I.
```

Language C
---------------------------------------------------------------------------------------------------
* In the folder *'src'*, the file robots.txt contains the implementation for A* in C.
* In folder *'input_files'*, there are sample input files that can be used to test the program.
* The input files contain a map with certain "obstacles" and the initial places of 2 "robots".
* After executing the program, the following procedure takes place :
	- the 1st robot makes a random move in the gap.
	- the 2nd robot makes 3 moves following A* in order to meet the 1st robot.
	- the algorithm stops when the 2 robots are met.

To test the application :
```sh
# Compile the application
mkdir C/bin
gcc -o C/bin/robots C/src/robots.c			#executable also available from github as release
#Test the application with sample inputs
C/bin/robots	C/input_files/input.txt
C/bin/robots 	C/input_files/input2.txt
C/bin/robots	C/input_files/input3.txt
```