/* Generic Classes */

var Node = function(row, column, DOMobject){
    this.row = row;
    this.column = column;
    this.cell = DOMobject;
}

var SquareMap = function(dimension){
    this.dimension = dimension;
    this.array = Create2DArray(dimension);
}

Node.prototype.getRow = function(){
    return this.row;
}

Node.prototype.getColumn = function(){
    return this.column;
}

Node.prototype.getCell = function(){
    return this.cell;
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

SquareMap.prototype.getNode = function(i,j) {
    return this.array[i][j];
}

SquareMap.prototype.getNode = function(i,j) {
    return this.array[i][j];
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
            var node = new Node(i, j, cell);
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
            map.getNode(i,j).enableObstacleToggle();
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
            map.getNode(i,j).disableObstacleToggle();
        }
    }
}


function enableRobot1(map){
    var node;
    for(var i=0;i<map.getDimension();i++){
        for(var j=0;j<map.getDimension();j++){
            node = map.getNode(i,j);
            if(!node.isObstacle()){
                node.getCell().click(function(){
                    setRobot1($(this));
                    enableRobot2(map);
                });
            }
        }
    }
    alert("You can set the positions of the 2 robots by clicking on a node.\n" +
            "If you click when having already defined the 2 robots, the oldest one will be reset.\n" +
            "When you have finished, press again the button to execute the DEMO.\n");
}

function enableRobot2(map){
    var node;
    for(var i=0;i<map.getDimension();i++){
        for(var j=0;j<map.getDimension();j++){
            node = map.getNode(i,j);
            node.getCell().unbind('click');
            if(!node.isObstacle() && !node.isRobot1()){
                node.getCell().one('click', function(){
                    setRobot2($(this));
                    disableRobots();
                });
            }
        }
    }
}

function disableRobots(){
    var node;
    for(var i=0;i<map.getDimension();i++){
        for(var j=0;j<map.getDimension();j++){
            node = map.getNode(i,j);
            if(!node.isObstacle()){
                node.getCell().unbind('click');
            }
        }
    }
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
}