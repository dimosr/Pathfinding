    /**************************************************
    Copyright (C) 2014  Raptis Dimos <raptis.dimos@yahoo.gr>


    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	**************************************************/

import java.awt.Point;
import java.io.*;

public class InputHandler {
	
	public SquareGraph readMap(String filename) throws IOException, InvalidLetterException{
		
		File file = new File(filename);
		BufferedReader in = new BufferedReader(new FileReader(filename));;
		

		try{
			
			String dimension =in.readLine();
			int mapDimension = Integer.parseInt(dimension);
			
			SquareGraph graph = new SquareGraph(mapDimension);
			
			String line;
			for(int i=0; i<mapDimension; i++){
				line = in.readLine();
				for(int j=0; j<mapDimension; j++){
					char typeSymbol = line.charAt(j);
					if(typeSymbol == ' '){
						Node n = new Node(i,j, "NORMAL");
						graph.setMapCell(new Point(i,j), n);
					}
					else if(typeSymbol == 'X'){
						Node n = new Node(i,j, "OBSTACLE");
						graph.setMapCell(new Point(i,j), n);
					}
					else if(typeSymbol == 'T'){
						Node n = new Node(i,j, "NORMAL");
						graph.setMapCell(new Point(i,j), n);
						graph.setStartPosition(new Point(i,j));
					}
					else if(typeSymbol == 'G'){
						Node n = new Node(i,j, "NORMAL");
						graph.setMapCell(new Point(i,j), n);
						graph.setTargetPosition(new Point(i,j));
					}
					else{
						throw new InvalidLetterException("There was a wrong character in the text file.The character must be X, ,T or G.");
					}
				}
			}
			return graph;
		}
		catch(IOException e){
			throw e;
		}
		finally{
			in.close();
		}
	}
}
