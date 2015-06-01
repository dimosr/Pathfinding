#include "include/SquareGraph.h"

SquareGraph::SquareGraph(int dimension): map(dimension, vector<Node>(dimension)), openNodes(), closedNodes() {
}

Node* SquareGraph::getCellValue(pair<int, int> coord){
	return &(this->map[coord.first][coord.second]);
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

bool SquareGraph::isInsideMap(pair<int, int> coord){
	return (coord.first >= 0) && (coord.second >= 0) && (coord.first < map[0].size()) && (coord.second < map.size()) ;
}

set<Node> SquareGraph::getNeighbours(Node n){
	set<Node> neighbours;
	Node* temp;
	list<int> values = {-1, 0, 1};

	for(int i : values){
		for(int j : values){
			if(!(i== 0 && j==0)){
				if( (isInsideMap(make_pair(n.x+i, n.y+j))) ){
					temp = getCellValue(make_pair((n.x+i), (n.y+j)));
					if( (!temp->isObstacle())){
						neighbours.insert(*temp);
					}
				}
			}
		}
	}
	return neighbours;
}

vector<Node> SquareGraph::reconstructPath(Node* to, Node* from){
	vector<Node> path;
	Node* tmp = from;
	Node* parent;

	path.push_back(*tmp);
	while(tmp->getParent() != nullptr){
		parent = (tmp->getParent());
		path.push_back(*parent);
		tmp = parent;
	}
	reverse(path.begin(), path.end());
	return path;
}

void SquareGraph::printPath(vector<Node> path){
	cout << "--- Path to target ---" << endl;
	for(auto i=path.begin(); i != path.end(); i++){
		Node node = *i;
		cout << "node : (" << node.x << "," << node.y << ")" << endl;
	}
}

vector<Node> SquareGraph::executeAStar(){
	pair<int, int> start = this->getFirstRobotPos();
	pair<int, int> target = this->getSecondRobotPos();
	Node* startNodePtr = getCellValue(start);
	Node* targetNodePtr = getCellValue(target);
	vector<Node> path;
	Node currentNode;
	set<Node> neighbours;

	openNodes.push(*startNodePtr);
	startNodePtr->setOpen();
	while(!openNodes.empty()){
		currentNode = openNodes.top();
		Node* currentPtr = getCellValue(make_pair(currentNode.x, currentNode.y));
		if( (currentPtr->x == targetNodePtr->x) && (currentPtr->y == targetNodePtr->y) ){
			return reconstructPath(startNodePtr, currentPtr);
		}

		openNodes.pop();
		closedNodes.push(*currentPtr);
		currentPtr->setClosed();
		neighbours = getNeighbours(*currentPtr);
		for(auto i = neighbours.begin(); i != neighbours.end(); ++i){
			Node* neighbourPtr = getCellValue(make_pair(i->x, i->y));
			if(!(neighbourPtr->isClosed())){
				int tentativeScore = currentNode.getCostFromStart() + this->calculateDistance(make_pair(currentPtr->x, currentPtr->y), make_pair(neighbourPtr->x, neighbourPtr->y));
				if( (!neighbourPtr->isOpen()) || (tentativeScore < currentNode.getCostFromStart()) ){
					neighbourPtr->setParent(currentPtr);
					neighbourPtr->setCostFromStart(tentativeScore);
					neighbourPtr->setCostToTarget(this->calculateDistance(make_pair(neighbourPtr->x, neighbourPtr->y), target));
					neighbourPtr->calculateTotalCost();
					if(!neighbourPtr->isOpen()){
						openNodes.push(*neighbourPtr);
						neighbourPtr->setOpen();
					}
				}
			}
		}

	}

	return path;
}
