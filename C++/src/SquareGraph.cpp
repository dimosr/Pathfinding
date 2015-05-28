#include "include/SquareGraph.h"

SquareGraph::SquareGraph(int dimension): map(dimension, vector<char>(dimension)) {
}

char SquareGraph::getCellValue(int x, int y){
	return this->map[x][y];
}

void SquareGraph::setCellValue(int x, int y, char value){
	this->map[x][y] = value;
}
