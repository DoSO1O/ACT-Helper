/*/
 *###########################################################################
 *#ACT Helper v1.0 [Last Updated: 2017/02/06]
 *#Copyright (C) Genbu Project & Genbu Hase 2017 - 2020 All Rights Reversed.
 *###########################################################################
/*/
window.ACTHelper = function (RootElement, ResFile, OnLoad) {
	ACTHelper.self = this;
	
	this.Root = RootElement;
	
	this.BGMPlayer = (function () {
		let Player = new Audio();
			Player.loop = true;
			
			Player.addEventListener("loadeddata", function (Event) {
				Event.target.play();
			});
			
		return Player;
	})();
	
	this.SEPlayer = (function () {
		let Player = new Audio();
			Player.loop = false;
			
			Player.addEventListener("loadeddata", function (Event) {
				Event.target.play();
			});
			
		return Player;
	})();
	
	this.Res = {
		
	}
	
	this.Sound = {
		PlayBGM: function (Url, Volume) {
			ACTHelper.self.Sound.StopBGM();
			ACTHelper.self.BGMPlayer.src = Url;

			Volume ? ACTHelper.self.BGMPlayer.volume = Volume : null;
		},
		
		StopBGM: function () {
			if (!ACTHelper.self.BGMPlayer.paused) {
				ACTHelper.self.BGMPlayer.pause();
			}
		},
		
		PlaySE: function (Url, DoesControlVolume) {
			ACTHelper.self.SEPlayer = (function () {
				let Player = new Audio();
					Player.loop = false;
					
					Player.addEventListener("loadeddata", function (Event) {
						Event.target.play();
					});
					
				DoesControlVolume ? (function () {
					Player.addEventListener("play", function (Event) {
						ACTHelper.self.BGMPlayer.volume = 0.5;
					});
					
					Player.addEventListener("timeupdate", function (Event) {
						ACTHelper.self.BGMPlayer.volume = 0.5;
					});
					
					Player.addEventListener("ended", function (Event) {
						ACTHelper.self.BGMPlayer.volume = 1;
					});
				})() : (function () {
					
				})();
				
				return Player;
			})();
			
			ACTHelper.self.SEPlayer.src = Url;
		},
		
		StopSE: function () {
			if (!ACTHelper.self.SEPlayer.paused) {
				ACTHelper.self.SEPlayer.pause();
			}
		}
	}
	
	this.Layout = {
		AbsoluteLayout: function (Args) {
			let Layout = DOM("AbsoluteLayout", Args.Params ? Args.Params : {});
				Layout.style.left = Args.Position ? Args.Position[0][0] + "%" : "40%";
				Layout.style.top = Args.Position ? Args.Position[0][1] + "%" : "30%";
				Layout.style.width = Args.Position ? (Args.Position[1][0] - Args.Position[0][0]) + "%" : "20%";
				Layout.style.height = Args.Position ? (Args.Position[1][1] - Args.Position[0][1]) + "%" : "40%";
				
				Layout.style.borderColor = Args.Color ? Args.Color : "Transparent";
				
			Args.Children ? (function () {
				for (let i = 0; i < Args.Children.length; i++) {
					Layout.appendChild(Args.Children[i]);
				}
			})() : (function () {
				
			})();
			
			return Layout;
		},
		
		LinearLayout: function (Args) {
			let Layout = DOM("LinearLayout", Args.Params ? Args.Params : {});
				Layout.setAttribute("class", Args.Type ? Args.Type : "Vertical");
				
				Layout.style.left = Args.Position ? Args.Position[0][0] + "%" : "40%";
				Layout.style.top = Args.Position ? Args.Position[0][1] + "%" : "30%";
				Layout.style.width = Args.Position ? (Args.Position[1][0] - Args.Position[0][0]) + "%" : "20%";
				Layout.style.height = Args.Position ? (Args.Position[1][1] - Args.Position[0][1]) + "%" : "40%";
				
				Layout.style.borderColor = Args.Color ? Args.Color : "Transparent";
				
			Args.Children ? (function () {
				for (let i = 0; i < Args.Children.length; i++) {
					Layout.appendChild(Args.Children[i]);
				}
			})() : (function () {
				
			})();
			
			return Layout;
		},
		
		Widget: {
			TextView: function (Args) {
				let Widget = DOM("TextView", Args.Params ? Args.Params : {});
					Widget.textContent = Args.Value ? Args.Value : "";
					
					Widget.style.color = Args.Color ? Args.Color : "White";
					Widget.style.borderColor = Args.BoxColor ? Args.BoxColor : "Transparent";
					
				Args.Position ? (function () {
					Widget.style.left = Args.Position[0][0] + "%";
					Widget.style.top = Args.Position[0][1] + "%";
					Widget.style.width = (Args.Position[1][0] - Args.Position[0][0]) + "%";
					Widget.style.height = (Args.Position[1][1] - Args.Position[0][1]) + "%";
				})() : (function () {
					
				})();
				
				return Widget;
			},
			
			Button: function (Args) {
				let Widget = DOM("Button", Args.Params ? Args.Params : {});
					Widget.textContent = Args.Value ? Args.Value : "";
					
					Widget.style.color = Args.Color ? Args.Color : "White";
					Widget.style.borderColor = Args.BoxColor ? Args.BoxColor : "Transparent";
					
				Args.Position ? (function () {
					Widget.style.left = Args.Position[0][0] + "%";
					Widget.style.top = Args.Position[0][1] + "%";
					Widget.style.width = (Args.Position[1][0] - Args.Position[0][0]) + "%";
					Widget.style.height = (Args.Position[1][1] - Args.Position[0][1]) + "%";
				})() : (function () {
					
				})();
				
				return Widget;
			}
		}
	}
	
	this.Screen = {
		FullScreen: function () {
			ACTHelper.self.Root.requestFullscreen ? ACTHelper.self.Root.requestFullscreen() : ACTHelper.self.Root.webkitRequestFullScreen ? ACTHelper.self.Root.webkitRequestFullScreen() : ACTHelper.self.Root.mozRequestFullScreen ? ACTHelper.self.Root.mozRequestFullScreen() : ACTHelper.self.Root.msRequestFullscreen ? ACTHelper.self.Root.msRequestFullscreen() : null;
		},
		
		ToWhite: function (Duration, OnEnded) {
			let Opacity = 0.0,
				Back = DOM("Div", {
					Styles: {
						"Position": "Absolute",
						"Left": ACTHelper.self.Root.clientLeft + "px",
						"Top": ACTHelper.self.Root.clientTop + "px",
						
						"Width": ACTHelper.self.Root.clientWidth + "px",
						"Height": ACTHelper.self.Root.clientHeight + "px",
						
						"BackGround": "RGBA(255, 255, 255, " + Opacity + ")"
					}
				});
				
			ACTHelper.self.Root.appendChild(Back);
			
			let Timer = setInterval(function () {
				Opacity += 1.0 / 20 / Duration;
				Back.style.background = "RGBA(255, 255, 255, " + Opacity + ")";
				
				if (Opacity >= 1.0) {
					clearInterval(Timer);
					OnEnded ? OnEnded.call(Back) : null;
				}
			}, 1000 / 20);
		},
		
		ToBlack: function (Duration, OnEnded) {
			let Opacity = 0.0,
				Back = DOM("Div", {
					Styles: {
						"Position": "Absolute",
						"Left": ACTHelper.self.Root.clientLeft + "px",
						"Top": ACTHelper.self.Root.clientTop + "px",
						
						"Width": ACTHelper.self.Root.clientWidth + "px",
						"Height": ACTHelper.self.Root.clientHeight + "px",
						
						"BackGround": "RGBA(0, 0, 0, " + Opacity + ")"
					}
				});
				
			ACTHelper.self.Root.appendChild(Back);
			
			let Timer = setInterval(function () {
				Opacity += 1.0 / 20 / Duration;
				Back.style.background = "RGBA(0, 0, 0, " + Opacity + ")";
				
				if (Opacity >= 1.0) {
					clearInterval(Timer);
					OnEnded ? OnEnded.call(Back) : null;
				}
			}, 1000 / 20);
		}
	}
	
	this.Animation = {
		PosY: 0,
		
		Draw: function (Motion, FPS) {
			let Wrapper = DOM("Div", {
					Styles: {
						"Position": "Absolute",
						"Left": 0,
						"Top": 0,
						
						"Display": "Block",
						"Width": "100%",
						"Height": "100%"
					}
				}),
				
				Cvs = DOM("Canvas", {
					Styles: {
						"Position": "Absolute",
						"Left": 0
					}
				}), Ctx = Cvs.getContext("2d"),
				
				Buf = [],
				Count = 0;
				
			for (let i = 0; i < Motion.length; i++) {
				Buf[i] = new Image();
				Buf[i].src = Motion[i];
				
				Buf[i].onload = function (Event) {
					console.log(Buf[i].src + " has been loaded.");
				}
			}
			
			Wrapper.appendChild(Cvs);
			ACTHelper.self.Root.appendChild(Wrapper);
			
			Ctx.imageSmoothEnabled = false;
			Ctx.imageSmoothingEnabled = false;
			
			let Timer = setInterval(function () {
				Count < Motion.length ? (function () {
					Ctx.clearRect(0, 0, Cvs.clientWidth, Cvs.clientHeight);
					
					Cvs.width = Buf[Count].naturalWidth;
					Cvs.style.width = ACTHelper.self.Root.clientWidth / 10 + "px";
					
					Cvs.height = Buf[Count].naturalHeight;
					Cvs.style.height = Buf[Count].naturalHeight * ((ACTHelper.self.Root.clientWidth / 10) / Buf[Count].naturalWidth) + "px";
					
					Cvs.style.top = ACTHelper.self.Root.clientHeight * ACTHelper.self.Animation.PosY - (Cvs.height / 2) + "px";
					
					Ctx.drawImage(Buf[Count], 0, 0);
				})() : (function () {
					Wrapper.dismiss();
					
					clearInterval(Timer);
				})();
				
				Count++;
			}, 1000 / FPS);
		}
	}
	
	this.Map = {
		DrawWithWREditor: function (TileUrl, MapUrl) {
			if (DOM("#Map")) {
				DOM("#Map").dismiss();
			}
			
			let MapTile = new Image(),
				MapData = [];
				
			DOM.XHR({
				Type: "GET",
				URL: MapUrl,
				DoesSync: false,
				
				OnLoad: function (Event) {
					MapData = JSON.parse(Event.target.response);
				}
			});
			
			MapTile.src = TileUrl;
			
			MapTile.onload = function () {
				let Wrapper = DOM("Div", {
					Attributes: {
						ID: "Map",
						Width: (MapData[0][0].length * 16) * (ACTHelper.self.Root.clientHeight / (16 * MapData[0].length)),
						Height: ACTHelper.self.Root.clientHeight
					},

					Styles: {
						"Position": "Absolute"
					}
				});

				for (let i = 0; i < 3; i++) {
					let Cvs = DOM("Canvas", {
						Attributes: {
							ID: "MapLayer" + (i + 1),
							Width: (MapData[0][0].length * 16) * (ACTHelper.self.Root.clientHeight / (16 * MapData[0].length)),
							Height: ACTHelper.self.Root.clientHeight
						},
						
						Styles: {
							"Position": "Absolute"
						}
					}), Ctx = Cvs.getContext("2d");
					
					Wrapper.appendChild(Cvs);
					
					Ctx.imageSmoothEnabled = false;
					Ctx.imageSmoothingEnabled = false;
					
					Ctx.scale(ACTHelper.self.Root.clientHeight / (16 * MapData[0].length), ACTHelper.self.Root.clientHeight / (16 * MapData[0].length));
					
					for (let y = 0; y < MapData[i].length; y++) {
	 					for (let x = 0; x < MapData[i][y].length; x++) {
	 						if (MapData[i][y][x] != -1 && typeof MapData[i][y][x] == "number") {
	 							Ctx.drawImage(MapTile, 16 * (MapData[i][y][x] % 8), 16 * (Math.floor(MapData[i][y][x] / 8)), 16, 16, 16 * x, 16 * y - 0.001, 16, 16);
	 						}
	 					}
	 				}
				}

				ACTHelper.self.Root.appendChild(Wrapper);
			}
		}
	}
	
	this.Util = {
		DegToRad: function (Deg) {
			return Deg * Math.PI / 180;
		}
	}
	
	ResFile ? (function () {
		DOM.XHR({
			Type: "GET",
			URL: ResFile,
			DoesSync: true,
			
			OnLoad: function (Event) {
				ACTHelper.self.Res = JSON.parse(Event.target.response);
				OnLoad(Event);
			}
		});
	})() : (function () {
		
	})();
}