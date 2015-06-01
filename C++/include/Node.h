#ifndef NODE_H_
#define NODE_H_

#include <map>
using namespace std;

class Node {
public:
	enum Type{NORMAL, OBSTACLE};
	enum State{UNVISITED, OPEN, CLOSED};
	static map<char, Type> typeMappings;

	Node();
	Node(char type);
	void calculateTotalCost();
	float getCostFromStart();
	float getCostToTarget();
	float getTotalCost();
	void setCostFromStart(float cost);
	void setCostToTarget(float cost);
	void setTotalCost(float cost);
	Node * getParent();
	void setParent(Node* n);
	State getState();
	Type getType();
	void setType(char type);
	void setState(State state);
	bool isObstacle();
	void setOpen();
	void setClosed();
	bool isUnvisited();
	bool isOpen();
	bool isClosed();
	bool operator<(const Node& n) const;

	int x,y;
private:
	float costFromStart;
	float costToTarget;
	float totalCost;
	Node * parent;
	State state;
	Type type;

};

#endif /* NODE_H_ */
