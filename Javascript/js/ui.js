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
    this.getCell().addClass("green");
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
    var div = $('<div>', {class: cellClass});
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
    alert("You can set the obstacles in the map by clicking on a node.\n" +
            "Grey nodes are free and black nodes are obstacles.\n" +
            "When you have finished, press again the button to proceed.\n");

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
    alert("You can set the positions of the 2 robots by clicking on a node.\n" +
            "If you click when having already defined the 2 robots, the oldest one will be reset.\n" +
            "When you have finished, press again the button to execute the DEMO.\n");
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