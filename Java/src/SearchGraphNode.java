
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

class SearchGraphNode
{
	int cost_g;
	int cost_h;
	int total_cost;
	SearchGraphNode parent;
	int node_state;
	int x;
	int y;

	public void UpdateCosts()
	{
		this.total_cost = (this.cost_g + this.cost_h);
	}

	public SearchGraphNode(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5)
	{
		this.cost_g = paramInt5;
		Distance_Evalutation(paramInt1, paramInt2, paramInt3, paramInt4);
		UpdateCosts();
		this.parent = null;
		this.node_state = 0;
		this.x = paramInt1;
		this.y = paramInt2;
	}

	public void Distance_Evalutation(int paramInt1, int paramInt2, int paramInt3, int paramInt4)
	{
		int i;
		if (paramInt1 <= paramInt3) {
			i = 0;
		} else {
			i = 2 * (paramInt1 - paramInt3);
		}
		int j = Math.abs(paramInt4 - paramInt2);

		this.cost_h = (i + j);
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
