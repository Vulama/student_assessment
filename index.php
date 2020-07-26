<?php
    $state = false;
    $curlSession = curl_init();
    curl_setopt($curlSession, CURLOPT_URL, 'http://api.hnb.hr/tecajn/v1');
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    $jsonData = curl_exec($curlSession);
    curl_close($curlSession);
    $decoded=json_decode($jsonData,true);
    //echo $jsonData;
    //echo $jsonData;

    //echo $jsonData;
    //var_dump(json_decode($jsonData,true));

    //var_dump(json_decode($jsonData,true)[1]);
    //echo json_decode($jsonData,true)[1][Valuta];
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Student Assessment</title>
        <meta name="description" content="Filip Vulama student assesment 2020">
        <link rel="stylesheet" href="style.css">
        <script src="scripts.js"></script>
    </head>
    <body>
        
        <h1>Student Assessment</h1>
        <h2>Filip Vulama 2020</h2>

        <br></br><hr></hr><br></br>

        <button type="button" id="toggle" value="false" onclick="toggle()">HRK to X</button>
        <br></br>
        <div class="dropdown">
            <button class="dropbtn" id="drbtn">Valute ▼</button>
            <div class="dropdown-content">

            <?php
                for($i=0; $i<14; $i++){
                    $temp=$i*5;
                    echo "<a onclick=\"selectValute(";
                    $var = str_replace(',','.',$decoded[$i]["Srednji za devize"]); 
                    $var = floatval($var);
                    echo $var;
                    echo ")\">";
                    echo $decoded[$i]["Valuta"];
                    echo "</a>";
                }
            ?>

            </div>
        </div>
        <input type="number" onchange="onChange()" id="no">
        <a class="res" id="resId">Result</a>

        <br></br><hr></hr><br></br>

        <div class="grid-container" style="grid-template-columns: auto auto auto auto auto;">
            <div class="grid-item"><button type="button" id="btn" value="init" onclick="refreshing()">Static</button></div>
            <div class="grid-item"><p>Kupovni za devize</p></div>
            <div class="grid-item"><p>Srednji za devize</p></div>
            <div class="grid-item"><p>Prodajni za devize</p></div>
            <div class="grid-item"><p>1 HRK</p></div>

            <?php
                for($i=0; $i<14; $i++){
                    $temp=$i*5;
                    echo "<div class=\"grid-item\" id=\"$temp\"><p>";
                    echo $decoded[$i]["Valuta"];
                    echo "</p></div>";
                    $temp++;
                    echo "<div class=\"grid-item\" id=\"$temp\"><p>";
                    echo $decoded[$i]["Kupovni za devize"];
                    echo "</p></div>";
                    $temp++;
                    echo "<div class=\"grid-item\" id=\"$temp\"><p>";
                    echo $decoded[$i]["Srednji za devize"];
                    echo "</p></div>";
                    $temp++;
                    echo "<div class=\"grid-item\" id=\"$temp\"><p>";
                    echo $decoded[$i]["Prodajni za devize"];
                    echo "</p></div>";
                    $temp++;
                    $var = str_replace(',','.',$decoded[$i]["Srednji za devize"]);
                    echo "<div class=\"grid-item\" id=\"$temp\"><p>";
                    echo 1/floatval($var);
                    echo "</p></div>";
                }
            ?>
            
        </div> 

        <br></br><hr></hr><br></br>
        
        <form style="margin-left:4em;" action="/index.html">
            <label for="fname" class="res">First name:</label><br>
            <input type="text" class="inputText" id="fname" name="fname" value="John"><br>
            <label for="lname" class="res">Last name:</label><br>
            <input type="text" class="inputText" id="lname" name="lname" value="Doe"><br><br>
            <input type="submit" id="subBtn" value="Submit">
            <a id="warning"></a>
        </form> 
    </body>
</html>


