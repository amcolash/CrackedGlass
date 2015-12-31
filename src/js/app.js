function randomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
 
function randomFloat(min,max) {
  return Math.random()*(max-min+1)+min;
}
 
$(function () {
  var options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Cracked Glass'
    },
    series: [{
      color: '#449944',
      name: 'Cracked Glass Test'
    }],
    xAxis: {
      tickInterval: 1,
      max: 40
    },
    yAxis: {
      tickInterval: 1,
      max: 4,
      min: -4
    }
  };
  
  var series = [];
  
  var maxLength = randomInt(10,40);
  var crackStart = 0;
  var crackHeight= 0; 
  
  for (var length = 0; length < maxLength; length++) {
    var x = length;
    var y = 0;
    
    if (crackHeight === 0 && randomInt(0,9) === 0) {
      crackStart = length;
      
      crackHeight = randomFloat(-3,3);
    } else if (crackHeight !== 0) {
      var tempX = (length - crackStart) / (maxLength - crackStart);
      var power = 3;
      
      y = Math.pow(tempX, power) / (Math.pow(tempX, power) + Math.pow((1 - tempX), power));
      y *= crackHeight;
    }
     
    $('#points ul').append('<li>(' + x + ', ' + y + ')</li>');
    series.push([x, y]);
  }
  
  options.series[0].data = series;
  $('#chart').highcharts(options);
  
  $('#svg svg').append('<rect width="420" height="420" x="-210" y="210" transform="rotate(45)"></rect>');
});