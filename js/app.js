var timerWrapper = null;
var timerChnageMenu = null;
let container;
let camera, scene, renderer;
let loader;
let reticle;
let controller;
let model;
let modelPlaced = false;
let modelscale = 1;
let hitTestSource = null;
let localSpace = null;
let hitTestSourceInitialized = false;
let modelAdded = false;
let lastzoom = 1;
let lastamount = 0;
let spotLight;
let menuNumber = 1;
let itemNumber = 1;
let menuNumberLast;
let itemNumberLast;
let currentSession = null;
var inBigPictureMode = false;
var inMainMenu=false;

loader = new THREE.GLTFLoader();

var icon_play_ar = document.getElementById("icon-play-ar");
var icon_qube = document.getElementById("icon-qube");
var icon_3d = document.getElementById("icon-3d");

init();
animate();
addReticleToScene();
setInterval(function () {
  if ($(".menu1-title").offset().top > 100) {
    $(".menu-line1").addClass("menu-indicator-color");
    $(".menu-line2").removeClass("menu-indicator-color");
    $(".menu-line3").removeClass("menu-indicator-color");
    $(".menu-main").css("margin-top", "0px");
    $(".menu-main").css("margin-bottom", "0px");
    $(".menu-main").css("height", "100vh");
    $(".menu-top").removeClass("d-flex");
    $(".menu-top").hide();
  } else if (
    $(".menu1-title").offset().top <= 100 &&
    $(".menu1-title").offset().top > 0
  ) {
    $(".menu-line1").removeClass("menu-indicator-color");
    $(".menu-line2").addClass("menu-indicator-color");
    $(".menu-line3").removeClass("menu-indicator-color");
  } else if ($(".menu1-title").offset().top < 0) {
    $(".menu-line1").removeClass("menu-indicator-color");
    $(".menu-line2").removeClass("menu-indicator-color");
    $(".menu-line3").addClass("menu-indicator-color");
  }
  if ($(".menu-main").is(":visible") && $(".menu1-title").offset().top <= 500) {
    $(".menu-main").css("margin-top", "7vh");
    $(".menu-main").css("margin-bottom", "11vh");
    $(".menu-main").css("height", "82vh");
    $(".menu-top").addClass("d-flex");
    $(".menu-top").show();
  }
}, 500);

$(document).ready(function () {
  $(".img-container").popupLightbox({
    width: 600,
    height: 450,
  });

  var mc1 = new Hammer.Manager(document.getElementById("icon_ghaza1"));
  mc1.add(new Hammer.Tap({ event: "singletap" }));
  mc1.on("singletap ", function (ev) {
    hideAllGhaza();
    menuNumber = 1;
    itemNumber=1;
    $("#icon_ghaza1").hide();
    $("#icon_ghaza1_black").show();
    $(".ghaza1").fadeIn(1000);
    if (inBigPictureMode) {
      $(".foodvertical1").show().addClass("d-flex");
      $(".foodvertical2").hide().removeClass("d-flex");
      $(".foodvertical3").hide().removeClass("d-flex");
      $(".foodvertical4").hide().removeClass("d-flex");
      $(".foodvertical5").hide().removeClass("d-flex");
      $(".foodvertical1").scrollTo(0, 0);
    }
    addModelToScene(menuNumber, itemNumber);
  });

  var mc2 = new Hammer.Manager(document.getElementById("icon_ghaza2"));
  mc2.add(new Hammer.Tap({ event: "singletap" }));
  mc2.on("singletap ", function (ev) {
    hideAllGhaza();
    menuNumber = 2;
    itemNumber=1;
    $("#icon_ghaza2").hide();
    $("#icon_ghaza2_black").show();
    $(".ghaza2").fadeIn(1000);
    if (inBigPictureMode) {
      $(".foodvertical1").hide().removeClass("d-flex");
      $(".foodvertical2").show().addClass("d-flex");
      $(".foodvertical3").hide().removeClass("d-flex");
      $(".foodvertical4").hide().removeClass("d-flex");
      $(".foodvertical5").hide().removeClass("d-flex");
      $(".foodvertical2").scrollTo(0, 0);
    }
    addModelToScene(menuNumber, itemNumber);
  });

  var mc3 = new Hammer.Manager(document.getElementById("icon_ghaza3"));
  mc3.add(new Hammer.Tap({ event: "singletap" }));
  mc3.on("singletap ", function (ev) {
    hideAllGhaza();
    menuNumber = 3;
    itemNumber=1;
    $("#icon_ghaza3").hide();
    $("#icon_ghaza3_black").show();
    $(".ghaza3").fadeIn(1000);
    if (inBigPictureMode) {
      $(".foodvertical1").hide().removeClass("d-flex");
      $(".foodvertical2").hide().removeClass("d-flex");
      $(".foodvertical3").show().addClass("d-flex");
      $(".foodvertical4").hide().removeClass("d-flex");
      $(".foodvertical5").hide().removeClass("d-flex");
      $(".foodvertical3").scrollTo(0, 0);
    }
    addModelToScene(menuNumber, itemNumber);
  });

  var mc4 = new Hammer.Manager(document.getElementById("icon_ghaza4"));
  mc4.add(new Hammer.Tap({ event: "singletap" }));
  mc4.on("singletap ", function (ev) {
    hideAllGhaza();
    menuNumber = 4;
    itemNumber=1;
    $("#icon_ghaza4").hide();
    $("#icon_ghaza4_black").show();
    $(".ghaza4").fadeIn(1000);
    if (inBigPictureMode) {
      $(".foodvertical1").hide().removeClass("d-flex");
      $(".foodvertical2").hide().removeClass("d-flex");
      $(".foodvertical3").hide().removeClass("d-flex");
      $(".foodvertical4").show().addClass("d-flex");
      $(".foodvertical5").hide().removeClass("d-flex");
      $(".foodvertical4").scrollTo(0, 0);
    }
    addModelToScene(menuNumber, itemNumber);
  });

  var mc5 = new Hammer.Manager(document.getElementById("icon_ghaza5"));
  mc5.add(new Hammer.Tap({ event: "singletap" }));
  mc5.on("singletap ", function (ev) {
    hideAllGhaza();
    menuNumber = 5;
    itemNumber=1;
    $("#icon_ghaza5").hide();
    $("#icon_ghaza5_black").show();
    $(".ghaza5").fadeIn(1000);
    if (inBigPictureMode) {
      $(".foodvertical1").hide().removeClass("d-flex");
      $(".foodvertical2").hide().removeClass("d-flex");
      $(".foodvertical3").hide().removeClass("d-flex");
      $(".foodvertical4").hide().removeClass("d-flex");
      $(".foodvertical5").show().addClass("d-flex");
      $(".foodvertical5").scrollTo(0, 0);
    }
    addModelToScene(menuNumber, itemNumber);
  });

  function hideAllGhaza() {
    $("#icon_ghaza1").show();
    $("#icon_ghaza2").show();
    $("#icon_ghaza3").show();
    $("#icon_ghaza4").show();
    $("#icon_ghaza5").show();

    $("#icon_ghaza1_black").hide();
    $("#icon_ghaza2_black").hide();
    $("#icon_ghaza3_black").hide();
    $("#icon_ghaza4_black").hide();
    $("#icon_ghaza5_black").hide();

    $(".ghaza1").hide();
    $(".ghaza2").hide();
    $(".ghaza3").hide();
    $(".ghaza4").hide();
    $(".ghaza5").hide();
  }

  var mc61 = new Hammer.Manager(document.getElementById("icon-gallary"));
  mc61.add(new Hammer.Tap({ event: "singletap" }));
  mc61.on("singletap ", function (ev) {
    $(".menu-main").scrollTo($(".menu1-selector"));
  });

  var mc62 = new Hammer.Manager(document.getElementById("icon-dish"));
  mc62.add(new Hammer.Tap({ event: "singletap" }));
  mc62.on("singletap ", function (ev) {
    $(".menu-main").scrollTo($(".menu2-selector"));
  });

  var mc63 = new Hammer.Manager(document.getElementById("icon-info"));
  mc63.add(new Hammer.Tap({ event: "singletap" }));
  mc63.on("singletap ", function (ev) {
    $(".menu-main").scrollTo($(".menu3-selector"));
  });

  var mc64 = new Hammer.Manager(document.getElementById("icon-3d"));
  mc64.add(new Hammer.Tap({ event: "singletap" }));
  mc64.on("singletap ", function (ev) {

    if(currentSession != null){      
      currentSession.end();
      show3Dside();
    }
    else chnage3Dside();

    function chnage3Dside(){
      if(!$(".food-big-picture-3d").is(":visible")) show3Dside();
      else hide3Dside();
    }

    function show3Dside(){
      $(".food-big-picture").fadeOut(function () {  
        $(".food-big-picture-3d").fadeIn()
        icon_3d.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(130deg)";
      });
    }
    function hide3Dside(){
      $(".food-big-picture-3d").fadeOut(function () {  
        $(".food-big-picture").fadeIn()
        icon_3d.style.filter = null;
      });      
    }
  });

  var mc65 = new Hammer.Manager(document.getElementById("icon-get-screenshot"));
  mc65.add(new Hammer.Tap({ event: "singletap" }));
  mc65.on("singletap ", function (ev) {
    if($(".menu-main").is(":visible")) $(".menu-main").css("display", "");
    else $(".menu-main").css("display", "block");
  });



  $(".dish-container").each(function (index) {
    var that = $(this)[0];
    var mc8 = new Hammer.Manager(that);
    mc8.add(new Hammer.Tap({ event: "singletap" }));
    mc8.on("singletap ", function (ev) {

      if ($(that).attr("class").includes("item1")) itemNumber = 1;
      else if ($(that).attr("class").includes("item2")) itemNumber = 2;
      else if ($(that).attr("class").includes("item3")) itemNumber = 3;
      else if ($(that).attr("class").includes("item4")) itemNumber = 4;

      addModelToScene(menuNumber, itemNumber);
      showBigPicture();

      for (let i = 0; i <= 5; i++) {
        $(".foodvertical"+i).hide().removeClass("d-flex");
        if ($(that).attr("class").includes("ghaza"+i)) {
          menuNumber = i;
          $("#icon_ghaza"+i).hide();
          $("#icon_ghaza"+i+"_black").show();
          $(".foodvertical"+i).show().addClass("d-flex");
          $(".foodvertical"+i).scrollTo($(".foodvertical"+i+" #d" + itemNumber), {
            duration: 1,
          });
        }
      }

    });
  });

  var mc9 = new Hammer.Manager(document.getElementById("image-intro-button"));
  mc9.add(new Hammer.Tap({ event: "singletap" }));
  mc9.on("singletap ", function (ev) {
    hideIntro();
  });

  var mc10 = new Hammer.Manager(document.getElementById("home"));
  mc10.add(new Hammer.Tap({ event: "singletap" }));
  mc10.on("singletap ", function (ev) {
    inMainMenu=true;
    hideBigPicture();
    for (let i = 0; i <= 5; i++) {
      if(menuNumber==i){
        hideAllGhaza();
        $("#icon_ghaza"+i).hide();
        $("#icon_ghaza"+i+"_black").show();
        $(".ghaza"+i).show();
      }
    };
    console.log("taped on home");

  });
});

//hideIntro();
// showBigPicture();

function showBigPicture() {
  inBigPictureMode = true;
  inMainMenu=false;  

  $(".sub-section1").hide();
  $(".dish-row").removeClass("d-flex").hide();
  $(".sub-section2").css("min-height", "82vh");
  $(".sub-section2").css("padding-top", "0px");

  $(".menu-line1").parent().hide();
  $(".menu-line2").parent().hide();
  $(".menu-line3").parent().hide();
  $(".menu-line31").parent().hide();

  $(".menu-line4").parent().show();
  $(".menu-line5").parent().show();
  $(".menu-line6").parent().show();

  $(".food-big-image").fadeIn();
  $(".food-vertical").fadeIn();

  $("body").removeClass("body-image-gradient");
  $("body").addClass("body-image1");
  $(".menu2-selector").addClass("hidee");
  $(".menu3-selector").next().addClass("hidee");
  $(".sticky").css("background-color", "transparent");
}

function hideBigPicture() {
  inBigPictureMode = false;

  if (currentSession != null) currentSession.end();

  $(".sub-section1").show();
  $(".dish-row").addClass("d-flex").show();
  $(".sub-section2").css("min-height", "100vh");
  $(".sub-section2").css("padding-top", "20px");

  $(".menu-line1").parent().show();
  $(".menu-line2").parent().show();
  $(".menu-line3").parent().show();
  $(".menu-line31").parent().show();

  $(".menu-line4").parent().hide();
  $(".menu-line5").parent().hide();
  $(".menu-line6").parent().hide();

  $(".food-big-image").fadeOut();
  $(".food-vertical").hide();

  $("body").addClass("body-image-gradient");
  $("body").removeClass("body-image1");
  $(".menu2-selector").removeClass("hidee");
  $(".menu3-selector").next().removeClass("hidee");
  $(".sticky").css("background-color", "#f7f7f7");


  setTimeout(function() {
    console.log("try scrolling");
    $(".menu-main").scrollTo($(".menu2-selector"), {
      duration: 1,
    });
  }, 1000);

  icon_play_ar.style.filter = null;
  icon_qube.style.filter = null;
}

function hideIntro() {
  setTimeout(function () {
    $(".image-intro").fadeIn(1000);
    $(".image-intro2").fadeIn(3000);

    $(".menu-bottom").addClass("d-flex").fadeIn(1000);
    $(".menu-main").fadeIn(1000);
  }, 500);

  $(".body-image-intro").addClass("hidee");
  $("#image-intro-button").parent().addClass("hidee");
}

function DeviceDetector() {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") != -1 ||
    !!document.documentMode == true
  ) {
    //IF IE > 10
    return "IE";
  } else {
    return "unknown";
  }
}

function init() {
  eruda.init();

  container = document.createElement("div");
  document.body.appendChild(container);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    40
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 3;
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.position.set(0, 3, -0.3); //xyz not true
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 3, 1); //related to xyz target
  directionalLight.target.position.set(0, -0.3, -0.3); //xyz not true
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.castShadow = true;
  scene.add(spotLight);

  controller = renderer.xr.getController(0);
  controller.addEventListener("select", onSelect);
  scene.add(controller);

  function createButton(buttonId,renderer, sessionInit = {}) {
    const button = document.getElementById(buttonId);
    function showStartAR(/*device*/) {
      if (sessionInit.domOverlay === undefined) {
        var overlay = document.createElement("div");
        //overlay.style.display = "none";
        document.body.appendChild(overlay);
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", 38);
        svg.setAttribute("height", 38);
        svg.style.position = "absolute";
        svg.style.right = "20px";
        svg.style.top = "20px";
        svg.addEventListener("click", function () {
          currentSession.end();
        });
        overlay.appendChild(svg);
        var path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28");
        path.setAttribute("stroke", "#fff");
        path.setAttribute("stroke-width", 2);
        svg.appendChild(path);
        if (sessionInit.optionalFeatures === undefined) {
          sessionInit.optionalFeatures = [];
        }
        sessionInit.optionalFeatures.push("dom-overlay");
        sessionInit.domOverlay = { root: overlay };
      }   

      async function onSessionStarted(session) {
        addModelToScene(menuNumber, itemNumber);
        session.addEventListener("end", onSessionEnded);
        renderer.xr.setReferenceSpaceType("local");
        await renderer.xr.setSession(session);
        sessionInit.domOverlay.root.style.display = "";
        currentSession = session;

        
        icon_play_ar.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(0deg)";
        icon_qube.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(0deg)";

        $(".food-big-image").hide();
      }
      function onSessionEnded(/*event*/) {
        $(".menu-main").css("display", "block");
        currentSession.removeEventListener("end", onSessionEnded);
        currentSession = null;
        icon_play_ar.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(130deg)";
        icon_qube.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(130deg)";
        if(inMainMenu==false){
          $(".food-big-image").show();
        }

      }
      //button.style.filter = "brightness(50%) sepia(100) saturate(100) hue-rotate(135deg)";
      //button.style.display = "none";


      var mc1 = new Hammer.Manager(document.getElementById(buttonId));
      mc1.add(new Hammer.Tap({ event: "singletap" }));
      mc1.on("singletap ", function (ev) {
        if (DeviceDetector() == "Chrome") {
          if (currentSession === null) {
            console.log(buttonId);
            if(buttonId="icon-qube"){

              showBigPicture();

              for (let i = 0; i <= 5; i++) {
                $(".foodvertical"+i).hide().removeClass("d-flex");

                if (menuNumber==i) {
                  $("#icon_ghaza"+i).hide();
                  $("#icon_ghaza"+i+"_black").show();
                  $(".foodvertical"+i).show().addClass("d-flex");
                  $(".foodvertical"+i).scrollTo($(".foodvertical"+i+" #d" + itemNumber), {
                    duration: 1,
                  });
                }
              }

            }
            //showBigPicture();            
            //$(".food-big-image").hide();
            //$("#"+buttonId).css("background-image","url('./asset/img/stop.png')");
            navigator.xr.requestSession("immersive-ar", sessionInit).then(onSessionStarted);
          } else {
            currentSession.end();
            //$("#"+buttonId).css("background-image","url('./asset/img/qube.png')");
            //$(".food-big-image").fadeIn();
          }
        }
      });
    }
    function disableButton() {
      //button.style.display = "";
      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }
    function showARNotSupported() {
      disableButton();
      //button.textContent = "AR NOT SUPPORTED";
    }
    function stylizeElement(element) {
      //element.style.textAlign = "center";
    }
    if ("xr" in navigator) {
      //button.style.display = "none";
      stylizeElement(button);
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then(function (supported) {
          supported ? showStartAR() : showARNotSupported();
        })
        .catch(showARNotSupported);

      return button;
    } else {
      const message = document.createElement("a");
      if (window.isSecureContext === false) {
        message.href = document.location.href.replace(/^http:/, "https:");
        message.innerHTML = "WEBXR NEEDS HTTPS"; // TODO Improve message
      } else {
        message.href = "https://immersiveweb.dev/";
        message.innerHTML = "WEBXR NOT AVAILABLE";
      }
      message.style.left = "calc(50% - 90px)";
      message.style.width = "180px";
      message.style.textDecoration = "none";
      stylizeElement(message);
      return message;
    }
  }

  if (DeviceDetector() == "Chrome") {
    $("#icon-play-ar").removeAttr("href");
    
    createButton("icon-play-ar",renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
      domOverlay: { root: document.body },
    });

    createButton("icon-qube",renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
      domOverlay: { root: document.body },
    });
  }

  const body = document.body;
  const hammertime = new Hammer(body);
  hammertime.get("pinch").set({ enable: true });
  hammertime.on("pinch", (ev) => {
    scaleMesh(ev.scale);
  });
  hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on("panleft panright", (ev) => {
    panMesh(ev.deltaY, ev.type);
  });

  renderer.domElement.style.display = "none";
  window.addEventListener("resize", onWindowResize, false);
}

async function addModelToScene(menuNumber, itemNumber) {
  console.log("addModelToScene");
  if (menuNumberLast == menuNumber && itemNumberLast == itemNumber) {
    console.log("duplicated menu");
    return;
  }

  var picture = getModelPicture(menuNumber, itemNumber);
  if (picture != null) $(".food-big-picture").attr("src", picture);
  var objectModel = getModelUrl(menuNumber, itemNumber);

  if (objectModel != null) {
    const gltf = await loader.loadAsync(objectModel);
    $(".food-big-picture-3d").attr("src", objectModel);
    if (modelAdded) {
      scene.remove(model);
      model = null;
    }

    model = gltf.scene;
    model.scale.multiplyScalar(modelscale);
    model.visible = false;
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);

    console.log("scene.add(" + objectModel + ")");
    console.log(
      "modelAdded= " + modelAdded + " and modelPlaced= " + modelPlaced
    );

    if (modelAdded && modelPlaced) {
      console.log("model.visible = true");
      model.visible = true;
      model.position.setFromMatrixPosition(reticle.matrix);
      model.quaternion.setFromRotationMatrix(reticle.matrix);
    }
    modelAdded = true;

    menuNumberLast = menuNumber;
    itemNumberLast = itemNumber;
  }
}

function getModelUrl(menuNumber, itemNumber) {
  if (menuNumber == 1 && itemNumber == 1) return "./asset/glb/1.glb";
  if (menuNumber == 1 && itemNumber == 2) return "./asset/glb/2.glb";
  if (menuNumber == 1 && itemNumber == 3) return "./asset/glb/3.glb";
  if (menuNumber == 1 && itemNumber == 4) return "./asset/glb/4.glb";

  if (menuNumber == 2 && itemNumber == 1) return "./asset/glb/1.glb";

  if (menuNumber == 3 && itemNumber == 1) return "./asset/glb/1.glb";

  if (menuNumber == 4 && itemNumber == 1) return "./asset/glb/1.glb";
  if (menuNumber == 4 && itemNumber == 2) return "./asset/glb/2.glb";

  if (menuNumber == 5 && itemNumber == 1) return "./asset/glb/1.glb";
  if (menuNumber == 5 && itemNumber == 2) return "./asset/glb/2.glb";
}

function getModelPicture(menuNumber, itemNumber) {
  if (menuNumber == 1 && itemNumber == 1)
    return "./asset/img/4_chocolate_cake.png";
  if (menuNumber == 1 && itemNumber == 2) return "./asset/img/4_corsan.png";
  if (menuNumber == 1 && itemNumber == 3)
    return "./asset/img/4_corsan_sugar.png";
  if (menuNumber == 1 && itemNumber == 4) return "./asset/img/4_moca.png";

  if (menuNumber == 2 && itemNumber == 1) return "./asset/img/burger1.png";

  if (menuNumber == 3 && itemNumber == 1) return "./asset/img/4_pish_ghaza.png";

  if (menuNumber == 4 && itemNumber == 1) return "./asset/img/4_pasta_1.png";
  if (menuNumber == 4 && itemNumber == 2) return "./asset/img/4_pasta_2.png";

  if (menuNumber == 5 && itemNumber == 1) return "./asset/img/4_salad_1.png";
  if (menuNumber == 5 && itemNumber == 2) return "./asset/img/4_salad_2.png";
  return null;
}

$(".dish-container-h-parent").scroll(function () {
  clearTimeout(timerWrapper);

  timerWrapper = setTimeout(function () {
    var pre = "";
    if (menuNumber == 1) {
      pre = ".foodvertical1";
      var d1 = $(pre + " #d1").position().left;
      var d2 = $(pre + " #d2").position().left;
      var d3 = $(pre + " #d3").position().left;
      var d4 = $(pre + " #d4").position().left;
    }
    if (menuNumber == 2) {
      pre = ".foodvertical2";
      var d1 = $(pre + " #d1").position().left;
    }
    if (menuNumber == 3) {
      pre = ".foodvertical3";
      var d1 = $(pre + " #d1").position().left;
    }
    if (menuNumber == 4) {
      pre = ".foodvertical4";
      var d1 = $(pre + " #d1").position().left;
      var d2 = $(pre + " #d2").position().left;
    }
    if (menuNumber == 5) {
      pre = ".foodvertical5";
      var d1 = $(pre + " #d1").position().left;
      var d2 = $(pre + " #d2").position().left;
    }

    var maxW = $(pre + " #d1").width();

    if (d1 > -15 && d1 < maxW) itemNumber = 1;
    else if (d2 > -15 && d2 < maxW) itemNumber = 2;
    else if (d3 > -15 && d3 < maxW) itemNumber = 3;
    else if (d4 > -15 && d4 < maxW) itemNumber = 4;

    console.log("menuNumber: " + menuNumber + " itemNumber: " + itemNumber);

    addModelToScene(menuNumber, itemNumber);
  }, 250);
});

function scaleMesh(amount) {
  amount = amount - 1;

  if (lastamount == 0) {
    lastamount = amount;
  }

  if (amount > 0.1 || amount < -0.1) {
    if (lastamount - amount > 0.1 || lastamount - amount < -0.1) {
      if (lastamount - amount > 0.1) {
        lastzoom = clipValue(lastzoom - 0.09, 0.8, 3);
      } else lastzoom = clipValue(lastzoom + 0.05, 0.8, 3);
      lastamount = amount;
      model.scale.set(lastzoom, lastzoom, lastzoom);
    }
  }
}

function clipValue(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

function panMesh(y, dir) {
  if (model == undefined) return;
  if (dir == "panright") model.rotation.y += 0.04;
  else model.rotation.y -= 0.04;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
  spotLight.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  );
}

function render(timestamp, frame) {
  if (frame) {
    if (!modelPlaced) {
      if (!hitTestSourceInitialized) {
        initializeHitTestSource();
      }
      if (hitTestSourceInitialized) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);
        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          const pose = hit.getPose(localSpace);
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        } else {
          reticle.visible = false;
        }
      }
    }
    renderer.render(scene, camera);
  }
}

function addReticleToScene() {
  const geometry = new THREE.RingBufferGeometry(0.02, 0.03, 32).rotateX(
    -Math.PI / 2
  );
  const material = new THREE.MeshBasicMaterial({
    color: 0x5ada16,
    side: THREE.DoubleSide,
  });
  reticle = new THREE.Mesh(geometry, material);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);
}

function onSelect() {
  if (reticle.visible && model) {
    if (!modelPlaced) {
      model.visible = true;
      model.position.setFromMatrixPosition(reticle.matrix);
      model.quaternion.setFromRotationMatrix(reticle.matrix);
      modelPlaced = true;
      reticle.visible = false;
      console.log("modelPlaced");
    }
  }
}

async function initializeHitTestSource() {
  const session = renderer.xr.getSession();
  const viewerSpace = await session.requestReferenceSpace("viewer");
  hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
  localSpace = await session.requestReferenceSpace("local");
  hitTestSourceInitialized = true;
  session.addEventListener("end", () => {
    hitTestSourceInitialized = false;
    hitTestSource = null;
    modelPlaced = false;
    reticle.visible = true;

    scene.remove(model);
    model = null;
    //instead model visible set to false

    menuNumberLast = -1;
    itemNumberLast = -1;

    console.log("session end");
  });
}
