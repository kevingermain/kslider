(function($){

	$.fn.kslider = function(options) {

		var kslider = $(this);
		$('div', kslider).hide();
		kslider.append('<img class="kloading" src="img/loading.gif">');
		kslider.css({'width':'30px','height':'30px'})

		// Retourne une valeur MAX pour la taille (largeur ou hauteur) d'un selecteur
		function max(selecteur, width) {
			return Math.max.apply(Math, selecteur.map(function(){ 
				if(width)
					return selecteur.outerWidth(true); 
				else
					return selecteur.outerHeight(true); 
			}).get());
		}

		function getOptions(){
			return options;
		}
		
		
		$(window).load(function() {  	
			$('.kloading').remove();
			$('div', kslider).show(); 
			
			//Ajout de la class kbig à la 1ère div du conteneur kslider
			var kbig = $('div:eq(0)', kslider).addClass('kbig');
			var kbigimg = $('.kbig img', kslider);
			
			//Récupération de la hauteur la plus haute entre les images
			var kbigheightMax = max(kbigimg, false);
			
			//Récupération de la largeur entre les images
			var kbigwidthMax = max(kbigimg, true);
			
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
				ksmallheightMax = max($('div:eq(1) img', kslider), false);
				ksmallwidthMax = max($('div:eq(1) img', kslider), true);
			}
			var ksmall = $('.ksmall', kslider);
			ksmall.wrap("<div style='overflow:hidden;'></div>").css('cursor','pointer');
			var ksmallimg = $('.ksmall img', kslider);
			
			var defaults = {
				width: kbigwidthMax,
				height: kbigheightMax,
				widthThumb: ksmallwidthMax,
				heightThumb: ksmallheightMax,
				speed: 500,
				sameSize: false,
				opacity:0.4,
				nav:true
			};
				
			if(getOptions())
				options = $.extend(defaults, getOptions());
			else
				options = $.extend(defaults, options);

			var bordureksmallimg = (ksmallimg.outerWidth(true)-ksmallimg.width());

			//Cacher toutes les grandes images sauf la 1ère
			kbigimg.not(':first-child').hide();
			
			//Fix IE7
			$('.kbig img:first-child', kslider).css('display', 'block');
			
			//Asignation de la largeur et de la hauteur du slider complet : grand conteneur + petit conteneur
			kslider.css({'width': options.width,'height' : options.height+options.heightThumb});
			
			//Définition de la taille du grand conteneur
			kbig.css({'height': options.height,'width':options.width});
				
			//Opérations sur les grandes images
			kbigimg.css({'width':'auto', 
												  'height':'auto', 
												  'max-width': options.width, 
												  'max-height':options.height, 
												  'position':'absolute',
												  'cursor':'pointer'});
												  
			kbigimg.map(function(){
				$(this).css({'margin-top': (options.height - $(this).outerHeight())/2, 
								 'margin-bottom': (options.height - $(this).outerHeight())/2,
								 'margin-right': (options.width - $(this).outerWidth())/2,
								 'margin-left': (options.width - $(this).outerWidth())/2});
			});
			
			//Opérations sur les miniatures
			var ksmallwidth = 0, indexWidth = [];
			ksmallimg
			.css({'width':'auto', 
					'height':'auto', 
					'max-width': options.widthThumb-bordureksmallimg, 
					'max-height': options.heightThumb-bordureksmallimg,
					'opacity': options.opacity,
					'float':'left'})
			.map(function(i){

					if(options.sameSize)
						ksmallwidth += options.widthThumb;
					else
						ksmallwidth += $(this).outerWidth(true);
					

					indexWidth[i] = ksmallwidth;
					
					var differenceHauteur = options.heightThumb - $(this).outerHeight(true);
					var differenceLargeur = options.widthThumb - $(this).outerWidth(true);
					if(differenceHauteur > 0)
						$(this).css({'padding-top': differenceHauteur/2, 
										 'padding-bottom': differenceHauteur/2});
					
					if(differenceLargeur > 0 && options.sameSize)
						$(this).css({'padding-right': differenceLargeur/2,
										 'padding-left': differenceLargeur/2});
			});
			$('.ksmall img:first-child', kslider).css('opacity','1');

			//Définition de la taille du petit conteneur
			if(ksmallwidth < options.width)
				ksmall.css({'width': options.width, 'height':options.heightThumb, 'padding-left': (options.width - ksmallwidth) / 2+bordureksmallimg*2});
			else
				ksmall.css({'width': ksmallwidth+2, 'height':options.heightThumb});

			//Ajout des flèches de navigation
			if(options.nav)
			{
				kslider.append('<div class="kleft"></div><div class="kright"></div>');
				$('.kleft, .kright', kslider)
					.css({'border-color': 'transparent #777 transparent transparent', 
							'cursor':'pointer',
							'display':'inline-block',
							'border-style': 'solid',
							'position':'relative',
							'float':'left',
							'left':'-42px',
							'margin-top':-options.heightThumb,
							'border-width': options.heightThumb/2 + 'px 21px'});
							
				$('.kright', kslider)
					.css({'border-color': 'transparent transparent transparent #777', 
							'float':'right',
							'left':'auto',
							'right':'-42px'});
			}
			
			//Move mouse hover thumnails - Bouger la souris au dessus des miniatures
			var marginLeft = 0, posX = 0; var xp = 0;
			ksmall.mousemove(function(e){ 
				posX = e.pageX - kslider.offset().left; 
				if(posX < 30)
					posX = 0;
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
				if(!kbigimg.eq($(this).index()).is(':visible'))
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
				var image = kbigimg.eq(index);
				image.fadeOut(options.speed);
				if(way == 1)
				{
					if(image.next().length == 0)
					{
						ksmallimg.eq(index).fadeTo(options.speed/2,options.opacity);
						ksmallimg.first().fadeTo(options.speed,1);
						kbigimg.first().fadeIn(options.speed);
						
						if(ksmallwidth > options.width)
							marginLeft = 0;
					
					}
					else
					{
						image.next().fadeIn(options.speed);
						ksmallimg.eq(index).fadeTo(options.speed/2,options.opacity);
						ksmallimg.eq(index+1).fadeTo(options.speed,1);
						var deplacement = -(indexWidth[index] + (ksmallimg.eq(index+1).outerWidth(true)-options.width)/2);
						
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
						ksmallimg.eq(index).fadeTo(options.speed/2,options.opacity);
						ksmallimg.last().fadeTo(options.speed,1);
						kbigimg.last().fadeIn(options.speed);
						
						if(ksmallwidth > options.width)
							marginLeft = options.width-ksmallwidth;
					
					}
					else
					{
						image.prev().fadeIn(options.speed);
						ksmallimg.eq(index).fadeTo(options.speed/2,options.opacity);
						ksmallimg.eq(index-1).fadeTo(options.speed,1);
						var deplacement = -(indexWidth[index-2] + (ksmallimg.eq(index-1).outerWidth(true)-options.width)/2);
						
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
				if(!kbigimg.eq(index).is(':visible'))
				{
					kbigimg.fadeOut(options.speed);
					ksmallimg.not(this).fadeTo(options.speed, options.opacity);
				}
				kbigimg.eq(index).fadeIn(options.speed);
				
			});
		});
	 };
})(jQuery);