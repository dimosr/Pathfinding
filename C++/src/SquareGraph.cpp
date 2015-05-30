#include "include/SquareGraph.h"

SquareGraph::SquareGraph(int dimension): map(dimension, vector<Node>(dimension)) {
}

Node SquareGraph::getCellValue(pair<int, int> coord){
	return this->map[coord.first][coord.second];
}

void SquareGraph::setCellValue(pair<int, int> coord, char value){
	this->map[coord.first][coord.second].setState(Node::UNVISITED);
	this->map[coord.first][coord.second].setType(value);
}

pair<int, int> SquareGraph::getFirstRobotPos(){
	return this->firstRobotPos;
}

pair<int, int> SquareGraph::getSecondRobotPos(){
	return this->secondRobotPos;
}

void SquareGraph::setFirstRobotPos(pair<int, int> coord){
	this->firstRobotPos = coord;
}

void SquareGraph::setSecondRobotPos(pair<int, int> coord){
	this->secondRobotPos = coord;
}

float SquareGraph::calculateDistance(pair<int, int> from, pair<int, int> to){
	return pow( pow((from.first - to.first), 2) + pow((from.second - to.second), 2) , 0.5);
}

void SquareGraph::calculateAllCosts(){
	for(int i=0; i<map.size(); i++){
		for(int j=0; j<map[0].size(); j++){
			map[i][j].setCostFromStart(calculateDistance(getFirstRobotPos(), make_pair(i,j)));
			map[i][j].setCostToTarget(calculateDistance(getSecondRobotPos(), make_pair(i,j)));
			map[i][j].calculateTotalCost();
		}
	}
}
