// startup.js
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


// Get the Canvas element, start demo when soundmanager is ready.
function init() {
    canvas = document.getElementById('demoCanvas');
    ctx = canvas.getContext('2d');
		    var demo = new Demo(ctx, canvas.height, canvas.width, soundManager);
			soundManager.onready(function() {
			    demo.startDemo();
			});
}

function toggleMusic() {
	var mySMSound = soundManager.getSoundById('mySound');
	if (mySMSound.playState != 1) {
		mySMSound.play();
   	} else {
	   	mySMSound.stop();
   	}
}

window.onload = init;