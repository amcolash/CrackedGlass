function randomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function randomFloat(min,max) {
  return Math.random()*(max-min+1)+min;
}

$(function () {
  var rotation = 0;
  var count = 0;
  while(rotation < 360) {
    rotation += randomFloat(5, 45);
    drawLine(count, rotation);
    count++;
  }
});

function drawLine(count, rotation) {
  var max = 100;
  var maxLength = randomFloat(max * 0.7, max);
  var crackStart = 0;
  var crackHeight= 0;

  $('#svg svg').append('<g id="' + count + '" transform="rotate(' + rotation + ')"></g>');

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

    $('#' + count).append('<circle r="' + 2 * (1 - (length / maxLength)) + '" cx="' + x + '" cy="' + y + '"></circle>');
  }

  // needed to refresh the svg on the page (somewhat hackish, but ok for this example)
  $("#svg svg").html($("#svg svg").html());
}
