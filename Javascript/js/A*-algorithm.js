SquareMap.prototype.executeAStarAlgorithm = function (start, target){
    var openNodesCoordinates = new Set();     //to be evaluated
    var currentNode, neighbourNodes, tentativeCost;

    startNode = map.getNode(start);
    openNodesCoordinates.add(startNode.getCoordinate());

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    while(openNodesCoordinates.size() > 0){
        var currentNode = getOptimum(openSet);
        if(!currentNode){
            alert("no path");
            return false;
        }
        if( currentNode.getCoordinate().equals(target) ){
            reconstructPath(currentNode);
            return true;    //path found
        }

        openNodes.remove(currentNode.getCoordinate());
        currentNode.setClosed();
        neighbourNodesCoordinates = this.getNeighboursCoordinates(currentNode);
        neighbourNodesCoordinates.each(function(neighbourCoordinate){
            neighbour = map.getNode(neighbourCoordinate);
            if( !neighbour.isClosed() ){
                tentativeCost = currentNode.getGCost() + heuristicCost(currentNode.getCoordinate() ,neighbour.getCoordinate());
                if( (tentativeCost < neighbour.getGCost()) || (!openNodes.contains(neighbour)) ){
                    neighbour.setPredecessor(currentNode);
                    neighbour.setGCost(tentativeCost);
                    neighbour.setFCost(neighbour.getGCost() + heuristicCost(neighbour.getCoordinate(),target) );
                    if(!openNodes.contains(neighbour)){
                        openNodes.add(neighbour);
                        neighbour.setOpen();
                    }
                }
            }
        })
    }
    return false;       //no possible path
}

function heuristicCost(from, to){
    var x_distance = Math.pow((from.getRow() - to.getRow()),2);
    var y_distance = Math.pow((from.getColumn() - to.getColumn()),2);

    var euclideanDistance = Math.sqrt(x_distance + y_distance);
    return euclideanDistance;
}

function getOptimum(nodesCoordinates){
    var minimumFCost;
    var minNode;
    if(nodesCoordinates.size() == 0){
        alert("zero size");
        return null;
    }
    else{
        nodesCoordinates.each(function(coordinate){
            var node = map.getNode(coordinate);
            if( (!minNode) || ( node.getFCost() < minimumFCost ) ){
                minimumFCost = node.getFCost() ;
                minNode = node;
            }
        });
    }
    nodesCoordinates.remove(minNode.getCoordinate());
    return minNode;
}

SquareMap.prototype.executeAStarAlgorithmRecursive = function (start, target, delay){
    var openNodesCoordinates = new Set();     //to be evaluated
    var currentNode, tentativeCost;
    var pathExists = true;


    startNode = map.getNode(start);
    openNodesCoordinates.add(startNode.getCoordinate());

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    setTimeout(function(){
        map.executeAStarStep(pathExists, openNodesCoordinates, target, delay);
    }, delay);


}

SquareMap.prototype.executeAStarStep = function(solutionFound, openSet, target, delay){
    var neighbourNodesCoordinates
    var currentNode = getOptimum(openSet);
    if(!currentNode){
        solutionFound = false;
        return solutionFound;
    }
    if( currentNode.getCoordinate().equals(target) ){
        reconstructPath(currentNode);
        return true;    //path found
    }

    openSet.remove(currentNode.getCoordinate());
    currentNode.setClosed();
    neighbourNodesCoordinates = this.getNeighboursCoordinates(currentNode);
    neighbourNodesCoordinates.each(function(neighbourCoordinate){
        neighbour = map.getNode(neighbourCoordinate);
        if( !neighbour.isClosed() ){
            tentativeCost = currentNode.getGCost() + heuristicCost(currentNode.getCoordinate() ,neighbour.getCoordinate());
            if( (tentativeCost < neighbour.getGCost()) || (!openSet.contains(neighbour.getCoordinate())) ){
                neighbour.setPredecessor(currentNode);
                neighbour.setGCost(tentativeCost);
                neighbour.setFCost(neighbour.getGCost() + heuristicCost(neighbour.getCoordinate(),target) );
                if(!openSet.contains(neighbour.getCoordinate())){
                    openSet.add(neighbour.getCoordinate());
                    neighbour.setOpen();
                }
            }
        }
    })
    setTimeout(function(){
        map.executeAStarStep(solutionFound, openSet, target, delay);
    }, delay);

}