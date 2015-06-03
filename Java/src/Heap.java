
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

import java.util.Arrays;
import java.util.PriorityQueue;

public class Heap<T extends Comparable> extends PriorityQueue<T> {
	
    private static final int DEFAULT_CAPACITY = 10;
    protected T[] array;
    protected int size;
    
    @SuppressWarnings("unchecked")
	public Heap () {
        array = (T[])new Comparable[DEFAULT_CAPACITY];  
        size = 0;
    }
    
    public boolean add(T value) {
        // grow array if needed
        if (size >= array.length - 1) {
            array = this.resize();
        }        
        // place element into heap at bottom
        size++;
        int index = size;
        array[index] = value;
        
        bubbleUp();
        return true;
    }
    
    public boolean isEmpty() {
        return size == 0;
    }

    public T peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }
        return array[1];
    }

    public T remove() {
    	T result = peek();
    	
    	array[1] = array[size];
    	array[size] = null;
    	size--;
    	
    	bubbleDown(); 	
    	return result;
    }
    
    public String toString() {
        return Arrays.toString(array);
    }

    protected void bubbleDown() {
        int index = 1;
        
        while (hasLeftChild(index)) {
            int smallerChild = leftIndex(index);
            
            if (hasRightChild(index)
                && array[leftIndex(index)].compareTo(array[rightIndex(index)]) > 0) {
                smallerChild = rightIndex(index);
            } 
            
            if (array[index].compareTo(array[smallerChild]) > 0) {
                swap(index, smallerChild);
            } else {
                break;
            }
            
            index = smallerChild;
        }        
    }
    
    protected void bubbleUp() {
        int index = this.size;
        
        while (hasParent(index)
                && (parent(index).compareTo(array[index]) > 0)) {
            swap(index, parentIndex(index));
            index = parentIndex(index);
        }        
    }
    
    
    protected boolean hasParent(int i) {
        return i > 1;
    }
    
    
    protected int leftIndex(int i) {
        return i * 2;
    }
    
    
    protected int rightIndex(int i) {
        return i * 2 + 1;
    }
    
    
    protected boolean hasLeftChild(int i) {
        return leftIndex(i) <= size;
    }
    
    
    protected boolean hasRightChild(int i) {
        return rightIndex(i) <= size;
    }
    
    
    protected T parent(int i) {
        return array[parentIndex(i)];
    }
    
    
    protected int parentIndex(int i) {
        return i / 2;
    }
    
    
    protected T[] resize() {
        return Arrays.copyOf(array, array.length * 2);
    }
    
    
    protected void swap(int index1, int index2) {
        T tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;        
    }
}
 
class HeapException extends Exception {
    public HeapException(String message) {
        super(message);
    }
}


