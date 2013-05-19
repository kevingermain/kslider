# Kslider : simple slider for jQuery

Kslider is a very simple slider for images which only require a small HTML and jQuery code (4kb) to work

## How it works

### Your HTML with thumbnails (example 1)
	 <div id="kslider">
		<div>
			<img src="img/1.jpg" alt="">
			<img src="img/2.jpg" alt="">
			<img src="img/3.jpg" alt="">
			<img src="img/4.jpg" alt="">
			<img src="img/5.jpg" alt="">
			<img src="img/6.jpg" alt="">
			<img src="img/7.jpg" alt="">
			<img src="img/8.jpg" alt="">
			<img src="img/9.jpg" alt="">
			<img src="img/10.jpg"alt="">
		</div>
		<div>
			<img src="img/thumbs/1.jpg" alt="">
			<img src="img/thumbs/2.jpg" alt="">
			<img src="img/thumbs/3.jpg" alt="">
			<img src="img/thumbs/4.jpg" alt="">
			<img src="img/thumbs/5.jpg" alt="">
			<img src="img/thumbs/6.jpg" alt="">
			<img src="img/thumbs/7.jpg" alt="">
			<img src="img/thumbs/8.jpg" alt="">
			<img src="img/thumbs/9.jpg" alt="">
			<img src="img/thumbs/10.jpg" alt="">
		</div>
	</div>

### Your HTML without thumnbails (example 2)
	 <div id="kslider">
		<div>
			<img src="img/1.jpg" alt="">
			<img src="img/2.jpg" alt="">
			<img src="img/3.jpg" alt="">
			<img src="img/4.jpg" alt="">
			<img src="img/5.jpg" alt="">
			<img src="img/6.jpg" alt="">
			<img src="img/7.jpg" alt="">
			<img src="img/8.jpg" alt="">
			<img src="img/9.jpg" alt="">
			<img src="img/10.jpg"alt="">
		</div>
	</div>

### Examples of Javascript code
	<script>
		$(document).ready(function(){ 
			$('#kslider').kslider();
			$('#kslider2').kslider({width:325,       // Width of the slider
									height:200,      // Height of the slider
									widthThumb:60,   // Width max of the thumbnail
									heightThumb:37,  // Width max of the thumbnail
									speed: 500,      // Speed of the transition
									sameSize: false, // Same size for all thumbnails
									opacity:0.4,     // Opacity of the thumnails
									nav:false});     // Show the arrows of navigation
									
			$('#kslider3').kslider();
		});
	</script>
	
### You can design it with a small CSS
	#kslider {
		box-shadow: 0px 0px 20px 6px #AAA;
		margin:40px;
		float:left;
	}
	
	#kslider .ksmall {
		background-color:#111;	
	}
	
	#kslider .ksmall img {
		background-color:#999;
		border:2px solid #EEE;
		margin:4px;
	}

	#kslider2 {
		box-shadow: 0px 0px 20px 6px #AAA;
		position:relative;
		margin:40px;	
		float:left;
	}
	
	#kslider2 .kbig img {
		position:absolute;
		cursor:pointer;
	}
	
	#kslider2 .ksmall {
		position:relative;
		background-color:#111;	
		cursor:pointer;
	}
	
	#kslider2 .ksmall img {
		background-color:#999;
		border:2px solid #EEE;
		margin:4px;
	}
