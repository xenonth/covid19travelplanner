$(document).ready(function  (){
    var searchedCountries=[]
    var myCityTimeOffset
    var destinationCityTimeOffset


   
    for (i=0; i<20; i++) 
         { 
        $("#userB"+i).click(function() {
            if($('#go').data('clicked'))
            {
          return
        }
           else {
            $("#warningmodal").css('display', 'inline');
         

           }
        })



}

$("#ok").click(function() {
    $("#warningmodal").css('display', 'none');

})

    for (i=1;i<localStorage.length+1; i++){
        searchedCountries[i]=localStorage.getItem(i)
     
        var searches = $("<li>", {id: i+"history"});
       
        $('#searchHistory').append(searches)
        $("#"+i+"history").html(searchedCountries[i])
  } 
  
  $('#country').keypress(function (e) {
    var key = e.which;
    if(key == 13){
        Covid()
    }})
 
    $('#search').click(function () {
        Covid()})
        
      function Covid() {
       var country = $("#country"). val();
            k=localStorage.length
            localStorage.setItem(k+1,country)
            searchedCountries=[]
            for (i=1;i<localStorage.length+1; i++){
                searchedCountries[i]=localStorage.getItem(i)
             
                var searches = $("<li>", {id: i+"history"});
               
                $('#searchHistory').append(searches)
                $("#"+i+"history").html(searchedCountries[i])
          } 


       console.log(country)
       var today = moment.utc(moment().format()).format("YYYY-MM-DD")
       recentUpdate =  moment.utc(today).subtract(2,'d').format("YYYY-MM-DD") + "T00:00:00Z"
  
      var weekAgo = moment.utc(today).subtract(9,'d').format("YYYY-MM-DD")
      weekAgoUpdate = weekAgo + "T00:00:00Z"
  console.log(weekAgoUpdate)
      //console.log(todayUpdate)
        
    $.ajax({
        url: "https://api.covid19api.com/total/country/" + country +"/status/confirmed?from=" + weekAgoUpdate + "&to=" + recentUpdate,
        method: "GET"
      }).then(function(response) {
        console.log(response)
       var todayCases = response[6].Cases
        var weekAgoCases = response[0].Cases
        var difference = todayCases-weekAgoCases
       $("#last_seven"). html(difference)
       $("#total_cases"). html(todayCases)
       

    })
  
  
 
      }

      $(function(){
        $('#go').click(function() {
            $(this).data('clicked', true);
            computedTimeDifference()
        });
    });
    

        // $('#search').click(function () {
        //     Covid()})
  function computedTimeDifference() {
    var APIkeytimezone = "9652044f0e85425c9a02a36ec01ddd01&tz"
    var myCity=$("#mycity"). val();
    var destinationCity=$("#destinationcity"). val();
    var destinationCountry=$("#destinationcountry"). val();
    
    myCity=myCity.charAt(0).toUpperCase()+myCity.slice(1)
    k=localStorage.length
    var myCountry=localStorage.getItem(k)
    myCountry=myCountry.charAt(0).toUpperCase()+myCountry.slice(1)
   
    
    destinationCity=destinationCity.charAt(0).toUpperCase()+destinationCity.slice(1)
    destinationCountry=destinationCountry.charAt(0).toUpperCase()+destinationCountry.slice(1)

   
    
   
    thisCityUrl= "https://api.ipgeolocation.io/timezone?apiKey=" +APIkeytimezone+"="+ myCountry + "/" + myCity
    destinationCityUrl = "https://api.ipgeolocation.io/timezone?apiKey=" +APIkeytimezone+"="+ destinationCountry + "/" + destinationCity
    $.ajax({
        url: thisCityUrl,
        method: "GET",
      }).then(function(response) {
        myCityTimeOffset=response.timezone_offset


   
  })

  $.ajax({
    url: thisCityUrl,
    method: "GET",
  }).then(function(response) {
    myCityTimeOffset=response.timezone_offset
    $.ajax({
        url: destinationCityUrl,
        method: "GET",
      }).then(function(response) {
        destinationCityTimeOffset=response.timezone_offset
      

        for (i=0; i<20; i++) {
            $("#userB"+i).click(function() {
                var time = this.id.replace(/\D/g, "");

                console.log(myCityTimeOffset)
                console.log(destinationCityTimeOffset)
                console.log(time   )
                var timeInOtherCity=Math.floor(Number(time)+(Number(destinationCityTimeOffset)-Number(myCityTimeOffset)))
                alert(timeInOtherCity)
               
            })

        }
       


})

})
    

}




   






})