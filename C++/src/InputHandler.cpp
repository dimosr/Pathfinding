#include "include/InputHandler.h"

SquareGraph InputHandler::readMap(string filename) {

	int mapDimension;
	string line;
	char type;
	ifstream inputFile(filename.c_str());
	if (inputFile) {
		try{
			inputFile >> mapDimension;
			getline(inputFile, line);
			SquareGraph graph(mapDimension);
			for(int i = 0; i<mapDimension;i++){
					getline(inputFile, line);
					for(int j=0; j<mapDimension; j++){
						if(line.at(j) == 'T'){
							graph.setFirstRobotPos(make_pair(i,j));
							type = ' ';
						}
						else if(line.at(j) == 'G'){
							graph.setSecondRobotPos(make_pair(i,j));
							type = ' ';
						}
						else
							type = line.at(j);
						graph.setCellValue(make_pair(i, j), type);
					}
					line.clear();
			}
			graph.calculateAllCosts();
			Node * temp1 = new Node();
			temp1->setTotalCost(9);
			Node * temp2 = new Node();
			temp2->setTotalCost(3);
			Node * temp3 = new Node();
			temp3->setTotalCost(6);
			graph.openNodes.push(make_pair(make_pair(1,1), *temp1));
			graph.openNodes.push(make_pair(make_pair(2,2), *temp2));
			graph.openNodes.push(make_pair(make_pair(3,3), *temp3));
			cout << "top: " << graph.openNodes.top().first.first << endl;
			graph.openNodes.pop();
			cout << "top: " << graph.openNodes.top().first.first << endl;
			inputFile.close();
			return graph;
		}
		catch(exception &e){
			inputFile.close();
			throw runtime_error("Input file is not well formatted.");
		}
	}
	else{
		throw runtime_error("Could not open file");
	}
}
