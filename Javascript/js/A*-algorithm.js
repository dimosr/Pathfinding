SquareMap.prototype.executeAStarAlgorithm = function (start, target){
    var closedNodes = new Set();    //already evaluated
    var openNodes = new Set();     //to be evaluated
    var currentNode, neighbourNodes, tentativeCost

    startNode = map.getNode(start.getRow(), start.getColumn());
    openNodes.add(startNode);

    startNode.setGCost(0);
    startNode.setFCost(0 + heuristicCost(start, target)) ;

    while(openNodes.size > 0){
        currentNode = getOptimum(openNodes);
        if( currentNode.getCoordinate().equals(target) ){
            reconstructPath(currentNode);
            return true;    //path found
        }

        openNodes.delete(currentNode);
        closedNodes.add(currentNode);
        neighbourNodes = this.getNeighbours(currentNode);
        neighbourNodes.forEach(function(neighbour){
            if( !closedNodes.has(neighbour) ){
                tentativeCost = currentNode.getGCost() + heuristicCost(currentNode.getCoordinate() ,neighbour.getCoordinate());
                if( (tentativeCost < neighbour.getGCost()) || (!openNodes.has(neighbour)) ){
                    neighbour.setPredecessor(currentNode);
                    neighbour.setGCost(tentativeCost);
                    neighbour.setFCost(neighbour.getGCost() + heuristicCost(neighbour.getCoordinate(),target) );
                    if(!openNodes.has(neighbour)){
                        openNodes.add(neighbour);
                    }
                }
            }
        })
    }*/
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
    nodes.forEach(function(node){
        if( (minNode === "undefined") || (node.getFCost() < minimumFCost ) ){
            minimumFCost = node.getFCost() ;
            minNode = node;
        }
    });
    nodes.delete(minNode);
    return minNode;
}

SquareMap.prototype.getNeighbours = function(node){
    var neighbours = new Set();
    if(node.getCoordinate().getRow()+1 <= map.getDimension())
        neighbours.add( this.getNode(node.getCoordinate().getRow()+1,node.getCoordinate().getColumn()) );
    if(node.getCoordinate().getColumn()+1 <= map.getDimension())
        neighbours.add( this.getNode(node.getCoordinate().getRow(),node.getCoordinate().getColumn()+1) );
    if(node.getCoordinate().getRow()-1 >= 0)
        neighbours.add( this.getNode(node.getCoordinate().getRow()-1,node.getCoordinate().getColumn()) );
    if(node.getCoordinate().getColumn()-1 >= 0)
        neighbours.add( this.getNode(node.getCoordinate().getRow(),node.getCoordinate().getColumn()-1) );
    return neighbours
}

function reconstructPath(finalNode){
    var path = new Array();
    var current = finalNode;
    path.push(finalNode);
    var predecessor = current.getPredecessor();
    while(predecessor != null){
        path.push(predecessor);
        current = predecessor;
        predecessor = current.getPredecessor();
    }
    var reversed = path.reverse();
    alert(reversed);
    return reversed;
}