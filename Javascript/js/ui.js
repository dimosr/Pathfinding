/* Generic Classes */

var Coordinate = function(row, column){
    this.row = row;
    this.column = column;
}

Coordinate.prototype.getRow = function(){
    return this.row;
}

Coordinate.prototype.getColumn = function(){
    return this.column;
}

Coordinate.prototype.equals = function(coordinate){
    if( (this.getRow() == coordinate.getRow()) && (this.getColumn() == coordinate.getColumn()) ){
        return true;
    }
    else{
        return false;
    }
}

var Node = function(coordinate, DOMobject){
    this.coordinate = coordinate
    this.cell = DOMobject;
    this.predecessor = null;
    this.gCost = null;
    this.fCost = null;
}

var SquareMap = function(dimension){
    this.dimension = dimension;
    this.array = Create2DArray(dimension);
}

Node.prototype.getCoordinate = function(){
    return this.coordinate;
}

Node.prototype.getCell = function(){
    return this.cell;
}

Node.prototype.getGCost = function(){
    return this.gCost;
}

Node.prototype.setGCost = function(gCost){
    this.gScore = gCost;
}


Node.prototype.getFCost = function(){
    return this.fCost;
}

Node.prototype.setFCost = function(fCost){
    this.fCost = fCost;
}

Node.prototype.getPredecessor = function(){
    return this.predecessor;
}

Node.prototype.setPredecessor = function(predecessor){
    this.predecessor = predecessor;
}

Node.prototype.setInPath = function(){
    this.getCell().removeClass("closed").addClass("in-path");
}

Node.prototype.setOpen = function(){
    this.getCell().addClass("open");
}

Node.prototype.isOpen = function(){
    return this.getCell().hasClass("open");
}

Node.prototype.setClosed = function(){
    this.getCell().removeClass("open").addClass("closed");
}

Node.prototype.isClosed = function(){
    return this.getCell().hasClass("closed");
}

Node.prototype.makeObstacle = function(){
    $(this.cell).addClass("obstacle");
}

Node.prototype.isObstacle = function(){
    return $(this.cell).hasClass("obstacle");
}

Node.prototype.isRobot1 = function(){
    return $(this.cell).attr('id') == 'robot1';
}

Node.prototype.isRobot2 = function(){
    return $(this.cell).attr('id') == 'robot2';
}

SquareMap.prototype.getDimension = function(){
    return this.dimension;
}

SquareMap.prototype.getArray = function(){
    return this.array;
}

SquareMap.prototype.getNode = function(coordinate) {
    return this.array[coordinate.getRow()][coordinate.getColumn()];
}

SquareMap.prototype.setNode = function(coordinate,node) {
    this.array[coordinate.getRow()][coordinate.getColumn()] = node;
}

SquareMap.prototype.getNeighboursCoordinates = function(node){
    var currentRow = node.getCoordinate().getRow();
    var currentColumn = node.getCoordinate().getColumn();
    var dimension = this.getDimension();
    var existingCoordinates = new Set();
    var neighboursCoordinates = new Set();
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
            neighboursCoordinates.add(coordinate);
        }
    });
    return neighboursCoordinates;
}

/* A-star classes and methods */

Node.prototype.isObstacle = function(){
    return this.getCell().hasClass('obstacle');
}

/* Initialization of Map */

function createMap(dimension, containerID, cellsClass){
    
    var map = new SquareMap(dimension);
    var mockCell = createCellDiv(cellsClass);

    for(var i = 0; i < dimension; i++){
        for(var j = 0; j < dimension; j++){
            if(j==0){
                var cell = mockCell.clone().css('clear', 'left'); 
            }
            else{
                var cell = mockCell.clone()
            }
            var node = new Node(new Coordinate(i,j), cell);
            var cell = $( "#" + containerID ).append( cell );
            map.array[i][j] = node;
        }
    }
    return map;
}

function Create2DArray(dimension) {
    var arr = new Array();
    for (i=0;i<dimension;i++) {
        arr[i]=new Array();
        for (j=0;j<dimension;j++) {
            arr[i][j]=null;
        }
    }
    return arr;
}

function createCellDiv(cellClass){
    var div = $('<div>', {'class': cellClass});
    div = div.width('30px');
    div = div.height( '30px' );
    return div;
}

/* ----  UI Workflow functions ---- */

Node.prototype.enableObstacleToggle = function(){
    this.getCell().click(function(){
        $(this).toggleClass('obstacle');
    });
}

Node.prototype.disableObstacleToggle = function(){
    this.getCell().unbind('click');
}

function enableObstacles(map){
    var node;
    for(var i=0;i<map.getDimension();i++){
        for(var j=0;j<map.getDimension();j++){
            map.getNode(new Coordinate(i,j)).enableObstacleToggle();
        }
    }
    $('#user-message').html("<div data-alert class='alert-box secondary'>" +
            "You can set the obstacles in the map by clicking on a node.<br/>" +
            "Grey nodes are free and black nodes are obstacles.<br/>" +
            "When you have finished, press again the button to proceed.<br/>" +
            "</div>");

}

function disableObstacles(map){
    var node;
    for(var i=0;i<map.getDimension();i++){
        for(var j=0;j<map.getDimension();j++){
            map.getNode(new Coordinate(i,j)).disableObstacleToggle();
        }
    }
}


function enableRobot1(){
    $('#user-message').html("<div data-alert class='alert-box warning'>" +
            "You can set the positions of the 2 robots by clicking on a node.<br/>" +
            "When you have finished, select the algorithm to be executed,<br/>" +
            "set the speed of the animation demo press again the button to execute the DEMO." +
            "</div>");
    $('.cell').not('.obstacle').click(function(){
        setRobot1($(this));
        disableRobot();
        enableRobot2();
    });
}

function disableRobot(){
    $('.cell').unbind('click');
}

function setRobotsCoordinates(){
    robot1Coordinate = transform1Dto2D($('#robot1').index(), map.getDimension());
    robot2Coordinate = transform1Dto2D($('#robot2').index(), map.getDimension());
}

function enableRobot2(){
    $('.cell').not('#robot1').not('.obstacle').click(function(){
        setRobot2($(this));
        robotsDefined = true;
        disableRobot();
        setRobotsCoordinates();
    });
}

function executeAlgorithm(){
    alert("Algorithm executed !");
}

function setRobot1(obj){
    robot1Image = "img/robot1.gif"
    obj.attr('id', robot1ID);
    obj.html("<img src='" + robot1Image + "'/>");
}

function setRobot2(obj){
    robot2Image = "img/robot2.jpg"
    obj.attr('id', robot2ID);
    obj.html("<img src='" + robot2Image + "'/>");
}

function initHandlers(){
    $( document ).ready(function() {
        $('#speed-slider-container').hide();
    });

    $('#demo-button').click(function(){
        $(this).unbind('click');
        $(this).removeClass('info').addClass('disabled');
        enableObstacles(map);
        $(this).html("Done with obstacles. Set robots positions.");
        $(this).click(function(){
            $(this).unbind('click');
            $(this).removeClass('disabled').addClass('success');
            $(this).html("Execute DEMO");
            $('#speed-slider-container').show();
            $(document).foundation();
            $('#demo-button').after("<select id='algorithm'>" +
                                    "<option value='A_star'>A* star algorithm</option>" +
                                    "<option value='bfs'>Breadth First Search (BFS)</option>" +
                                    "<option value='dfs'>Depth First Search (DFS)</option>" +
                                    "</select>");
            disableObstacles(map);
            enableRobot1();
            $(this).click(function(){
                if(robotsDefined){
                    $(this).unbind('click');
                    $(this).removeClass('success').addClass('alert');
                    $(this).html("Reset DEMO");
                    var delay = $('#speed-slider').attr('data-slider');
                    $('#speed-slider-container').hide();
                    dispatchPathfindingAlgorithm($('#algorithm').val(), delay);
                    $(this).click(function(){
                        location.reload();
                    });
                }
                else{
                    alert("You must first define the positions of the 2 robots.")
                }
            });
        });
    })
}

function dispatchPathfindingAlgorithm(algorithmName, delay){
    if(algorithmName == "A_star"){
        map.executeAStarAlgorithmRecursive(robot1Coordinate, robot2Coordinate, delay);
    }
    else if(algorithmName == "bfs"){
        map.executeBFSRecursive(robot1Coordinate, robot2Coordinate, delay/4);
    }
    else if(algorithmName == "dfs"){
        map.executeDFSRecursive(robot1Coordinate, robot2Coordinate, delay/4);
    }
}

/* ----  Algorithm API functions ---- */
function transform2Dto1D(coordinate, dimension){
    if( (coordinate.getRow() > (dimension-1)) || (coordinate.getColumn() > (dimension-1)) ){
        throw new Error("Array out of Index");
    }
    else{
        return (coordinate.getRow()*dimension + coordinate.getColumn());
    }
}

function transform1Dto2D(index, dimension){
    if( (index < 0) || (index > (Math.pow(dimension,2)-1) ) ){
        throw new Error("Array out of Index");
    }
    else{
        var row = Math.floor(index/dimension);
        var column = index % dimension;
        return new Coordinate(row, column);
    }
}
/* ----  Unit Testing ---- */

function handleUnitTests(){
    if(unitTestsExecuted == false){
        executeUnitTests();
        unitTestsExecuted = true;
    }

    if(unitTestsVisible == false){
        $('#qunit').show({
            duration:2000,
            easing:"linear"
        });
        unitTestsVisible = true;
        $('#unit-test-button').html("Disable Unit Tests");
    }
    else{
        $('#qunit').hide({
            duration:2000,
            easing:"linear"
        });
        unitTestsVisible = false;
        $('#unit-test-button').html("Enable Unit Tests");
    }
    $('#unit-test-button').toggleClass("success").toggleClass("alert");
}

/* Pathfinding help Functions */

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