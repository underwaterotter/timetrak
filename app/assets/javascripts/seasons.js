$(document).ready(function(){
   var seasondelay;
   var infodelay;
   var editOn = 0;
   var targetname;
    //button methods
    $(document).off("click", '#cancel');
    $(document).on("click", '#cancel', function(){
      $("#new-season-form").fadeOut();
      $("#new-team-form").fadeOut();
      $("#new-venue-form").fadeOut();
      $("#new-upload-form").fadeOut();
      $("#member-form").fadeOut();
      $("#mask").fadeOut();
    });

    $(document).off("click", "#new-member");
    $(document).on("click", "#new-member", function(){
      $("#member-form").fadeIn();
      $("#mask").fadeIn();
    });

    $("#new-season").off("click").on("click", function(){
      $("#new-season-form").fadeIn();
      $("#mask").fadeIn();
    });
    $("#new-team").off("click").on("click", function(){
      $("#new-team-form").fadeIn();
      $("#mask").fadeIn();
    });
    $("#new-venue").off("click").on("click", function(){
      $("#new-venue-form").fadeIn();
      $("#mask").fadeIn();
    })
    $("#new-upload").off("click").on("click", function(){
      $("#new-upload-form").fadeIn();
      $("#mask").fadeIn();
    })

    $(document).off('click', '[class*=member-edit]')
    $(document).on('click', '[class*=member-edit]', function(){
      var id = $(this).attr("id").match(/\d+/);
      var cname = $("#name_"+id).text();
      var cemail = $("#email_"+id).text();
      $("#name_"+id).html("<input id='member[name]' name='member[name]' type='text' value='"+cname+"'/>");
      $("#email_"+id).html("<input id='member[email]' name='member[email]' type='text' value='"+cemail+"'/>");
      var memberedits = $('[class*=member-edit]');
      $(this).parent().html("<div id='"+id+"' class='button-main standard-button member-cancel'>CANCEL</div> \
      <input type='submit' name='commit' value='SAVE' class='button-main standard-button''>");
    });
    $(document).off('click', '[class*=member-cancel]')
    $(document).on('click', '[class*=member-cancel]', function(){
      retrieveTeamInfo(targetname);
    });

    $(document).off('click', '#edit-team');
    $(document).on("click", "#edit-team", function(){
      if (editOn == 0){
        editOn = 1;
        $("#edit-team").html("CANCEL");
        var inputitem = $(".editable");
        jQuery.each(inputitem, function(i, val){
          var currentValue = $(val).html();
          $(val).html("<input type='text' id='team_season_id' value='"+currentValue+"' name=team["+$(val).attr("id")+"]>");
        });
        $("<input type='submit' name='commit' value='SAVE' class='button-main standard-button' '>").insertBefore($("#edit-team"));
      }else{
        editOn = 0;
        retrieveTeamInfo(targetname);
      }
    })

    $(document).off('click', '#edit-venue');
    $(document).on("click", "#edit-venue", function(){
      if (editOn == 0){
        editOn = 1;
        $("#edit-venue").html("CANCEL");
        var inputitem = $(".editable");
        jQuery.each(inputitem, function(i, val){
          var currentValue = $(val).html();
          $(val).html("<input type='text' id='team_season_id' value='"+currentValue+"' name=venue["+$(val).attr("id")+"]>");
        });
        $("<input type='submit' name='commit' value='SAVE' class='button-main standard-button' style='float: right;'>").insertBefore($("#edit-venue"));
      }else{
        editOn = 0;
        retrieveVenueInfo(targetname);
      }
    })

    //button switchers
    $("#new-season").off('mouseenter').on('mouseenter', function(){
      if ($("#del-season").length){
        seasondelay = setTimeout(function(){
          $("#new-season").slideUp('fast',function(){
            $("#del-season").css("display", "block");
          });
        }, 1000); //1seconds
      }
    }).mouseleave(function(){
      clearTimeout(seasondelay);
    });
    $(document).on('mouseleave', '#del-season', function(){
      $("#del-season").slideUp('fast', function(){
        $("#new-season").slideDown('fast');
      });
    });

    //retrieve team info on hover
    $(document).off('mouseenter', '#team-button');//prevent multiple binding
    $(document).on('mouseenter', '#team-button' ,function(e){
        infodelay = setTimeout(function(){
          $("#team-info").fadeOut('fast');
          targetname = $(e.target).val()
          if (!targetname){ targetname = $(e.target).text(); }
          retrieveTeamInfo(targetname);//retrieve input value
        }, 750); //.5seconds
    })
    $(document).on('mouseleave', '#team-button', function(){
      clearTimeout(infodelay);//clear team information?
    });
    //retrieve venue info on hover
    $(document).off('mouseenter', '#venue-button');//prevent multiple binding
    $(document).on('mouseenter', '#venue-button' ,function(e){
        infodelay = setTimeout(function(){
          $("#team-info").fadeOut('fast'); //borrows team divs
          targetname = $(e.target).val()
          if (!targetname){ targetname = $(e.target).text(); }
          retrieveVenueInfo(targetname);//retrieve input value
        }, 750); //.5seconds
    })
    $(document).on('mouseleave', '#venue-button', function(){
      clearTimeout(infodelay);//clear team information?
    });


    //retrieve team information with ajax
    $("#s-season").off("change").on("change", function(){
        $("#new-venue").fadeOut('fast');
        $("#new-upload").fadeOut('fast');
        $("#season-info").fadeOut('fast');
        $("#calendar-view").fadeOut('fast');
        $("#static-teamslist").fadeOut('fast');
        $("#static-venueslist").fadeOut('fast');

        var selection = $(this).find(":selected").text();//fetch name of selection
        if (selection != "Select a season"){//the user actually made a choice
          retrieveSeasonTeams(selection);
        }
    });
})
