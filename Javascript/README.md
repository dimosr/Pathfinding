IMPLEMENTATION OF <br/>PATHFINDING ALGORITHMS<br/> (in Javascript)
======================================================================

Introduction
----------------------------------------------------------------------
This repository contains the implementation for A*, BFS, DFS in Javascript.
First of all, download the project :
```sh
git clone https://github.com/dimosr7/A.I.
cd A.I.
```

Tools
-----------------------------------------------------------------------------------------------
The following tools were used for the various stages of this project :

* Unit Testing : [QUnit](http://qunitjs.com/)
* Responsive Design : [Foundation](http://foundation.zurb.com/) + [jQuery](http://jquery.com/)
* Automated Build Process : [Apache Ant](http://ant.apache.org/)

Contents
----------------------------------------------------------------------------------------------
Each subfolder contains the following :

* *'css'* : custom css for design
* *'foundation'* : foundation dependencies
* *'img'* : images for the web demo
* *'ant-lib'* : YUI minifier needed for the automated build
* *'js'* : the whole implementation with help functions

Implementation
---------------------------------------------------------------------------------------------------
The *'js'* contains the files :<br/>
- 'A\*-algorithm.js' : implementation for A\*<br/>
- *'BFS.js'* : implementation for BFS<br/>
- *'DFS.js'* : implementation for DFS<br/>
- *'qunit.js'* : QUnit library<br/>
- *'ui.js'* : API functions for the UI interface<br/>
- *'util.js'* : 2 data structures used in the implementation (Set,Queue)<br/>

The search algorithms are implemented by the functions executeAStarAlgorithmRecursive(), executeBFSRecursive(), executeDFSRecursive() in the corresponding files

Build Process
------------------------------------------------------------------------------------------------
If you want to create a minified (faster) version, you can use the build.xml.
Just install the Apache Ant and execute :
```sh
cd Javascript
ant
```
A build folder will be created containing the minified version, which is also visible now in the [DEMO](http://www.dimosraptis.com/Pathfinding)