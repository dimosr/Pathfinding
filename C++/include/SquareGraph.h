#ifndef SQUAREGRAPH_H_
#define SQUAREGRAPH_H_

#include <vector>
#include <algorithm>
#include <set>
#include <list>
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
	bool isInsideMap(Node n);
	class compareNodes{
		public:
		bool operator()(Node n1, Node n2);
	};
	set<Node> getNeighbours(Node n);
	vector<Node> executeAStar();
	vector<Node> reconstructPath(Node to, Node from);
	priority_queue<Node , vector<Node>, compareNodes> openNodes;
	priority_queue<Node, vector<Node>, compareNodes> closedNodes;
};

#endif /* SQUAREGRAPH_H_ */
