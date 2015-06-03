
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SquareGraph {
	
	private Node[][] map;
	private Point startPosition;
	private Point targetPosition;
	private Heap<Node> openNodes;
	private Set<Node> closedNodes;
	
	public SquareGraph(int mapDimension){
		map = new Node[mapDimension][mapDimension];
		startPosition = new Point();
		targetPosition = new Point();
		openNodes = new Heap<Node>();
		closedNodes = new HashSet<Node>();
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
	
	public int getDimension(){
		return map.length;
	}
	
	public void addToOpenNodes(Node n){
		openNodes.add(n);
	}
	
	public Node popBestOpenNode(){
		return openNodes.remove();
	}
	
	public void addToClosedNodes(Node n){
		closedNodes.add(n);
	}
	
	static double calculateDistance(Point from, Point to){
		return Math.pow(Math.pow(from.getX()-to.getX(), 2) + Math.pow(from.getY() - to.getY(), 2) , 0.5);
	}
	
	public ArrayList<Node> reconstructPath(Node target){
		ArrayList<Node> path = new ArrayList<Node>();
		Node current = target;
		
		while(current.getParent() != null){
			path.add(target.getParent());
			current = current.getParent();
		}
		Collections.reverse(path);
		return path;
	}
	
	public ArrayList<Node> executeAStar(){
		Node start = getMapCell(getStartPosition());
		Node target = getMapCell(getTargetPosition());
		addToOpenNodes(start);
		
		
	}
	
}
