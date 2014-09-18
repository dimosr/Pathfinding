
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


import static java.lang.System.*;
 
/****** This class is about Priority Queue, which is implemented using Binary Min Heap.
 *** So here we'll implement Binary Min Heap being used as Priority Queue******/
 
public class BinaryMinHeap_PriorityQueue {
 
    /***
     *** Heap Property:
     *** - It is a complete Tree
     *** - It is a Binary Tree
     *** - Every node is smaller than its left and right child. Known as MIN-HEAP.
     ***
     *** - If every node is bigger than its left and right child. Known as MAX-HEAP.
     ***
     *** Heap is Loosely Sorted
     *** - In heap, we know that root is always smaller than left and right child, but there is no mention if left child is smaller than right or not.
     *** - Good to maintain min or max at run time.
     *** - Good to maintain median at run time (if we keep 2 heaps - one as MAX HEAP having half smaller
     ***        elements : example{1,2,3,4,5}, and other as MIN HEAP that other half greater elements.{6,7,8,9,10})
     ***
     *** Heaps are data structures that enable us to represent Binary trees without any pointers.
     *** Thus no extra memory is required to store pointers in heaps, as we do it in a normal Binary tree.
     ***
     *** A heap is a complete binary tree, which leads to the idea of storing it using an array.
     *** By utilizing array-based representation, we can reduce memory costs while tree navigation remains quite simple.
     ***
     *** Though it saves memory but is less flexible than using pointers.
     *** We cannot move the nodes around by just changing pointers. So it does not provide us the benefits
     *** of Binary Search tree, but works out well for heaps. Thus it is not good for searching, since we
     *** don't have pointers - we cannot do log n search, but we can anyways do a liner search when required.
     ***
     ***/
     
	public static void main(String[] args){
		System.out.println("I am working");
	}	

     
    /***
     *****************************************
                          1 {0}
 
                     /             \
         
                 3 {1}                6 {2}
         
                /      \              /  
         
             5 {3}      9 {4}      8 {5}     
 
    {i} -- this is the index in array
     
    array representation : {1,3,6,5,9,8}
    index :                [0,1,2,3,4,5]
     
    Index of LEFT Child of a element at index i :: Left(i) = (2 *** i) + 1;
    Left child of array[1] is array[3];
     
    Index of RIGHT Child of a element at index i :: Right(i) = (2 *** i) + 2;
    Right child of array[1] is array[4];
     
    Index of PARENT of a element at index i :: Parent(i) = (int) (i-1)/2;
    Parent of array[4] is array[1];
    Parent of array[5] is array[2];
     
     
    *****************************************
    ***/
     
     
    int[] data;
    int heapSize;
    SearchGraphNode[] node;
     
    public BinaryMinHeap_PriorityQueue(int size) {
	int i;
	
        data = new int[size];
	node = new SearchGraphNode[size];
        heapSize = 0;
	for(i=0;i<size;i++)	node[i] = null;
    }
         
     
    public int getLeftChildindex(int nodeIndex) {
        return (2 * nodeIndex) + 1;
    }
     
    public int getRightChildindex(int nodeIndex) {
        return (2 * nodeIndex) + 2;
    }
     
    public int getParentindex(int nodeIndex) {
        return (int) (nodeIndex - 1)/2;
    }
     
     
    /***********************INSERTION*********************/
     
    /*** INSERTION ALGO:
     ***
     *** 1) Insert the new element to the end of array
     *** 2) Keep shifting it UP - till the heap property is not achieved.
     *** Shifting up means - compare the node with its parent, if they are not as per heap property - swap them.
     ***
     ***
     *** Insert -2 into the above heap --
     ***
                          1 {0}
 
                     /             \
         
                 3 {1}                6 {2}
         
                /      \              /   \
         
             5 {3}      9 {4}      8 {5}   -2 {6}
             
    array representation : {1,3,6,5,9,8,-2}
              
    Heap property is broken, so keep shifting new element UP
     
     
                          1 {0}
 
                     /             \
         
                 3 {1}                -2 {2}
         
                /      \              /   \
         
             5 {3}      9 {4}      8 {5}   6 {6}
              
    array representation : {1,3,-2,5,9,8,6}     
              
    Heap property is still broken, so keep shifting new element UP
                            
                            
                           -2 {0}
 
                     /             \
         
                 3 {1}                1 {2}
         
                /      \              /   \
         
             5 {3}      9 {4}      8 {5}   6 {6}
              
    array representation : {-2,3,1,5,9,8,6}
    Now the heap property is achieved. Items in Order. No more shifting required. 
     
     
    COMPLEXITY
    Complexity of the insertion operation is O(h), where h is heap's height
    AND h = log n, where n is number of elements in a heap.
    Thus, complexity O(h) = O(log n)
      
     ***
     ***/
     
     
    public void insert (int value,SearchGraphNode new_node) throws HeapException {
        if(heapSize == data.length){
            //throw new HeapException("Heap Overflow");
	    BinaryMinHeap_PriorityQueue new_heap = new BinaryMinHeap_PriorityQueue(heapSize+1);
	    int[] copied_data =new int [heapSize+1];
	    SearchGraphNode[] copied_node =new SearchGraphNode[heapSize+1];
	    System.arraycopy(this.data,0,copied_data,0,this.data.length);
	    System.arraycopy(this.node,0,copied_node,0,this.node.length);
	    this.data = copied_data;
	    this.node = copied_node;
	}
	if(new_node == null)
	    throw new HeapException("Heap Overflow");
        heapSize++;
        int currentIndex = heapSize - 1;
        data[currentIndex] = value;
	this.node[currentIndex] = new_node;
        bubbleUP(currentIndex);
    }
     
    public void bubbleUP(int nodeIndex) {
        if(nodeIndex == 0)
            return;
        int indexOfParent = getParentindex(nodeIndex);
        if((data[indexOfParent] > data[nodeIndex]) && indexOfParent >= 0) {
            int tmp = data[indexOfParent];
            data[indexOfParent] = data[nodeIndex];
            data[nodeIndex] = tmp;
	    SearchGraphNode tmp2 = node[indexOfParent];
	    node[indexOfParent] = node[nodeIndex];
	    node[nodeIndex] = tmp2; 
            nodeIndex = indexOfParent;
            bubbleUP(nodeIndex);
        } else
            return;
    }
     
     
    public void insertWithoutRecursion(int value) {
         
        heapSize++;
         
        int currentIndex = heapSize - 1;
        data[currentIndex] = value;
         
        int tmp;
        int indexOfParent = getParentindex(currentIndex);
         
        while ((data[indexOfParent] > data[currentIndex]) && indexOfParent >= 0) {
            tmp = data[indexOfParent];
            data[indexOfParent] = data[currentIndex];
            data[currentIndex] = tmp;
            currentIndex = indexOfParent;
            indexOfParent = getParentindex(currentIndex);
        }
 
    }
     
     
    /***********************REMOVE MINIMUM*********************/
     
    /***REMOVE MINIMUM ALGO:
     ***
     *** Min in a MIN-HEAP is always the root element
     ***
     *** 1) copy the last element in the array to the root
     *** 2) decrease the heapsize by 1
     *** 3) bubbleDOWN till the heap property is achieved
     ***        - If there are no children, sifting down is over.
     ***        - If there is one child, check the heap property with it and shift down if required.
     ***        - If there are 2 children, check the heap property and if not met, swap with smaller of the children.
     ***
     ***
     *** *** Remove minimum from this heap --
     ***
                          1 {0}
 
                     /             \
         
                 3 {1}                6 {2}
         
                /      \              /  
         
             5 {3}      9 {4}      8 {5}  
             
    array representation : {1,3,6,5,9,8}
              
    Copy the last value array[5] = 8 to the root and decrease heapSize by 1.
     
     
                          8 {0}
 
                     /             \
         
                 3 {1}                6 {2}
         
                /      \               
         
             5 {3}      9 {4}      
              
    array representation : {8,3,6,5,9}      
              
    Heap property is still broken, so keep shifting down element 8
                            
                            
                          3 {0}
 
                     /             \
         
                 8 {1}                6 {2}
         
                /      \               
         
             5 {3}      9 {4}      
              
    Heap property is still broken, so keep shifting down element 8
                  
                          3 {0}
 
                     /             \
         
                 5 {1}                6 {2}
         
                /      \               
         
             8 {3}      9 {4}      
              
    array representation : {3,5,6,8,9}
    Now the heap property is achieved. Items in Order. No more shifting required. 
     
     
    COMPLEXITY
    Complexity of the removal operation is O(h), where h is heap's height
    AND h = log n, where n is number of elements in a heap.
    Thus, complexity O(h) = O(log n)
      
     ***
     *** ***/
     
    public SearchGraphNode extractMin() {
        int min = data[0];
        if(heapSize == 0) return null;
	SearchGraphNode extracted_node = this.node[0];
        removeMin();
	//System.out.format("Evgala apo to heap ton komvo me timi : %d",min);
        return extracted_node;
    }
     
    public void removeMin() {
        if(heapSize == 0)
            return;
        data[0] = data[heapSize -1];
	node[0] = node[heapSize-1];
        heapSize--;
        if(heapSize > 0)
            bubbleDOWN(0);
    }
 
    public void bubbleDOWN(int nodeIndex) {
        int leftChildIndex = getLeftChildindex(nodeIndex);
        int rightChildIndex = getRightChildindex(nodeIndex);
        int smallerValueIndex = -1;
        if (leftChildIndex < heapSize && rightChildIndex < heapSize) {
            smallerValueIndex = (data[leftChildIndex] - data[rightChildIndex]) < 0 ? leftChildIndex : rightChildIndex;
        } else if (leftChildIndex < heapSize) {
            smallerValueIndex = leftChildIndex;
        } else if (rightChildIndex < heapSize) {
            smallerValueIndex = rightChildIndex;
        } else {
            return;
        }
        if (smallerValueIndex >= 0 && data[smallerValueIndex] < data[nodeIndex]) {
            int tmp = data[nodeIndex];
            data[nodeIndex] = data[smallerValueIndex];
            data[smallerValueIndex] = tmp;
	    SearchGraphNode temp2 = node[nodeIndex];
	    node[nodeIndex] = node[smallerValueIndex];
	    node[smallerValueIndex] = temp2;
            nodeIndex = smallerValueIndex;
            bubbleDOWN(nodeIndex);
        }
    }
     
 
    /***********************CREATE HEAP *********************/
 
    public void makeHeap(int[] array,SearchGraphNode[] map) throws HeapException {
        for (int i = 0; i < array.length; i++) {
            this.insert(array[i],map[i]);
        }
    }
     
}
 
 
 
 
class HeapException extends Exception {
    public HeapException(String message) {
        super(message);
    }
}


