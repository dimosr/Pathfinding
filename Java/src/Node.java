
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
	int costFromStart;
	int costToTarget;
	int total_cost;
	Node parent;
	int node_state;
	int x;
	int y;

	public void UpdateCosts()
	{
		this.total_cost = (this.costFromStart + this.costToTarget);
	}

	public Node(int x, int y, int targetX, int targetY, int costFromStart)
	{
		this.costFromStart = costFromStart;
		Distance_Evalutation(x, y, targetX, targetY);
		UpdateCosts();
		this.parent = null;
		this.node_state = 0;
		this.x = x;
		this.y = y;
	}

	public void Distance_Evalutation(int fromX, int fromY, int toX, int toY)
	{
		int i;
		if (fromX <= toX) {
			i = 0;
		} else {
			i = 2 * (fromX - toX);
		}
		int j = Math.abs(toY - fromY);

		this.costToTarget = (i + j);
	}

	public int is_not_visited(int[][] paramArrayOfInt, int paramInt1, int paramInt2, int paramInt3)
	{
		if ((paramInt1 <= 0) || (paramInt1 >= paramInt3)) {
			return 0;
		}
		if ((paramInt2 <= 0) || (paramInt2 >= paramInt3)) {
			return 0;
		}
		if (paramArrayOfInt[paramInt1][paramInt2] != 1) {
			return 0;
		}
		return 1;
	}

	public int is_not_hinder(int[][] paramArrayOfInt, int paramInt1, int paramInt2, int paramInt3)
	{
		if ((paramInt1 <= 0) || (paramInt1 >= paramInt3)) {
			return 1;
		}
		if ((paramInt2 <= 0) || (paramInt2 >= paramInt3)) {
			return 1;
		}
		if (paramArrayOfInt[paramInt1][paramInt2] != 0) {
			return 1;
		}
		return 0;
	}
}
