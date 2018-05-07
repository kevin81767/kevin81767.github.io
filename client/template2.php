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
     <link href="https://fonts.googleapis.com/css?family=Mogra" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Lateef" rel="stylesheet">  
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="bitsies/bitsies/Icon Font/styles.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome-4.7.0/css/font-awesome.min.css">
    
    <link rel="stylesheet" type="text/css" href="css/template1.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" type="text/css" href="css/flexslider.css">
    <script type="text/javascript" src='js/angular.min.js'></script>
    <script type="text/javascript" src='js/modal.js'></script>
    <script src="js/jquery.min.js"></script>
    <script src='js/jquery.js'></script>
    <script type="text/javascript" src="js/jquery.flexslider-min.js" ></script>
    <script type="text/javascript" src="js/jquery.flexslider.js"></script>
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



            function myFunction() {
                myVar = setTimeout(showPage, 3000);
            }
            function showPage() {
              document.getElementById("loader").style.display = "none";
              document.getElementById("all-content").style.display = "block";
            }

  </script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onload="myFunction()" style="background: url(images/bg.png) repeat fixed;">


      <!-- Load Facebook SDK for JavaScript -->
      <div id="fb-root"></div>
      <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1973239932962353";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));</script>
      <!-- /Load Facebook SDK for JavaScript -->


      <div id="loader"></div>
      <div id="all-content">
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
              <li><a href='#'><strong>DRAMA</strong></a></li>
              <li><a href='#'><strong>COMEDY</strong></a></li>
              <li><a href='#'><strong>ADVENTURE</strong></a></li>
              <li><a href='#'><strong>CRIME</strong></a></li>
              <li><a href='#'><strong>ACTION</strong></a></li>
            </ul>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>

      <?= $content;?>
    
<br>
<br>
<br>
<footer style="text-align: center;">Developed by <strong>IRIS company</strong></footer>
<script>

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}


//Add meta tags for SEO strategy

$("head").append('<meta property="og:url" content="http://5ca51314.ngrok.io/my-site/movies/rwandan.php?p=movie&id=<?php echo$data[0]->id ;?>" /><meta property="og:type" content="<?php echo $data[0]->category;?>" /><meta property="og:title" content="<?php echo $data[0]->name;?>" /><meta property="og:description" content="<?php echo $data[0]->summary;?>" /><meta property="og:image" content="http://5ca51314.ngrok.io/my-site/movies/movies/covers/<?php echo $data[0]->pic_movie; ?>" /> ');
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