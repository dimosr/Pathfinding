
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



#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <malloc.h>
#include <time.h>
#include <math.h>
//Author: Raptis Dimos-Dimitrios


typedef struct Node {
	int position_x; //node position
	int position_y;	//at map
	struct Node *parent; /* Parent of Current Node*/
	int state; /*0 when node has not been yet expanded, or else 1*/
	int g; /* g-value cost of current node */
	int h; /* h-value of cost current node */
	struct Node *r_sibling; /*Pointer to Right Sibling*/
	struct Node *child1; /*Pointer to Leftmost Child*/
	int depth;	//node's depth into the tree
} SearchGraphNode;

typedef struct {
	int state;	//0 when node has not been yet expanded, or else 1
	int g;	//total cost of the node
} InfoNode;

void Robot2_move(int **map,int rows,int columns,int current_x,int current_y,int *new_x,int *new_y,int time){
	
	int random_number,up,down,left,right;

	srand(time);
	

	if (current_x==0)	up=0;
	else if( (current_x>0) && (map[current_x-1][current_y]!=1) )	up=1;
	else if( (current_x>0) && (map[current_x-1][current_y]==1) )	up=0;
	
	if(current_x>=(rows-1))	down=0;
	else if( (current_x<(rows-1)) && (map[current_x+1][current_y]!=1) )	down=1;
	else if( (current_x<(rows-1)) && (map[current_x+1][current_y]==1) ) down=0;
	
	if(current_y==0)		left=0;
	else if( (current_y>0) && (map[current_x][current_y-1]!=1) )	left=1;
	else if( (current_y>0) && (map[current_x][current_y-1]==1) )	left=0;	

	if(current_y>=(columns-1))	right=0;
	else if( (current_y<(columns-1)) && (map[current_x][current_y]!=1) )	right=1;
	else if ( (current_y<(columns-1)) && (map[current_x][current_y]==1) )	right=0;
	


	if(  (up==1) && (down==1) ){
		if( (left==0) && (right==0) ){
			random_number=(rand()%2);
			if(random_number==0){
				*new_x=current_x-1;
				*new_y=current_y;
			}
			else if(random_number==1){
				*new_x=current_x+1;
				*new_y=current_y;
			}
		}
		else if( (left==0) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==0){
				*new_x=current_x-1;
				*new_y=current_y;
			}
			else if(random_number==1){
				*new_x=current_x;
				*new_y=current_y+1;
			}
			else if(random_number==2){
				*new_x=current_x+1;
				*new_y=current_y;
			}
		}
		else if( (left==1) && (right==0)){
			random_number=(rand()%2);
			if(random_number==0){
				*new_x=current_x-1;
				*new_y=current_y;
			}
			else if(random_number==1){
				*new_x=current_x;
				*new_y=current_y-1;
			}
			else if(random_number==2){
				*new_x=current_x+1;
				*new_y=current_y;
			}
		}
		else{
			random_number=(rand()%3);
			*new_x=(current_x-1)+random_number;
			if(*new_x==current_x){
				random_number=(rand()%2);
				if(random_number==0)	*new_y=current_y-1;
				else if(random_number==1)	*new_y=current_y+1;
			}
			else{
				*new_y=current_y;
			}
		}


	}
	else if( (up==0) && (down==1) ){
		if( (left==1) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==0){
				*new_x=current_x;
				*new_y=current_y-1;
			}
			else if(random_number==1){
				*new_x=current_x+1;
				*new_y=current_y;
			}
			else if(random_number==2){
				*new_x=current_x;
				*new_y=current_y+1;
			}
		}
		else if ( (left==0) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==1){
				*new_x=current_x;
				*new_y=current_y+1;
			}
			else{
				*new_x=current_x+1;
				*new_y=current_y;
			}
		}
		else if ( (left==1) && (right==0) ){
			random_number=(rand()%2);
			if(random_number==1){
				*new_x=current_x;
				*new_y=current_y-1;
			}
			else{
				*new_x=current_x+1;
				*new_y=current_y;
			}
		}
		else{
			*new_x=current_x+1;
			*new_y=current_y;
		}


	}
	else if( (up==1) && (down==0) ){
		
		if( (left==1) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==0){
				*new_x=current_x;
				*new_y=current_y-1;
			}
			else if(random_number==1){
				*new_x=current_x-1;
				*new_y=current_y;
			}
			else if(random_number==2){
				*new_x=current_x;
				*new_y=current_y+1;
			}
		}
		else if ( (left==0) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==1){
				*new_x=current_x;
				*new_y=current_y+1;
			}
			else{
				*new_x=current_x-1;
				*new_y=current_y;
			}
		}
		else if ( (left==1)&& (right==0) ){
			random_number=(rand()%2);
			if(random_number==1){
				*new_x=current_x;
				*new_y=current_y-1;
			}
			else{
				*new_x=current_x-1;
				*new_y=current_y;
			}
		}
		else{
			*new_x=current_x-1;
			*new_y=current_y;
		}
	
	}
	else{
		*new_x=current_x;
		if( (left==1) && (right==1) ){
			random_number=(rand()%2);
			if(random_number==1)	*new_y=current_y+1;
			else	*new_y=current_y-1;
		}
		else if ( (left==0) && (right==1) ){
			*new_y=current_y+1;
		}
		else if ( (left==1) && (right==0) ){
			*new_y=current_y-1;
		}

	}

 
}

int Robot1_Astar_move(int **map,int rows,int columns,int current_x1,int current_y1,int current_x2,int current_y2,SearchGraphNode **temp,SearchGraphNode **queue,int queue_size,InfoNode **help,int *opened_nodes){		//epistrefei ton arithmo twn kinisewn pou eginan (=3 an den vrike ton stoxo)

	int i,min_f,min_index,flag=0,up,down,left,right,possible_moves,g_cost;
	int distance_x,distance_y,manhattan_distance,index;
	SearchGraphNode *swap_pointer;	
	SearchGraphNode **new_nodes,**new_queue;

	while(flag==0){		//while we have not reached the node
		min_f=9999;
		for(i=0;i<queue_size;i++){		//refreshing the h costs and finding the best node in the queue
			distance_x=abs((queue[i]->position_x)-current_x2);
			distance_y=abs((queue[i]->position_y)-current_y2);
			manhattan_distance=distance_x+distance_y;
			queue[i]->h=manhattan_distance;
			//printf("The element (%d,%d) has h cost=%d kai g cost=%d)",queue[i]->position_x,queue[i]->position_y,queue[i]->h,queue[i]->g);
			if( (queue[i]->g+queue[i]->h)<min_f ){
				min_f=queue[i]->g+queue[i]->h;
				min_index=i;
			}
		}
	
		swap_pointer=queue[queue_size-1];
		queue[queue_size-1]=queue[min_index];
		queue[min_index]=swap_pointer;			//putting the best node in the end of the queue in order to be extracted afterwards
		
		current_x1=queue[queue_size-1]->position_x;
		current_y1=queue[queue_size-1]->position_y;
		help[current_x1][current_y1].state=1;
        //printf("From the queue the following state has been chosen (%d,%d)\n",queue[queue_size-1]->position_x,queue[queue_size-1]->position_y);
	

		if (current_x1==0)	up=0;
		else if( (current_x1>0) && (map[current_x1-1][current_y1]!=1) )	up=1;
		else if( (current_x1>0) && (map[current_x1-1][current_y1]==1) )	up=0;
	
		if(current_x1>=(rows-1))	down=0;
		else if( (current_x1<(rows-1)) && (map[current_x1+1][current_y1]!=1) )	down=1;
		else if( (current_x1<(rows-1)) && (map[current_x1+1][current_y1]==1) ) down=0;
	
		if(current_y1==0)		left=0;
		else if( (current_y1>0) && (map[current_x1][current_y1-1]!=1) )	left=1;
		else if( (current_y1>0) && (map[current_x1][current_y1-1]==1) )	left=0;	

		if(current_y1>=(columns-1))	right=0;
		else if( (current_y1<(columns-1)) && (map[current_x1][current_y1+1]!=1) )	right=1;
		else if ( (current_y1<(columns-1)) && (map[current_x1][current_y1+1]==1) )	right=0;


		
		possible_moves=up+down+right+left;//finding through map the 1-4 possible moves (nodes) I can go

		g_cost=queue[queue_size-1]->g+1;
		if(up==1){//checking how many of them can be expanded (showing lower cost than previous times)
			//,which means if we have reached them through other nodes
				if(help[current_x1-1][current_y1].g<=g_cost)	{
					up=0;
					possible_moves--;
				}	

		}
		if(down==1){
				if(help[current_x1+1][current_y1].g<=g_cost)	{
					down=0;
					possible_moves--;
				}	

		}
		if(left==1){
				if(help[current_x1][current_y1-1].g<=g_cost)	{
					left=0;
					possible_moves--;
				}	

		}
		if(right==1){
				if(help[current_x1][current_y1+1].g<=g_cost)	{
					right=0;
					possible_moves--;
				}	
		}
		
		//printf("The possible moves are %d\n",possible_moves);
		(*opened_nodes)=(*opened_nodes)+possible_moves;

		new_nodes=(SearchGraphNode **)malloc(possible_moves*sizeof(SearchGraphNode *));//inserting them in new_nodes array
		if(new_nodes==NULL) return -1;		//allocation error
		index=0;

		if(up==1){
			new_nodes[index]=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_nodes[index]->position_x=current_x1-1;
			new_nodes[index]->position_y=current_y1;
			new_nodes[index]->state=0;
			new_nodes[index]->g=g_cost;
			new_nodes[index]->depth=queue[queue_size-1]->depth+1;
			help[current_x1-1][current_y1].g=g_cost;
			index++;
		}
		if(down==1){
			new_nodes[index]=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_nodes[index]->position_x=current_x1+1;
			new_nodes[index]->position_y=current_y1;
			new_nodes[index]->state=0;
			new_nodes[index]->g=g_cost;
			new_nodes[index]->depth=queue[queue_size-1]->depth+1;
			help[current_x1+1][current_y1].g=g_cost;
			index++;
		}
		if(left==1){
			new_nodes[index]=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_nodes[index]->position_x=current_x1;
			new_nodes[index]->position_y=current_y1-1;
			new_nodes[index]->state=0;
			new_nodes[index]->g=g_cost;
			new_nodes[index]->depth=queue[queue_size-1]->depth+1;
			help[current_x1][current_y1-1].g=g_cost;
			index++;
		}
		if(right==1){
			new_nodes[index]=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_nodes[index]->position_x=current_x1;
			new_nodes[index]->position_y=current_y1+1;
			new_nodes[index]->state=0;
			new_nodes[index]->g=g_cost;
			new_nodes[index]->depth=queue[queue_size-1]->depth+1;
			help[current_x1][current_y1+1].g=g_cost;
			index++;
		}

        //printf("Index has the final value %d\n",index);
        //printf("The new nodes added are the following:\n");
        //for(i=0;i<possible_moves;i++)	printf("(%d,%d)\n",new_nodes[i]->position_x,new_nodes[i]->position_y);


		for(i=0;i<possible_moves;i++)  new_nodes[i]->parent=queue[queue_size-1];
		
		//prostheto sto dentro ta paidia apo ton new_nodes me patera ton teleutaio tou queue
		queue[queue_size-1]->child1=new_nodes[0];	//vazo deikti sto aristerotero paidi

		help[queue[queue_size-1]->position_x][queue[queue_size-1]->position_y].state=1;		//expanding this node
  
	    //putting with realloc the new nodes in the queue
		
		new_queue=(SearchGraphNode **)malloc(((queue_size+possible_moves)-1)*sizeof(SearchGraphNode *));		//-1 afou theloume na afairesoume ton teleftaio
		if(new_queue==NULL)return -1;

		for(i=0;i<queue_size-1;i++){
			new_queue[i] = (SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_queue[i] = queue[i];
		}
		for(i=queue_size-1;i<(queue_size+possible_moves-1);i++){
			new_queue[i]=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
			new_queue[i]=new_nodes[i-(queue_size-1)];
		}
		queue=new_queue;
	    //checking if any of the new nodes is the target and if so flag = 1 AND *temp=() tree node with depth=2
		for(i=queue_size-1;i<(queue_size+possible_moves-1);i++){
			if(  (queue[i]->position_x==current_x2)  &&  (queue[i]->position_y==current_y2)  ){
				flag=1;
				(*temp)=queue[i];
			}
		}
		
		queue_size=(queue_size-1)+possible_moves;

		free(new_nodes);


		
	}
	
	//running the whole route tree reversely until reach the 3rd step
	if(  ((*temp)->depth)>3){
		while( ((*temp)->depth)>3 ){
			(*temp)=(*temp)->parent;
		}
		return 3;
	}
	else{
		return ((*temp)->depth);
	}

	
}


int main(int argc, char *argv[]){

	int columns,rows,**map,i,j,robot1_initial_x,robot1_initial_y,robot2_initial_x,robot2_initial_y;	
	char symbol;
	int robot1_x,robot1_y,robot2_x,robot2_y,new_move_x,new_move_y,global_t=2;
	InfoNode **info;
	SearchGraphNode *route_tree,*temp;
	SearchGraphNode **queue;
	int queue_size,flag,x_moves[3],y_moves[3],current,total_nodes=0;
	
	char * filename;
	FILE *fp;
	
	if ( argc != 2 ){
        printf( "usage: %s <filename> \n", argv[0] );
        return 0;
    }
    else{
    	char * filename = argv[1];
    }

    fp = fopen(argv[1],"r");
	if(fp == NULL){
		char cwd[1024];
		getcwd(cwd, sizeof(cwd));
		printf("The input file 'input.txt' does not exist in the working directory : %s \n", cwd);

		printf("Press 'Enter' to terminate: ... ");
		while ( getchar() != '\n')
            ;
		return 0;
	}

	fscanf(fp,"%d %d\n",&columns,&rows);


	map=(int **)malloc(rows*sizeof(int *));
	info=(InfoNode **)malloc(rows*sizeof(InfoNode *));
	for(i=0;i<rows;i++){
		map[i]=(int *)malloc(columns*sizeof(int));
		info[i]=(InfoNode *)malloc(columns*sizeof(InfoNode));
	}

	fscanf(fp,"%d %d\n",&robot1_initial_x,&robot1_initial_y);
	printf("The initial place of robot 1 is (%d,%d)\n",robot1_initial_x,robot1_initial_y);
	robot1_initial_x--;
	robot1_initial_y--;
	fscanf(fp,"%d %d\n",&robot2_initial_x,&robot2_initial_y);
	printf("The initial place of robot 2 is (%d,%d)\n",robot2_initial_x,robot2_initial_y);
	robot2_initial_x--;
	robot2_initial_y--;
	
	for(i=0;i<rows;i++){
		for(j=0;j<columns;j++){
			info[i][j].state=0;			//initially no node has been "expanded"
			info[i][j].g=9999;		//the cost is initially considered infinite
			fscanf(fp,"%c",&symbol);
			if(symbol=='O')	map[i][j]=0;
			else if(symbol=='X')	map[i][j]=1;
			else	{
				printf("The map given in the input file does not have the right format");
				return 0;
			}
		}
		fscanf(fp,"\n");
	}

    printf("The given map is the following, where 0 means empty space and 1 means obstacle\n");
	for(i=0;i<rows;i++){
		for(j=0;j<columns;j++){
            
			printf("%d",map[i][j]);
		}
		printf("\n");
	}	


	robot1_x=robot1_initial_x;
	robot1_y=robot1_initial_y;
	robot2_x=robot2_initial_x;
	robot2_y=robot2_initial_y;

	


	
	while( (robot1_x!=robot2_x) || (robot1_y!=robot2_y) ){
		Robot2_move(map,rows,columns,robot2_x,robot2_y,&new_move_x,&new_move_y,global_t);
		robot2_x=new_move_x;
		robot2_y=new_move_y;
		printf("The robot 2 moved  to the place (%d,%d)\n",robot2_x+1,robot2_y+1);

		printf("Press 'Enter' to continue: ... ");
        	while ( getchar() != '\n')
            	;
		global_t++;

		queue=(SearchGraphNode **)malloc(sizeof(SearchGraphNode *));
		queue_size=1;

		total_nodes++;

		route_tree=(SearchGraphNode *)malloc(sizeof(SearchGraphNode));
		route_tree->position_x=robot1_x;
		route_tree->position_y=robot1_y;
		route_tree->parent=NULL;
		route_tree->state=0;
		route_tree->g=0;
		route_tree->child1=NULL;
		route_tree->depth=0;
		queue[0]=route_tree;

		info[robot1_x][robot1_y].g=0;
		info[robot1_x][robot1_y].state=0;
		
		if( (robot1_x!=robot2_x) || (robot1_y!=robot2_y) ){

			flag=Robot1_Astar_move(map,rows,columns,robot1_x,robot1_y,robot2_x,robot2_y,&temp,queue,queue_size,info,&total_nodes);
			if(flag==-1){
				printf("Error during the memory allocation");
				return 0;
			}
			else{
				current=0;
				while((temp->parent)!=NULL){
					new_move_x=temp->position_x;
					new_move_y=temp->position_y;
					x_moves[flag-current-1]=new_move_x;
					y_moves[flag-current-1]=new_move_y;
					temp=temp->parent;
					current++;
				}
			}
			robot1_x=x_moves[flag-1];
			robot1_y=y_moves[flag-1];
	
			for(i=0;i<flag;i++)	printf("The robot 1 moved to the place (%d,%d)\n",x_moves[i]+1,y_moves[i]+1);

	
			free(queue);
			free(route_tree);
		
			for(i=0;i<rows;i++){
				for(j=0;j<columns;j++){
					info[i][j].state=0;
					info[i][j].g=9999;
				}
			}

		}

			printf("Press 'Enter' to continue: ... ");
		
        		while ( getchar() != '\n')
            		;
		
	}

	printf("The robots were met at posiion (%d,%d)\n",robot1_x+1,robot1_y+1);
	printf("The total nodes produced in the tree during the searching were :%d\n",total_nodes);

	printf("Press 'Enter' to continue: ... ");
		
        		while ( getchar() != '\n')
            		;


	return 0;
	

}
