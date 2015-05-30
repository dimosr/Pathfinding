#include "include/SquareGraph.h"

SquareGraph::SquareGraph(int dimension): map(dimension, vector<Node>(dimension)), openNodes(), closedNodes() {
}

Node SquareGraph::getCellValue(pair<int, int> coord){
	return this->map[coord.first][coord.second];
}

void SquareGraph::setCellValue(pair<int, int> coord, char value){
	this->map[coord.first][coord.second].setState(Node::UNVISITED);
	this->map[coord.first][coord.second].setType(value);
	this->map[coord.first][coord.second].x = coord.first;
	this->map[coord.first][coord.second].y = coord.second;
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

bool SquareGraph::compareNodes::operator()(Node n1, Node n2){
		return n1.getTotalCost() > n2.getTotalCost();
}

bool SquareGraph::isInsideMap(Node n){
	return (n.x >= 0) && (n.y >= 0) && (n.x < map[0].size()) && (n.y < map.size()) ;
}

set<Node> SquareGraph::getNeighbours(Node n){
	set<Node> neighbours;
	Node temp;
	list<int> values = {-1, 1};

	for(int i : values){
		for(int j : values){
			temp = getCellValue(make_pair((n.x+i), (n.y+j)));
			if( (!temp.isObstacle()) && (isInsideMap(temp)) ){
				neighbours.insert(temp);
			}
		}
	}
	return neighbours;
}

vector<Node> SquareGraph::reconstructPath(Node to, Node from){
	vector<Node> path;
	Node tmp = from;
	Node parent;

	path.push_back(tmp);
	while(tmp.getParent() != nullptr){
		parent = *(tmp.getParent());
		path.push_back(parent);
		tmp = parent;
	}
	reverse(path.begin(), path.end());
	return path;
}

vector<Node> SquareGraph::executeAStar(){
	pair<int, int> start = this->getFirstRobotPos();
	pair<int, int> target = this->getSecondRobotPos();
	Node startNode = getCellValue(start);
	Node targetNode = getCellValue(target);
	vector<Node> path;
	Node currentNode;
	set<Node> neighbours;

	openNodes.push(startNode);
	startNode.setOpen();
	while(!openNodes.empty()){
		currentNode = openNodes.top();
		if(&currentNode == &targetNode){
			return reconstructPath(startNode, targetNode);
		}

		openNodes.pop();
		closedNodes.push(currentNode);
		currentNode.setClosed();
		neighbours = getNeighbours(currentNode);
		for(auto i = neighbours.begin(); i != neighbours.end(); ++i){
			Node neighbour = *i;
			if(!neighbour.isClosed()){
				int tentativeScore = currentNode.getCostFromStart() + this->calculateDistance(make_pair(currentNode.x, currentNode.y), make_pair(neighbour.x, neighbour.y));
				if( (!neighbour.isOpen()) || (tentativeScore < currentNode.getCostFromStart()) ){
					neighbour.setParent(currentNode);
				}
			}
		}

	}

	return path;
}
