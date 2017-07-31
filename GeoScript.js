/**
 * Created by BALASUBRAMANIAM on 06-01-2015.
 */
window.onload=FindLocation;


function FindLocation()
{
	
	
  if(navigator.geolocation) {
      console.log("Geo API supported");
      navigator.geolocation.getCurrentPosition(success,failure);

  }
    else
      console.log("Geo API not supported");


}






function success(position) {
	addressref=document.getElementById("address");
	
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position.coords.altitude);
    console.log(position.coords.accuracy);
    console.log(position.coords.altitudeAccuracy);
    console.log(position.coords.speed);
  //  var sectionref = document.getElementById("geoinfo");
 //   sectionref.innerHTML =
  //      "<p> Latitude=<mark>" + position.coords.latitude + "</mark></p><br/>" +
   //     "<p> Longitude=<mark>" + position.coords.longitude + "</mark></p>";

    var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({latLng: latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
        if (results[1]) {
          var arrAddress = results;
          console.log(results);
          i=0;
          addressref.value="";
          for(var address in arrAddress )
        	  {
        	 
        	  console.log(arrAddress[address]);
        	  if (i==1)  
        		  {
        	    //console.log(arrAddress[address]);
        	 // if (arrAddress[address].types[0] == "locality") {
        		  addressref.value= arrAddress[address].formatted_address;
                  console.log("City: " + arrAddress[address].formatted_address);
                  itemLocality = arrAddress[address].address_components[0].long_name;
                  console.log( itemLocality );
               // }
        		  }
        	  i++;
        	  }
        	  
          
         
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });

    googleloc = new google.maps.LatLng
    (position.coords.latitude,position.coords.longitude);

    //alert(googleloc);
    var mapoptions={
         center:googleloc,
         zoom:15,
        mapTypeId:google.maps.MapTypeId.ROAD,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeControl:true,
        mapTypeControlOptions:google.maps.MapTypeControlStyle.DEFAULT

    };

    var gmaparea=document.getElementById("maparea");
    gmap = new google.maps.Map(gmaparea,mapoptions);
    marker = new google.maps.Marker
    ({
        position:googleloc,
        map:gmap,
        title:"I am Here"

    });
   // alert("done");

}

function failure(msg)
{
  console.log(msg);
}
