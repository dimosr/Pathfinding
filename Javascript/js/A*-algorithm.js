SquareMap.prototype.executeAStarAlgorithm = function (start, target){
    var closedNodes = new Set();    //already evaluated
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
        closedNodes.add(currentNode);
        currentNode.setClosed();
        neighbourNodes = this.getNeighbours(currentNode);
        neighbourNodes.each(function(neighbour){
            if( !closedNodes.contains(neighbour) ){
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

SquareMap.prototype.getNeighbours = function(node){
    var currentRow = node.getCoordinate().getRow();
    var currentColumn = node.getCoordinate().getColumn();
    var dimension = this.getDimension();
    var existingCoordinates = new Set();
    var neighbours = new Set();
    if( (currentRow+1) < dimension){
        existingCoordinates.add( new Coordinate(currentRow+1,currentColumn) );
    }
    if( (currentRow-1) >= 0 ){
        existingCoordinates.add( new Coordinate(currentRow-1,currentColumn) );
    }
    if( (currentColumn+1) < dimension){
        existingCoordinates.add( new Coordinate(currentRow,currentColumn+1) );
    }
    if( (currentColumn-1) >= 0 ){
        existingCoordinates.add( new Coordinate(currentRow,currentColumn-1) );
    }
    existingCoordinates.each(function(coordinate){
        var currentNode = map.getNode(coordinate);
        if( !currentNode.isObstacle() ){
            neighbours.add(currentNode);
        }
    });
    return neighbours;
}

function reconstructPath(finalNode){
    var path = new Array();
    var current = finalNode;
    path.push(finalNode);
    var predecessor = current.getPredecessor();
    while(predecessor != null){
        predecessor.setInPath();
        path.push(predecessor);
        current = predecessor;
        predecessor = current.getPredecessor();
    }
    var reversed = path.reverse();
    return reversed;
}

var delay = 300;

SquareMap.prototype.executeAStarAlgorithmRecursive = function (start, target){
    var closedNodes = new Set();    //already evaluated
    var openNodes = new Set();     //to be evaluated
    var currentNode, neighbourNodes, tentativeCost;
    var pathExists = true;


    startNode = map.getNode(start);
    openNodes.add(startNode);

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    setTimeout(function(){
        map.executeAlgorithmStep(pathExists, openNodes, closedNodes, target);
    }, delay);


}

SquareMap.prototype.executeAlgorithmStep = function(solutionFound, openSet, closedSet, target){
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
    closedSet.add(currentNode);
    currentNode.setClosed();
    neighbourNodes = this.getNeighbours(currentNode);
    neighbourNodes.each(function(neighbour){
        if( !closedSet.contains(neighbour) ){
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
        map.executeAlgorithmStep(solutionFound, openSet, closedSet, target);
    }, delay);

}