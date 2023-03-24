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



    //スクロールされたときheaderにスタイルをつける

    const header = document.querySelector('header') //ヘッダーの要素を取得

    //スクロールしたときに呼び出す関数
    function OnscrollCallback(entries){
        entries.forEach(entry=>{
            //空要素が交差していないとき＝空要素が画面から消えていて少しでもスクロールしたとき
            if(!entry.isIntersecting){
                //ヘッダーにscrolledクラスをつける
                header.classList.add('scrolled')
            }else{ //画面の１番上に戻ったとき＝空要素が画面にあるとき（交差がtrue）
                header.classList.remove('scrolled')
            }
        });
    }

    //スクロールされたかどうかを監視するオブザーバー
    const OnscrollObserver = new IntersectionObserver(OnscrollCallback);

    //targetをつけた空要素の監視を開始
    OnscrollObserver.observe(document.getElementById('target'))

    

    //上へをクリックしたとき、スルスルっと戻る

    const toTop = document.getElementById('to-top') //ID to-topの要素を取得

    //上へ戻るボタンがクリックされたとき
    toTop.addEventListener('click',e => {
        //アドレスに#タグがつく規定動作をキャンセル
        e.preventDefault();
        //画面の１番上へスルスルっと戻す
        window.scrollTo({
            top:0, //1番上に戻る
            behavior:'smooth', //スルスルっと戻る
        });
    });



}