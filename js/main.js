const STICKY = 'sticky';
const NORMAL = 'normal';
const OPACITY = "opacity";
const TRANSLATE_Y = "translateY";
const CANVAS = 'canvas';


let currentScene=0;
let yOffset=0;
let delayedYoffset=0;
let preIdx=-1;
let firstCanvasVisit=false;
let canvasAnimationActive=true;
let imageLoaded= false;
let scrollHeightScenes= 0;
let loadedImageCount=0;
let totalImageCount=1262;
const imagesInfo = [
    {
        start:6726,
        length:300,
        imageFolder:"../images/001",
        fileName:(i)=>`IMG_${i}.jpg`,
        images:[]
    },
    {
    },
    {
        start:7027,
        length:960,
        imageFolder:"../images/002",
        fileName:(i)=>`IMG_${i}.jpg`,
        images:[]
    },{
        start:1,
        length:2,
        imageFolder:"../images/003",
        fileName:(i)=>`blend-image-${i}.jpg`,
        images:[],
    }
];
const scenes = [
    {
        type: STICKY,
        heightNum:5,
        scrollHeight:0,
        objs:{
            container : document.querySelector('#scroll-section-0'),
            messageA : document.querySelector('#scroll-section-0 .a'),
            messageB : document.querySelector('#scroll-section-0 .b'),
            messageC : document.querySelector('#scroll-section-0 .c'),
            messageD : document.querySelector('#scroll-section-0 .d'),
            canvas: document.querySelector('#video-canvas-0'),
            context: document.querySelector('#video-canvas-0').getContext('2d'), 
        },
        changeStyles:[
            {
                target :"canvas",
                style:CANVAS,
                ranges:[
                    {start:0 ,end:1 ,startValue:0 ,endValue:imagesInfo[0].length-1 },
                ]
            },
            {
                target :"canvas",
                style:OPACITY,
                ranges:[
                    {start:0.85 ,end:0.95 ,startValue:1 ,endValue:0 },
                    {start:0.95 ,end:1 ,startValue:0 ,endValue:0 },
                ]
            },
            {
                target:"messageA",
                style:OPACITY,
                ranges:[
                    {start:0.1 ,end:0.18 ,startValue:0 ,endValue:1 },
                    //{start:0.18, end: 0.22, startValue:1, endValue:1},
                    //css 에서 바디에 아디디를 추가해서 범위안에 없을시는
                    // 기본값이 opacity가 1로 만들어서 새로고침을 해도
                    // 정상적으로 보인다
                    {start :0.22, end: 0.3 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageA",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.1 ,end:0.18 ,startValue:70 ,endValue:0 },
                    {start :0.22, end: 0.3 ,startValue:0 ,endValue:-70}
                ]
            },
            {
                target:"messageB",
                style:OPACITY,
                ranges:[
                    {start:0.3 ,end:0.38 ,startValue:0 ,endValue:1 },
                    {start:0.38 ,end:0.42 ,startValue:1 ,endValue:1 },
                    {start :0.42, end: 0.5 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageB",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.3 ,end:0.38 ,startValue:70 ,endValue:0 },
                    {start :0.42, end: 0.5 ,startValue:0 ,endValue:-70}
                ]
            },
            {
                target:"messageC",
                style:OPACITY,
                ranges:[
                    {start:0.5 ,end:0.58 ,startValue:0 ,endValue:1 },
                    {start:0.58 ,end:0.62 ,startValue:1 ,endValue:1 },
                    {start :0.62, end: 0.7 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageC",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.5 ,end:0.58 ,startValue:70 ,endValue:0 },
                    {start :0.62, end: 0.7 ,startValue:0 ,endValue:-70}
                ]
            },
            {
                target:"messageD",
                style:OPACITY,
                ranges:[
                    {start:0.7 ,end:0.78 ,startValue:0 ,endValue:1 },
                    {start:0.78 ,end:0.82 ,startValue:1 ,endValue:1 },
                    {start :0.82, end: 0.9 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageD",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.7 ,end:0.78 ,startValue:70 ,endValue:0 },
                    {start :0.82, end: 0.9 ,startValue:0 ,endValue:-70}
                ]
            },

        ],
    },
    {
        type: NORMAL,
        heightNum:5,
        scrollHeight:0,
        objs:{
            container : document.querySelector('#scroll-section-1')
        }
    },
    {
        type: STICKY,
        heightNum:5,
        scrollHeight:0,

        objs:{
            container : document.querySelector('#scroll-section-2'),
            messageA : document.querySelector('#scroll-section-2 .a'),
            messageB : document.querySelector('#scroll-section-2 .b'),
            messageC : document.querySelector('#scroll-section-2 .c'),
            canvas : document.querySelector('#video-canvas-2'),
            context : document.querySelector('#video-canvas-2').getContext('2d'),
        },
        changeStyles:[{
                target:"canvas",
                style:CANVAS,
                ranges:[
                    {start:0 ,end:1 ,startValue:0 ,endValue:imagesInfo[2].length-1 },
                ]
            },
            {
                target :"canvas",
                style:OPACITY,
                ranges:[

                    {start:0,end:0.1 ,startValue:0 ,endValue:1 },
                    {start:0.1,end:0.96 ,startValue:1 ,endValue:1 },

                    {start:0.96 ,end:1 ,startValue:1 ,endValue:0 },
                ]
            },
            {
                target:"messageA",
                style:OPACITY,
                ranges:[
                    {start:0.1 ,end:0.18 ,startValue:0 ,endValue:1 },
                    {start:0.18, end: 0.22, startValue:1, endValue:1},
                    {start :0.22, end: 0.3 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageA",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.1 ,end:0.18 ,startValue:70 ,endValue:0 },
                    {start :0.22, end: 0.3 ,startValue:0 ,endValue:-70}
                ]
            },
            {
                target:"messageB",
                style:OPACITY,
                ranges:[
                    {start:0.60 ,end:0.63 ,startValue:0 ,endValue:1 },
                    {start:0.63 ,end:0.67 ,startValue:1 ,endValue:1 },
                    {start :0.67, end: 0.75 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageB",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.60 ,end:0.63 ,startValue:20 ,endValue:0 },
                    {start :0.67, end: 0.75 ,startValue:0 ,endValue:-20}
                ]
            },
            {
                target:"messageC",
                style:OPACITY,
                ranges:[
                    {start:0.90 ,end:0.93 ,startValue:0 ,endValue:1 },
                    {start :0.95, end: 1 ,startValue:1 ,endValue:0}
                ]
            },{
                target:"messageC",
                style:TRANSLATE_Y,
                ranges:[
                    {start:0.84 ,end:0.9 ,startValue:20 ,endValue:0 },
                    {start :0.92, end: 1 ,startValue:0 ,endValue:-20}
                ]
            },

        ],
    },
    {
        type: STICKY,
        heightNum:5,
        scrollHeight:0,
        objs:{
            container : document.querySelector('#scroll-section-3'),
            canvas : document.querySelector('.blend_image_canvas'),
            context : document.querySelector('.blend_image_canvas').getContext('2d'),
            canvasCaption : document.querySelector('.canvas-caption'),
        },
        values:{
            shrinkRatio:1,
            top:0,
            marginTop:0,
        },
        changeStyles:[
            {
                target:"canvas",
                style:"whiteboxpercent",
                ranges:[
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                ]
            },{
                target:"canvas",
                style:"blend",
                ranges:[
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                ]
            },{
                target:"canvas",
                style:"scale",
                ranges:[
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                ]
            },{
                target:"canvasCaption",
                style:OPACITY,
                ranges:[
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                ]
            },{
                target:"canvasCaption",
                style:TRANSLATE_Y,
                ranges:[
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },
                    {start:-1,end:-1 ,startValue:0 ,endValue:0 },

                ]
            }
        ]

    },
];



const isInScope = (a,range)=>{
    const{start, end}= range;
    if(start<=a && a<=end){
        return true;
    }
    return false;
}
const setScenesHeight = ()=>{
    console.log('resizecallback');

    for(let i=0; i< scenes.length;++i){
        if(scenes[i].type=== STICKY){
            scenes[i].scrollHeight = scenes[i].heightNum * window.innerHeight;
            const section = document.querySelector(`#scroll-section-${i}`);
            section.style.height = `${scenes[i].scrollHeight}px`;
        }else if(scenes[i].type === NORMAL){
            scenes[i].scrollHeight = scenes[i].objs.container.offsetHeight;
        }
    }

};
const calcCurrentScene = ()=>{

    let scrollY = window.scrollY;
    let cs=0;
    scrollHeightScenes=0;
    for(let scene of scenes){
        if(scrollY<scene.scrollHeight){
            break;
        }
        scrollHeightScenes +=  scene.scrollHeight;
        scrollY-= scene.scrollHeight;
        cs++;
    }
    if(currentScene!=cs){
        firstCanvasVisit=true;
        //currentScene 은 직전의 신이 된다
        const keys =Object.keys(scenes[currentScene].objs);
        for(const key of keys){
            if(key  === 'context'){
                continue;
            }
            if(scenes[currentScene].objs[key].classList.contains('sticky-elem')){
                scenes[currentScene].objs[key].style.opacity = '0';
            }
        }
    }
    cs = Math.min(3,cs);
    currentScene = cs;
    yOffset = scrollY;
    document.body.setAttribute("id", `scroll-section-${currentScene}`);

}
const calcCurrentScenePercent= ()=>{
    return yOffset/scenes[currentScene].scrollHeight;
}
const calcScenePercent= (sceneIdx, yoffset)=>{
    return yoffset/scenes[sceneIdx].scrollHeight;
}


const calcPercentRange = (dragPercent, range)=>{
    const {start, end, startValue, endValue}= range;
    if(end<dragPercent)return endValue;
    else if(dragPercent<start)return startValue; 
    const percent = (dragPercent-start)/(end-start);
    if(startValue <= endValue){
        return startValue + (endValue-startValue)*percent;
    }else{
        return startValue - (startValue-endValue)*percent;
    }
}
const drawBlendImageCanvas = ()=>{
    const canvasCtx =  scenes[3].objs.context;
    canvasCtx.drawImage(imagesInfo[3].images[0],0,0);
    const shrinkRatio = window.innerHeight/1080;

    //애플은 1670 1670 사이즈의 사진을 써서 height 에 무조건 맞춘듯
    // 그리고 비율이 안좋으면 효과를 없애고 그냥 사진 두개를 넣어둠
    if(shrinkRatio*1920<document.body.offsetWidth){
        canvasAnimationActive=false;
        console.log('animation 동작 안하게 할 예정')
        //return
    }
    if(shrinkRatio>1){
        const offsetTop = shrinkRatio*1080-1080;
        document.querySelector('#scroll-section-3 p').style.marginBottom = `${offsetTop}px`;
    }
    scenes[3].objs.canvas.style.transform = `scale(${shrinkRatio})`;
    drawWhiteBox(shrinkRatio); 

    return shrinkRatio;
}
const drawWhiteBox = (shrinkRatio, percent=0.15)=>{
    const canvasCtx =  scenes[3].objs.context;
    const width = scenes[3].objs.canvas.width;
    const height = scenes[3].objs.canvas.height;
    canvasCtx.fillStyle= 'white';
    const newWidth = width*shrinkRatio;

    const widthOffset = (newWidth- document.body.offsetWidth)/2;

    const whiteboxWidth = percent*document.body.offsetWidth;

    const wo = (widthOffset+whiteboxWidth)/shrinkRatio;
   
    canvasCtx.fillRect(0,0,wo,height);
    canvasCtx.fillRect(width-wo,0,wo,height);
    //계산이 생각한 대로 맞지 않느다 내 계산이 틀린지 계산히 정확한대로 안되는지 알 수 없었따
    //fillrect를 쓰지 않는것은 이유가 있는것 같다. 
    //또한 스크롤을 빠르게 돌리면 제대로 칠해 지지 않는다./


}
const setScene3CanvasValue = ()=>{
    scenes[3].values.shrinkRatio= drawBlendImageCanvas();
    const scene3 = scenes[3];
    const shrinkRatio =  scene3.values.shrinkRatio;
    const canvas =  scene3.objs.canvas;
    const canvas_Y_Offset = canvas.offsetTop;
    const canvasHeightOffset =(canvas.height - shrinkRatio*canvas.height)/2;
    const end = calcScenePercent(3,canvasHeightOffset+ canvas_Y_Offset);
    const changeStyle ={start:end/3 ,end ,startValue:0.15 ,endValue:0 };
    scene3.changeStyles[0].ranges[0] = changeStyle;
    scene3.values.top= -canvasHeightOffset;
    scene3.changeStyles[1].ranges[0].start=end;
    scene3.changeStyles[1].ranges[0].end=end+0.2;
    scene3.changeStyles[1].ranges[0].startValue=canvas.height;
    scene3.changeStyles[1].ranges[0].endValue=0;
    
    const endShrinkRatio = (window.innerHeight*3/5)/canvas.height;
    scene3.changeStyles[2].ranges[0]= {start:end+0.2,end:end+0.4,startValue:shrinkRatio,endValue:endShrinkRatio};
    
    scene3.values.marginTop = (end+0.4)*scene3.scrollHeight- scene3.objs.canvas.offsetTop-canvasHeightOffset;

    scene3.changeStyles[3].ranges[0] = {start:end+0.4,end:end+0.5,startValue:0,endValue:1};
    scene3.changeStyles[3].ranges[1] = {start:end+0.5,end:1,startValue:1,endValue:1};
    scene3.changeStyles[4].ranges[0] = {start:end+0.4,end:end+0.5,startValue:20,endValue:-20};
    scene3.changeStyles[4].ranges[1] = {start:end+0.5,end:1,startValue:-20,endValue:-20};

}

const setionsAnimation = ()=>{
    const dragPercent = calcCurrentScenePercent();

    switch(currentScene){
        case 0:
            changeSectionStyle(dragPercent);
            break;
        case 2:
            changeSectionStyle(dragPercent);
            break;
        case 3:
            changeSectionStyle(dragPercent);

            const scene3 = scenes[3];
            const canvas = scenes[3].objs.canvas;
            const ctx = scenes[3].objs.context;
            const defaultScale = scene3.values.shrinkRatio;
            const newImage = imagesInfo[3].images[1];

            const scene3LastPartMaxShrinkRatio = scene3.changeStyles[2].ranges[0].endValue;
            if(dragPercent<scene3.changeStyles[0].ranges[0].end){
                canvas.classList.remove('sticky');
                canvas.style.marginTop=0;
                canvas.style.transform= `scale(${defaultScale})`;
            }else if(dragPercent<scene3.changeStyles[1].ranges[0].end){
                canvas.style.transform= `scale(${defaultScale})`;
                canvas.style.marginTop=0;
                canvas.classList.add('sticky');
                canvas.style.top =  `${scenes[3].values.top}px`;
      
                ctx.drawImage(imagesInfo[currentScene].images[0],0,0);
                // drawWhiteBox( scene3.values.shrinkRatio,0);
                

                const sy = calcPercentRange(dragPercent, scenes[3].changeStyles[1].ranges[0]);
                ctx.drawImage(newImage,0,sy,canvas.width,canvas.height,0,sy,canvas.width,canvas.height);
            }else if(dragPercent<scene3.changeStyles[2].ranges[0].end){
                //d영역 감소 
                ctx.drawImage(newImage,0,0,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
                canvas.style.marginTop=0;
                canvas.classList.add('sticky');
                dragPercentRange = calcPercentRange(dragPercent, scene3.changeStyles[2].ranges[0]);
                canvas.style.transform= `scale(${dragPercentRange})`;
            }else{
                canvas.classList.remove('sticky');
                console.log(scene3.values.marginTop);
                canvas.style.marginTop= `${scene3.values.marginTop}px`;
                canvas.style.transform= `scale(${scene3LastPartMaxShrinkRatio})`;

            }
/*             if(dragPercent< scene3.changeStyles[1].ranges[0].start){
                canvas.classList.remove('sticky');
            }
            //blend animation
            if(isInScope(dragPercent,scene3.changeStyles[1].ranges[0])){
                canvas.style.transform= `scale(${scene3.values.shrinkRatio})`;
                canvas.style.marginTop=0;
                canvas.classList.add('sticky');
                canvas.style.top =  `${scenes[3].values.top}px`;
      
                ctx.drawImage(imagesInfo[currentScene].images[0],0,0);
                // drawWhiteBox( scene3.values.shrinkRatio,0);
                

                const newImage = imagesInfo[3].images[1];
                const sy = calcPercentRange(dragPercent, scenes[3].changeStyles[1].ranges[0]);
                ctx.drawImage(newImage,0,sy,canvas.width,canvas.height,0,sy,canvas.width,canvas.height);
            }
            if(scene3.changeStyles[1].ranges[0].end<dragPercent){
                ctx.drawImage(imagesInfo[3].images[1],0,0,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
            }
            if(isInScope(dragPercent, scene3.changeStyles[2].ranges[0])){
                canvas.style.marginTop=0;
                canvas.classList.add('sticky');
                dragPercentRange = calcPercentRange(dragPercent, scene3.changeStyles[2].ranges[0]);
                canvas.style.transform= `scale(${dragPercentRange})`;
            }
            if(scene3.changeStyles[2].ranges[0].end<dragPercent){
                canvas.classList.remove('sticky');
                canvas.style.marginTop= `${scene3.values.marginTop}px`;
            } */
            break;
        default:

    }
}
const changeSectionStyle = (dragPercent)=>{
    const scene = scenes[currentScene];
    for(changeStyle of scene.changeStyles){
        const start = changeStyle.ranges[0].start;
        const end = changeStyle.ranges[changeStyle.ranges.length-1].end;
        const style = changeStyle.style;
        const target = changeStyle.target;
        if(isInScope(dragPercent, {start,end})){
            for(range of changeStyle.ranges){
                if(isInScope(dragPercent, range)){
                    dragPercentRange = calcPercentRange(dragPercent, range);
                    if(style=== OPACITY){
                        scene.objs[target].style.setProperty("opacity", dragPercentRange);
                    }else if(style=== TRANSLATE_Y){
                        scene.objs[target].style.transform = `translateY(${dragPercentRange}%)`;
                    }else if(style=== "whiteboxpercent"){
                        const canvasCtx =  scenes[currentScene].objs.context;
                        canvasCtx.drawImage(imagesInfo[currentScene].images[0],0,0);
                        const shrinkRatio = scene.values.shrinkRatio;

                        drawWhiteBox(shrinkRatio,dragPercentRange);
                    }
                }
            }

        }else if(style===OPACITY){
            scene.objs[changeStyle.target].style.setProperty("opacity",changeStyle.ranges[0].startValue );
        }
    }

}

const loadImage = ()=>{
    for(const imageInfo of imagesInfo){
        if(imageInfo.length){
            for(let i=0;i<imageInfo.length;++i){
                const image = new Image();
                image.src = `${imageInfo.imageFolder}/${imageInfo.fileName(imageInfo.start+i)}`;
                 image.onload = ()=>{
                    loadedImageCount++;
                    if(loadedImageCount==totalImageCount){
                        imageLoaded=true;
                    }
                }  //image가 다 로드 되었는지를 확인 할 수 있는 방법 여기서는 
                //load 이벤트 리스너를 쓸거기 때문에 필요 x
                imageInfo.images.push(image); 
            }
        }
    }
}
const setImageCenter = ()=>{
    const ratio = window.innerHeight/1080;
    scenes[0].objs.canvas.style.transform = `translate3d(-50%,-50%, 0) scale(${ratio})`;
    scenes[2].objs.canvas.style.transform = `translate3d(-50%,-50%, 0) scale(${ratio})`;
}
const watchNaviFix= ()=>{
    if(window.scrollY>44){
        document.querySelector('.local-nav').classList.add('sticky');
    }else{
        document.querySelector('.local-nav').classList.remove('sticky');
    }
}

let loopStatus =false;
const softVideoPlay = ()=>{
    if(!loopStatus){
        loopStatus=true;
        requestAnimationFrame(videoPlayLoop);
    }
}
const videoPlayLoop = ()=>{
    if(currentScene!==0 && currentScene!==2){
        delayedYoffset=window.scrollY;
        loopStatus=false;
        return;
    }
    delayedYoffset = (delayedYoffset)+ (window.scrollY-delayedYoffset)*0.1;
    const delayedYoffsetScene = delayedYoffset-scrollHeightScenes;
    const delayDragPercent = calcScenePercent(currentScene, delayedYoffsetScene);
    const range = scenes[currentScene].changeStyles[0].ranges[0];
    const delaySceneProgressRatio = calcPercentRange(delayDragPercent, range);
    const idx = Math.round(delaySceneProgressRatio);
    if(preIdx!==idx){
        const canvasCtx = scenes[currentScene].objs.context;
        canvasCtx.drawImage(imagesInfo[currentScene].images[idx],0,0); 
        preIdx=idx;
    }
    if(Math.abs(delayedYoffset-yOffset)>1){
        requestAnimationFrame(videoPlayLoop);
    }else{
        loopStatus=false;
    }
}
const checkLoaded =()=>{
    if(domContentLoaded && imageLoaded){
   
        document.body.classList.remove('before-load');
    }
}
function storePagePosition() {
    var page_y = window.pageYOffset;
    localStorage.setItem("page_y", page_y);
}
const preY =()=>{
    let currentPageY;
    try {
        currentPageY = localStorage.getItem("page_y");
        if (currentPageY === undefined) {
            return;
        }
        window.scrollTo( 0, currentPageY );
    } catch (e) {
        // no localStorage available
    }
}
const throttle = (callback,time)=>{
    let pos = true;
    return ()=>{
        if(!pos)return;
        pos=false;
        setTimeout(()=>{
            callback();
            pos = true;
        },time);
    }
} 

const debounce = (callback,time)=>{
    let pre= false;
    let id = 0;
    return ()=>{
        if(pre){
            clearTimeout(id);
        }
        id = setTimeout(() => {
            callback();
            pre=false;
        }, time);
        pre = true;
    }
} 
const init= ()=>{
    setScenesHeight();
    watchNaviFix();
    setImageCenter();
    preY();
    calcCurrentScene();
    setScene3CanvasValue();
    setionsAnimation();
    softVideoPlay();
    if(currentScene===3){
        window.scrollTo( 0, scrollHeightScenes );
    }
    const debounceFunction  = debounce(()=>{
        watchNaviFix();
        setScenesHeight();
        setImageCenter();
        calcCurrentScene();
        setScene3CanvasValue();
        setionsAnimation();
    },100)
/*     window.addEventListener('resize',()=>{
        watchNaviFix();
        setScenesHeight();
        setImageCenter();
        calcCurrentScene();
        setScene3CanvasValue();
        setionsAnimation();
    }); */
    window.addEventListener('resize',debounceFunction);

    window.addEventListener('scroll', ()=>{
        watchNaviFix();
        softVideoPlay();
        calcCurrentScene();
        setionsAnimation();

    }); 
    document.querySelector('.loading').addEventListener('transitionend', ()=>{
        document.body.removeChild(document.querySelector('.loading'));
    });
    window.onbeforeunload = function() {
        storePagePosition();
    };

};
const load = ()=>{
    let domloaded=false;
    window.addEventListener('load',()=>{
        domloaded=true;  
    });
    loadImage();
    const intervalId = setInterval(()=>{
        if(imageLoaded && domloaded){
            document.body.classList.remove('before-load');  
            init();   
            clearInterval(intervalId);
        }
    },100);
}

load();
