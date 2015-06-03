
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
		startPosition.setLocation(coord);
	}
	
	public void setTargetPosition(Point coord){
		targetPosition.setLocation(coord);
	}
	
	public int getDimension(){
		return map.length;
	}
	
	public void addToOpenNodes(Node n){
		n.setOpen();
		openNodes.add(n);
	}
	
	public Node popBestOpenNode(){
		return openNodes.remove();
	}
	
	public void addToClosedNodes(Node n){
		n.setClosed();
		closedNodes.add(n);
	}
	
	public boolean isInsideMap(Point p){
		return ( (p.getX() >= 0) && (p.getX() < getDimension())  && (p.getY() >= 0) && (p.getY() < getDimension()) );
	}
	
	public Set<Node> getNeighbours(Node n){
		Set<Node> neighbours = new HashSet<Node>();
		for(int i=-1; i<=1; i++){
			for(int j=-1; j<=1; j++){
				if( !(i==0 && j==0) )
					if(isInsideMap(new Point(n.getX() + i,n.getY() + j))){
						Node temp = getMapCell(new Point(n.getX() + i,n.getY() +  j));
						if(!temp.isObstacle())
							neighbours.add(temp);
					}
					
			}
		}
		return neighbours;
	}
	
	static double calculateDistance(Point from, Point to){
		return Math.pow(Math.pow(from.getX()-to.getX(), 2) + Math.pow(from.getY() - to.getY(), 2) , 0.5);
	}
	
	public ArrayList<Node> reconstructPath(Node target){
		ArrayList<Node> path = new ArrayList<Node>();
		Node current = target;
		
		while(current.getParent() != null){
			path.add(current.getParent());
			current = current.getParent();
		}
		Collections.reverse(path);
		return path;
	}
	
	public void printPath(ArrayList<Node> path){
		for(int i=0; i<path.size(); i++){
			Node node = path.get(i);
			System.out.println("node : (" + node.getX() + "," + node.getY() + ")");
		}
	}
	
	public ArrayList<Node> executeAStar(){
		Node start = getMapCell(getStartPosition());
		Node target = getMapCell(getTargetPosition());
		addToOpenNodes(start);
		
		start.setCostFromStart(0);
		start.setTotalCost( start.getCostFromStart() + calculateDistance(start.getPosition(), target.getPosition()) );
		while(!openNodes.isEmpty()){
			Node current = popBestOpenNode();
			if(current.equals(target)){
				return reconstructPath(target);
			}
			
			addToClosedNodes(current);
			Set<Node> neighbours = getNeighbours(current);
			for(Node neighbour : neighbours){
				if(!neighbour.isClosed()){
					double tentativeCost = current.getCostFromStart() + calculateDistance(current.getPosition(), neighbour.getPosition());
					
					if( (!neighbour.isOpen()) || (tentativeCost < neighbour.getCostFromStart()) ){
						neighbour.setParent(current);
						neighbour.setCostFromStart(tentativeCost);
						neighbour.setTotalCost(neighbour.getCostFromStart() + calculateDistance(neighbour.getPosition(), start.getPosition()));
						if(!neighbour.isOpen())
							addToOpenNodes(neighbour);
					}
				}
					
			}
		}
		
		return null;
	}
	
}
