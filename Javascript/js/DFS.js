SquareMap.prototype.executeDFSRecursive = function(start, target, delay){
    var openNodesCoordinates = new Array();
    var currentNode;
    var pathExists = true;

    startNode = map.getNode(start);
    openNodesCoordinates.push(startNode.getCoordinate());

    setTimeout(function(){
        map.executeDFSStep(pathExists, openNodesCoordinates, target, delay);
    }, delay);
}

SquareMap.prototype.executeDFSStep = function(solutionFound, openStack, target, delay){
    var neighbourNodesCoordinates;
    currentNode = map.getNode(openStack.pop());
    if(!currentNode){
        solutionFound = false;
        alert("There is no path!");
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
                openStack.push(neighbour.getCoordinate());
                neighbour.setOpen();
            }
        }
    })
    setTimeout(function(){
        map.executeDFSStep(solutionFound, openStack, target, delay);
    }, delay);
}