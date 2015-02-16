function createSquareMap(mapDimension, containerID){

    var div = $('<div>', {class: 'cell'});
    div = div.width('30px');
    div = div.height( '30px' );

    for(var i = 0; i < map_dimension; i++){
        for(var j = 0; j < map_dimension; j++){
            if(j==0){
                var cell = $( "#" + containerID ).append( div.clone().css('clear', 'left') );
            }
            else{
                var cell = $( "#" + containerID ).append( div.clone() );
            }
        }
    }

}