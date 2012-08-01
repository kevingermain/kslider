Kslider : simple slider for jQuery
=============

Kslider is a very simple slider for images with a little code HTML and jQuery to work

How to work
-----------

### Your HTML with thumnails (exemple 1)

	 <div id="kslider">
		<div>
			<img src="img/1.jpg" alt="kslider">
			<img src="img/2.jpg" alt="kslider">
			<img src="img/3.jpg" alt="kslider">
			<img src="img/4.jpg" alt="kslider">
			<img src="img/5.jpg" alt="kslider">
			<img src="img/6.jpg" alt="kslider">
			<img src="img/7.jpg" alt="kslider">
			<img src="img/8.jpg" alt="kslider">
			<img src="img/9.jpg" alt="kslider">
			<img src="img/10.jpg"alt="kslider">
		</div>
		<div>
			<img src="img/thumbs/1.jpg" alt="kslider">
			<img src="img/thumbs/2.jpg" alt="kslider">
			<img src="img/thumbs/3.jpg" alt="kslider">
			<img src="img/thumbs/4.jpg" alt="kslider">
			<img src="img/thumbs/5.jpg" alt="kslider">
			<img src="img/thumbs/6.jpg" alt="kslider">
			<img src="img/thumbs/7.jpg" alt="kslider">
			<img src="img/thumbs/8.jpg" alt="kslider">
			<img src="img/thumbs/9.jpg" alt="kslider">
			<img src="img/thumbs/10.jpg" alt="kslider">
		</div>
	</div>

### Your HTML without thumnails (exemple 2)
	 <div id="kslider">
		<div>
			<img src="img/1.jpg" alt="kslider">
			<img src="img/2.jpg" alt="kslider">
			<img src="img/3.jpg" alt="kslider">
			<img src="img/4.jpg" alt="kslider">
			<img src="img/5.jpg" alt="kslider">
			<img src="img/6.jpg" alt="kslider">
			<img src="img/7.jpg" alt="kslider">
			<img src="img/8.jpg" alt="kslider">
			<img src="img/9.jpg" alt="kslider">
			<img src="img/10.jpg"alt="kslider">
		</div>
	</div>

### Your Javascript code

	<script>
		$(window).load(function(){ 
		$('#kslider').kslider(); // For exemple 1
		$('#kslider2').kslider({width:325,
										height:200,
										widthThumb:60,
										heightThumb:37,
										nav:false}); // For exemple 2
		});
	</script>
### CSS 
	#kslider {
		box-shadow: 0px 0px 20px 6px #AAA;
		position:relative;
		margin:40px;
		float:left;
	}
	#kslider .kbig img {
		position:absolute;
		cursor:pointer;
	}
	#kslider .ksmall {
		position:relative;
		background-color:#111;	
		cursor:pointer;
	}
	#kslider .ksmall img {
		float:left;
		background-color:#999;
		border:2px solid #EEE;
		margin:4px;
	}
	#kslider .kleft, #kslider .kright {
		border-color: transparent #111 transparent transparent;
		cursor:pointer;
		border-style: solid;
		position:relative;
		opacity:0.4;
		float:left;
	}
	#kslider .kright  {
		border-color: transparent transparent transparent #111;
		float:right;
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
		float:left;
		background-color:#999;
		border:2px solid #EEE;
		margin:4px;
	}
	#kslider2 .kleft, #kslider2 .kright {
		border-color: transparent #111 transparent transparent;
		cursor:pointer;
		border-style: solid;
		position:relative;
		opacity:0.4;
		float:left;
	}
	#kslider2 .kright  {
		border-color: transparent transparent transparent #111;
		float:right;
	}
