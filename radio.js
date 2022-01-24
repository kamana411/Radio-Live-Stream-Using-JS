var Radio = function(stations) {
    var self = this;
   
    self.stations = stations;
    self.index = 0;
    
    // Setup the display for each station.
    for (var i=0; i<self.stations.length; i++) {
      window['title' + i].innerHTML = '<b>' + self.stations[i].freq + '</b> ' + self.stations[i].title;
      window['station' + i].addEventListener('click', function(index) {
        var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing());
        
        radio.stop();
   
        if (isNotPlaying || !self.stations[index].howl) {
          radio.play(index);
        }
      }.bind(self, i));
    }
   };
   
   Radio.prototype = {
    play: function(index) {
      var self = this;
      var sound;
   
      index = typeof index === 'number' ? index : self.index;
      var data = self.stations[index];
   
      if (data.howl) {
        sound = data.howl;
      } else {
        sound = data.howl = new Howl({
          src: data.src,
          html5: true, 
          format: ['mp3', 'aac']
        });
      }
   
      sound.play();
   
      self.toggleStationDisplay(index, true);
   
      self.index = index;
    },
   
      stop: function() {
      var self = this;
   
      var sound = self.stations[self.index].howl;
   
      self.toggleStationDisplay(self.index, false);
   
      if (sound) {
        sound.stop();
      }
    },
   
      toggleStationDisplay: function(index, state) {
      var self = this;
   
      window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';
   
      window['live' + index].style.opacity = state ? 1 : 0;
   
      window['playing' + index].style.display = state ? 'block' : 'none';
    }
   };
   
   
   var radio = new Radio([
   {
      freq: '101.8',
      title: "kantipur fm",
      src: 'http://kantipur-stream.softnep.com:7248/;stream.nsv&type=mp3',
      howl: null
   },  
   {
      freq: '90',
      title: "Ujyalo 90", 
      src: 'http://ample-zeno-20.radiojar.com/wtuvp08xq1duv?rj-ttl=5&rj-token=AAABZjT4J-zC50cFCXhTzVpUQZ_nuhC1i5b5MxQeyzawGk83GXPmAQ',
      howl: null
    },
    {
      freq: '95.2',
      title: "kalika fm",
      src: 'http://kalika-stream.softnep.com:7740/;stream.nsv&type=mp3',
      Image:'http://radio.nepal.fm/wp-content/uploads/kalikafm.jpg',
      howl: null
    },
    {
      freq: '99.6',
      title: "Radio  tha sancahr",
      src: 'http://streaming.softnep.com:8025/;stream.nsv&type=mp3',
      howl: null
    },
    {
      freq: '94.0',
      title: "Radio annapruna nepal",
      src: 'http://streaming.softnep.net:8091/;stream.nsv&type=mp3',
      howl: null
    }]);