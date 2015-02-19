

IMPLEMENTATION OF A*<br/> ARTIFICIAL INTELLIGENCE ALGORITHM<br/> (in Java and C)
======================================================================

Introduction
----------------------------------------------------------------------
This repository contains an implementation for the A* algorithm (used in Artificial Intelligence for pathfinding) in languages Java and C.
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
#Compile the application
mkdir C/bin
gcc -o C/bin/robots C/src/robots.c			#executable also available from github as release
#Test the application with sample inputs
C/bin/robots	C/input_files/input.txt
C/bin/robots 	C/input_files/input2.txt
C/bin/robots	C/input_files/input3.txt
```

Language Java
------------------------------------------------------------------------------------------------

* In the folder *'src'*, the file A_StarAlgorithm contains the main class used to resolve the problem of pathfinding.
* In folder *'input_files'*, there are sample input files that can be used to test the program.
* The input files contain a map with certain "obstacles" and the initial places of 2 "robots".
* After executing the program, the output is the number of moves the first robot has to do at least to reach the second robot in its initial place

To test the application :
```sh
#Compile the application
javac Java/src/InvalidLetterException.java Java/src/BinaryMinHeap_PriorityQueue.java Java/src/SearchGraphNode.java Java/src/A_StarAlgorithm.java 
#Test the application with sample inputs
java -cp Java/src/A_StarAlgorithm Java/input_files/small_1.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/small_2.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/medium_1.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/medium_2.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/medium_3.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/medium_4.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/medium_5.txt
java -cp Java/src/A_StarAlgorithm Java/input_files/large.txt
```
