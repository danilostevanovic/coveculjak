var covek = {
    gladan:'ne',
    zedan:'ne',
    ziv:'da',
    umoran:'ne',
    pisanjeIsranje:'ne',
    budan:true,
    tezina:document.getElementById('coveculjak').offsetWidth,
    visina:document.getElementById('coveculjak').offsetHeight,
    zdrav:true,
    elementi : {
        vreme:0,
        widthHrana:100,
        widthVoda:100,
        voda:document.getElementById('voda-progres'),
        hrana:document.getElementById('hrana-progres'),
        cesma:document.getElementById('water'),
        hamburger:document.getElementById('food'),
        krevet:document.getElementById('krevet'),
        wc:document.getElementById('wc'),
        timer:document.getElementById('timer'),
        figura:document.getElementById('coveculjak'),
        polje:document.getElementById('glavno-polje')
    },
    // METODIIIII
    vremeTece:function (){
        var i = 0;
        var interval = setInterval(function(){
            covek.elementi.widthHrana--;
            covek.elementi.widthVoda--;
            i++;
            if(i==10){
                covek.elementi.vreme++;
                covek.elementi.voda.style.width = covek.elementi.widthVoda+'%';
                covek.elementi.hrana.style.width = covek.elementi.widthHrana+'%';
                covek.elementi.timer.textContent = covek.elementi.vreme+'H';
                clearInterval(interval);
                covek.vremeTece();
            }
            if(covek.elementi.widthHrana<0||covek.elementi.widthVoda<0){
                clearInterval(interval);
                covek.ziv='ne';
                covek.elementi.figura.classList.add('mrtav');
                document.getElementById('indikator-mrtav').textContent='MRTAV!!';
            };
            if(covek.elementi.voda.offsetWidth<400){
                document.getElementById('indikator-zedan').classList.toggle('red');
             }
             if(covek.elementi.hrana.offsetWidth<400){
                document.getElementById('indikator-gladan').classList.toggle('red');
            }
            if(covek.elementi.hrana.offsetWidth>400||covek.elementi.voda.offsetWidth>400){
                document.getElementById('indikator-wc').classList.toggle('red');
            }
            if(covek.elementi.hrana.offsetWidth<300||covek.elementi.voda.offsetWidth<300){
                document.getElementById('indikator-wc').textContent='';
            }
            if(covek.elementi.vreme>12){
                document.getElementById('indikator-krevet').classList.toggle('red');
            }
        },1000);
        if(covek.elementi.voda.offsetWidth<300){
            covek.zedan='da';  
            document.getElementById('indikator-zedan').textContent = 'Zedan sam!!!';
        };
         if(covek.elementi.hrana.offsetWidth<400){
             covek.gladan='da';
             document.getElementById('indikator-gladan').textContent = 'Gladan sam!!!';
         };
        if(covek.elementi.hrana.offsetWidth>=400||covek.elementi.voda.offsetWidth>=400){
            covek.pisanjeIsranje='da';
            document.getElementById('indikator-wc').textContent = 'Ide mi se u wc!!!'
        }
        if(covek.elementi.hrana.offsetWidth<400||covek.elementi.voda.offsetWidth<400){
            covek.pisanjeIsranje='ne';
            document.getElementById('indikator-wc').textContent = ''
        }
        if(covek.elementi.vreme>12){
            covek.umoran='da';
            document.getElementById('indikator-krevet').textContent='Spava mi se!';
        }
    },
    kretanje:function(){
        var smerX = 440;
        var smerY = 250;
        covek.elementi.figura.style.position = 'absolute';
        document.body.addEventListener('keydown',function(){
                    if (event.keyCode === 37) {
                        smerX -= 20; //levo
                    }
                    if (event.keyCode === 39) {
                        smerX += 20; //desno
                    }
                    if (event.keyCode === 38) {
                        smerY -= 20;//gore
                    }
                    if (event.keyCode === 40) {
                        smerY += 20; //dole
                    }
                    if (smerX > covek.elementi.polje.offsetWidth - 82) {
                        smerX = covek.elementi.polje.offsetWidth - 82;
                    }
            
                    if (smerX < 0) {
                        smerX = 0;
                    }
            
                    if (smerY > covek.elementi.polje.offsetHeight - 102) {
                        smerY = covek.elementi.polje.offsetHeight - 102;
                    }
                    if (smerY < 0) {
                        smerY = 0;
                    }
                    covek.elementi.figura.style.left = smerX + 'px';
                    covek.elementi.figura.style.top = smerY + 'px';
                    
        });
        
    },
    potrebe:function(){
      var i = 0;
       var interval = setInterval(function(){
         
           console.log('krevet offset left',covek.elementi.krevet.offsetLeft);
           console.log('covek offset left',covek.elementi.figura.offsetLeft);
           console.log('covek.umoran',covek.umoran);
           if(covek.gladan=='da'){
               if(covek.elementi.figura.offsetLeft==covek.elementi.hamburger.offsetLeft){
                   covek.elementi.hrana.style.width = (covek.elementi.hamburger.offsetWidth+400)+'px';
                   covek.elementi.widthHrana = 100;
                   document.getElementById('indikator-gladan').textContent='';
               }
           };
           if(covek.zedan=='da'){
               if(covek.elementi.figura.offsetTop+12==covek.elementi.voda.offsetTop){
                   covek.elementi.voda.style.width=(covek.elementi.voda.offsetWidth+400)+'px';
                   covek.elementi.widthVoda = 100;
                   document.getElementById('indikator-zedan').textContent='';
               }
           }
           if(covek.pisanjeIsranje=='da'){
            if(covek.elementi.figura.offsetTop+10==covek.elementi.wc.offsetTop){
                covek.elementi.voda.style.width -= 100+'px';
                document.getElementById('indikator-wc').textContent='';
            }
            if(covek.umoran=='da'){
                if(covek.elementi.figura.offsetLeft==covek.elementi.krevet.offsetLeft+26){
                    covek.elementi.vreme=0;
                    covek.umoran='ne';
                    document.getElementById('indikator-krevet').textContent='';
                }
            }
           }
       },1000)
    },
    
    
};
covek.vremeTece();
covek.kretanje();
covek.potrebe();





