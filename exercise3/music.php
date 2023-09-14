<!DOCTYPE html>
<html>
<?php
include ('header.php');
include ('data.php');
?>



  <div class="row">
    <div class="card">
        <section class="container">
            <h4 class="center">Let's rock & roll!</h4>
            <form class="musicForm" action="music.php" method="GET" >
                <div id="qOne">
                    <h4>What song have I had on repeat lately?</h4>
                    <select name="repeatSong">
                    <option value="cyberpunk">Cyberpunk - ATEEZ</option>
                    <option value="cheers">Cheers - Seventeen</option>
                    <option value="testMe">Test Me - Xdinary Heroes</option>
                </select>
                <!-- <button class="button-55" id="qOne-but" onclick="nextQuestion()">Next</button> -->
                <input type="button" class="button-55" id="qOne-but" onclick="goToSecondQuestion()" value="Next">
                </div>
                <div id="qTwo">
                    <label>Who is my all-time favorite Artist?</label>
                    <input type="text" name="favArtist">
                    <input type="button" class="button-55" id="qTwo-but" onclick="goToThirdQuestion()" value="Next">
                </div>
                <div id="qThree" >
                    <h4>When do I listen too the music most?</h4>
                    <select name="musicFreq">
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="3am">At 3am</option>
                </select>
                    <input type="button" class="button-55" id="qThree-but" onclick="goToFourthQuestion()" value="Next">

                </div>
                <div id="qFour">
                    <label>What was the first album I bought?</label>
                    <input type="text" name="firstAlbum">
                    <input type="button" class="button-55" id="qFour-but" onclick="showAll()" value="Next">

                </div>
                
                <div id="center">
                    <button type="submit" name="name" value="submit" class="submit-55" id="subbutton">Submit</button>
                </div>
            </form>
        </section>
    </div>
  </div>


<?php
include('footer.php');
?>