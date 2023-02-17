
var s = function (p){ //create instances of p5 to be able to draw 2 maps
  p.geo;
  p.info = L.control();
  p.map;
  p.legend;

  p.preload=function() {
    p.data = p.loadTable("summary.csv", "csv", "header");
  };

  p.setup=function() { 
    p.noCanvas();
    
    p.map = L.map('mapid2').setView([37.3, -119], 6);

    p.tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(p.map);
    
  p.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    p.info.update = function (props) {
      this._div.innerHTML = '<h4>Infections per County</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.infections + ' Infections'
        : 'Hover over a County');
    };	

    p.info.addTo(p.map);
    
    p.legend = L.control({position: 'bottomright'});

    p.legend.onAdd = function (map) {

      p.div = L.DomUtil.create('div', 'info legend'),
      p.grades = [0, 30, 90, 150, 300, 900, 1500, 3000],
      p.labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      p.div.innerHTML = "<h4><center>Legend</center></h4>";
      for (var i = 0; i < p.grades.length; i++) {
          p.div.innerHTML +=
              '<i style="background:' + p.getColor(p.grades[i] + 0.1) + '"></i> ' +
              p.grades[i] + (p.grades[i + 1] ? '&ndash;' + p.grades[i + 1] + '<br>' : '+');
      }

      return p.div;
  };

  p.legend.addTo(p.map);
    
  p.geo = L.geoJSON(statesData, {
      style: p.style,
          onEachFeature: p.onEachFeature
    }).addTo(p.map);
  }



  p.draw=function () { 

  }

  p.getColor=function(d) {
      return d > 3000 ? '#800026' :
            d > 1500  ? '#BD0026' :
            d > 900  ? '#E31A1C' :
            d > 300  ? '#FC4E2A' :
            d > 150   ? '#FD8D3C' :
            d > 90   ? '#FEB24C' :
            d > 30   ? '#FED976' :
                        '#FFEDA0';
  }



  p.style=function(feature) {
  /*
      for (let r = 0; r < data.getRowCount(); r++){
      temp = data.getNum(r, "Infections_Reported");
      print(temp);
    }*/
    for (let r = 0; r < p.data.getRowCount(); r++){
      if (p.data.getString(r, "County") == feature.properties.name) {
          p.temp = p.data.getNum(r, "Infections_Reported");
      }
    }
    return {
        fillColor: p.getColor(p.temp),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  p.get_val=function (layer){
      p.county,p.infections,p.procedures;
    for (let r = 0; r < p.data.getRowCount(); r++) {
        if (p.data.getString(r, "County") == p.layer.feature.properties.name) {
          p.county = p.data.getString(r, "County");
          p.infections = p.data.getNum(r, "Infections_Reported");
          p.procedures = p.data.getNum(r, "Procedure_Count");
        }
      
    }
    return {
      name: p.county,
      infections: p.infections,
      procedures: p.procedures,
    };
  }
  
  
  
    p.highlightFeature=function (e) {
        p.layer = e.target;
  
        p.layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
  
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            p.layer.bringToFront();
        }
  
        p.info.update(p.get_val(p.layer));
      }
  
      p.resetHighlight=function (e) {
        p.geo.resetStyle(e.target);
        p.info.update();
      }
  
    // fitBounds() is not recognized by P5.js
    // function zoomToFeature(e) {
    // 		map.fitBounds(e.target.getBounds());
    // 	}	
  
    p.onEachFeature=function (feature, layer) {
        layer.on({
          mouseover: p.highlightFeature,
          mouseout: p.resetHighlight,
          click: p.zoomToFeature,
        });
      }	
  
      p.zoomToFeature=function (e) {
        p.map.fitBounds(e.target.getBounds());
    }
  };

var s2 = function (p){
  p.geo;
  p.info = L.control();
  p.map;
  p.legend;

  p.preload=function() {
    p.data = p.loadTable("summary.csv", "csv", "header");
  };

  p.setup=function() { 
    p.noCanvas();
    
    p.map = L.map('mapid').setView([37.3, -119], 6);

    p.tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(p.map);
    
  p.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    p.info.update = function (props) {
      this._div.innerHTML = '<h4>Infectionrates per County</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.rate + '%'
        : 'Hover over a County');
    };	

    p.info.addTo(p.map);
    
    p.legend = L.control({position: 'bottomright'});

    p.legend.onAdd = function (map) {

      p.div = L.DomUtil.create('div', 'info legend'),
      p.grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      p.labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      p.div.innerHTML = "<h4><center>Legend</center></h4>";
      for (var i = 0; i < p.grades.length; i++) {
          p.div.innerHTML +=
              '<i style="background:' + p.getColor(p.grades[i] + 0.1) + '"></i> ' +
              p.grades[i] + (p.grades[i + 1] ? '&ndash;' + p.grades[i + 1] + '<br>' : '+');
      }

      return p.div;
  };

  p.legend.addTo(p.map);
    
  p.geo = L.geoJSON(statesData, {
      style: p.style,
          onEachFeature: p.onEachFeature
    }).addTo(p.map);
  }



  p.draw=function () { 

  }

  p.getColor=function(d) {
      return  d > 0.7 ? '#800026' :
              d > 0.6  ? '#BD0026' :
              d > 0.5  ? '#E31A1C' :
              d > 0.4  ? '#FC4E2A' :
              d > 0.3   ? '#FD8D3C' :
              d > 0.2   ? '#FEB24C' :
              d > 0.1   ? '#FED976' :
                        '#FFEDA0';
}



  p.style=function(feature) {
  /*
      for (let r = 0; r < data.getRowCount(); r++){
      temp = data.getNum(r, "Infections_Reported");
      print(temp);
    }*/
    for (let r = 0; r < p.data.getRowCount(); r++){
      if (p.data.getString(r, "County") == feature.properties.name) {
          p.temp = p.data.getNum(r, "Infections_Reported");
          p.proc = p.data.getNum(r, "Procedure_Count");
          p.rates= ((p.temp/p.proc)*100).toFixed(2);
      }
    }
    return {
        fillColor: p.getColor(p.rates),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  p.get_val=function (layer){
      p.county,p.infections,p.procedures;
    for (let r = 0; r < p.data.getRowCount(); r++) {
        if (p.data.getString(r, "County") == p.layer.feature.properties.name) {
          p.county = p.data.getString(r, "County");
          p.infections = p.data.getNum(r, "Infections_Reported");
          p.procedures = p.data.getNum(r, "Procedure_Count");
          p.rate=((p.infections/p.procedures)*100).toFixed(2);
        }
      
    }
    return {
      name: p.county,
      infections: p.infections,
      procedures: p.procedures,
      rate:p.rate,
    };
  }
  
  
  
    p.highlightFeature=function (e) {
        p.layer = e.target;
  
        p.layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
  
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            p.layer.bringToFront();
        }
  
        p.info.update(p.get_val(p.layer));
      }
  
      p.resetHighlight=function (e) {
        p.geo.resetStyle(e.target);
        p.info.update();
      }
  
    // fitBounds() is not recognized by P5.js
    // function zoomToFeature(e) {
    // 		map.fitBounds(e.target.getBounds());
    // 	}	
  
    p.onEachFeature=function (feature, layer) {
        layer.on({
          mouseover: p.highlightFeature,
          mouseout: p.resetHighlight,
          click: p.zoomToFeature,
        });
      }	
  
      p.zoomToFeature=function (e) {
        p.map.fitBounds(e.target.getBounds());
    }
  };
  //let myp52 = new p5(s1);

  let myp5 = new p5(s);
  let myp51 = new p5(s2);
