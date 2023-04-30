'use strict'

{

    //----------------ハンバーガーメニュー----------------

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



   //----------------アコーディオン----------------

    const lists = document.querySelectorAll('.accordion-parent-menu');

    lists.forEach(li=>{
    //liがクリックされたとき
    li.addEventListener('click',()=>{
        li.parentNode.classList.toggle('show'); //クリックしたliにshowクラスをつける
    });

});




    //----------------グローバルメニュー----------------

    //親メニューの要素を取得
    const ParentMenu = document.querySelectorAll('.parent-menu')

    ParentMenu.forEach(element =>{

        //マウスホバーした親メニューの子メニューに、activeクラスをつける
        element.addEventListener('mouseover',() =>{
            element.querySelector('.child-menu').classList.add('active')
        });

        //マウスホバーを外したとき、activeクラスを外す
        element.addEventListener('mouseout',() =>{
            element.querySelector('.child-menu').classList.remove('active')
        });

    });





    //----------------タブメニュー----------------
    const menuItems = document.querySelectorAll('.tab-menu li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(clickedItem =>{
        clickedItem.addEventListener('click',e =>{
            //a要素のリンク先へページ遷移するという規定動作をキャンセル
            e.preventDefault(); 

            //まず全てのa要素からactiveクラスを外す
            menuItems.forEach(item =>{
                item.classList.remove('active')
            });

            //クリックされたa要素にactiveクラスをつける
            clickedItem.classList.add('active');

            //まず全ての「content」からactiveクラスを外す
            contents.forEach(content =>{
                content.classList.remove('active')
            });

            //クリックされたa要素につけられているdata-idと、同じ名前のIDを持つcontentを取得
            //「clickedItem.dataset.id」が、クリックされたa要素につけられているdata-id="***"の「***」部分
            //取得した同じIDを持つcontent要素に、activeクラスをつける
            document.getElementById(clickedItem.dataset.id).classList.add('active')
        });
    });




    //----------------スライダー----------------
    
    //メインビジュアル用
    $(".slide-type1").slick({
        autoplay:true,
        slidesToShow:1,
        autoplaySpeed: 5000, // 自動再生のスライド切り替えまでの時間を設定
        speed: 1000, // スライドが流れる速度を設定
        cssEase: 'linear',//動きの種類等速
        infinite:true,
        slidesToScroll:1,
        dots:true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows:false,
              }
            }
          ]
        });

    //新商品用
    $(".slide-type2").slick({
        autoplay:true,
        slidesToShow:4,
        autoplaySpeed: 3000, // 自動再生のスライド切り替えまでの時間を設定
        speed: 1000, // スライドが流れる速度を設定
        cssEase: 'linear',//動きの種類等速
        infinite:true,
        slidesToScroll:1,
        dots:true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2, // 画面幅750px以下でスライド3枚表示
              }
            }
          ]
      });






    
    //----------------スクロールしたときに下からふわっと表示----------------

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
        threshold:0.1,
    });

    //animateクラスをつけた要素に、監視を開始
    document.querySelectorAll('.animate').forEach(el =>{
        InviewObserver.observe(el);
    });





    //----------------スクロールされたときheaderにスタイルをつける----------------

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

    



    //----------------上へをクリックしたとき、スルスルっと戻る----------------

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





    //----------------アコーディオンUI----------------

    const dts = document.querySelectorAll('dt');

    dts.forEach(dt=>{

    //dtがクリックされたとき
    dt.addEventListener('click',()=>{
        dt.parentNode.classList.toggle('show'); //dtの親要素divにクラスをつける
        
        //クリックした要素以外を閉じる
        dts.forEach(el =>{
            //クリックされた要素dtと、全てのdt要素を順に取り出したelが異なるとき
            if(dt !== el){ 
               // 取り出したdt要素(ここではel)がクリックされたdt要素と違う場合、
               // elの親要素のクラスからappearを取り除く
                el.parentNode.classList.remove('show');
            }
        });
    });

});


}