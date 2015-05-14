$(document).ready(function(){
    $("#cancel-season").off("click").on("click", function(){
      $("#new-season-form").fadeOut();
      $("#mask").fadeOut();
    });

    $("#new-season").off("click").on("click", function(){
      $("#new-season-form").fadeIn();
      $("#mask").fadeIn();
    });

    $("#cancel-team").off("click").on("click", function(){
      $("#new-team-form").fadeOut();
      $("#mask").fadeOut();
    });

    $(document).on("click", '#new-team', function(){
      $("#new-team-form").fadeIn();
      $("#mask").fadeIn();
    });

    $("#s-season").off("click").on("click", function(){
      $("#season-info").fadeOut();
      $("#new-team").fadeOut();
    });

    $("#s-season").off("change").on("change", function(){
        var selection = $(this).find(":selected").text();//fetch name of selection
        $.ajax({
            url: '/seasons/details/' + selection,
            data: { season_name: selection},
            type: 'GET',
            dataType: 'json',
            success: function(data){
              $("#new-team").fadeIn();
              $("#season-info").fadeIn();
              if(!jQuery.isEmptyObject(data)){
                $("#season-info").html("<h2>Teams:</h2>");
                for(var i in data){
                  $("#season-info").append(i)
                }
              }
              else{
                $("#season-info").html("<h2>Teams:</h2>").append("There are no teams in this season.");
              }
            }
          });
    });
})
