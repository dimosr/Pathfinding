
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

public class SquareGraph {
	
	private Node[][] map;
	private Point startPosition;
	private Point targetPosition;
	
	public SquareGraph(int mapDimension){
		map = new Node[mapDimension][mapDimension];
		startPosition = new Point();
		targetPosition = new Point();
	}
	
	public Node getMapCell(Point coord){
		return map[(int)coord.getX()][(int)coord.getY()];
	}
	
	public void setMapCell(Point coord, Node n){
		map[(int)coord.getX()][(int)coord.getY()] = n;
	}
	
	public Point getStartPosition(){
		return startPosition;
	}
	
	public Point getTargetPosition(){
		return targetPosition;
	}
	
	public void setStartPosition(Point coord){
		targetPosition.setLocation(coord);
	}
	
	public void setTargetPosition(Point coord){
		startPosition.setLocation(coord);
	}
	
	
}
