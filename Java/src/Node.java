
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

class Node
{
	private enum State{
		UNVISITED, OPEN, CLOSED
	}
	private enum Type{
		NORMAL, OBSTACLE
	}
	
	int costFromStart;
	int costToTarget;
	int totalCost;
	Node parent;
	State state;
	Type type;
	int x;
	int y;

	public void UpdateCosts(){
		this.totalCost = (this.costFromStart + this.costToTarget);
	}

	public Node(int x, int y, String type){
		this.costFromStart = 0;
		this.costToTarget = 0;
		this.totalCost = 0;
		this.parent = null;
		this.state = State.UNVISITED;
		this.type = Type.valueOf(type);
		this.x = x;
		this.y = y;
	}

	public void Distance_Evalutation(int fromX, int fromY, int toX, int toY){
		int i;
		if (fromX <= toX) {
			i = 0;
		} else {
			i = 2 * (fromX - toX);
		}
		int j = Math.abs(toY - fromY);

		this.costToTarget = (i + j);
	}

}
