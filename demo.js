// demo.js
// Copyright (C) 2011  Petteri Hietavirta
//
// This file is part of Electric Canvas.
//
// Electric Canvas is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// petteri.hietavirta@gmail.com
//

function Demo(ctx1, height, width, soundManager1) {
    var FPS = 20;
    var SECONDS_BETWEEN_FRAMES = 1 / FPS;

	var SCALE = 100;
	var base_y = height/2;

    var canvas_height = height;
    var canvas_width = width;
    var ctx = ctx1;
	var soundManager = soundManager1;
	var tune;
	
	var points = [];
	points[0] = [];
	points[1] = [];
	points[2] = [];
	points[3] = [];
	points[4] = [];
	points[5] = [];
    
    function demoStep() {
    	if(tune.playState != 1) {
	    	generateRandomPoints();
    	}
  		ctx.clearRect(0, 0, canvas_width, canvas_height);
 		ctx.globalCompositeOperation = "lighter";
		drawWaveform();
    }
    
    function drawWaveform() {
    	ctx.lineWidth = 0.5;
    	ctx.strokeStyle = "#3300FF";
 	    ctx.beginPath();
    	ctx.moveTo(0, base_y);
    	ctx.lineTo(600, base_y);
    	ctx.stroke();

		// 5rd
		ctx.strokeStyle = "rgb(1,1,35)";
		drawLine(points[5], 22);
		// 4rd
		ctx.strokeStyle = "rgba(1,1,255,0.2)";
        drawLine(points[4], 20);
        // 3rd
        ctx.strokeStyle = "rgba(1,1,255,0.2)";
        drawLine(points[3], 10);
        drawLine(points[3], 3);

        // 2nd
        ctx.strokeStyle = "rgba(1,1,255,0.1)";
        drawLine(points[2], 10);
        ctx.strokeStyle = "rgba(1,1,255,0.1)";
        drawLine(points[2], 5);

        // 1nd
        ctx.strokeStyle = "rgba(1,1,255,0.5)";
        drawLine(points[1], 3);
        ctx.strokeStyle = "rgba(160,160,255,0.9)";
        drawLine(points[1], 0.5);

        // current
        ctx.strokeStyle = "rgba(1,1,255,0.3)";
        drawLine(points[0], 10);
        ctx.strokeStyle = "rgba(100,100,255,0.4)";
        drawLine(points[0], 5);
        ctx.strokeStyle = "rgb(255,255,255)";
 		drawLine(points[0], 1);
 		
 		points[5] = points[4];
 		points[4] = points[3];
 		points[3] = points[2];
 		points[2] = points[1];
 		points[1] = points[0];
    }

	function drawLine(points, thickness){
		if (points.length != 0) {
			ctx.lineWidth = thickness;
			ctx.beginPath();
	        ctx.moveTo(0, base_y);
	        for (p in points) {
		        ctx.lineTo(p*(600/255), points[p]);
			}
	        ctx.lineTo(600, base_y);
	        ctx.stroke();
		}
	}

	function generatePoint(maxDelta, previousPoint) {
		var topLimit = base_y+maxDelta;
		var bottomLimit = base_y-maxDelta;
		var p;
	
		if (previousPoint+maxDelta/2 > topLimit) {
			p =  Math.random()*-1*(maxDelta/3);
		} else if (previousPoint-maxDelta/2 < bottomLimit) {
			p =  Math.random()*(maxDelta/3);
		} else {
			p =  Math.random()*(maxDelta/3) - maxDelta/6;
		}
		var point = previousPoint + p;
		return point; 
	}
	
	function generateRandomPoints() {
		points[0] = [];
		
       	var previousPoint = base_y;
         for (var a = 0; a< 255 ; a++) {
        	var maxDelta = Math.sin(Math.PI*(a/255));
        	var currentPoint = generatePoint(maxDelta*SCALE,previousPoint);
        	points[0].push(currentPoint);
        	previousPoint = currentPoint;
         }
	}
	
	function readWaveform() {
		points[0] = [];
		for (var i=0; i<256; i++) {
	 		points[0].push(base_y+tune.waveformData.left[i]*SCALE);
	 	}
	}
	

    this.startDemo = function() {
	    tune = soundManager.createSound({
			 id:'mySound',
			 url:'http://stream28.jamendo.com/stream/213930/mp31/02%20-%20Blackleg%20-%20Dopamine.mp3?u=0&h=9b59bc0258',
			 useWaveformData:true,
			 whileplaying: readWaveform
			});
	
        setInterval(demoStep, SECONDS_BETWEEN_FRAMES*1000);
    }
}