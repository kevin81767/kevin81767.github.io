<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Rwandan movies</title>
    <!-- Bootstrap -->
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
    
    <link rel="stylesheet" type="text/css" href="css/mainAdmin.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/flexslider.css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <!-- Navbar for admin panel-->
      <div class='navbar navbar-inverse navbar-fixed-top' id='my-nav'>
        <div class='container'>
          <a href='admin.php' class='navbar-brand'><strong>African Movies</strong></a>
          <h3 style="text-align: center;color: white;">Admin Panel</h3>

          

        </div>
      </div>
      <br>
      <br>
      <br>
      <!--Nav bar for admin panel-->
      <div class="nav-admin">
        <ul class="nav nav-tabs"  style="position: fixed; background-color: white;">
          <li><a href="browse.php?p=add"><span class="fa fa-upload fa-2x"></span></a></li>
          <li><a href="browse.php?p=users"><span class="fa fa-users fa-2x"></span></a></li>
          <li><a href="browse.php?p=orders"><span class="fa fa-th-list fa-2x"></span></a></li>
          <li><a href="browse.php?p=movies"><span class="fa fa-file-movie-o fa-2x"></span></a></li>
          <li ><a style="color: red;" href="include/SESSION_DESTROY_ADMIN.php"><span class="fa fa-sign-out fa-2x"></span></a></li>
          
        </ul>
      </div>
      <br>
      <br>
          <?= $content;?>
        
    



  <script src="js/wow.min.js"></script>
  <script>
  new WOW().init();
  </script> 
  </body>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src='js/jquery.min.js'></script>
    <script src='js/jquery.js'></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
</html>
