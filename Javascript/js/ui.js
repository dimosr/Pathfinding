function createSquareMap(mapDimension, containerID){

    var div = $('<div>', {class: 'cell'});
    div = div.width('30px');
    div = div.height( '30px' );

    for(var i = 0; i < mapDimension; i++){
        for(var j = 0; j < mapDimension; j++){
            if(j==0){
                var cell = $( "#" + containerID ).append( div.clone().css('clear', 'left') );
            }
            else{
                var cell = $( "#" + containerID ).append( div.clone() );
            }
        }
    }

}

function handleUnitTests(){
	if(unitTestsExecuted == false){
        QUnit.test( "hello test", function( assert ) {
            assert.ok( 1 == "1", "Passed!" );
        });
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