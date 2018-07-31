function paging (i) {
    $.getJSON('building.json', 
        function(data) {  
    document.getElementById("name").innerHTML = `${data[i].name}`;
    document.getElementById("address").innerHTML = `${data[i].address}`;
    document.getElementById("buildingimage").src = `Building ${i+1}.jpg`;
    document.getElementById("propertytype").innerHTML = `${data[i].propertyType}`;
	document.getElementById("website").innerHTML = `${data[i].website}`;
    document.getElementById("area").innerHTML = `${data[i].totalBuildingArea}`;
    document.getElementById("propertyclass").innerHTML = `${data[i].propertyClass}`;
    document.getElementById("tenancy").innerHTML = `${data[i].tenancy}`;
    document.getElementById("yearbuilt").innerHTML = `${data[i].yearBuilt}`;
    document.getElementById("nooftenants").innerHTML = `${data[i].noOfTenants}`;
    document.getElementById("floors").innerHTML = `${data[i].floors}`;
    document.getElementById("description").innerHTML = `${data[i].description}`;   
    if (document.getElementById("availability").rows.length>1){
    	$("#availability tr:not(:first)").remove();
	};
    for (var k = data[i].availability.length-1; k>=0; k--) {
    	var row = document.getElementById("availability").insertRow(1);
    	var cell1 = row.insertCell(0);
    	var cell2 = row.insertCell(1);
    	var cell3 = row.insertCell(2);
    	cell1.innerHTML = `${data[i].availability[k].unitName}`;
    	cell2.innerHTML = `${data[i].availability[k].recordType}`;
    	cell3.innerHTML = `${data[i].availability[k].availableArea}`;    	
    }; 

    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);

    function geocodeAddress(geocoder, resultsMap) {
        var address = `${data[i].address}`;        
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      };
	}


    );
 
};
function pagebuttons() {
    $.getJSON('building.json', 
        function(data) {
        	for (var k=0; k< data.length; k++){        		
        		document.getElementsByClassName("pages")[0].innerHTML += `<li class="page-item"><a class="page-link" onclick="paging(${k})" href="#"> ${k+1} </a> </li>`;
        		document.getElementsByClassName("pages")[1].innerHTML += `<li class="page-item"><a class="page-link" onclick="paging(${k})" href="#"> ${k+1} </a> </li>`
        	}        	
        });
};



function start(i) {
	paging(i);
	pagebuttons();		
};


