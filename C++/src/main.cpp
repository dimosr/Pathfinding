#include <iostream>
#include "include/SquareGraph.h"
#include "include/InputHandler.h"
using namespace std;

int main(int argc, char* argv[]){
	if(argc != 2){
		cout << "Usage :" << endl;
		cout << "A-star " << "<filename>" << endl;
		return 1;
	}
	else{
		try{
			string filename = argv[1];
			InputHandler handler;
			SquareGraph graph = handler.readMap(filename);
		}
		catch(runtime_error &e){
			cout << "Runtime Error : " << e.what() << endl;
		}
		return 0;
	}
}

