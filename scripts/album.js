

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

var $row = $(template);



var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));

       if (currentlyPlayingSongNumber !== null) {

    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
   currentlyPlayingCell.html(currentlyPlayingSongNumber);
 }
 if (currentlyPlayingSongNumber !== songNumber) {

   $(this).html(pauseButtonTemplate);
   setSong(songNumber);
   currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
   updatePlayerBarSong();
 } else if (currentlyPlayingSongNumber === songNumber) {

   $(this).html(playButtonTemplate);
   $('.main-controls .play-pause').html(playerBarPlayButton);
   currentlyPlayingSongNumber = null;
   currentSongFromAlbum = null;
 }
     };


     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
               var songNumber = parseInt(songNumberCell.attr('data-song-number'));

               if (songNumber !== currentlyPlayingSongNumber) {
                   songNumberCell.html(playButtonTemplate);
               }
            };

     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
      }
      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };


     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

 var updatePlayerBarSong = function() {
   $('.song-name').text(currentSongFromAlbum.title);
   $('.artist-name').text(currentSongFromAlbum.artist);
   $('.artist-song-mobile').text(currentAlbum.artist + " - " + currentSongFromAlbum);
   $('.main-controls .play-pause').html(playerBarPauseButton);

 };

 var setCurrentAlbum = function(album) {
        currentAlbum = album;
        var $albumTitle = $('.album-view-title');
        var $albumArtist = $('.album-view-artist');
        var $albumReleaseInfo = $('.album-view-release-info');
        var $albumImage = $('.album-cover-art');
        var $albumSongList = $('.album-view-song-list');
        $albumTitle.text(album.title);
        $albumArtist.text(album.artist);
        $albumReleaseInfo.text(album.year + ' ' + album.label);
        $albumImage.attr('src', album.albumArtUrl);


        $albumSongList.empty();


     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
       $albumSongList.append($newRow);
     }
 };

 var setSong = function(songNumber) {
  var songIndex = parseInt(songNumber - 1);
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songIndex];
}



var getSongNumberCell = function(number) {

  return $('.song-item-number[data-song-number" ' + number + '"]')
}

 var updatePlayerBarSong = function() {
   $('.song-name').text(currentSongFromAlbum.title);
   $('.artist-name').text(currentSongFromAlbum.artist);
   $('.artist-song-mobile').text(currentAlbum.artist + " - " + currentSongFromAlbum);
   $('.main-controls .play-pause').html(playerBarPauseButton);

 };


 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

 var nextSong = function() {
     var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
     // Note that we're _incrementing_ the song here
     currentSongIndex++;

     if (currentSongIndex >= currentAlbum.songs.length) {
         currentSongIndex = 0;
     }

     // Save the last song number before changing it
     var lastSongNumber = currentlyPlayingSongNumber;

     // Set a new current song
     setSong(currentSongIndex + 1);
     currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

     // Update the Player Bar information
     updatePlayerBarSong();

     var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
     var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

     $nextSongNumberCell.html(pauseButtonTemplate);
     $lastSongNumberCell.html(lastSongNumber);
 };


 var previousSong = function() {
   var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
   currentSongIndex--;

   if (currentSongIndex <= 0) {
       currentSongIndex = currentAlbum.songs.length - 1;
   }

   var lastSongNumber = currentlyPlayingSongNumber;

   setSong(currentIndex + 1);
   currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

   updatePlayerBarSong();

   var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

   $nextSongNumberCell.html(pauseButtonTemplate);
   $lastSongNumberCell.html(lastSongNumber);

 };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $mainPlay = $('.main-controls .play-pause');



$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $mainPlay.click(toggleFromPlayerBar);
  });

var toggleFromPlayerBar = function() {
  var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
  if (currentSoundFile.isPaused()) {
    $currentlyPlayingCell.html(pauseButtonTemplate);
    $mainPlay.html(playerBarPauseButton);

  } else if (currentSoundFile) {
    $currentlyPlayingCell.html(pauseButtonTemplate);
    mainPlay.html(playerBarPlayButton);

  }

};
//   var albums = [albumPicasso, albumMarconi, albumFleetFoxes];
//   var index = 1;
//   albumImage.addEventListener("click", function(event) {
//     setCurrentAlbum(albums[index]);
//     index++;
//     if (index == albums.length) {
//       index = 0;
//     }
//
// });
