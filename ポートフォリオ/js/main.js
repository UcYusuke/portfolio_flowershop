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



    //カルーセル

    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    const ul = document.getElementById('carousel-ul')
    const slides = ul.children; //全てのスライド(li要素)を取得
    const dots = []; //画像下の丸い点用の定数
    let currentIndex = 0; //スライドの移動距離のための変数

    //ボタンの表示状態を更新する関数を定義
    function updateButtons(){
        //最初と最後以外以外は、hiddenクラスを外す
        prev.classList.remove('hidden');
        next.classList.remove('hidden');

        //最初の画像が表示されているとき
        if(currentIndex === 0){
            //戻るボタンを非表示
            prev.classList.add('hidden');
        }
        //最後の画像が表示されているとき
        if(currentIndex === slides.length - 1){
            //進むボタンを非表示
            next.classList.add('hidden');
        }
    }

    //スライドを移動する関数を定義
    function moveSlides(){
        //スライドの幅を取得
        const slideWidth = slides[0].getBoundingClientRect().width;
    
        //ul要素にtransform:translateXのCSSを適用
        //スライドの幅分だけ初期から左に移動
        //ul を li 中の 3 枚の画像が連なった 1 枚の画像として考える
        ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    }

    //画像下の丸い点を生成(画像の数に合わせて動的に生成)する関数を定義
    function setupDots(){
        
        //スライドの数(slides.length)だけ処理を繰り返す
        for(let i = 0; i < slides.length; i++){

            //ボタンを生成
            const button = document.createElement('button');

            //ボタンをクリックしてもスライドを移動するようにする
            button.addEventListener('click',()=>{
                currentIndex = i; //i番目のボタンをクリックしたときi番目の画像表示するための移動量を指定
                updateDots();
                updateButtons();
                moveSlides();
            });
            
            //生成したボタンをあとで処理できるよう、配列(dots)に格納
            dots.push(button); //push()は、配列に要素を追加するメソッド
            
            //nav要素に、ボタン要素を追加していく（ボタンを生成）
            document.getElementById('carousel-nav').appendChild(button)
        }

        //最初の点は、濃い色のスタイル(current)をつける
        dots[0].classList.add('current');
    }

    //currentクラス（濃い点のスタイル)を移動する関数を定義
    function updateDots(){
        //まずは全てのクラスからcurrentクラスを削除
        dots.forEach(dot =>{
            dot.classList.remove('current')
        });
        //今クリックされたボタンに対してだけcurrentクラスをつける
        dots[currentIndex].classList.add('current');
    }

    updateButtons(); //スタート時戻るボタンを非表示
    setupDots(); //画像の数に合わせて丸い点を生成

    //進むボタンがクリックされたとき、ulをli1枚分の距離だけ平行移動する
    
    next.addEventListener('click',()=>{

        //クリックするたびに移動する距離をスライド幅の整数倍増やす
        currentIndex++;

        //濃い点のスタイル(currentクラス)を移動
        updateDots();

        //ボタンが押されたあと、最初と最後が表示されたら戻るか進むボタンを非表示
        updateButtons();

        //スライド移動
        moveSlides();
        
    });
    
    //戻るボタンがクリックされたとき
    prev.addEventListener('click',()=>{
        //クリックするたびに初期から移動する距離をスライド幅の整数倍減らす
        currentIndex--;
        updateDots();
        updateButtons();
        moveSlides();
    });

    //画面の幅が変更されたときに、画像がずれないための処理
    window.addEventListener('resize',()=>{
        moveSlides();
    });
}