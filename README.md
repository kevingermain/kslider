Kslider : simple slider for jQuery
=============

Kslider is a very simple slider for images with a little code HTML and jQuery (4kb) to work

How it works
-----------

### Your HTML with thumbnails (exemple 1)
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

### Your HTML without thumnails (exemple 2)
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
		$(window).load(function(){ 
		$('#kslider').kslider(); // without any options
		$('#kslider2').kslider({width:325,
									height:200,
									widthThumb:60,
									heightThumb:37,
									speed: 500,
									sameSize: false,
									opacity:0.4,
									nav:false}); 
		}); // with all options
	</script>
	
### You can use little CSS to design 
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
