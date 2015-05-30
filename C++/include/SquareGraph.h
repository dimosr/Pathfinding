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
	class compareQueueElements{
		public:
			bool operator()(pair<pair<int,int>,Node> a, pair<pair<int,int>,Node> b);
	};
	//bool compareQueueElements(pair<pair<int,int>,Node> a, pair<pair<int,int>,Node> b);
	priority_queue< pair<pair<int,int>,Node> , vector<pair<pair<int,int>,Node> >, compareQueueElements> openNodes;
	priority_queue< pair<pair< int, int>,Node>, vector<pair<pair<int,int>,Node> >, compareQueueElements> closedNodes;
};

#endif /* SQUAREGRAPH_H_ */
