function on() {
    document.getElementById("vastused").style.display = "block";
  }
  


function off() {
    document.getElementById("vastused").style.display="none";
  }


function vastus_valja() {
  
  let vatused;
  vatused = document.getElementById(vastus_valja.value).classList.add("hide_pointer")
}



function tyhjenda_local() {
// tühjendame rahalise seisu 
  localStorage.setItem('raha', JSON.stringify(0))
}



function naita_kysimust(kat_ja_id) {
  
  document.getElementById("jooksev_tulemus").className = ""; 
  document.getElementById("vastused").style.display = "block";
  document.getElementById(kat_ja_id).className = "hide_pointer"; 
  document.getElementById(kat_ja_id) ; 
  let muuda_raha = document.getElementById(kat_ja_id);
  //võtame ekraanil rahasumma ära
  muuda_raha.innerHTML = '&nbsp;';

    if (kat_ja_id == "") {
      document.getElementById("vastused").innerHTML = "";
      return;
    } else { 
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("vastused").innerHTML = this.responseText;
          setTimeout(move(), 1)
          // => {
           // const vastus1Element = document.getElementById("vastus1");
           // vastus1Element.addEventListener("load",;
              //=> {
            //move();
            //});
            //}, 1);  
        }
      };

      //laseme käima php ja korjame küsimused
      xmlhttp.open("GET","baasist.php?q="+kat_ja_id,true);
      xmlhttp.send();
      //window.onload = move();
    }
  }

  let firstFrameInterval;
  let secondFrameInterval;
  let thirdFrameInterval;
  let fourthFrameInterval;

// tesitmoodi liikuv ajauss
function move() {
  //if (document.getElementById("vastused").style.display = "none");
  //return;
		const progressBar = document.getElementById("timeruss");
		const progressBarContainer = document.getElementById("myProgress"); 
		let width = 0;
    let margin = 0;
    const ajaline_pikkus = "100";
		firstFrameInterval = setInterval(frameOne, ajaline_pikkus); // Starting the first one
		

		function frameOne() {
			if (width === 50) {
				progressBar.style.marginLeft = 0 + '%';
				secondFrameInterval = setInterval(frameTwo, ajaline_pikkus);
				clearInterval(firstFrameInterval);
			} 
				else {
					width++;
					progressBar.style.width = width + '%';
				}
		} //frameOne end	
    
		function frameTwo() {
			if (margin === 50) {
				progressBar.style.float = 'right';
				progressBarContainer.style.float = 'left';
				thirdFrameInterval = setInterval(frameThree, ajaline_pikkus);
				clearInterval(secondFrameInterval);
			}
				else {
					margin++;
					progressBar.style.marginLeft = margin + '%';
				}
		} // frameTwo end

		function frameThree() {
			if (width === 0) {
				progressBar.style.float = '';
				progressBarContainer.style.float = '';
        progressBar.style.marginLeft = 0 + '%';
        fourthFrameInterval = setInterval(frameFour, 1);
				clearInterval(thirdFrameInterval);
			}
				else {
					width--;
					progressBar.style.width = width + '%';
      }  
    } // frameThree end
    
    function frameFour() {
			if (width === 0) {
				progressBar.style.float = '';
				progressBarContainer.style.float = '';
				progressBar.style.marginLeft = 0 + '%';
				clearInterval(fourthFrameInterval);
			}
				else {
					width--;
					progressBar.style.width = width + '%';
      }

      //eemaldame overlay
      document.getElementById("vastused").style.display = "none";

      //aeg sai otsa piiksu
      let aeg_sai_otsa_piiks = new Audio('times-up.mp3');
      aeg_sai_otsa_piiks.play();
		} // frameFour end
	} // move end 



function loemepunkte(vastatud_vastus) {
  clearInterval(firstFrameInterval);
    clearInterval(secondFrameInterval);
    clearInterval(thirdFrameInterval);
    clearInterval(fourthFrameInterval);
  // võtame õige vastuse
  let oigevastus = document.getElementById("oigevastus").innerHTML;
  // võtame küsimuse hinna
  let raha = document.getElementById("raha").innerHTML;
  // loeme localtoragest rahalise seisu
  arvel_olev_raha = JSON.parse(localStorage.getItem('raha'))
  //paneme õige vale vastuse audiod paika
  let vale_vastus_piiks = new Audio('wrong_answer.mp3');
  let oige_vastus_piiks = new Audio('rightanswer.mp3')
  //move.clearInterval;
    if (oigevastus !== vastatud_vastus) {
      
      let kontole = parseInt(arvel_olev_raha) - parseInt(raha);
      localStorage.setItem('raha', JSON.stringify(kontole))
      document.getElementById("jooksev_tulemus").innerHTML = kontole;
      vale_vastus_piiks.play();
      alert("Vale vastus, kontolt võetakse " + raha + "€ maha");
  } else {
      let kontole_summa = parseInt(arvel_olev_raha) + parseInt(raha);
      localStorage.setItem('raha', JSON.stringify(kontole_summa))
      document.getElementById("jooksev_tulemus").innerHTML = kontole_summa;
      oige_vastus_piiks.play();
      alert("Õige vastus, kontole lisatakse " + raha + "€");
  }  
 // teeme alumise kihi nähtavaks
  document.getElementById("vastused").style.display="none";
}
  
