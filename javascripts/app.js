"use strict";
var Gauntlet = (function(Gauntlet) {
  /*
    Test code to generate a human player and an orc player
   */
  // var warrior = new Gauntlet.Combatants.Human();
  // warrior.setWeapon(new WarAxe());
  // warrior.generateClass(); // This will be used for "Surprise me" option
  // console.log(warrior.toString());

  //---------------- BAD GUY --------------------//
  var orc = new Gauntlet.Combatants.Orc();
  orc.generateClass();
  orc.playerName = "Randal";
  orc.setWeapon(new nightBlade());
  // console.log(orc.toString());

  /*
    Test code to generate a spell
   */

  //---------------CHARACTER OBJECT----------------//
  var newPlay = new Gauntlet.Combatants.Human();

  //-------------------------- ADD CLASS -----------------------------//
  $(".classRow").click(function(event) {
    var idValue = event.target.id;
    // newPlay.setClass(idValue);
    // console.log("id", idValue);
    switch (idValue) {
      case "Shinobi":
        newPlay.class = new Gauntlet.GuildHall.Shinobi();
        console.log("newPlay-Case: Shinobi", newPlay);
        // newPlay.class = Gauntlet.GuildHall.allowedClasses[0];
        break;
      case "Shinsengumi":
        newPlay.class = new Gauntlet.GuildHall.Shinsengumi();
        console.log("newPlay-Case: Shinsengumi", newPlay);
        break;
      case "Koga":
        newPlay.class = new Gauntlet.GuildHall.Koga();
        console.log("newPlay-Case: Thief", newPlay);
        // newPlay.class = Gauntlet.GuildHall.allowedClasses[Warrior];
        break;
      case "surprise-me-class":
        newPlay.generateClass();
        console.log("newPlay-Case: Random Class", newPlay);
        // newPlay.class = Gauntlet.GuildHall.allowedClasses[Warrior];
        break;
    }
  });

  //------------------------------ ADD WEAPON ----------------------------------//
  $(".weaponDiv").click(function(event) {
    var idValue = event.target.id;
    // newPlay.setWeapon(idValue);
    switch (idValue) {
      case "Throwing Star":
        newPlay.weapon = new throwingStar();
        console.log("newPlay-Case: Throwing Star", newPlay);
        // newPlay.setWeapon(new Dagger());
        break;
      case "Night Blade":
        newPlay.weapon = new nightBlade();
        console.log("newPlay-Case: Night Blade", newPlay);
        // newPlay.setWeapon(new BroadSword());
        break;
      case "Dual Blades":
        newPlay.weapon = new dualBlades();
        console.log("newPlay-Case: Dual Blades", newPlay);
        break;
      case "surprise-me-weapon":
        newPlay.setWeapon(new nightBlade()); //---------------------------> Need to create generateWeapon();
        console.log("newPlay-Case: Random Weapon", newPlay);
        // newPlay.class = Gauntlet.GuildHall.allowedClasses[Warrior];
        break;
    }
  });

  //------------------------------- SPELL STUFF ------------------------------------//

  var spell = new Gauntlet.SpellBook.Sphere();
  // console.log("spell: ", spell.toString());
  // console.log("Gauntlet: ", Gauntlet);

  //------------------------------ SHOW PAGES - CLICK TO NEXT PAGE -----------------------------//
  $(document).ready(function() {
    /*
      Show the initial view that accepts player name
     */
    $("#player-setup").show();


    /*
      When any button with card__link class is clicked,
      move on to the next view.
     */
    $(".card__link").click(function(e) {
      var nextCard = $(this).attr("next");
      var moveAlong = false;

      switch (nextCard) {
        case "card--class":
          newPlay.playerName = $("#checkout").val();
          moveAlong = ($("#player-name").val() !== "");
          break;
        case "card--weapon":
          moveAlong = ($("#player-name").val() !== "");
          break;
        case "card--battleground":
          moveAlong = ($("#player-name").val() !== "");
          //----------------------------------------- Adding player Card to DOM -------------------------------------//
          $('.playercard').append(`<div class="card-block">
                                      <h4 class="card-title">${newPlay.playerName}</h4>
                                      <h5 class="card-subtitle text-muted">Class: ${newPlay.class}</h5>
                                      <p class="card-text">Weapon: ${newPlay.weapon}</p>
                                      <p class="card-text">Weapon Damage: ${newPlay.weapon.damage}</p>
                                      <p class="card-text playerHealth">Health: ${newPlay.health}</p>
                                      </div> <img src="images/Ninja.png" alt="Card image">`);

            //----------------------------------- Adding Enemy Card to DOM ------------------------------------//
          $('.playercard2').append(`<div class="card-block">
                                      <h4 class="card-title">${orc.playerName}</h4>
                                      <h5 class="card-subtitle text-muted">Class: ${orc.class}</h5>
                                      <p class="card-text">Weapon: ${orc.weapon}</p>
                                      <p class="card-text">Weapon Damage: ${orc.weapon.damage}</p>
                                      <p class="card-text orcHealth">Health: ${orc.health}</p>
                                      </div> <img src="images/Ninja-Free-Download-PNG.png" alt="Card image">`);

            //------------------------------ Function for Deducting Health ---------------------------//
          $('#play_button').click(function(event) {
            console.log("something");
            if (event) {

              orc.health = (orc.health) - (newPlay.weapon.damage);
              $(".orcHealth").html("Health: " + orc.health);
              // console.log("Player:" + newPlay.health, "Orc:" + orc.health)

              if (orc.health > 0) {

                newPlay.health = (newPlay.health) - (orc.weapon.damage);
                $(".playerHealth").html("Health: " + newPlay.health);

              } else if (newPlay.health <= 0) {
                $('#play_button').unbind().disabled = true;
                $('#play_button').hide();
                $("#playerWins").html('K.O.! Randal WINS!');
                $(".playerHealth").html("Health: 0");
                // orc.health = (orc.health) + (newPlay.weapon.damage);
                // $(".orcHealth").html("Health: " + orc.health);
                 $('#warp').html(`<div class="scene">
                    <div class="wrap">
                        <div class="wall wall-right"></div>
                        <div class="wall wall-left"></div>
                        <div class="wall wall-top"></div>
                        <div class="wall wall-bottom"></div>
                        <div class="wall wall-back"></div>
                    </div>
                    <div class="wrap">
                        <div class="wall wall-right"></div>
                        <div class="wall wall-left"></div>
                        <div class="wall wall-top"></div>
                        <div class="wall wall-bottom"></div>
                        <div class="wall wall-back"></div>
                    </div>
                  </div>`)
                play2();

              } else {
                 $('#play_button').unbind().disabled = true;
                 $('#play_button').hide();
                $("#playerWins").html("K.O.! " + newPlay.playerName + " WINS!");
                $(".orcHealth").html("Health: 0");
                 $('#warp').html(`<div class="scene">
                    <div class="wrap">
                        <div class="wall wall-right"></div>
                        <div class="wall wall-left"></div>
                        <div class="wall wall-top"></div>
                        <div class="wall wall-bottom"></div>
                        <div class="wall wall-back"></div>
                    </div>
                    <div class="wrap">
                        <div class="wall wall-right"></div>
                        <div class="wall wall-left"></div>
                        <div class="wall wall-top"></div>
                        <div class="wall wall-bottom"></div>
                        <div class="wall wall-back"></div>
                    </div>
                  </div>`)
                play3();

              }
            }

          });
          break;
      }
      console.log("newPlay Value when next page btn click", newPlay);

      if (moveAlong) {
        $(".card").hide();
        $("." + nextCard).show();
      }
    });

    /*
      When the back button clicked, move back a view
     */
    $(".card__back").click(function(e) {
      var previousCard = $(this).attr("previous");
      $(".card").hide();
      $("." + previousCard).show();
    });

  });
  return Gauntlet;

})(Gauntlet || {});
