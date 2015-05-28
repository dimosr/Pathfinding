#ifndef INCLUDE_INPUTHANDLER_H_
#define INCLUDE_INPUTHANDLER_H_

#include <iostream>
#include <fstream>
#include <stdexcept>
#include "include/SquareGraph.h"
using namespace std;

class InputHandler {
public:
	SquareGraph readMap(string filename);
};

#endif /* INCLUDE_INPUTHANDLER_H_ */
