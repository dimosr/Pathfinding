function executeUnitTests(){

    QUnit.test("2D to 1D transformations", function( assert) {
        var value = transform2Dto1D(new Coordinate(1,4),8);
        assert.ok(value, 12, "Passed!");
        try{
            var value = transform2Dto1D(new Coordinate(8,4),8);
        }
        catch(err){
            assert.ok(value, "Array out of Index", "Passed!");
        }
    });

    QUnit.test("1D to 2D transformations", function( assert) {
        var value = transform1Dto2D(19,8);
        var position = new Coordinate(2,3);
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