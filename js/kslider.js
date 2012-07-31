(function($){

	 $.fn.kslider = function(options) {

		var kslider = $(this);
		
		//Ajout de la class kbig à la 1ère div du conteneur kslider
		var kbig = $('div:eq(0)', kslider).addClass('kbig');
		
		//Récupération de la hauteur la plus haute entre les images
		var kbigheightMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).height(); }).get());
		
		//Récupération de la largeur entre les images
		var kbigwidthMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).width(); }).get());
		
		var ksmallheightMax = 0, ksmallwidthMax = 0, generateThumbs = 0;
		if($('div:eq(1)', kslider).length == 0)
		{
			kbig.clone().appendTo(kslider);
			$('div:eq(1)', kslider).removeClass().addClass('ksmall');
			ksmallheightMax = kbigheightMax / 4;
			ksmallwidthMax = kbigwidthMax / 4;
			generateThumbs = 1;
		}
		else
		{	
			//Ajout de la class ksmall à la 2ème div du conteneur kslider
			$('div:eq(1)', kslider).removeClass().addClass('ksmall');
			ksmallheightMax = Math.max.apply(Math, $('div:eq(1) img', kslider).map(function(){return $(this).outerHeight(true);}).get());
			ksmallwidthMax = Math.max.apply(Math, $('div:eq(1) img', kslider).map(function(){return $(this).outerWidth(true);}).get());
		}
		$('.ksmall', kslider).wrap("<div style='overflow:hidden;'></div>");

			
		//Paramètres par défaut
		var defaults = {
			width: kbigwidthMax,
			height: kbigheightMax,
			widthThumb: ksmallwidthMax,
			heightThumb: ksmallheightMax,
			nbImage: $('.kbig img', kslider).length,
			speed: 500,
			sameArea: false,
			opacity:0.4,
			nav:true
		};
		
		//Application des paramètres de l'utilisateur
		var options = $.extend(defaults, options);
		

		var ksmall = $('.ksmall', kslider);
		var bordureksmallimg = ($('.ksmall img', kslider).outerWidth(true)-$('.ksmall img', kslider).width());

		//Cacher toutes les grandes images sauf la 1ère
		$('.kbig img', kslider).not(':first-child').hide();
		
		//Définition de la taille du slider complet : grand conteneur + petit conteneur
		kslider.css({'width': options.width,'height' : options.height+options.heightThumb});
		
		//Définition de la taille du grand conteneur
		kbig.css({'height': options.height,'width':options.width});
			
		//Opérations sur les grandes images
		$('.kbig img', kslider).css({'width':'auto', 'height':'auto', 'max-width': options.width, 'max-height':options.height});
		$('.kbig img', kslider).map(function(){
			var differenceHauteur = options.height - $(this).outerHeight();
			var differenceLargeur = options.width - $(this).outerWidth();
			if(differenceHauteur == 0);
				$(this).css({'margin-top': differenceHauteur/2, 
								 'margin-bottom': differenceHauteur/2,
								 'margin-right': differenceLargeur/2,
								 'margin-left': differenceLargeur/2, });
		});
		
		//Opérations sur les miniatures
		var ksmallwidth = 0, indexWidth = [];
		$('.ksmall img', kslider)
		.css({'width':'auto', 
			   'height':'auto', 
				'max-width': options.widthThumb-bordureksmallimg, 
				'max-height': options.heightThumb-bordureksmallimg})
		.map(function(i){

				if(options.sameArea)
					ksmallwidth += options.widthThumb
				else
					ksmallwidth += $(this).outerWidth(true);
				

				indexWidth[i] = ksmallwidth;
				
				var differenceHauteur = options.heightThumb - $(this).outerHeight(true);
				var differenceLargeur = options.widthThumb - $(this).outerWidth(true);
				if(differenceHauteur > 0)
					$(this).css({'padding-top': differenceHauteur/2, 
									 'padding-bottom': differenceHauteur/2});
				
				if(differenceLargeur > 0 && options.sameArea)
					$(this).css({'padding-right': differenceLargeur/2,
									 'padding-left': differenceLargeur/2, });
		});

		//Définition de la taille du petit conteneur
		if(ksmallwidth < options.width)
			ksmall.css({'width': options.width, 'height':options.heightThumb, 'padding-left': (options.width - ksmallwidth) / 2+bordureksmallimg*2});
		else
			ksmall.css({'width': ksmallwidth+2, 'height':options.heightThumb});

		//Ajout des flèches de navigation
		if(options.nav)
		kslider.append('<div class="kleft" style="left:-50px;margin-top:-'+options.heightThumb+'px;border-width: '+(options.heightThumb/2)+'px 21px"></div><div class="kright" style="margin-top:-'+options.heightThumb+'px;border-width: '+(options.heightThumb/2)+'px 21px;right:-50px;"></div>');
		
		ksmallimg = $('.ksmall img', kslider);
		kbigimg = $('.kbig img', kslider);
		
		//Move mouse hover thumnails - Bouger la souris au dessus des miniatures
		var marginLeft = 0, posX = 0; var xp = 0;
		ksmall.mousemove(function(e){ 
			posX = e.pageX - kslider.offset().left; 
			if(posX < 30){
				posX = 0;
				
				}
			else if(posX > options.width-30)
				posX = options.width;
			marginLeft = -posX / ((options.width)/(ksmallwidth-options.width));
		});
		
		if(posX < options.width && ksmallwidth > options.width)
		{
			setInterval(function(){
				xp += ((marginLeft - xp) / 8);
				ksmall.css({'margin-left': xp});
			}, 10);
		}

		
		// Hover on the thumbnails - Survol des miniatures
		ksmallimg.hover(function(){
			$(this).fadeTo(options.speed,1);
		},
		function(){
			if(!$('.kbig img', kslider).eq($(this).index()).is(':visible'))
				$(this).stop(true,true).fadeTo(options.speed/2, options.opacity);
		}); 
		
		// click on the big image - click sur la grande image
		$('.kbig img, .kright', kslider).on('click', function() {
			sliding($('.kbig img:visible', kslider).index(), 1);
		});
		
		$('.kleft', kslider).on('click', function() {
			sliding($('.kbig img:visible', kslider).index(), 0);
		});

		function sliding (index, way)
		{
			var image = $('.kbig img', kslider).eq(index);
			image.fadeOut(options.speed);
			if(way == 1)
			{
				if(image.next().length == 0)
				{
					$('.ksmall img', kslider).eq(index).fadeTo(options.speed/2,options.opacity);
					$('.ksmall img', kslider).first().fadeTo(options.speed,1);
					$('.kbig img', kslider).first().fadeIn(options.speed);
					
					if(ksmallwidth > options.width)
						marginLeft = 0;
				
				}
				else
				{
					image.next().fadeIn(options.speed);
					$('.ksmall img', kslider).eq(index).fadeTo(options.speed/2,options.opacity);
					$('.ksmall img', kslider).eq(index+1).fadeTo(options.speed,1);
					var deplacement = -(indexWidth[index] + ($('.ksmall img', kslider).eq(index+1).outerWidth(true)-options.width)/2);
					
						if (deplacement < -(ksmallwidth-options.width))
							marginLeft = -(ksmallwidth-options.width);
						else if(deplacement < 0)
							marginLeft = deplacement;
						else if(deplacement > 0)
							marginLeft = 0 ;
				}
			}
			else
			{
				if(image.prev().length == 0)
				{
					$('.ksmall img', kslider).eq(index).fadeTo(options.speed/2,options.opacity);
					$('.ksmall img', kslider).last().fadeTo(options.speed,1);
					$('.kbig img', kslider).last().fadeIn(options.speed);
					
					if(ksmallwidth > options.width)
						marginLeft = options.width-ksmallwidth;
				
				}
				else
				{
					image.prev().fadeIn(options.speed);
					$('.ksmall img', kslider).eq(index).fadeTo(options.speed/2,options.opacity);
					$('.ksmall img', kslider).eq(index-1).fadeTo(options.speed,1);
					var deplacement = -(indexWidth[index-2] + ($('.ksmall img', kslider).eq(index-1).outerWidth(true)-options.width)/2);
					
						if (deplacement < -(ksmallwidth-options.width))
							marginLeft = -(ksmallwidth-options.width);
						else if(deplacement < 0)
							marginLeft = deplacement;
						else if(deplacement > 0)
							marginLeft = 0 ;
				}
			}
		}
		
		// click on the thumbnails - click sur les miniatures
		ksmallimg.on('click', function() {

			var index = $(this).index();
			if(!$('.kbig img', kslider).eq(index).is(':visible'))
			{
				$('.kbig img', kslider).fadeOut(options.speed);
				$('.ksmall img', kslider).not(this).fadeTo(options.speed, options.opacity);
			}
			$('.kbig img', kslider).eq(index).fadeIn(options.speed);
			
		});
	 };
})(jQuery);