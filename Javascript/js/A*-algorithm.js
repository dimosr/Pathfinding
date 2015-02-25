SquareMap.prototype.executeAStarAlgorithm = function (start, target){
    var openNodes = new Set();     //to be evaluated
    var currentNode, neighbourNodes, tentativeCost;

    startNode = map.getNode(start);
    openNodes.add(startNode);

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    while(openNodes.size() > 0){
        currentNode = getOptimum(openNodes);
        if(!currentNode){
            alert("no path");
            return false;
        }
        if( currentNode.getCoordinate().equals(target) ){
            reconstructPath(currentNode);
            return true;    //path found
        }

        openNodes.remove(currentNode);
        currentNode.setClosed();
        neighbourNodes = this.getNeighbours(currentNode);
        neighbourNodes.each(function(neighbour){
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

function getOptimum(nodes){
    var minimumFCost;
    var minNode;
    if(nodes.size() == 0){
        alert("zero size");
        return null;
    }
    else{
        nodes.each(function(node){
            if( (!minNode) || (node.getFCost() < minimumFCost ) ){
                minimumFCost = node.getFCost() ;
                minNode = node;
            }
        });
    }
    nodes.remove(minNode);
    return minNode;
}

SquareMap.prototype.executeAStarAlgorithmRecursive = function (start, target, delay){
    var openNodes = new Set();     //to be evaluated
    var currentNode, neighbourNodes, tentativeCost;
    var pathExists = true;


    startNode = map.getNode(start);
    openNodes.add(startNode);

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    setTimeout(function(){
        map.executeAStarStep(pathExists, openNodes, target, delay);
    }, delay);


}

SquareMap.prototype.executeAStarStep = function(solutionFound, openSet, target, delay){
    var currentNode = getOptimum(openSet);
    if(!currentNode){
        solutionFound = false;
        return solutionFound;
    }
    if( currentNode.getCoordinate().equals(target) ){
        reconstructPath(currentNode);
        return true;    //path found
    }

    openSet.remove(currentNode);
    currentNode.setClosed();
    neighbourNodes = this.getNeighbours(currentNode);
    neighbourNodes.each(function(neighbour){
        if( !neighbour.isClosed() ){
            tentativeCost = currentNode.getGCost() + heuristicCost(currentNode.getCoordinate() ,neighbour.getCoordinate());
            if( (tentativeCost < neighbour.getGCost()) || (!openSet.contains(neighbour)) ){
                neighbour.setPredecessor(currentNode);
                neighbour.setGCost(tentativeCost);
                neighbour.setFCost(neighbour.getGCost() + heuristicCost(neighbour.getCoordinate(),target) );
                if(!openSet.contains(neighbour)){
                    openSet.add(neighbour);
                    neighbour.setOpen();
                }
            }
        }
    })
    setTimeout(function(){
        map.executeAStarStep(solutionFound, openSet, target, delay);
    }, delay);

}