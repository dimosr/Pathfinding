/* Generic Classes */

var Node = function(row, column, DOMobject){
    this.row = row;
    this.column = column;
    this.DOM = DOMobject;
}

var SquareMap = function(dimension){
    this.dimension = dimension;
    this.array = Create2DArray(dimension);
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

function enableObstacles(){
    $('.' + cellClass).each(function(){
        $(this).click(function(){
            toggleObstacleState($(this));
        });
    });
    alert("You can set the obstacles in the map by clicking on a node.\n" +
            "Grey nodes are free and black nodes are obstacles.\n" +
            "When you have finished, press again the button to proceed.\n");

}

function disableObstacles(){
    $('.' + cellClass).each(function(){
        $(this).unbind('click');
    });
}

function enableRobotsPositions(){
    $('.' + cellClass).not('.' + obstacleClass).click(function(){
        setRobot1($(this));
        $('.' + cellClass).unbind('click');
        $('.' + cellClass).not('.' + obstacleClass).not('.robot1').click(function(){
            setRobot2($(this));
            $('.' + cellClass).unbind('click');
        });
    });
    alert("You can set the positions of the 2 robots by clicking on a node.\n" +
            "If you click when having already defined the 2 robots, the oldest one will be reset.\n" +
            "When you have finished, press again the button to execute the DEMO.\n");
}

function executeAlgorithm(){
    alert("Algorithm executed !");
}

function toggleObstacleState(obj){
    obj.toggleClass("obstacle");
}

function setRobot1(obj){
    robot1Image = "img/robot1.gif"
    obj.attr('id', robot1ID);
    obj.html("<img src='" + robot1Image + "'/>");
}

function getRobot1Position(){
    var index = $( $('#' + robot1ID) ).index();
    return transform1Dto2D(index, map_dimension);
}

function setRobot2(obj){
    robot2Image = "img/robot2.jpg"
    obj.attr('id', robot2ID);
    obj.html("<img src='" + robot2Image + "'/>");
}

function getRobot2Position(){
    var index = $( $('#' + robot2ID) ).index();
    return transform1Dto2D(index, map_dimension);
}

/* ----  Algorithm API functions ---- */

function getCell(row, column){
    var index_1D = transform2Dto1D(row, column, mapDimension);
    return $( $('.' + cellClass).get( index_1D ) );
}

function setNodeExpanded(obj){
    obj.removeClass( "red" ).addClass("green");
}

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

function isObstacle(obj){
    return obj.hasClass(obstacleClass);
}

function isRobot1(obj){
    obj.hasClass(robot1Class);
}

function isRobot2(obj){
    obj.hasClass(robot2Class);
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