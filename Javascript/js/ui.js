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

var Node = function(coordinate, DOMobject){
    this.coordinate = coordinate
    this.cell = DOMobject;
    this.predecessor = null;
    this.gScore = null;
    this.fScore = null;
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

Node.prototype.getGScore = function(){
    return this.gScore;
}

Node.prototype.setGScore = function(gScore){
    this.gScore = gScore;
}


Node.prototype.getFScore = function(){
    return this.fScore;
}

Node.prototype.setFScore = function(fScore){
    this.fScore = fScore;
}

Node.prototype.getPredecessor = function(){
    return this.predecessor;
}

Node.prototype.setPredecessor = function(predecessor){
    this.predecessor = predecessor;
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

function enableRobot2(){
    $('.cell').not('#robot1').not('.obstacle').click(function(){
        setRobot2($(this));
        robotsDefined = true;
        disableRobot();
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
function transform2Dto1D(row, column, dimension){
    if( (row > (dimension-1)) || (column > (dimension-1)) ){
        throw new Error("Array out of Index");
    }
    else{
        return (row*dimension + column);
    }
}

function transform1Dto2D(index, dimension){
    if( (index < 0) || (index > (Math.pow(dimension,2)-1) ) ){
        throw new Error("Array out of Index");
    }
    else{
        var row = Math.floor(index/dimension);
        var column = index % dimension;
        var position = {
            "row" : row,
            "column" : column
        };
        return position;
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

function executeUnitTests(){

    QUnit.test("2D to 1D transformations", function( assert) {
        var value = transform2Dto1D(1,4,8);
        assert.ok(value, 12, "Passed!");
        try{
            var value = transform2Dto1D(8,4,8);
        }
        catch(err){
            assert.ok(value, "Array out of Index", "Passed!");
        }
    });

    QUnit.test("1D to 2D transformations", function( assert) {
        var value = transform1Dto2D(19,8);
        var position ={
            "row" : 2,
            "column" : 3
        }
        assert.deepEqual(value, position, "Passed!");
        try{
            var value = transform1Dto2D(64,8);
        }
        catch(err){
            assert.ok(value, "Array out of Index", "Passed!");
        }
    });

    QUnit.test("Node functionalities", function( assert) {
        var node = new Node(new Coordinate(3,4),null);
        assert.equal(node.getCoordinate().getRow(), 3, "Passed!");
        assert.equal(node.getCoordinate().getColumn(), 4, "Passed!");
        assert.equal(node.getCell(), null, "Passed");
    });

    QUnit.test("Square Map functionalities", function( assert) {
        var mockCell = createCellDiv("test");
        var map = new SquareMap(10);
        var node = new Node(new Coordinate(2,3),mockCell);
        map.setNode(new Coordinate(2,3),node);
        assert.deepEqual(map.getNode(new Coordinate(2,3)).getCell(), mockCell, "Passed!");
    });
}