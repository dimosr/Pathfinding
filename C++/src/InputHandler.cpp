#include "include/InputHandler.h"

SquareGraph InputHandler::readMap(string filename) {

	int mapDimension;
	string line;
	ifstream inputFile(filename.c_str());
	if (inputFile) {
		try{
			inputFile >> mapDimension;
			getline(inputFile, line);
			cout << "mapDimension: " << mapDimension;
			SquareGraph graph(mapDimension);
			for(int i = 0; i<mapDimension;i++){
					getline(inputFile, line);
					for(int j=0; j<mapDimension; j++){
						cout << "value for " << i << "," << j << " : " << line.at(j) << endl;
						graph.setCellValue(i, j, line.at(j));
					}
					line.clear();
			}
			inputFile.close();
			return graph;
		}
		catch(exception &e){
			inputFile.close();
			throw e;
		}
	}
	else{
		throw runtime_error("Could not open file");
	}
}
