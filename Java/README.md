# IMPLEMENTATION OF A* ARTIFICIAL INTELLIGENCE ALGORITHM (in Java)

Introduction
------------

This repository contains the implementation for the A* algorithm in language Java.
* folder *src/* contains the classes used
* folder *input_files/* contains the test example input files
* in the *root* folder, you can find the ant script used for the compilation

Compilation & Execution
-----------------------

####Compilation
```sh
git clone https://github.com/dimosr7/Pathfinding
cd Java
ant
```

####Execution
```sh
java -cp build A_StarAlgorithm input_files/small_1.txt 
java -cp build A_StarAlgorithm input_files/small_2.txt 
java -cp build A_StarAlgorithm input_files/medium_1.txt 
java -cp build A_StarAlgorithm input_files/medium_2.txt 
java -cp build A_StarAlgorithm input_files/medium_3.txt 
java -cp build A_StarAlgorithm input_files/medium_4.txt 
java -cp build A_StarAlgorithm input_files/medium_5.txt 
java -cp build A_StarAlgorithm input_files/large.txt 
```