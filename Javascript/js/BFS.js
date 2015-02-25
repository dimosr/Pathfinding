SquareMap.prototype.executeBFS = function(start, target){
    var closedNodes = new Set();    //already evaluated
    var openNodes = new Queue();     //to be evaluated
    var currentNode, neighbourNodes;

    startNode = map.getNode(start);
    openNodes.enqueue(startNode);

    while(!openNodes.isEmpty()){
        currentNode = openNodes.dequeue();
        if(!currentNode){
            alert("no path");
            return false;
        }
        if( currentNode.getCoordinate().equals(target) ){
            reconstructPath(currentNode);
            return true;    //path found
        }
        closedNodes.add(currentNode);
        currentNode.setClosed();
        neighbourNodes = this.getNeighbours(currentNode);
        neighbourNodes.each(function(neighbour){
            if( !neighbour.isClosed() ){
                if( !neighbour.isOpen() ){
                    neighbour.setPredecessor(currentNode);
                    openNodes.enqueue(neighbour);
                    neighbour.setOpen();
                }
            }
        })
    }
    return false;
}

SquareMap.prototype.executeBFSRecursive = function(start, target, delay){
    var openNodes = new Queue();     //to be evaluated
    var currentNode, neighbourNodes;
    var pathExists = true;

    startNode = map.getNode(start);
    openNodes.enqueue(startNode);

    setTimeout(function(){
        map.executeBFSStep(pathExists, openNodes, target, delay);
    }, delay);
}

SquareMap.prototype.executeBFSStep = function(solutionFound, openSet, target, delay){
    currentNode = openSet.dequeue();
    if(!currentNode){
        solutionFound = false;
        return solutionFound;
    }
    if( currentNode.getCoordinate().equals(target) ){
        reconstructPath(currentNode);
        return true;
    }

    currentNode.setClosed();
    neighbourNodes = this.getNeighbours(currentNode);
    neighbourNodes.each(function(neighbour){
        if( !neighbour.isClosed() ){
            if( !neighbour.isOpen() ){
                neighbour.setPredecessor(currentNode);
                openSet.enqueue(neighbour);
                neighbour.setOpen();
            }
        }
    })
    setTimeout(function(){
        map.executeBFSStep(solutionFound, openSet, target, delay);
    }, delay);

}