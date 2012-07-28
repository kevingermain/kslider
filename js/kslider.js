(function($){

	 $.fn.kslider = function(options) {

		var kslider = $(this);
		
		//Ajout de la class kbig à la 1ère div du conteneur kslider
		var kbig = $('div:eq(0)', kslider).addClass('kbig');
		
		//Récupération de la hauteur la plus haute entre les images
		var kbigheightMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).height(); }).get());
		
		//Récupération de la largeur entre les images
		var kbigwidthMax = Math.max.apply(Math, $('.kbig img', kslider).map(function(){ return $(this).width(); }).get());
		
		var ksmallheightMax = 0, ksmallwidthMax = 0;
		if($('div:eq(1)', kslider).length == 0)
		{
			kbig.clone().appendTo(kslider);
			$('div:eq(1)', kslider).removeClass().addClass('ksmall');
			ksmallheightMax = kbigheightMax / 4;
			ksmallwidthMax = kbigwidthMax / 4;
		}
		else
		{	
			//Ajout de la class ksmall à la 2ème div du conteneur kslider
			$('div:eq(1)', kslider).removeClass().addClass('ksmall');
			ksmallheightMax = Math.max.apply(Math, $('div:eq(1) img', kslider).map(function(){return $(this).outerHeight(true);}).get());
			ksmallwidthMax = Math.max.apply(Math, $('.ksmall img', kslider).map(function(){return $(this).outerWidth(true);}).get());
		}
		

			
		//Paramètres par défaut
		var defaults = {
			width: kbigwidthMax,
			height: kbigheightMax,
			widthThumb: ksmallwidthMax,
			heightThumb: ksmallheightMax,
			nbImage: $('div:eq(0) img', kslider).length,
			speed: 400,
			sameArea: true
		};
		
		//Application des paramètres de l'utilisateur
		var options = $.extend(defaults, options);
				//Ajout de la class ksmall à la 2ème div du conteneur kslider
		var ksmall = $('div:eq(1)', kslider);
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
		var ksmallwidth = 0;
		$('.ksmall img', kslider)
		.css({'width':'auto', 
			 'height':'auto', 
			 'max-width': options.widthThumb, 
			 'max-height':options.heightThumb})
		.map(function(){
				if(options.sameArea)
					ksmallwidth += options.widthThumb;
				else
					ksmallwidth += $(this).outerWidth(true);
				
				var differenceHauteur = options.heightThumb - $(this).outerHeight(true);
				var differenceLargeur = options.widthThumb - $(this).outerWidth(true);
				if(differenceHauteur > 0)
					$(this).css({'padding-top': differenceHauteur/2, 
									 'padding-bottom': differenceHauteur/2});
				
				if(differenceLargeur > 0 && options.sameArea)
					$(this).css({'padding-right': differenceLargeur/2,
									 'padding-left': differenceLargeur/2, });
		})

		//Définition de la taille du petit conteneur
		
		if(ksmallwidth < options.width)
			ksmall.css({'width': options.width, 'height':options.heightThumb, 'padding-left': (options.width - ksmallwidth) / 2 });
		else
			ksmall.css({'width': ksmallwidth, 'height':options.heightThumb});

		//Ajout des flèches de navigation
		kslider.append('<div style="" class="kleft"></div><div style="" class="kright"></div>');
		
		ksmallimg = $('.ksmall img', kslider);
		kbigimg = $('.kbig img', kslider);
		
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
		
		function marginleft()
		{
			setInterval(function(){
				xp += (marginLeft - xp) / 15;
				ksmall.css({'margin-left': xp});
			}, 5);
		}

		if(posX < options.width && ksmallwidth > options.width)
		{
			marginleft();
		}

		
		// Hover on the thumbnails - Survol des miniatures
		ksmallimg.hover(function(){
			$(this).fadeTo(500,1);
		},
		function(){
			if(!$('.kbig img', kslider).eq($(this).index()).is(':visible'))
				$(this).stop(true,true).fadeTo(300, 0.5);
		}); 
		
		// click on the big image - click sur la grande image
		$('.kbig img', kslider).on('click', function() {
			var index = $(this).index();

			$(this).fadeOut(options.speed);
			
			if($(this).next().length == 0)
			{
				$('.kbig img', kslider).first().fadeIn(options.speed);
				$('.ksmall img', kslider).eq(index).fadeTo(300,0.5).first().fadeTo(500,1);
				if(ksmallwidth > options.width)
				ksmall.animate({marginLeft: 0}, 500);
			}
			else
			{
				$(this).next().fadeIn(options.speed);
				$('.ksmall img', kslider).eq(index).fadeTo(300,0.5).eq(index+1).fadeTo(500,1);
				marginLeft = (((options.width-ksmallwidth) / options.nbImage) * (index+2));
				if((marginLeft<-options.widthThumb*(index+1)))
					marginLeft = -options.widthThumb*index;
				if(ksmallwidth > options.width)
				ksmall.animate({marginLeft: marginLeft}, 500);
			}
		});
		
		// click on the thumbnails - click sur les miniatures
		ksmallimg.on('click', function() {

			var index = $(this).index();
			if(!$('.kbig img', kslider).eq(index).is(':visible'))
			{
				$('.kbig img', kslider).fadeOut(options.speed);
				$('.ksmall img', kslider).not(this).fadeTo(500, 0.5);
			}
			$('.kbig img', kslider).eq(index).fadeIn(options.speed);
			
		});
	 };
})(jQuery);