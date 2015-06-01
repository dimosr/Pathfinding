#ifndef INCLUDE_INPUTHANDLER_H_
#define INCLUDE_INPUTHANDLER_H_

#include <vector>
#include <iostream>
#include <fstream>
#include <stdexcept>
#include <string>
#include "include/SquareGraph.h"
using namespace std;

class InputHandler {
public:
	SquareGraph readMap(string filename);
};

#endif /* INCLUDE_INPUTHANDLER_H_ */
