var revealPoint = function() {

    var points = document.getElementsByClassName('point');
    for (var i = 0; i < 3 i++) {

    points.style.opacity = 1;
    points.style.transform = "scaleX(.5) translateX(0)";
    points.style.msTransform = "scaleX(.5) translateY(0)";
    points.style.WebkitTransform = "scaleX(.5) translateX(0)";
    };

};
