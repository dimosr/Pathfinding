IMPLEMENTATION OF A*<br/> ARTIFICIAL INTELLIGENCE ALGORITHM<br/> (in C)
======================================================================

Introduction
----------------------------------------------------------------------
This repository contains the implementation for the A* algorithm in language C++.
In this implementation, the algorithm is dynamic.<br>
<b>So, after executing the program, the following procedure takes place :</b>
- the 1st robot makes a random move in the gap.
- the 2nd robot makes 3 moves following A* in order to meet the 1st robot.
- the algorithm stops when the 2 robots are met.

######Contents
* In the folder *'src'*, the file robots.c contains the implementation for A* in C.
* In folder *'input_files'*, there are sample input files that can be used to test the program.
* The input files contain a map with certain "obstacles" and the initial places of 2 "robots".

####Compilation & Execution

#####Complilation

```sh
git clone https://github.com/dimosr7/Pathfinding
cd C
make
```

#####Execution
```sh
./bin/robots input_files/input.txt
./bin/robots input_files/input2.txt
./bin/robots input_files/input3.txt
```