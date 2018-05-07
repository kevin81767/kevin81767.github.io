<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Rwandan Movies</title>
    <link href='https://fonts.googleapis.com/css?family=Acme' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">

     <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
     <link rel="stylesheet" type="text/css" href="css/font-awesome-4.7.0/css/font-awesome.min.css">
     <link href="https://fonts.googleapis.com/css?family=Mogra" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Lateef" rel="stylesheet">  
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="bitsies/bitsies/Icon Font/styles.css">
    <script type="text/javascript" src='js/angular.min.js'></script>
    <script src="js/jquery.min.js"></script>
    <script src='js/jquery.js'></script>
    <script type="text/javascript" src="js/jquery.flexslider-min.js" ></script>
    <script type="text/javascript" src="js/jquery.flexslider.js"></script>
    <link rel="stylesheet" type="text/css" href="css/template1.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/flexslider.css">
  <script type="text/javascript">
            $(function() {
                $(document).ready(function() {
                    $('.flexslider').flexslider({
                        animation: "fade",
                        slideshowSpeed: 4000,
                        animationSpeed: 600,
                        controlNav: false,
                        directionNav: false,
                        controlsContainer: ".flex-container" // the container that holds the flexslider
                    });
                });
            });
  </script>
  <style>
    .footer-menu{
      background-color: #4c4c4c;
      color: white;
    }
    .footer-menu li{
      list-style-type: none;
      padding: 10px;


    }

    footer-menu li:hover{
      
      color:yellow;


    }

    .footer-menu a{

      color:white;
    }

    .footer-menu a:hover{

      color: #01c9c6;
      text-decoration: none;
    }

    .footer-menu .row{
      padding: 15px;
    }
    .footer-menu img{
      width: 200px;
      height: 200px;
      background-color: white;
      margin-bottom: 5px;
    }

    #pay{
      /*width: 50%;
      margin: auto;
      background-color: #777777;
      color: white;
      margin-bottom: 5px;
      border-radius: 10px;
      z-index: 1;*/
    }

    .pay{

      background-color: #777777;
      border-radius: 7px;
    }

    @media screen and (max-width: 420px) {
            .login_form {
               width: 100%;
               margin: auto;
               background-color: red;
            }
         }

    
  </style>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onload="myFunction()" style="background: url(images/bg.png) repeat fixed;">
      <div id="loader"></div>
      <div id="all-content">


      <!--BackEnd for login-->

      <?php
       

        if(!empty($_POST['email']) AND ($_POST['password'])){

          $email=$_POST['email'] ;
          $password=sha1($_POST['password']);

          //Retrieve info in the database based on the information


          $db=New LoginClass();
          $datas=$db->check_login($email,$password);
          
          if ($datas){
            // session_destroy();
            session_start();
             $_SESSION['id']=$datas[0]->id;
             $_SESSION['first_name']=$datas[0]->first_name;
             $_SESSION['last_name']=$datas[0]->last_name;
             $_SESSION['email']=$datas[0]->email;
             $_SESSION['phone_number']=$datas[0]->phone_number;
             


          }
          else{
            echo "Failed";
          }


            
        }




          if(isset($_POST['destination'])){

            $datas=New OrdersClass();
            $id_user=$_SESSION['id'];
            $id_movie=$data[0]->id;
            $destination=$_POST['destination'];

            $rest=$datas->submitOrder($id_user,$id_movie,$destination);
            if($rest){

              echo "<div class='alert alert-success'> Order transmitted</div>";
            }
          }

      ?>
      


      <!--/BackEnd for login-->
      <div class='navbar navbar-default navbar-fixed-top' id='my-nav'>
        <div class='container'>
          <a href='index.php' class='navbar-brand'><strong>Rwandan Movies</strong></a>
          <button class='navbar-toggle' id='bar' data-toggle='collapse' data-target='.navHeaderCollapse'>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class='collapse navbar-collapse navHeaderCollapse navb'>
            <ul class='nav navbar-nav navbar-right'>
              <li><a href='#action'><strong>ACTION</strong></a></li>
              <li><a href='#'><strong>ROMANCE</strong></a></li>
              <li><a href='#'><strong>CRIME</strong></a></li>
              <li><a href='#'><strong>FAMILY</strong></a></li>
              <li><a href='#comedy_section'><strong>COMEDY</strong></a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Others
                <span class="caret"></span>
                <ul class="dropdown-menu" style="background-color: #01c9c6;">
                  <li><a href="#">Documentary</a></li>
                  <li><a href="#">TV shows</a></li>
                  <li><a href="#">Biography</a></li>
                </ul></a>
              </li>
              <?php if(isset($_SESSION['first_name']))
              {
                ?><a href="include/SESSION_DESTROY.php"><button class="btn btn-danger">Connected as <?=$_SESSION['first_name'] ?></button><?php
                }
                else{
                  ?><button id="b_login" class="btn btn-info">SIGN IN</button><?php
                } ?>
            </ul>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
      <br>
      <!--Script for php connect-->

      
      <!--Form for login-->
  
  <div id="login"  style="color: white; display: none;z-index: 1; width: 25%;margin: auto;background-color: white;border-radius: 15px;">
    
    <form action="#" class=" login_form form-group" method="post" style= " padding: 10px; background-color: #01c9c6;z-index: 1;border-radius: 15px;position: fixed;">
      <span id="close" style="background-color: #777777;border-radius: 5px;" class="fa fa-close pull-right"></span>
      <h4 style="color: white; border-radius: 15px; padding: 3px; font-weight: 20px;">LOGIN</h4>
      <input type="text"  name="email" placeholder="Your email" class="form-control"><br>
      <input type="password"   name="password" placeholder="password" class="form-control"><br>
      <input type="submit" value="LOGIN" id="submitting" class="form-control" style="border:3px solid white; background-color: #01c9c6; color: white; font-weight: 15px;font-size: 15px;">
      <div id="alert"></div>
      <p>If you don't have an account click <a href="index.php?p=register">here</a></p>
    </form>
  </div>

  <!--/Form for login-->
     
      
      

      <?= $content;?>
    

<br>

  <footer >
    <?php include("./include/footer.php");?>
  </footer>

</div>
<script>

$("document").ready(function(){

    $("#b_login").click(function(){

    
    $("#login").fadeToggle(800);

  });

    $("#buy").click(function(){
     
      $("#pay").fadeToggle(800);
      
    
    });

    $("#close").click(function(){

      $("#login").fadeOut(800);
    });


   
   
});

var email=document.getElementById("#email");
var password=document.getElementById("#password");
var submit=document.getElementById("#submitting");







var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}





function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("all-content").style.display = "block";
}
</script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.flexslider-min.js" ></script>
<script type="text/javascript" src="js/jquery.flexslider.js" ></script>
  <script>
  new WOW().init();
  </script>
  </div> 
  </body>
    <script src="js/bootstrap.min.js"></script>
</html>
