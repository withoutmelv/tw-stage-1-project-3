window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;
    let norepeat=[0,0,0,0,0,0];


    startBtn.addEventListener('click', function () {
        titleH1.innerHTML="WHACK-A-MOLE!";
        timeUp=false;
        score=0;
        scoreBoard.innerHTML=score;
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);

        setTimeout(() => {
            titleH1.innerHTML="TIME UP!";
            startBtn.innerHTML="Replay!";
            startBtn.style.display='inline-block';
            timeUp=true;
        }, gameTime);
    }


    function startGame() {
        if(!timeUp){
            let i=Math.round(Math.random()*5);
            let j=Math.round(Math.random()*300);
            if (norepeat[i]===1){
                norepeat[i]=0;
                i=(i+1)%6;
            }
            norepeat[i]=1;
            let num=(i+1).toString();
            holes[i].classList.remove('hole'+num);
            holes[i].classList.add('up');
            moles[i].addEventListener('click',addscore,false);
            setTimeout(()=>{
                holes[i].classList.remove('up');
                holes[i].classList.add('hole'+num);
            },400+j);
            setTimeout(()=>{
                moles[i].removeEventListener('click',addscore,false);
            },800+j);
            setTimeout(()=>{
                startGame();
            },400+j);
        }
    }

    function addscore(){
        score+=1;
        scoreBoard.innerHTML=score;
    }

};