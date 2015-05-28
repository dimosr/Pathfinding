#ifndef SQUAREGRAPH_H_
#define SQUAREGRAPH_H_

#include <vector>
using namespace std;

class SquareGraph {
private:
	vector< vector< char > > map;
public:
	SquareGraph(int dimension);
	char getCellValue(int x, int y);
	void setCellValue(int x, int y, char value);
};

#endif /* SQUAREGRAPH_H_ */
