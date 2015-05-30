#ifndef SQUAREGRAPH_H_
#define SQUAREGRAPH_H_

#include <vector>
#include <queue>
#include <math.h>
#include "include/Node.h"
using namespace std;

class SquareGraph {
private:
	vector< vector< Node > > map;
	pair<int, int> firstRobotPos;
	pair<int, int> secondRobotPos;

public:
	SquareGraph(int dimension);
	Node getCellValue(pair<int, int> coord);
	void setCellValue(pair<int, int> coord, char value);
	void setFirstRobotPos(pair<int, int> coord);
	void setSecondRobotPos(pair<int, int> coord);
	pair<int, int> getFirstRobotPos();
	pair<int, int> getSecondRobotPos();
	float calculateDistance(pair<int, int> from, pair<int, int> to);
	void calculateAllCosts();
	int executeAStar();

	priority_queue<int> openNodes;
	priority_queue<int> closedNodes;
};

#endif /* SQUAREGRAPH_H_ */
