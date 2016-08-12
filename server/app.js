var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function (req, res) {
  var song = req.body;
  var songMatch;
  var emptyField;
  //object is being sent over from clietn side
  console.log("the song is",song.title);
  console.log(song.artist);

  if(song.title === ''|| song.artist === ''){
    var emptyField = true;
    res.sendStatus(400);
    //400 means error
  }
  for(var idx =0;idx < songs.length;idx++){
    if (song.title === songs[idx].title && song.artist === songs[idx].artist){
      songMatch = true;
      res.sendStatus(400);
    }
  }
  if(songMatch === true || emptyField === true){
    res.sendStatus(400);
    // res.sendStatus(200);
  }
  else{
    var d = new Date();
    var dateAdded = (d.getMonth() + 1) + '-' + (d.getDate()) + '-' + d.getFullYear();
    console.log(dateAdded);
    song.dateAdded = dateAdded;
    songs.push(song);
    console.log("hello");
    res.sendStatus(200);
  }
});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
