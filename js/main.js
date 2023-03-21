'use strict'

{

    //ハンバーガーメニュー

    const open = document.getElementById('open');
    const overlay = document.querySelector('.overlay')
    const close = document.getElementById('close');

    //開くボタンがクリックされたとき
    open.addEventListener('click',()=>{
    overlay.classList.add('show'); //メニュー画面を表示
    });

    //閉じるボタンがクリックされたとき
    close.addEventListener('click',()=>{
    overlay.classList.remove('show'); //メニュー画面を非表示
    });



    //スクロールしたときに下からふわっと表示

    //交差したときに呼び出す関数
    function InviewCallback(entries,obs){
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                return;
            }
            //交差したターゲットに、appearクラスをつける
            entry.target.classList.add('appear');
            obs.unobserve(entry.target);
        });
    }

    //交差したかどうかを監視するオブザーバー
    const InviewObserver = new IntersectionObserver(InviewCallback,{
        threshold:0.4,
    });

    //animateクラスをつけた要素に、監視を開始
    document.querySelectorAll('.animate').forEach(el =>{
        InviewObserver.observe(el);
    });



    //hero

    function play(){
        //１秒後画像を切り替え
        setTimeout(()=>{
            //現在ついているcurrentクラスをまず外す
            images[currentIndex2].classList.remove('current');
            
            //インデックス番号を１増やして次の画像を表示
            currentIndex2++;

            //インデックス番号が画像の数を超えたら0(最初の画像)に戻す
            //インデックスは0番目から始まるので、-1する。
            //画像が３枚の場合,インデックス番号が２(3枚目の画像）を超えたら0に戻す
            if(currentIndex2 > images.length - 1){
                currentIndex2 = 0;
            }

            //現在のインデックス番号の画像に、currentクラスをつけて画像を表示
            images[currentIndex2].classList.add('current');

            //setTimeoutを再帰的に繰り返し
            play();
    
        },3000);
    }

    //ヒーローエリアのimgを全て取得
    const images = document.querySelectorAll('.hero img');

    //現在表示している画像が何番目であるかのインデックスを変数で保持
    let currentIndex2 = 0; //初期は0番目の画像を表示

    play();



}