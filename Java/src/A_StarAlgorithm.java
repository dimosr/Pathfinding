
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


import java.io.*; 


public class A_StarAlgorithm {



	public static void main(String[] args) throws InvalidLetterException,FileNotFoundException,IOException,HeapException{

		BufferedReader in;
		String text_file,s; 
		int dimension,i,j,T_first_x=0,T_first_y=0,G_first_x=0,G_first_y=0;
		char letter;
		int goal_found = 0,queue_empty=0;		//When found in A*, the target-node will become 1 (true)
		Node extracted = null ;		//the node that will be extracted at each step
		
	
	
		text_file = args[0];

		in = new BufferedReader(new FileReader(text_file));

		s = in.readLine();
		dimension = Integer.parseInt(s);

		int  map[][] = new int[dimension][dimension];
		int closed[][] = new int[dimension][dimension];

		for(i=0;i<dimension;i++){
			s = in.readLine();
			for(j=0;j<dimension;j++){
				closed[i][j]=0;
				letter = s.charAt(j);
				if(letter=='X'){
					map[i][j]=0;
				}
				else if(letter==' '){
					map[i][j]=1;
				}
				else if(letter=='T'){
					map[i][j]=1;
					T_first_x = i;
					T_first_y = j; 
				}
				else if(letter=='G'){
					map[i][j]=1;
					G_first_x= i;
					G_first_y= j;
				}
				else {
					throw new InvalidLetterException("There was a wrong character in the text file.The character must be X, ,T or G.");
				}
			}
		}


		BinaryMinHeap_PriorityQueue myheap = new BinaryMinHeap_PriorityQueue(1);
		
		Node start_node = new Node(T_first_x,T_first_y,G_first_x,G_first_y,0);
		closed[T_first_x][T_first_y]=1;
		myheap.insert(start_node.total_cost,start_node);
		
		while( (goal_found!=1) && (queue_empty!=1) ){			//while target-node not found, continue
			extracted = myheap.extractMin();		

          		if(extracted == null) queue_empty=1;
			else if( (extracted.x == G_first_x ) && (extracted.y == G_first_y)  )	goal_found=1;	
			else{		//extending the extracted node and putting the neighbours in the heap
				if( (extracted.is_not_visited(map,extracted.x-1,extracted.y,dimension)!=0) && (extracted.is_not_hinder(closed,extracted.x-1,extracted.y,dimension)!=1) ){   //upside
					Node inserted = new Node(extracted.x-1,extracted.y,G_first_x,G_first_y,extracted.costFromStart+2);
					myheap.insert(inserted.total_cost,inserted);
					closed[inserted.x][inserted.y]=1;
				}
				if( (extracted.is_not_visited(map,extracted.x+1,extracted.y,dimension)!=0) && (extracted.is_not_hinder(closed,extracted.x+1,extracted.y,dimension)!=1) ){   //downside
					Node inserted2 = new Node(extracted.x+1,extracted.y,G_first_x,G_first_y,extracted.costFromStart);
					myheap.insert(inserted2.total_cost,inserted2);
					closed[inserted2.x][inserted2.y]=1;
				}
				if( (extracted.is_not_visited(map,extracted.x,extracted.y-1,dimension)!=0) && (extracted.is_not_hinder(closed,extracted.x,extracted.y-1,dimension)!=1) ){   //leftside	
					Node inserted3 = new Node(extracted.x,extracted.y-1,G_first_x,G_first_y,extracted.costFromStart+1);
					myheap.insert(inserted3.total_cost,inserted3);
					closed[inserted3.x][inserted3.y]=1;
				}
				if( (extracted.is_not_visited(map,extracted.x,extracted.y+1,dimension)!=0) && (extracted.is_not_hinder(closed,extracted.x,extracted.y+1,dimension)!=1) ){   //rightside	
					Node inserted4 = new Node(extracted.x,extracted.y+1,G_first_x,G_first_y,extracted.costFromStart+1);
					myheap.insert(inserted4.total_cost,inserted4);
					closed[inserted4.x][inserted4.y]=1;
				}

			}
		}
		if (queue_empty!=1)	System.out.format("Sum of moves to reach target : %d\n",extracted.costFromStart);
		else System.out.println("-1");
	}
	
	
}

