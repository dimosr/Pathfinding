

IMPLEMENTATION OF A* ARTIFICIAL INTELLIGENCE ALGORITHM (in Java and C)
======================================================================

Introduction
----------------------------------------------------------------------
This repository contains an implementation for the A* algorithm (used in Artificial Intelligence for pathfinding) in languages Java and C

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
#Compile the application
gcc src/robots.c robots			#executable also available from github as release
#Test the application with sample inputs
src/robots	input_files/input.txt
src/robots 	input_files/input2.txt
src/robots	input_files/input3.txt
```

Language Java
------------------------------------------------------------------------------------------------

* In the folder *'src'*, the file Golfo contains the main class used to resolve the problem of pathfinding.
* In folder *'input_files'*, there are sample input files that can be used to test the program.
* The input files contain a map with certain "obstacles" and the initial places of 2 "robots".
* After executing the program, the output is the number of moves the first robot has to do at least to reach the second robot in its initial place

To test the application :
```sh
#Compile the application
javac src/InvalidLetterException.java src/BinaryMinHeap_PriorityQueue.java src/Golfo.java 
#Test the application with sample inputs
src/Golfo	input_files/small_1.txt
src/Golfo 	input_files/small_2.txt
src/Golfo	input_files/medium_1.txt
src/Golfo	input_files/medium_2.txt
src/Golfo	input_files/medium_3.txt
src/Golfo	input_files/medium_4.txt
src/Golfo	input_files/medium_5.txt
src/Golfo	input_files/large.txt
```
