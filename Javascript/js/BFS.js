SquareMap.prototype.executeBFS = function(start, target){
    var openNodesCoordinates = new Queue();     //to be evaluated
    var currentNode, neighbourNodesCoordinates;

    startNode = map.getNode(start);
    openNodesCoordinates.enqueue(startNode.getCoordinate());

    while(!openNodesCoordinates.isEmpty()){
        currentNode = map.getNode(openNodes.dequeue());
        if(!currentNode){
            alert("There is no path");
            return false;
        }
        if( currentNode.getCoordinate().equals(target) ){
            reconstructPath(currentNode);
            return true;    //path found
        }

        currentNode.setClosed();
        neighbourNodesCoordinates = this.getNeighboursCoordinates(currentNode);
        neighbourNodesCoordinates.each(function(neighbour){
            neighbour = map.getNode(neighbourCoordinate);
            if( !neighbour.isClosed() ){
                if( !neighbour.isOpen() ){
                    neighbour.setPredecessor(currentNode);
                    openNodes.enqueue(neighbour.getCoordinate());
                    neighbour.setOpen();
                }
            }
        })
    }
    return false;
}

SquareMap.prototype.executeBFSRecursive = function(start, target, delay){
    var openNodesCoordinates = new Queue();     //to be evaluated
    var currentNode;
    var pathExists = true;

    startNode = map.getNode(start);
    openNodesCoordinates.enqueue(startNode.getCoordinate());

    setTimeout(function(){
        map.executeBFSStep(pathExists, openNodesCoordinates, target, delay);
    }, delay);
}

SquareMap.prototype.executeBFSStep = function(solutionFound, openQueue, target, delay){
    var neighbourNodesCoordinates;
    currentNode = map.getNode(openQueue.dequeue());
    if(!currentNode){
        solutionFound = false;
        alert("There is no path");
        return solutionFound;
    }
    if( currentNode.getCoordinate().equals(target) ){
        reconstructPath(currentNode);
        setTimeout(function(){showStatistics()},delay);
        return true;
    }

    currentNode.setClosed();
    neighbourNodesCoordinates = this.getNeighboursCoordinates(currentNode);
    neighbourNodesCoordinates.each(function(neighbourCoordinate){
        neighbour = map.getNode(neighbourCoordinate);
        if( !neighbour.isClosed() ){
            if( !neighbour.isOpen() ){
                neighbour.setPredecessor(currentNode);
                openQueue.enqueue(neighbour.getCoordinate());
                neighbour.setOpen();
            }
        }
    })
    setTimeout(function(){
        map.executeBFSStep(solutionFound, openQueue, target, delay);
    }, delay);

}